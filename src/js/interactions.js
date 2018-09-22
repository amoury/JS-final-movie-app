import { cleanURL, getIdFromURL } from './utils';
import { loadMovies, getMoviePage } from './views';
import { fetchMovieById } from './model';
/**
 * Function reponsible for Active Tabs Underline
 */
const toggleMenu = () => {
  const menuBtn = document.getElementById("dots_menu");
  const menu = document.querySelector(".dropdown_menu");
  
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
};


const updateNav = () => {
  const { origin, href } = window.location;
  const navItems = document.querySelectorAll('.visibleSinglePage');

  if (origin === cleanURL(href)) {
    navItems.forEach( item => {
      item.classList.add('hide');
    })
  } else {
    navItems.forEach( item => {
      item.classList.remove('hide');
    })
  }
}

const changePage = (id) => {
  if(id) {
    history.pushState(null, null, `${window.location.origin}/${id}`)
    updateNav();
  } else {
    history.replaceState(null, null, `${window.location.origin}`)
    window.location.reload();
  }
}


/**
 * This function handles the Slideline under the tabs
 */
const handleSlideLine = () => {
  const slideLine = document.getElementById("slide_line");
  const activeItem = document.querySelector('.active');
  console.log(activeItem);
  const ItemBounds = activeItem.getBoundingClientRect();
  
  slideLine.style.width = `${ItemBounds.width}px`;
  slideLine.style.left = `${ItemBounds.left}px`;
}
  
/**
 * This function handles the tab click event
 */
const handleTabClick = () => {
  const TabItems = document.querySelectorAll('.tabs_item');
  const links = document.querySelectorAll('.tabs_item a');


  const setActiveClass = event => {
    event.preventDefault();
    for (let item of links) {
      item.classList.remove('active');
    }
    event.target.classList.add('active');
    handleSlideLine();
    const href = event.target.hash;
    if(href === '#tab_one') {
      changePage();
    }
    console.log(document.querySelector(href));
  } 

  links.forEach( item => {
    item.addEventListener('click', setActiveClass);
  });

}


/**
 * This function checks the route once the loading is complete and then makes the call to fetch Movie Data
 */

const getInitialContent = () =>  {
  const { origin, href } = window.location;
  
  if( origin === cleanURL(href)) {
    loadMovies();
  } else {
    const movieId = getIdFromURL(href);
    getMoviePage(movieId);
  }
}


export const handleMovieClick = () => {
  const moviePoster = document.querySelectorAll(".movie");
  moviePoster.forEach(movie => {
    movie.addEventListener('click', event => {
      const { dataset, alt } = event.target;
      const movieDetails = { title: dataset.title, id: alt};
      getMoviePage(movieDetails);
      changePage(alt);
    })
  })
}
  
export const init = () => {
  toggleMenu();
  handleSlideLine();
  handleTabClick();
  updateNav();
  getInitialContent();
}