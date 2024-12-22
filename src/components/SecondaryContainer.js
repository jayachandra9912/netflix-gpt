import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector(store => store.movies)
    return (movies.nowPlayingMovies && (
        <div className=' bg-black'>
            <div className='-mt-44 pl-6 relative z-20'>
                <MovieList title={"Now Playing Movies"} movies={movies.nowPlayingMovies} />
                <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />

                <MovieList title={"Upcoming Movies"} movies={movies.upComingMovies} />
                <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
                {/* <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies} /> */}
            </div>
        </div>
    )
    )
}

export default SecondaryContainer