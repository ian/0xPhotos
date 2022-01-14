// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

interface ITradeableCashFlow {
    function approve(address to, uint256 tokenId) external;

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

interface IERC721 {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _AssetIds; // The next asset id to be issued

    address payable owner; // The owner of the NFTMarket contract
    uint256 marketCommission = 0.025 ether; // the fee for selling an license

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketAsset {
        uint256 itemId; // unique id of the item
        // address nftAssetContract; // address of the contract that holds the NFT
        uint256 assetTokenId; // unique nft id of the asset
        address AssetFluidStreamContract; // address to the nft income stream
        address payable owner; // address of the asset owner
        uint256 price; // price of the item
        bool available; // is the item available
    }

    // Market itemID ->MarketAsset
    mapping(uint256 => MarketAsset) private idToMarketAsset;

    event MarketAssetStatus(
        uint256 indexed itemId, // unique id of the item
        uint256 indexed tokenId, // unique id of the token
        address AssetFluidStreamContract, // address to the nft income stream
        address owner, // address of the asset owner
        uint256 price // price of the item
    );

    modifier onlyOwner() {
        require(msg.sender == owner, 'Restricted to owner');
        _;
    }

    // Returns the listing price of the contract
    function getMarketCommissionPrice() external view returns (uint256) {
        return marketCommission;
    }

    function getOwner() external view onlyOwner returns (address) {
        return owner;
    }

    function getOwnerBalance() external view onlyOwner returns (uint256) {
        return owner.balance;
    }

    /* Places an asset for sale on the marketplace */
    function createMarketAsset(
        // address nftAssetContract,
        uint256 tokenId,
        uint256 price,
        address AssetFluidStreamContract,
        address payable newOwner
    ) external payable nonReentrant {
        require(price > 0, 'Price must be greater than 0');

        // Add a new asset id to the marketplace inventory
        _AssetIds.increment();

        // Retrieve the current asset id
        uint256 itemId = _AssetIds.current();

        // Create the market asset
        idToMarketAsset[itemId] = MarketAsset(
            itemId, // unique id of the item
            // nftAssetContract, // address of the contract that holds the NFT
            tokenId, // unique id of the nft asset
            AssetFluidStreamContract, // address to the nft income stream
            payable(newOwner), // address of the asset owner
            price, // price of the asset
            true // item is available for sale
        );

        emit MarketAssetStatus(
            itemId, // unique id of the item
            // nftAssetContract, // address of the contract that holds the NFT
            tokenId, // unique id of the nft asset
            AssetFluidStreamContract, // address to the nft income stream
            msg.sender, // address of the asset owner
            price // price of the asset
        );
    }

    // Returns all unsold market items
    function fetchMarketAssets() external view returns (MarketAsset[] memory) {
        uint256 itemCount = _AssetIds.current();
        // uint256 unsoldItemCount = _AssetIds.current() - _LicensesSold.current();
        uint256 currentIndex = 0;

        MarketAsset[] memory items = new MarketAsset[](itemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            // if (idToMarketAsset[i + 1].owner == address(0)) {
            uint256 currentId = i + 1;
            MarketAsset storage currentItem = idToMarketAsset[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
            // }
        }
        return items;
    }

    function purchaseAsset(
        uint256 itemId,
        address _assetStreamContract,
        address _assetNftContract
    ) external payable nonReentrant {
        uint256 price = idToMarketAsset[itemId].price;
        address currentOwner = idToMarketAsset[itemId].owner;
        uint256 tokenId = idToMarketAsset[itemId].assetTokenId;
        address purchaser = msg.sender;
        require(
            msg.value == price,
            'Please submit the asking price in order to complete the purchase'
        );
        //Transfer Asset NFT ownership
        IERC721(_assetNftContract).safeTransferFrom(
            currentOwner,
            purchaser,
            tokenId
        );

        //Transfer Asset NFT Income Streams
        ITradeableCashFlow(_assetStreamContract).transferFrom(
            currentOwner,
            purchaser,
            1
        );

        //Transfer value
        idToMarketAsset[itemId].owner.transfer(msg.value);
        idToMarketAsset[itemId].owner = payable(purchaser);
    }

    //Returns only items a user has created
    function fetchMyAssets() external view returns (MarketAsset[] memory) {
        uint256 totalItemCount = _AssetIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketAsset[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketAsset[] memory items = new MarketAsset[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketAsset[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketAsset storage currentItem = idToMarketAsset[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
