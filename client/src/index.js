import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";

import './index.css';
import App from './App';

import memoStore from './store/memo'
import accountStore from './store/account'

ReactDOM.render(
    <Provider memo={memoStore} account={accountStore}>
        <App />
    </Provider>,
    document.getElementById('root'));

