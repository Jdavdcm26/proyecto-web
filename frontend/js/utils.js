/* ==================================================
   UTILS.JS
   Utilidades reutilizables de UPC Connect.
   ================================================== */

/* --------------------------------------------------
   TOAST simple reutilizable (usa Bootstrap Toast)
   -------------------------------------------------- */
function mostrarToast(texto) {
  const toastEl = document.getElementById("toastUpc");
  if (!toastEl) {
    alert(texto);
    return;
  }
  document.getElementById("toastUpcTexto").textContent = texto;
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}