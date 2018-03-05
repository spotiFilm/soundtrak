import React from 'react';
import axios from 'axios';
import tokens from './tokens';
import { Link } from 'react-router-dom';
import SpotifyWidget from './SpotifyWidget';

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
        this.playlistSearch = this.playlistSearch.bind(this);
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
                        ////// change this to album///////
                        q: `album:${this.state.title}`,
                        type: 'album'
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
                api_key: 'ba4403ee3098a16bd3c83fc121edf709'
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

    //ASK RYAN -how do we make the query search using a more general search string?
    playlistSearch() {
        tokens.getToken()
            .then((token) => {
                console.log(token);
                axios({
                    url: 'https://api.spotify.com/v1/search',
                    params: {
                        //this is hardcoded temporarily because {this.state.title} is 
                        //to specific and returns 0 results (: is included in title)
                        q: `kingsman`,
                        type: 'playlist'
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(({data}) => {
                    console.log(data);
                    this.setState({
                        // albums: data.albums.items
                    });
                })
            })
    }


    render() {
        let filteredResults = this.state.albums.filter((album) => {
            return album.album_type === 'album';
        })
        console.log(filteredResults);

        let markup = null
            if (filteredResults.length > 0){
                markup = 
                (<div className="albumResults">
                    {filteredResults.map((album) => {
                        return (
                            <div className="singleAlbum" key={album.id}>
                                <div className="filmInfo_content">
                                    <p>{album.name}</p>
                                </div>
                                {/* <Link to={`/soundtrack/${movie.id}`}> */}
                                
                                <Link to={`/player/${album.id}`}>
                                    <img src={`${album.images[1].url}`} alt={`album cover for ${album.name}`} />
                                </Link>
                            </div>
                        )
                    })}
                </div>) 
            } else{ markup = <button onClick={this.playlistSearch} >Find playlist</button>}
        
        return(
            <div>
                <div className="wrapper">
                    <div className="filmInfo">
                        <h2>Soundtracks for {this.state.title}</h2>
                        <h3>{this.state.tagline}</h3>
                        <p>{this.state.overview}</p>
                        <div className="poster_container">
                            <img src={`https://image.tmdb.org/t/p/w300/${this.state.poster_path}`} alt={`poster for ${this.state.title}`}/>
                        </div>
                    </div>
                    {markup}
                </div>
            </div>
        )
    }
}

export default SelectedMovie;
