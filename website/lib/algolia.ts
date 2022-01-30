import Algolia from 'algoliasearch'
import Search from 'algoliasearch/lite'

export const serverClient = Algolia(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_KEY,
)

export const webClient = Search(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
)

export function convertToAlgolia(obj) {
  const { geo, ...rest } = obj
  const props = {
    objectID: obj.token_id,
    ...rest,
  }

  // if (geo) {
  //   Object.assign(props, {
  //     _geoloc: {
  //       lat: geo.latitude,
  //       lng: geo.longitude,
  //     },
  //   })
  // }

  return props
}

export async function algoliaSearch(query = '') {
  return webClient.initIndex('Search').search(query)
}

export async function algoliaIndex(obj) {
  console.log('[ALGOLIA] updating', obj)
  await serverClient
    .initIndex('Search')
    .saveObject(convertToAlgolia(obj))
    .then(({ objectID }) => {
      console.log('Added', objectID, 'to Algolia')
    })
  return obj
}

export async function algoliaDelete(id) {
  console.log('[ALGOLIA] deleting', id)
  await serverClient
    .initIndex('Search')
    .deleteObject(id)
    .then(() => {
      console.log('Removed', id, 'from Algolia')
    })
}
