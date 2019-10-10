import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

function App() {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [monitorChange, setChange] = useState(Math.random())
  const[notificationMsg,setNotificationMsg] = useState(null)
  const[notificationMsgType,setNotificationMsgType] = useState(0)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
      {
        initialBlogs = initialBlogs.sort((a,b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0))
        setBlogs(initialBlogs)
      })
  }, [monitorChange])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      if (user)
        blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[1].value
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setNotificationMsg('User '+user.name + ' logged in')
    } catch (exception) {
      console.log(exception)
      setNotificationMsgType(1)
      setNotificationMsg('Error logging')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setNotificationMsg('User '+user.name + ' logged out')
    setUser(null)
  }

  const handleNotificationShowEnd = () => {
    setNotificationMsg(null)
    setNotificationMsgType(0)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value,
      likes: 0
    }

    try
    {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setChange(Math.random())
    }
    catch (error)
    {
      console.log(error)
    }
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
            handleLogin={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  return (
    <div>
      <h1>Blogs</h1>

      { <Notification message={notificationMsg} type={notificationMsgType} showEnd={handleNotificationShowEnd} /> }

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <CreateBlogForm
              handleSubmit={handleCreateBlog}
            />
          </Togglable>
        </div>
      }

      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            currentUser = {user}
            setChange = {setChange}
          />
        )}
      </div>

    </div>
  )
}

export default App;
