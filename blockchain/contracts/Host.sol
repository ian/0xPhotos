//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Roles.sol";

// Used for Remix testing
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/AccessControl.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";

interface IAssets {
    function mint(string memory tokenURI, address assetOwner) external;

    function ownerOf(uint256 tokenId) external view returns (address);
}

interface ILicenses {
    function mint(string memory tokenURI, address licenseOwner) external;
}

contract Host is ERC721URIStorage, AccessControl, ReentrancyGuard {
    using Counters for Counters.Counter;
    // Create a new role identifiers for the access roles
    bytes32 public constant MODERATOR_ADMIN_ROLE =
        keccak256("MODERATOR_ADMIN_ROLE");
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");

    address private assetContract;
    address private licenseContract;
    uint256 private commission; // Percentage expressed as a decimal

    Counters.Counter private _assetIds; // Total Assets Created
    Counters.Counter private _assetsPublished; // Total Assets available
    Counters.Counter private _licenseIds; // Total Licenses sold for all assets

    // Address => Asset TokenId => Boolean
    //   mapping(address => mapping(uint256 => bool)) private isPublished;

    // Address => Asset TokenId => Asset
    mapping(address => mapping(uint256 => Asset)) private assetDetails;

    // Asset details
    struct Asset {
        bool isPublished; // Indicates if the assets is available.
        uint256 tokenId; // A unique identifier representing the NFT.
        string tokenURI; // The path to the NFT metadata.
        uint256 price; // The asking price of the asset.
        address owner; // Owner of the asset.
        uint256 totalLicenses; // Indicates the total of licenses produced by the asset
    }

    event PurchasedAsset(
        address indexed to, // Address of the purchaser
        address indexed from, // Address of the seller
        uint256 indexed tokenId // Token Id representing the NFT
    );

    constructor(address[] memory moderators_) ERC721("Host", "HOST") {
        // Create a new admin role identifier for the moderator access role
        _setRoleAdmin(MODERATOR_ROLE, MODERATOR_ADMIN_ROLE);

        for (uint256 i = 0; i < moderators_.length; ++i) {
            // Grant the moderator role to a specified accounts
            _setupRole(MODERATOR_ROLE, moderators_[i]);
        }

        // Set the host contract as the moderator admin
        _setupRole(MODERATOR_ADMIN_ROLE, address(this));
    }

    modifier onlyModerator() {
        require(
            hasRole(MODERATOR_ROLE, msg.sender),
            "Caller is not a MODERATOR"
        );
        _;
    }

    modifier isPermitted(uint256 tokenId_) {
        address tokenOwner = ownerOf(tokenId_);
        require(
            hasRole(MODERATOR_ROLE, msg.sender) || tokenOwner == msg.sender,
            "Caller is not permitted to perform this action"
        );
        _;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @notice - This function is used to update the percentage of the commission
     * @param percentage - An whole number represented the precentage.
     * @return - The percentage of the commission that is being charged.
     */
    function setCommission(uint256 percentage) public returns (uint256) {
        require(
            hasRole(MODERATOR_ROLE, msg.sender),
            "Sender must be a moderator"
        );
        require(percentage > 0 && percentage < 100, "Must be within 0 - 100%");
        commission = percentage / 100;
        return percentage;
    }

    /**
     * @notice - This function is used to calculate the fee owned to the host.
     * @param value_ - The value of the asset or license that is being sold.
     * @return - The fee owned to the host.
     */
    function calculateCommission(uint256 value_)
        private
        view
        returns (uint256)
    {
        return value_ * commission;
    }

    /**
     * @notice - This function is used to  update the address / location of the asset contract.
     * @param assetContract_ - The address of the asset contract.
     * @return - The address of the asset contract.
     */
    function setAssetContract(address assetContract_)
        public
        onlyModerator
        returns (address)
    {
        assetContract = assetContract_;
        return assetContract;
    }

    /**
     * @notice - This function is used to  update the address / location of the license contract.
     * @param licenseContract_ - The address of the license contract.
     * @return - The address of the license contract.
     */
    function setLicenseContract(address licenseContract_)
        public
        onlyModerator
        returns (address)
    {
        licenseContract = licenseContract_;
        return licenseContract;
    }

    /**
     * @notice - This function is used to mint a new asset NFT
     * @param tokenURI_ - URI of the asset
     * @param price_ - price of the asset
     * @return - the token ID of the new asset
     */
    function mintAsset(string memory tokenURI_, uint256 price_)
        public
        returns (uint256)
    {
        // Increment the total number of assets created
        _assetIds.increment();

        // Get the next available token ID
        uint256 newTokenId = _assetIds.current();

        // Get the address of the asset owner
        address assetOwner = msg.sender;

        // Mint the new asset token
        IAssets(assetContract).mint(tokenURI_, assetOwner);

        // Allow Host contract to transfer NFT ownership on behalf of the owner..
        setApprovalForAll(address(this), true);

        // Create a new asset profile
        assetDetails[msg.sender][newTokenId] = Asset(
            true,
            newTokenId,
            tokenURI_,
            price_,
            assetOwner,
            0
        );

        return newTokenId;
    }

    /**
     * @notice - This function is used to mint a new license NFT
     * @dev - The price for the license is auto generated based on user input. There is no variable to verify the price against.
     * @param assetTokenId_ - Token ID of the asset
     * @param licenseURI_ - URI of the license
     */
    function purchaseLicense(uint256 assetTokenId_, string memory licenseURI_)
        public
        payable
        nonReentrant
    {
        // Get the address of the asset owner
        address assetOwner = IAssets(assetContract).ownerOf(assetTokenId_);

        // Ensure that the asset is published
        require(assetDetails[assetOwner][assetTokenId_].isPublished);

        // Update total licenses sold
        _licenseIds.increment();
        assetDetails[assetOwner][assetTokenId_].totalLicenses += 1;

        // Purchaser of the license
        address licenseOwner = msg.sender;

        // mint the license
        ILicenses(licenseContract).mint(licenseURI_, licenseOwner);

        // Pay the fee to the host
        uint256 fee = calculateCommission(msg.value);
        (bool sent, ) = payable(address(this)).call{value: fee}("");
        require(sent, "Failed to send Ether");

        // Calculate the new value owning to the asset owner minus the hosting fee
        uint256 newPrice = msg.value - fee;

        // Transfer funds to the asset owner
        (bool sent_, ) = payable(assetOwner).call{value: newPrice}("");
        require(sent_, "Failed to send Ether");
    }

    /**
     * @notice - This function is used by the moderators to unpublished an asset
     * @param tokenId_ - The token id for the given asset
     */
    function unpublish(uint256 tokenId_) public isPermitted(tokenId_) {
        address tokenOwner = ownerOf(tokenId_);
        assetDetails[tokenOwner][tokenId_].isPublished = false;
    }

    /**
     * @notice - This function is used by the moderators to list an asset as publish
     * @param tokenId_ - The token id for the given asset
     */
    function publish(uint256 tokenId_) public isPermitted(tokenId_) {
        address tokenOwner = ownerOf(tokenId_);
        assetDetails[tokenOwner][tokenId_].isPublished = true;
    }

    /**
     * @notice - This function is used to return the details of an asset
     * @param tokenId_ - The token id for the given asset
     */
    function getAssetDetails(uint256 tokenId_)
        public
        view
        returns (Asset memory)
    {
        address tokenOwner = ownerOf(tokenId_);
        return assetDetails[tokenOwner][tokenId_];
    }

    /**
     * @notice - This function is used to buy an asset
     * @param tokenId_ - The token id for the given asset
     * @param price_ - price of the asset
     */
    function buyAsset(uint256 tokenId_, uint256 price_)
        public
        payable
        nonReentrant
    {
        address assetOwner = ownerOf(tokenId_);
        require(assetDetails[assetOwner][tokenId_].isPublished);
        require(assetDetails[assetOwner][tokenId_].price <= price_);
        require(assetDetails[assetOwner][tokenId_].owner != msg.sender);

        assetDetails[assetOwner][tokenId_].owner = msg.sender;

        // Transfer ownership of the asset to the buyer.
        transferFrom(assetOwner, msg.sender, tokenId_);

        // Pay the fee to the host
        uint256 fee = calculateCommission(price_);
        (bool sent, ) = payable(address(this)).call{value: fee}("");
        require(sent, "Failed to send Ether");

        // Calculate the new value owning to the asset owner minus the hosting fee
        uint256 newPrice = price_ - fee;

        // Transfer funds to the asset owner
        (bool sent_, ) = payable(assetOwner).call{value: newPrice}("");
        require(sent_, "Failed to send Ether");

        emit PurchasedAsset(msg.sender, assetOwner, tokenId_);
    }
}
