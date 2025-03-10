import React from 'react'
import { Input } from '../shared/Input/Input'
import { Button } from '../shared/Button/Button'

const PostForm = ({ addNewPost, newPost, setNewPost }) => {
    return (
        <form onSubmit={addNewPost}>
            <div className='form'>
                <Input value={newPost.title} placeholder="Title" type="text" onChange={(e) => setNewPost({
                    ...newPost,
                    title: e.target.value
                })} />
                <Button type="submit">Add</Button>
            </div>
        </form>
    )
}

export default PostForm