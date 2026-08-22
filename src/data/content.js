// ============================================================
//  TODO TU CONTENIDO VIVE AQUÍ. Los componentes leen de este archivo.
//  Para cambiar textos, métricas, proyectos o el orden, edita aquí.
// ============================================================

export const profile = {
  name: "Christian Álvarez",
  logo: "<CA/>",
  role: "Software Engineer",
  location: "Barranquilla, Colombia",
  year: "2026",
  email: "christian2003cab@gmail.com",
  linkedin: "https://linkedin.com/in/christianalvarez0316",
  github: "https://github.com/ChristianAB03",
  // Número con código de país (57 = Colombia), sin + ni espacios, para wa.me
  whatsapp: "573045491728",
  // Sube tu CV a la carpeta /public como public/cv.pdf. `cv` es la ruta
  // y `cvName` es el nombre con el que se descarga el archivo.
  cv: "/cv.pdf",
  cvName: "Christian-Alvarez-CV.pdf",
  // Cambia a true cuando subas public/cv.pdf: entonces aparecen los botones
  // "Download CV". Mientras esté en false, se ocultan (evita descargar un HTML roto).
  cvReady: true,
  available: "Available for Software Engineer roles · 2026",
  heroLead:
    "Software Engineer enfocado en construir aplicaciones web modernas y soluciones impulsadas por IA. Experiencia desarrollando software en producción con React, TypeScript, Python y OpenAI para entornos empresariales y clientes reales.",
  // Columna mono a la izquierda del hero (máx. 3 palabras)
  heroRail: ["Building", "Digital", "Products"],
};

// ============================================================
//  ENGINEERING SNAPSHOT — cuatro métricas reales, no marketing.
// ============================================================
export const snapshot = [
  { n: "2", k: "Years", l: "Experience" },
  { n: "10+", k: "Apps", l: "In production" },
  { n: "#1", k: "Hackathon", l: "Soledad 2026", accent: true },
  { n: "AI", k: "OpenAI", l: "Integrations" },
];

