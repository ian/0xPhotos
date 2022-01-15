import Head from 'next/head'
import { useMoralis } from 'react-moralis'
import Grid from '../components/Grid'
import GridFilters from '../components/GridFilters'
import Layout from '../components/Layout'

import { FAKE_MARKETPLACE } from '../lib/fake'

export default function Home() {
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
          <Grid elements={FAKE_MARKETPLACE} />
        </div>
      </div>
    </Layout>
  )
}
