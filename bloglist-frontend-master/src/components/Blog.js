import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, handleBlogLiked, handleRemoveBlog,currentUser }) => {

  const [showAllInfo, setShowAllInfo] = useState(false)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (showAllInfo)
  {
    console.log(blog.user)
    if (currentUser &&  blog.user.name === currentUser.name)
    {
      return (

        <div style={blogStyle}>
          <div onClick={() => setShowAllInfo(0)}>
            {blog.title} {blog.author}
            <p>{blog.likes} likes <button onClick = {() => handleBlogLiked(blog.id)}>like</button></p>
            <p>added by {blog.user.name}</p>
            <p><button onClick = {() => handleRemoveBlog(blog.id)}>remove</button></p>
          </div>
        </div>
      )
    }
    else
    {
      return (

        <div style={blogStyle}>
          <div onClick={() => setShowAllInfo(0)}>
            {blog.title} {blog.author}
            <p>{blog.likes} likes <button onClick = {() => handleBlogLiked(blog.id)}>like</button></p>
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
          {blog.title} {blog.author}
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
