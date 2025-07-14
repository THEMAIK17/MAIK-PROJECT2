export function renderAdmin() {
  return `
    <main class="dashboard-admin">
      <h2>Panel de Administración de Eventos</h2>

      <!-- Formulario para crear o editar eventos -->
      <form id="form-event" class="event-form">
        <input type="hidden" id="event-id" />
        <input type="text" id="event-name" placeholder="Nombre del evento" required />
        <input type="text" id="event-description" placeholder="Descripción" required />
        <input type="date" id="event-date" required />
        <input type="text" id="event-location" placeholder="Lugar" required />
        <input type="number" id="event-capacity" placeholder="Cupos disponibles" required />
        <button type="submit">Guardar evento</button>
        <button type="button" id="cancel-event-form" class="hidden">Cancelar</button>
      </form>

      <!-- Lista de eventos existentes -->
      <section>
        <h3>Eventos registrados</h3>
        <ul id="event-list" class="event-list">
          <!-- Aquí se mostrarán los eventos -->
        </ul>
      </section>

      <button id="logout">Cerrar sesión</button>
    </main>
  `;
}