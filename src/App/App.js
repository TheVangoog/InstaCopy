
import { Routes, Route, Link } from "react-router-dom";
import Layout from '../Layout/Layout';
import Gallery from "../Pages/Gallery/Gallery";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/Login/Login";
import AddPost from "../Pages/AddPost/AddPost";
import Saved from "../Pages/Saved/Saved";
import './App.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Gallery />} />
          <Route path="login" element={<Login/>}/>
          <Route path="addpost" element={<AddPost/>}/>
          <Route path="saved" element={<Saved/>}/>
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  )
}


// @todo: intersection observer api (for lazy loading)
// base 64 converter