import Link from 'next/link'
import Masonry from 'react-masonry-css'

export default function Grid(props) {
  const { elements } = props

  return (
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {elements.map((e, i) => (
        <div className="" key={`element-${i}`}>
          <Link href={`/assets/${e.tokenId}`}>
            <a>
              <img src={e.url} />
            </a>
          </Link>
        </div>
      ))}
    </Masonry>
  )
  // return (
  //   <Masonry
  //     className={'my-gallery-class'} // default ''
  //     elementType={'ul'} // default 'div'
  //     options={masonryOptions} // default {}
  //     disableImagesLoaded={false} // default false
  //     updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
  //     //  imagesLoadedOptions={imagesLoadedOptions} // default {}
  //   >
  //     {elements.map((e) => (
  //       <li className="image-element-class">
  //         <img src={e.url} />
  //       </li>
  //     ))}
  //   </Masonry>
  // )
}