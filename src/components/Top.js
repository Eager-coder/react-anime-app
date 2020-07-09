import React from 'react'
import { Link } from 'react-router-dom'
import '../css/season_and_top.css'
export default function Top({ animeList }) {
    return (
        <section key="top" className="top">
            <h1>Top animes</h1>
            
            <img 
                id="top-next-btn"
                className="next-btn"
                src="/icons/right-chevron.svg"
                alt="next"
            />
            <img 
                id="top-prev-btn"
                className="prev-btn"
                src="/icons/left-chevron.svg"
                alt="previous"
            />
            <div className="top-container">
                {animeList.length !== 0 ? 
                    animeList.map(item => {
                        return(
                            <Link key={'link' + item.mal_id} to={`/anime/${item.mal_id}`}>
                                <div key={item.mal_id} className="top-anime">
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
    if (e.target.id === 'top-next-btn') {
        const carousel = document.querySelector('.top-container')
        carousel.scrollLeft += carousel.clientWidth
    }
    if (e.target.id === 'top-prev-btn') {
        const carousel = document.querySelector('.top-container')
        carousel.scrollLeft -= carousel.clientWidth
    }
})