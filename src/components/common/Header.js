import React from 'react';
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'

import {NavLink} from 'react-router-dom';

const Header = ({courseCount}) => {
    const activeStyles = {color: "#F15B2A"}
    
    return (
        <>
        <nav>
            <NavLink to="/" activeStyle={activeStyles} exact>Home</NavLink>{" | "}
            <NavLink to="/courses" activeStyle={activeStyles}>Courses</NavLink>{" | "}
            <NavLink to="/authors" activeStyle={activeStyles}>Authors</NavLink>{" | "}
            <NavLink to="/about" activeStyle={activeStyles}>About</NavLink> {" | "} 
            <span className="message">Now serving {courseCount} courses</span>
        </nav>
        </>
    )
};

Header.propTypes = {
    courseCount: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        courseCount: state.courses.length
    }
}

export default connect(mapStateToProps)(Header);