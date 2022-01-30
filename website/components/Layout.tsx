import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

export default function Layout(props) {
  const { className, children } = props

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Head>
        <title>0xPhotos</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header />
        <div className={className}>{children}</div>
      </div>
      <Footer />
    </div>
  )
}
