/* eslint-disable linebreak-style */
import React from 'react'
import { render, fireEvent,cleanup } from '@testing-library/react' // highlight-line
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test.skip('renders content', () => {
  const blog = {
    title: 'testblog',
    author: 'helu',
    url: 'www.test.blog',
    likes: 3
    //id: notes.length + 1,
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'testblog helu'
  )

  expect(component.container).toHaveTextContent(
    'blog has 3 likes'
  )

  //  const div = component.container.querySelector('.likes')
  //  console.log(div)


  // expect(component).toHaveTextContent(
  //   3
  // )
})



test('likes button click test', () => {
  const blog = {
    title: 'testblog',
    author: 'helu',
    url: 'www.test.blog',
    likes: 3
    //id: notes.length + 1,
  }

  // const handleOnClick =() => {
  //   blog.likes += 1
  // }

  const mockHandler = jest.fn()


  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )


  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})

