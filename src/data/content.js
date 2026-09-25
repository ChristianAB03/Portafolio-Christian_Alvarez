// ============================================================
//  TODO TU CONTENIDO VIVE AQUÍ. Los componentes leen de este archivo.
//  Para cambiar textos, métricas, proyectos o el orden, edita aquí.
//
//  IDIOMAS: cada texto visible es t("English", "Español"). Lo que no se
//  traduce (nombres propios, tecnologías, URLs, años) es un valor plano.
//  Los componentes reciben el contenido ya resuelto con useContent().
//  Los textos de interfaz (botones, etiquetas) viven en src/i18n/ui.js.
// ============================================================
import { t } from "../i18n/t";

// Identidad de la nueva marca (rama redesign).
// monogram.src: archivo oficial del símbolo CA; se dibuja como SVG inline con
// <use> (vector a cualquier escala) y su geometría nunca se toca.
// viewBox / ratio: los del archivo (427 × 363).
export const brand = {
  monogram: { src: "/brand/ca-monogram.svg", viewBox: "0 0 427 363", ratio: 427 / 363 },
  // título profesional elegido por Christian: igual en ambos idiomas
  role: "Software Engineer & AI Architect",
  statement: t(
    "I design and build digital products, AI systems and automations, with an architecture built to last.",
    "Diseño y construyo productos digitales, sistemas de IA y automatizaciones, con una arquitectura pensada para durar."
  ),
  // síntesis para móvil (misma idea, menos palabras)
  statementShort: t(
    "Digital products, AI systems and automation.",
    "Productos digitales, sistemas de IA y automatización."
  ),
  // secciones y vistas del menú; las etiquetas están en ui.nav.links
  nav: ["work", "experiments", "about", "contact"],
};

// Selected Work (nueva marca). Los datos de cada pieza viven en `featured`
// (única fuente de verdad): name, layout, description, discipline, crop, alt.
export const selectedWork = {
  intro: t(
    "Digital products and systems I have designed and built.",
    "Productos y sistemas digitales que he diseñado y construido."
  ),
};

// ============================================================
//  EXPERIMENTS — lo que exploro. Cada entrada es una historia corta:
//  la pregunta, qué hice y qué salió. Contenido aportado por Christian
//  en español; la versión en inglés es su traducción.
//  related: id de `featured` cuando el experimento dio lugar a una pieza
//  de Selected Work (se enlaza a su case study en vez de repetirlo).
// ============================================================
export const experimentsIntro = t(
  "Questions I've chased, and what I found along the way.",
  "Preguntas que he perseguido y lo que encontré en el camino."
);

