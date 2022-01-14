import { useMoralis } from 'react-moralis'

export default function Mint() {
  const { web3 } = useMoralis()

  const handleMint = () => {
    console.log('Mint')
  }

  return (
    <div>
      <h1 className="mb-10">Mint</h1>
      <button className="p-2 border shadow rounded" onClick={handleMint}>
        Moralis Login
      </button>
    </div>
  )
}
