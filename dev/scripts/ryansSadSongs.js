import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Song from './Song';
import { faSpotify } from '@fortawesome/fontawesome-free-brands'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


//A ternary for spotifyURL
const spotifyURL = location.origin.includes('heroku') ? 'https://accounts.spotify.com/authorize?client_id=a18a1c1b5b654f92bd93ca6603bf44c6&response_type=token&redirect_uri=https%3A%2F%2Fsad-songs.herokuapp.com%2F&scope=user-read-private,user-read-recently-played' : 'https://accounts.spotify.com/authorize?client_id=a18a1c1b5b654f92bd93ca6603bf44c6&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3600&scope=user-read-private,user-read-recently-played';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            // Grabs the access_token from the url
            token: location.hash.length > 0 ? location.hash.match(/access_token=([\w\d-.]+)/)[1] : '',
            recent: []
        }
        location.hash = '';
    }
    componentDidMount() {
        //Check if the token is there before getting the request
        if (this.state.token !== '') {
            axios({
                url: 'https://api.spotify.com/v1/me/player/recently-played',
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            })
                .then(({ data: { items } }) => {
                    this.setState({
                        recent: items
                    });
                });
        }
    }
    render() {
        return (
            <div>
                <header className="main-header">
                    <h1>Are you listening to sad songs?</h1>
                    <div>
                        <a href={spotifyURL}><FontAwesomeIcon icon={faSpotify} /> Login with Spotify</a>
                    </div>
                </header>
                <section className="songs">
                    {this.state.recent.map((song, i) => {
                        return <Song {...song} key={`${song.track.id}${i}`} />
                    })}
                </section>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));