/* ==================================================
   PORTAFOLIO.JS
   Render de la página Portafolio (pages/portafolio.html)
   ================================================== */
function renderPortafolio() {
  const contenedor = document.getElementById("portafolioContainer");
  if (!contenedor) return;

    const todos = obtener(CLAVES.PORTAFOLIO) || [];

  const texto = document.getElementById("buscarProyecto")?.value || "";
  const proyectos = filtrarProyectos(todos, texto);

  const vacio = document.getElementById("portafolioVacio");
  vacio.classList.toggle("d-none", proyectos.length > 0);

  contenedor.innerHTML = proyectos
    .map(
      (p) => `
    <div class="col-md-6 col-lg-4">
      <div class="card-upc h-100 overflow-hidden">
        <div class="project-cover" style="background:${p.color}"></div>
        <div class="p-4">
          <h3 class="h6 fw-bold mb-2">${p.nombre}</h3>
          <p class="small text-secondary mb-3">${p.descripcion}</p>
          <div class="d-flex flex-wrap gap-2 mb-3">
            ${p.tecnologias
              .map((t) => `<span class="skill-tag">${t}</span>`)
              .join("")}
          </div>
          <p class="small text-muted mb-3">Autor: <strong>${p.autor}</strong></p>
          <button class="btn btn-upc-outline w-100" data-proyecto="${p.id}">Ver proyecto</button>
        </div>
      </div>
    </div>`
    )
    .join("");

    contenedor.querySelectorAll("[data-proyecto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = proyectos.find((pr) => pr.id == btn.dataset.proyecto);
      if (!p) return;
      mostrarDetalleProyecto(p);
    });
  });
}

/* Rellena y muestra el modal con la info del proyecto seleccionado. */
function mostrarDetalleProyecto(p) {
  document.getElementById("modalProyectoTitulo").textContent = p.nombre;
  document.getElementById("modalProyectoAutor").textContent = p.autor;
  document.getElementById("modalProyectoDescripcion").textContent = p.descripcion;
  document.getElementById("modalProyectoTecnologias").innerHTML = p.tecnologias
    .map((t) => `<span class="skill-tag">${t}</span>`)
    .join("");

  const modal = new bootstrap.Modal(document.getElementById("modalDetalleProyecto"));
  modal.show();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerPagina()) return;
  renderPortafolio();

  document.getElementById("buscarProyecto")?.addEventListener("input", renderPortafolio);
});