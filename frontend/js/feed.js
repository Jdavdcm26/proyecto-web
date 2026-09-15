/* ==================================================
   FEED.JS
   Render de la página Feed (pages/feed.html)
   Datos persistentes vía storage.js (upc_publicaciones).
   ================================================== */
function renderFeed() {
  const contenedor = document.getElementById("feedContainer");
  if (!contenedor) return;

  const pintar = () => {
    const publicaciones = obtener(CLAVES.PUBLICACIONES) || [];
    contenedor.innerHTML = publicaciones
      .map(
        (pub) => `
      <article class="card-upc p-4 mb-4">
        <div class="d-flex align-items-start gap-3 mb-3">
          <div class="avatar-circle avatar-sm">${pub.iniciales}</div>
          <div class="flex-fill">
            <div class="d-flex justify-content-between">
              <p class="fw-bold mb-0">${pub.usuario}</p>
              <span class="small text-muted">${pub.fecha}</span>
            </div>
            <p class="small text-muted mb-0">${pub.rol}</p>
          </div>
        </div>
        <p class="mb-3">${pub.contenido}</p>
        <div class="d-flex gap-4 border-top pt-3">
          <button class="btn-like ${pub.likeDado ? "activo" : ""}" data-like="${pub.id}">
            ${pub.likeDado ? "♥ Te gusta" : "♡ Me gusta"} · ${pub.likes}
          </button>
          <button class="btn-comentar" data-comentar="${pub.id}">💬 ${pub.comentarios} comentarios</button>
        </div>
      </article>`
      )
      .join("");

    contenedor.querySelectorAll("[data-like]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const publicaciones = obtener(CLAVES.PUBLICACIONES) || [];
        const pub = publicaciones.find((p) => p.id == btn.dataset.like);
        if (!pub) return;
        const likeDado = !pub.likeDado;
        const likes = pub.likes + (likeDado ? 1 : -1);
        actualizar(CLAVES.PUBLICACIONES, pub.id, { likeDado, likes });
        pintar();
      });
    });

    contenedor.querySelectorAll("[data-comentar]").forEach((btn) => {
      btn.addEventListener("click", () => {
        alert("La función de comentarios estará disponible cuando se conecte el backend.");
      });
    });
  };

  pintar();

  const formPublicar = document.getElementById("formPublicar");
  if (formPublicar) {
    formPublicar.addEventListener("submit", (e) => {
      e.preventDefault();
      const usuario = usuarioSesion();
      if (!usuario) return;
      const texto = document.getElementById("nuevaPublicacion").value.trim();
      if (texto === "") return;
      const publicaciones = obtener(CLAVES.PUBLICACIONES) || [];
      publicaciones.unshift({
        id: Date.now(),
        usuario: usuario.nombre,
        iniciales: usuario.iniciales,
        rol: `${usuario.rol} · ${usuario.carrera}`,
        fecha: "Ahora mismo",
        contenido: texto,
        likes: 0,
        likeDado: false,
        comentarios: 0,
      });
      guardar(CLAVES.PUBLICACIONES, publicaciones);
      formPublicar.reset();
      pintar();
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeed();
});