// ============================================================
//  SELECTED WORK — case studies.
//  El item con hero:true recibe el tratamiento de FEATURED PROJECT.
// ============================================================
export const featured = [
  // ---------- 1. FORJA GYM — FEATURED PROJECT (demo desplegada) ----------
  {
    id: "forja",
    hero: true,
    image: "/projects/forja-gym.webp",
    path: "~/forja-gym-landing",
    mark: "Forja",
    kicker: "Featured project",
    title: "Forja Gym — Landing",
    subtitle: "Frontend · Design system · Performance",
    meta: [
      { k: "Role", v: "Diseño y desarrollo · solo" },
      { k: "Tech", v: "React · Vite · Tailwind v4" },
      { k: "Year", v: "2026" },
      { k: "Status", v: "Live demo" },
    ],
    summary:
      "Landing de una sola vista para un gimnasio, con once pantallas funcionales navegables —reservas, pagos, portal de cliente y calculadoras—. Pieza de portafolio construida para cuidar el sistema de diseño, el rendimiento y la accesibilidad.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Swiper"],
    liveUrl: "https://forja-gym-landing.vercel.app/",
    repoUrl: "https://github.com/ChristianAB03/forja-gym-landing",
    caseStudy: {
      problem:
        "Un gimnasio de barrio compite con cadenas que tienen presupuesto de marketing, y su web suele ser un folleto: horarios, teléfono y poco más. El visitante que duda —¿estará lleno a esa hora?, ¿me sabrán guiar si nunca he entrenado?— no encuentra respuesta y no vuelve.",
      overview:
        "Además de presentar el gimnasio, la página resuelve en el propio sitio las dudas que frenan una inscripción y convierte al curioso en un contacto. Es un proyecto de demostración: Forja Gym es un negocio ficticio, y los pagos y reservas son maquetas que no procesan nada.",
      tech: ["React 18", "Vite 6", "Tailwind CSS 4", "Framer Motion 11", "Swiper 11", "Lucide"],
      features: [
        "Reserva de visita y clase de prueba",
        "Inscripción y pagos (Nequi, Daviplata, PSE, tarjeta)",
        "Portal del cliente",
        "Reserva de entrenador",
        "Tienda y referidos",
        "Congelar membresía",
        "Diagnóstico corporal (IMC, metabolismo, objetivo calórico)",
        "Rutina en 60 segundos",
      ],
      contributionLabel: "Qué construí",
      contribution: [
        "Sistema de diseño con tokens",
        "15 secciones de la landing",
        "11 pantallas funcionales",
        "Presupuesto de rendimiento",
        "Accesibilidad AA",
        "Horario en vivo por zona horaria",
      ],
      technicalDecisions:
        "Toda la paleta se define en oklch, no en hex: el primer valor es luminosidad perceptual real, así que la escala es coherente en lugar de acumular colores elegidos a ojo. La escala de naranja rota el matiz de 62 a 40 al oscurecer (la luz real tira a rojo al apagarse) y el fondo usa un matiz cálido que imita la iluminación de tungsteno de un gimnasio en vez de un negro azulado de software. Los tokens viven en @theme (Tailwind v4), sin tailwind.config.js: cambiar un token repinta el sitio entero.",
      modular:
        "Carga inicial ≈ 128 KB gzip. Las once pantallas funcionales se separan en un chunk aparte y se cargan solo tras la primera interacción, con precarga en requestIdleCallback para que el primer clic abra al instante. Swiper no entra en el arranque —los testimonios se montan al primer scroll— y manualChunks separa React, Framer Motion y Swiper para que se cacheen entre despliegues.",
      learnings: [
        "prefers-reduced-motion en dos capas (CSS + MotionConfig)",
        "Parallax que anima solo translateY (composición en GPU)",
        "Zona horaria correcta con Intl.DateTimeFormat",
        "Contraste verificado token por token (AA)",
        "Modales con foco atrapado y restauración",
      ],
    },
  },

  // ---------- 2. VITRINA EMPRESARIAL — case study ----------
  {
    id: "vitrina",
    image: "/projects/soledad_conecta.webp",
    path: "~/soledad-conecta",
    mark: "Soledad",
    kicker: "Hackathon winner",
    title: "Vitrina Empresarial Digital",
    subtitle: "Frontend Developer · Equipo de 4",
    award: "#1 Winner",
    awardContext: "Hackathon Soledad 2026",
    meta: [
      { k: "Role", v: "Frontend · Admin dashboard" },
      { k: "Tech", v: "React · Express · MySQL" },
      { k: "Year", v: "2026" },
      { k: "Status", v: "Live" },
    ],
    badges: [
      { icon: "trophy", label: "Hackathon Winner" },
      { icon: "bolt", label: "Built in 1 Month" },
    ],
    summary:
      "Plataforma digital para impulsar la visibilidad de emprendedores del municipio de Soledad mediante perfiles empresariales, catálogo de productos, métricas de interacción y gestión administrativa.",
    tech: ["React", "Node.js", "Express", "MySQL", "JWT"],
    liveUrl: "https://soledadconecta.com/",
    caseStudy: {
      overview:
        "Plataforma digital diseñada para impulsar la visibilidad de emprendedores del municipio de Soledad mediante perfiles empresariales, catálogo de productos, métricas de interacción y gestión administrativa.",
      tech: ["React", "Node.js", "Express", "MySQL", "JWT"],
      contributionLabel: "Mi responsabilidad principal",
      contribution: [
        "Dashboard Admin",
        "Gestión de Usuarios",
        "Gestión de Categorías",
        "Métricas Globales",
        "PQRS Admin",
        "PrivateRoute",
        "Integración con endpoints administrativos",
      ],
      architecture: {
        label: "Arquitectura simplificada",
        nodes: [
          "Ciudadano",
          "Frontend React",
          "API Express",
          "JWT",
          "MySQL",
          "Dashboard Admin",
        ],
        note: "Diagrama conceptual del flujo de datos y la capa de autenticación.",
      },
      result:
        "Proyecto ganador del Hackathon Soledad 2026. Desarrollado y desplegado en aproximadamente un mes mediante metodología ágil.",
      learnings: [
        "Trabajo bajo presión",
        "Desarrollo colaborativo",
        "Integración frontend-backend",
        "Gestión de roles y permisos",
        "Construcción de paneles administrativos",
      ],
    },
  },

  // ---------- 3. LEGAL AI ----------
  {
    id: "legal-ai",
    image: "/projects/automatizacion.webp",
    path: "~/legal-ai",
    mark: "Legal AI",
    kicker: "Case study",
    title: "AI-Powered Legal Review System",
    subtitle: "Arquitectura · Backend · Integración de IA",
    status: "En desarrollo para cliente real",
    meta: [
      { k: "Role", v: "Arquitectura · Backend · IA" },
      { k: "Tech", v: "Python · Flask · OpenAI" },
      { k: "Year", v: "2025 — 2026" },
      { k: "Status", v: "In development" },
    ],
    summary:
      "Sistema que automatiza la revisión jurídica preventiva de actos administrativos antes de la firma, reduciendo tiempo y errores mediante clasificación y análisis especializado con IA.",
    tech: ["Python", "Flask", "OpenAI API", "Make", "Railway"],
    caseStudy: {
      problem:
        "Reducir el tiempo y los errores en la revisión jurídica preventiva de actos administrativos antes de la firma.",
      tech: ["Python", "Flask", "OpenAI API", "Make", "Railway", "Gmail", "Dropbox"],
      architecture: {
        label: "Flujo del sistema",
        nodes: [
          "Correo recibido",
          "Gmail",
          "Make",
          "Flask (Railway)",
          "Clasificación IA",
          "Análisis IA especializado",
          "JSON",
          "Dropbox",
          "Abogado",
        ],
        note: "Flujo conceptual de extremo a extremo, del correo de entrada al resultado entregado al abogado.",
      },
      features: [
        "Clasificación automática de casos",
        "Extracción de datos jurídicos",
        "Análisis especializado por categoría",
        "Veredicto aprobado / desaprobado",
        "Detección de inconsistencias",
        "Organización automática de resultados",
      ],
      delivers: [
        "Clasificación automática",
        "Análisis jurídico estructurado",
        "Extracción de datos",
        "Recomendaciones",
        "Veredicto final",
        "Organización automática en Dropbox",
      ],
      contribution: [
        "Diseño de arquitectura",
        "Desarrollo del microservicio Flask",
        "Integración OpenAI",
        "Ingeniería de prompts",
        "Integración Make",
        "Despliegue en Railway",
      ],
      technicalDecisions:
        "No se desarrolló una interfaz web porque el cliente ya utilizaba Gmail y Dropbox en su flujo diario. La solución fue diseñada para integrarse al proceso existente en lugar de obligar al usuario a aprender una nueva herramienta.",
      modular:
        "Cada tipo de caso utiliza prompts jurídicos especializados. El sistema realiza dos llamadas independientes a OpenAI —clasificación y análisis especializado—, lo que mejora significativamente la precisión frente a un único análisis genérico.",
      learnings: [
        "Integración de IA en procesos reales",
        "Automatización documental",
        "Arquitecturas híbridas no-code + código",
        "Ingeniería de prompts",
        "Desarrollo para clientes reales",
      ],
    },
  },

  // ---------- 4. APPARCACUC — case study full-stack ----------
  {
    id: "apparcacuc",
    image: "/projects/apparcacuc.webp", 
    path: "~/apparcacuc",
    mark: "ApparcaCUC",
    kicker: "Case study",
    title: "ApparcaCUC — Gestión de parqueaderos",
    subtitle: "Full Stack · Proyecto universitario",
    meta: [
      { k: "Role", v: "Full-stack · solo" },
      { k: "Tech", v: "React · Express · MongoDB" },
      { k: "Year", v: "2026" },
      { k: "Status", v: "Live demo" },
    ],
    summary:
      "Plataforma de Smart Parking para comunidades universitarias: disponibilidad de espacios en tiempo real, reservas con código QR y simulación de sensores IoT desde un panel administrativo. Evolución de un proyecto de aula a una demo full-stack funcional.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://apparcacuc.vercel.app/",
    repoUrl: "https://github.com/ChristianAB03/ApparcaCUC",
    caseStudy: {
      problem:
        "En el campus, encontrar estacionamiento suele implicar dar vueltas sin información sobre dónde hay espacio, lo que genera demoras en el ingreso y congestión vehicular. ApparcaCUC digitaliza el parqueadero: centraliza la disponibilidad en tiempo real y permite reservar con anticipación, reduciendo la fricción de todo el proceso.",
      overview:
        "Smart Parking full-stack en un monorepo (frontend, API REST y base de datos). Los usuarios ven el mapa del parqueadero en tiempo real y reservan con QR; un panel administrativo gestiona espacios, reservas, usuarios y analíticas, con un simulador de sensores IoT que alimenta todo el sistema.",
      tech: [
        "React", "TypeScript", "Vite", "Tailwind CSS",
        "Node.js", "Express", "MongoDB", "Mongoose",
        "JWT", "TanStack Query", "Recharts",
        "Vercel", "Render", "MongoDB Atlas",
      ],
      architecture: {
        label: "Arquitectura y despliegue",
        nodes: [
          "Usuario / Admin",
          "React SPA · Vite (Vercel)",
          "API REST · Express + JWT (Render)",
          "MongoDB Atlas",
        ],
        note: "La reserva sigue el ciclo QR → simulador de acceso → validación → cambio de estado del espacio; el simulador IoT y las reservas actualizan mapa y dashboard por polling. La base vive en Atlas vía variables de entorno, desacoplada del backend.",
      },
      contributionLabel: "Qué construí",
      contribution: [
        "Arquitectura full-stack en monorepo",
        "Autenticación JWT y roles usuario / admin",
        "Mapa interactivo y reservas con QR",
        "Simulador de sensores IoT y de acceso",
        "Panel admin: espacios, reservas, usuarios, analíticas",
        "Sistema de diseño propio, responsive y accesible",
        "Despliegue Vercel + Render + MongoDB Atlas",
      ],
      technicalDecisions: [
        "Simulación IoT desacoplada: un único servicio de cambio de estado actualiza mapa, dashboard, estadísticas y auditoría; con sensores físicos bastaría cambiar el origen de los eventos.",
        "Reserva atómica con findOneAndUpdate condicional: evita dobles reservas y condiciones de carrera sin necesidad de transacciones.",
        "Tiempo real por polling con TanStack Query: solución simple y suficiente para la demo, dejando WebSockets como evolución.",
        "DX sin fricción: fallback a MongoDB en memoria + auto-seed para clonar y ejecutar sin instalar una base de datos.",
        "Seguridad en el servidor: autorización por rol y ownership, validación con Zod .strict() y sanitización frente a NoSQL injection.",
        "Rendimiento: code-splitting por ruta que reduce el bundle inicial de ~1 MB a ~500 KB.",
        "Infraestructura desacoplada: la base vive en MongoDB Atlas vía variables de entorno; el backend podría migrar de Render sin tocar la DB.",
      ],
      learnings: [
        "Diseñar una API REST por capas (routes → controllers → services)",
        "JWT y control de acceso por rol y ownership desde el servidor",
        "Modelado con MongoDB / Mongoose y operaciones atómicas",
        "Estado del servidor en el cliente con TanStack Query (caché, invalidación, polling)",
        "Seguridad web: validación, sanitización, CORS y rate limiting",
        "Separación app / infraestructura: frontend, backend y DB independientes",
        "Despliegue full-stack: Vercel + Render + MongoDB Atlas",
      ],
    },
  },
];