export const experiments = [
  {
    id: "doc-ai",
    // vista inicial breve; el resto del experimento se revela con "View more"
    short: t("AI Automation", "Automatización con IA"),
    summary: t(
      "AI-powered automation for legal document review and analysis.",
      "Automatización con IA para la revisión y el análisis de documentos jurídicos."
    ),
    tags: [t("AI", "IA"), t("Automation", "Automatización"), t("System design", "Diseño de sistemas")],
    problem: t(
      "Reduce the manual work of the reviewing lawyer in the legal and educational procedures of a Secretariat of Education.",
      "Reducir el trabajo manual del abogado revisor en los trámites jurídico-educativos de una Secretaría de Educación."
    ),
    built: t(
      "A microservice built with Python, Flask and the OpenAI API, integrated with Make and Dropbox.",
      "Un microservicio en Python, Flask y la API de OpenAI, integrado con Make y Dropbox."
    ),
    name: t(
      "AI-powered automation of legal document analysis and classification",
      "Automatización de análisis y clasificación documental jurídica con IA"
    ),
    period: t("Apr-Sep 2026", "Abr-Sep 2026"),
    state: t("In active development", "En desarrollo activo"),
    question: t(
      "How can AI automate the analysis of documents in the legal and educational procedures of a Secretariat of Education, and reduce the reviewing lawyer's manual work?",
      "¿Cómo usar IA para automatizar el análisis de documentos de trámites jurídico-educativos de una Secretaría de Educación y reducir el trabajo manual del abogado revisor?"
    ),
    did: [
      t(
        "I built a microservice with Python, Flask and the OpenAI API, integrated with Make and Dropbox and deployed on Railway. It receives emails with attached PDFs, classifies them, analyses them from a legal standpoint and returns structured results in HTML that are filed automatically in Dropbox.",
        "Desarrollé un microservicio en Python, Flask y la API de OpenAI, integrado con Make y Dropbox y desplegado en Railway, que recibe correos con PDFs adjuntos, los clasifica, los analiza jurídicamente y devuelve resultados estructurados en HTML que se archivan automáticamente en Dropbox."
      ),
      t(
        "I iterated on prompts and logic repeatedly to fix classification errors. For example, a duplicated change-of-holder case file was solved by strengthening the classifier and adding deduplication by NIT in code.",
        "Iteré prompts y lógica repetidamente para corregir errores de clasificación. Por ejemplo, la duplicación de un expediente de cambio de titular se resolvió reforzando el clasificador y agregando deduplicación por NIT en código."
      ),
    ],
    outcome: t(
      "The project changed direction. There is no longer an automatic verdict: each case file is saved to a PorRevisar folder with a suggested legal opinion, and the lawyer makes the final decision. Preventing contamination between case files moved from fail-closed logic to a deterministic assignment of documents by national ID number.",
      "El proyecto cambió de enfoque. Ya no hay veredicto automático: cada expediente se guarda en una carpeta PorRevisar con un concepto jurídico sugerido, y el abogado toma la decisión final. La prevención de contaminación entre expedientes pasó de una lógica fail-closed a una asignación determinista de documentos por cédula."
    ),
    // el cambio de modelo, contado como antes → después
    shift: {
      before: {
        tag: t("Up to v4.1", "Hasta v4.1"),
        title: t("Automatic verdict", "Veredicto automático"),
        detail: t(
          "APPROVED / NOT APPROVED, with fail-closed logic for contaminated documentation",
          "APROBADO / DESAPROBADO, con lógica fail-closed para la documentación contaminada"
        ),
      },
      after: {
        tag: t("Since v6.0", "Desde v6.0"),
        title: t(
          "The system analyses and routes; the lawyer decides.",
          "El sistema analiza y distribuye; el abogado decide."
        ),
      },
      states: {
        label: t("Suggested legal opinion (informational)", "Concepto jurídico sugerido (informativo)"),
        items: [
          t("Complete case file", "Expediente completo"),
          t("Ready for signature", "Viable para firma"),
          t("Pending supporting documents", "Pendiente por soportes"),
          t("Return for correction", "Devolver para corrección"),
          t("Requires manual validation", "Requiere validación manual"),
        ],
      },
    },
    modules: {
      label: t("Active modules in v6.2", "Módulos activos en v6.2"),
      items: [
        {
          name: t("Teacher career ladder (Escalafón docente)", "Escalafón docente"),
          detail: t("Tested with real cases", "Probado con casos reales"),
        },
        {
          name: t(
            "IVC: Inspection, Oversight and Control of educational institutions",
            "IVC: Inspección, Vigilancia y Control de establecimientos educativos"
          ),
          detail: t("8 subtypes", "8 subtipos"),
        },
        {
          name: t("Social Benefits Fund", "Fondo de Prestaciones Sociales"),
          detail: t(
            "5 subtypes: pensions, death insurance and allowance, appeals",
            "5 subtipos: pensiones, seguro y auxilio por muerte, recurso"
          ),
        },
        {
          name: t("Staffing (Planta de Personal)", "Planta de Personal"),
          detail: t(
            "19 subtypes: retirements, assignments, leaves, permits, job abandonment, among others",
            "19 subtipos: retiros, comisiones, licencias, permisos, abandono del cargo, entre otros"
          ),
        },
      ],
    },
    repoUrl: "https://github.com/ChristianAB03/juridico-service",
    related: "legal-ai",
  },
  {
    id: "ai-dev",
    name: t("AI-Augmented Development with Claude Code", "AI-Augmented Development con Claude Code"),
    period: "2026",
    question: t(
      "To what extent can tools like Claude Code or Codex truly become part of the development process — not only to generate code, but to analyse projects, debug errors, refactor and iterate on features?",
      "¿Hasta qué punto herramientas como Claude Code o Codex pueden integrarse de verdad al proceso de desarrollo, no solo para generar código, sino para analizar proyectos, depurar errores, refactorizar e iterar funcionalidades?"
    ),
    did: t(
      "I brought them into my real development workflow for debugging, refactoring, implementing and iterating on applications, combining them with my own review and judgement.",
      "Las incorporé a mi flujo real de desarrollo para depuración, refactorización, implementación e iteración de aplicaciones, combinándolas con revisión y criterio propio."
    ),
    outcome: t(
      "AI works best as an engineering tool within a controlled process, not simply as a code generator.",
      "La IA funciona mejor como herramienta de ingeniería dentro de un proceso controlado, no simplemente como generador de código."
    ),
  },
  {
    id: "vitrina-lab",
    name: "Vitrina Digital",
    subtitle: t("Digitalising local businesses", "Digitalización de negocios locales"),
    period: "2026",
    question: t(
      "How can you quickly build a web solution that gives small businesses a digital presence and lets them manage their information in one place?",
      "¿Cómo crear en poco tiempo una solución web que permita a pequeños negocios tener presencia digital y gestionar su información de manera centralizada?"
    ),
    did: t(
      "In one month I led frontend development within a team of 4, using React, with a Node, Express and MySQL backend.",
      "En un mes lideré el desarrollo frontend dentro de un equipo de 4, utilizando React, con backend en Node, Express y MySQL."
    ),
    outcome: t(
      "The project won 1st place at the Hackathon Soledad 2026.",
      "El proyecto obtuvo el 1.er puesto en el Hackathon Soledad 2026."
    ),
    related: "vitrina",
  },
];

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
  available: t(
    "Available for Software Engineer roles · 2026",
    "Disponible para roles de Software Engineer · 2026"
  ),
  // (sin uso en la nueva marca)
  heroLead:
    "Software Engineer enfocado en construir aplicaciones web modernas y soluciones impulsadas por IA. Experiencia desarrollando software en producción con React, TypeScript, Python y OpenAI para entornos empresariales y clientes reales.",
  // Columna mono a la izquierda del hero (máx. 3 palabras)
  heroRail: ["Building", "Digital", "Products"],
};

// ============================================================
//  ENGINEERING SNAPSHOT — cuatro métricas reales, no marketing.
//  (sin uso en la nueva marca)
// ============================================================
export const snapshot = [
  { n: "2", k: "Years", l: "Experience" },
  { n: "10+", k: "Apps", l: "In production" },
  { n: "#1", k: "Hackathon", l: "Soledad 2026", accent: true },
  { n: "AI", k: "OpenAI", l: "Integrations" },
];

