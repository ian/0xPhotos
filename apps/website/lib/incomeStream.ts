// import TRADEABLECASHFLOW_ARTIFACT from 'blockchain/build/contracts/TradeableCashFlow.json'
import ASSET_ABI from '../abi/Assets.json'
import TRADEABLECASHFLOW_ARTIFACT from '../abi/TradeableCashflow.json'

export async function deploy(user, web3) {
  const { ethAddress } = user.attributes
  const { abi, bytecode } = TRADEABLECASHFLOW_ARTIFACT

  const incomeStream = new web3.eth.Contract(abi)
  const tokenContract = await incomeStream
    .deploy({
      data: bytecode,
      arguments: [
        ethAddress,
        'TradeableCashFlow', // name - could be dynamic
        'TCF', // symbol - could be dymanic
        '0xEB796bdb90fFA0f28255275e16936D25d3418603', //host
        '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873', // constantflow agreement
        '0x96B82B65ACF7072eFEb00502F45757F254c2a0D4', // accepted token (MATICx)]
      ],
    })
    .send({
      from: ethAddress,
      // gas: 1500000,
      // gasPrice: '30000000000000'
    })

  const incomeStreamAddress = tokenContract._address
  const transactionHash = tokenContract.transactionHash

  return {
    address: incomeStreamAddress,
    // hash: transactionHash,
  }
}

export function mint(user, web3, tokenUri, streamAddress) {
  const { ethAddress } = user.attributes
  const _price = web3.utils.toWei('0.0001')
  const ASSET_CONTRACT = '0x506cd4e5B94bD24b2f60D96e5ED6430c5302188c'
  const { abi, bytecode } = ASSET_ABI
  const mintAsset = new web3.eth.Contract(abi, ASSET_CONTRACT)

  return mintAsset.methods
    .mint(tokenUri, _price, streamAddress)
    .send({ from: ethAddress })
}
