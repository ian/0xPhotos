import AssetCard from '../components/AssetCard'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { useWeb3 } from '../hooks/useWeb3'
import { webClient } from '../lib/algolia'
import { FAKE_MARKETPLACE } from '../lib/fake'

export default function Dashboard() {
  // const {
  //   // getAssetNFTs,
  //   walletAddress,
  //   getNetFlow,
  //   isWeb3Enabled,
  //   web3,
  //   Moralis,
  //   getfUSDCxBalance,
  //   listInFlows,
  //   // calculateStreamPerSecond,
  // } = useWeb3()

  // const [netFlow, setNetFlow] = useState(null)
  // const [tokens, setTokens] = useState(null)
  // const [fUSDCxBalance, setfUSDCxBalance] = useState(null)
  // const [totalMonthlyInflow, setTotalMonthlyInflow] = useState(null)

  // useEffect(() => {
  //   if (isWeb3Enabled) {
  //     getNetFlow()
  //       .then((amt) => web3.utils.fromWei(amt))
  //       .then((res) => Math.abs(parseFloat(res)))
  //       .then(setNetFlow)

  //     webClient
  //       .initIndex('Search')
  //       .search(walletAddress)
  //       .then((res) => res.hits)
  //       .then(setTokens)
  //   }
  // }, [isWeb3Enabled])

  // useEffect(() => {
  //   const timeout = setInterval(async () => {
  //     // const _fUSDCxBalance = fUSDCxBalance || 0
  //     const balance = await getfUSDCxBalance()
  //     setfUSDCxBalance(balance)

  //     const montlyFlowRate = await listInFlows()
  //     setTotalMonthlyInflow(montlyFlowRate)
  //   }, 1000)
  //   return () => clearTimeout(timeout)
  // }, [])

  return (
    <Layout className="max-w-5xl mx-auto">
      <h1 className="my-5 font-serif text-4xl">My dashboard</h1>
      {/* 
      <div>Balance: {fUSDCxBalance}</div>
      <div>Total Monthly Inflows: {totalMonthlyInflow}</div>
       */}
      <div className="grid grid-cols-2 mt-10">
        <div>
          <h2 className="mb-5">
            Total Spent in <span className="text-green-500">USDC</span>
          </h2>
          {/* <p className="text-5xl font-light">${netFlow}</p> */}
          <p className="text-5xl font-light">$4,380.22</p>
        </div>
        <div>
          <h2 className="mb-5">
            This month’s spend in <span className="text-green-500">USDC</span>
          </h2>
          <p className="text-5xl font-light">$284.33</p>
        </div>
      </div>

      <div className="mt-20">
        <h4 className="mb-5">NFT Licenses Purchased</h4>

        <div className="grid grid-cols-3 gap-5">
          {/* {tokens?.map((t, i) => (
            <AssetCard asset={t} key={i} />
          ))} */}

          {FAKE_MARKETPLACE.map((a, i) => (
            <AssetCard asset={a} key={i} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
