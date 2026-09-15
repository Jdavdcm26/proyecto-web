/* ==================================================
   PORTAFOLIO.JS
   Render de la página Portafolio (pages/portafolio.html)
   Incluye CRUD real: agregar, editar y eliminar
   proyectos propios (persistidos vía storage.js).
   ================================================== */

/* Modal genérico de confirmación: muestra "texto" y, si el
   usuario confirma, ejecuta "callback". */
function confirmarAccion(texto, callback) {
  document.getElementById("modalConfirmarTexto").textContent = texto;
  const modalEl = document.getElementById("modalConfirmar");
  const modal = new bootstrap.Modal(modalEl);
  const boton = document.getElementById("modalConfirmarBoton");

  const manejador = () => {
    callback();
    modal.hide();
    boton.removeEventListener("click", manejador);
  };
  boton.addEventListener("click", manejador);
  modal.show();
}

function renderPortafolio() {
  const contenedor = document.getElementById("portafolioContainer");
  if (!contenedor) return;

  const usuarioActual = usuarioSesion();
  if (!usuarioActual) return;

  const todos = obtener(CLAVES.PORTAFOLIO) || [];

  const texto = document.getElementById("buscarProyecto")?.value || "";
  const proyectos = filtrarProyectos(todos, texto);

  const vacio = document.getElementById("portafolioVacio");
  vacio.classList.toggle("d-none", proyectos.length > 0);

  contenedor.innerHTML = proyectos
    .map((p) => {
      const esPropio = p.autor === usuarioActual.nombre;
      return `
    <div class="col-md-6 col-lg-4">
      <div class="card-upc h-100 overflow-hidden">
        <div class="project-cover" style="background:${p.color}"></div>
        <div class="p-4">
          <h3 class="h6 fw-bold mb-2">${p.nombre}</h3>
          <p class="small text-secondary mb-3">${p.descripcion}</p>
          <div class="d-flex flex-wrap gap-2 mb-3">
            ${p.tecnologias.map((t) => `<span class="skill-tag">${t}</span>`).join("")}
          </div>
          <p class="small text-muted mb-3">Autor: <strong>${p.autor}</strong></p>
          <div class="d-flex gap-2">
            <button class="btn btn-upc-outline flex-fill" data-proyecto="${p.id}">Ver proyecto</button>
            ${esPropio ? `<button class="btn btn-upc-outline" data-editar="${p.id}" title="Editar"><i class="bi bi-pencil"></i></button>` : ""}
            ${esPropio ? `<button class="btn btn-upc-outline" data-eliminar="${p.id}" title="Eliminar"><i class="bi bi-trash"></i></button>` : ""}
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");

  contenedor.querySelectorAll("[data-proyecto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = proyectos.find((pr) => pr.id == btn.dataset.proyecto);
      if (!p) return;
      mostrarDetalleProyecto(p);
    });
  });

  contenedor.querySelectorAll("[data-editar]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = proyectos.find((pr) => pr.id == btn.dataset.editar);
      if (!p) return;
      abrirFormularioProyecto(p);
    });
  });

  contenedor.querySelectorAll("[data-eliminar]").forEach((btn) => {
    btn.addEventListener("click", () => {
      confirmarAccion("¿Seguro que quieres eliminar este proyecto? Esta acción no se puede deshacer.", () => {
        eliminar(CLAVES.PORTAFOLIO, btn.dataset.eliminar);
        mostrarToast("Proyecto eliminado.");
        renderPortafolio();
      });
    });
  });
}

/* Rellena y muestra el modal con la info del proyecto seleccionado (solo lectura). */
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

/* Abre el modal de formulario. Si recibe un proyecto, lo precarga
   (modo edición); si no recibe nada, lo deja vacío (modo agregar). */
function abrirFormularioProyecto(proyecto) {
  const form = document.getElementById("formProyecto");
  form.reset();

  document.getElementById("modalProyectoFormTitulo").textContent = proyecto ? "Editar proyecto" : "Agregar proyecto";
  document.getElementById("proyectoId").value = proyecto ? proyecto.id : "";
  document.getElementById("proyectoNombre").value = proyecto ? proyecto.nombre : "";
  document.getElementById("proyectoDescripcion").value = proyecto ? proyecto.descripcion : "";
  document.getElementById("proyectoTecnologias").value = proyecto ? proyecto.tecnologias.join(", ") : "";
  document.getElementById("proyectoGithub").value = proyecto ? proyecto.enlaceGithub || "" : "";
  document.getElementById("proyectoDemo").value = proyecto ? proyecto.enlaceDemo || "" : "";

  const modal = new bootstrap.Modal(document.getElementById("modalProyectoForm"));
  modal.show();
}

/* Paleta de colores institucionales para asignar a proyectos nuevos
   (rota entre estos, ya que no hay subida real de imágenes). */
const COLORES_PROYECTO = ["#006837", "#174a91", "#8a5c28", "#004D28", "#79b98d"];

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerPagina()) return;
  renderPortafolio();

  document.getElementById("buscarProyecto")?.addEventListener("input", renderPortafolio);

  document.getElementById("btnNuevoProyecto")?.addEventListener("click", () => {
    abrirFormularioProyecto(null);
  });

  document.getElementById("formProyecto")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuarioActual = usuarioSesion();
    if (!usuarioActual) return;

    const id = document.getElementById("proyectoId").value;
    const datos = {
      nombre: document.getElementById("proyectoNombre").value.trim(),
      descripcion: document.getElementById("proyectoDescripcion").value.trim(),
      tecnologias: document
        .getElementById("proyectoTecnologias")
        .value.split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
      enlaceGithub: document.getElementById("proyectoGithub").value.trim(),
      enlaceDemo: document.getElementById("proyectoDemo").value.trim(),
    };

    if (id) {
      actualizar(CLAVES.PORTAFOLIO, id, datos);
      mostrarToast("Proyecto actualizado.");
    } else {
      agregar(CLAVES.PORTAFOLIO, {
        ...datos,
        autor: usuarioActual.nombre,
        color: COLORES_PROYECTO[Math.floor(Math.random() * COLORES_PROYECTO.length)],
      });
      mostrarToast("Proyecto agregado a tu portafolio.");
    }

    bootstrap.Modal.getInstance(document.getElementById("modalProyectoForm")).hide();
    renderPortafolio();
  });
});