// ============================================================
//  EXPERIENCE — historial de ingeniería (timeline editorial).
//  Cada entrada con caseStudy abre el modal de case study.
// ============================================================
export const experience = [
  // ---------- FREELANCE (track actual) ----------
  {
    id: "freelance",
    period: "2024 — Present",
    current: true,
    company: "Freelance",
    role: "Software Engineer",
    image: "",
    kicker: "Independent work",
    title: "Freelance Software Engineering",
    subtitle: "Software Engineer · Proyectos para clientes reales",
    summary:
      "En paralelo a mis roles, desarrollo aplicaciones web y soluciones con IA para clientes reales de forma independiente —incluido un sistema de automatización para revisión jurídica—, encargándome de la arquitectura, el desarrollo y el despliegue.",
    highlights: [
      { n: "AI", l: "automation systems" },
      { n: "Full-stack", l: "web apps" },
      { n: "Clients", l: "real-world projects" },
    ],
    tech: ["React", "TypeScript", "Python", "Flask", "OpenAI API", "Node.js"],
  },

  // ---------- PERSONALSOFT ----------
  {
    id: "sura",
    period: "Jul 2025 — Ene 2026",
    current: false,
    company: "PersonalSoft",
    role: "Frontend Developer · Intern",
    client: "Seguros SURA",
    image: "", // banner del case study
    kicker: "Professional experience",
    title: "Enterprise Frontend Development",
    subtitle: "Frontend Developer Intern · PersonalSoft · Seguros SURA",
    summary:
      "Práctica profesional universitaria desarrollando y manteniendo más de diez aplicaciones internas usadas por distintas áreas de la organización, sobre React, TypeScript y el ecosistema Power Platform.",
    highlights: [
      { n: "+10", l: "applications" },
      { n: "Prod.", l: "in production" },
      { n: "SP / PP", l: "SharePoint & Power Platform" },
    ],
    tech: ["React", "TypeScript", "SharePoint", "Power Automate", "REST APIs"],
    caseStudy: {
      overview:
        "Durante mi práctica profesional universitaria participé en el desarrollo y mantenimiento de múltiples aplicaciones internas utilizadas por diferentes áreas de la organización. El trabajo combinó construcción de nuevas interfaces, evolución de aplicaciones existentes y corrección de incidencias en software ya en producción.",
      tech: ["React", "TypeScript", "JavaScript", "SharePoint", "Power Automate", "REST APIs"],
      responsibilities: [
        "Desarrollo de interfaces empresariales",
        "Construcción de formularios complejos",
        "Integración con APIs",
        "Validaciones de negocio",
        "Mantenimiento evolutivo",
        "Corrección de incidencias",
        "Optimización de experiencia de usuario",
        "Revisión de código",
      ],
      architecture: {
        label: "Arquitectura simplificada",
        nodes: ["Usuario", "React Frontend", "REST APIs", "SharePoint", "Power Automate"],
        note: "Diagrama conceptual simplificado. No representa la arquitectura interna real.",
      },
      projects: [
        "Qué tan Digitales Somos",
        "Pólizas Frontend",
        "Directorio de Asesores",
        "Validación de Identidad",
        "Comunicaciones TD",
        "Tendencias",
        "Empresa SURA Aliados",
        "Vida Grupo",
        "Salud Animal",
        "Formulario Internacional de Contingencia",
        "Notificador de Alertas",
      ],
      learnings: [
        "Desarrollo empresarial",
        "Mantenimiento de software en producción",
        "Trabajo con múltiples stakeholders",
        "Desarrollo orientado a negocio",
        "Evolución de aplicaciones existentes",
      ],
      confidentiality:
        "Por motivos de confidencialidad, el código fuente, capturas y datos de estas aplicaciones no pueden compartirse públicamente.",
    },
  },

  // ---------- SANDS S.A.S ----------
  {
    id: "sands",
    period: "Jul — Dic 2024",
    current: false,
    company: "SANDS S.A.S",
    role: "Frontend Developer",
    image: "",
    kicker: "Professional experience",
    title: "Frontend & UI Development",
    subtitle: "Frontend Developer · SANDS S.A.S",
    summary:
      "Primer rol profesional en frontend: traduje diseños de Figma a interfaces web responsivas y entregué una librería de componentes reutilizables, con revisión de código antes de cada despliegue.",
    highlights: [
      { n: "Figma", l: "design → code" },
      { n: "UI Kit", l: "reusable components" },
      { n: "Responsive", l: "cross-device" },
    ],
    tech: ["React", "JavaScript", "HTML5", "CSS3", "Figma", "Git"],
    caseStudy: {
      overview:
        "Mi primer rol profesional como frontend. Me enfoqué en llevar diseños de Figma a producto real: interfaces responsivas fieles al diseño y una librería de componentes reutilizables que aceleró el trabajo del equipo y mantuvo la consistencia visual.",
      tech: ["React", "JavaScript", "HTML5", "CSS3", "Figma", "Git"],
      responsibilities: [
        "Traducción de diseños de Figma a UI responsiva",
        "Maquetación con HTML5, CSS3 y JavaScript",
        "Componentización de la interfaz con React",
        "Librería de componentes reutilizables",
        "Consistencia entre diseño y producto final",
        "Revisión de código antes de cada despliegue",
      ],
      learnings: [
        "Fidelidad de diseño a implementación",
        "Componentización y reutilización de UI",
        "Trabajo a partir de Figma",
        "Revisión de código y buenas prácticas de despliegue",
        "Primeros pasos en desarrollo profesional",
      ],
    },
  },
];

