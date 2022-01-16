import { createContext, useContext, useEffect, useState } from 'react'
import { useMoralis, MoralisContextValue, MoralisProvider } from 'react-moralis'
import { Framework } from '@superfluid-finance/sdk-core'

import AssetsContract from '../abi/Assets.json'
import LicensesContract from '../abi/Licenses.json'
import SuperFluidUpgrade from '../abi/SuperFluidUpgrade.json'
import TradeableCashflowContract from '../abi/TradeableCashflow.json'

import USDCContract from '../abi/USDC.json'
import USDCxContract from '../abi/USDCx.json'

// type Contract = {
//   abi:
// }

const fUSDC = '0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2'
const fUSDCx = '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7'

type DeployedContract = {
  address: string
}

type DeployedIPFS = {
  hash: string
  url: string
}

// @todo
type MintedNFT = {}

type UseWeb3 = {
  deployIncomeStream: () => Promise<DeployedContract>
  approveMarket: (address: string) => Promise<void>
  mintAssetNFT: (
    tokenUri: string,
    price: string,
    streamAddress: string,
  ) => Promise<any>
  mintLicenseNFT: (tokenUri: string) => Promise<any>
  uploadImage: (file: File) => Promise<DeployedIPFS>
  uploadJSON: (json: object) => Promise<DeployedIPFS>
  upgradeSupertoken: (price: string) => Promise<DeployedContract>
  walletAddress?: string
  truncatedWalletAddress?: string
} & MoralisContextValue

const Context = createContext<any>(null)

function Web3Provider({ children }: any) {
  const value = useProvider()
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function Provider({ children }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
    >
      <Web3Provider>{children}</Web3Provider>
    </MoralisProvider>
  )
}

export const useWeb3 = (): UseWeb3 => useContext(Context)

export default function useProvider(): UseWeb3 {
  const moralis = useMoralis()
  const { user, web3, Moralis, isWeb3Enabled, enableWeb3 } = moralis

  const walletAddress = user?.attributes?.ethAddress
  const truncatedWalletAddress =
    walletAddress &&
    walletAddress.slice(0, 3) +
      '...' +
      walletAddress.slice(walletAddress.length - 3, walletAddress.length)

  const requireWeb3Enabled = () => {
    if (!isWeb3Enabled) return enableWeb3()
  }

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3()
  }, [isWeb3Enabled])

  const initSuperfluid = async () => {
    const web3jsSf = await Framework.create({
      networkName: 'matic',
      provider: web3.currentProvider,
    })
  }

  const uploadImage = async (file) => {
    const moralisFile = new Moralis.File(file.name, file)
    const saved = await moralisFile.saveIPFS()
    if (!saved) throw new Error('Unable to save file to IPFS')

    // Not sure why but this isn't working in TS
    // @ts-ignore
    const url = saved.ipfs()
    // @ts-ignore
    const hash = saved.hash()

    // File has been uploaded, here's hash and url
    return { url, hash }
  }

  const uploadJSON = async (json) => {
    return new Moralis.File('file.json', {
      base64: btoa(JSON.stringify(json)),
    })
      .saveIPFS()
      .then((res) => {
        // Not sure why but this isn't working in TS
        // @ts-ignore
        const url = res.ipfs()
        // @ts-ignore
        const hash = res.hash()

        return {
          url,
          hash,
        }
      })
  }

  const deployIncomeStream = async () => {
    await requireWeb3Enabled()

    const { abi, bytecode } = TradeableCashflowContract

    // @ts-ignore ABI has weird signature?
    const contract = new web3.eth.Contract(abi)

    const tokenContract = await contract
      .deploy({
        data: bytecode,
        arguments: [
          walletAddress,
          'TradeableCashFlow', // name - could be dynamic
          'TCF', // symbol - could be dymanic
          '0xEB796bdb90fFA0f28255275e16936D25d3418603', //host
          '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873', // constantflow agreement
          '0x96B82B65ACF7072eFEb00502F45757F254c2a0D4', // accepted token (MATICx)]
        ],
      })
      .send({
        from: walletAddress,
        // gas: 1500000,
        // gasPrice: '30000000000000'
      })

    // @ts-ignore How do we actually get the contract address?
    const contractAddress = tokenContract._address
    // const transactionHash = tokenContract.transactionHash

    return {
      address: contractAddress,
      // hash: transactionHash,
    }
  }

  const upgradeSupertoken = async (amount: string) => {
    await requireWeb3Enabled()

    const _amount = web3.utils.toWei(amount)

    // USDC
    // const address = '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7'

    // MATICx on Mumbai
    // const address = '0x96B82B65ACF7072eFEb00502F45757F254c2a0D4'

    // USDC
    // const address = '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7'

    // const { abi } = USDCxContract

    // @ts-ignore ABI has weird signature?
    const contract = new web3.eth.Contract(USDCContract.abi, fUSDC)
    const contractx = new web3.eth.Contract(USDCxContract.abi, fUSDCx)

    console.log({ user, web3, Moralis })

    await contract.methods
      .approve(fUSDCx, _amount)
      .send({ from: walletAddress })

    await contractx.methods.upgrade(_amount).send({ from: walletAddress })
  }

  // allows the market to transfer ownership of the income stream
  const approveMarket = async (streamAddress) => {
    await requireWeb3Enabled()

    const address = '0x1dd14A3Ccc7D57852b7C11a9B633Be4e3aDC063F'
    const { abi, bytecode } = TradeableCashflowContract
    // @ts-ignore ABI has weird signature?
    const incomeContract = new web3.eth.Contract(abi, streamAddress)

    return incomeContract.methods
      .approve(address, 1)
      .send({ from: walletAddress })
  }

  const mintAssetNFT = async (tokenUri, price, streamAddress) => {
    await requireWeb3Enabled()

    // const { ethAddress } = user.attributes
    const _price = web3.utils.toWei(price)
    const address = '0x414b20594BDA01EA5903E16b56A82A28FCb80897'
    // const address = '0x506cd4e5B94bD24b2f60D96e5ED6430c5302188c'
    const { abi, bytecode } = AssetsContract
    // @ts-ignore ABI has weird signature?
    const mintAsset = new web3.eth.Contract(abi, address)

    return mintAsset.methods
      .mint(tokenUri, _price, streamAddress)
      .send({ from: walletAddress })
  }

  const mintLicenseNFT = async (tokenUri) => {
    await requireWeb3Enabled()

    console.log({ web3, Moralis, user })
    // const { ethAddress } = user.attributes
    const address = '0x30647E50F220F745d3E89e7BdfcbC5cc0C09A878'
    const { abi, bytecode } = LicensesContract
    // @ts-ignore ABI has weird signature?
    const mintLicense = new web3.eth.Contract(abi, address)
    return mintLicense.methods.mint(tokenUri).send({ from: walletAddress })
  }

  return {
    ...moralis,
    walletAddress,
    truncatedWalletAddress,
    deployIncomeStream,
    approveMarket,
    mintAssetNFT,
    uploadImage,
    uploadJSON,
    upgradeSupertoken,
    mintLicenseNFT,
  }
}
