/* ==================================================
   DATA.JS
   Semillas y catálogos de UPC Connect.
   Este archivo ya NO es la fuente de verdad: storage.js
   copia estos datos a localStorage la primera vez.
   Los arrays de aquí no deben modificarse en tiempo de
   ejecución; toda mutación pasa por storage.js.
   ================================================== */

/* --------------------------------------------------
   SEMILLA: USUARIOS
   La red profesional (estudiantes, egresados, docentes
   y empresas) + el usuario demo. Incluye credenciales
   mock para poder hacer login (ver nota de deuda
   técnica al final del archivo).
   -------------------------------------------------- */
const semillaUsuarios = [
  {
    id: 0,
    nombre: "José Castro",
    correo: "jose@unicesar.edu.co",
    clave: "123456",
    carrera: "Ingeniería de Sistemas",
    rol: "Estudiante",
    universidad: "Universidad Popular del Cesar",
    iniciales: "JC",
    color: "#006837",
    descripcion:
      "Estudiante de Ingeniería de Sistemas apasionado por el desarrollo web y las nuevas tecnologías. Buscando prácticas profesionales para aplicar lo aprendido.",
    habilidades: ["HTML", "CSS", "JavaScript", "Bootstrap", "Git"],
    proyectosDestacados: [1, 2],
    githubUser: "Jdavdcm26",
  },
  {
    id: 1,
    nombre: "Laura Martínez",
    correo: "laura@unicesar.edu.co",
    clave: "123456",
    iniciales: "LM",
    carrera: "Ingeniería de Sistemas",
    rol: "Egresada",
    habilidades: ["JavaScript", "React", "Node.js"],
    color: "#006837",
    githubUser: "",
  },
  {
    id: 2,
    nombre: "Andrés Mejía",
    correo: "andres@unicesar.edu.co",
    clave: "123456",
    iniciales: "AM",
    carrera: "Ingeniería de Sistemas",
    rol: "Estudiante",
    universidad: "Universidad Popular del Cesar",
    habilidades: ["HTML", "CSS", "Bootstrap"],
    proyectosDestacados: [],
    color: "#174a91",
    githubUser: "",
  },
  {
    id: 3,
    nombre: "Valentina Cárdenas",
    correo: "valentina@unicesar.edu.co",
    clave: "123456",
    iniciales: "VC",
    carrera: "Ingeniería Industrial",
    rol: "Estudiante",
    universidad: "Universidad Popular del Cesar",
    habilidades: ["Excel", "Gestión de proyectos", "Power BI"],
    proyectosDestacados: [],
    color: "#8a5c28",
    githubUser: "",
  },
  {
    id: 4,
    nombre: "Juan Pablo Rojas",
    correo: "juanpablo@unicesar.edu.co",
    clave: "123456",
    iniciales: "JP",
    carrera: "Docente - Programación",
    rol: "Docente",
    universidad: "Universidad Popular del Cesar",
    habilidades: ["Java", "Python", "Bases de datos"],
    proyectosDestacados: [],
    color: "#004D28",
    githubUser: "",
  },
  {
    id: 5,
    nombre: "TecnoCaribe S.A.S",
    correo: "contacto@tecnocaribe.co",
    clave: "123456",
    iniciales: "TC",
    carrera: "Empresa de tecnología",
    rol: "Empresa",
    universidad: "TecnoCaribe S.A.S",
    habilidades: ["JavaScript", "SQL", "Metodologías ágiles"],
    proyectosDestacados: [],
    color: "#006837",
    githubUser: "",
  },
  {
    id: 6,
    nombre: "Camila Herrera",
    correo: "camila@unicesar.edu.co",
    clave: "123456",
    iniciales: "CH",
    carrera: "Ingeniería de Sistemas",
    rol: "Egresada",
    universidad: "Universidad Popular del Cesar",
    habilidades: ["HTML", "CSS", "JavaScript", "UX/UI"],
    proyectosDestacados: [],
    color: "#79b98d",
    githubUser: "",
  },
];

/* Oportunidades laborales / prácticas publicadas */
const oportunidades = [
  {
    id: 1,
    titulo: "Practicante de Desarrollo Frontend",
    empresa: "TecnoCaribe S.A.S",
    modalidad: "Presencial - Valledupar",
    descripcion:
      "Buscamos un practicante entusiasta para apoyar el equipo de frontend en la construcción de interfaces con HTML, CSS, Bootstrap y JavaScript.",
    habilidadesRequeridas: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  },
  {
    id: 2,
    titulo: "Analista Junior de Datos",
    empresa: "DataCesar",
    modalidad: "Remoto",
    descripcion:
      "Apoyar procesos de análisis y visualización de datos para clientes del sector agroindustrial de la región.",
    habilidadesRequeridas: ["Excel", "SQL", "Power BI"],
  },
  {
    id: 3,
    titulo: "Practicante de Desarrollo Web",
    empresa: "Innova Cesar",
    modalidad: "Híbrido - Valledupar",
    descripcion:
      "Práctica profesional enfocada en el mantenimiento y mejora de sitios web institucionales usando tecnologías web estándar.",
    habilidadesRequeridas: ["HTML", "CSS", "JavaScript", "Git"],
  },
  {
    id: 4,
    titulo: "Auxiliar de Gestión de Proyectos",
    empresa: "Constructora del Cesar",
    modalidad: "Presencial - Valledupar",
    descripcion:
      "Apoyo en la planeación y seguimiento de proyectos de infraestructura usando herramientas de gestión.",
    habilidadesRequeridas: ["Gestión de proyectos", "Excel", "Comunicación"],
  },
  {
    id: 5,
    titulo: "Desarrollador Backend Junior",
    empresa: "SoftCaribe",
    modalidad: "Remoto",
    descripcion:
      "Únete a nuestro equipo para el desarrollo de APIs y lógica de negocio en proyectos educativos de la región.",
    habilidadesRequeridas: ["JavaScript", "Node.js", "Bases de datos"],
  },
];

