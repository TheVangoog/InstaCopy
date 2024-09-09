import Service from "../../Services/Service"
import { useState, useEffect } from "react";
import PostCard from "../PostCard/PostCard";
import { useSelector, } from "react-redux";
const service = new Service();


// UNDONE
export default function UserCardBlock() {
    const currentUserId = useSelector((state) => state.user.value);
    const TogglerState = useSelector((state) => state.user.toggler);
    const [togglerState, setTogglerState] = useState(false)
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const posts = await service.getUserFavourtiePosts(currentUserId);
                console.log(posts)
                setSavedPosts(posts);
            } catch (err) {
                console.log('Error occured when fetching posts' + err);
            }
        })();
    }, [currentUserId, TogglerState]);

    if (savedPosts) {
        const bookmarkedPosts = Object.keys(savedPosts).map(key => {
            const item = savedPosts[key];
            return <PostCard props={item} key={key} currentUserId={currentUserId} togglerState={togglerState} setTogglerState={setTogglerState}/>
        });
        return (
            < >
                {bookmarkedPosts}
            </>
        )
    }
}