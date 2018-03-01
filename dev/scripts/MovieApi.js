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
            title: '',

        };
        
    }

    componentDidMount() {
        axios.get(`${apiURL}/genre/36/movies`, {
            params:{
                api_key: 'ba4403ee3098a16bd3c83fc121edf709',
            }
        })
        .then(({data}) => {
            console.log(data);
            this.setState({
                movies: data.results,
                title: data.title
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.movies.map((movie) => {
                    return <SingleMovie movie={movie} key={movie.id}/>
                })};
                <h1>Hey gurl</h1>
            </div>
        )
    }

}

export default MovieApi;