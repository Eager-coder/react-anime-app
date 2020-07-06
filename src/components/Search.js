import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/search_bar.css'
export default function Search() {
    const history = useHistory()
    const [animeName, setAnimeName] = useState('')

    function handleChange(e) {
        setAnimeName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        history.push(`/search/${animeName}`)
    }

    return (
            <div key="search" className="search-box">
                <form onSubmit={handleSubmit} >
                    <h4>Search anime</h4>
                    <div className="input-container">
                        <img src="https://img.icons8.com/ios-glyphs/100/000000/search.png" alt="search"/>
                        <input 
                            type="text" 
                            value={animeName} 
                            onChange={handleChange}
                        />
                    </div>
                    
                </form>
            </div>
    )    
}
