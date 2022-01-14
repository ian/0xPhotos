import Head from 'next/head'
import { useMoralis } from 'react-moralis'

export default function Home() {
  const { authenticate, isAuthenticated, user } = useMoralis()

  const handleLogin = async () => {
    authenticate({
      // provider: 'walletconnect',
      chainId: parseInt(process.env.NEXT_PUBLIC_ETH_CHAIN_ID),
    }).then((res) => console.log({ res }))
  }

  return (
    <div className="p-5">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mb-10">Homepage</h1>

      {!isAuthenticated && (
        <button className="p-2 border shadow rounded" onClick={handleLogin}>
          Moralis Login
        </button>
      )}

      {isAuthenticated && (
        <div>Current logged in user: {user?.get('username')}</div>
      )}
    </div>
  )
}
