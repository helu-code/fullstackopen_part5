import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

function App() {

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
      {
        console.log(initialBlogs)
        initialBlogs = initialBlogs.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0));
        setBlogs(initialBlogs)
        console.log('Sorted: ',initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      if (user)
        blogService.setToken(user.token)
    }
  }, [])


  const handleNewBlogFieldsChange = (field,value) =>  {
    if (field === 'title')
      setNewBlogTitle(value)
    else if (field === 'author')
      setNewBlogAuthor(value)
    else if (field === 'url')
      setNewBlogUrl(value)
  }

  const blogLiked = id => {
    console.log('id:',id)
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    console.log('bloglikes:',blog)

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(note => note.id !== id ? note : returnedBlog))
      })
      .catch(error => {
        console.log(error)
        setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const removeBlog = id => {
    const blog = blogs.find(n => n.id === id)

    if (window.confirm('remove blog '+blog.title +' by '+blog.user.name ))
    {
      blogService
        .deleteBlog(id)
        .then(response => {
          console.log(response)
          setBlogs(blogs.filter(n => n.id !== id))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(null)
      )
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      like: 0
      //id: notes.length + 1,
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        setNewBlogAuthor('')
        setNewBlogTitle('')
        setNewBlogUrl('')
      })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  return (
    <div>
      <h1>Blogs</h1>

      {/* <Notification message={errorMessage} /> */}

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <CreateBlogForm
              handleSubmit={handleCreateBlog}
              handleOnChange = {handleNewBlogFieldsChange}
              title = {newBlogTitle}
              author = {newBlogAuthor}
              url = {newBlogUrl}
            />
          </Togglable>
        </div>
      }

      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleBlogLiked = {blogLiked}
            handleRemoveBlog = {removeBlog}
            currentUser = {user}
          />
        )}
      </div>

    </div>
  )
}

export default App;
