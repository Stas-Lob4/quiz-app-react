import React from 'react'
import { Provider } from 'react-redux'

import store, { persistor } from '@/store'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'

import './index.css'

import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
