import { Button } from 'baseui/button'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { FAKE_MARKETPLACE } from '../../lib/fake'
import useWeb3 from '../../hooks/useWeb3'
import Link from 'next/link'

export default function Asset() {
  const router = useRouter()
  const { id } = router.query
  const asset = FAKE_MARKETPLACE.find((f) => f.tokenId === id)
  const { uploadJSON, mintLicenseNFT } = useWeb3()

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
    console.debug('Uploading JSON to IPFS')
    const { url: jsonIPFS } = await uploadJSON(formData)
    setJsonIPFS(jsonIPFS)
    console.log('JSON IPFS: ', jsonIPFS)
    handleMint(jsonIPFS)
  }

  const handleMint = (jsonIPFS) => {
    console.debug('Minting License NFT')
    mintLicenseNFT(jsonIPFS).then((tx) => {
      console.log('Minted License NFT: ', tx)
      setTx(tx.transactionHash)
    })
  }

  return (
    <Layout>
      <div className="grid grid-cols-3">
        <div
          className="col-span-2 p-20 bg-gray-500 overflow-hidden"
          style={
            {
              // backgroundImage: `url(${asset?.url})`,
              // filter: `blur(10px)`,
              // backgroundPosition: 'center',
              // backgroundRepeat: 'no-repeat',
              // backgroundSize: 'cover',
              // height: '100%',
            }
          }
        >
          <img src={asset?.url} className="w-full shadow-2xl" />
        </div>
        <div>
          <h2 className="p-5 text-center uppercase font-light">
            Purchase a license
          </h2>

          {/* <div className="bg-gray-100 p-5 flex justify-between gap-x-2">
            <button className="border rounded p-2 w-full bg-gray-400">
              Editorial
            </button>
            <button className="border rounded p-2 w-full">Custom</button>
          </div> */}
          <div className="p-5">
            {/* <div className="border rounded shadow divide-y-2">
              <div className="p-5 flex flex-col">Small</div>
              <div className=" p-5 flex flex-col">Medium</div>
              <div className=" p-5 flex flex-col">Large</div>
            </div> */}

            <Button onClick={handleSubmit}>Mint License NFT</Button>

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