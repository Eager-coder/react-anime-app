import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Search from './Search';
import '../styles/search_results.css'
function Animes({ match }) {
    const [animeList, setAnimeList] = useState('')

    let arrayList = ''
    useEffect(() => {
        if (match.params.name) {
            fetch(`https://api.jikan.moe/v3/search/anime?q=${match.params.name}&page=1`)
                .then(res => res.json())
                .then(data => setAnimeList(data.results))
                .catch(err => console.log(err));
        }
    }, [match.params.name])
    
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
            <h2>Results for: {match.params.name}</h2>
            <div className="search-results">
                {arrayList}
            </div> 
        </section>
          
    )
}

export default Animes