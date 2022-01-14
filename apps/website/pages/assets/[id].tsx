import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { FAKE_MARKETPLACE } from '../../lib/fake'

export default function Asset() {
  const router = useRouter()
  const { id } = router.query
  const asset = FAKE_MARKETPLACE.find((f) => f.tokenId === id)

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
          <div className="bg-gray-100 p-5 flex justify-between gap-x-2">
            <button className="border rounded p-2 w-full bg-gray-400">
              Editorial
            </button>
            <button className="border rounded p-2 w-full">Custom</button>
          </div>
          <div className="p-5">
            <div className="border rounded shadow divide-y-2">
              <div className="p-5 flex flex-col">Small</div>
              <div className=" p-5 flex flex-col">Medium</div>
              <div className=" p-5 flex flex-col">Large</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
