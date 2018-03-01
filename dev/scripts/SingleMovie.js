import React from 'react';

const SingleMovie = (props) => {
    return (
        <div>
            <h2>{props.movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w300/${props.movie.poster_path}`} alt=""/>
            
        </div>
    )
}

export default SingleMovie