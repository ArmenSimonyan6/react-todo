import React from 'react'
import PostItem from './PostItem'

const PostList = ({posts, deletePost, toggleDone}) => {
  return (
    <div>
        {
          posts.length === 0? 
          <h1 style={{textAlign: "center", marginTop: "30px"}}>No Post Found</h1> :
            posts.map((post, idx) => <PostItem key={post.id} post={post} toggleDone={toggleDone} deletePost={deletePost} idx={idx + 1}/>)
        }
    </div>
  )
}

export default PostList