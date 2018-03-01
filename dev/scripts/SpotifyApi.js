import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//A ternary for spotifyURL
const spotifyURL = 'https://accounts.spotify.com/authorize?client_id=1092c334be0f43b28f75a47dbfe15738&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=user-read-private,user-read-recently-played'


class SpotifyApi extends React.Component{
    constructor(){
        super();
        this.state = {
            token: location.hash.length > 0 ? location.hash.match(/access_token=([\w\d-.]+)/)[1] : '',
        }
        location.hash = '';
    }
 

    

    render() {
        return(
            <div>
                <a href={spotifyURL}> Login with Spotify</a>
            </div>
        )
    }

}

export default SpotifyApi;

