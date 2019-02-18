import React from 'react'

const DropDownMenu = ({ _id, setEditMode }) => (
    <div className="option-button">
        <a className="dropdown-button"
            id={`dropdown-button-${_id}`}
            data-activates={`dropdown-${_id}`}>
            <i className="material-icons icon-button">more_vert</i>
        </a>
        <ul id={`dropdown-${_id}`} className="dropdown-content">
            <li><a onClick={setEditMode}>Edit</a></li>
            {/* <li><a onClick={this.handleRemove}>Remove</a></li> */}
        </ul>
    </div>
)

export default DropDownMenu