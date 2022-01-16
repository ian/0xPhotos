import { Button } from 'baseui/button'
import Head from 'next/head'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <h1 className="mb-10 p-40 text-center text-2xl font-bold">Homepage</h1> */}
      <div
        className="bg-cover"
        style={{ backgroundImage: 'url(/images/homepage_bg.png)', height: 680 }}
      >
        <div className="max-w-3xl mx-auto h-full flex items-center">
          <div className="text-white">
            <h1 className="text-6xl font-serif mb-10">
              The world's best moments, captured for you.
            </h1>
            <div className="w-3/5">
              <p>
                Buying stock images from us, you’re supporting photographers by
                ensuring they receive the majority of royalties so they can
                continue to bring you their best work.{' '}
              </p>

              <div className="mt-10 flex space-x-5">
                <Button>Browse the collection</Button>
                <Button kind="secondary">Become a contributor</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
