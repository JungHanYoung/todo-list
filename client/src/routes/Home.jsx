import React, { Component } from 'react';
import PropTypes from 'prop-types'

// components
import Header from '../components/Header'
import Write from '../components/Write'
import MemoList from '../containers/MemoList';


class Home extends Component {
    render() {
        return (
            <>
                <Header

                />
                {this.props.isLoggedIn && <Write />}
                <MemoList />
            </>
        );
    }
}

Home.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

Home.defaultProps = {
    isLoggedIn: true
}

export default Home;
