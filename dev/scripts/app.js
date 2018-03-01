import React from 'react';
import ReactDOM from 'react-dom';
import MovieApi from './MovieApi';
import SpotifyApi from './SpotifyApi';

class App extends React.Component {
    render() {
      return (
        <div>
          <MovieApi />
          <SpotifyApi />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
