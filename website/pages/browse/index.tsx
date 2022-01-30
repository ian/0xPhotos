import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
// import Grid from '../../components/Grid'
import BrowseFilters from "../../components/BrowseFilters"
import Layout from "../../components/Layout"
import { algoliaSearch } from "../../lib/algolia"
import { FAKE_MARKETPLACE } from "../../lib/fake"

export default function Browse() {
  const [elements, setElements] = useState(null)

  useEffect(() => {
    // getAssetTokens().then(console.debug)
    algoliaSearch()
      .then((res) => res.hits)
      .then(setElements)
  }, [])

  return (
    <Layout className="max-w-5xl mx-auto pt-10">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex gap-10">
        <div className="" style={{ width: 400 }}>
          <BrowseFilters />
        </div>
        <div className="masonry-2-col w-full">
          {/* {elements
            ?.filter((f) => f.external_data)
            .map((e, i) => (
              <div className="mb-5" key={`element-${i}`}>
                <Link href={`/browse/${e.token_id}`}>
                  <a>
                    <img src={e.external_data?.image} />
                  </a>
                </Link>
              </div>
            ))} */}

          {FAKE_MARKETPLACE.map((e, i) => (
            <div className="mb-5" key={`element-${i}`}>
              <Link href={`/browse/${e.tokenId}`}>
                <a>
                  <img src={e.url} alt={e.url} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
