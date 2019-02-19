import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom'

// Sub Component
import DropDownMenu from './memo/DropDownMenu'

const Memo = ({ data, ownership = false }) => {
    let starStyle = { color: '#FF9980' }
    //(this.props.data.starred.indexOf(this.props.currentUser) > -1)
    // true ?  : {};

    const [editMode, setEditMode] = useState(false)

    const EditView = ({
        toggleEdit = () => { },
        contents
    }) => {
        const [value, setValue] = useState(contents)

        return (
            <div className="write">
                <div className="card">
                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            placeholder="Edit your memo"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}></textarea>
                    </div>
                    <div className="card-action">
                        <span onClick={() => toggleEdit(value)}>OK</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container memo">
            <div className="card">
                <div className="info">
                    <Link to={`/wall?username=${data.writer}`} className="username">{data.writer}</Link> wrote a log . <TimeAgo date={data.date.created} />
                    {/* { data.is_edited && editedInfo } */}
                    {ownership
                        && <DropDownMenu
                            _id={data._id}
                            setEditMode={() => setEditMode(!editMode)}
                        />}
                </div>
                <div className="card-content">
                    {editMode
                        ? <EditView
                            contents={data.contents}
                        // toggleEdit={}
                        /> : data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button"
                        style={starStyle}
                    // onClick={this.handleStar}
                    >star</i>
                    <span className="star-count">{data.starred.length}</span>
                </div>
            </div>
        </div>
    )
}

Memo.propTypes = {
    data: PropTypes.object.isRequired,
    ownership: PropTypes.bool.isRequired
}

export default Memo