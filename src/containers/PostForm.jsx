import React from 'react'
import { Input } from '../components/shared/Input/Input'
import { Button } from '../components/shared/Button/Button'

const PostForm = ({ addNewPost, newPost, setNewPost }) => {


    const handleChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\s+/g, " ");
        value = value.trimStart();

        setNewPost({
            title: value 
        });
    };

    return (
        <form onSubmit={addNewPost}>
            <div className='form'>
                <Input value={newPost.title} placeholder="Title" type="text" onChange={handleChange} />
                <Button type="submit" style={{ cursor: !newPost?.title?.trim() ? "default" : "pointer" }}>Add</Button>
            </div>
        </form>
    )
}

export default PostForm