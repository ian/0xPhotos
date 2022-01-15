import Link from 'next/link'

export default function Grid(props) {
  const { elements } = props

  return (
    <div className="masonry-2-col">
      {elements.map((e, i) => (
        <div className="mb-5" key={`element-${i}`}>
          <Link href={`/assets/${e.tokenId}`}>
            <a>
              <img src={e.url} />
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}
