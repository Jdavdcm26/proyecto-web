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

  const todos = (obtener(CLAVES.USUARIOS) || []).filter((u) => u.id != sesion.id);

  const texto = document.getElementById("buscarUsuario")?.value || "";
  const rol = document.getElementById("filtroRol")?.value || "";
  const usuarios = filtrarUsuarios(todos, texto, rol);

  const vacio = document.getElementById("redVacio");
  vacio.classList.toggle("d-none", usuarios.length > 0);

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
        <div class="d-flex gap-2 mt-auto">
          <button class="btn btn-upc-outline flex-fill" data-verperfil="${u.id}">
            Ver perfil
          </button>
          <button class="btn btn-upc-solid flex-fill" data-conectar="${u.id}">
            Conectar
          </button>
        </div>
      </div>
    </div>`
    )
    .join("");

  contenedor.querySelectorAll("[data-verperfil]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const destino = usuarios.find((u) => u.id == btn.dataset.verperfil);
      if (!destino) return;
      mostrarPerfilUsuario(destino);
    });
  });

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

/* Rellena y muestra el modal con el perfil del usuario seleccionado. */
function mostrarPerfilUsuario(u) {
  document.getElementById("modalPerfilAvatar").textContent = u.iniciales;
  document.getElementById("modalPerfilAvatar").style.background = u.color;
  document.getElementById("modalPerfilNombre").textContent = u.nombre;
  document.getElementById("modalPerfilCarrera").textContent = u.carrera;
  document.getElementById("modalPerfilRol").textContent = u.rol;
  document.getElementById("modalPerfilHabilidades").innerHTML = (u.habilidades || [])
    .map((h) => `<span class="skill-tag">${h}</span>`)
    .join("");

  const modal = new bootstrap.Modal(document.getElementById("modalPerfilUsuario"));
  modal.show();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerPagina()) return;
  renderRed();

  document.getElementById("buscarUsuario")?.addEventListener("input", renderRed);
  document.getElementById("filtroRol")?.addEventListener("change", renderRed);
});