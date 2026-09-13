/* ==================================================
   TALENT-MATCH.JS
   Motor de cálculo de compatibilidad de UPC Talent Match.
   ================================================== */

/* Formula: (habilidades coincidentes / habilidades
   requeridas) x 100 */
function calcularCompatibilidad(habilidadesUsuario, habilidadesRequeridas) {
  const usuarioNormalizado = habilidadesUsuario.map((h) => h.toLowerCase());
  const coincidencias = habilidadesRequeridas.filter((req) =>
    usuarioNormalizado.includes(req.toLowerCase())
  );
  const porcentaje = Math.round(
    (coincidencias.length / habilidadesRequeridas.length) * 100
  );
  return porcentaje;
}

/* Devuelve la clase de color según el porcentaje, para que
   la barra se vea verde, amarilla o gris según qué tan
   compatible es la oportunidad */
function colorCompatibilidad(porcentaje) {
  if (porcentaje >= 70) return "match-alto";
  if (porcentaje >= 40) return "match-medio";
  return "match-bajo";
}