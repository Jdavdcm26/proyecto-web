/* ==================================================
   GITHUBAPI.JS
   Consumo del endpoint público de repositorios de
   GitHub. Demuestra datos externos reales (API) junto
   a los datos propios guardados en localStorage.

   Uso:
     renderizarRepositorios("usuario", "idContenedor")
   Renderiza las tarjetas card-upc dentro del contenedor
   indicado. Los errores (usuario inexistente, sin
   conexión, límite de peticiones) se avisan con el
   mismo sistema de mensajes de la app (mostrarToast).
   ================================================== */

/* Paleta institucional para los encabezados de las
   tarjetas (misma intención que COLORES_PROYECTO). */
const COLORES_GITHUB = ["#006837", "#174a91", "#8a5c28", "#004D28", "#79b98d"];

/* Cache en sessionStorage para no golpear el rate limit
   de la API pública (60 peticiones/hora sin token). */
const CACHE_MINUTOS = 5;

function colorParaNombre(nombre) {
  let acum = 0;
  for (let i = 0; i < nombre.length; i++) {
    acum = (acum + nombre.charCodeAt(i)) % COLORES_GITHUB.length;
  }
  return COLORES_GITHUB[acum];
}

function leerCacheGithub(usuario) {
  try {
    const crudo = sessionStorage.getItem("upc_github_" + usuario);
    if (!crudo) return null;
    const { fecha, datos } = JSON.parse(crudo);
    if (Date.now() - fecha > CACHE_MINUTOS * 60 * 1000) return null;
    return datos;
  } catch {
    return null;
  }
}

function escribirCacheGithub(usuario, datos) {
  try {
    sessionStorage.setItem(
      "upc_github_" + usuario,
      JSON.stringify({ fecha: Date.now(), datos })
    );
  } catch {
    /* Si sessionStorage falla, se ignora: se vuelve a la API. */
  }
}

/* Devuelve { ok: true, repos: [...] } o { ok: false, error: "..." }.
   Nunca lanza excepción: los fallos se normalizan para no
   romper la página. */
async function obtenerRepositoriosGithub(usuario) {
  const cache = leerCacheGithub(usuario);
  if (cache) return { ok: true, repos: cache };

  try {
    const respuesta = await fetch(
      `https://api.github.com/users/${encodeURIComponent(usuario)}/repos?sort=updated&per_page=10`
    );

    if (respuesta.status === 403) {
      return {
        ok: false,
        error: "Se alcanzó el límite de peticiones a GitHub. Intenta de nuevo en unos minutos.",
      };
    }
    if (respuesta.status === 404) {
      return {
        ok: false,
        error: `No encontramos el usuario de GitHub "${usuario}". Revisa que el nombre esté bien escrito.`,
      };
    }
    if (!respuesta.ok) {
      return { ok: false, error: "GitHub no respondió como se esperaba. Intenta de nuevo más tarde." };
    }

    const repos = await respuesta.json();
    escribirCacheGithub(usuario, repos);
    return { ok: true, repos };
  } catch {
    return {
      ok: false,
      error: "No hay conexión a internet o GitHub no está disponible. Revisa tu conexión e inténtalo de nuevo.",
    };
  }
}

function plantillaRepo(repo) {
  const lenguaje = repo.language
    ? `<span class="skill-tag">${repo.language}</span>`
    : "";
  const estrellas =
    repo.stargazers_count > 0 && repo.stargazers_count <= 9999
      ? `<span class="skill-tag"><i class="bi bi-star-fill"></i> ${repo.stargazers_count}</span>`
      : "";
  return `
  <div class="col-md-6 col-lg-4">
    <div class="card-upc h-100 overflow-hidden">
      <div class="project-cover" style="background:${colorParaNombre(repo.name)}"></div>
      <div class="p-4">
        <h3 class="h6 fw-bold mb-2">${repo.name}</h3>
        <p class="small text-secondary mb-3">${repo.description || "Sin descripción."}</p>
        <div class="d-flex flex-wrap gap-2 mb-3">
          ${lenguaje}${estrellas}
        </div>
        <a class="btn btn-upc-outline flex-fill" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          Ver en GitHub <i class="bi bi-box-arrow-up-right"></i>
        </a>
      </div>
    </div>
  </div>`;
}

function plantillaSinRepos() {
  return `
  <div class="col-12">
    <p class="text-muted text-center mt-2">Este usuario no tiene repositorios públicos en GitHub.</p>
  </div>`;
}

function plantillaCargando() {
  return `
  <div class="col-12 text-center py-4">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Cargando repositorios...</span>
    </div>
  </div>`;
}

/* Muestra los repos de GitHub del usuario en el contenedor
   indicado por su id. Si "usuario" está vacío, muestra un
   aviso para que complete su perfil. */
function renderizarRepositorios(usuario, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  if (!usuario) {
    contenedor.innerHTML = `
      <div class="col-12">
        <p class="text-muted text-center mt-2">
          Agrega tu usuario de GitHub en tu perfil para mostrar tus repositorios aquí.
        </p>
      </div>`;
    return;
  }

  contenedor.innerHTML = plantillaCargando();

  obtenerRepositoriosGithub(usuario).then((resultado) => {
    if (!resultado.ok) {
      mostrarToast(resultado.error);
      contenedor.innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger mb-0">${resultado.error}</div>
        </div>`;
      return;
    }

    const repos = resultado.repos || [];
    contenedor.innerHTML = repos.length
      ? repos.map(plantillaRepo).join("")
      : plantillaSinRepos();
  });
}