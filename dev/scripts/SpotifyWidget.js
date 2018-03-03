import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SpotifyWidget extends React.Component{
    // constructor() {
    // }

    render() {
        return(
            <div>
                <h1>Hello this is our widget</h1>
                <iframe 
                    src={`https://open.spotify.com/embed?uri=spotify:album:${this.props.match.params.id}`}
                    frameBorder="0" 
                    allow="encrypted-media" 
                    allowtransparency="true">
                </iframe>
            </div>
        )
    }
}

export default SpotifyWidget;