// ============================================================
//  ADDITIONAL PROJECTS — proyectos secundarios / académicos.
//
//  IMÁGENES: coloca tus capturas en /public/projects/ y referencia
//  la ruta en image (ej: "/projects/caribe-bloom.png").
//  Si dejas image vacío o null, se muestra la portada generada.
//  Tamaño ideal: 1600x900 (16:9). Formatos: .png / .jpg / .webp
// ============================================================
export const additionalProjects = [
  {
    name: "Idecorarte",
    mark: "Idecorarte",
    path: "~/idecorarte",
    tag: "En construcción",
    year: "2026",
    image: "", // ej: "/projects/idecorarte.webp"
    desc: "Sitio web profesional para una marca de decoración, regalos personalizados y detalles para ocasiones especiales: catálogo de productos, panel administrativo, SEO y analítica.",
    solve: "En desarrollo activo — experiencia pensada para móvil primero.",
    tech: ["En desarrollo"],
    link: "#contact",
  },
];

// ============================================================
//  STACK — cada tecnología con una nota corta que aparece en hover.
// ============================================================
export const stack = [
  {
    cat: "Frontend",
    items: [
      { n: "React", d: "Arquitectura por componentes, hooks y estado" },
      { n: "TypeScript", d: "Tipado estricto en aplicaciones empresariales" },
      { n: "JavaScript", d: "ES6+, asincronía y manipulación del DOM" },
      { n: "HTML / CSS", d: "Maquetación accesible y responsive" },
    ],
  },
  {
    cat: "Backend",
    items: [
      { n: "Python", d: "Servicios, scripting y automatización" },
      { n: "Flask", d: "Microservicios REST ligeros en producción" },
      { n: "Node.js", d: "APIs y herramientas de servidor" },
      { n: "Express", d: "Rutas, middleware y autenticación con JWT" },
      { n: "REST APIs", d: "Diseño e integración de endpoints" },
    ],
  },
  {
    cat: "AI",
    items: [
      { n: "OpenAI API", d: "Clasificación y análisis documental con LLMs" },
      { n: "Prompt engineering", d: "Prompts especializados por dominio" },
      { n: "AI integrations", d: "IA embebida en flujos de trabajo reales" },
      { n: "Make", d: "Orquestación híbrida no-code + código" },
    ],
  },
  {
    cat: "Data",
    items: [
      { n: "MySQL", d: "Modelado relacional y consultas" },
      { n: "SQL", d: "Joins, agregaciones y optimización" },
      { n: "Azure SQL", d: "Base de datos gestionada en la nube" },
    ],
  },
  {
    cat: "Tools",
    items: [
      { n: "Git & GitHub", d: "Ramas, pull requests y revisión de código" },
      { n: "SharePoint", d: "Aplicaciones internas corporativas" },
      { n: "Power Automate", d: "Flujos de negocio automatizados" },
      { n: "Railway", d: "Despliegue de servicios backend" },
      { n: "Figma", d: "Traducción de diseño a interfaz" },
    ],
  },
];

