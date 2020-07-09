import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Search from './Search';
import '../css/search_results.css'
import jikanjs from 'jikanjs' 

function Animes({ match }) {
    const [animeList, setAnimeList] = useState('')
    const [searched, setSearched] = useState('')
    let arrayList = ''
    useEffect(() => {
        if (match.params.name) {
            setSearched('Results for: ' + match.params.name)
            jikanjs.search('anime', match.params.name)
                .then(res => setAnimeList(res.results))
                .catch(err => console.log(err));
        }

        if (match.params.genre) {
            setSearched('Genre: ' + match.params.genre)
            jikanjs.loadGenre('anime', match.params.id)
                .then(res => setAnimeList(res.anime))
                .catch(err => console.log(err))
        }

        if (match.params.season) {
            setSearched('Season: ' + match.params.season)
            jikanjs.loadSeason(2020, match.params.id)
                .then(res => setAnimeList(res.anime))
                .catch(err => console.log(err))
        }

        if (match.params.rating) {
            setSearched('Rating: ' + match.params.rating)
            jikanjs.raw(['search', 'anime'], {rated: match.params.id} )
                .then(res => setAnimeList(res.results))
                .catch(err => console.log(err))
        }

        if (match.params.type) {
            setSearched('Type: ' + match.params.type)
            jikanjs.raw(['search', 'anime'], {type: match.params.id})
                .then(res => setAnimeList(res.results))
                .catch(err => console.log(err));
        }
    }, [])
    
    if (Array.isArray(animeList)) {
        arrayList = animeList.map(anime => {
            return (
                <Link key={'key' + anime.mal_id} to={`/anime/${anime.mal_id}`}>
                    <div className="box" key={anime.mal_id}>
                        <img key={'img' + anime.mal_id} src={anime.image_url} alt=""/>
                        <div key={'div' + anime.mal_id} className="text">{anime.title}</div>
                    </div>
                </Link> 
            )
        })
    }

    return(
        <section className="results">
            <Search/>
            <h2>{searched}</h2>
            <div className="search-results">
                {arrayList}
            </div> 
        </section>
          
    )
}

export default Animes