// ============================================================
//  SELECTED WORK — case studies.
//  meta: k es la clave (role/tech/year/status); la etiqueta visible está en
//  ui.meta. live: true pinta la señal de "en línea" junto al estado.
//  Los campos sin t() que no se muestran (summary, kicker, title…) son del
//  sitio anterior y quedan como referencia.
// ============================================================
export const featured = [
  // ---------- 1. FORJA GYM — FEATURED PROJECT (demo desplegada) ----------
  {
    id: "forja",
    // --- Selected Work (nueva marca) ---
    name: "Forja Gym",
    layout: "bleed",
    description: t(
      "Concept site for a gym with eleven working screens: bookings, payments, a client portal and training calculators.",
      "Sitio conceptual para un gimnasio con once pantallas funcionales: reservas, pagos, un portal de cliente y calculadoras de entrenamiento."
    ),
    discipline: t("Frontend, design system", "Frontend, sistema de diseño"),
    crop: "18% 50%",
    alt: t(
      "Forja Gym landing page: dark gym photo with the headline Forja tu cuerpo y tu carácter and an orange booking button.",
      "Landing de Forja Gym: foto oscura de un gimnasio con el titular Forja tu cuerpo y tu carácter y un botón naranja de reserva."
    ),
    hero: true,
    image: "/projects/forja-gym.webp",
    path: "~/forja-gym-landing",
    mark: "Forja",
    kicker: "Featured project",
    title: "Forja Gym — Landing",
    subtitle: "Frontend · Design system · Performance",
    meta: [
      { k: "role", v: t("Design & development · solo", "Diseño y desarrollo · en solitario") },
      { k: "tech", v: "React · Vite · Tailwind v4" },
      { k: "year", v: "2026" },
      { k: "status", v: t("Live demo", "Demo en vivo"), live: true },
    ],
    summary:
      "Landing de una sola vista para un gimnasio, con once pantallas funcionales navegables —reservas, pagos, portal de cliente y calculadoras—. Pieza de portafolio construida para cuidar el sistema de diseño, el rendimiento y la accesibilidad.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Swiper"],
    liveUrl: "https://forja-gym-landing.vercel.app/",
    repoUrl: "https://github.com/ChristianAB03/forja-gym-landing",
    caseStudy: {
      problem: t(
        "A neighbourhood gym competes with chains that have marketing budgets, and its website is usually a brochure: opening hours, a phone number and little else. The hesitant visitor — will it be packed at that time? will they guide me if I've never trained? — finds no answer and doesn't come back.",
        "Un gimnasio de barrio compite con cadenas que tienen presupuesto de marketing, y su web suele ser un folleto: horarios, teléfono y poco más. El visitante que duda —¿estará lleno a esa hora?, ¿me sabrán guiar si nunca he entrenado?— no encuentra respuesta y no vuelve."
      ),
      overview: t(
        "Beyond presenting the gym, the page answers, on the site itself, the questions that hold back a sign-up, and turns the curious visitor into a lead. It is a demo project: Forja Gym is a fictional business, and payments and bookings are mock-ups that process nothing.",
        "Además de presentar el gimnasio, la página resuelve en el propio sitio las dudas que frenan una inscripción y convierte al curioso en un contacto. Es un proyecto de demostración: Forja Gym es un negocio ficticio, y los pagos y reservas son maquetas que no procesan nada."
      ),
      tech: ["React 18", "Vite 6", "Tailwind CSS 4", "Framer Motion 11", "Swiper 11", "Lucide"],
      features: [
        t("Visit and trial class booking", "Reserva de visita y clase de prueba"),
        t("Sign-up and payments (Nequi, Daviplata, PSE, card)", "Inscripción y pagos (Nequi, Daviplata, PSE, tarjeta)"),
        t("Client portal", "Portal del cliente"),
        t("Trainer booking", "Reserva de entrenador"),
        t("Shop and referrals", "Tienda y referidos"),
        t("Membership freeze", "Congelar membresía"),
        t("Body assessment (BMI, metabolism, calorie target)", "Diagnóstico corporal (IMC, metabolismo, objetivo calórico)"),
        t("Routine in 60 seconds", "Rutina en 60 segundos"),
      ],
      contributionLabel: "Qué construí",
      contribution: [
        t("Token-based design system", "Sistema de diseño con tokens"),
        t("15 landing sections", "15 secciones de la landing"),
        t("11 functional screens", "11 pantallas funcionales"),
        t("Performance budget", "Presupuesto de rendimiento"),
        t("AA accessibility", "Accesibilidad AA"),
        t("Live schedule by time zone", "Horario en vivo por zona horaria"),
      ],
      technicalDecisions: t(
        "The whole palette is defined in oklch, not hex: the first value is real perceptual lightness, so the scale stays coherent instead of piling up colours picked by eye. The orange scale rotates the hue from 62 to 40 as it darkens (real light shifts towards red as it dims), and the background uses a warm hue that mimics a gym's tungsten lighting instead of a bluish software black. Tokens live in @theme (Tailwind v4), with no tailwind.config.js: changing a token repaints the entire site.",
        "Toda la paleta se define en oklch, no en hex: el primer valor es luminosidad perceptual real, así que la escala es coherente en lugar de acumular colores elegidos a ojo. La escala de naranja rota el matiz de 62 a 40 al oscurecer (la luz real tira a rojo al apagarse) y el fondo usa un matiz cálido que imita la iluminación de tungsteno de un gimnasio en vez de un negro azulado de software. Los tokens viven en @theme (Tailwind v4), sin tailwind.config.js: cambiar un token repinta el sitio entero."
      ),
      modular: t(
        "Initial load ≈ 128 KB gzip. The eleven functional screens are split into a separate chunk and load only after the first interaction, preloaded in requestIdleCallback so the first click opens instantly. Swiper stays out of startup — the testimonials mount on the first scroll — and manualChunks splits React, Framer Motion and Swiper so they are cached across deploys.",
        "Carga inicial ≈ 128 KB gzip. Las once pantallas funcionales se separan en un chunk aparte y se cargan solo tras la primera interacción, con precarga en requestIdleCallback para que el primer clic abra al instante. Swiper no entra en el arranque —los testimonios se montan al primer scroll— y manualChunks separa React, Framer Motion y Swiper para que se cacheen entre despliegues."
      ),
      learnings: [
        t("prefers-reduced-motion in two layers (CSS + MotionConfig)", "prefers-reduced-motion en dos capas (CSS + MotionConfig)"),
        t("Parallax that animates only translateY (GPU compositing)", "Parallax que anima solo translateY (composición en GPU)"),
        t("Correct time zone with Intl.DateTimeFormat", "Zona horaria correcta con Intl.DateTimeFormat"),
        t("Contrast verified token by token (AA)", "Contraste verificado token por token (AA)"),
        t("Modals with focus trapping and restoration", "Modales con foco atrapado y restauración"),
      ],
    },
  },

  // ---------- 2. VITRINA EMPRESARIAL — case study ----------
  {
    id: "vitrina",
    // --- Selected Work (nueva marca) ---
    name: "Soledad Conecta",
    layout: "inset",
    description: t(
      "Digital showcase for entrepreneurs in Soledad, with business profiles, product catalogues and an admin platform.",
      "Vitrina digital para emprendedores de Soledad, con perfiles de negocio, catálogos de productos y una plataforma de administración."
    ),
    discipline: t("Frontend, team of four", "Frontend, equipo de cuatro"),
    note: t("Winner, Hackathon Soledad 2026", "Ganador, Hackathon Soledad 2026"),
    crop: "50% 0%",
    alt: t(
      "Soledad Conecta home page: search for local businesses, category filters and a grid of entrepreneur profiles.",
      "Página de inicio de Soledad Conecta: buscador de negocios locales, filtros por categoría y una cuadrícula de perfiles de emprendedores."
    ),
    image: "/projects/soledad_conecta.webp",
    path: "~/soledad-conecta",
    mark: "Soledad",
    kicker: "Hackathon winner",
    title: "Vitrina Empresarial Digital",
    subtitle: "Frontend Developer · Equipo de 4",
    award: "#1 Winner",
    awardContext: "Hackathon Soledad 2026",
    meta: [
      { k: "role", v: t("Frontend · Admin dashboard", "Frontend · Panel de administración") },
      { k: "tech", v: "React · Express · MySQL" },
      { k: "year", v: "2026" },
      { k: "status", v: t("Live", "En línea"), live: true },
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
      overview: t(
        "A digital platform designed to boost the visibility of entrepreneurs in the municipality of Soledad through business profiles, a product catalogue, interaction metrics and administrative management.",
        "Plataforma digital diseñada para impulsar la visibilidad de emprendedores del municipio de Soledad mediante perfiles empresariales, catálogo de productos, métricas de interacción y gestión administrativa."
      ),
      tech: ["React", "Node.js", "Express", "MySQL", "JWT"],
      contributionLabel: "Mi responsabilidad principal",
      contribution: [
        t("Admin dashboard", "Dashboard Admin"),
        t("User management", "Gestión de Usuarios"),
        t("Category management", "Gestión de Categorías"),
        t("Global metrics", "Métricas Globales"),
        t("PQRS admin", "PQRS Admin"),
        "PrivateRoute",
        t("Integration with admin endpoints", "Integración con endpoints administrativos"),
      ],
      architecture: {
        label: t("Simplified architecture", "Arquitectura simplificada"),
        nodes: [
          t("Citizen", "Ciudadano"),
          t("React frontend", "Frontend React"),
          t("Express API", "API Express"),
          "JWT",
          "MySQL",
          t("Admin dashboard", "Dashboard Admin"),
        ],
        note: t(
          "Conceptual diagram of the data flow and the authentication layer.",
          "Diagrama conceptual del flujo de datos y la capa de autenticación."
        ),
      },
      result: t(
        "Winning project of the Hackathon Soledad 2026. Developed and deployed in about a month using an agile methodology.",
        "Proyecto ganador del Hackathon Soledad 2026. Desarrollado y desplegado en aproximadamente un mes mediante metodología ágil."
      ),
      learnings: [
        t("Working under pressure", "Trabajo bajo presión"),
        t("Collaborative development", "Desarrollo colaborativo"),
        t("Frontend-backend integration", "Integración frontend-backend"),
        t("Role and permission management", "Gestión de roles y permisos"),
        t("Building admin panels", "Construcción de paneles administrativos"),
      ],
    },
  },

  // ---------- 3. LEGAL AI ----------
  {
    id: "legal-ai",
    // --- Selected Work (nueva marca) ---
    name: "AI Legal Review",
    layout: "type",
    description: t(
      "Reviews administrative acts before signing. AI classifies each case and runs a specialised legal analysis inside the client's email workflow.",
      "Revisa actos administrativos antes de la firma. La IA clasifica cada caso y ejecuta un análisis jurídico especializado dentro del flujo de correo del cliente."
    ),
    discipline: t("Architecture, backend, AI", "Arquitectura, backend, IA"),
    note: t("Built for a real client", "Construido para un cliente real"),
    crop: "52% 42%",
    alt: t(
      "Make scenario behind the legal review system: an email trigger branching into a column of automated steps.",
      "Escenario de Make detrás del sistema de revisión jurídica: un disparador de correo que se ramifica en una columna de pasos automatizados."
    ),
    image: "/projects/automatizacion.webp",
    path: "~/legal-ai",
    mark: "Legal AI",
    kicker: "Case study",
    title: "AI-Powered Legal Review System",
    subtitle: "Arquitectura · Backend · Integración de IA",
    status: "En desarrollo para cliente real",
    meta: [
      { k: "role", v: t("Architecture · Backend · AI", "Arquitectura · Backend · IA") },
      { k: "tech", v: "Python · Flask · OpenAI" },
      { k: "year", v: "2025-2026" },
      { k: "status", v: t("In development", "En desarrollo") },
    ],
    summary:
      "Sistema que automatiza la revisión jurídica preventiva de actos administrativos antes de la firma, reduciendo tiempo y errores mediante clasificación y análisis especializado con IA.",
    repoUrl: "https://github.com/ChristianAB03/juridico-service",
    tech: ["Python", "Flask", "OpenAI API", "Make", "Railway"],
    caseStudy: {
      problem: t(
        "Reduce the time and errors in the preventive legal review of administrative acts before signing.",
        "Reducir el tiempo y los errores en la revisión jurídica preventiva de actos administrativos antes de la firma."
      ),
      tech: ["Python", "Flask", "OpenAI API", "Make", "Railway", "Gmail", "Dropbox"],
      architecture: {
        label: t("System flow", "Flujo del sistema"),
        nodes: [
          t("Incoming email", "Correo recibido"),
          "Gmail",
          "Make",
          "Flask (Railway)",
          t("AI classification", "Clasificación IA"),
          t("Specialised AI analysis", "Análisis IA especializado"),
          "JSON",
          "Dropbox",
          t("Lawyer", "Abogado"),
        ],
        note: t(
          "Conceptual end-to-end flow, from the incoming email to the result delivered to the lawyer.",
          "Flujo conceptual de extremo a extremo, del correo de entrada al resultado entregado al abogado."
        ),
      },
      features: [
        t("Automatic case classification", "Clasificación automática de casos"),
        t("Legal data extraction", "Extracción de datos jurídicos"),
        t("Specialised analysis by category", "Análisis especializado por categoría"),
        t(
          "Analysis and comparison of the data needed to review the case",
          "Análisis y comparación de los datos necesarios para la revisión del caso"
        ),
        t("Inconsistency detection", "Detección de inconsistencias"),
        t("Automatic organisation of results", "Organización automática de resultados"),
      ],
      delivers: [
        t("Automatic classification", "Clasificación automática"),
        t("Structured legal analysis", "Análisis jurídico estructurado"),
        t("Data extraction", "Extracción de datos"),
        t("Recommendations", "Recomendaciones"),
        t(
          "Suggested opinion for the lawyer, who makes the final decision",
          "Concepto sugerido para el abogado, que toma la decisión final"
        ),
        t("Automatic organisation in Dropbox", "Organización automática en Dropbox"),
      ],
      contribution: [
        t("Architecture design", "Diseño de arquitectura"),
        t("Flask microservice development", "Desarrollo del microservicio Flask"),
        t("OpenAI integration", "Integración OpenAI"),
        t("Prompt engineering", "Ingeniería de prompts"),
        t("Make integration", "Integración Make"),
        t("Deployment on Railway", "Despliegue en Railway"),
      ],
      technicalDecisions: t(
        "No web interface was built because the client already used Gmail and Dropbox in their daily workflow. The solution was designed to fit into the existing process instead of forcing the user to learn a new tool.",
        "No se desarrolló una interfaz web porque el cliente ya utilizaba Gmail y Dropbox en su flujo diario. La solución fue diseñada para integrarse al proceso existente en lugar de obligar al usuario a aprender una nueva herramienta."
      ),
      modular: t(
        "Each case type uses specialised legal prompts. The system makes two independent calls to OpenAI — classification and specialised analysis — which significantly improves accuracy compared with a single generic analysis.",
        "Cada tipo de caso utiliza prompts jurídicos especializados. El sistema realiza dos llamadas independientes a OpenAI —clasificación y análisis especializado—, lo que mejora significativamente la precisión frente a un único análisis genérico."
      ),
      learnings: [
        t("Integrating AI into real processes", "Integración de IA en procesos reales"),
        t("Document automation", "Automatización documental"),
        t("Hybrid no-code + code architectures", "Arquitecturas híbridas no-code + código"),
        t("Prompt engineering", "Ingeniería de prompts"),
        t("Building for real clients", "Desarrollo para clientes reales"),
      ],
    },
  },

  // ---------- 4. APPARCACUC — case study full-stack ----------
  {
    id: "apparcacuc",
    // --- Selected Work (nueva marca) ---
    name: "ApparcaCUC",
    layout: "panorama",
    description: t(
      "Smart parking for a university campus: live space availability, QR bookings and simulated IoT sensors.",
      "Parqueo inteligente para un campus universitario: disponibilidad de espacios en tiempo real, reservas con QR y sensores IoT simulados."
    ),
    discipline: t("Full stack, university project", "Full stack, proyecto universitario"),
    crop: "50% 12%",
    alt: t(
      "ApparcaCUC home page: headline about finding and booking campus parking next to a live availability grid.",
      "Página de inicio de ApparcaCUC: titular sobre encontrar y reservar parqueadero en el campus junto a una cuadrícula de disponibilidad en vivo."
    ),
    image: "/projects/apparcacuc.webp",
    path: "~/apparcacuc",
    mark: "ApparcaCUC",
    kicker: "Case study",
    title: "ApparcaCUC — Gestión de parqueaderos",
    subtitle: "Full Stack · Proyecto universitario",
    meta: [
      { k: "role", v: t("Full-stack · solo", "Full-stack · en solitario") },
      { k: "tech", v: "React · Express · MongoDB" },
      { k: "year", v: "2026" },
      { k: "status", v: t("Live demo", "Demo en vivo"), live: true },
    ],
    summary:
      "Plataforma de Smart Parking para comunidades universitarias: disponibilidad de espacios en tiempo real, reservas con código QR y simulación de sensores IoT desde un panel administrativo. Evolución de un proyecto de aula a una demo full-stack funcional.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://apparcacuc.vercel.app/",
    repoUrl: "https://github.com/ChristianAB03/ApparcaCUC",
    caseStudy: {
      problem: t(
        "On campus, finding parking usually means driving around with no information about where there is space, which causes delays at the entrance and traffic congestion. ApparcaCUC digitises the car park: it centralises real-time availability and lets people book in advance, reducing friction across the whole process.",
        "En el campus, encontrar estacionamiento suele implicar dar vueltas sin información sobre dónde hay espacio, lo que genera demoras en el ingreso y congestión vehicular. ApparcaCUC digitaliza el parqueadero: centraliza la disponibilidad en tiempo real y permite reservar con anticipación, reduciendo la fricción de todo el proceso."
      ),
      overview: t(
        "Full-stack Smart Parking in a monorepo (frontend, REST API and database). Users see the car park map in real time and book with a QR code; an admin panel manages spaces, bookings, users and analytics, with an IoT sensor simulator that feeds the whole system.",
        "Smart Parking full-stack en un monorepo (frontend, API REST y base de datos). Los usuarios ven el mapa del parqueadero en tiempo real y reservan con QR; un panel administrativo gestiona espacios, reservas, usuarios y analíticas, con un simulador de sensores IoT que alimenta todo el sistema."
      ),
      tech: [
        "React", "TypeScript", "Vite", "Tailwind CSS",
        "Node.js", "Express", "MongoDB", "Mongoose",
        "JWT", "TanStack Query", "Recharts",
        "Vercel", "Render", "MongoDB Atlas",
      ],
      architecture: {
        label: t("Architecture and deployment", "Arquitectura y despliegue"),
        nodes: [
          t("User / Admin", "Usuario / Admin"),
          "React SPA · Vite (Vercel)",
          "API REST · Express + JWT (Render)",
          "MongoDB Atlas",
        ],
        note: t(
          "A booking follows the cycle QR → access simulator → validation → space status change; the IoT simulator and the bookings update the map and dashboard via polling. The database lives in Atlas through environment variables, decoupled from the backend.",
          "La reserva sigue el ciclo QR → simulador de acceso → validación → cambio de estado del espacio; el simulador IoT y las reservas actualizan mapa y dashboard por polling. La base vive en Atlas vía variables de entorno, desacoplada del backend."
        ),
      },
      contributionLabel: "Qué construí",
      contribution: [
        t("Full-stack monorepo architecture", "Arquitectura full-stack en monorepo"),
        t("JWT authentication and user / admin roles", "Autenticación JWT y roles usuario / admin"),
        t("Interactive map and QR bookings", "Mapa interactivo y reservas con QR"),
        t("IoT sensor and access simulator", "Simulador de sensores IoT y de acceso"),
        t("Admin panel: spaces, bookings, users, analytics", "Panel admin: espacios, reservas, usuarios, analíticas"),
        t("Custom, responsive and accessible design system", "Sistema de diseño propio, responsive y accesible"),
        t("Deployment on Vercel + Render + MongoDB Atlas", "Despliegue Vercel + Render + MongoDB Atlas"),
      ],
      technicalDecisions: [
        t(
          "Decoupled IoT simulation: a single state-change service updates the map, dashboard, statistics and audit log; with physical sensors, only the source of the events would need to change.",
          "Simulación IoT desacoplada: un único servicio de cambio de estado actualiza mapa, dashboard, estadísticas y auditoría; con sensores físicos bastaría cambiar el origen de los eventos."
        ),
        t(
          "Atomic booking with a conditional findOneAndUpdate: prevents double bookings and race conditions without needing transactions.",
          "Reserva atómica con findOneAndUpdate condicional: evita dobles reservas y condiciones de carrera sin necesidad de transacciones."
        ),
        t(
          "Real time via polling with TanStack Query: a simple solution that is enough for the demo, leaving WebSockets as a next step.",
          "Tiempo real por polling con TanStack Query: solución simple y suficiente para la demo, dejando WebSockets como evolución."
        ),
        t(
          "Frictionless DX: fallback to in-memory MongoDB + auto-seed, so the project can be cloned and run without installing a database.",
          "DX sin fricción: fallback a MongoDB en memoria + auto-seed para clonar y ejecutar sin instalar una base de datos."
        ),
        t(
          "Server-side security: authorisation by role and ownership, validation with Zod .strict() and sanitisation against NoSQL injection.",
          "Seguridad en el servidor: autorización por rol y ownership, validación con Zod .strict() y sanitización frente a NoSQL injection."
        ),
        t(
          "Performance: per-route code-splitting that cuts the initial bundle from ~1 MB to ~500 KB.",
          "Rendimiento: code-splitting por ruta que reduce el bundle inicial de ~1 MB a ~500 KB."
        ),
        t(
          "Decoupled infrastructure: the database lives in MongoDB Atlas through environment variables; the backend could move off Render without touching the DB.",
          "Infraestructura desacoplada: la base vive en MongoDB Atlas vía variables de entorno; el backend podría migrar de Render sin tocar la DB."
        ),
      ],
      learnings: [
        t("Designing a layered REST API (routes → controllers → services)", "Diseñar una API REST por capas (routes → controllers → services)"),
        t("JWT and access control by role and ownership on the server", "JWT y control de acceso por rol y ownership desde el servidor"),
        t("Modelling with MongoDB / Mongoose and atomic operations", "Modelado con MongoDB / Mongoose y operaciones atómicas"),
        t(
          "Server state on the client with TanStack Query (cache, invalidation, polling)",
          "Estado del servidor en el cliente con TanStack Query (caché, invalidación, polling)"
        ),
        t("Web security: validation, sanitisation, CORS and rate limiting", "Seguridad web: validación, sanitización, CORS y rate limiting"),
        t(
          "App / infrastructure separation: independent frontend, backend and DB",
          "Separación app / infraestructura: frontend, backend y DB independientes"
        ),
        t("Full-stack deployment: Vercel + Render + MongoDB Atlas", "Despliegue full-stack: Vercel + Render + MongoDB Atlas"),
      ],
    },
  },
];

