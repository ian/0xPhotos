export async function tempIndexNFT(nft) {
  fetch('/api/tempIndexer/', {
    method: 'POST',
    body: JSON.stringify(nft),
  })
}
