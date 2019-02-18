import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

// component 
import Memo from '../components/Memo'
import uuid from 'uuidv4'


class MemoList extends Component {
    state = {
        memos: [
            {
                _id: uuid(),
                writer: 'hanyoung',
                contents: 'content1',
                starred: [],
                date: {
                    created: new Date(),
                    edited: new Date()
                },
                is_edited: false
            },
            {
                _id: uuid(),
                writer: 'hanyoung',
                contents: 'content2',
                starred: [],
                date: {
                    created: new Date(),
                    edited: new Date()
                },
                is_edited: false
            },
            {
                _id: uuid(),
                writer: 'hanyoung',
                contents: 'content3',
                starred: [],
                date: {
                    created: new Date(),
                    edited: new Date()
                },
                is_edited: false
            },
            {
                _id: uuid(),
                writer: 'hanyoung',
                contents: 'content4',
                starred: [],
                date: {
                    created: new Date(),
                    edited: new Date()
                },
                is_edited: false
            },
            {
                _id: uuid(),
                writer: 'hanyoung',
                contents: 'content5',
                starred: [],
                date: {
                    created: new Date(),
                    edited: new Date()
                },
                is_edited: false
            },
            {
                _id: uuid(),
                writer: 'hanyoung',
                contents: 'content1',
                starred: [],
                date: {
                    created: new Date(),
                    edited: new Date()
                },
                is_edited: false
            },
            {
                _id: uuid(),
                writer: 'hanyoung',
                contents: 'content1',
                starred: [],
                date: {
                    created: new Date(),
                    edited: new Date()
                },
                is_edited: false
            },
        ]
    }


    render() {
        console.log(this.props)
        return (
            <div className="wrapper">
                {this.state.memos.map(memo => (
                    <Memo
                        data={memo}
                    />
                ))}
            </div>
        );
    }
}

MemoList.propTypes = {
    data: PropTypes.array.isRequired,
    currentUser: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onStar: PropTypes.func.isRequired
}

export default observer(MemoList);
