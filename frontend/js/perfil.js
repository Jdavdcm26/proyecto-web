/* ==================================================
   PERFIL.JS
   Render de la página Perfil (pages/perfil.html)
   Los datos vienen de la sesión activa (upc_usuarios)
   y las ediciones se persisten vía storage.js.
   ================================================== */
function renderPerfil() {
  const contenedor = document.getElementById("perfilContainer");
  if (!contenedor) return;

  const usuario = usuarioSesion();
  if (!usuario) return;

  document.getElementById("perfilIniciales").textContent = usuario.iniciales;
  document.getElementById("perfilNombre").textContent = usuario.nombre;
  document.getElementById("perfilRol").textContent = `${usuario.rol} · ${usuario.carrera}`;
  document.getElementById("perfilUniversidad").textContent = usuario.universidad;
  document.getElementById("perfilDescripcion").textContent = usuario.descripcion;

  document.getElementById("perfilHabilidades").innerHTML = (usuario.habilidades || [])
    .map((h) => `<span class="skill-tag">${h}</span>`)
    .join("");

  const proyectos = obtener(CLAVES.PORTAFOLIO) || [];
  const destacados = proyectos.filter((p) =>
    (usuario.proyectosDestacados || []).includes(p.id)
  );
  document.getElementById("perfilProyectos").innerHTML = destacados
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
    document.getElementById("editDescripcion").value = usuario.descripcion;
    document.getElementById("editGithubUser").value = usuario.githubUser || "";
    formEditar.addEventListener("submit", (e) => {
      e.preventDefault();
      const nuevaDescripcion = document.getElementById("editDescripcion").value.trim();
      const nuevoGithub = document.getElementById("editGithubUser").value.trim();
      actualizar(CLAVES.USUARIOS, usuario.id, { descripcion: nuevaDescripcion, githubUser: nuevoGithub });
      renderPerfil();
      const modalEl = document.getElementById("modalEditarPerfil");
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      }
      mostrarToast("Perfil actualizado y guardado en este navegador.");
    });
  }

  renderizarRepositorios(usuario.githubUser, "perfilGithubRepos");
}

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerPagina()) return;
  renderPerfil();
});