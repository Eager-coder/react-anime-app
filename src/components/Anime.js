import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import '../css/anime.css'
import jikanjs from 'jikanjs'
export default function Anime({ match }) {
    const [animeData, setData] = useState('')
    const [charactersArray, setCharacters] = useState([])
    const [isAdded, setAdded] = useState(false)
    useEffect(() => fetchData(match.params.id), [match.params.id])

    function checkForAdded(obj) {
        const storedList = JSON.parse(localStorage.getItem('added'))
        if (storedList.length) setAdded(storedList.some(item => item.id === obj.mal_id))
    }

    function fetchData(id) {

        jikanjs.loadAnime(id)
            .then(res => { 
                setData(res) 
                checkForAdded(res)
            })
            .catch(err => console.error(err))

        jikanjs.loadAnime(id, 'characters_staff')
            .then(res => { 
                const characters = res
                const newArray = characters.characters.filter(item => item.role === 'Main' && item.image_url !== 'undefined')
                setCharacters(newArray)
            })
            .catch(err => console.error(err))
    }
    
    function AddtoList() {
        const newAdded = {
            id: animeData.mal_id,
            image: animeData.image_url,
            title: animeData.title,
            link: '/anime/' + animeData.mal_id
        }
        const list = JSON.parse(localStorage.getItem('added')) || []
        const isNonexistent = list.every(item => item.id !== newAdded.id)
        if (isNonexistent) {
            list.push(newAdded)
            localStorage.setItem('added', JSON.stringify(list))
            setAdded(true)
        }
    }
    return (
        <div className="anime">
            {typeof animeData === 'object' && animeData.aired !== 'undefined'? 
                <div className="flex-container">
                    <div className="left">
                        <img className="desktop-img" src={animeData.image_url} alt=""/>
                        <ul className="details">
                            <li>Year <span>{animeData.aired.from.slice(0, 4)}</span></li>
                            <li>Format <span>{animeData.type}</span></li>
                            {animeData.episodes ? <li> Episodes <span>{animeData.episodes}</span></li> : '' }
                            <li>Duration <span>{animeData.duration.replace('per ep', '')}</span></li>
                            <li>Status <span>{animeData.status}</span></li>
                            {animeData.score ? <li>Score <span>{animeData.score}/10</span></li> : ''}
                        </ul>
                    </div>
                    <div className="right">
                        <h2>{animeData.title}</h2>
                        <div className="img-and-desc">
                            <div className="mobile-img-cont">
                                <img className="mobile-img" src={animeData.image_url} alt=""/>
                            </div>
                            <p>{animeData.synopsis}</p>
                        </div>
                        <button style={isAdded ? {backgroundColor: 'grey'} : {}} className="add-btn" onClick={AddtoList}>{isAdded ? 'Added to list' : 'Add to List'}</button> 
                        <ul className="genres">
                            {animeData.genres.map(obj => {
                                return (
                                    <Link key={'key' + obj.name} to={`/search/genres/${obj.name}/${obj.mal_id}`}>
                                        <li key={obj.name}>{obj.name}</li>
                                    </Link>
                                )
                            })}
                        </ul>
                        {animeData.trailer_url ? 
                            <iframe 
                                allowFullScreen 
                                className="trailer" 
                                title={animeData.title} 
                                width="100%" 
                                height="350px" 
                                src={animeData.trailer_url.replace('autoplay=1', 'autoplay=0')}>
                            </iframe> 
                        : ''}
                    </div>
                </div>
                : '' }
                {charactersArray.length ? 
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
            : ''}
        </div>
    )
}
