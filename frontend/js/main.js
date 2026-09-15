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