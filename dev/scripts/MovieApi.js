import React from 'react';
import axios from 'axios';

const apiURL = 'https://api.themoviedb.org/3';

class MovieApi extends React.Component {
    componentDidMount() {
        axios.get()
    }

    render() {
        return (
            <div>
                <h1>Hey gurl</h1>
            </div>
        )
    }

}

export default MovieApi;