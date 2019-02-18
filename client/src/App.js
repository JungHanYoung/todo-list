import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'

// routes
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'

import memoStore from './store/memo'

class App extends Component {
  render() {
    return (
      <Provider memo={memoStore}>
        <Router>
          <>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </>
        </Router>
      </Provider>
    );
  }
}

export default App;
