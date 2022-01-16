import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'baseui/button'

import Layout from '../../components/Layout'
import { FAKE_MARKETPLACE } from '../../lib/fake'
import useWeb3 from '../../hooks/useWeb3'

export default function Asset() {
  const router = useRouter()
  const { id } = router.query
  const asset = FAKE_MARKETPLACE.find((f) => f.tokenId === id)
  const [isSubmitting, setSubmitting] = useState(false)
  const { createOutputStream, uploadJSON, mintLicenseNFT, upgradeSupertoken } =
    useWeb3()

  const [jsonIPFS, setJsonIPFS] = useState(null)
  const [tx, setTx] = useState(null)

  // Test formdata
  const formData = {
    licenseType: 'Editiorial',
    licenseName: 'Editorial License',
    licenseDescription: 'Editorial License',
    assetTokenId: '1',
    assetTokenAddress: '0x0',
  }

  const handleSubmit = async () => {
    // setSubmitting(true)
    // console.debug('Uploading JSON to IPFS')
    // const { url: jsonIPFS } = await uploadJSON(formData)
    // setJsonIPFS(jsonIPFS)
    // console.log('JSON IPFS: ', jsonIPFS)
    // handleMint(jsonIPFS).finally(() => setSubmitting(false))

    // TODO do we need this every time or just when you dont have enough USDCx
    // setSubmitting(true)
    // await upgradeSupertoken('10').then(() => setSubmitting(false))

    setSubmitting(true)
    createOutputStream('', 500)
      .then(console.debug)
      .finally(() => setSubmitting(false))
  }

  const handleMint = async (jsonIPFS) => {
    console.debug('Minting License NFT')
    mintLicenseNFT(jsonIPFS).then((tx) => {
      console.log('Minted License NFT: ', tx)
      setTx(tx.transactionHash)
    })
  }

  return (
    <Layout className="max-w-5xl mx-auto pt-10">
      <div className="grid grid-cols-2 gap-10">
        <div className="">
          <img src={asset?.url} className="w-full shadow-2xl" />
        </div>
        <div>
          <h1 className="text-4xl font-serif">Purchase a license</h1>
          <p className="text-gray-400 font-light text-lg mt-2">
            All Royalty Free Images include:
          </p>
          <div className="mt-10">
            <div className="grid grid-cols-2">
              <div>
                <img src="/images/eyeball.svg" />
                <h5 className="mt-3 mb-1">Full Resolution images</h5>
                <p className="text-gray-400">4146 x 5182 px • 300DPI • TIFF</p>
              </div>
              <div>
                <img src="/images/globe.svg" />
                <h5 className="mt-3 mb-1">Unlimited & Global usage</h5>
              </div>
            </div>

            <hr className="my-10" />

            <div>
              <h5 className="font-semibold mb-5">Choose your payment type</h5>
              <div className="grid grid-cols-2 gap-10 mb-20">
                <div className="border-2 border-black rounded-xl shadow text-center p-5">
                  <p className="mb-2 h-8">
                    <span className="bg-green-500 text-white rounded-full px-2 py-0.5 text-sm">
                      Save 5%
                    </span>
                  </p>
                  <h6 className="font-medium text-2xl">Stream</h6>
                  <p className="text-gray-400">$0.002 per second </p>
                  <p className="mt-10 text-xs text-gray-400">
                    *equivalent to $379 per year
                  </p>
                </div>
                <div className="border-2 rounded-xl shadow text-center p-5">
                  <p className="mb-2 h-8"></p>
                  <h6 className="font-medium text-2xl">One time</h6>
                  <p className="text-gray-400">$399 USDC</p>
                  <p className="mt-10 text-xs text-gray-400"></p>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                // @ts-ignore className works IDK why it's complaining
                className="w-full"
                isLoading={isSubmitting}
              >
                Purchase License
              </Button>
            </div>

            {/* Display tx hash */}
            {tx && (
              <>
                <div className="p-5 text-center">
                  Transaction Details:{' '}
                  <Link href={`https://mumbai.polygonscan.com/tx/${tx}`}>
                    <a target="_blank">click here</a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
