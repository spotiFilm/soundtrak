import React from 'react';
import axios from 'axios';
import tokens from './tokens';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

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
            albums: [],
            playlists: []
        };
        this.playlistSearch = this.playlistSearch.bind(this);
        this.playlistRender = this.playlistRender.bind(this);
    }
    componentDidMount() {
        //In order to use spotify effectively 
        //Call the .getToken method, and then take the 
        //returned token and make your request.
        tokens.getToken()
            .then((token) => {
                axios({
                    url: 'https://api.spotify.com/v1/search',
                    params: {
                        q: `album:${this.state.title}`,
                        type: 'album'
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(({data}) => {
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
                this.setState({
                    overview: data.overview,
                    tagline: data.tagline,
                    title: data.title,
                    poster_path: data.poster_path
                });
            });
    }


    playlistSearch() {
        tokens.getToken()
            .then((token) => {
                axios({
                    url: 'https://api.spotify.com/v1/search',
                    params: {
                        q: `${this.state.title.replace(/[:]/ig,'')}`,
                        type: 'playlist'
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(({data}) => {
                    this.setState(
                        {
                        playlists: data.playlists.items
                        }, 
                        () => { this.playlistRender()
                        }); 
                })
            })
    }


    playlistRender() {
        
        let playlistResults = this.state.playlists;

        if (playlistResults.length > 0) {
            return (
                <div>
                    {playlistResults.map((playlist) => {
                        return (
                            <div className="album_container">
                                <div className="singleAlbum" key={playlist.id}>
                                    <div className="filmInfo_content">
                                        <p>{playlist.name}</p>
                                    </div>
                                    <iframe
                                        src={`https://open.spotify.com/embed?uri=${playlist.uri}&theme=white`}
                                        width="100%"
                                        height="380"
                                        frameBorder="0"
                                        allowtransparency="true">
                                    </iframe> 
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else { playlistResults = <p>No gurl, noooooooo</p> }
    }


    render() {
        let filteredResults = this.state.albums.filter((album) => {
            return album.album_type === 'album';
        })

        let soundtrackResults = null
            if (filteredResults.length > 0){
                soundtrackResults = 
                (
                <div className="albumResults">
                    {filteredResults.map((album) => {
                        return (
                            <div className="album_container">
                                <div className="singleAlbum" key={album.id}>
                                    <div className="filmInfo_content">
                                        <p>{album.name}</p>
                                    </div>
                                    
                                    <Link to={`/player/${album.id}`}>
                                        {/* <img src={`${album.images[1].url}`} alt={`album cover for ${album.name}`} /> */}
                                    </Link>
                                    <iframe 
                                        src={`https://open.spotify.com/embed?uri=spotify:album:${album.id}&theme=white`}
                                        width="100%" 
                                        height="380" 
                                        frameBorder="0" 
                                        allowtransparency="true">
                                    </iframe>
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>) 
            } else{ soundtrackResults = 
            <div className="btn-container clearfix">
                <button className="playlistBtn clearfix btn" onClick={this.playlistSearch}>Find Playlist</button>
            </div>
            }
        
        
        const playlistRender = ( 
            <h2>hello</h2>
        )
        return(
            <div>
                <nav className="fixedHeader">
                    <div className="wrapper clearfix">

                        <Link to='/'><i className="fas fa-chevron-circle-left"></i></Link>

                        <div className="navLogo clearfix">
                            <img src="../../public/assets/soundbar2.png" alt="" />
                            <p>Soundtrak</p>
                        </div>
                    </div>
                </nav>

                <div className="wrapper movie-results">
                    <div className="filmInfo">
                        <h2>Soundtracks for {this.state.title}</h2>
                        <div className="poster_container">
                            <img src={`https://image.tmdb.org/t/p/w300/${this.state.poster_path}`} alt={`poster for ${this.state.title}`} />
                        </div>
                        <h3>{this.state.tagline}</h3>
                        <p className="description">{this.state.overview}</p>
                    </div>
                    {soundtrackResults}
                    {this.state.playlists > 0 ? playlistRender : null}
                    {this.playlistRender()}

                </div>
            </div>
        )
    }
}

export default SelectedMovie;
