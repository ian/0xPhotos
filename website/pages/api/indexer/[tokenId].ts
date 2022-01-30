import { algoliaIndex } from '../../../lib/algolia'
import { getAssetNFT } from '../../../lib/covalent'

export default async function handler(req, res) {
  const { tokenId } = req.query
  const nft = await getAssetNFT(tokenId)
  const index = await algoliaIndex(nft)
  res.status(200).json(index)
}
