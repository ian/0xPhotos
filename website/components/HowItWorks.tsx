export default function HowItWorks(props) {
  const { className } = props
  return (
    <section className={className}>
      <h3 className="text-4xl font-semibold">How it works</h3>
      <div className="grid grid-cols-2 gap-10 mt-10">
        <div className="flex flex-col space-y-5 items-start">
          <h2 className="text-xl font-medium">Premium Contributors</h2>
          <p className="text-gray-500">
            All contributors are screened for the highest quality so we can
            curate the best collection to support your creative projects.
          </p>
        </div>
        <div className="flex flex-col space-y-5 items-start">
          <h2 className="text-xl font-medium">Content minted as NFTs</h2>
          <p className="text-gray-500">
            All content and licenses are minted as NFTs ensuring trustless proof
            of ownership and permanence. NFTs can be sold along with master
            rights at any time.
          </p>
        </div>
        <div className="flex flex-col space-y-5 items-start">
          <h2 className="text-xl font-medium">USDC Compatible</h2>
          <p className="text-gray-500">
            Every license can be paid up front and directly to your wallet.
            Withdraw anytime directly to your bank account.
          </p>
        </div>
        <div className="flex flex-col space-y-5 items-start">
          <h2 className="text-xl font-medium">Manage your portfolio</h2>
          <p className="text-gray-500">
            Your real-time dashboard helps you see which licenses are valid or
            expiring. Contributors see future earnings and focus on delivering
            high demand content.
          </p>
        </div>
      </div>
    </section>
  )
}
