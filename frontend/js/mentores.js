/* ==================================================
   MENTORES.JS
   Render de la página Mentorías (pages/mentorias.html)
   ================================================== */
function renderMentores() {
  const contenedor = document.getElementById("mentoresContainer");
  if (!contenedor) return;

  contenedor.innerHTML = mentores
    .map(
      (m) => `
    <div class="col-md-6 col-lg-4">
      <div class="card-upc h-100 p-4 text-center">
        <div class="avatar-circle mx-auto mb-3">${m.iniciales}</div>
        <h3 class="h6 fw-bold mb-1">${m.nombre}</h3>
        <p class="text-upc small fw-semibold mb-1">${m.profesion}</p>
        <p class="text-muted small mb-2">${m.area}</p>
        <p class="small text-secondary mb-3">${m.descripcion}</p>
        <div class="d-flex flex-wrap justify-content-center gap-2 mb-4">
          ${m.especialidades
            .map((e) => `<span class="skill-tag">${e}</span>`)
            .join("")}
        </div>
        <button class="btn btn-upc-solid w-100 mt-auto" data-mentoria="${m.id}">
          Solicitar mentoría
        </button>
      </div>
    </div>`
    )
    .join("");

  contenedor.querySelectorAll("[data-mentoria]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const m = mentores.find((me) => me.id == btn.dataset.mentoria);
      if (!m) return;
      const usuario = usuarioSesion();
      if (!usuario) return;
      agregar(CLAVES.MENTORIAS, {
        mentorId: m.id,
        nombre: m.nombre,
        area: m.area,
        profesion: m.profesion,
        solicitadoPor: usuario.nombre,
        fecha: new Date().toISOString(),
      });
      btn.textContent = "Solicitud enviada ✓";
      btn.disabled = true;
      btn.classList.remove("btn-upc-solid");
      btn.classList.add("btn-upc-outline");
      mostrarToast(`Tu solicitud de mentoría con ${m.nombre} fue enviada y guardada.`);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerPagina()) return;
  renderMentores();
});