import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'


const Blog = ({ blog, currentUser, setChange }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAllInfo, setShowAllInfo] = useState(false)

  const blogLiked = async (blog) => {
    const updateObject = { ...blog, likes: blog.likes + 1 }
    blog = await blogService.update(updateObject.id,updateObject)
    setChange(Math.random())
    setShowAllInfo(showAllInfo)
  }

  const deleteHandler = async (blog) => {
    if (window.confirm(`Do you want to remove "${blog.title}" by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setShowAllInfo(false)
      setChange(Math.random())
    }
  }

  if (showAllInfo)
  {
    console.log(blog.user)
    if (currentUser &&  blog.user.name === currentUser.name)
    {
      return (

        <div style={blogStyle}>
          <div onClick={() => setShowAllInfo(0)}>
            <p>{blog.title} by {blog.author}</p>
            <p>URL: <a href={blog.url}>{blog.url}</a></p> {/*links obviously are fake anyway, but I did not manage to get them to work externally*/}
            <p>{blog.likes} likes <button onClick = {() => blogLiked(blog)}>like</button></p>
            <p>added by {blog.user.name}</p>
            <p><button onClick = {() => deleteHandler(blog)}>remove</button></p>
          </div>
        </div>
      )
    }
    else
    {
      return (

        <div style={blogStyle}>
          <div onClick={() => setShowAllInfo(0)}>
            <p>{blog.title} by {blog.author}</p>
            <p>URL: <a href={blog.url}>{blog.url}</a></p> {/*links obviously are fake anyway, but I did not manage to get them to work externally*/}
            <p>{blog.likes} likes <button onClick = {() => blogLiked(blog.id)}>like</button></p>
            <p>added by {blog.user.name}</p>
          </div>
        </div>
      )
    }
  }
  else
  {
    return (
      <div style={blogStyle}>
        <div onClick={() => setShowAllInfo(1)}>
          {blog.title} by {blog.author}
        </div>
      </div>
    )
  }
}

Blog.propTypes =  {
  blog: PropTypes.object.isRequired,
  handleBlogLiked: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired


}

export default Blog
