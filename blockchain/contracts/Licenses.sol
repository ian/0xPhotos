//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract Licenses is ERC721 {
    uint256 public tokenCounter;
    address private marketContractAddress;
    mapping(uint256 => string) private _tokenURIs;

    constructor(address _marketContractAddress) ERC721('Licenses', 'LIC') {
        tokenCounter = 0;
        marketContractAddress = _marketContractAddress;
    }

    function mint(string memory _tokenURI) public {
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, _tokenURI);
        setApprovalForAll(marketContractAddress, true);

        tokenCounter++;
    }

    function _setTokenURI(uint256 _tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(_tokenId),
            'ERC721Metadata: URI set of nonexistent token'
        ); // Checks if the tokenId exists
        _tokenURIs[_tokenId] = _tokenURI;
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
