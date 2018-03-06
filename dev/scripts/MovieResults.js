import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import tokens from './tokens';
// import SpotifyApi from './SpotifyApi';

const apiURL = 'https://api.themoviedb.org/3'
const apiKey = 'ba4403ee3098a16bd3c83fc121edf709'

function checkToken() {
    return tokens.refresh_token !== ''
        ? tokens.refresh_token
        : (location.search.length > 0 ? location.search.match(/access_token=([\w\d-.]+)/)[1] : '')
}

class MovieResults extends React.Component{
    constructor(){
        super();
        this.state = {
            title: "",
            movies: [],
            token: checkToken(),
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
        return (
            <div>
                <div>
                    <NavBar showMovieByGenre={this.showMovieByGenre} />
                </div>
                <div className="movie-results wrapper clearfix">
                    {this.state.token !== '' ?
                        this.state.movies.map((movie) => {
                            return (
                                <div className="movie-container" key={movie.id}>
                                    <Link to={`/soundtrack/${movie.id}`}>
                                        <figure className="movie-details"><img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="sq-sample26" />
                                            <figcaption><img className="logo-sm" src="/public/assets/soundbar2.png" alt="" />
                                                <h4>{movie.title}</h4>
                                                <div className="btn">Find Soundtrack</div>
                                            </figcaption>
                                        </figure>
                                    </Link>
                                </div>
                            )
                        })

                        : null}
                </div>
            </div>
        )
    }
}


export default MovieResults;

{/* {this.state.token !== '' ?    */ }


{/* <h2>Heading</h2> */}


