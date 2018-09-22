import {
  fetchTopMovies,
  fetchMovieByTitle,
  fetchMovieById,
  fetchMoviePosters
} from "./model";
import { handleMovieClick } from './interactions';

const main = document.querySelector('main');
const imgURL = "https://image.tmdb.org/t/p/w500";

const renderMovies = movies => {
  let movieCards = ``;
  
  movies.forEach( movie => {
    let img = `${imgURL}${movie.poster_path}`;
    movieCards += `
    <div class="movie">
      <img src=${img} alt="${movie.id}" data-title="${movie.title}" class="img-responsive"/>
    </div>
    `;
  })
  return movieCards;
}

export const loadMovies = async () => {
  const movies = await fetchTopMovies();
  const tabOne = document.getElementById('tab_one');
  tab_one.innerHTML = `<div id="popular_movies" class="popular_movies">${renderMovies(movies)}</div>`;
  handleMovieClick();
}



export const renderMoviePage = (movieData, moviePosters) => {
  const singleMovieTab = document.getElementById("tab_two");
  const popularMoviesTab = document.getElementById("tab_one");
  popularMoviesTab.classList.remove('display_tab');
  singleMovieTab.classList.add("display_tab");
  console.log(movieData);
  singleMovieTab.innerHTML = singleMovieHTML(movieData, moviePosters);
};


const singleMovieHTML = (movieData, moviePosters) => {
  let html = `
    <section id="poster_gallery">
      ${renderPosters(moviePosters)}
    </section>

    <section id="movie_details">
      <div class="movie_details_card">
        <div class="movie_ratings">
          ${renderRating(movieData.Ratings)}
        </div>

        <div class="movie_description">
          <p>${movieData.Plot}</p>
          <p>Director - ${movieData.Director}</p>
        </div>
        <div class="movie_additional_details_switch">
          <p class="additional_details_toggle">More about this movie</p>
        </div>
      </div>
    </section>
  `;

  return html;
}


/**
 * Takes Array of Ratings as input and returns HTML
 * @param {Array} Ratings 
 */
const renderRating = (Ratings) => {
  if (!Ratings) return "No Details available";
  let ratingCards = ``;

  Ratings.forEach(card => {
    ratingCards += `
      <div class="rating">
        <h2 class="rating_score">${card.Value}</h2>
        <p class="rating_source">
          <a href="http://rotten.com">${card.Source}</a>
        </p>
      </div>
    `;
  });

  return ratingCards;
}


const renderPosters = moviePosters => {
  let posters = "";

  moviePosters.forEach(poster => {

    posters += `<div class="poster">
      <img src="https://image.tmdb.org/t/p/w500${poster.file_path}" class="img-responsive" />
    </div> `
  });

  return posters;
}


export const getMoviePage = async (movieInfo) => {
  if(typeof(movieInfo) === 'string') {
    const initialMovieData = await fetchMovieById(movieInfo);
    const selectedMovieData = await fetchMovieByTitle(encodeURIComponent(initialMovieData.title));
    const selectedMoviePosters = await fetchMoviePosters(movieInfo);
    renderMoviePage(selectedMovieData, selectedMoviePosters);
  } else {
    const selectedMovieData = await fetchMovieByTitle(encodeURIComponent(movieInfo.title));
    const selectedMoviePosters = await fetchMoviePosters(movieInfo.id);
    renderMoviePage(selectedMovieData, selectedMoviePosters);
  }
}


