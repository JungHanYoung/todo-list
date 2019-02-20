import React from 'react';
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import io from 'socket.io-client'

// components
import Header from '../components/Header'
import Write from '../components/Write'
import MemoList from '../containers/MemoList';

@inject('memo', 'account')
@observer
class Home extends React.Component {

    state = {
        loading: false,
        initialLoaded: false
    }

    shouldComponentUpdate(prevProps) {
        return JSON.stringify(prevProps) !== JSON.stringify(this.props)
    }

    componentDidMount() {

        const socket = io('http://localhost:4000')

        socket.on('init', (hello) => {
            console.log('client socket connected', hello)
        })

        socket.on('created', (memo) => {
            console.log('hello world')
            console.log(memo)
            this.props.memo.socketConnectedNewMemo(memo)
        })

        // const loadMemoLoop = () => {
        //     this.props.memo.loadNewMemo().then(() => {
        //         if (this.memoLoaderTimeoutId) {
        //             clearInterval(this.memoLoaderTimeoutId)
        //         }
        //         this.memoLoaderTimeoutId = setInterval(loadMemoLoop, 5000);
        //     })
        // }

        // const loadUntilScrollable = () => {
        //     const scrollHeight = document.body.scrollHeight// window.$('body').height()
        //     const windowHeight = window.innerHeight // window.$('window').height()
        //     console.log(scrollHeight, windowHeight)
        //     if (document.body.scrollHeight < window.innerHeight) {
        //         this.props.memo.loadOldMemo()
        //     }
        //     // if (window.$("body").height() < window.$(window).height()) {
        //     //     this.props.memo.loadOldMemo().then(() => {

        //     //         if (!this.props.isLast) {
        //     //             loadUntilScrollable()
        //     //         }
        //     //     })
        //     // }
        // }

        this.props.memo.loadNewMemo().then(() => {
            // setTimeout(loadUntilScrollable, 1000)
            // loadMemoLoop()
            this.setState({
                initialLoaded: true
            })
        })
        // this.props.memo.memoListRequest(true).then(() => {
        //     setTimeout(loadUntilScrollable, 1000)
        //     loadMemoLoop();
        //     this.setState({
        //         initialLoaded: true
        //     })
        // })
        //     .catch((err) => {
        //         console.log(err)
        //     })

        window.addEventListener('scroll', () => {
            if (document.body.scrollHeight) {

            }
        })

        // window.$(window).scroll(() => {
        //     if (window.$(document).height() - window.$(window).height() - window.$(window).scrollTop() < 250) {
        //         if (!this.state.loading && this.props.memo.status !== 'WAITING') {
        //             this.loadOldMemo();
        //             this.setState({
        //                 loading: true
        //             });
        //         } else {
        //             if (this.state.loading) {
        //                 this.setState({
        //                     loading: false
        //                 });
        //             }
        //         }
        //     }
        // })
    }

    // componentDidUpdate(prevProps) {
    //     console.log('prevProp :', prevProps)
    //     console.log('prevProp username:', prevProps.memo.username)
    //     console.log('currentProp username:', this.props.memo.username)
    //     if (this.props.memo.username !== prevProps.memo.username) {
    //         this.componentWillUnmount()
    //         this.componentDidMount()
    //     }
    // }

    componentWillUnmount() {
        clearTimeout(this.memoLoaderTimeoutId)

        window.removeEventListener('scroll', () => {
            console.log('remove event scroll')
        })

        this.setState({
            initialLoaded: false
        })

        this.props.memo.setInitial()
    }

    // loadNewMemo() {
    //     // CANCEL IF THERE IF A PENDING REQUEST
    //     // 
    //     if (this.props.memo.status === 'WAITING')
    //         return new Promise((resolve, reject) => {
    //             resolve();
    //         });

    //     // IF PAGE IS EMPTY, DO THE INITIAL LOADING
    //     if (this.props.memo.memos.length === 0)
    //         return this.props.memo.memoListRequest(true);

    //     return this.props.memo.memoListRequest(false, 'new', this.props.memo.memos[0]._id, this.props.username);
    // }

    // loadOldMemo() {
    //     // CANCEL IF USER IS READING THE LAST PAGE
    //     if (this.props.memo.isLast) {
    //         return new Promise(
    //             (resolve, reject) => {
    //                 resolve();
    //             }
    //         );
    //     }

    //     console.log(this.props.memo.memos)

    //     // GET ID OF THE MEMO AT THE BOTTOM
    //     let lastId = this.props.memo.memos[this.props.memo.memos.length - 1]._id;

    //     // START REQUEST
    //     return this.props.memo.memoListRequest(false, 'old', lastId, this.props.username).then(() => {
    //         // IF IT IS LAST PAGE, NOTIFY
    //         if (this.props.isLast) {
    //             window.Materialize.toast('You are reading the last page', 2000);
    //         }
    //     })
    // }

    render() {

        const { memoPostRequest, error } = this.props.memo
        const { isLoggedIn, logout } = this.props.account

        return (
            <>
                <Header
                    isLoggedIn={isLoggedIn}
                    onLogout={logout}
                />
                {isLoggedIn && <Write error={error} onPost={memoPostRequest} />}
                <MemoList />
            </>
        )
    }
}

Home.propTypes = {
    memo: PropTypes.any,
    account: PropTypes.any
}

Home.defaultProps = {

}

export default Home;