// ============================================================
//  EXPERIENCE — historial de ingeniería (timeline editorial).
//  role: título del puesto; se mantiene en inglés salvo "Intern".
// ============================================================
export const experienceIntro = t(
  "Where I've worked, and what I did there.",
  "Dónde he trabajado y qué hice allí."
);

export const experience = [
  // ---------- FREELANCE (track actual) ----------
  {
    id: "freelance",
    period: t("2024 — Present", "2024 — Presente"),
    current: true,
    company: "Freelance",
    logos: [{ id: "freelance", src: "/brand/logos/freelance-workspace.webp" }],
    role: "Software Engineer",
    image: "",
    kicker: "Independent work",
    title: "Freelance Software Engineering",
    subtitle: "Software Engineer · Proyectos para clientes reales",
    summary: t(
      "Alongside my roles, I independently build web applications and AI solutions for real clients — including an automation system for legal review — taking care of architecture, development and deployment.",
      "En paralelo a mis roles, desarrollo aplicaciones web y soluciones con IA para clientes reales de forma independiente —incluido un sistema de automatización para revisión jurídica—, encargándome de la arquitectura, el desarrollo y el despliegue."
    ),
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
    period: t("Jul 2025 — Jan 2026", "Jul 2025 — Ene 2026"),
    current: false,
    company: "PersonalSoft",
    logos: [
      { id: "personalsoft", src: "/brand/logos/personalsoft.webp" },
      { id: "sura", src: "/brand/logos/sura.webp" },
    ],
    role: t("Frontend Developer · Intern", "Frontend Developer · Practicante"),
    client: "Seguros SURA",
    image: "", // banner del case study
    kicker: "Professional experience",
    title: "Enterprise Frontend Development",
    subtitle: "Frontend Developer Intern · PersonalSoft · Seguros SURA",
    summary: t(
      "University internship developing and maintaining more than ten internal applications used by different areas of the organisation, built on React, TypeScript and the Power Platform ecosystem.",
      "Práctica profesional universitaria desarrollando y manteniendo más de diez aplicaciones internas usadas por distintas áreas de la organización, sobre React, TypeScript y el ecosistema Power Platform."
    ),
    highlights: [
      { n: "+10", l: "applications" },
      { n: "Prod.", l: "in production" },
      { n: "SP / PP", l: "SharePoint & Power Platform" },
    ],
    tech: ["React", "TypeScript", "SharePoint", "Power Automate", "REST APIs"],
    caseStudy: {
      overview: t(
        "During my university internship I took part in developing and maintaining multiple internal applications used by different areas of the organisation. The work combined building new interfaces, evolving existing applications and fixing issues in software already in production.",
        "Durante mi práctica profesional universitaria participé en el desarrollo y mantenimiento de múltiples aplicaciones internas utilizadas por diferentes áreas de la organización. El trabajo combinó construcción de nuevas interfaces, evolución de aplicaciones existentes y corrección de incidencias en software ya en producción."
      ),
      tech: ["React", "TypeScript", "JavaScript", "SharePoint", "Power Automate", "REST APIs"],
      responsibilities: [
        t("Enterprise interface development", "Desarrollo de interfaces empresariales"),
        t("Building complex forms", "Construcción de formularios complejos"),
        t("API integration", "Integración con APIs"),
        t("Business validations", "Validaciones de negocio"),
        t("Evolutionary maintenance", "Mantenimiento evolutivo"),
        t("Issue fixing", "Corrección de incidencias"),
        t("User experience optimisation", "Optimización de experiencia de usuario"),
        t("Code review", "Revisión de código"),
      ],
      architecture: {
        label: "Arquitectura simplificada",
        nodes: ["Usuario", "React Frontend", "REST APIs", "SharePoint", "Power Automate"],
        note: "Diagrama conceptual simplificado. No representa la arquitectura interna real.",
      },
      // nombres internos de las aplicaciones: no se traducen
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
        t("Enterprise development", "Desarrollo empresarial"),
        t("Maintaining software in production", "Mantenimiento de software en producción"),
        t("Working with multiple stakeholders", "Trabajo con múltiples stakeholders"),
        t("Business-oriented development", "Desarrollo orientado a negocio"),
        t("Evolving existing applications", "Evolución de aplicaciones existentes"),
      ],
      confidentiality: t(
        "For confidentiality reasons, the source code, screenshots and data of these applications cannot be shared publicly.",
        "Por motivos de confidencialidad, el código fuente, capturas y datos de estas aplicaciones no pueden compartirse públicamente."
      ),
    },
  },

  // ---------- SANDS S.A.S ----------
  {
    id: "sands",
    period: t("Jul — Dec 2024", "Jul — Dic 2024"),
    current: false,
    company: "SANDS S.A.S",
    logos: [{ id: "sands", src: "/brand/logos/sands.webp" }],
    role: "Frontend Developer",
    image: "",
    kicker: "Professional experience",
    title: "Frontend & UI Development",
    subtitle: "Frontend Developer · SANDS S.A.S",
    summary: t(
      "My first professional frontend role: I turned Figma designs into responsive web interfaces and delivered a library of reusable components, with code review before each deployment.",
      "Primer rol profesional en frontend: traduje diseños de Figma a interfaces web responsivas y entregué una librería de componentes reutilizables, con revisión de código antes de cada despliegue."
    ),
    highlights: [
      { n: "Figma", l: "design → code" },
      { n: "UI Kit", l: "reusable components" },
      { n: "Responsive", l: "cross-device" },
    ],
    tech: ["React", "JavaScript", "HTML5", "CSS3", "Figma", "Git"],
    caseStudy: {
      overview: t(
        "My first professional role in frontend. I focused on bringing Figma designs to a real product: responsive interfaces faithful to the design and a library of reusable components that sped up the team's work and kept the visual consistency.",
        "Mi primer rol profesional como frontend. Me enfoqué en llevar diseños de Figma a producto real: interfaces responsivas fieles al diseño y una librería de componentes reutilizables que aceleró el trabajo del equipo y mantuvo la consistencia visual."
      ),
      tech: ["React", "JavaScript", "HTML5", "CSS3", "Figma", "Git"],
      responsibilities: [
        t("Translating Figma designs into responsive UI", "Traducción de diseños de Figma a UI responsiva"),
        t("Layout with HTML5, CSS3 and JavaScript", "Maquetación con HTML5, CSS3 y JavaScript"),
        t("Componentising the interface with React", "Componentización de la interfaz con React"),
        t("Reusable component library", "Librería de componentes reutilizables"),
        t("Consistency between design and final product", "Consistencia entre diseño y producto final"),
        t("Code review before each deployment", "Revisión de código antes de cada despliegue"),
      ],
      learnings: [
        t("Design-to-implementation fidelity", "Fidelidad de diseño a implementación"),
        t("UI componentisation and reuse", "Componentización y reutilización de UI"),
        t("Working from Figma", "Trabajo a partir de Figma"),
        t("Code review and good deployment practices", "Revisión de código y buenas prácticas de despliegue"),
        t("First steps in professional development", "Primeros pasos en desarrollo profesional"),
      ],
    },
  },
];

