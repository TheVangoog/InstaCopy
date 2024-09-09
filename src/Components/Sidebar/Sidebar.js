import { Link } from "react-router-dom";

import Camera from "../../Assets/Icons/Camera";
import Accounts from "../../Assets/Icons/Accounts";
import Home from "../../Assets/Icons/Home";
import Add from "../../Assets/Icons/Add";
import BookmarkActive from "../../Assets/Icons/BookmarkActive";

export default function Sidebar() {
  return (
    <>
      <div
        className="sidebar hidden
        md:flex flex-col gap-6 md:col-span-3 md:row-span-12 bg-slate-900
        justify-between
        p-5
        "
      >
        <div className="flex flex-col gap-6 ">
          <Link to="/" className="home flex gap-4 font-medium">
            <Camera /> Outstagram
          </Link>
          <Link to="/" className="home flex gap-4 font-medium">
            <Home/> Home
          </Link>
          <Link to="/login" className="home flex gap-4 font-medium">
            <Accounts /> Accounts
          </Link>
          <Link to="/addpost" className="home flex gap-4 font-medium">
            <Add/> Add Post
          </Link>
          <Link to="/saved" className="home flex gap-4 font-medium">
            <BookmarkActive/> Saved
          </Link>
        </div>
        <div className="flex flex-col gap-6 ">
          <h1 className="flex gap-4 font-medium">
            <Camera /> There will be For You section
          </h1>
          <span className="flex gap-4">
            <Home /> Home
          </span>
          <span className="flex gap-4">
            <Accounts /> Accounts
          </span>
          <span className="flex gap-4">
            <Add /> Add Post
          </span>
        </div>
      </div>
    </>
  );
}
