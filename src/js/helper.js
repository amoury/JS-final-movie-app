/**
 * Selects HTML Element by CSS Selector
 * @param {String} selector 
 * @param {String} scope 
 */
window.qs = (selector, scope) => {
  return (scope || document).querySelector(selector)
};

window.qsa = (selector, scope) => {
  return (scope || document).querySelectorAll(selector);
}

/**
 * Gets Element(s) by ID
 * @param {String} id 
 * @param {String} scope 
 */
window.gid = (id, scope) => {
  return (scope || document).getElementById(id);
}

/**
 * Adds Event listener to the element
 * @param {HTML element} element 
 * @param {String} type 
 * @param {Function} callback 
 * @param {boolean} useCapture 
 */
window.$on = function (element, type, callback, useCapture) {
  element.addEventListener(type, callback, !!useCapture);
};

/**
 * Adds Classname to the HTML Element
 * @param {HTML element} element 
 * @param {String} className 
 */
window.addClass = (element, className) => {
  element.classList.add(className)
};


/**
 * Removes classname from the HTML Element
 * @param {HTML element} element 
 * @param {String} className 
 */
window.removeClass = (element, className) => {
  element.classList.remove(className)
};