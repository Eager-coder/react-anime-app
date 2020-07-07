import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Search from './Search';
import '../styles/search_results.css'
function Animes({ match }) {
    const [animeList, setAnimeList] = useState('')
    const [searched, setSearched] = useState('')
    let arrayList = ''
    useEffect(() => {
        if (match.params.name) {
            setSearched('Results for: ' + match.params.name)
            fetch(`https://api.jikan.moe/v3/search/anime?q=${match.params.name}&page=1`)
                .then(res => res.json())
                .then(data => setAnimeList(data.results))
                .catch(err => console.log(err));
        }
        if (match.params.genre) {
            setSearched('Genre: ' + match.params.genre)
            fetch(`https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/genre/anime/${match.params.id}/`)
                .then(res => res.json())
                .then(data => setAnimeList(data.anime))
                .catch(err => console.log(err));
        }
        if (match.params.season) {
            setSearched('Season: ' + match.params.season)
            fetch(`https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/season/2020/${match.params.id}/`)
                .then(res => res.json())
                .then(data => setAnimeList(data.anime))
                .catch(err => console.log(err));
        }
        if (match.params.rating) {
            setSearched('Rating: ' + match.params.rating)
            fetch(`https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/search/anime?rated=${match.params.id}`)
                .then(res => res.json())
                .then(data => setAnimeList(data.results))
                .catch(err => console.log(err));
        }
        if (match.params.type) {
            setSearched('Type: ' + match.params.type)
            fetch(`https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/search/anime?type=${match.params.id}`)
                .then(res => res.json())
                .then(data => setAnimeList(data.results))
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