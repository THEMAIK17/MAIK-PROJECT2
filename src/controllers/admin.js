import { endpointEvents } from "../services/api.js"; // import events URL

export async function settingsDashboardAdmin() {
  const user = JSON.parse(localStorage.getItem("currentUser")); // get user from storage

  if (!user || user.rolId !== 1) { // if no user or not admin
    location.href = "/login"; // go to login page
    return;
  }

  const container = document.getElementById("event-list"); // container for events
  const logoutBtn = document.getElementById("logout"); // logout button
  const form = document.getElementById("form-event"); // event form
  const cancelBtn = document.getElementById("cancel-event-form"); // cancel button

  // logout user
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser"); // remove user from storage
    history.pushState(null, null, "/login"); // go to login
    window.dispatchEvent(new Event("popstate")); // reload page
  });

  // load all events
  async function loadEvents() {
    try {
      const res = await fetch(endpointEvents); // get events
      const events = await res.json(); // convert to JSON

      container.innerHTML = ""; // clear list

      if (events.length === 0) {
        container.innerHTML = "<p>No hay eventos registrados.</p>"; // no events
        return;
      }

      events.forEach((event) => {
        const li = document.createElement("li"); // create list item
        li.innerHTML = `
          <strong>${event.name}</strong><br>
          Descripción: ${event.description}<br>
          Fecha: ${event.date}<br>
          Lugar: ${event.location}<br>
          Cupos disponibles: ${event.capacity ?? "Sin definir"}<br>
          <button class="edit-btn" data-id="${event.id}">Editar</button>
          <button class="delete-btn" data-id="${event.id}">Eliminar</button>
          <hr>
        `;
        container.appendChild(li); // add to container
      });
    } catch (error) {
      console.error("Error al cargar eventos:", error); // show error
      container.innerHTML = "<p>Error al cargar los eventos.</p>"; // show message
    }
  }

  loadEvents(); // load when page starts

  // create or update event
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop form

    const eventId = document.getElementById("event-id").value; // get ID
    const name = document.getElementById("event-name").value; // get name
    const description = document.getElementById("event-description").value; // get description
    const date = document.getElementById("event-date").value; // get date
    const location = document.getElementById("event-location").value; // get location
    const capacity = parseInt(document.getElementById("event-capacity").value); // get capacity
    const newEvent = { name, description, date, location, capacity }; // create object

    try {
      if (eventId) {
        // update event
        await fetch(`${endpointEvents}/${eventId}`, {
          method: "PUT", // update method
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        });
      } else {
        // create new event
        await fetch(endpointEvents, {
          method: "POST", // create method
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        });
      }

      form.reset(); // clean form
      cancelBtn.classList.add("hidden"); // hide cancel button
      loadEvents(); // reload event list
    } catch (error) {
      console.error("Error al guardar el evento:", error); // show error
    }
  });

  // cancel editing
  cancelBtn.addEventListener("click", () => {
    form.reset(); // clean form
    document.getElementById("event-id").value = ""; // clear ID
    cancelBtn.classList.add("hidden"); // hide button
  });

  // handle edit and delete buttons
  container.addEventListener("click", async (e) => {
    const id = e.target.dataset.id; // get event ID

    if (e.target.classList.contains("edit-btn")) {
      try {
        const res = await fetch(`${endpointEvents}/${id}`); // get event
        const event = await res.json(); // convert to JSON

        // fill form with event data
        document.getElementById("event-id").value = event.id;
        document.getElementById("event-name").value = event.name;
        document.getElementById("event-description").value = event.description;
        document.getElementById("event-date").value = event.date;
        document.getElementById("event-location").value = event.location;
        document.getElementById("event-capacity").value = event.capacity;
        cancelBtn.classList.remove("hidden"); // show cancel button
      } catch (error) {
        console.error("Error al editar:", error); // show error
      }
    }

    if (e.target.classList.contains("delete-btn")) {
      try {
        await fetch(`${endpointEvents}/${id}`, { method: "DELETE" }); // delete event
        loadEvents(); // reload list
      } catch (error) {
        console.error("Error al eliminar:", error); // show error
      }
    }
  });
}