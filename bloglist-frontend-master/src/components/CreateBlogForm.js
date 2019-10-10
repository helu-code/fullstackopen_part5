/* eslint-disable linebreak-style */
import React from 'react'

const CreateBlogForm = ({handleSubmit, handleOnChange, title,author,url }) => {

  return (
    <form onSubmit={handleSubmit}>
      <div>
      title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => handleOnChange('title',target.value)}
        />
      </div>
      <div>
      author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => handleOnChange('author',target.value)}
        />
      </div>
      <div>
      url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => handleOnChange('url',target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

}

export default CreateBlogForm