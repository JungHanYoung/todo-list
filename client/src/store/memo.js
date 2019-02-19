import { observable, action, runInAction } from 'mobx'
import client from '../axiosClient'


class MemoStore {
    @observable status = 'INIT'
    @observable memos = []
    @observable error = ''
    @observable isLast = false
    @observable username = ''
    @observable isInitial = true


    memoListRequest = (listType, id) => {
        this.status = 'WAITING'
        let url = '/api/memo'

        if (!this.username) {
            url = this.isInitial ? url : `${url}/${listType}/${id}`
        } else {
            url = this.isInitial ? `${url}/${this.username}` : `${url}/${this.username}/${listType}/${id}`
        }

        return client.get(url)
            .then(response => response.data)
            .then(action((data) => {

                if (this.isInitial) {
                    this.isInitial = false
                    this.memos = data
                } else {
                    if (listType === 'new') {
                        this.memos.unshift(...data)
                    } else {
                        this.memos.push(...data)
                    }
                }
                this.fetchSuccess()
                // this.memos = data
            }))
            .catch(this.fetchFailure)
    }

    loadOldMemo() {
        if (this.isLast || this.memos.length === 0) {
            return Promise.resolve()
        }

        console.log(this.memos)

        let lastId = this.memos[this.memos.length - 1]._id

        return this.memoListRequest('old', lastId)
            .then(() => {
                if (this.isLast) {
                    window.Materialize.toast('You are reading the last page', 2000);
                }
            })
    }

    loadNewMemo() {

        if (this.status === 'WAITING') {
            return Promise.resolve()
        }

        if (this.memos.length === 0) {
            return this.memoListRequest()
        }

        return this.memoListRequest('new', this.memos[0]._id)
    }

    memoPostRequest = (contents) => {
        this.status = 'WAITING'
        let url = '/api/memo'

        return client.post(url, { contents, token: localStorage.getItem('token') })
            .then(action(response => {
                this.status = 'SUCCESS'
            }))
            .catch(err => {
                console.log(err.response)

                runInAction(() => {
                    this.status = 'FAILURE'
                    this.error = err.response.data.error
                })
            })
    }

    @action.bound
    setInitial() {
        this.isInitial = true
    }

    @action.bound
    fetchSuccess() {
        this.status = 'SUCCESS'
    }
    @action.bound
    fetchFailure(data) {
        this.status = 'FAILURE'
        this.error = data.error
    }
}

export default new MemoStore()