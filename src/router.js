import { settingsDashboardAdmin } from "./controllers/admin.js"; // import admin controller
import { settingsDashboard } from "./controllers/dashboard.js"; // import dashboard controller
import { settingsLogin } from "./controllers/login.js"; // import login controller
import { settingsRegister } from "./controllers/register.js"; // import register controller
import { render404 } from "./views/404.js"; // import 404 view (not found)
import { renderAdmin } from "./views/admin.js"; // import admin view
import { renderLogin } from "./views/login.js"; // import login view
import { renderRegister } from "./views/register.js"; // import register view

const routes = {
  "/": {
    showView: renderLogin(), // show login page
    afterRender: settingsLogin, // run login logic
    private: false, // not private page
  },
  "/login": {
    showView: renderLogin(), // show login page
    afterRender: settingsLogin, // run login logic
    private: false, // not private page
  },
  "/register": {
    showView: renderRegister(), // show register page
    afterRender: settingsRegister, // run register logic
    private: false, // not private page
  },
  "/dashboard": {
    showView: () => "", // HTML comes later (by role)
    afterRender: settingsDashboard, // run dashboard logic
    private: true, // this is a private page
  },
  "/dashboard/events/create": {
    showView: renderAdmin, // show admin page
    afterRender: settingsDashboardAdmin, // run admin logic
    private: true, // private page
  },
  "/dashboard/events/edit": {
    showView: renderAdmin, // show admin page
    afterRender: settingsDashboardAdmin, // run admin logic
    private: true, // private page
  },  
};

export function router() {
  const path = window.location.pathname || "/"; // get current URL path
  const app = document.getElementById("app"); // get app container
  const currentRoute = routes[path]; // find the route

  if (currentRoute) {
    const user = JSON.parse(localStorage.getItem("currentUser")); // get user from localStorage

    // 🔐 protect private pages
    if (currentRoute.private && !user) {
      history.pushState(null, null, "/login"); // go to login page
      window.dispatchEvent(new Event("popstate")); // reload page
      return;
    }

    // render HTML view
    app.innerHTML =
      typeof currentRoute.showView === "function"
        ? currentRoute.showView() // call the function
        : currentRoute.showView; // or use the string

    // run JS logic
    if (typeof currentRoute.afterRender === "function") {
      currentRoute.afterRender(); // call the function
    }
  } else {
    app.innerHTML = render404(); // show 404 page
  }
}

// SPA navigation
window.addEventListener("popstate", router); // when back or forward
window.addEventListener("load", router); // when page load

// intercept link clicks
document.addEventListener("click", (event) => {
  if (event.target.matches("[data-link]")) { // if link has data-link
    event.preventDefault(); // stop default action
    history.pushState(null, null, event.target.href); // change URL
    router(); // call router
  }
});