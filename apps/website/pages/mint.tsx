import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { FileUploader } from 'baseui/file-uploader'
import { Button } from 'baseui/button'

import { useFakeProgress } from '../hooks/useFakeProgress'
import { deploy } from '../lib/incomeStream'

import Layout from '../components/Layout'
import AssetForm from '../components/AssetForm'

export default function Mint() {
  const { user, web3, Moralis, isWeb3Enabled, enableWeb3 } = useMoralis()

  console.log({ web3, Moralis })

  const [file, setFile] = useState(null)
  const [ipfs, setIPFS] = useState(null)

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3()
  }, [isWeb3Enabled])

  const [progressAmount, startFakeProgress, stopFakeProgress] =
    useFakeProgress()

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
              onDrop={(acceptedFiles, rejectedFiles) => {
                startFakeProgress()

                const data = acceptedFiles[0]
                deploy(user, web3).then(({ address }) => {
                  uploadImageToIPFS(data, Moralis)
                    .then(({ ipfs, hash }) => {
                      setFile(data)
                      setIPFS({ ipfs, hash })

                      uploadJSONToIPFS(
                        {
                          imageHash: hash,
                          imageUrl: ipfs,
                          inputStreamAddress: address,
                        },
                        Moralis,
                      ).then(console.log)
                    })
                    .catch(console.error)
                    .finally(() => stopFakeProgress())
                })
              }}
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

async function uploadImageToIPFS(file, Moralis) {
  return new Moralis.File(file.name, file).saveIPFS().then((res) => {
    const ipfs = res.ipfs()
    const hash = res.hash()

    // File has been uploaded, here's hash and url
    return { ipfs, hash }
  })
}

async function uploadJSONToIPFS(json, Moralis) {
  return new Moralis.File('file.json', {
    base64: btoa(JSON.stringify(json)),
  }).saveIPFS()
}
