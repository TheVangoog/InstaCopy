
import PostCardBlock from "../../Components/PostCardBlock/PostCardBlock"

export default function Gallery() {
  return (
    <div className="gallery
     row-span-11 col-span-12 md:row-span-12 md:col-span-9
     overflow-auto
     p-5
     flex flex-col items-center gap-20
     ">
      <PostCardBlock/>
     </div>
  )
}