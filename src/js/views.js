import { fetchTopMovies, fetchMovieByTitle, fetchMovieById } from './model';
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





export const getMoviePage = async (movieInfo) => {
  const singleMovieTab = document.getElementById('tab_two');
  singleMovieTab.classList.add('display_tab');
  
  if(typeof(movieInfo) === 'string') {
    const initialMovieData = await fetchMovieById(movieInfo);
    const selectedMovieData = await fetchMovieByTitle(encodeURIComponent(initialMovieData.title));
    console.log(selectedMovieData);
  } else {
    const selectedMovieData = await fetchMovieByTitle(encodeURIComponent(movieInfo.title));
    console.log(selectedMovieData);
  }
}