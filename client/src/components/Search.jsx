import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const Search = ({ onClose, onSearch, usernames }) => {

    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        document.onkeydown = listenEscKey
    })

    function handleClose() {
        setKeyword('')
        onSearch(keyword)
        document.onkeydown = null;
        onClose();
    }

    function listenEscKey(event) {
        event = event || window.event;
        if (event.keyCode === 27) {
            handleClose();
        }
    }

    function handleChange(e) {
        setKeyword(e.target.value)
        onSearch(e.target.value)
    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            if (this.props.usernames.length > 0) {
                this.props.history.push(`/wall?username=${this.props.usernames[0].username}`);
                this.handleClose();
            }
        }
    }

    return (
        <ReactCSSTransitionGroup transitionName="search"
            transitionEnterTimeout={2000}
            transitionLeaveTimeout={2000}>

            <div className="search-screen white-text">
                <div className="right">

                    <span className="waves-effect waves-light btn red lighten-1"
                        onClick={handleClose}>CLOSE</span>
                </div>
                <div className="container">
                    <input placeholder="Search a user"
                        value={keyword}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}></input>
                    <ul className="search-results">
                        {usernames.map((username, i) => (
                            <li key={i}><Link
                                to={`/wall?username=${username}`}
                                onClick={handleClose}
                            >{username}</Link></li>
                        ))}
                    </ul>

                </div>
            </div>
        </ReactCSSTransitionGroup>
    )
}

Search.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    usernames: PropTypes.arrayOf(PropTypes.string).isRequired
}

Search.defaultProps = {
    onClose: () => {
        console.error('onClose not defined');
    },
    onSearch: () => {
        console.error('onSearch not defined');
    },
    usernames: []
}

export default Search