// import TRADEABLECASHFLOW_ARTIFACT from 'blockchain/build/contracts/TradeableCashFlow.json'
import TRADEABLECASHFLOW_ARTIFACT from '../abi/TradeableCashflow.json'

export async function deploy(user, web3) {
  const { ethAddress } = user.attributes
  // Connect to the Metamask Ethereum node
  // const web3modal = new Web3Modal();
  // const connection = await web3modal.connect();
  // const provider = new ethers.providers.Web3Provider(connection);
  // const signer = provider.getSigner();

  // const incomeStream = new ethers.ContractFactory(
  //   TRADEABLECASHFLOW_ARTIFACT.abi,
  //   TRADEABLECASHFLOW_ARTIFACT.bytecode,
  //   signer,
  // )

  // const owner = web3.eth.accounts[0]
  const { abi, bytecode } = TRADEABLECASHFLOW_ARTIFACT

  // console.log({ ethAddress, web3 })
  // const incomeStream = new web3.eth.Contract(abi, {
  //   from: owner,
  //   data: bytecode,
  // })

  // stream owner
  // const incomeStreamOwner = owner.getAddress()
  // console.log(incomeStreamOwner)

  // deploy new token contract

  // console.log({ ethAddress })

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

  // .send({
  //     from: '0x1234567890123456789012345678901234567891',
  //     gas: 1500000,
  //     gasPrice: '30000000000000'
  // }

  // const tokenContract = await incomeStream.deploy(
  //   owner,
  //   'TradeableCashFlow', // name - could be dynamic
  //   'TCF', // symbol - could be dymanic
  //   '0xEB796bdb90fFA0f28255275e16936D25d3418603', //host
  //   '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873', // constantflow agreement
  //   '0x96B82B65ACF7072eFEb00502F45757F254c2a0D4', // accepted token (MATICx)
  // )

  // console.log({ tokenContract })

  // retreive token details
  const incomeStreamAddress = tokenContract._address
  const transactionHash = tokenContract.transactionHash

  // The contract is NOT deployed yet; we must wait until it is mined
  // await tokenContract.deployed()

  // console.log(deployedContract)
  // console.log(incomeStreamAddress)
  // console.log(transactionHash)

  return {
    address: incomeStreamAddress,
    // hash: transactionHash,
  }
}
