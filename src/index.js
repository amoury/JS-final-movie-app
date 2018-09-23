import style from "./main.css";
import { init } from './js/interactions';
import './js/helper';


window.addEventListener('load', init());
window.addEventListener("popstate", () => {
  window.location.reload();
});
