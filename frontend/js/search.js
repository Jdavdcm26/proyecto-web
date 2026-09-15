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


/* Filtra usuarios de la red por texto libre (nombre, carrera
   o alguna habilidad) y por rol (Estudiante, Egresado, etc.). */
function filtrarUsuarios(lista, texto, rol) {
  return lista.filter((u) => {
    const coincideBusqueda =
      coincideTexto(u.nombre, texto) ||
      coincideTexto(u.carrera, texto) ||
      (u.habilidades || []).some((h) => coincideTexto(h, texto));

    const coincideRol = !rol || u.rol === rol;

    return coincideBusqueda && coincideRol;
  });
}

/* Filtra proyectos del portafolio por texto libre
   (nombre, descripción o alguna tecnología usada). */
function filtrarProyectos(lista, texto) {
  return lista.filter(
    (p) =>
      coincideTexto(p.nombre, texto) ||
      coincideTexto(p.descripcion, texto) ||
      (p.tecnologias || []).some((t) => coincideTexto(t, texto))
  );
}