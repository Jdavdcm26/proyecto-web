/* calcularCompatibilidad() y colorCompatibilidad() ahora
   viven en js/talentMatch.js (tarea de José, FED-002). */

/* --------------------------------------------------
   RENDER: PÁGINA OPORTUNIDADES (pages/oportunidades.html)
   -------------------------------------------------- */
function renderOportunidades() {
  const contenedor = document.getElementById("oportunidadesContainer");
  if (!contenedor) return;

  const usuario = usuarioSesion();
  if (!usuario) return;

  contenedor.innerHTML = oportunidades
    .map((op) => {
      const compatibilidad = calcularCompatibilidad(
        usuario.habilidades || [],
        op.habilidadesRequeridas
      );
      const claseColor = colorCompatibilidad(compatibilidad);

      return `
      <div class="col-md-6">
        <div class="card-upc h-100 p-4">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h3 class="h6 fw-bold mb-0">${op.titulo}</h3>
            <span class="match-badge ${claseColor}">${compatibilidad}% Compatible</span>
          </div>
          <p class="text-upc fw-semibold small mb-1">${op.empresa}</p>
          <p class="text-muted small mb-2">${op.modalidad}</p>
          <p class="small text-secondary mb-3">${op.descripcion}</p>

          <p class="small fw-bold mb-1">Habilidades requeridas:</p>
          <div class="d-flex flex-wrap gap-2 mb-3">
            ${op.habilidadesRequeridas
              .map((h) => `<span class="skill-tag">${h}</span>`)
              .join("")}
          </div>

          <div class="progress-upc mb-3">
            <div class="progress-upc-bar ${claseColor}" style="width:${compatibilidad}%"></div>
          </div>

          <div class="d-flex gap-2 mt-auto">
            <button class="btn btn-upc-outline flex-fill" data-ver="${op.id}">Ver detalles</button>
            <button class="btn btn-upc-solid flex-fill" data-postular="${op.id}">Postularme</button>
          </div>
        </div>
      </div>`;
    })
    .join("");

   contenedor.querySelectorAll("[data-postular]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const op = oportunidades.find((o) => o.id == btn.dataset.postular);
      if (!op) return;
      const usuario = usuarioSesion();
      if (!usuario) return;
      agregar(CLAVES.POSTULACIONES, {
        oportunidadId: op.id,
        titulo: op.titulo,
        empresa: op.empresa,
        fecha: new Date().toISOString(),
      });
      btn.textContent = "¡Postulación enviada!";
      btn.disabled = true;
      btn.classList.remove("btn-upc-solid");
      btn.classList.add("btn-upc-outline");
      mostrarToast("Tu postulación fue enviada y guardada.");
    });
  });

  contenedor.querySelectorAll("[data-ver]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const op = oportunidades.find((o) => o.id == btn.dataset.ver);
      mostrarDetalleOportunidad(op);
    });
  });
}


function mostrarDetalleOportunidad(op) {
  document.getElementById("modalDetalleTitulo").textContent = op.titulo;
  document.getElementById("modalDetalleEmpresa").textContent = op.empresa;
  document.getElementById("modalDetalleModalidad").textContent = op.modalidad;
  document.getElementById("modalDetalleDescripcion").textContent = op.descripcion;

  const modal = new bootstrap.Modal(document.getElementById("modalDetalleOportunidad"));
  modal.show();
}

document.addEventListener("DOMContentLoaded", () => {
  renderOportunidades();
});