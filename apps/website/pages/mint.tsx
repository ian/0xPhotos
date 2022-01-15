import { useEffect, useState } from 'react'
import { FileUploader } from 'baseui/file-uploader'
import { Button } from 'baseui/button'

import { useFakeProgress } from '../hooks/useFakeProgress'
// import { deploy, mint } from '../lib/incomeStream'

import useWeb3 from '../hooks/useWeb3'

import Layout from '../components/Layout'
import AssetForm from '../components/AssetForm'

export default function Mint() {
  const {
    walletAddress,
    deployIncomeStream,
    uploadImage,
    uploadJSON,
    mintAssetNFT,
  } = useWeb3()
  const [progressAmount, startFakeProgress, stopFakeProgress] =
    useFakeProgress()

  const [file, setFile] = useState(null)
  const [ipfs, setIPFS] = useState(null)

  const handleDrop = async (acceptedFiles, rejectedFiles) => {
    startFakeProgress()

    console.debug('Deploying Income Stream Contract')

    const streamContract = await deployIncomeStream()
    const streamAddress = streamContract.address
    const image = acceptedFiles[0]

    console.debug('Uploading Image to IPFS')

    const { url, hash } = await uploadImage(image).finally(() =>
      stopFakeProgress(),
    )

    console.debug('Uploading JSON to IPFS')

    setFile(image)
    setIPFS({ url, hash })

    const { url: jsonIPFS } = await uploadJSON({
      // Our fields
      ipfs: hash, // not needed just thought we should put this in there.
      streamAddress,

      // Metadata Standards https://docs.opensea.io/docs/metadata-standards
      name: '@todo - Name',
      description: '@todo - Description',
      image: url,
      external_url: `https://0xphotos.com/ipfs/${hash}`,

      // Minter Royalties: https://docs.opensea.io/docs/contract-level-metadata
      seller_fee_basis_points: 100, // Indicates a 1% fee to minter.
      fee_recipient: walletAddress, // Where seller fees will be paid to.
    })

    console.debug('Minting NFT')

    await mintAssetNFT(jsonIPFS, '0.0001', streamAddress)
  }

  return (
    <Layout className="max-w-4xl m-auto mt-10">
      {/* <h1 className="mb-10">Mint</h1> */}
      <div className="grid grid-cols-2 gap-20">
        <div>
          {file ? (
            <FilePreview file={file} onClear={() => setFile(null)} />
          ) : (
            <FileUploader
              accept="image/*"
              disabled={!!progressAmount}
              progressAmount={progressAmount}
              progressMessage={
                progressAmount ? `Uploading... ${progressAmount}% of 100%` : ''
              }
              onCancel={stopFakeProgress}
              onDrop={handleDrop}
            />
          )}
        </div>

        <AssetForm />
      </div>
    </Layout>
  )
}

const FilePreview = ({ file, onClear }) => (
  <div>
    <img src={URL.createObjectURL(file)} />
    <div className="mt-5">
      <Button kind="secondary" onClick={onClear}>
        Change Image
      </Button>
    </div>
  </div>
)
