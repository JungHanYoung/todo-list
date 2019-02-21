import { observable, action, runInAction } from 'mobx'
import client from '../axiosClient'


class AccountStore {
    @observable valid = false
    @observable isLoggedIn = false
    @observable currentUser = ''
    @observable login = {
        status: 'INIT',
        error: ''
    }
    @observable register = {
        status: 'INIT',
        error: ''
    }
    @observable token = localStorage.getItem('token') || ''



    login = (username, password) => {
        this.setLoginStatus('WAITING')
        return client.post('/api/account/signin', { username, password })
            .then(response => response.data)
            .then(action(data => {
                this.login.status = 'SUCCESS'
                this.login.error = ''
                this.isLoggedIn = true
                this.currentUser = username
                localStorage.setItem('token', data.token)
            }))
            .catch(response => {
                runInAction(() => {
                    this.login.status = 'FAILURE'
                })
                return response
            })
    }

    register = (username, password) => {
        this.setRegisterStatus('WAITING')
        return client.post('/api/account/signup', { username, password })
            .then(response => response.data)
            .then(data => {
                console.log('resolved')
                runInAction(() => {
                    this.register.status = 'SUCCESS'
                    this.register.error = ''
                })
                return data
            })
            .catch(err => {
                runInAction(() => {
                    this.register.status = 'FAILURE'
                })
                throw new Error(err.response.data.error)
            })
    }

    getInfo = () => {
        client.post('/api/account/info', { token: this.token })
            .then(response => response.data)
            .then(action(data => {
                this.isLoggedIn = true
                this.currentUser = data.username
            }))
            .catch(action(data => {
                this.isLoggedIn = false
                this.currentUser = ''
            }))
    }

    logout = () => {
        client.post('/api/account/logout')
            .then(response => response.data)
            .then(action(data => {
                this.isLoggedIn = false
                this.currentUser = ''
            }))
    }

    @action.bound
    setLoginStatus(status) {
        this.login.status = status
    }
    @action.bound
    setRegisterStatus(status) {
        this.register.status = status
    }
}

export default new AccountStore()