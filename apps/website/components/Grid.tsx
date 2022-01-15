import Link from 'next/link'

export default function Grid(props) {
  const { elements } = props

  return (
    // <Masonry
    //   breakpointCols={2}
    //   // className="my-masonry-grid"
    //   // columnClassName="my-masonry-grid_column"
    // >
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
    // </Masonry>
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
