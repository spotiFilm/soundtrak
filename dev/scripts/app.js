import React from 'react';
import ReactDOM from 'react-dom';
import MovieApi from './MovieApi';
import SpotifyApi from './SpotifyApi';

class App extends React.Component {
    render() {
      return (
        <div>
          <SpotifyApi />
          <MovieApi />
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
