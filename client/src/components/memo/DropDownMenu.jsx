import React from 'react'
import Dropdown from 'react-materialize/lib/Dropdown'
import NavItem from 'react-materialize/lib/NavItem'

const DropDownMenu = ({ _id, setEditMode }) => (
    <div className="option-button">
        <Dropdown trigger={<span className="dropdown-button">
            <i className="material-icons icon-button">more_vert</i>
        </span>}>
            <NavItem onClick={setEditMode}>Edit</NavItem>
        </Dropdown>
    </div>

)

export default DropDownMenu