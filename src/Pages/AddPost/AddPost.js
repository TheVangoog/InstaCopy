import PostCard from "../../Components/PostCard/PostCard";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { encode, decode } from "base-64";
import Service from "../../Services/Service";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function AddPost() {
  // btoa atob photo
  // to make this you have to change db (posts contain photo)
  // addPost method
  // rerender main page
  //

  const [posts, setPosts] = useState(null)
  const [newestId, setNewestId] = useState(null);
  const [file, setFile] = useState(null);
  const [oldPost, setOldPost] = useState(null)
  const service = new Service()
  const currentUserId = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    if(!posts) {
      const getPosts = async () => {
        const posts = await service.getPosts()
        setPosts(posts);
      }
      getPosts()
    } else {
      setNewestId(posts.length + 1)
    }
  }, [file])
  

  const handleChange = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.onerror = (error) => {
        console.log("AHTUNG ERROR:" + error);
      }
    }
   const post = await service.getPost(0)
   setOldPost(post[0])
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(file)  
  }

  const handleAddPost = () => {
    const newPost = {
      dataType: "posts",
      id: `${newestId}`,
      url: file,
      likes: [],
      favourites: [],
      comments: [],
      userId: `${currentUserId}`,
    }
    service.addPost(newPost)
    navigate(`/`)
    a = 1
  }


  return (
    <div
      className="gallery
     row-span-11 col-span-12 md:row-span-12 md:col-span-9
     overflow-auto
     p-5
     flex flex-col items-center justify-center gap-20
     "
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">
        <input accept="image/*" onChange={handleChange} name="file" type="file" />
        <button onClick={handleAddPost} type="submit" className="btn ">
          Post
        </button>
      </form>
      <img alt="Preview here" src={file} className="max-w-64 max-h-64"/>
    </div>
  );
}