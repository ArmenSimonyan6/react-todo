import React, { useState } from 'react'
import { Button } from '../shared/Button/Button'
import { Input } from '../shared/Input/Input'
import editIcon from '../../assets/icons/edit (2).png'
import deleteIcon from '../../assets/icons/remove (2).png'
import PostChecked from './PostChecked'
import Api from '../../services/Api'

const PostItem = (props) => {

    const [title, setTitle] = useState("")
    const [originalTitle, setOriginalTitle] = useState("")
    const [modified, setModified] = useState(false)

    const editPosts = (id, title) => {
        if (props.toggle !== id) {
            props.setToggle(id);
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
                props.setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.id === id ? { ...post, title: updatePost.title } : post
                    )
                );
                props.setToggle(null);
            }
        } catch (error) {
            console.log("Error", error);

        }

        setModified(true)
        props.post.title = title
        props.setToggle(null)
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
                props.toggle === props.post.id ?
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Input value={title} onChange={handleTitleChange} />
                        {
                            modified ?
                                <Button
                                    onClick={() => savePosts(props.post.id)}
                                    style={{ borderBottomRightRadius: "30px", borderTopRightRadius: "30px" }}>
                                    Save</Button>
                                :
                                <Button
                                    onClick={() => props.setToggle(null)}
                                    style={{ borderBottomRightRadius: "30px", borderTopRightRadius: "30px" }}>
                                    Back</Button>
                        }
                    </form>
                    :
                    <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {props.idx}.
                            <div className="title" key={props.post.id} style={{
                            textDecoration: props.post.completed ? "line-through" : "none",
                            cursor: "pointer",
                            padding: "10px"
                        }}>{props.post.title}</div>
                            <div style={{ display: "flex"}}>
                                <button className='icons' onClick={() => editPosts(props.post.id, props.post.title)} style={{ display: "flex", alignItems: "center", width: "35px", height: "35px", background: "white", border: "none", cursor: 'pointer' }}>
                                    <img src={editIcon} alt="" style={{ width: "30px", height: "30px" }} />
                                </button>
                                <button className='icons' onClick={() => props.deletePost(props.post.id)} style={{ display: "flex", alignItems: "center", width: "35px", height: "35px", background: "white", border: "none", cursor: 'pointer' }}>
                                    <img src={deleteIcon} alt="" style={{ width: "30px", height: "30px" }} />
                                </button>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <button
                            className='icons'
                                onClick={() => props.toggleDone(props.post)}
                                style={{ display: "flex", alignItems: "center", width: "35px", height: "35px", background: "white", border: "none", cursor: 'pointer' }}
                            >
                                <PostChecked done={props.post.completed} />
                            </button>
                        </div>
                    </>
            }
        </div>
    )
}

export default PostItem