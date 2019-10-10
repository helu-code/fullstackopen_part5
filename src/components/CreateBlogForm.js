/* eslint-disable linebreak-style */
import React from 'react'
import useField from '../hooks/index'

const CreateBlogForm = ({ handleSubmit }) => {

  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const resetHandler = () => {
    title.resetField()
    author.resetField()
    url.resetField()
  }

  const submit = (event) => {
    handleSubmit(event)
    resetHandler()
  }

  return (
    <>
    <form onSubmit={submit}>
      <div>
      title:
        <input {...title} />
      </div>
      <div>
      author:
        <input {...author} />
      </div>
      <div>
      url:
        <input {...url}/>
      </div>
      <button type="submit">create</button>
    </form>
      <button onClick={resetHandler}>Reset</button>
      </>

  )

}

export default CreateBlogForm