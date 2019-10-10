/* eslint-disable linebreak-style */
import React from 'react'
import { render, fireEvent,cleanup } from '@testing-library/react' // highlight-line
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'testblog',
    author: 'helu',
    url: 'www.test.blog',
    like: 3
    //id: notes.length + 1,
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  //  const element = component.getByText(
  //    'testblog')
  //    expect(element).toBeDefined()
   expect(component).toHaveTextContent(
     'testblog'
   )
  // expect(component).toHaveTextContent(
  //   3
  // )
})
