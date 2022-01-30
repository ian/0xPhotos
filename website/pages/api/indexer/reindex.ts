import { algoliaIndex } from '../../../lib/algolia'
import { getAssetTokens, getAssetNFT } from '../../../lib/covalent'

export default async function handler(req, res) {
  await getAssetTokens()
    .then((res) => res.items)
    .then(async (tokens) => {
      for (const token of tokens) {
        const nft = await getAssetNFT(token.token_id)
        const index = await algoliaIndex(nft)
      }
    })

  res.status(200).send('OK')
}
