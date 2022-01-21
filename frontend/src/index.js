import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './AppRouter'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))