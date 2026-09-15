/* ==================================================
   STORAGE.JS
   Capa de persistencia local de UPC Connect.
   Fuente de verdad de la app: localStorage con
   fallback en memoria para sesiones donde
   localStorage no esté disponible.
   data.js pasa a ser solo la semilla inicial.
   ================================================== */

const VERSION_ACTUAL = 3;
const PREFIJO = "upc_";

/* Claves namespaced para no chocar con otras apps
   del mismo dominio (localhost). */
const CLAVES = {
  USUARIOS: "upc_usuarios",
  SESION: "upc_sesion",
  PUBLICACIONES: "upc_publicaciones",
  CONEXIONES: "upc_conexiones",
  POSTULACIONES: "upc_postulaciones",
  PORTAFOLIO: "upc_portafolio",
  MENTORIAS: "upc_mentorias",
  VERSION: "upc_version",
};

/* Fallback en memoria: si localStorage no existe o
   falla, la app sigue funcionando durante la sesión. */
let memoria = new Map();
let almacenamientoDisponible = true;

function probarDisponibilidad() {
  try {
    const clavePrueba = PREFIJO + "test";
    window.localStorage.setItem(clavePrueba, "1");
    window.localStorage.removeItem(clavePrueba);
    return true;
  } catch {
    return false;
  }
}

function avisarError(mensaje) {
  try {
    if (typeof mostrarToast === "function") {
      mostrarToast(mensaje);
      return;
    }
  } catch {
    /* ignora y cae al alert */
  }
  alert(mensaje);
}

function leer(clave) {
  if (!almacenamientoDisponible) {
    return memoria.has(clave) ? memoria.get(clave) : null;
  }
  try {
    const crudo = window.localStorage.getItem(clave);
    if (!crudo) {
      return memoria.has(clave) ? memoria.get(clave) : null;
    }
    return JSON.parse(crudo);
  } catch (e) {
    /* Si el acceso a localStorage falla a mitad de la sesión,
       degradamos a memoria para no romper la app. */
    if (!memoria.has(clave)) {
      avisarError("No se pudo leer la información guardada; se usará solo la de esta sesión.");
    }
    return memoria.has(clave) ? memoria.get(clave) : null;
  }
}

function escribir(clave, valor) {
  memoria.set(clave, valor);
  if (!almacenamientoDisponible) return;
  try {
    window.localStorage.setItem(clave, JSON.stringify(valor));
  } catch (e) {
    almacenamientoDisponible = false;
    avisarError(
      "No se pudo guardar la información: se mantendrá solo en memoria durante esta sesión."
    );
  }
}

/* --------------------------------------------------
   Datos iniciales: semilla desde data.js.
   (data.js ya no es la fuente de verdad, solo la
   semilla que se copia a storage la primera vez.)
   -------------------------------------------------- */
function construirDatosIniciales() {
  const usuarioDemo = semillaUsuarios.find((u) => u.id === 0);
  return {
    [CLAVES.USUARIOS]: semillaUsuarios,
    [CLAVES.SESION]: usuarioDemo ? usuarioDemo.id : null,
    [CLAVES.PUBLICACIONES]: semillaPublicaciones,
    [CLAVES.CONEXIONES]: [],
    [CLAVES.POSTULACIONES]: [],
    [CLAVES.PORTAFOLIO]: semillaProyectos,
    [CLAVES.MENTORIAS]: [],
  };
}

function inicializarDatos() {
  almacenamientoDisponible = probarDisponibilidad();
  if (leer(CLAVES.VERSION) === VERSION_ACTUAL) return;

  const datos = construirDatosIniciales();
  Object.entries(datos).forEach(([clave, valor]) => {
    escribir(clave, valor);
  });
  escribir(CLAVES.VERSION, VERSION_ACTUAL);
}

/* Reinicia todas las claves upc_* y vuelve a sembrar
   desde data.js. Útil para QA y para grabar capturas
   sin datos "sucios" de pruebas anteriores. */
function reiniciarDatos() {
  if (almacenamientoDisponible) {
    try {
      Object.keys(window.localStorage).forEach((clave) => {
        if (clave.startsWith(PREFIJO)) {
          window.localStorage.removeItem(clave);
        }
      });
    } catch (e) {
      avisarError("No se pudo reiniciar la información local.");
    }
  }
  memoria.clear();
  inicializarDatos();
}

/* --------------------------------------------------
   API genérica
   -------------------------------------------------- */
function obtener(clave) {
  return leer(clave);
}

function guardar(clave, valor) {
  escribir(clave, valor);
}

/* Agrega un ítem a la lista que guarda `clave`.
   Genera el `id` con Date.now() si no viene. */
function agregar(clave, item) {
  const lista = leer(clave) || [];
  const nuevo = { ...item };
  if (nuevo.id === undefined || nuevo.id === null) {
    nuevo.id = Date.now();
  }
  lista.push(nuevo);
  escribir(clave, lista);
  return nuevo;
}

function actualizar(clave, id, cambios) {
  const lista = leer(clave) || [];
  const indice = lista.findIndex((item) => item.id == id);
  if (indice === -1) return false;
  lista[indice] = { ...lista[indice], ...cambios };
  escribir(clave, lista);
  return true;
}

function eliminar(clave, id) {
  const lista = leer(clave) || [];
  escribir(
    clave,
    lista.filter((item) => item.id != id)
  );
}

/* --------------------------------------------------
   Sesión activa
   -------------------------------------------------- */
function guardarSesion(idUsuario) {
  escribir(CLAVES.SESION, idUsuario);
}

function haySesion() {
  const id = leer(CLAVES.SESION);
  return id !== null && id !== undefined && id !== "";
}

/* Devuelve el objeto completo del usuario logueado
   (dentro de upc_usuarios) o null si no hay sesión. */
function usuarioSesion() {
  const id = leer(CLAVES.SESION);
  const lista = leer(CLAVES.USUARIOS) || [];
  return lista.find((usuario) => usuario.id == id) || null;
}

/* Cerrar sesión borra SOLO upc_sesion, nunca el resto
   de los datos. */
function cerrarSesion() {
  guardarSesion(null);
}

/* Se siembran los datos al cargar la app. */
inicializarDatos();