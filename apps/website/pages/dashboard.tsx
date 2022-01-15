import { FAKE_MARKETPLACE } from '../lib/fake'
import AssetCard from '../components/AssetCard'
import Layout from '../components/Layout'

export default function Dashboard() {
  return (
    <Layout className="max-w-5xl mx-auto">
      <h1 className="my-5 font-serif text-4xl">My dashboard</h1>

      <div className="grid grid-cols-2 mt-10">
        <div>
          <h2 className="mb-5">
            Total Spent in <span className="text-green-500">USDC</span>
          </h2>
          <p className="text-5xl font-light">$34,484.33</p>
        </div>
        <div>
          <h2 className="mb-5">
            This month’s spend in <span className="text-green-500">USDC</span>
          </h2>
          <p className="text-5xl font-light">$4,484.33</p>
        </div>
      </div>

      <div className="mt-20">
        <h4 className="mb-5">NFT Licenses Purchased</h4>
        <div className="grid grid-cols-3 gap-5">
          {FAKE_MARKETPLACE.map((a, i) => (
            <AssetCard asset={a} key={i} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
