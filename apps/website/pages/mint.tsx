import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { FileUploader } from 'baseui/file-uploader'

import { useFakeProgress } from '../hooks/useFakeProgress'

import Layout from '../components/Layout'
import AssetForm from '../components/AssetForm'

export default function Mint() {
  const { Moralis } = useMoralis()
  const [progressAmount, startFakeProgress, stopFakeProgress] =
    useFakeProgress()

  return (
    <Layout className="max-w-4xl m-auto mt-10">
      {/* <h1 className="mb-10">Mint</h1> */}
      <div className="grid grid-cols-2 gap-20">
        <FileUploader
          accept="image/*"
          disabled={!!progressAmount}
          progressAmount={progressAmount}
          progressMessage={
            progressAmount ? `Uploading... ${progressAmount}% of 100%` : ''
          }
          onCancel={stopFakeProgress}
          onDrop={(acceptedFiles, rejectedFiles) => {
            startFakeProgress()

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
              .finally(() => stopFakeProgress())
          }}
        />
        <AssetForm />
      </div>
    </Layout>
  )
}
