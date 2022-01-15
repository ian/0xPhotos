import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { FileUploader } from 'baseui/file-uploader'
import { Button } from 'baseui/button'

import { useFakeProgress } from '../hooks/useFakeProgress'
import { deploy, mint } from '../lib/incomeStream'

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

                console.debug('Deploying Income Stream Contract')

                deploy(user, web3).then(({ address }) => {
                  console.debug('Uploading Image to IPFS')

                  uploadImageToIPFS(data, Moralis)
                    .then(({ url, hash }) => {
                      console.debug('Uploading JSON to IPFS')

                      setFile(data)
                      setIPFS({ url, hash })

                      // Metadata Standards https://docs.opensea.io/docs/metadata-standards
                      uploadJSONToIPFS(
                        {
                          name: '@todo - Name',
                          description: '@todo - Description',
                          image: url,
                          ipfs: hash,
                          inputStreamAddress: address,
                          external_url: `https://0xphotos.com/ipfs/${hash}`,
                        },
                        Moralis,
                      ).then(({ url }) => {
                        console.debug('Minting NFT')

                        mint(user, web3, url, address).then(console.log)
                      })
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
    const url = res.ipfs()
    const hash = res.hash()

    // File has been uploaded, here's hash and url
    return { url, hash }
  })
}

async function uploadJSONToIPFS(json, Moralis) {
  return new Moralis.File('file.json', {
    base64: btoa(JSON.stringify(json)),
  })
    .saveIPFS()
    .then((res) => {
      const url = res.ipfs()
      const hash = res.hash()

      return {
        url,
        hash,
      }
    })
}
