import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';


@inject('account')
@observer
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

    handleRegister = () => {
        const {
            username,
            password
        } = this.state

        let usernameRegex = /^[a-z0-9]+$/

        if (!usernameRegex.test(username)) {
            window.Materialize.toast('Invalid username..', 2000)
            return
        }

        this.props.account.register(username, password)
            .then(response => {

                this.props.history.push('/login')
                window.Materialize.toast('create user!', 2000)
            })
            .catch(err => {

                this.setState({
                    password: ''
                })
                window.Materialize.toast(err, 2000)
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
                            <span className="waves-effect waves-light btn"
                                onClick={this.handleRegister}>CREATE</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register