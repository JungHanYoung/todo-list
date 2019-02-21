import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

// component 
import Memo from '../components/Memo'


@inject('memo', 'account')
@observer
class MemoList extends Component {


    componentDidMount() {
        this.props.memo.memoListRequest()
    }

    render() {
        const { memos } = this.props.memo
        const { currentUser } = this.props.account
        return (
            <div className="wrapper">
                {memos.map(memo => (
                    <Memo
                        key={`memo-item-${memo._id}`}
                        data={memo}
                        ownership={memo.writer === currentUser}
                    />
                ))}
            </div>
        );
    }
}

MemoList.propTypes = {
    memo: PropTypes.any
}

export default MemoList;
