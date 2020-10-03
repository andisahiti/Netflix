const API_KEY = '0c590e8c6645385cef35b883e393009b'

const requests = {
    Netflix_Originals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    Trending_Now: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    Top_Rated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    ActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    Comedy_Movies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    Horror_Movies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    Romance_Movies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`
}


export default requests;