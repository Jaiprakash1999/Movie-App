import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
const Movie = () => {
  const router = useRouter()
  const [movieData, setMovieData] = useState(null);
  const { movie } = router.query
  const getMovieRequest = async (resp) => {
    const url = `http://www.omdbapi.com/?i=${movie}&apikey=3392ffe5`;
    // const url = `http://127.0.0.1:3000/movie`;
    const response = await fetch(url);
    const responseJSON = await response.json();
    console.log(responseJSON);
    if (responseJSON) {
        // console.log(responseJSON);
        setMovieData(responseJSON);
    }
  };
  const setSearchValues = (val) => {
    setSearchValue(val);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
        console.log('This will run after 1 second!')
        getMovieRequest(movie);
        console.log(movieData, "dddd");
      }, 1000);
      return () => clearTimeout(timer);
    
  }, []);
  return (
      <>
        {/* <a className='link' href="https://codepen.io/simoberny/pen/qxxOqj" target="_blank">Dark Version</a> */}
        {
            movieData  ? 
            <div className="movie_card" id="bright">
                <div className="info_section">
                    <div className="movie_header">
                    <img className="locandina" src={movieData.Poster}/>
                    <h1>{movieData.Title}</h1>
                    <h4>{movieData.Year}</h4>
                    <span className="minutes">{movieData.Runtime}</span>
                    <p className="type">{movieData.Genre}</p>
                    </div>
                    <div className="movie_desc">
                    <p className="text">
                        {
                            movieData.Plot
                        }
                    </p>
                    </div>
                    <div className="movie_social">
                    <ul>
                        <li><i className="material-icons">Like &hearts;</i></li>
                    </ul>
                    </div>
                </div>
                <div className="blur_back bright_back"></div>
                </div>: "Loading..."
        }
        
      </>
  )
}
export default Movie