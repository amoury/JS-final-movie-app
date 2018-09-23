window.qs = (selector, scope) => {
  return (scope || document).querySelector(selector)
};

window.qsa = (selector, scope) => {
  return (scope || document).querySelectorAll(selector);
}

window.gid = (id, scope) => {
  return (scope || document).getElementById(id);
}

window.$on = function (element, type, callback, useCapture) {
  element.addEventListener(type, callback, !!useCapture);
};

window.addClass = (element, className) => {
  element.classList.add(className)
};

window.removeClass = (element, className) => {
  element.classList.remove(className)
};

// $on('window', 'load', () => console.log('Loading...'))