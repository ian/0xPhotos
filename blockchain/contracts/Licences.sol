//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Used for Remix testing
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";

contract Licenses is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // Total licenses created

    address private hostContract;

    constructor(address hostContract_) ERC721("Licenses", "LIC") {
     hostContract = hostContract_;
    }

    modifier isHostContract() {
        require(
            msg.sender == hostContract,
            "Only the host contract can mint new licenses"
        );
        _;
    }

    /**
     * @notice - This function is used to mint a new license NFT
     * @param tokenURI_ - URI of the license
     * @param owner_ - The owner of the newly minted token.
     * @return - the token ID of the new license
     */
    function mint(string memory tokenURI_, address owner_)
        external
        isHostContract
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(owner_, newTokenId);
        _setTokenURI(newTokenId, tokenURI_);

        return newTokenId;
    }
}
