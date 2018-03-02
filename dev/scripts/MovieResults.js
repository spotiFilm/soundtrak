import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import SpotifyApi from './SpotifyApi';

const apiURL = 'https://api.themoviedb.org/3'
const apiKey = 'ba4403ee3098a16bd3c83fc121edf709'

class MovieResults extends React.Component{
    constructor(){
        super();
        this.state = {
            title: "",
            movies: [],
        };
    }


    componentDidMount() {
        //axios call for finding movies
        axios.get(`${apiURL}/genre/27/movies`, {
            params: {
                api_key: 'ba4403ee3098a16bd3c83fc121edf709',
            }
        })
        .then(({ data }) => {
            console.log(data.results);
            this.setState({
                movies: data.results
            });
        });
    }

    render() {
        //         return <MovieResults movie={movie} key={movie.id} />
        
        return(
            <div>
                <NavBar />
                <SpotifyApi />
                {this.state.movies.map((movie) => {
                return (
                    <div key={movie.id}>
                    <Link to={`/movie/${movie.id}`}>
                        <h2>{movie.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="" />
                    </Link>
                </div> 
                )
            })}     
            </div>
        )
            
    } 
    
}


export default MovieResults