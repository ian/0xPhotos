export default function AssetCard(props) {
  const { asset } = props

  // return (
  //   <div className="border rounded">
  //     <img src={asset.url} alt={asset.name} className="h-32 bg-cover" />
  //   </div>
  // )

  console.log({ asset })

  return (
    <div
      key={asset.title}
      className="flex flex-col rounded-lg shadow-lg overflow-hidden border border-gray-2 00"
    >
      <div className="flex-shrink-0">
        <img className="h-48 w-full object-cover" src={asset.url} alt="" />
      </div>
    </div>
  )
}
