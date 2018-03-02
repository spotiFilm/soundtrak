import React from 'react';
import ReactDOM from 'react-dom';
import SelectedMovie from './SelectedMovie'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';
import MovieResults from './MovieResults';

class App extends React.Component {
    componentDidMount() {
      
    }
    render() {
      return (
        <Router>
          <div>
            {/* <SpotifyApi />
            <NavBar /> */}
            {/* <MovieResults /> */}
            <Route path="/" exact component={MovieResults} /> 
            <Route path="/movie/:id" exact component={SelectedMovie} />
          </div>
        </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
