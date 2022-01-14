import Header from './Header'

export default function Layout(props) {
  const { children } = props

  return (
    <div>
      <Header />
      <div className="p-5">{children}</div>
    </div>
  )
}
