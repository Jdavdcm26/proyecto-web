/* ==================================================
   PERFIL.JS
   Render de la página Perfil (pages/perfil.html)
   ================================================== */
function renderPerfil() {
  const contenedor = document.getElementById("perfilContainer");
  if (!contenedor) return;

  document.getElementById("perfilIniciales").textContent = usuarioActual.iniciales;
  document.getElementById("perfilNombre").textContent = usuarioActual.nombre;
  document.getElementById("perfilRol").textContent = `${usuarioActual.rol} · ${usuarioActual.carrera}`;
  document.getElementById("perfilUniversidad").textContent = usuarioActual.universidad;
  document.getElementById("perfilDescripcion").textContent = usuarioActual.descripcion;

  document.getElementById("perfilHabilidades").innerHTML = usuarioActual.habilidades
    .map((h) => `<span class="skill-tag">${h}</span>`)
    .join("");

  const proyectosDestacados = proyectos.filter((p) =>
    usuarioActual.proyectosDestacados.includes(p.id)
  );
  document.getElementById("perfilProyectos").innerHTML = proyectosDestacados
    .map(
      (p) => `
      <div class="col-md-6">
        <div class="card-upc p-3">
          <h4 class="h6 fw-bold mb-1">${p.nombre}</h4>
          <p class="small text-secondary mb-0">${p.descripcion}</p>
        </div>
      </div>`
    )
    .join("");

  const formEditar = document.getElementById("formEditarPerfil");
  if (formEditar) {
    document.getElementById("editDescripcion").value = usuarioActual.descripcion;
    formEditar.addEventListener("submit", (e) => {
      e.preventDefault();
      usuarioActual.descripcion = document.getElementById("editDescripcion").value.trim();
      renderPerfil();
      const modalEl = document.getElementById("modalEditarPerfil");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();
      mostrarToast("Perfil actualizado (simulado, no se guarda en servidor).");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderPerfil();
});