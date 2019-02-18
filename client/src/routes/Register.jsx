import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Register extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="container auth">
                <Link className="logo" to="/">MEMOPAD</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">REGISTER</div>
                    </div>
                    <div className="card-content">
                        <div className="row">
                            <div className="input-field col s12 username">
                                {/* <label for="username">Username</label> */}
                                <input
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    type="text"
                                    className="validate"
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                />
                            </div>
                            <div className="input-field col s12">
                                {/* <label for="password">Password</label> */}
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="validate"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    onKeyPress={this.handleKeypress}
                                />
                            </div>
                            <a className="waves-effect waves-light btn"
                                onClick={this.handleRegister}>CREATE</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register