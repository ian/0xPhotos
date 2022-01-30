import { v4 as uuid } from 'uuid'
import { algoliaIndex } from '../../lib/algolia'
// import { getAssetNFT } from '../../lib/covalent'

export default async function handler(req, res) {
  // const { tokenId } = req.query
  console.log()

  // const nft = await getAssetNFT(tokenId)
  await algoliaIndex({
    ...JSON.parse(req.body),
    token_id: `TEMP-${uuid()}`,
  }).catch(console.error)

  res.status(200).json({ status: 'ok' })
}
