import React, { useState, useEffect } from 'react'
import '../styles/anime.css'
export default function Anime({ match }) {
    const [data, setData] = useState('')
    const [charactersArray, setCharacters] = useState([])

    useEffect(() => fetchData(match.params.id), [match.params.id])

    const fetchData = (id) => {
        let dataURL = encodeURIComponent(`https://api.jikan.moe/v3/anime/${id}/`)
        let charURL = encodeURIComponent(`https://api.jikan.moe/v3/anime/${id}/characters_staff`)

        fetch(`https://api.allorigins.win/get?url=${dataURL}`)
            .then(res => res.json())
            .then(data => setData(JSON.parse(data.contents)))
            .catch(err => console.log(err))

        fetch(`https://api.allorigins.win/get?url=${charURL}`)
            .then(res => res.json())
            .then(data => {
                const characters = JSON.parse(data.contents)
                const newArray = characters.characters.filter(item => item.role === 'Main' && item.image_url !== 'undefined')
                setCharacters(newArray)
            }).catch(err => console.log(err))    
    }

    return (
            typeof data === 'object' && data.aired !== 'undefined'? 
            <div className="anime">
                <div className="flex-container">
                    <div className="left">
                        <img className="desktop-img" src={data.image_url} alt=""/>
                            <ul className="details">
                                <li>Year: {data.aired.from.slice(0, 4)}</li>
                                <li>Format: {data.type}</li>
                                <li>{data.episodes ? 'Episodes: '+ data.episodes : ''}</li>
                                <li>Duration: {data.duration.replace('per ep', '')}</li>
                                <li>Status: {data.status}</li>
                                <li>Score: {data.score}/10</li>
                            </ul>
                    </div>
                    <div className="right">
                        <h2>{data.title}</h2>
                        <div className="img-and-desc">
                            <div className="mobile-img-cont">
                                <img className="mobile-img" src={data.image_url} alt=""/>
                            </div>
                            <p>{data.synopsis}</p>
                        </div>
                        <ul className="genres">
                            {data.genres.map(obj => {
                                return (
                                    <li key={obj.name}>{obj.name}</li>
                                )
                            })}
                        </ul>
                        {data.trailer_url ? 
                            <iframe 
                                allowFullScreen 
                                className="trailer" 
                                title={data.title} 
                                width="100%" 
                                height="350px" 
                                src={data.trailer_url.replace('autoplay=1', 'autoplay=0')}>
                            </iframe> 
                        : ''}
                    </div>
                </div>
                <div className="characters">
                    <h2>Main characters</h2>
                    <div className="characters-container">
                    {charactersArray.length !== 0  ? 
                        charactersArray.map(item => {
                            return (
                                <div key={item.name} className="character-box">
                                    <img key={'img' + item.name} src={item.image_url} alt={item.name}/>
                                    <p key={'text' + item.name}>{item.name}</p>
                                </div>
                            )
                    })
                        : ''
                    }
                    </div>
                </div>
            </div>
            
            : 'Loading...'
    )
}
