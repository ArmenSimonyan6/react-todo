import React, { useState } from 'react'
import PostItem from './PostItem'

const PostList = ({posts, deletePost, toggleDone}) => {
      const [toggle, setToggle] = useState(null)
  

  return (
    <div>
        {
          posts.length === 0? 
          <h1 style={{textAlign: "center", marginTop: "30px"}}>No Post Found</h1> :
            posts.map((post, idx) => <PostItem 
            key={post.id} 
            post={post} 
            toggle={toggle}
            toggleDone={toggleDone} 
            deletePost={deletePost} 
            setToggle={setToggle}
            idx={idx + 1}/>)
        }
    </div>
  )
}

export default PostList