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
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        {/* <div className="flex-1">
          <a href={asset.href} className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">{asset.title}</p>
            <p className="mt-3 text-base text-gray-500">{asset.description}</p>
          </a>
        </div> */}

        {/* <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href={asset.author.href}>
              <span className="sr-only">{asset.author.name}</span>
              <img
                className="h-10 w-10 rounded-full"
                src={asset.author.imageUrl}
                alt=""
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <a href={asset.author.href} className="hover:underline">
                {asset.author.name}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={asset.datetime}>{asset.date}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{asset.readingTime} read</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
