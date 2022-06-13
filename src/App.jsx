import React, { Component } from 'react'
import { Provider } from 'react-redux'
import router from './router'
import store from '@/redux'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {router}
      </Provider>
    )
  }
}

export default App
