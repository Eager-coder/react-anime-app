import React, { useState, useEffect } from 'react'
import Seacrh from './Search'
import Season from './Season'
import Top from './Top'
export default function Home({match}) {
    const [seasonAnimes, setSeasonAnimes] = useState([])
    const [topAnimes, setTopAnimes] = useState([])

    useEffect(() => {
        fetch('https://api.jikan.moe/v3/season')
            .then(res => res.json())
            .then(data => setSeasonAnimes(data.anime))

        const topURL = 'https://api.jikan.moe/v3/top/anime/1/'
        fetch('https://api.allorigins.win/get?url=' + topURL)
            .then(res => res.json())
            .then(data => setTopAnimes(JSON.parse(data.contents).top))
    }, [])

    return (
        <main className="home" key="home">
            <div className="hero">
                <div className="hero-container">
                    <h1>Discover the world of anime using the world's largest anime database </h1>
                </div>
            </div>
            <Seacrh />
            <Season animeList={seasonAnimes}/>
            <Top animeList={topAnimes}/>
        </main>
    )
}
