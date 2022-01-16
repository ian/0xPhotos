import Head from 'next/head'
import Header from './Header'

export default function Layout(props) {
  const { className, children } = props

  return (
    <div>
      <Head>
        <title>0xPhotos</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className={className}>{children}</div>
    </div>
  )
}
