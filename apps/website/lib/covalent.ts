// https://www.covalenthq.com/docs/api/#/
const assetAddress = '0x414b20594BDA01EA5903E16b56A82A28FCb80897'
const chainId = '80001'

// https://api.covalenthq.com/v1/80001/tokens/0x414b20594BDA01EA5903E16b56A82A28FCb80897/nft_token_ids/?quote-currency=USD&format=JSON&key=ckey_a1a65d292e384b02816014281a8
export async function getAssetTokens(page = 0) {
  return fetch(
    `https://api.covalenthq.com/v1/${chainId}/tokens/${assetAddress}/nft_token_ids/?page-number=${page}&page-size=100&quote-currency=USD&format=JSON&key=${process.env.NEXT_PUBLIC_COVALENT_KEY}`,
  )
    .then((res) => res.json())
    .then((res) => res.data)
}

// https://api.covalenthq.com/v1/80001/tokens/0x414b20594BDA01EA5903E16b56A82A28FCb80897/nft_metadata/2/?quote-currency=USD&format=JSON&key=ckey_a1a65d292e384b02816014281a8
export async function getAssetNFT(tokenId) {
  return fetch(
    `https://api.covalenthq.com/v1/${chainId}/tokens/${assetAddress}/nft_metadata/${tokenId}/?quote-currency=USD&format=JSON&key=${process.env.NEXT_PUBLIC_COVALENT_KEY}`,
  )
    .then((res) => res.json())
    .then((res) => res.data)
    .then((data) => data.items[0].nft_data[0])
}
