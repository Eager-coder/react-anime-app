import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/navbar.css'
export default function Nav() {
    return (
        <nav>
            <div className="nav-container">
                <Link to='/'>
                    <span>Ani</span>
                </Link>
                
            </div>
        </nav>
    )
}
