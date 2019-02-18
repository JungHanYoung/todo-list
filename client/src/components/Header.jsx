import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom'

import Search from './Search'

const Header = ({
    isLoggedIn,
    onLogout,
    onSearch,
    usernames
}) => {

    const [searchStatus, setSearchStatus] = useState(false)

    const loginButton = (
        <li>
            <Link to="/login">
                <i className="material-icons">vpn_key</i>
            </Link>
        </li>
    );

    const logoutButton = (
        <li>
            <a onClick={onLogout}>
                <i className="material-icons">lock_open</i>
            </a>
        </li>
    );

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <Link to="/" className="brand-logo center">MEMOPAD</Link>

                <ul>
                    <li><a onClick={() => setSearchStatus(!searchStatus)}><i className="material-icons">search</i></a></li>
                </ul>

                <div className="right">
                    <ul>
                        {isLoggedIn ? logoutButton : loginButton}
                    </ul>
                </div>
            </div>
            {searchStatus ? <Search onClose={() => setSearchStatus(!searchStatus)}
                onSearch={onSearch}
                usernames={usernames} /> : undefined}
        </nav>
    )
}

Header.propTypes = {

}

Header.defaultProps = {

}

export default Header