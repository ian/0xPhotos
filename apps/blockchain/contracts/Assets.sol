//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

interface IMarket {
    function createMarketAsset(
        uint256 _tokenId,
        uint256 _price,
        address _assetFluidStreamContract,
        address payable _owner
    ) external;
}

contract Assets is ERC721 {
    uint256 public tokenCounter;
    address private marketContractAddress;
    // address private AssetFluidStreamContract = 0x21Fbb00b3eFa2990Aa3e0A23B56Af0153fa7eA19;
    mapping(uint256 => string) private _tokenURIs;

    constructor(address _marketContractAddress) ERC721('Assets', 'AST') {
        tokenCounter = 0;
        marketContractAddress = _marketContractAddress;
    }

    function mint(
        string memory _tokenURI,
        uint256 _price,
        address AssetFluidStreamContract
    ) public {
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, _tokenURI, _price, AssetFluidStreamContract);
        setApprovalForAll(marketContractAddress, true);

        tokenCounter++;
    }

    function _setTokenURI(
        uint256 _tokenId,
        string memory _tokenURI,
        uint256 _price,
        address AssetFluidStreamContract
    ) internal virtual {
        require(
            _exists(_tokenId),
            'ERC721Metadata: URI set of nonexistent token'
        ); // Checks if the tokenId exists
        _tokenURIs[_tokenId] = _tokenURI;
        IMarket(marketContractAddress).createMarketAsset(
            _tokenId,
            _price,
            AssetFluidStreamContract,
            payable(msg.sender)
        );
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            'ERC721Metadata: URI set of nonexistent token'
        );
        return _tokenURIs[_tokenId];
    }
}
