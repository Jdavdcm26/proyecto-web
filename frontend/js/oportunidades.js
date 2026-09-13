/* ==================================================
   OPORTUNIDADES.JS
   Lógica de la pantalla de Oportunidades (bolsa de
   prácticas/empleos + UPC Talent Match).
   Responsable: Mario (Bloque D)
   ================================================== */

/* --------------------------------------------------
   TEMPORAL: UPC Talent Match
   Esto debería vivir en js/talentMatch.js (tarea FED-002,
   responsable José). Como todavía no existe ese archivo,
   lo dejamos aquí para poder probar Oportunidades de forma
   independiente. Quitar de aquí en cuanto José suba
   talentMatch.js, y agregar <script src="../js/talentMatch.js">
   ANTES de este script en oportunidades.html.
   -------------------------------------------------- */
function calcularCompatibilidad(habilidadesUsuario, habilidadesRequeridas) {
  const usuarioNormalizado = habilidadesUsuario.map((h) => h.toLowerCase());
  const coincidencias = habilidadesRequeridas.filter((req) =>
    usuarioNormalizado.includes(req.toLowerCase())
  );
  const porcentaje = Math.round(
    (coincidencias.length / habilidadesRequeridas.length) * 100
  );
  return porcentaje;
}

function colorCompatibilidad(porcentaje) {
  if (porcentaje >= 70) return "match-alto";
  if (porcentaje >= 40) return "match-medio";
  return "match-bajo";
}

/* --------------------------------------------------
   RENDER: PÁGINA OPORTUNIDADES (pages/oportunidades.html)
   -------------------------------------------------- */
function renderOportunidades() {
  const contenedor = document.getElementById("oportunidadesContainer");
  if (!contenedor) return;

  contenedor.innerHTML = oportunidades
    .map((op) => {
      const compatibilidad = calcularCompatibilidad(
        usuarioActual.habilidades,
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
      btn.textContent = "¡Postulación enviada!";
      btn.disabled = true;
      btn.classList.remove("btn-upc-solid");
      btn.classList.add("btn-upc-outline");
    });
  });

  contenedor.querySelectorAll("[data-ver]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const op = oportunidades.find((o) => o.id == btn.dataset.ver);
      mostrarDetalleOportunidad(op);
    });
  });
}

/* Muestra el detalle de una oportunidad. Usa un modal de
   Bootstrap si existe uno en la página (#modalDetalleOportunidad);
   si no, usa alert() como respaldo temporal.
   NOTA DoD: el plan pide nunca usar alert() nativo para esto —
   hay que agregar el modal en oportunidades.html cuando se defina
   el componente de modal del Design System (tarea de José). */
function mostrarDetalleOportunidad(op) {
  alert(`${op.titulo}\n${op.empresa} · ${op.modalidad}\n\n${op.descripcion}`);
}

document.addEventListener("DOMContentLoaded", () => {
  renderOportunidades();
});