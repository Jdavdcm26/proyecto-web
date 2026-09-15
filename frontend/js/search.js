/* ==================================================
   SEARCH.JS
   Utilidades de búsqueda y filtrado por texto.
   Reutilizable en Oportunidades, Mi Red y Portafolio.
   Responsable: Mario (Módulo 7)
   ================================================== */

/* Compara un texto contra una consulta, sin distinguir
   mayúsculas/minúsculas ni espacios sobrantes. */
function coincideTexto(texto, consulta) {
  if (!consulta) return true;
  return (texto || "").toLowerCase().includes(consulta.trim().toLowerCase());
}

/* Filtra oportunidades por texto libre (título, empresa
   o alguna habilidad requerida) y por modalidad. */
function filtrarOportunidades(lista, texto, modalidad) {
  return lista.filter((op) => {
    const coincideBusqueda =
      coincideTexto(op.titulo, texto) ||
      coincideTexto(op.empresa, texto) ||
      op.habilidadesRequeridas.some((h) => coincideTexto(h, texto));

    const coincideModalidad = !modalidad || coincideTexto(op.modalidad, modalidad);

    return coincideBusqueda && coincideModalidad;
  });
}