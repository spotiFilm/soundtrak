import React from 'react';
import axios from 'axios';

const apiURL = 'https://api.themoviedb.org/3'
const apiKey = 'ba4403ee3098a16bd3c83fc121edf709'

class SelectedMovie extends React.Component {
    constructor() {
        super();
        this.state = {
            overview: '',
            title: '',
            poster_path: '',
            tagline: ''
        };
    }
    componentDidMount() {
        axios.get(`${apiURL}/movie/${this.props.match.params.id}`, {
            params: {
                api_key: 'ba4403ee3098a16bd3c83fc121edf709',
            }
        })
            .then(({ data }) => {
                console.log(data);
                this.setState({
                    overview: data.overview,
                    tagline: data.tagline,
                    title: data.title,
                    poster_path: data.poster_path
                });
            });
    }
    render() {
        return(
            <div>
                <h2>{this.state.title}</h2>
                <h3>{this.state.tagline}</h3>
                <p>{this.state.overview}</p>
                <img src={`https://image.tmdb.org/t/p/w200/${this.state.poster_path}`} alt="`poster for {this.state.poster_path}`" />
            </div>
        )
    }
}

export default SelectedMovie;
