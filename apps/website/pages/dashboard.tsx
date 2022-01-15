import Link from 'next/link'
import Layout from '../components/Layout'

export default function Dashboard() {
  return (
    <Layout classsName="p-10">
      <h1 className="mb-10">Dashboard</h1>
      <Link href="/mint">
        <a className="bg-black text-white p-5">Mint</a>
      </Link>
    </Layout>
  )
}
