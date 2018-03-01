import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// spotifyURL including our client id# and a redirect back to our website (temporarily localhost:3000 while developing)
const spotifyURL = 'https://accounts.spotify.com/authorize?client_id=1092c334be0f43b28f75a47dbfe15738&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=user-read-private,user-read-recently-played'


class SpotifyApi extends React.Component{
    constructor(){
        super();
        this.state = {
            token: location.hash.length > 0 ? location.hash.match(/access_token=([\w\d-.]+)/)[1] : '',
            song: []
        }
        // location.hash = '';
    }
 
    componentDidMount() {
        if (this.state.token !== ''){
            console.log('logged in')
            axios ({
                url: 'https://api.spotify.com/v1/search',
                params: {
                    q: 'album:avengers soundtrack',
                    type: 'album'
                },
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    
                    // this.setState({
                    //     song: items
                    // });
                });
        }
     }

    

    render() {
        return(
            <div>
                <a href={spotifyURL}>Login with Spotify</a>
            </div>
            
        )
    }

}

export default SpotifyApi;

