import React from 'react';
import axios from 'axios';
import MovieResults from './MovieResults'

const apiURL = 'https://api.themoviedb.org/3'
const apiKey = 'ba4403ee3098a16bd3c83fc121edf709'


class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            genre: [],
            userGenreSelection: "",
            token: location.search.length > 0 ? location.search.match(/access_token=([\w\d-.]+)/)[1] : '',
        };
        this.submitGenre = this.submitGenre.bind(this);
        this.logOut = this.logOut.bind(this);
        this.showMenu = this.showMenu.bind(this);
    }

    submitGenre (x) {
        this.setState({
            userGenreSelection: x
        })
    }

    logOut() {
        console.log("loggging out");
        this.setState({
            token: ''
        })
    }

    showMenu() {
        let burgermenu = document.getElementById('genreDropDown')
        burgermenu.classList.toggle('show');
    }

    componentDidMount() {
        axios.get(`${apiURL}/genre/movie/list`, {
            params: {
                api_key: 'ba4403ee3098a16bd3c83fc121edf709',
            }
        })
            .then(({ data }) => {
                // console.log(data.genres);
                this.setState({
                    genre: data.genres
                });
            });  
    }

    render() {
        return (  
            <div className="movieSelections">
                {this.state.token === '' ?

                    <div className="loginPage">
                        <div className="logoContainer clearfix">
                            <div className="logo clearfix" >
                                <div className="line smallLeft"></div>
                                <div className="line mediumLeft"></div>
                                <div className="line middle"></div>
                                <div className="line mediumRight"></div>
                                <div className="line smallRight"></div>
                            </div>
                            <h1>Soundtrak</h1>
                        </div>

                        <div className="buttonContainer">
                            <a className="logInButton" href='https://spotify-movie-soundtracks.herokuapp.com/auth'>Login with Spotify</a>
                        </div>

                    </div>
                     :
                    <div>
                        <nav className="fixedHeader">
                            <div className="wrapper clearfix">
                            
                                <div id="burger" onClick={this.showMenu.bind(this)}>
                                    <i className="fas fa-bars"></i>
                                </div>

                                <div onClick={this.logOut}>
                                    <i className="fas fa-user-circle" id="user"></i>
                                </div>

                                <div className="navLogo clearfix">
                                    <img src="../../public/assets/soundbar2.png" alt="" />
                                    <p>Soundtrak</p>
                                </div>
                            </div>
                        </nav>

                    <div className="wrapper clearfix" id="genreDropDown">
                            <div className="dropDownTriangle"></div>
                            {this.state.genre.map((item) => {
                                // console.log(item);
                                return (
                                    <div className="genreList" key={item.id}>
                                        <button onClick={() => this.props.showMovieByGenre(item.id)} key={item.id}>{item.name}</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>                   
                 }
                 {/* <MovieResults /> */}
            </div>
           
        )
    }

}


export default NavBar;