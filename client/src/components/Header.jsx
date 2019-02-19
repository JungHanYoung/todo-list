import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import Search from './Search'

const Header = ({
    isLoggedIn,
    onLogout,
    onSearch,
    usernames
}) => {

    const [searchStatus, setSearchStatus] = useState(false)

    const LoginButton = () => (
        <li>
            <Link to="/login">
                <i className="material-icons">vpn_key</i>
            </Link>
        </li>
    );

    const LogoutButton = () => (
        <li>
            <span onClick={onLogout}>
                <i className="material-icons">lock_open</i>
            </span>
        </li>
    );

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <Link to="/" className="brand-logo center">MEMOPAD</Link>

                <ul>
                    <li><span onClick={() => setSearchStatus(true)}><i className="material-icons">search</i></span></li>
                </ul>

                <div className="right">
                    <ul>
                        {isLoggedIn ? <LogoutButton /> : <LoginButton />}
                    </ul>
                </div>
            </div>
            {searchStatus &&
                <Search onClose={() => setSearchStatus(false)}
                    onSearch={onSearch}
                    usernames={usernames} />}
        </nav>
    )
}

Header.propTypes = {

}

Header.defaultProps = {

}

export default Header