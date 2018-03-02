import axios from 'axios';
export default {
    access_token: '',
    refresh_token: '',
    getToken() {
        return new Promise((resolve,reject) => {
            axios({
                url: 'https://spotify-movie-soundtracks.herokuapp.com/refresh',
                method:'GET',
                params: {
                    refresh_token: this.refresh_token
                }
            })
            .then((res)  => {
                const { access_token } = res.data;
                resolve(access_token)
            }) 
        });
    }
}