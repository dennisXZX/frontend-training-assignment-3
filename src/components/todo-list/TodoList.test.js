import React from 'react'
import { TodoList } from './TodoList'
import { shallow } from 'enzyme'

describe('<TodoList />', () => {
  it('calls addTodo Redux action creator with button click', () => {
    const props = {
      addTodo: jest.fn(),
      todos: []
    }

    const wrapper = shallow(<TodoList {...props} />)

    // simulate a change event
    wrapper.find('input')
      .simulate('change', { currentTarget: { value: 'Buy Groceries' } })

    // simulate a click event to add a to-do item
    wrapper.find('.todo--button')
      .simulate('click')

    // expect the addTodo action creator has been called with the correct value
    expect(props.addTodo).toHaveBeenCalledWith({ text: 'Buy Groceries' })
  })

  it('calls removeTodo Redux action creator on li click', () => {
    const props = {
      removeTodo: jest.fn(),
      todos: [{ text: 'Buy groceries' }, { text: 'Change oil' }]
    }

    const wrapper = shallow(<TodoList {...props} />)

    wrapper.find('li').at(0).simulate('click')

    // expect the removeTodo action creator has been called with the correct value
    expect(props.removeTodo).toHaveBeenCalledWith(0)
  })
})
