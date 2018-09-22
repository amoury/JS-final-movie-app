import { cleanURL, getIdFromURL } from './utils';
import { loadMovies, getMoviePage } from './views';


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
 * @param {string} id 
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
 * This function handles the Slideline under the tabs
 */
const handleSlideLine = () => {
  const slideLine = document.getElementById("slide_line");
  const activeItem = document.querySelector('.active');
  const ItemBounds = activeItem.getBoundingClientRect();
  
  slideLine.style.width = `${ItemBounds.width}px`;
  slideLine.style.left = `${ItemBounds.left}px`;
}
  




/**
 * This function handles the tab click event
 */
const handleTabClick = () => {
  const links = document.querySelectorAll('.tabs_item a');

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
  
  const setActiveClass = event => {
    event.preventDefault();
    for (let item of links) {
      item.classList.remove('active');
    }
    event.target.classList.add('active');
    handleSlideLine();
    const href = event.target.hash;

    toggleTabs(href);
  } 


  links.forEach( item => {
    item.addEventListener('click', setActiveClass);
  });

}


const handleTabContent = (tabId) => {
  const contentTabs = document.querySelectorAll('.content_tab');
  const activeTab = document.querySelector(tabId);

  for (let contentTab of contentTabs) {
    contentTab.classList.remove('display_tab');
  }
  activeTab.classList.add('display_tab')
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
    movie.addEventListener('click', ({target}) => {
      getMoviePage(target.alt);
      changePage(target.alt);
    })
  })
}


export const handlePosterClick = () => {
  const posters = document.querySelectorAll('.poster');

  posters.forEach( poster => {
    poster.addEventListener('click', event => {
      console.log(event);
    })
  })
};
  
export const init = () => {
  toggleMenu();
  handleSlideLine();
  handleTabClick();
  updateNav();
  getInitialContent();
}