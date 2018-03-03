import React from 'react';
import axios from 'axios';
import tokens from './tokens';

const apiURL = 'https://api.themoviedb.org/3'
const apiKey = 'ba4403ee3098a16bd3c83fc121edf709'

class SelectedMovie extends React.Component {
    constructor() {
        super();
        this.state = {
            overview: '',
            title: '',
            poster_path: '',
            tagline: '',
            resultsId: '',
            albums: []
        };
    }
    componentDidMount() {
        //In order to use spotify effectively 
        //Call the .getToken method, and then take the 
        //returned token and make your request.
        tokens.getToken()
            .then((token) => {
                console.log(token);
                axios({
                    url: 'https://api.spotify.com/v1/search',
                    params: {
                        q: `soundtrack:${this.state.title}`,
                        type: 'album',
                        album_type: 'album'
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(({data}) => {
                    console.log(data.albums.items);
                    this.setState({
                        albums: data.albums.items
                    });
                })
            })



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
        let filteredResults = this.state.albums.filter((album) => {
            return album.album_type === 'album';
        })
        console.log(filteredResults);

        let markup = null
            if (filteredResults.length > 0){
                markup = 
                (<div>
                    {filteredResults.map((album) => {
                        return (
                            <div key={album.id}>
                                <p>{album.name}</p>
                                <img src={`${album.images[1].url}`} alt={`album cover for ${album.name}`} />
                            </div>
                        )
                    })}
                </div>) 
            } else{ markup = <button>Find playlist</button>
            }

        return(
            <div>
                <div>
                    <h2>Soundtracks for {this.state.title}</h2>
                    {/* <h3>{this.state.tagline}</h3> */}
                    {/* <p>{this.state.overview}</p> */}
                    {/* <img src={`https://image.tmdb.org/t/p/w200/${this.state.poster_path}`} alt={`poster for ${this.state.title}`} /> */}
                </div>

                {markup}
            </div>
        )
    }
}

export default SelectedMovie;
