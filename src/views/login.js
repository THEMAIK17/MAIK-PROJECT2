export function renderLogin(){
    return `
    <main class="login-container">
        <form id="form-login">
            <h2>Iniciar Sesión</h2>
            <input type="email" id="login-email" placeholder="Correo electrónico" required />
            <input type="password" id="login-password" placeholder="Contraseña" required />
            <button type="submit">Ingresar</button>
            <div class="links">
                <a href="/register" data-link> ¿No tienes cuenta? Regístrate</a>
            </div>

        </form>
    </main>`
}