// Lo que estoy construyendo ahora (Building). Descripciones definitivas
// aportadas por Christian; no se añaden estados, fechas ni stack.
// type: naturaleza del producto, solo cuando la descripción lo dice explícitamente.
export const buildingIntro = t("What I'm building right now.", "Lo que estoy construyendo ahora.");

export const building = [
  {
    id: "idecorarte",
    name: "Idecorarte",
    type: t("Web platform", "Plataforma web"),
    // línea de contexto: condensada de la descripción, para la vista breve (móvil)
    context: t(
      "Interactive catalogue, product customisation and admin panel.",
      "Catálogo interactivo, personalización de productos y panel administrativo."
    ),
    image: "/projects/idecorarte.webp",
    alt: t(
      "Idecorarte home page: the headline Creamos detalles que convierten momentos en recuerdos next to a floral arrangement, above a carousel of gift boxes.",
      "Página de inicio de Idecorarte: el titular Creamos detalles que convierten momentos en recuerdos junto a un arreglo floral, sobre un carrusel de cajas de regalo."
    ),
    // encuadre dentro del marco (object-position)
    crop: "50% 0",
    description: t(
      "Development of a web platform for a decoration and personalised gifts brand, with an interactive catalogue, product customisation, seasonal campaigns and an admin panel to manage content.",
      "Desarrollo de una plataforma web para una marca de decoración y regalos personalizados, con catálogo interactivo, personalización de productos, campañas estacionales y panel administrativo para gestionar contenido."
    ),
  },
  {
    id: "color-factory",
    name: "Color Factory",
    type: "Ecommerce",
    context: t(
      "Visual product customiser, orders, online payments and production tracking.",
      "Personalizador visual de productos, pedidos, pagos en línea y seguimiento de producción."
    ),
    image: "/projects/color-factory.webp",
    alt: t(
      "Color Factory product customiser: the heading Personaliza tu producto, a black t-shirt preview and a grid of products to choose from.",
      "Personalizador de productos de Color Factory: el encabezado Personaliza tu producto, la vista previa de una camiseta negra y una cuadrícula de productos para elegir."
    ),
    // encuadre dentro del marco (object-position)
    crop: "36% 0",
    description: t(
      "Development of an ecommerce platform for a printing and customisation brand, with a configurable catalogue, visual product customiser, design management, orders, online payments and production tracking.",
      "Desarrollo de una plataforma ecommerce para una marca de impresión y personalización, con catálogo configurable, personalizador visual de productos, gestión de diseños, pedidos, pagos en línea y seguimiento de producción."
    ),
  },
  {
    id: "vidrios-marquez",
    name: "Vidrios Márquez",
    type: t("Web platform", "Plataforma web"),
    context: t(
      "Interactive quote builder, configurable product sheets and WhatsApp integration.",
      "Cotizador interactivo, fichas configurables e integración con WhatsApp."
    ),
    image: "/projects/vidrios-marquez.webp",
    alt: t(
      "Vidrios Márquez home page: the headline about glass, mirrors and solutions for your spaces above a carousel of installed projects.",
      "Página de inicio de Vidrios Márquez: el titular sobre vidrios, espejos y soluciones para tus espacios, sobre un carrusel de proyectos instalados."
    ),
    // encuadre dentro del marco (object-position)
    crop: "50% 0",
    description: t(
      "Development of a web platform for a glass solutions company, with a product catalogue, configurable product sheets, an interactive quote builder, content management, an admin panel, authentication, quote persistence and WhatsApp integration.",
      "Desarrollo de una plataforma web para una empresa de soluciones en vidrio, con catálogo de productos, fichas configurables, cotizador interactivo, gestión de contenido, panel administrativo, autenticación, persistencia de cotizaciones e integración con WhatsApp."
    ),
  },
];

