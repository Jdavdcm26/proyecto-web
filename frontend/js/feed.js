/* ==================================================
   FEED.JS
   Render de la página Feed (pages/feed.html)
   Datos persistentes vía storage.js (upc_publicaciones).
   ================================================== */

/* Convierte una fecha ISO real en un texto tipo
   "Hace 5 min" / "Hace 3 h" / "Hace 2 d". Las publicaciones
   semilla (de data.js) no traen fecha real, así que para
   esas se muestra el texto fijo que ya tenían. */
function formatearTiempoRelativo(fechaISO) {
  const diffMs = new Date() - new Date(fechaISO);
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Hace un momento";
  if (diffMin < 60) return `Hace ${diffMin} min`;
  const diffHoras = Math.floor(diffMin / 60);
  if (diffHoras < 24) return `Hace ${diffHoras} h`;
  const diffDias = Math.floor(diffHoras / 24);
  return `Hace ${diffDias} d`;
}

/* Modal genérico de confirmación: muestra "texto" y, si el
   usuario confirma, ejecuta "callback". Reutilizable para
   cualquier acción destructiva (eliminar publicación, etc.). */
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

function renderFeed() {
  const contenedor = document.getElementById("feedContainer");
  if (!contenedor) return;

  const usuarioActual = usuarioSesion();
  if (!usuarioActual) return;

  const pintar = () => {
    const publicaciones = obtener(CLAVES.PUBLICACIONES) || [];
    contenedor.innerHTML = publicaciones
      .map((pub) => {
        const esPropia = pub.usuario === usuarioActual.nombre;
        const fechaMostrada = pub.fechaCreacion
          ? formatearTiempoRelativo(pub.fechaCreacion)
          : pub.fecha;

        return `
      <article class="card-upc p-4 mb-4">
        <div class="d-flex align-items-start gap-3 mb-3">
          <div class="avatar-circle avatar-sm">${pub.iniciales}</div>
          <div class="flex-fill">
            <div class="d-flex justify-content-between">
              <p class="fw-bold mb-0">${pub.usuario}</p>
              <span class="small text-muted">${fechaMostrada}</span>
            </div>
            <p class="small text-muted mb-0">${pub.rol}</p>
          </div>
        </div>
        <p class="mb-3">${pub.contenido}</p>
        <div class="d-flex justify-content-between align-items-center border-top pt-3">
          <div class="d-flex gap-4">
            <button class="btn-like ${pub.likeDado ? "activo" : ""}" data-like="${pub.id}">
              ${pub.likeDado ? "♥ Te gusta" : "♡ Me gusta"} · ${pub.likes}
            </button>
            <button class="btn-comentar" data-comentar="${pub.id}">💬 ${pub.comentarios} comentarios</button>
          </div>
          ${esPropia ? `<button class="btn btn-sm btn-upc-outline" data-eliminar="${pub.id}">Eliminar</button>` : ""}
        </div>
      </article>`;
      })
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
        mostrarToast("La función de comentarios estará disponible cuando se conecte el backend.");
      });
    });

    contenedor.querySelectorAll("[data-eliminar]").forEach((btn) => {
      btn.addEventListener("click", () => {
        confirmarAccion("¿Seguro que quieres eliminar esta publicación? Esta acción no se puede deshacer.", () => {
          eliminar(CLAVES.PUBLICACIONES, btn.dataset.eliminar);
          mostrarToast("Publicación eliminada.");
          pintar();
        });
      });
    });
  };

  pintar();

  const formPublicar = document.getElementById("formPublicar");
  if (formPublicar) {
    formPublicar.addEventListener("submit", (e) => {
      e.preventDefault();
      const texto = document.getElementById("nuevaPublicacion").value.trim();
      if (texto === "") return;
      const publicaciones = obtener(CLAVES.PUBLICACIONES) || [];
      publicaciones.unshift({
        id: Date.now(),
        usuario: usuarioActual.nombre,
        iniciales: usuarioActual.iniciales,
        rol: `${usuarioActual.rol} · ${usuarioActual.carrera}`,
        fechaCreacion: new Date().toISOString(),
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
  if (!protegerPagina()) return;
  renderFeed();
});