import React from 'react';
import ReactDOM from 'react-dom';
import SelectedMovie from './SelectedMovie'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom';
import MovieResults from './MovieResults';
import tokens from './tokens';
import NavBar from './NavBar';

class App extends React.Component {
    constructor() {
      super();
    }
    componentDidMount() {
      const url = new URL(location.href);
      tokens.access_token = url.searchParams.get('access_token');
      tokens.refresh_token = url.searchParams.get('refresh_token');
    }

    render() {
      return (
        <Router>
          <div>
            <Route path="/" exact component={MovieResults} /> 
            <Route path="/soundtrack/:id" exact component={SelectedMovie} />
          </div>
        </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
