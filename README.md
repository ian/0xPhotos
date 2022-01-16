# 0xPhotos

0xPhotos.com is a two sided marketplace that replaces the need for incumbent stock photo sites and their exorbitant fees.

![Discord](https://img.shields.io/discord/930179712762933308?label=Discord)
[![](https://img.shields.io/github/issues/ian/0xPhotos)](https://github.com/ian/0xPhotos/issues)

<img src="./GithubHero.png"/>

## Problem:

Photo marketplaces take massive % of a photos sale:

- stock.adobe.com: 40-80%
- shutterstock.com: 70-80%
- alamy.com: 50%

Creators should be earning the majority of the sale, not the other way around.

## Our solution

Photographers upload an image and mint an “Asset NFT”. Media buyers mint a “Licence NFT” to define usage and enable payments.

Payments automatically stream to the Asset NFT creating cash flow for the photographer. 0xPhotos is streamed 2% of all payments through the system to fund the intended DAO and future development.

Asset NFTs become future cash flow positive assets that can be traded on NFT marketplaces.

## How It's Made

Architecture:

- NFT 721 asset contract
- React-based NFT marketplace \* Maybe a CDN to deliver images?

Technologies

- Moralis for web3 API
- Superfluid for streaming UDSC
- IPFS for storage media
- Covalent for NFT indexing \* Next.js for frontend
