import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import helloReducer from './src/reducers'
import App from './src/components/App';
import './src/styles/app.css';

let store = createStore(helloReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)