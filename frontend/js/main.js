/* ==================================================
   MAIN.JS
   Inicialización global de UPC Connect.
   Lógica compartida por todas las páginas:
   - marcar el link activo del navbar
   - proteger páginas que requieren sesión
   - botón de cerrar sesión
   El resto de la lógica vive en archivos por
   funcionalidad: auth.js, red.js, feed.js,
   mentores.js, talentMatch.js, oportunidades.js,
   portafolio.js, perfil.js, dashboard.js y utils.js.
   ================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Marca el link activo del navbar según la página actual
  const paginaActual = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link[data-pagina]").forEach((link) => {
    if (link.dataset.pagina === paginaActual) {
      link.classList.add("active");
    }
  });

  // Brand "UPC Connect" dinámico: a feed.html si hay sesión,
  // a la landing si no la hay.
  const enPaginaInterna = window.location.pathname.includes("/pages/");
  const haySesionActiva = typeof haySesion === "function" && haySesion();
  const brand = document.querySelector(".navbar-brand[href]");
  if (brand) {
    brand.setAttribute(
      "href",
      haySesionActiva
        ? enPaginaInterna
          ? "feed.html"
          : "pages/feed.html"
        : enPaginaInterna
          ? "../index.html"
          : "index.html"
    );
  }

  // En la landing sin sesión no hay página interna a la que navegar:
  // se ocultan las opciones internas y quedan solo "Registrarse" e
  // "Iniciar sesión".
  if (!enPaginaInterna && !haySesionActiva) {
    document.querySelector(".navbar-nav")?.classList.add("d-none");
  }

  // Cerrar sesión: borra solo upc_sesion y redirige a login
  const botonSalir = document.getElementById("btnCerrarSesion");
  if (botonSalir) {
    botonSalir.addEventListener("click", (e) => {
      e.preventDefault();
      cerrarSesion();
      window.location.href = "login.html";
    });
  }
});

/* Guard de sesión: las páginas internas la llaman al inicio.
   Si no hay sesión activa, redirige a login y no renderiza. */
function protegerPagina() {
  if (typeof haySesion === "function" && haySesion()) return true;
  window.location.replace("login.html");
  return false;
}