import React, { useEffect, useState } from 'react'
import axios from '../../requests/axios-default'
import './Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'


const baseUrl = 'https://image.tmdb.org/t/p/original/'


const Row = (props) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    let rowType = props.bigRow;
    useEffect(() => {
        axios.get(props.fetchUrl).then(result => {
            setMovies(result.data.results)
        })

    }, [props.fetchUrl])


    const opts = {
        height: '390px',
        width: '100%',
        playerVars: {
            autoplay: 1,
        }
    }
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie.title || movie.name || '').then(url => {
                //get everything after the question mark in the url psh ?id=12 me new Url e masnej qat new Url e shtina URLSearchParams
                const urlParams = new URLSearchParams(new URL(url).search);
                //qajo URLSearchParams na jep ni metod get edhe e merr valuen e keyt qe osht mas ?
                //dmth ?v=asdasd ka me ta jep asdasd
                setTrailerUrl(urlParams.get('v'))

            }).catch(error => console.log(error))
        }
    }

    return (
        <div className='row'>
            <h2 style={{
                color: 'white'
            }}>{props.title}</h2>
            <div className='row_posters'>
                {movies.map(element => {
                    return (
                        <img onClick={() => handleClick(element)}
                            key={element.id}
                            className={`row_poster ${rowType && 'row_posterLarge'}`}
                            src={`${baseUrl}${rowType ? element.poster_path : element.backdrop_path}`} alt={element.title}></img>
                    )
                })}
            </div>
            {trailerUrl ? <YouTube videoId={trailerUrl} opts={opts}></YouTube> : null}
        </div>
    )
}

export default Row;