import React, { useState } from 'react'
import { Button } from '../shared/Button/Button'
import { Input } from '../shared/Input/Input'
import editIcon from '../../assets/icons/edit (2).png'
import deleteIcon from '../../assets/icons/remove (2).png'
import PostChecked from './PostChecked'

const PostItem = (props) => {

    const [title, setTitle] = useState("")
    const [originalTitle, setOriginalTitle] = useState("")
    const [modified, setModified] = useState(false)


    const editPosts = (id, title) => {
        if (props.toggle !== id) {
            props.setToggle(id); // Открываем новый edit, закрывая предыдущий
            setTitle(title);
            setOriginalTitle(title);
            setModified(false);
        }
    };

    const savePosts = (id) => {
        if (!title.trim()) return

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

    const handleSubmit = (e) => {
        e.preventDefault();
        savePosts(props.post.id);
    };

    return (
        <div className='posts'>
            {
                props.toggle === props.post.id ?
                    <form onSubmit={handleSubmit}>
                        <Input value={title} onChange={handleTitleChange} />
                        {
                            modified ?
                                <Button
                                    onClick={() => savePosts(props.post.id)}
                                    style={{ borderBottomRightRadius: "30px", borderTopRightRadius: "30px" }}>
                                    Save</Button>
                                :
                                <Button onClick={() => props.setToggle(null)} style={{ borderBottomRightRadius: "30px", borderTopRightRadius: "30px" }}>Back</Button>
                        }
                    </form>
                    :
                    <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {props.idx}.
                            <div className="title" key={props.post.id} style={{ textDecoration: props.post.done ? "line-through" : "none" }}>{props.post.title}</div>
                            <div style={{ display: "flex" }}>
                                <button onClick={() => editPosts(props.post.id, props.post.title)} style={{ display: "flex", alignItems: "center", width: "35px", height: "35px", background: "white", border: "none", cursor: 'pointer' }}>
                                    <img src={editIcon} alt="" style={{ width: "30px", height: "30px" }} />
                                </button>
                                <button onClick={() => props.deletePost(props.post.id)} style={{ display: "flex", alignItems: "center", width: "35px", height: "35px", background: "white", border: "none", cursor: 'pointer' }}>
                                    <img src={deleteIcon} alt="" style={{ width: "30px", height: "30px" }} />
                                </button>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <button
                                onClick={() => props.toggleDone(props.post.id)}
                                style={{ display: "flex", alignItems: "center", width: "35px", height: "35px", background: "white", border: "none", cursor: 'pointer' }}
                            >
                                <PostChecked done={props.post.done} />
                            </button>
                        </div>
                    </>
            }
        </div>
    )
}

export default PostItem