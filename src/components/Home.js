import React, { useState, useEffect } from 'react'
import Seacrh from './Search'
import Season from './Season'
import Top from './Top'
import Footer from './Footer'
import SelectForm from './SelectForm'
import '../css/home.css'
import jikanjs from 'jikanjs'

export default function Home({match}) {
    const [seasonAnimes, setSeasonAnimes] = useState([])
    const [topAnimes, setTopAnimes] = useState([])

    useEffect(() => {
        fetch('https://api.jikan.moe/v3/season')
            .then(res => res.json())
            .then(data => setSeasonAnimes(data.anime))

        jikanjs.raw(['top', 'anime'])
            .then(res =>setTopAnimes(res.top))
    }, [])

    return (
        <main className="home" key="home">
            <div className="hero">
                <div className="hero-container">
                    <h1>Discover the world of anime using the world's largest anime database </h1>
                </div>
            </div>
            <div className="search-methods">
                <Seacrh />
                <SelectForm />
            </div>
            
            <Season animeList={seasonAnimes}/>
            <Top animeList={topAnimes}/>
            <Footer/>
        </main>
    )
}
