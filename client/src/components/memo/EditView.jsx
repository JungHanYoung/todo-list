import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'


@inject('memo')
@observer
class EditView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: props.contents
        }
    }

    changeValue = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleEdit = () => {
        const { value } = this.state
        const { toggleEdit, id } = this.props
        const { memoEditRequest } = this.props.memo
        memoEditRequest(id, value)
            .then(() => {
                toggleEdit()
            })
            .catch(() => {
                window.Materialize.toast('메모 수정에 실패하였습니다.', 2000)
            })
    }

    render() {
        const { value } = this.state
        return (
            <div className="write">
                <div className="card">
                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            placeholder="Edit your memo"
                            value={value}
                            onChange={this.changeValue}></textarea>
                    </div>
                    <div className="card-action">
                        <span onClick={this.handleEdit}>OK</span>
                    </div>
                </div>
            </div>
        )
    }
}

EditView.propTypes = {
    id: PropTypes.any.isRequired,
    memo: PropTypes.any.isRequired,
    contents: PropTypes.string.isRequired,
    toggleEdit: PropTypes.func.isRequired
}

export default EditView