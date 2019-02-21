import React from 'react';
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { css } from '@emotion/core'


// components
import SyncLoader from 'react-spinners/SyncLoader'
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

    componentDidMount() {

        // const socket = io('http://localhost:4000')

        // socket.on('init', (hello) => {
        //     console.log('client socket connected', hello)
        // })

        // socket.on('created', (memo) => {
        //     console.log('hello world')
        //     console.log(memo)
        //     this.props.memo.socketConnectedNewMemo(memo)
        // })

        this.props.memo.loadSocket()

        this.props.memo.loadNewMemo().then(() => {

            this.setState({
                initialLoaded: true
            })
        })

        window.addEventListener('scroll', () => {
            if (document.body.scrollHeight - window.innerHeight - window.scrollY < 250) {
                if (!this.state.loading && this.props.memo.status !== 'WAITING') {
                    this.props.memo.loadOldMemo();
                    this.setState({
                        loading: true
                    })
                } else {
                    if (this.state.loading) {
                        this.setState({
                            loading: false
                        })
                    }
                }
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
                <SyncLoader
                    css={css`
                        display: block;
                        position: fixed;
                        bottom: 10px;
                        left: 50%;
                        transform: translateX(-50%);
                        margin: 0 auto;
                    `}
                    color={'#0080ED'}
                    loading={this.props.memo.status === 'WAITING' && !this.props.memo.isLast}
                />

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
