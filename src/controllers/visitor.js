import { endpointEvents, endpointRegistrations } from "../services/api.js"; // import API URLs

export async function settingsDashboardVisitor() {
  const user = JSON.parse(localStorage.getItem("currentUser")); // get user from localStorage

  if (!user || user.rolId !== 2) { // if no user or user is not visitor
    location.href = "/login"; // go to login page
    return;
  }

  const container = document.getElementById("event-list"); // list of events
  const logoutBtn = document.getElementById("logout"); // logout button

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser"); // remove user from storage
    history.pushState(null, null, "/login"); // go to login
    window.dispatchEvent(new Event("popstate")); // reload page
  });

  try {
    const res = await fetch(endpointEvents); // get events from API
    const events = await res.json(); // convert to JSON

    const resRegistrations = await fetch(endpointRegistrations); // get registrations
    const registrations = await resRegistrations.json(); // convert to JSON

    container.innerHTML = ""; // clear list

    if (events.length === 0) {
      container.innerHTML = "<p>No hay eventos disponibles en este momento.</p>"; // no events
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
        <button class="btn-register" data-id="${event.id}">Registrarse</button>
        <hr>
      `;
      container.appendChild(li); // add to page
    });

    // 👉 show my registrations
    const myRegistrations = registrations.filter(r => r.visitorId == user.id); // only my events
    const myList = document.getElementById("my-registrations"); // list container
    myList.innerHTML = ""; // clear list

    if (myRegistrations.length === 0) {
      myList.innerHTML = "<li>No estás inscrito en ningún evento.</li>"; // no events
    } else {
      for (const reg of myRegistrations) {
        const event = events.find(ev => ev.id == reg.eventId); // find event info
        if (event) {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>${event.name}</strong><br>
            Fecha: ${event.date}<br>
            Lugar: ${event.location}<br>
            Inscrito el: ${reg.date}
            <hr>
          `;
          myList.appendChild(li); // add to my list
        }
      }
    }

    // ✅ register to event
    container.onclick = async (e) => {
      if (!e.target.matches(".btn-register")) return; // if not a button

      const eventId = parseInt(e.target.dataset.id); // get event ID

      // check if already registered
      const yaRegistrado = registrations.some(
        (r) => parseInt(r.eventId) === eventId && r.visitorId === user.id
      );

      if (yaRegistrado) {
        alert("Ya estás inscrito en este evento."); // show alert
        return;
      }

      // check capacity
      const evento = events.find(ev => parseInt(ev.id) === eventId);
      const inscritos = registrations.filter(r => parseInt(r.eventId) === eventId).length;

      if (inscritos >= evento.capacity) {
        alert("Este evento ya no tiene cupos disponibles."); // no seats
        return;
      }

      // make registration
      const registration = {
        eventId: eventId,
        visitorId: user.id,
        date: new Date().toISOString().split("T")[0] // today date
      };

      try {
        const res = await fetch(endpointRegistrations, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registration)
        });

        if (res.ok) {
          alert("Registro exitoso al evento."); // success
          settingsDashboardVisitor(); // reload dashboard
        } else {
          alert("No se pudo registrar al evento."); // fail
        }
      } catch (error) {
        console.error("Error al registrarse:", error); // show error
        alert("Ocurrió un error."); // alert
      }
    };

  } catch (error) {
    console.error("Error al cargar eventos:", error); // show error
    container.innerHTML = "<p>Error al mostrar los eventos.</p>"; // error message
  }
}