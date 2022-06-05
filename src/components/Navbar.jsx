import React, {useContext} from 'react';
import {Link} from "react-router-dom";
// import '../styles/styles.css'
import '../styles/NavBar.css'
import {AuthContext} from "../context";

const Navbar = () => {
    const {jwt, role} = useContext(AuthContext)

    return (
        <div className="navigation-bar">
            <ul className="navigation-bar-list">
                {
                    jwt === '' ? <li className="navigation-bar-list-member">
                        <Link className="navigation-btn" to="/signup">Sign up</Link>
                    </li> : <li/>
                }
                {
                    jwt !== '' ? <li className="navigation-bar-list-member">
                        <Link className="navigation-btn" to="/user">Profile</Link>
                    </li> : <li/>
                }
                {
                    role === 'admin' ?
                        <li className="navigation-bar-list-member">
                            <Link className="navigation-btn" to="/users">Users</Link>
                        </li>
                        : <div/>
                }

                <li className="navigation-bar-list-member">
                    <Link className="navigation-btn" to="/reservations">Reservations</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
