/* ==================================================
   MAIN.JS
   Inicialización global de UPC Connect.
   Solo contiene la lógica compartida por todas las
   páginas (marcar el link activo del navbar). El resto
   de la lógica vive en archivos por funcionalidad:
   auth.js, red.js, feed.js, mentores.js, talentMatch.js,
   oportunidades.js, portafolio.js, perfil.js,
   dashboard.js y utils.js.
   ================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Marca el link activo del navbar según la página actual
  const paginaActual = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link[data-pagina]").forEach((link) => {
    if (link.dataset.pagina === paginaActual) {
      link.classList.add("active");
    }
  });
});