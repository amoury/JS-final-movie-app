import style from "./main.css";
import { init } from './js/interactions';



window.addEventListener('load', init());
window.addEventListener("popstate", () => {
  console.log("state popped");
  window.location.reload();
});
