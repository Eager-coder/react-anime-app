import React from 'react'
import {Link} from 'react-router-dom'
import '../css/navbar.css'
export default function Nav() {
    return (
        <nav>
            <div className="nav-container">
                <Link to='/'>
                    <span>Ani</span>
                </Link>
                <Link to='/favorites'>
                    <div>My list</div>
                </Link>
            </div>
        </nav>
    )
}
