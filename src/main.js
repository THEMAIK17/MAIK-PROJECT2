import { router } from "./router"; // import router function

// when user clicks back or forward
window.addEventListener(`popstate`, router);

// when page load for the first time
window.addEventListener(`load`, router);

document.addEventListener('click', function(event) {
    // if user clicks a link with data-link
    if (event.target.matches(`[data-link]`)) {
        event.preventDefault(); // stop normal link
        history.pushState(null, null, event.target.href); // change URL
        router(); // run router function
    }
});