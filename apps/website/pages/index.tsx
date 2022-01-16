import { Button } from 'baseui/button'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      {/* <h1 className="mb-10 p-40 text-center text-2xl font-bold">Homepage</h1> */}
      <div
        className="bg-cover"
        style={{ backgroundImage: 'url(/images/homepage_bg.png)', height: 680 }}
      >
        <div className="max-w-3xl mx-auto h-full flex items-center">
          <div className="text-white">
            <h1 className="text-6xl font-serif mb-10">
              The world&apos;s best moments, captured for you.
            </h1>
            <div className="w-3/5">
              <p>
                Buying stock images from us, you&apos;re supporting
                photographers by ensuring they receive the majority of royalties
                so they can continue to bring you their best work.
              </p>

              <div className="mt-10 flex space-x-5">
                <Link href="/browse">
                  <a className="bg-black text-white p-4">
                    Browse the collection
                  </a>
                </Link>
                <Link href="/contributors">
                  <a className="bg-white text-black p-4">
                    Become a contributor
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
