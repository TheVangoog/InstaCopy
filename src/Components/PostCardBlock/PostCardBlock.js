
import Service from "../../Services/Service"
import { useState, useEffect } from "react";
import PostCard from "../PostCard/PostCard";
import { useSelector, useDispatch } from "react-redux";
const service = new Service();

export default function PostCardBlock() {
    const TogglerState = useSelector((state) => state.user.toggler);
    const [togglerState, setTogglerState] = useState(false)
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                // console.log("posts data loaded");
                const posts = await service.getPosts();
                setPosts(posts);
            } catch (err) {
                console.log('Error occured when fetching posts' + err);
            }
        })();
    }, [TogglerState]);

    if (posts) {
        const galleryPosts = Object.keys(posts).map(key => {
            const item = posts[key];
            return <PostCard props={item} key={key} togglerState={togglerState} setTogglerState={setTogglerState}/>
        });
        return (
            < >
                {galleryPosts}
            </>
        )
    }
}

// todo: refactor db so that i can easily pull out an user for servise getUser(userID) function