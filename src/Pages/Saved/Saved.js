import PostCardBlock from "../../Components/PostCardBlock/PostCardBlock"
import SavedCardBlock from "../../Components/SavedCardBlock/SavedCardBlock"

export default function Login() {
   return (
      <div className="gallery
       row-span-11 col-span-12 md:row-span-12 md:col-span-9
       overflow-auto
       flex flex-col items-center gap-20
       p-5
       ">
            <SavedCardBlock/>
      </div>
   )
}