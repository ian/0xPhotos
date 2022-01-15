import Head from 'next/head'
import { useMoralis } from 'react-moralis'
import Grid from '../components/Grid'
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
      <div className="flex p-5">
        <div className="w-1/5"></div>
        <div className="w-4/5">
          <Grid elements={FAKE_MARKETPLACE} />
        </div>
      </div>
    </Layout>
  )
}