// ============================================================
//  STACK — índice tipográfico de About (categoría + herramientas).
//  d: nota corta de cada herramienta (sin uso en la nueva marca).
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
    cat: t("AI", "IA"),
    items: [
      { n: "OpenAI API", d: "Clasificación y análisis documental con LLMs" },
      { n: t("Prompt engineering", "Ingeniería de prompts"), d: "Prompts especializados por dominio" },
      { n: t("AI integrations", "Integraciones de IA"), d: "IA embebida en flujos de trabajo reales" },
      { n: "Make", d: "Orquestación híbrida no-code + código" },
    ],
  },
  {
    cat: t("Data", "Datos"),
    items: [
      { n: "MySQL", d: "Modelado relacional y consultas" },
      { n: "SQL", d: "Joins, agregaciones y optimización" },
      { n: "Azure SQL", d: "Base de datos gestionada en la nube" },
    ],
  },
  {
    cat: t("Tools", "Herramientas"),
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
//  ABOUT — la columna izquierda es la ficha; la derecha el texto.
//  Usa {llaves} para resaltar palabras dentro del párrafo.
// ============================================================
// Contact: titular que ya usaba el sitio anterior.
export const contactTitle = t("Let's build something useful.", "Construyamos algo útil.");

// k: clave interna (About lee "Focus"); solo v se muestra.
export const aboutMeta = [
  { k: "Role", v: "Software Engineer" },
  { k: "Based in", v: "Barranquilla, Colombia" },
  { k: "Focus", v: t("Building web products", "Construir productos web") },
  { k: "Interest", v: "AI enthusiast" },
];

export const about = t(
  "I'm a systems engineer focused on {building software that actually gets used}. I move comfortably between frontend and backend, I enjoy {solving real business problems} and I treat every project as a chance to learn something new. Today I combine {modern web with applied AI} for enterprise environments and real clients.",
  "Soy ingeniero de sistemas enfocado en {construir software que se usa de verdad}. Me muevo cómodo entre frontend y backend, disfruto {resolver problemas reales de negocio} y trato cada proyecto como una oportunidad de aprender algo nuevo. Hoy combino {web moderna con IA aplicada} para entornos empresariales y clientes reales."
);
