import { cleanPathName } from './utils';
const imgURL = "https://image.tmdb.org/t/p/w500";

export const movieCardTemplate = (movie, img) => {
  let html = `
    <div class="movie">
      <img src=${img} alt="${movie.id}" data-title="${movie.title}" class="img-responsive"/>
    </div>
  `;

  return html;
}


/**
 * Takes two params - movieData, moviePosters and return HTML
 * @param {Object} movieData 
 * @param {Object} moviePosters 
 */
export const singleMovieTemplate = (movieData, moviePosters) => {
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
};




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



/**
 * Takes an Array of poster Links and returns HTML
 * @param {Array} moviePosters 
 */
const renderPosters = moviePosters => {
  let posters = "";

  moviePosters.forEach(poster => {
    posters += `<div class="poster">
      <img src="https://image.tmdb.org/t/p/w500${poster.file_path}" class="img-responsive" id=${cleanPathName(poster.file_path)}/>
    </div> `
  });

  return posters;
}



export const updateHeaderTemplate = movieData => {
  const { Title, Released, Runtime, Genre, Rated } = movieData;

  document.getElementById("movie_title").innerText = Title;
  document.querySelector(".movie_details_box").innerHTML += `
      <span class="movie_metadata">
        <span class="movie_metadata_type">
          Rated ${Rated}
        </span>
        ${Released} | ${Genre} | ${Runtime}
      </span>
  `;
}



/**
 * Receives and object and returns Cast Cards HTML 
 * @param {Object} castData 
 */
export const castCardsTemplate = castData => {
  let castContent = ``;
  let image = ``;
  // const imgURL = "https://image.tmdb.org/t/p/w500";
  

  castData.cast.forEach( member => {
    
    if(member.profile_path !== null) {
      image = `${imgURL}${member.profile_path}`;
    } else {
      image = "https://upload.wikimedia.org/wikipedia/commons/e/e4/Elliot_Grieveson.png";
    }
    
    castContent += `
      <div class="cast_card">
        <div class="cast_image_box" style="background-image: url(${image})" data-member=${member.id}>
        </div>
        <div class="cast_name" data-member=${member.id}>
          ${member.name}
        </div>
      </div>
    `;
  })


  return castContent;

}



export const castPageTemplate = ({castData, castImages}) => {

  const { profile_path, name, birthday, biography } = castData; 

  const renderImages = ({ profiles }) => {
    let cardGallery = ``;
    profiles.forEach(profile => {
      cardGallery += `
        <div class="cast_card">
          <div class="cast_image_box" style="background-image: url(${imgURL}${profile.file_path})">
          </div>
        </div>
      `;
    })
    return cardGallery;
  }

  let html = `
      <div id="cast_page_head">
        <div class="cast_header" style="background-image: url(${imgURL}${profile_path})">
        </div>

        <div class="cast_profile_image">
          <div class="image_box">
            <img src="${imgURL}${profile_path}" />
          </div>
          <div class="cast_name">
            <h1>${name}</h1>
            <p>${birthday}</p>
          </div>
        </div>
      </div>

      <div class="cast_biography">
      ${ !biography || biography === null ? 
        `<div><h2>No Biography Available</h2></div>` :  
        `<h2>Biography</h2>
        ${biography}`
      }   
      </div>

      <div class="cast_member_gallery">
        ${renderImages(castImages)}
      </div>
  `;
  return html;
}

export const insertOriginalTemplate = () => {
  let html = `
     <div class="loader">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  `;

  return html;
}