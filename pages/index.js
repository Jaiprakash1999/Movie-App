import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Head from "next/head";
// import '../styles/movie.css'

export default function Home() {
  const [movies, setMovies] = useState([]);
  // const [favourites, setFavourites] = useState([]);
  const [films, setFilms] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const getMovieRequest = async (resp) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3392ffe5`;
    //  const url = `http://127.0.0.1:3000/movie`;


    const response = await fetch(url);
    const responseJSON = await response.json();
    if (responseJSON.Search) {
      setMovies(responseJSON.Search);
    }
  };
  const setSearchValues = (val) => {
    setSearchValue(val);
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const fetchFilmDetails = () => {
    try {
      axios
        .get("http://127.0.0.1:3000/movie", {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then((response) => {
          let result = JSON.parse(JSON.stringify(response));
          let { data } = result
          console.log(data)
          setFilms(data);

        });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchFilmDetails();
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <h1>
        Movie Search Engine
      </h1>
      <div className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">

          <div className="col col-sm-4">
            <input
              className="form-control search"
              onChange={(event) => setSearchValues(event.target.value)}
              value={searchValue}
              placeholder="Type to search..."
            ></input>

            <button>Search</button>
          </div>
        </div>
      </div>
      <div className="main">
        {
          movies.length > 0 ?
            <ul className="cards">
              {
                movies.map((movie, index) => (
                  <>
                    <li className="cards_item">
                      <div className="card">
                        <div className="card_image">
                          <Link href={`/${movie.imdbID}`} style={{ textDecoration: 'none' }}>

                            <img src={movie.Poster} className="movieImg">

                            </img>
                          </Link>

                        </div>
                        <div className="card_content">
                          <h2 className="card_title">{movie.Title}</h2>
                          <br />
                          <button className="btn card_btn">
                            <Link href={`/${movie.imdbID}`} style={{ textDecoration: 'none' }} >
                              Details
                            </Link>
                          </button>
                        </div>
                      </div>

                    </li>



                  </>
                ))


              }

            </ul>
            : <h1>No movie found</h1>
        }
        {films.map((film, index1) => {
          return (
          <li >
            <div className="card">
              <div className="card_image">
                {/* <Link href={`/${film.title}`} style={{ textDecoration: 'none' }}>

                  <img src={film.year} className="movieImg">

                  </img>
                </Link> */}

              </div>
              <div className="card_content">
                <h2 className="card_title">{film.title}</h2>
                <h4>{film.year}</h4>
                <h6>{film.duration}</h6>

                <br />
                <button className="btn card_btn">
                  {/* <Link href={`/${film.imdbID}`} style={{ textDecoration: 'none' }} >
                    {film.duration}
                  </Link> */}
                </button>
              </div>
            </div>

          </li>
        )})}
      </div>
    </>
  );
}
