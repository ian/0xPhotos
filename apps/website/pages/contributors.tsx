import { Button } from 'baseui/button'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout className="max-w-5xl mx-auto mt-5">
      <Head>
        <title>0xPhotos - Apply to be a Contributor</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative" style={{ height: 500 }}>
        <div className="relative">
          <div className="absolute left-0 w-2/3 z-10 flex flex-col align-middle">
            <div className="bg-white bg-opacity-90 p-5 pl-0 mt-12 ">
              <h1 className="font-serif text-4xl mb-5">
                Join a global community of creators and earn royalties every
                second
              </h1>
              <h2 className="text-lg text-gray-400 leading-8">
                0xPhotos is a creator-first platform giving you the highest
                royalty % in the industry, streamed directly to your web3 wallet
                every second.
              </h2>

              <h2 className="text-lg text-gray-400 leading-8 mt-2">
                The world needs your creative perspective – and you deserve to
                be paid properly. Stop giving up huge royalties to other
                platforms and join us. You keep 98% of all royalties with our
                low 2% platform fees.
              </h2>

              <div className="mt-5">
                <Button>Apply to be a Contributor</Button>
              </div>
            </div>
          </div>
          <div className="absolute right-0 w-2/3">
            <img
              src="/images/contributors.png"
              alt="Inspirational contributor photo"
              className="absolute right-0 w-full"
            />
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h3 className="text-xl font-semibold">How it works</h3>
        <div className="grid grid-cols-2 gap-10 mt-10">
          <div className="flex flex-col space-y-5 items-start">
            <img src="/images/camera.svg" alt="Camera" className="h-8" />
            <p>
              Provide your high quality images and content for other creatives
              to use. The more you create and share, the more opporunities you
              have to earn.{' '}
            </p>
          </div>
          <div className="flex flex-col space-y-5 items-start">
            <img src="/images/chart_pie.svg" alt="Pie Chart" className="h-8" />
            <p>
              You set your base price (we’ll give you a suggestion). Wider use
              of your image will increase the price buyers pay. You will keep
              98% of the price as your royalty.
            </p>
          </div>
          <div className="flex flex-col space-y-5 items-start">
            <img src="/images/lightning.svg" alt="Lightning" className="h-8" />
            <p>
              We turn your content into an NFT. This NFT becomes an asset that
              earns royalty payments - giving you full control.{' '}
            </p>
          </div>
          <div className="flex flex-col space-y-5 items-start">
            <img src="/images/hourglass.svg" alt="Hourglass" className="h-8" />
            <p>
              Royalties are paid upfront or streamed every second to the holder
              of the NFT. You can sell, trade, finance the NFT through other NFT
              and Defi Protocols.{' '}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}