// ============================================================
//  HOW I BUILD — principios de ingeniería.
// ============================================================
export const principles = [
  {
    t: "Simple systems",
    d: "Prefiero una solución que se entiende en cinco minutos antes que una arquitectura que impresiona y nadie mantiene.",
  },
  {
    t: "Production first",
    d: "Un proyecto solo cuenta cuando alguien lo usa. Construyo pensando en el mantenimiento, no en la demo.",
  },
  {
    t: "AI with purpose",
    d: "La IA entra donde resuelve un problema medible, no para agregarle una etiqueta al proyecto.",
  },
  {
    t: "User-focused engineering",
    d: "Cada decisión técnica se justifica en el usuario final: menos fricción, menos pasos, menos errores.",
  },
];

// ============================================================
//  ABOUT — la columna izquierda es la ficha; la derecha el texto.
//  Usa {llaves} para resaltar palabras dentro del párrafo.
// ============================================================
export const aboutMeta = [
  { k: "Role", v: "Software Engineer" },
  { k: "Based in", v: "Barranquilla, Colombia" },
  { k: "Focus", v: "Building web products" },
  { k: "Interest", v: "AI enthusiast" },
];

export const about =
  "Soy ingeniero de sistemas enfocado en {construir software que se usa de verdad}. Me muevo cómodo entre frontend y backend, disfruto {resolver problemas reales de negocio} y trato cada proyecto como una oportunidad de aprender algo nuevo. Hoy combino {web moderna con IA aplicada} para entornos empresariales y clientes reales.";
