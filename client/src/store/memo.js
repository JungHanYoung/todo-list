import { observable, action, runInAction } from 'mobx'
import client from '../axiosClient'
import io from 'socket.io-client'


class MemoStore {
    @observable status = 'INIT'
    @observable memos = []
    @observable error = ''
    @observable isLast = false
    @observable username = ''
    @observable isInitial = true
    socket = io('http://localhost:4000')


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
                        if (data.length === 0) {
                            this.isLast = true
                        }
                        this.memos.push(...data)
                    }
                }
                this.fetchSuccess()

            }))
            .catch(this.fetchFailure)
    }

    loadOldMemo() {
        if (this.isLast || this.memos.length === 0) {
            return Promise.resolve()
        }

        let lastId = this.memos[this.memos.length - 1]._id

        return this.memoListRequest('old', lastId)
            .then(() => {

                if (this.isLast) {
                    console.log('is last memo!!!')
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

    memoEditRequest = (id, contents) => {
        this.status = 'WAITING'
        let url = '/api/memo'
        return client.put(`${url}/${id}`, { contents, token: localStorage.getItem('token') })
            .then(action(response => {
                const { memo } = response.data
                const index = this.memos.findIndex(el => el._id === memo._id)
                this.memos[index] = memo
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

    memoRemoveRequest = (id) => {
        this.status = 'WAITING'
        let url = `/api/memo/delete/${id}`

        return client.post(url, {
            token: localStorage.getItem('token')
        }).then(response => response.data)
            .then(data => {
                runInAction(() => {
                    if (data.success) {
                        runInAction(() => {
                            this.status = 'SUCCESS'
                            const index = this.memos.findIndex(memo => memo._id === id)
                            this.memos.splice(index, 1)
                        })
                    }
                })
            })
            .catch(response => {
                runInAction(() => {
                    this.status = 'FAILURE'
                })
            })

    }

    loadSocket = () => {

        this.socket.on('created', (memo) => {
            // console.log('created:', memo)
            runInAction(() => {
                this.memos.unshift(memo)
            })
        })

        this.socket.on('edit', (memo) => {
            // console.log('edited:', memo)
            const index = this.memos.findIndex(el => el._id === memo._id)
            runInAction(() => {
                this.memos[index] = memo
            })
        })
    }

    @action
    socketConnectedNewMemo(memo) {
        this.memos.unshift(memo)
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