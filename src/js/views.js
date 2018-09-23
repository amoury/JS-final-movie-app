import {
  fetchTopMovies,
  fetchMovieByTitle,
  fetchMovieById,
  fetchMoviePosters,
  fetchMovieCast,
  fetchCastDetails
} from "./model";
import {
  handleMovieClick,
  handlePosterClick,
  handleCastClick,
  handleCastImageClick
} from "./interactions";
import {
  movieCardTemplate,
  singleMovieTemplate,
  updateHeaderTemplate,
  castCardsTemplate,
  castPageTemplate,
  insertOriginalTemplate
} from "./templates";




const imgURL = "https://image.tmdb.org/t/p/w500";


/**
 * Handles getting the Movies from Model
 */
export const loadMovies = async () => {
  const movies = await fetchTopMovies();
  const tabOne = document.getElementById("tab_one");

  const renderMovies = movies => {
    let movieCards = ``;
    movies.forEach(movie => {
      let img = `${imgURL}${movie.poster_path}`;
      movieCards += movieCardTemplate(movie, img);
    });
    return movieCards;
  };

  tabOne.innerHTML = `<div id="popular_movies" class="popular_movies">${renderMovies(movies)}</div>`;
  handleMovieClick();
};



/**
 * Incharge of displaying the correct Content Tab and changing the DOM
 * @param {Object} movieData 
 * @param {Object} moviePosters 
 */
export const renderMoviePage = (movieData, moviePosters) => {
  const singleMovieTab = document.getElementById("tab_two");
  const popularMoviesTab = document.getElementById("tab_one");

  popularMoviesTab.classList.remove("display_tab");
  singleMovieTab.classList.add("display_tab");

  singleMovieTab.innerHTML = singleMovieTemplate(movieData, moviePosters);
  handlePosterClick();
};


/**
 * Receives Movie Cast Details and takes care of updating the DOM
 * @param {Object} selectedMovieCast 
 */
const renderMovieCast = selectedMovieCast => {
  const castCards = document.getElementById("cast_cards");
  castCards.innerHTML = castCardsTemplate(selectedMovieCast);
  handleCastClick();
};


/**
 * Incharge of handling the Single Movie Page
 * @param {String} movieId 
 */
export const getMoviePage = async movieId => {
  const initialMovieData = await fetchMovieById(movieId);
  const selectedMovieData = await fetchMovieByTitle(
    encodeURIComponent(initialMovieData.title)
  );
  const selectedMoviePosters = await fetchMoviePosters(movieId);
  const selectedMovieCast = await fetchMovieCast(movieId);

  renderMovieCast(selectedMovieCast);
  renderMoviePage(selectedMovieData, selectedMoviePosters);
  updateHeaderTemplate(selectedMovieData);
};


/**
 * Receives the Movie Cast Details and updates the DOM
 * @param {String} castId 
 */
export const getCastPage = async castId => {
  const castContent = document.getElementById("cast_content");

  const getCastData = await fetchCastDetails(castId);
  castContent.innerHTML = castPageTemplate(getCastData);
  handleCastImageClick();
};


/**
 * Function incharge of removing the cast data when User clicks Close Single Cast Page
 */
export const removeCastData = () => {
  const castContent = document.getElementById("cast_content");
  castContent.innerHTML = insertOriginalTemplate();
};
