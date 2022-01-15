import { useEffect, useState } from 'react'
import { useMoralis, MoralisContextValue } from 'react-moralis'

import AssetsContract from '../abi/Assets.json'
import TradeableCashflowContract from '../abi/TradeableCashflow.json'

// type Contract = {
//   abi:
// }

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
  mintAssetNFT: (
    tokenUri: string,
    price: string,
    streamAddress: string,
  ) => Promise<any>
  uploadImage: (file: File) => Promise<DeployedIPFS>
  uploadJSON: (json: object) => Promise<DeployedIPFS>
  walletAddress?: string
} & MoralisContextValue

export default function useWeb3(): UseWeb3 {
  const moralis = useMoralis()
  const { user, web3, Moralis, isWeb3Enabled, enableWeb3 } = moralis
  const walletAddress = user?.attributes?.ethAddress

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3()
  }, [isWeb3Enabled])

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

  const mintAssetNFT = async (tokenUri, price, streamAddress) => {
    // const { ethAddress } = user.attributes
    const _price = web3.utils.toWei(price)
    const address = '0x414b20594BDA01EA5903E16b56A82A28FCb80897'
    const { abi, bytecode } = AssetsContract
    // @ts-ignore ABI has weird signature?
    const mintAsset = new web3.eth.Contract(abi, address)

    return mintAsset.methods
      .mint(tokenUri, _price, streamAddress)
      .send({ from: walletAddress })
  }

  return {
    ...moralis,
    walletAddress,
    deployIncomeStream,
    mintAssetNFT,
    uploadImage,
    uploadJSON,
  }
}
