import React from 'react';
import axios from 'axios';
import MovieResults from './MovieResults'

const apiURL = 'https://api.themoviedb.org/3'
const apiKey = 'ba4403ee3098a16bd3c83fc121edf709'


class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            genre: [],
            userGenreSelection: "",
            signedIn: false
        };
        this.submitGenre = this.submitGenre.bind(this);
    }

    submitGenre (x) {
        this.setState({
            userGenreSelection: x
        })
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
        
            <div className="movieSelections">
                
                <header>
                    <a href='https://spotify-movie-soundtracks.herokuapp.com/auth'>Login with Spotify</a>
                </header>

                {this.state.genre.map((item) => {
                    // console.log(item);
                    return (
                        <button onClick={() => this.props.showMovieByGenre(item.id)} key={item.id}>{item.name}</button>
                    )
                })}

            </div>
           
        )
    }

}


export default NavBar;