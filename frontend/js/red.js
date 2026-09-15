/* ==================================================
   RED.JS
   Render de la página Mi Red (pages/red.html)
   Usuarios desde upc_usuarios; conexiones se
   persisten vía storage.js (upc_conexiones).
   ================================================== */
function renderRed() {
  const contenedor = document.getElementById("redContainer");
  if (!contenedor) return;

  const sesion = usuarioSesion();
  if (!sesion) return;

  const usuarios = (obtener(CLAVES.USUARIOS) || []).filter((u) => u.id != sesion.id);

  contenedor.innerHTML = usuarios
    .map(
      (u) => `
    <div class="col-md-6 col-lg-4">
      <div class="card-upc h-100 p-4 text-center">
        <div class="avatar-circle mx-auto mb-3" style="background:${u.color}">${u.iniciales}</div>
        <h3 class="h6 fw-bold mb-1">${u.nombre}</h3>
        <p class="text-muted small mb-1">${u.carrera}</p>
        <span class="badge-upc mb-3">${u.rol}</span>
        <div class="d-flex flex-wrap justify-content-center gap-2 mb-4">
          ${(u.habilidades || [])
            .map((h) => `<span class="skill-tag">${h}</span>`)
            .join("")}
        </div>
        <button class="btn btn-upc-outline w-100 mt-auto" data-conectar="${u.id}">
          Conectar
        </button>
      </div>
    </div>`
    )
    .join("");

  contenedor.querySelectorAll("[data-conectar]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const destinoId = Number(btn.dataset.conectar);
      const destino = usuarios.find((u) => u.id === destinoId);
      if (!destino) return;
      agregar(CLAVES.CONEXIONES, {
        usuarioOrigenId: sesion.id,
        usuarioDestinoId: destinoId,
        nombreDestino: destino.nombre,
        estado: "pendiente",
        fecha: new Date().toISOString(),
      });
      btn.textContent = "Solicitud enviada";
      btn.classList.remove("btn-upc-outline");
      btn.classList.add("btn-upc-solid");
      btn.disabled = true;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerPagina()) return;
  renderRed();
});