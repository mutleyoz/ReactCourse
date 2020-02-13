import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => {
    const activeStyles = {color: "#F15B2A"}
    
    return (
        <nav>
            <NavLink to="/" activeStyle={activeStyles} exact>Home</NavLink>{" | "}
            <NavLink to="/courses" activeStyle={activeStyles}>Courses</NavLink>{" | "}
            <NavLink to="/about" activeStyle={activeStyles}>About</NavLink>
        </nav>
    )
};

export default Header;