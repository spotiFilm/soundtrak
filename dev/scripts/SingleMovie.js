import React from 'react';

const SingleMovie = (props) => {
    return (
        <div>
            <h3>{props.movie.title}</h3>
            <img src={`https://image.tmdb.org/t/p/w200/${props.movie.poster_path}`} alt=""/>
        </div>
    )
}

export default SingleMovie