import React from 'react';
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'


@inject('account')
@observer
class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }
    handleLogin = () => {
        const { username, password } = this.state
        // console.log(this.props.account)
        // console.log('username', username)
        // console.log('password', password)
        this.props.account.login(username, password).then(() => {
            // console.log('try to login')
            // console.log(this.props.account.login.status)
            if (this.props.account.login.status === "SUCCESS") {
                let loginData = {
                    username
                }

                // console.log(loginData)

                document.cookie = 'key=' + btoa(JSON.stringify(loginData))

                this.props.history.push('/')
                window.Materialize.toast(`Welcome ${username}!`, 2000)
            } else {

                let $toastContent = window.$('<span style="color: #FFB4BA">Incorrect username or password</span>');

                window.Materialize.toast($toastContent, 2000);
            }
        })
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
                                <span
                                    className="waves-effect waves-light btn"
                                    onClick={this.handleLogin}>Login</span>
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