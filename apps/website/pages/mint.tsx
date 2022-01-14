import { useMoralis } from 'react-moralis'
import Layout from '../components/Layout'

export default function Mint() {
  const { web3 } = useMoralis()

  const handleMint = () => {
    // https://docs.moralis.io/moralis-server/web3-sdk/native
    console.log('Mint')
    web3?.
  }

  return (
    <Layout>
      <h1 className="mb-10">Mint</h1>
      <button className="p-2 border shadow rounded" onClick={handleMint}>
        Moralis Login
      </button>
    </Layout>
  )
}
