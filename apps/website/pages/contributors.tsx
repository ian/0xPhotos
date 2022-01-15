import Head from 'next/head'
import { Button } from 'baseui/button'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from 'baseui/modal'
import Layout from '../components/Layout'
import { useState } from 'react'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <Layout>
      <Head>
        <title>0xPhotos - Apply to be a Contributor</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ApplyModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

      <div className="grid grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="mt-10">
          <h1 className="font-serif text-4xl mb-5">
            Join a global community of creators and earn royalties every second
          </h1>
          <h2 className="text-lg text-gray-400 leading-8">
            0xPhotos is a creator-first platform giving you the highest royalty
            % in the industry, streamed directly to your web3 wallet every
            second.
          </h2>

          <h2 className="text-lg text-gray-400 leading-8 mt-2">
            The world needs your creative perspective – and you deserve to be
            paid properly. Stop giving up huge royalties to other platforms and
            join us. You keep 98% of all royalties with our low 2% platform
            fees.
          </h2>

          <div className="mt-10">
            <Button onClick={() => setModalOpen(true)}>
              Apply to be a Contributor
            </Button>
          </div>
        </div>
        <div>
          <img
            src="/images/contributors.png"
            alt="Inspirational contributor photo"
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-10 py-10 bg-seagreen">
        <section className="max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold">How 0xPhoto works</h3>
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
              <img
                src="/images/chart_pie.svg"
                alt="Pie Chart"
                className="h-8"
              />
              <p>
                You set your base price (we’ll give you a suggestion). Wider use
                of your image will increase the price buyers pay. You will keep
                98% of the price as your royalty.
              </p>
            </div>
            <div className="flex flex-col space-y-5 items-start">
              <img
                src="/images/lightning.svg"
                alt="Lightning"
                className="h-8"
              />
              <p>
                We turn your content into an NFT. This NFT becomes an asset that
                earns royalty payments - giving you full control.{' '}
              </p>
            </div>
            <div className="flex flex-col space-y-5 items-start">
              <img
                src="/images/hourglass.svg"
                alt="Hourglass"
                className="h-8"
              />
              <p>
                Royalties are paid upfront or streamed every second to the
                holder of the NFT. You can sell, trade, finance the NFT through
                other NFT and Defi Protocols.{' '}
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

const ApplyModal = ({ isOpen, onClose }) => {
  const { height, width } = useWindowDimensions()

  return (
    <Modal
      onClose={onClose}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
      overrides={{
        Dialog: {
          style: ({ $theme }) => ({
            borderRadius: 0,
            // width: '80%',
            width: width * 0.6 + 'px',
            height: height * 0.8 + 'px',
          }),
        },
      }}
    >
      {/* <ModalHeader>Apply to be a Photographer</ModalHeader> */}
      <ModalBody>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdVxav78TvR0bgxDzYfQNaYZsoMhAytGVWPbIcRTcHqlebpOQ/viewform?embedded=true"
          width="100%"
          // height="700px"
          // width={width * 0.8 + 'px'}
          height={height * 0.8 + 'px'}
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
        >
          Loading…
        </iframe>
      </ModalBody>
      {/* <ModalFooter>
        <ModalButton kind="tertiary">Cancel</ModalButton>
        <ModalButton>Okay</ModalButton>
      </ModalFooter> */}
    </Modal>
  )
}
