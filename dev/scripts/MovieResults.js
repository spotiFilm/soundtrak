import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
// import SpotifyApi from './SpotifyApi';

const apiURL = 'https://api.themoviedb.org/3'
const apiKey = 'ba4403ee3098a16bd3c83fc121edf709'

class MovieResults extends React.Component{
    constructor(){
        super();
        this.state = {
            title: "",
            movies: [],
        };
        this.showMovieByGenre = this.showMovieByGenre.bind(this);
    }


    componentDidMount() {
        //axios call for finding movies
        axios.get(`${apiURL}/movie/popular`, {
            params: {
                api_key: 'ba4403ee3098a16bd3c83fc121edf709',
                total_results: 3
                
            }
        })
        .then(({ data }) => {
            // console.log(data);
            this.setState({
                movies: data.results
            });
        });
    }


    showMovieByGenre(genre) {
        console.log(genre); 
        axios.get(`${apiURL}/genre/${genre}/movies`, {
            params: {
                api_key: 'ba4403ee3098a16bd3c83fc121edf709',
            }
        })
            .then(({ data }) => {
                this.setState({
                    movies: data.results
                });
            });
    }

    render() {
        return(
            <div>   
                <NavBar showMovieByGenre={this.showMovieByGenre}/>
                <div className="wrapper clearfix">
                    <h2 className="results-heading">Heading</h2>
                        <div>
                            {this.state.movies.map((movie) => {
                                return (
                                    <div key={movie.id}>
                                        <Link to={`/soundtrack/${movie.id}`}>
                                            <figure className="movie-details"><img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="" />
                                                <figcaption><img className="logo-sm" src="/public/assets/soundbar2.png" alt="" />
                                                    <h4>{movie.title}</h4>
                                                    <div className="btn">Find Soundtrack</div>
                                                </figcaption>
                                            </figure>
                                        </Link>
                                </div>
                            )})}  
                        </div>
                </div>  
            </div> 
        )
    } 
}


export default MovieResults