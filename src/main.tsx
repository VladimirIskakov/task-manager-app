import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; 
import './index.scss';
import { App } from './app';
import { store } from './app/store/store';
import 'antd/dist/reset.css';
import { App as AntdApp } from "antd";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AntdApp>
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  </AntdApp>
);