/* Proyectos publicados en el portafolio de la comunidad */
const semillaProyectos = [
  {
    id: 1,
    nombre: "UPC Connect",
    descripcion:
      "Plataforma de networking profesional para la comunidad de la Universidad Popular del Cesar.",
    tecnologias: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    autor: "José Castro",
    color: "#006837",
  },
  {
    id: 2,
    nombre: "Sistema Académico UPC",
    descripcion:
      "Prototipo de sistema para consulta de notas, horarios y matrícula académica.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    autor: "José Castro",
    color: "#174a91",
  },
  {
    id: 3,
    nombre: "Página Web Empresarial",
    descripcion:
      "Sitio web corporativo para una pyme del sector comercial de Valledupar.",
    tecnologias: ["HTML", "Bootstrap", "JavaScript"],
    autor: "Laura Martínez",
    color: "#8a5c28",
  },
  {
    id: 4,
    nombre: "Dashboard de Ventas",
    descripcion:
      "Panel visual para el seguimiento de indicadores de ventas de una empresa local.",
    tecnologias: ["HTML", "CSS", "Bootstrap"],
    autor: "Camila Herrera",
    color: "#004D28",
  },
];

/* Mentores disponibles (egresados y profesionales) */
const mentores = [
  {
    id: 1,
    nombre: "Laura Martínez",
    iniciales: "LM",
    profesion: "Desarrolladora Frontend Senior",
    area: "Desarrollo Web",
    descripcion:
      "Egresada de Ingeniería de Sistemas con 4 años de experiencia en desarrollo frontend.",
    especialidades: ["JavaScript", "React", "UX/UI"],
  },
  {
    id: 2,
    nombre: "Carlos Daza",
    iniciales: "CD",
    profesion: "Líder de Proyectos TI",
    area: "Gestión de Proyectos",
    descripcion:
      "Egresado con experiencia liderando equipos de desarrollo en empresas del Caribe colombiano.",
    especialidades: ["Scrum", "Gestión de equipos", "Planeación"],
  },
  {
    id: 3,
    nombre: "Camila Herrera",
    iniciales: "CH",
    profesion: "Diseñadora UX/UI",
    area: "Diseño de Producto",
    descripcion:
      "Egresada especializada en experiencia de usuario para productos digitales.",
    especialidades: ["Figma", "UX Research", "Prototipado"],
  },
  {
    id: 4,
    nombre: "Juan Pablo Rojas",
    iniciales: "JP",
    profesion: "Docente e Ingeniero de Software",
    area: "Backend y Bases de Datos",
    descripcion:
      "Docente de la UPC con amplia experiencia en desarrollo backend y bases de datos.",
    especialidades: ["Java", "Python", "SQL"],
  },
];

/* Publicaciones del feed de la comunidad */
const semillaPublicaciones = [
  {
    id: 1,
    usuario: "Laura Martínez",
    iniciales: "LM",
    rol: "Egresada · Ingeniería de Sistemas",
    fecha: "Hace 2 horas",
    contenido:
      "¡Feliz de compartir que inicié mi práctica profesional! Gracias a la red UPC por conectar el talento con grandes oportunidades.",
    likes: 28,
    likeDado: false,
    comentarios: 7,
  },
  {
    id: 2,
    usuario: "Andrés Mejía",
    iniciales: "AM",
    rol: "Estudiante · Ingeniería de Sistemas",
    fecha: "Hace 5 horas",
    contenido:
      "Terminé mi primer proyecto de portafolio usando HTML, CSS y Bootstrap. ¡Cualquier feedback es bienvenido!",
    likes: 15,
    likeDado: false,
    comentarios: 4,
  },
  {
    id: 3,
    usuario: "TecnoCaribe S.A.S",
    iniciales: "TC",
    rol: "Empresa aliada",
    fecha: "Hace 1 día",
    contenido:
      "Abrimos nuevas vacantes de práctica profesional para estudiantes de últimos semestres. ¡Postúlate en la sección de Oportunidades!",
    likes: 42,
    likeDado: false,
    comentarios: 11,
  },
  {
    id: 4,
    usuario: "Camila Herrera",
    iniciales: "CH",
    rol: "Egresada · Ingeniería de Sistemas",
    fecha: "Hace 2 días",
    contenido:
      "Gran experiencia participando como mentora en UPC Connect. Ver crecer a los estudiantes de la universidad no tiene precio.",
    likes: 33,
    likeDado: false,
    comentarios: 6,
  },
];

/* Indicadores simulados para el Dashboard */
const indicadoresDashboard = {
  usuariosRegistrados: 5210,
  oportunidadesActivas: 87,
  proyectosPublicados: 342,
  conexionesRealizadas: 12480,
  // Datos de ejemplo para una gráfica simple de barras (usuarios por rol)
  usuariosPorRol: [
    { etiqueta: "Estudiantes", valor: 3100 },
    { etiqueta: "Egresados", valor: 1200 },
    { etiqueta: "Docentes", valor: 460 },
    { etiqueta: "Empresas", valor: 450 },
  ],
};

/* --------------------------------------------------
   DEUDA TÉCNICA (anotada, no bloqueante)
   registro.html guarda la contraseña en texto plano
   dentro de upc_usuarios, igual que estos usuarios
   semilla, porque todo sigue siendo mock sin backend.
   Cuando exista backend real hay que migrar a
   contraseñas hasheadas: esto no debe convertirse en
   "la forma normal" de guardar contraseñas del proyecto.
   -------------------------------------------------- */