import { observable, action } from 'mobx'
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
            .catch(action(response => {
                this.login.status = 'FAILURE'
            }))
    }

    register = (username, password) => {
        this.setRegisterStatus('WAITING')
        console.log('aaaa')
        return client.post('/api/account/signup', { username, password })
            .then(response => response.data)
            .then(action(data => {
                this.register.status = 'SUCCESS'
                this.register.error = ''
            }))
            .catch(action(response => {
                this.register.status = 'FAILURE'
            }))
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