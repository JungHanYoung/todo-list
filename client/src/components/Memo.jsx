import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom'

// Sub Component
import DropDownMenu from './memo/DropDownMenu'
import EditView from './memo/EditView'

const Memo = ({ data, ownership = false, onRemove }) => {


    const [editMode, setEditMode] = useState(false)

    return (
        <div className="container memo">
            <div className="card">
                <div className="info">
                    {/* {data.is_edited && <span style={{ color: '#AAB5BC' }}> . Edited <TimeAgo date={data.date.edited} live /></span>} */}
                    <Link to={`/wall?username=${data.writer}`} className="username">
                        {data.writer}
                    </Link>
                    {data.is_edited ?
                        <span style={{ color: '#AAB5BC' }}> edited . <TimeAgo date={data.date.edited} live /></span>
                        :
                        <> wrote . <TimeAgo date={data.date.created} /></>}
                    {/* wrote a log . <TimeAgo date={data.date.created} />
                    { data.is_edited && editedInfo } */}
                    {ownership && !editMode
                        && <DropDownMenu
                            _id={data._id}
                            setEditMode={() => setEditMode(true)}
                            onRemove={onRemove}
                        />}
                </div>
                <div className="card-content">

                    {editMode
                        ? <EditView
                            id={data._id}
                            contents={data.contents}
                            toggleEdit={() => setEditMode(false)}
                        /> : data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button"
                        style={{ color: '#FF9980' }}
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
    ownership: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired
}

export default Memo