import React from 'react';
import axios from 'axios';
import SingleMovie from './SingleMovie'

const apiURL = 'https://api.themoviedb.org/3'
const apiKey = 'ba4403ee3098a16bd3c83fc121edf709'

class MovieApi extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            genre: [],
            input: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.findMovie = this.findMovie.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.findMovie();
    }

    getGenreID(e) {

        if (id === "Animation") {
            getGenreID = 16;
        }
        else if (id === "Drama") {
            getGenreID = 18;
        }
        else if (id === "Comedy") {
            getGenreID = 35;
        }
        else if (id === "Horror") {
            getGenreID = 27;
        }
        else if (id === "Romance") {
            getGenreID = 10749;
        }
        else if (id === "Sci-Fi") {
            getGenreID = 878;
        }
        else if (id === "Western") {
            getGenreID = 37;
        }
        console.log(getGenreId)
    
    }

    findMovie() {
        // e.preventDefault();
       axios.get(`${apiURL}/genre/${this.state.genre}/movies`, {
            params:{
                api_key: 'ba4403ee3098a16bd3c83fc121edf709',
            }
        })
        .then(({data}) => {
            console.log(data);
            this.setState({
                movies: data.results,
            });
        });
    }

    componentDidMount() {
        axios.get(`${apiURL}/genre/movie/list`, {
            params: {
                api_key: 'ba4403ee3098a16bd3c83fc121edf709',
            }
        })
            .then(({ data }) => {
                console.log(data.genres);
                this.setState({
                    genre: data.genres
                });
            });
    
            
    
    }

    render() {
        return (
            <div>
                <form onSubmit={this.getMovie}>     
                    <button type="submit" onChange={this.handleChange} onClick={this.handleSubmit} id="horror">horror</button>
                    <button type="submit" onChange={this.handleChange} onClick={this.handleSubmit} id="comedy" >comedy</button>
                </form>

                <div className="movieSelections">
                    {this.state.genre.map((item) => {
                        return (
                            <p key={item.id}>{item.name}</p>
                    
                        )
                    })};
                </div>

                {this.state.movies.map((movie) => {
                    return <SingleMovie movie={movie} key={movie.id}/>
                })}
                <h1>Hey gurl</h1>
            </div>
        )
    }

}

export default MovieApi;