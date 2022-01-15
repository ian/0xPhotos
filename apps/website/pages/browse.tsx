import Head from 'next/head'
import { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import GridFilters from '../components/GridFilters'
import Layout from '../components/Layout'
import { algoliaSearch } from '../lib/algolia'

export default function Browse() {
  const [elements, setElements] = useState(null)

  useEffect(() => {
    // getAssetTokens().then(console.debug)
    algoliaSearch()
      .then((res) => res.hits)
      .then(setElements)
  }, [])

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <h1 className="mb-10">Homepage</h1> */}
      <div className="flex p-5 gap-5">
        <div className="" style={{ width: 400 }}>
          <GridFilters />
        </div>
        <div className="w-full">
          <Grid elements={elements} />
        </div>
      </div>
    </Layout>
  )
}
