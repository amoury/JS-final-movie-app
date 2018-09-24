import { cleanURL, getIdFromURL } from './utils';
import { loadMovies, getMoviePage, getCastPage, removeCastData } from './views';





/**
 * Handles Active Tabs Underline 
 */
const toggleMenu = () => {
  const menuBtn = gid("dots_menu"),
        menu = qs(".dropdown_menu");
  
  $on(menuBtn, "click", () => menu.classList.toggle("open"));
};


/**
 * Function reponsible for Toggling Tabs
 */
const updateNav = () => {
  const navItems = qsa('.visibleSinglePage'),
        { origin, href } = window.location;

  if (origin === cleanURL(href)) {
    navItems.forEach( item => item.classList.add('hide'))
  } else {
    navItems.forEach( item => item.classList.remove('hide'))
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
  const slideLine = gid("slide_line"),
        activeItem = qs(".active"),
        ItemBounds = activeItem.getBoundingClientRect()
  
  slideLine.style.width = `${ItemBounds.width}px`;
  slideLine.style.left = `${ItemBounds.left}px`;
}


/**
 * Function Responsible for Content Tabs
 * @param {String} tabId 
 */
const handleTabContent = tabId => {
  const contentTabs = qsa(".content_tab"),
        activeTab = qs(tabId);

  for (let contentTab of contentTabs) {
    removeClass(contentTab, "display_tab")
  }
  addClass(activeTab, "display_tab");
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
    case "#tab_three" :
      handleTabContent(href);
      break;
    default:
      break;
  }
}


/**
 * This function handles the Tab click event
 */
export const handleTabClick = () => {
  const links = qsa('.tabs_item a');

  const setActiveClass = event => {
    const href = event.target.hash;
    event.preventDefault();
    for (let item of links) {
      removeClass(item, 'active');
    }
    addClass(event.target, 'active');
    toggleTabs(href);
    handleSlideLine();
  } 


  links.forEach( item => $on(item, 'click', setActiveClass));

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
      handleImageExpand(event.target.currentSrc);
    })
  })

};


/**
 * Expand Image when clicked on Cast Image Page Gallery
 */
export const handleCastImageClick = () => {
  const imageBox = qsa('.cast_gallery_image');

  imageBox.forEach( box => {
    box.addEventListener('click', e => handleImageExpand(e.target.dataset.href))
  });

};


/**
 * Takes the image url and renders an image
 * @param {String} href 
 */
const handleImageExpand = href => {
  const lightBoxClose = document.querySelector(".lightbox_close_btn");
  const lightBox = document.querySelector(".lightbox");
  const imageWrapper = document.querySelector(".lightbox_image_wrapper");
  const body = document.querySelector("body");

  lightBox.classList.add("open");
  imageWrapper.innerHTML = `<img src=${href} />`;
  body.classList.add("noscroll");


  lightBoxClose.addEventListener('click', () => {
    lightBox.classList.remove('open');
    body.classList.remove('noscroll');
  });
}


/**
 * Function Responsible for toggling Cast Page
 */
const handleCastPage = () => {
  const closeBtn = gid("close_page_btn");
  const castPage = gid("cast_single_page");
  const body = qs("body");

  addClass(castPage, 'show_cast');
  addClass(body, 'noscroll');

  $on(closeBtn, 'click', () => {
    removeClass(castPage, 'show_cast');
    removeClass(body, 'noscroll');
    removeCastData();
  })
}


/**
 * Function to Handle Click Event on Cast Cards
 */
export const handleCastClick = () => {
  const castCards = qsa('.cast_card');
  
  castCards.forEach( card => {
    $on(card, 'click', (e) => {
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