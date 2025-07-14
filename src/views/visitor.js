export function renderVisitor() {
  return `
    <main class="events-container">
      <h2>Eventos Disponibles</h2>

      <!-- Lista de eventos -->
      <section>
        <ul id="event-list" class="event-list">
          <!-- Aquí se insertarán los eventos disponibles -->
        </ul>
      </section>
          <h3>Mis Inscripciones</h3>
      <section>
        <ul id="my-registrations" class="registration-list">
          <!-- Eventos en los que ya se inscribió -->
        </ul>
      </section>
      <button id="logout">Cerrar sesión</button>
    </main>
  `;
}