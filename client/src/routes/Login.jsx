import React from 'react';
import { Link } from 'react-router-dom'


class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }
    handleLogin = (username, password) => {
        console.log('username:', username)
        console.log('password:', password)
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
                        <div className="card-content">LOGIN</div>
                    </div>
                    <div>
                        <div className="card-content">
                            <div className="row">
                                <div className="input-field col s12 username">
                                    <label>Username</label>
                                    <input
                                        name="username"
                                        type="text"
                                        className="validate"
                                        onChange={this.handleChange}
                                        value={this.state.username}
                                    />
                                </div>
                                <div className="input-field col s12">
                                    <label>Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="validate"
                                        onChange={this.handleChange}
                                        value={this.state.password}
                                        onKeyPress={this.handleKeypress}
                                    />
                                </div>
                                <a
                                    className="waves-effect waves-light btn"
                                    onClick={this.handleLogin}>Login</a>
                            </div>
                        </div>
                        <div className="footer">
                            <div className="card-content">
                                <div className="right">
                                    New Here? <Link to="/register">Create an account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login