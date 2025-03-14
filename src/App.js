import { useEffect, useMemo, useState } from 'react';
import './App.css';
import './styles/Global.css'
import './styles/Media.css'
import PostForm from './containers/PostForm';
import PostList from './containers/PostList';
import Api from './services/Api';
import Loader from './components/shared/Loader/Loader';
import { Input } from './components/shared/Input/Input';
import { getPageCount, getPagesArray } from './containers/Pagination';
import { BrowserRouter, Link } from 'react-router-dom';

function App() {

  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ title: "" })
  const [loader, setLoder] = useState(false)
  const [searchPosts, setSearchPosts] = useState("");
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  async function fetchPosts() {
    setLoder(true)

    const response = await Api.getPosts(limit, page)
    setPosts([
      ...response.data
    ])
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
    
    setLoder(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [page])

  const pagesArray = getPagesArray(totalPages)

  const addNewPost = async (e) => {
    e.preventDefault()

    if (!newPost.title || !newPost.title.trim()) return
    try {
      const resp = await Api.addPost(newPost)
      setPosts((prevPosts) => [
        {
          id: new Date().getTime().toString(),
          title: resp.title,
          done: false
        },
        ...prevPosts
      ])

      setNewPost({
        ...newPost,
        title: "",
      })
    } catch (error) {
      console.log(error);
    }

  }

  const changePage = (page) => {
    setPage(page)
  }


  const toggleDone = async (todo) => {
    try {
      const updatedPost = await Api.updatePost(todo.id, { completed: !todo.completed });
      console.log(updatedPost);
      if (updatedPost) {
        setPosts((prevPosts) =>
          prevPosts.map((t) =>
            t.id === todo.id ? { ...t, completed: updatedPost.completed } : t
          )
        )
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const deletePost = async (id) => {
    await Api.deletePosts(id)
    setPosts(posts.filter((post) => post.id !== id))
  }

  const sortedAndSearchPosts = useMemo(() => {
    return posts.filter((post) => post.title.toLowerCase().includes(searchPosts.toLowerCase()));
  }, [posts, searchPosts]);


  return (
    <div className="App">
      <div className='todo' style={{ border: "6px solid #f8b13b", padding: "30px", margin: "40px" }}>
        <div style={{ color: "#f8b13b" }}>
          <h1>Todo List</h1>
          <p style={{ marginBottom: "20px" }}>Total {posts.length} posts</p>
        </div>
        <PostForm addNewPost={addNewPost} newPost={newPost} setNewPost={setNewPost} />
        <Input className="search-input" placeholder='search' value={searchPosts} onChange={(e) => setSearchPosts(e.target.value)} />
        {loader ? <Loader /> : <PostList toggleDone={toggleDone} posts={sortedAndSearchPosts} deletePost={deletePost} setPosts={setPosts} />}
        <div className='page__wrapper'>
          <BrowserRouter>
            {pagesArray.map((el) => <Link
              key={el}
              to={`/${el}`}
              className={page === el ? "page page__current" : "page"}
              onClick={() => changePage(el)}
            >{el}</Link>)}
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App;
