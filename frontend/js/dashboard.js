/* ==================================================
   DASHBOARD.JS
   Render de la página Dashboard (pages/dashboard.html)
   ================================================== */
function renderDashboard() {
  const contenedor = document.getElementById("dashboardIndicadores");
  if (!contenedor) return;

  const datos = [
    { etiqueta: "Usuarios registrados", valor: indicadoresDashboard.usuariosRegistrados, icono: "👥" },
    { etiqueta: "Oportunidades activas", valor: indicadoresDashboard.oportunidadesActivas, icono: "💼" },
    { etiqueta: "Proyectos publicados", valor: indicadoresDashboard.proyectosPublicados, icono: "📁" },
    { etiqueta: "Conexiones realizadas", valor: indicadoresDashboard.conexionesRealizadas, icono: "🔗" },
  ];

  contenedor.innerHTML = datos
    .map(
      (d) => `
      <div class="col-6 col-lg-3">
        <div class="card-upc p-4 text-center">
          <div class="fs-3 mb-2">${d.icono}</div>
          <p class="fs-4 fw-bold text-upc mb-0">${d.valor.toLocaleString("es-CO")}</p>
          <p class="small text-muted mb-0">${d.etiqueta}</p>
        </div>
      </div>`
    )
    .join("");

  const grafico = document.getElementById("dashboardGrafico");
  if (grafico) {
    const max = Math.max(...indicadoresDashboard.usuariosPorRol.map((d) => d.valor));
    grafico.innerHTML = indicadoresDashboard.usuariosPorRol
      .map((d) => {
        const alturaPorcentaje = Math.round((d.valor / max) * 100);
        return `
        <div class="barra-grupo">
          <div class="barra" style="height:${alturaPorcentaje}%">
            <span class="barra-valor">${d.valor.toLocaleString("es-CO")}</span>
          </div>
          <span class="barra-etiqueta">${d.etiqueta}</span>
        </div>`;
      })
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!protegerPagina()) return;
  renderDashboard();
});