import React, { Component } from 'react'
import Form from '../form/Form'
import TodoList from '../todo-list/TodoList'
import './App.css'

class App extends Component {
  state = { 
    on: false,
    input: '',
    mainColor: 'blue',
    lifeCycle: ''
  }

  handleStrings(str) {
    if (str === 'Hello World') {
      return true
    }

    return false
  }

  componentDidMount() {
   this.setState({ lifeCycle: 'componentDidMount' })
  }

  componentWillReceiveProps() {
    this.setState({ lifeCycle: 'componentWillReceiveProps' })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <h3 className={this.state.mainColor}>Everyone is Welcome!</h3>
        </header>

        <p className="App-intro">
          Hello World
        </p>

        <p className='button-state'>
          {this.state.on ? 'Yes!' : 'No!'}
        </p>

        <button onClick={() => this.setState({on: true})}>Click</button>

        <h2 style={{ color: 'blue' }}>{this.state.input}</h2>

        <input
          onChange={(e) => this.setState({input: e.currentTarget.value})}
          type='text'
          placeholder="Enter something here..."
        />

        <p className='lifeCycle'>{this.state.lifeCycle}</p>

        <TodoList />

        <Form />
      </div>
    )
  }
}

export class Link extends Component {
  render() {
    return this.props.hide ? null : <a href={this.props.address}>Click</a>
  }
}

export default App
