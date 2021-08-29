import {Link} from "react-router-dom";
import {dropDown} from '../assets/js/DropDown'
import React from "react";
import '../assets/css/Nav.scss'

export const Nav = () => {
    return (
        <nav>
            <div className="dropdown">
                <button onClick={dropDown} className="my-style dropBtn far fa-bars"/>
                <div id="dropMenu" className="my-style dropdown-content">
                    <div className="top">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">my profile</Link></li>
                        </ul>
                    </div>
                    <div className="bottom">
                        <ul>
                            <li><Link to="/log-in">log in</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{marginLeft: "15px"}} className="dropdown">
                <Link to="/cart"><button className="my-style dropBtn fas fa-shopping-cart"/></Link>
                <span className="num">0</span>
            </div>
        </nav>
    )
}