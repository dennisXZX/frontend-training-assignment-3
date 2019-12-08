import React from 'react'
import App, { Link } from './App'
import { shallow } from 'enzyme'

describe('<App /> shallow rendering', () => {
  it('h1 contains correct text', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find('h1').text()).toBe('Welcome to React')
  })

  it('updates className with new State', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find('.blue').length).toBe(1)
    expect(wrapper.find('.red').length).toBe(0)

    // update component state
    wrapper.setState({ mainColor: 'red' })

    expect(wrapper.find('.blue').length).toBe(0)
    expect(wrapper.find('.red').length).toBe(1)    
  })

  it('on button click changes p text', () => {
    const wrapper = shallow(<App />)
    const button = wrapper.find('button')
    expect(wrapper.find('.button-state').text()).toBe('No!')

    // simulate a click event on the button
    button.simulate('click')

    expect(wrapper.find('.button-state').text()).toBe('Yes!')
  })

  it('on input change, title changes text', () => {
    const wrapper = shallow(<App />)
    const input = wrapper.find('input')

    expect(wrapper.find('h2').text()).toBe('')

    // simulate a change event on the input field
    // passing in the event object
    input.simulate('change', { currentTarget: { value: 'Tyler' } })

    expect(wrapper.find('h2').text()).toBe('Tyler')
  })

  it('calls componentDidMount, updates p tag text', () => {
    jest.spyOn(App.prototype, 'componentDidMount')
    const wrapper = shallow(<App />)

    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)

    expect(wrapper.find('.lifeCycle').text()).toBe('componentDidMount')
  })

  it('setProps calls componentWillReceiveProps', () => {
    jest.spyOn(App.prototype, 'componentWillReceiveProps')
    const wrapper = shallow(<App />)

    // use setProps() to trigger componentWillReceiveProps() lifecycle method
    wrapper.setProps({ hide: true })

    expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1)

    expect(wrapper.find('.lifeCycle').text()).toBe('componentWillReceiveProps')
  })

  it('handleStrings function returns correctly', () => {
    const wrapper = shallow(<App />)

    // use instance() to access the component's method
    const trueReturn = wrapper.instance().handleStrings('Hello World')
    const falseReturn = wrapper.instance().handleStrings('')

    expect(trueReturn).toBe(true)
    expect(falseReturn).toBe(false)
  })
})

describe('<Link />', () => {
  it('link component accepts address prop', () => {
    const wrapper = shallow(<Link address='www.google.com' />)

    expect(wrapper.instance().props.address).toBe('www.google.com')
  })

  it('a tag node renders href correctly', () => {
    const wrapper = shallow(<Link address='www.google.com' />)

    expect(wrapper.props().href).toBe('www.google.com')
  })

  it('returns null with true hide prop', () => {
    const wrapper = shallow(<Link hide={false} />)

    expect(wrapper.find('a').length).toBe(1)

    wrapper.setProps({ hide: true })

    expect(wrapper.get(0)).toBeNull()
  })
})
