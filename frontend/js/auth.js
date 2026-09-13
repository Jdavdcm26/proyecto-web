/* ==================================================
   AUTH.JS
   Lógica de Login y Registro (simulados, sin backend).
   Responsable: Mario (Bloque A)
   ================================================== */

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

    const mensaje = document.getElementById("loginMensaje");
    mensaje.classList.remove("d-none");
    mensaje.textContent = "Inicio de sesión simulado correctamente. Redirigiendo...";

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

    const mensaje = document.getElementById("registroMensaje");
    mensaje.classList.remove("d-none");
    mensaje.textContent = "Registro simulado correctamente.";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarLogin();
  inicializarRegistro();
});