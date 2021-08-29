import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
