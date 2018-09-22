import {
  fetchTopMovies,
  fetchMovieByTitle,
  fetchMovieById,
  fetchMoviePosters,
  fetchMovieCast
} from "./model";
import { handleMovieClick, handlePosterClick } from './interactions';
import { movieCardTemplate, singleMovieTemplate, updateHeaderTemplate, castCardsTemplate } from './templates';


const imgURL = "https://image.tmdb.org/t/p/w500";


export const loadMovies = async () => {
  const movies = await fetchTopMovies();
  const tabOne = document.getElementById('tab_one');

  const renderMovies = movies => {
    let movieCards = ``;
    movies.forEach( movie => {
      let img = `${imgURL}${movie.poster_path}`;
      movieCards += movieCardTemplate( movie, img )
    });
    return movieCards;
  }
  
  tabOne.innerHTML = `<div id="popular_movies" class="popular_movies">${renderMovies(movies)}</div>`;
  handleMovieClick();
  
  
}



export const renderMoviePage = (movieData, moviePosters) => {
  const singleMovieTab = document.getElementById("tab_two");
  const popularMoviesTab = document.getElementById("tab_one");

  popularMoviesTab.classList.remove('display_tab');
  singleMovieTab.classList.add("display_tab");

  singleMovieTab.innerHTML = singleMovieTemplate(movieData, moviePosters);

  handlePosterClick();
};


const renderMovieCast = selectedMovieCast => {
  const castCards = document.getElementById('cast_cards');
  castCards.innerHTML = castCardsTemplate(selectedMovieCast);
}




export const getMoviePage = async (movieId) => {
  const initialMovieData = await fetchMovieById(movieId);
  const selectedMovieData = await fetchMovieByTitle(encodeURIComponent(initialMovieData.title));
  const selectedMoviePosters = await fetchMoviePosters(movieId);
  const selectedMovieCast = await fetchMovieCast(movieId);
  

  renderMovieCast(selectedMovieCast);
  renderMoviePage(selectedMovieData, selectedMoviePosters);
  updateHeaderTemplate(selectedMovieData);

}


