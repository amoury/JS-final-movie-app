const API_KEY = "863069699dead81459a0f4320dbbfe58";
const baseURL = "https://api.themoviedb.org/3/movie";
const topRatedMovies = `${baseURL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`;


/**
 * Returns the list of Top Movies
 */
export const fetchTopMovies = async () => {
  try {
    const response = await fetch(topRatedMovies);
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.log(error);
  }
}


/**
 * Returns the Movie Details based on the Title
 * @param {String} movieTitle 
 */
export const fetchMovieByTitle = async (movieTitle) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?t=${movieTitle}&apikey=22dd030c`);
    const movieDetails = await response.json();
    return movieDetails;
  } catch (error) {
    console.log(error);
  }
}


/**
 * Returns The Movie Details based on ID
 * @param {String} id 
 */
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


/**
 * Returns The Movie Images based on the ID
 * @param {String} movieId 
 */
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



/**
 * Returns The Movie Cast based on the Movie ID
 * @param {String} movieId 
 */
export const fetchMovieCast = async movieId => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
    const movieCast = await response.json();
    return movieCast;
  } catch(error) {
    console.log(error);
  }
}



/**
 * Returns the Cast Member Details based on the Member's ID
 * @param {String} personId 
 */
export const fetchCastDetails = async personId => {
  personId = "192";
  try {
    const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}&language=en-US`);
    const images = await fetch(`https://api.themoviedb.org/3/person/${personId}/images?api_key=${API_KEY}`);
    
    const castData = await response.json();
    const castImages = await images.json();

    return { castData, castImages };
  } catch (error) {
    console.log(error);
  }
}

