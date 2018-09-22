const API_KEY = "863069699dead81459a0f4320dbbfe58";
const baseURL = "https://api.themoviedb.org/3/movie";
const topRatedMovies = `${baseURL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

export const fetchTopMovies = async () => {
  try {
    const response = await fetch(topRatedMovies);
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.log(error);
  }
}

export const fetchMovieByTitle = async (movieTitle) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=22dd030c`);
    const movieDetails = await response.json();
    return movieDetails;
  } catch (error) {
    console.log(error);
  }
}


export const fetchMovieById = async id => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMoviePosters = async movieId => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}&language=en-US&include_image_language=en`
    );
    const moviePosters = await response.json();
    return moviePosters.posters;
  } catch (error) {
    console.log(error);
  }
};