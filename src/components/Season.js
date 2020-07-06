import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/season_and_top.css'

export default function Season({ animeList }) {
    return (
        <section key="trending" className="trending">
            <h1>Popular this season </h1>
            <img 
                id="season-next-btn"
                className="next-btn"
                src="/icons/right-chevron.svg"
                alt="next"
            />
            <img 
                id="season-prev-btn"
                className="prev-btn"
                src="/icons/left-chevron.svg"
                alt="previous"
            />
            <div className="trending-container">
                {animeList.length !== 0 ? 
                    animeList.map(item => {
                        return(
                            <Link key={'link' + item.mal_id} to={`/anime/${item.mal_id}`}>
                                <div key={item.mal_id} className="trending-anime">
                                    <img key={'img' + item.mal_id} src={item.image_url} alt={item.title}/>
                                    <p key={'p' + item.mal_id}>{item.title}</p>
                                </div>
                            </Link>
                        )
                    }) : ''
                }
            </div>
        </section>
    )
}

window.addEventListener('click', e => {
    if (e.target.id === 'season-next-btn') {
        const carousel = document.querySelector('.trending-container')
        carousel.scrollLeft += carousel.clientWidth
    }
    if (e.target.id === 'season-prev-btn') {
        const carousel = document.querySelector('.trending-container')
        carousel.scrollLeft -= carousel.clientWidth
    }
})