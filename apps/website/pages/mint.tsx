import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { FileUploader } from 'baseui/file-uploader'

import Layout from '../components/Layout'
import AssetForm from '../components/AssetForm'

export default function Mint() {
  const { Moralis, web3 } = useMoralis()
  const [isUploading, setUploading] = useState(false)

  return (
    <Layout className="max-w-4xl m-auto mt-10">
      {/* <h1 className="mb-10">Mint</h1> */}
      <div className="grid grid-cols-2 gap-20">
        <FileUploader
          accept="image/*"
          disabled={isUploading}
          onDrop={(acceptedFiles, rejectedFiles) => {
            setUploading(true)
            const data = acceptedFiles[0]
            const file = new Moralis.File(data.name, data)
            file
              .saveIPFS()
              .then((res) => {
                const ipfs = res.ipfs()
                const hash = res.hash()

                // File has been uploaded, here's hash and url
                console.log({ ipfs, hash })
              })
              .catch(console.error)
              .finally(() => setUploading(false))
          }}
        />
        <AssetForm />
      </div>
    </Layout>
  )
}
