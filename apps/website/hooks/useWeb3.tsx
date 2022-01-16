import { createContext, useContext, useEffect, useState } from 'react'
import { useMoralis, MoralisContextValue, MoralisProvider } from 'react-moralis'
import SuperfluidSDK from '@superfluid-finance/js-sdk'

import Web3 from 'web3'

import AssetsContract from '../abi/Assets.json'
import LicensesContract from '../abi/Licenses.json'
import TradeableCashflowContract from '../abi/TradeableCashflow.json'

import USDCContract from '../abi/USDC.json'
import USDCxContract from '../abi/USDCx.json'

const assetContractAddress = '0x414b20594BDA01EA5903E16b56A82A28FCb80897'
const fUSDC = '0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2'
const fUSDCx = '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7'

// USDC
// const address = '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7'

// MATICx on Mumbai
// const address = '0x96B82B65ACF7072eFEb00502F45757F254c2a0D4'

function calculateFlowRate(amount) {
  let fr = amount / (86400 * 30)
  return Math.floor(fr)
}
const MINIMUM_GAME_FLOW_RATE = '3858024691358'

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
  createOutputStream: (to: string, amount: any) => Promise<any>
  approveMarket: (address: string) => Promise<void>
  getNetFlow: () => Promise<string>
  mintAssetNFT: (
    tokenUri: string,
    price: string,
    streamAddress: string,
  ) => Promise<any>
  mintLicenseNFT: (tokenUri: string) => Promise<any>
  uploadImage: (file: File) => Promise<DeployedIPFS>
  uploadJSON: (json: object) => Promise<DeployedIPFS>
  upgradeSupertoken: (price: string) => Promise<void>
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

  // const requireWeb3Enabled = () => {
  //   if (!isWeb3Enabled) return enableWeb3()
  // }

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3()
  }, [isWeb3Enabled])

  const initSuperfluid = async () => {
    const sdk = new SuperfluidSDK.Framework({
      web3: new Web3(web3.currentProvider),
    })

    await sdk.initialize()
    return sdk
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
    // await requireWeb3Enabled()

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
          '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7', // accepted token (USDCx)]
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

  const createOutputStream = async (to: string, amount) => {
    const sdk = await initSuperfluid()

    const flowRate = calculateFlowRate(amount)
    const receiver = '0x2A92d10eb3BE7332ef92a2D5E3ec94d567683ec3'

    console.log({ receiver, flowRate })

    return sdk.cfa.createFlow({
      // flowRate: flowRate.toString(),
      flowRate: MINIMUM_GAME_FLOW_RATE,
      receiver,
      sender: walletAddress,
      superToken: fUSDCx,
      // userData: this.state.web3.eth.abi.encodeParameter("uint256", tokenURI),
    })

    // const { abi: cfaABI } = ConstantFlowAgreement
    // const cfaAddress = '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873'
    // // @ts-ignore
    // const cfaContract = new web3.eth.Contract(cfaABI, cfaAddress)

    // return cfaContract.methods
    //   .createFlow(fUSDCx, receiver, flowRate.toString(), '0x')
    //   .send({ from: walletAddress })

    // Write operations
    // sf.cfaV1.createFlow({
    //   sender: walletAddress,
    //   receiver: address,
    //   superToken: fUSDCx,
    //   flowRate: calculateFlowRate(amount),
    //   // userData: string,
    // })

    // const shiftedAmount = new BigNumber(amount).shiftedBy(18)
    // const address = Web3.utils.toChecksumAddress(
    //   '0x2A92d10eb3BE7332ef92a2D5E3ec94d567683ec3',
    //   // to
    // )
    // const _flowRate = calculateFlowRate(shiftedAmount)

    // const { abi: cfaABI } = ConstantFlowAgreement
    // const cfaAddress = '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873'
    // // @ts-ignore

    // // const cfaContract = new web3.eth.Contract(cfaABI, cfaAddress)

    // const tx = cfaContract.methods
    //   .createFlow(fUSDCx, address, _flowRate.toString(), '0x')
    //   .encodeABI()

    // const sf = this.state.sf

    // const tx = sf.cfa._cfa.methods
    //   .createFlow(
    //     fUSDCx.toString(),
    //     address.toString(),
    //     _flowRate.toString(),
    //     '0x',
    //   )
    //   .encodeABI()

    // await Framework.host.hostContract.methods()

    // await core.host.hostContract
    //   .callAgreement(
    //     // sf.cfa._cfa._address
    //     cfaAddress,
    //     tx,
    //     '0x',
    //   )
    //   .send({ from: walletAddress, type: '0x2' })
    //   .then(console.log)
  }

  const upgradeSupertoken = async (amount: string) => {
    // await requireWeb3Enabled()
    const _amount = web3.utils.toWei(amount)

    // @ts-ignore ABI has weird signature?
    const contract = new web3.eth.Contract(USDCContract.abi, fUSDC)
    // @ts-ignore
    const contractx = new web3.eth.Contract(USDCxContract.abi, fUSDCx)

    console.log({ user, web3, Moralis })

    await contract.methods
      .approve(fUSDCx, _amount)
      .send({ from: walletAddress })

    await contractx.methods.upgrade(_amount).send({ from: walletAddress })
  }

  const getNetFlow = async () => {
    const sdk = await initSuperfluid()
    const flow = await sdk.cfa.getNetFlow({
      superToken: fUSDCx,
      account: walletAddress,
    })
    return flow.toString()
  }

  // const getAssetNFTs = async () => {
  //   const { abi } = AssetsContract
  //   const contract = new web3.eth.Contract(abi, assetContractAddress)
  //   return await contract.methods.userOwnedTokens.call(walletAddress)

  //   // await contractx.methods.upgrade(_amount).send({ from: walletAddress })
  // }

  // allows the market to transfer ownership of the income stream
  const approveMarket = async (streamAddress) => {
    // await requireWeb3Enabled()

    const address = '0x1dd14A3Ccc7D57852b7C11a9B633Be4e3aDC063F'
    const { abi, bytecode } = TradeableCashflowContract
    // @ts-ignore ABI has weird signature?
    const incomeContract = new web3.eth.Contract(abi, streamAddress)

    return incomeContract.methods
      .approve(address, 1)
      .send({ from: walletAddress })
  }

  const mintAssetNFT = async (tokenUri, price, streamAddress) => {
    // await requireWeb3Enabled()

    // const { ethAddress } = user.attributes
    const _price = web3.utils.toWei(price)
    // const address = '0x414b20594BDA01EA5903E16b56A82A28FCb80897'
    // const address = '0x506cd4e5B94bD24b2f60D96e5ED6430c5302188c'
    const { abi, bytecode } = AssetsContract
    // @ts-ignore ABI has weird signature?
    const mintAsset = new web3.eth.Contract(abi, assetContractAddress)

    return mintAsset.methods
      .mint(tokenUri, _price, streamAddress)
      .send({ from: walletAddress })
  }

  const mintLicenseNFT = async (tokenUri) => {
    // await requireWeb3Enabled()

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
    createOutputStream,
    upgradeSupertoken,
    getNetFlow,
    mintLicenseNFT,
  }
}

// export function calculateFlowRate(amount) {
//   let fr = amount / (86400 * 30)
//   console.log({ fr })
//   return Math.floor(fr)
// }

// function calculateFlowRate(amount) {
//   if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
//     alert("You can only calculate a flowRate based on a number");
//     return;
//   } else if (typeof Number(amount) === "number") {
//     if (Number(amount) === 0) {
//       return 0;
//     }

//     const amountInWei = web3.utils.toWei(amount)
//     const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
//     const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
//     return calculatedFlowRate;
//   }
// }
