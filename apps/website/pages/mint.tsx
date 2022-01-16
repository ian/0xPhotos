import { useEffect, useState } from 'react'
import { FileUploader } from 'baseui/file-uploader'
import { Button } from 'baseui/button'

// import { useFakeProgress } from '../hooks/useFakeProgress'
// import { deploy, mint } from '../lib/incomeStream'

import { tempIndexNFT } from '../lib/api'
import useWeb3 from '../hooks/useWeb3'

import Layout from '../components/Layout'
import AssetForm from '../components/AssetForm'
import MintModal from '../components/MintModal'

export default function Mint() {
  const {
    walletAddress,
    deployIncomeStream,
    approveMarket,
    uploadImage,
    uploadJSON,
    mintAssetNFT,
  } = useWeb3()

  const [file, setFile] = useState(null)
  const [mintStep, setMintStep] = useState(null)
  // const [streamAddress, setStreamAddress] = useState(null)

  const handleDrop = async (acceptedFiles, rejectedFiles) => {
    const image = acceptedFiles[0]
    setFile(image)
  }

  const handleMint = async (values) => {
    console.debug('Uploading Image to IPFS')
    setMintStep('ipfs')

    const { url, hash } = await uploadImage(file)

    console.debug('Deploying Income Stream Contract')
    setMintStep('stream')

    const streamContract = await deployIncomeStream()
    const streamAddress = streamContract.address

    // console.debug('Approving Market to handle income stream')
    // await approveMarket(streamAddress).then(console.log)

    console.debug('Uploading JSON to IPFS')
    setMintStep('mint')

    const json = {
      // Our fields
      ipfs: hash, // not needed just thought we should put this in there.
      streamAddress,

      // Metadata Standards https://docs.opensea.io/docs/metadata-standards
      // name: '@todo - Name',
      // description: '@todo - Description',

      // values will be name, description, photoCredit, license,
      ...values,

      image: url,
      external_url: `https://0xphotos.com/ipfs/${hash}`,

      // Minter Royalties: https://docs.opensea.io/docs/contract-level-metadata
      seller_fee_basis_points: 100, // Indicates a 1% fee to minter.
      fee_recipient: walletAddress, // Where seller fees will be paid to.
    }

    const { url: jsonIPFS } = await uploadJSON(json)

    console.debug('Minting NFT')
    setMintStep('mint')

    await mintAssetNFT(jsonIPFS, '0.0001', streamAddress).then(console.log)

    await tempIndexNFT({
      ...json,
      owner: walletAddress,
      image: url,
    })

    setMintStep('done')
  }

  return (
    <Layout className="max-w-4xl m-auto mt-10">
      <div className="grid grid-cols-2 gap-20">
        <div>
          {file ? (
            <FilePreview file={file} onClear={() => setFile(null)} />
          ) : (
            <FileUploader accept="image/*" onDrop={handleDrop} />
          )}
        </div>

        <div>
          <AssetForm disabled={!file} onSubmit={handleMint} />
        </div>
      </div>

      {mintStep && <MintModal step={mintStep} isOpen={true} onClose={false} />}
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
