import Link from "next/link"
import HowItWorks from "../components/HowItWorks"
import Layout from "../components/Layout"

export default function Home() {
  return (
    <Layout>
      {/* <h1 className="mb-10 p-40 text-center text-2xl font-bold">Homepage</h1> */}
      <div
        className="bg-cover"
        style={{ backgroundImage: "url(/images/homepage_bg.png)", height: 680 }}
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
                <Link href="/">
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

      <div className="py-20 bg-seagreen">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-semibold">0xPhotos is different</h2>
          <div className="grid grid-cols-3 mt-20 gap-10">
            <section>
              <img src="/images/person_group.svg" alt="" />
              <h3 className="mt-5 text-xl font-medium">Built for Creators</h3>
              <p className="mt-5">
                The highest quality images and unbeatable (95%) royalties for
                contributors.
              </p>
            </section>
            <section>
              <img src="/images/link.svg" alt="" />
              <h3 className="mt-5 text-xl font-medium">Powered by Polygon</h3>
              <p className="mt-5">
                All transactions are executed on-chain with NFTs on the Polygon
                Network.
              </p>
            </section>
            <section>
              <img src="/images/burst.svg" alt="" />
              <h3 className="mt-5 text-xl font-medium">Simple Payments</h3>
              <p className="mt-5">
                Get paid easily in USD and withdraw right to your bank account.
              </p>
            </section>
          </div>
        </div>
      </div>

      <div className="py-20">
        <HowItWorks className="max-w-5xl mx-auto" />
      </div>
    </Layout>
  )
}
