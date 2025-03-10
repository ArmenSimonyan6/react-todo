import { useEffect, useMemo, useState } from 'react';
import './App.css';
import './styles/Global.css'
import PostForm from './components/containers/PostForm';
import PostList from './components/containers/PostList';
import Api from './services/Api';
import Loader from './components/shared/Loader/Loader';
import { Input } from './components/shared/Input/Input';

function App() {

  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState("")
  const [loader, setLoder] = useState(false)
  const [searchPosts, setSearchPosts] = useState("");
  const [disabled, setDisabled] = useState(false)
  


  const addNewPost = (e) => {
    e.preventDefault()

    if (!newPost.title || !newPost.title.trim()) return


    setPosts((prevPosts) => [
      {
        id: new Date().getTime().toString(),
        title: newPost.title,
        done: false
      },
      ...prevPosts
    ])

    setNewPost({
      ...newPost,
      title: "",
    })
  }

  const toggleDone = (id) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id ? { ...post, done: !post.done } : post
      )
    );
  };

  const deletePost = (id) => {
    setPosts([...posts.filter((post) => post.id !== id)])
  }

  const sortedAndSearchPosts = useMemo(() => {
    return posts.filter((post) => post.title.toLowerCase().includes(searchPosts.toLowerCase()));
  }, [posts, searchPosts]);

  async function fetchPosts() {
    setLoder(true)
    const response = await Api.getPosts()
    const formattedPosts = response.map(post => ({
      id: post.id,
      title: post.title,
      done: post.completed
    }));
    setPosts(formattedPosts)
    setLoder(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="App">
      <div style={{ border: "6px solid #f8b13b", padding: "30px", margin: "40px" }}>
        <div style={{ color: "#f8b13b" }}>
          <h1>Todo List</h1>
          <p style={{ marginBottom: "20px" }}>Total {posts.length} posts</p>
        </div>
        <PostForm addNewPost={addNewPost} newPost={newPost} setNewPost={setNewPost} />
        <Input className="search-input" placeholder='search' value={searchPosts} onChange={(e) => setSearchPosts(e.target.value)} />
        {loader ? <Loader /> : <PostList toggleDone={toggleDone} posts={sortedAndSearchPosts} deletePost={deletePost} />}
      </div>
    </div>
  )
}

export default App;
