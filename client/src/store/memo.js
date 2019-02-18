import { observable, action } from 'mobx'
import client from '../axiosClient'

const MemoStore = observable({
    status: 'pending',
    memos: []
})

MemoStore.memoListRequest = action(() => {

    let url = '/api/memo'

    client.get(url)
        .then(response => response.data)
        .then((data) => {
            this.memos = data
        })

})

export default MemoStore