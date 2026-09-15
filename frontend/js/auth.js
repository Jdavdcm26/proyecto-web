/* ==================================================
   AUTH.JS
   Lógica de Login y Registro contra upc_usuarios
   (persistencia local vía storage.js).
   Responsable: Mario (Bloque A)
   ================================================== */

function mostrarMensaje(elementoId, texto, esError) {
  const mensaje = document.getElementById(elementoId);
  mensaje.classList.remove("d-none", "alert-success", "alert-danger");
  mensaje.classList.add(esError ? "alert-danger" : "alert-success");
  mensaje.textContent = texto;
}

function inicialesDesdeNombre(nombre) {
  return nombre
    .trim()
    .split(/\s+/)
    .filter((p) => /^[A-Za-zÁÉÍÓÚáéíóúÑñ]/.test(p))
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function rolDesdeTipo(tipo) {
  const roles = {
    estudiante: "Estudiante",
    egresado: "Egresado",
    docente: "Docente",
    empresa: "Empresa",
  };
  return roles[tipo] || "Estudiante";
}

function inicializarLogin() {
  const form = document.getElementById("formLogin");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const correo = document.getElementById("loginCorreo");
    const clave = document.getElementById("loginClave");
    let valido = true;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
      correo.classList.add("is-invalid");
      valido = false;
    } else {
      correo.classList.remove("is-invalid");
    }

    if (clave.value.trim().length < 6) {
      clave.classList.add("is-invalid");
      valido = false;
    } else {
      clave.classList.remove("is-invalid");
    }

    if (!valido) return;

    const usuarios = obtener(CLAVES.USUARIOS) || [];
    const usuario = usuarios.find(
      (u) =>
        u.correo.trim().toLowerCase() === correo.value.trim().toLowerCase() &&
        u.clave === clave.value.trim()
    );

    if (!usuario) {
      mostrarMensaje("loginMensaje", "Correo o contraseña incorrectos.", true);
      return;
    }

    guardarSesion(usuario.id);
    mostrarMensaje(
      "loginMensaje",
      `¡Hola, ${usuario.nombre}! Inicio de sesión correcto. Redirigiendo...`,
      false
    );

    setTimeout(() => {
      window.location.href = "feed.html";
    }, 1200);
  });
}

function inicializarRegistro() {
  const form = document.getElementById("formRegistro");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    const nombre = document.getElementById("regNombre");
    const correo = document.getElementById("regCorreo");
    const clave = document.getElementById("regClave");
    const claveConfirmar = document.getElementById("regClaveConfirmar");
    const tipoUsuario = document.getElementById("regTipoUsuario");

    if (nombre.value.trim().length < 3) {
      nombre.classList.add("is-invalid");
      valido = false;
    } else {
      nombre.classList.remove("is-invalid");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
      correo.classList.add("is-invalid");
      valido = false;
    } else {
      correo.classList.remove("is-invalid");
    }

    if (clave.value.trim().length < 6) {
      clave.classList.add("is-invalid");
      valido = false;
    } else {
      clave.classList.remove("is-invalid");
    }

    if (claveConfirmar.value.trim() !== clave.value.trim() || claveConfirmar.value.trim() === "") {
      claveConfirmar.classList.add("is-invalid");
      valido = false;
    } else {
      claveConfirmar.classList.remove("is-invalid");
    }

    if (tipoUsuario.value === "") {
      tipoUsuario.classList.add("is-invalid");
      valido = false;
    } else {
      tipoUsuario.classList.remove("is-invalid");
    }

    if (!valido) return;

    const usuarios = obtener(CLAVES.USUARIOS) || [];
    const correoNormalizado = correo.value.trim().toLowerCase();
    const correoDuplicado = usuarios.some(
      (u) => u.correo && u.correo.trim().toLowerCase() === correoNormalizado
    );

    if (correoDuplicado) {
      mostrarMensaje(
        "registroMensaje",
        "Ya existe una cuenta con ese correo. Prueba iniciar sesión.",
        true
      );
      correo.classList.add("is-invalid");
      return;
    }

    /* Deuda técnica: la contraseña se guarda en texto plano
       porque esto es un mock sin backend. Ver nota al final
       de data.js. */
    const tipo = tipoUsuario.value;
    const usuarioNuevo = {
      nombre: nombre.value.trim(),
      correo: correoNormalizado,
      clave: clave.value.trim(),
      rol: rolDesdeTipo(tipo),
      carrera: tipo === "empresa" ? "Empresa de tecnología" : "",
      universidad: "Universidad Popular del Cesar",
      iniciales: inicialesDesdeNombre(nombre.value),
      color: "#006837",
      descripcion: "",
      habilidades: [],
      proyectosDestacados: [],
    };

    const usuarioCreado = agregar(CLAVES.USUARIOS, usuarioNuevo);
    guardarSesion(usuarioCreado.id);

    mostrarMensaje(
      "registroMensaje",
      "Cuenta creada correctamente. Nosotros te logueamos, redirigiendo...",
      false
    );
    form.reset();

    setTimeout(() => {
      window.location.href = "feed.html";
    }, 1200);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarLogin();
  inicializarRegistro();
});