import React, { useState } from 'react'
import { Button } from '../components/shared/Button/Button'
import { Input } from '../components/shared/Input/Input'
import editIcon from '../assets/icons/edit (2).png'
import deleteIcon from '../assets/icons/remove (2).png'
import PostChecked from './PostChecked'
import Api from '../services/Api'

const PostItem = ({post, setPosts, toggle, toggleDone, deletePost, setToggle, idx}) => {

    const [title, setTitle] = useState("")
    const [originalTitle, setOriginalTitle] = useState("")
    const [modified, setModified] = useState(false)

    const editPosts = (id, title) => {
        if (toggle !== id) {
            setToggle(id);
            setTitle(title);
            setOriginalTitle(title);
            setModified(false);
        }
    };

    const savePosts = async (id) => {
        if (!title.trim()) return

        try {
            const updatePost = await Api.updatePost(id, { title });
            if (updatePost) {
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.id === id ? { ...post, title: updatePost.title } : post
                    )
                );
                setToggle(null);
            }            

        } catch (error) {
            console.log("Error", error);

        }


        setModified(true)
        // post.title = title
        setToggle(null)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
        if (e.target.value !== originalTitle) {
            setModified(true)
        } else {
            setModified(false)
        }
    }

    return (
        <div className='posts'>
            {
                toggle === post.id ?
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Input value={title} onChange={handleTitleChange} />
                        {
                            modified ?
                                <Button
                                    onClick={() => savePosts(post.id)}
                                    style={{ borderBottomRightRadius: "30px", borderTopRightRadius: "30px" }}>
                                    Save</Button>
                                :
                                <Button
                                    onClick={() => setToggle(null)}
                                    style={{ borderBottomRightRadius: "30px", borderTopRightRadius: "30px" }}>
                                    Back</Button>
                        }
                    </form>
                    :
                    <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {idx}.
                            <div className="title" key={post.id} style={{
                            textDecoration: post.completed ? "line-through" : "none",
                            cursor: "pointer",
                            padding: "10px"
                        }}>{post.title}</div>
                            <div style={{ display: "flex"}}>
                                <button className='icons' onClick={() => editPosts(post.id, post.title)} style={{ display: "flex", alignItems: "center", width: "35px", height: "35px", background: "white", border: "none", cursor: 'pointer' }}>
                                    <img src={editIcon} alt="" style={{ width: "30px", height: "30px" }} />
                                </button>
                                <button className='icons' onClick={() => deletePost(post.id)} style={{ display: "flex", alignItems: "center", width: "35px", height: "35px", background: "white", border: "none", cursor: 'pointer' }}>
                                    <img src={deleteIcon} alt="" style={{ width: "30px", height: "30px" }} />
                                </button>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <button
                            className='icons'
                                onClick={() => toggleDone(post)}
                                style={{ display: "flex", alignItems: "center", width: "35px", height: "35px", background: "white", border: "none", cursor: 'pointer' }}
                            >
                                <PostChecked done={post.completed} />
                            </button>
                        </div>
                    </>
            }
        </div>
    )
}

export default PostItem