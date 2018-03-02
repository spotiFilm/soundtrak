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
        };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this)
    }

    // handleChange(e) {
    //     this.setState({
    //         [e.target.id]: e.target.value
    //     })
    // }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     this.findGenre();
    // }

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
                            <button key={item.id}>{item.name}</button>
                        )
                    })};
                </div>
            </div>
        )
    }

}

export default NavBar;