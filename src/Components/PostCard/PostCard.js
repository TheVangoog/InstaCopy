import Bookmark from "../../Assets/Icons/Bookmark";
import BookmarkActive from "../../Assets/Icons/BookmarkActive"
import Like from "../../Assets/Icons/Like";
import LikeActive from "../../Assets/Icons/LikeActive";
import Chat from "../../Assets/Icons/Chat";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATEPOST, UPDATEUSER, UPDATESTATE } from "../../Redux/userSlice";
import Service from '../../Services/Service';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import { current } from "@reduxjs/toolkit";

const service = new Service();

export default function PostCard(props) {
  const dispatch = useDispatch();

  const [postData, setPostData] = useState(null);
  const [userThatPostedData, setUserThatPostedData] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentUserId = useSelector((state) => state.user.value);
  const [togglerState, setTogglerState] = useState(false);



// ON MOUNT useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
          const post = props.props;
          setPostData(post);
        const currentUser = await service.getUser(currentUserId);
        setCurrentUserData(...currentUser);
      } catch (err) {
        console.error("Error occurred when fetching data", err);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, [props.props, currentUserId,]);

  // TogglerUseEffect 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userThatPostedData)  {
          const userThatPosted = await service.getUser(props.props.userId);
          setUserThatPostedData(...userThatPosted);
        }

        const currentUser = await service.getUser(currentUserId);
        setCurrentUserData(...currentUser);

        const newPostData = await service.getPost(props.props.id)
        setPostData(...newPostData)
      } catch (err) {
        console.error("Error occurred when fetching data", err);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData();
  }, [togglerState, userThatPostedData])
  

  const checkIfBookmarked =  () => {
    if(!postData) return
    console.log(postData.favourites, currentUserId)
    return postData.favourites.includes(currentUserId)
  }
  const checkIfLiked =  () => {
    if(!postData) return
    return postData.likes.includes(currentUserId)
  }


  const removeBookmark = () => {
    const newPostData = postData
    const newBookmarks = newPostData.favourites.filter(fav => fav !== currentUserId)
    newPostData.favourites = newBookmarks

    const newUserData = currentUserData
    const newUserBookmarks = newUserData.favourites.filter(fav => fav !== props.props.id)
    newUserData.favourites = newUserBookmarks
    
    dispatch(UPDATEPOST(newPostData))
    dispatch(UPDATEUSER(newUserData))
    dispatch(UPDATESTATE(currentUserId))
  }

  const addBookmark = () => {
    const newPostData = postData
    const newBookmarks = [...newPostData.favourites, currentUserId]
    newPostData.favourites = newBookmarks
    
    const newUserData = currentUserData
    const newUserBookmarks = [...newUserData.favourites, props.props.id]
    newUserData.favourites = newUserBookmarks
    dispatch(UPDATEPOST(newPostData))
    dispatch(UPDATEUSER(newUserData))
    dispatch(UPDATESTATE(currentUserId))
    setTogglerState(!togglerState)
  }

  const removeLike = () => {
    const newPostData = postData
    const newLikes = newPostData.likes.filter(like => like !== currentUserId)
    newPostData.likes = newLikes


    const newUserData = currentUserData
    const newUserLikes = newUserData.likes.filter(like => like !== props.props.id)
    newUserData.likes = newUserLikes
    
    dispatch(UPDATEPOST(newPostData))
    dispatch(UPDATEUSER(newUserData))
    dispatch(UPDATESTATE(currentUserId))
  }

  const addLike = () => {
    const newPostData = postData
    const newLikes = [...newPostData.likes, currentUserId]
    newPostData.likes = newLikes
    
    const newUserData = currentUserData
    const newUserLikes = [...newUserData.likes, props.props.id]
    newUserData.likes = newUserLikes

    dispatch(UPDATEPOST(newPostData))
    dispatch(UPDATEUSER(newUserData))
    dispatch(UPDATESTATE(currentUserId))
    setTogglerState(!togglerState)
  }

  const handleBookmarked = () => {
    if (!postData) return

    if(checkIfBookmarked()) {
      removeBookmark()
    } else {
      addBookmark()
    }
  }

  const handleLiked = () => {
    if (!postData) return

    if(checkIfLiked()) {
      removeLike()
    } else {
      addLike()
    }
  }

  return (
    <div className="postcard bg-transparent min-w-[14rem] md:min-w-[30rem] max-w-[25rem] md:max-w-[30rem] max-h-[40rem] flex flex-col items-center border-slate-700 border-2">
      <div className="card-user bg-slate-800 min-h-[4rem] w-full flex flex-row items-center gap-5 p-5">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Taras_Shevchenko_-_portrait_by_Ivan_Kramskoi.jpg/1200px-Taras_Shevchenko_-_portrait_by_Ivan_Kramskoi.jpg"
          alt="avatar"
          className="avatar w-12 h-12 rounded-full"
        />
        <span className="username text-white text-base">
          {userThatPostedData?.name}
        </span>
      </div>
      <div className="card-image-container min-h-64 flex items-center justify-center overflow-hidden">
        <img
          src={postData?.url}
          alt="avatar"
          className="avatar"
        />
      </div>
      <div className="card-icons bg-slate-800 w-full h-20 flex flex-row justify-between items-center">
        <div className="card-left-icons flex flex-row p-4 gap-4">
          <span onClick={handleLiked} >{checkIfLiked() ? <LikeActive/> : <Like />}</span>
          <span>{postData?.likes.length}</span>
          <Chat />
        </div>
        <div className="card-right-icons flex flex-row p-4 gap-4">
          <span onClick={handleBookmarked} >{ checkIfBookmarked() ? <BookmarkActive/> : <Bookmark />}</span>
        </div>
      </div>
    </div>
  );
}

// @todo: looks like updating data directly from the service works. Bookmarks may be ready, do likes.