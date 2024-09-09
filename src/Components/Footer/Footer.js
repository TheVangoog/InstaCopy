import Accounts from "../../Assets/Icons/Accounts"
import Home from "../../Assets/Icons/Home"
import Add from "../../Assets/Icons/Add"
import { Link } from "react-router-dom"
import BookmarkActive from "../../Assets/Icons/BookmarkActive"

export default function Footer() {
    return (
        <div className='footer
     col-span-12 row-span-1
     md:hidden
     border-t
     divide-slate-100/25
     flex flex-row items-center
     justify-center
     gap-5 p-5
      '>
          <Link to="/" className="home flex gap-4 font-medium">
            <Home/>
          </Link>
          <Link to="/login" className="home flex gap-4 font-medium">
            <Accounts />
          </Link>
          <Link to="/addpost" className="home flex gap-4 font-medium">
            <Add/>
          </Link>
          <Link to="/saved" className="home flex gap-4 font-medium">
            <BookmarkActive/>
          </Link>
      </div>
    )
}
