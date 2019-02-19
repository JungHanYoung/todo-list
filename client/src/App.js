import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

// routes
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'


@inject('account')
@observer
class App extends Component {

  componentDidMount() {

    this.props.account.getInfo()

  }

  render() {
    return (
      <Router>
        <>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </>
      </Router>
    );
  }
}

export default App;
