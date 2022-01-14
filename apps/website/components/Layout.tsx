import Header from './Header'

export default function Layout(props) {
  const { className, children } = props

  return (
    <div>
      <Header />
      <div className={className}>{children}</div>
    </div>
  )
}
