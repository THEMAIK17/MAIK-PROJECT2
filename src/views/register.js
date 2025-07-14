export function renderRegister(){
    return `
    <main class="register-container">
        <form id="form-register">
            <h2>Crear Cuenta</h2>
            <input type="text" id="register-name" placeholder="Nombre completo" required />
            <input type="text" id="register-username" placeholder="Nombre de usuario" required />
            <input type="email" id="register-email" placeholder="Correo electrónico" required />
            <input type="password" id="register-password" placeholder="Contraseña" required />
            <button type="submit">Registrarse</button>
            <div class="links">
                <a href="/login" data-link> ya tienes cuenta? inicia sesion</a>
            </div>
        </form>
    </main>`
}
