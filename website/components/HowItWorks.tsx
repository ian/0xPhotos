export default function HowItWorks(props) {
  const { className } = props
  return (
    <section className={className}>
      <h3 className="text-xl font-semibold">How 0xPhoto works</h3>
      <div className="grid grid-cols-2 gap-10 mt-10">
        <div className="flex flex-col space-y-5 items-start">
          <img src="/images/camera.svg" alt="Camera" className="h-8" />
          <p>
            Provide your high quality images and content for other creatives to
            use. The more you create and share, the more opporunities you have
            to earn.{" "}
          </p>
        </div>
        <div className="flex flex-col space-y-5 items-start">
          <img src="/images/chart_pie.svg" alt="Pie Chart" className="h-8" />
          <p>
            You set your base price (we’ll give you a suggestion). Wider use of
            your image will increase the price buyers pay. You will keep 98% of
            the price as your royalty.
          </p>
        </div>
        <div className="flex flex-col space-y-5 items-start">
          <img src="/images/lightning.svg" alt="Lightning" className="h-8" />
          <p>
            We turn your content into an NFT. This NFT becomes an asset that
            earns royalty payments - giving you full control.{" "}
          </p>
        </div>
        <div className="flex flex-col space-y-5 items-start">
          <img src="/images/hourglass.svg" alt="Hourglass" className="h-8" />
          <p>
            Royalties are paid upfront or streamed every second to the holder of
            the NFT. You can sell, trade, finance the NFT through other NFT and
            Defi Protocols.{" "}
          </p>
        </div>
      </div>
    </section>
  )
}
