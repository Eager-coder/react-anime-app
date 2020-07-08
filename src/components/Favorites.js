import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function Favorites() {
    const storage = JSON.parse(localStorage.getItem('added'))
    const [favList, setList] = useState(storage || [])
    function handleClick(e) {
        const newList = favList.filter(item => Number(e.target.id) !== item.id)
        setList(newList)
        localStorage.setItem('added', JSON.stringify(newList))
    }
    return (
        <div>
            <h1>Your list</h1>
            <ul>
                {favList.map(item => (
                    <div key={item.id} className="fav-anime">
                        <Link to={item.link}>
                            <img src={item.image} alt=""/>
                            <p>{item.title}</p>
                        </Link>
                            <button id={item.id} onClick={handleClick}>Remove</button>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default Favorites
