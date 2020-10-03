import React, { useEffect, useState } from 'react'
import axios from '../../requests/axios-default'
import requests from '../../requests/requests'
import './Banner.css'
const Banner = (props) => {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        axios.get(requests.Netflix_Originals).then(result => {
            setMovie(result.data.results[
                //e qet -1 per mos me marr naj numer ma shum se qe o lengthi 
                Math.floor(Math.random() * result.data.results.length)
            ])
        })

    }, [])
    let string = '';
    const truncate = (str = string, n) => {
        return str.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    return (
        <header className="banner"
            style={{

                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}") `,
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie.title || movie.name || movie.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List </button>
                </div>
                <h1 className="banner__description">{truncate(movie.overview, 160)}</h1>
            </div>
            <div className="banner__fade"></div>
        </header>
    )
}


export default Banner;
