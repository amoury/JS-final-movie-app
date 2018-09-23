import { cleanURL, getIdFromURL } from './utils';
import { loadMovies, getMoviePage, getCastPage, removeCastData } from './views';


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


/**
 * Function reponsible for Toggling Tabs
 */
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



/**
 * Function to handle routing
 * @param {String} id 
 */
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
 * Handles the Slideline under the tabs
 */
const handleSlideLine = () => {
  const slideLine = document.getElementById("slide_line");
  const activeItem = document.querySelector('.active');
  const ItemBounds = activeItem.getBoundingClientRect();
  
  slideLine.style.width = `${ItemBounds.width}px`;
  slideLine.style.left = `${ItemBounds.left}px`;
}


/**
 * Function Responsible for Content Tabs
 * @param {String} tabId 
 */
const handleTabContent = tabId => {
  const contentTabs = document.querySelectorAll(".content_tab");
  const activeTab = document.querySelector(tabId);

  for (let contentTab of contentTabs) {
    contentTab.classList.remove("display_tab");
  }
  activeTab.classList.add("display_tab");
};
  

/**
 * Function that handles Tab Toggling
 * @param {String} href 
 */
const toggleTabs = href => {
  switch (href) {
    case "#tab_one":
      handleTabContent(href);
      changePage();
      break;
    case "#tab_two":
      handleTabContent(href);
    case "#tab_three" :
      handleTabContent(href);
    default:
      break;
  }
}


/**
 * This function handles the Tab click event
 */
const handleTabClick = () => {
  const links = document.querySelectorAll('.tabs_item a');

  const setActiveClass = event => {
    event.preventDefault();
    for (let item of links) {
      item.classList.remove('active');
    }
    event.target.classList.add('active');
    const href = event.target.hash;
    
    toggleTabs(href);
    handleSlideLine();
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



/**
 * Function to Handle the click on Movie Posters on HomePage
 */
export const handleMovieClick = () => {
  const moviePoster = document.querySelectorAll(".movie");
  moviePoster.forEach(movie => {
    movie.addEventListener('click', ({target}) => {
      getMoviePage(target.alt);
      changePage(target.alt);
    })
  })
}


/**
 * Expand Image when clicked on Overview Page
 */
export const handlePosterClick = () => {
  const posters = document.querySelectorAll('.poster');

  posters.forEach( poster => {
    poster.addEventListener('click', event => {
      console.log(event);
    })
  })
};


/**
 * Function Responsible for toggling Cast Page
 */
const handleCastPage = () => {
  const closeBtn = document.getElementById("close_page_btn");
  const castPage = document.getElementById("cast_single_page");
  const body = document.querySelector("body");

  castPage.classList.add('show_cast');
  body.classList.add('noscroll');

  closeBtn.addEventListener('click', () => {
    castPage.classList.remove('show_cast');
    body.classList.remove('noscroll');
    removeCastData();
  })
}


/**
 * Function to Handle Click Event on Cast Cards
 */
export const handleCastClick = () => {
  const castCards = document.querySelectorAll('.cast_card');
  // const castPage = document.getElementById('cast_single_page');
  
  castCards.forEach( card => {
    card.addEventListener('click', (e) => {
      getCastPage(e.target.dataset.member);
      handleCastPage();
    })
  })
}



/**
 * Functions to be called when App loads
 */
export const init = () => {
  toggleMenu();
  handleSlideLine();
  handleTabClick();
  updateNav();
  getInitialContent();
}