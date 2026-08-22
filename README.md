# Portafolio · Software Engineer

Portafolio personal en **React + Vite + Framer Motion**. Dark, minimalista, mobile-first.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:5173
```

Build de producción:

```bash
npm run build    # genera /dist
npm run preview  # previsualiza el build
```

## Cómo personalizar

Casi todo el contenido vive en **un solo archivo**:

```
src/data/content.js
```

Ahí editas: nombre, email, LinkedIn, GitHub, ruta del CV, métricas del hero,
experiencia, proyectos, stack y el texto de "About".

Otros puntos:

- **Tu CV**: coloca `cv.pdf` en `/public/` (el botón ya apunta a `/cv.pdf`).
- **Capturas de proyectos**: hoy los mockups se generan con CSS. Para usar imágenes
  reales, reemplaza el bloque `.proj-img` en `src/components/Projects.jsx` por una
  `<img>` y guarda las imágenes en `/public/`.
- **Colores y tipografías**: variables CSS al inicio de `src/index.css` (`:root`).
- **Favicon**: `/public/favicon.svg`.

## Estructura

```
src/
  data/content.js        ← TODO tu contenido
  index.css              ← sistema de diseño (tokens + estilos)
  App.jsx                ← composición de secciones
  components/
    Navbar.jsx  Hero.jsx  Experience.jsx  Projects.jsx
    TechStack.jsx  About.jsx  Contact.jsx  Footer.jsx
    Reveal.jsx           ← animación de entrada reutilizable
    icons.jsx            ← iconos SVG inline
```

## Deploy

Funciona tal cual en **Vercel** o **Netlify**: importa el repo, framework
detectado = Vite, build `npm run build`, output `dist`. Sin configuración extra.

## Accesibilidad / rendimiento

- `prefers-reduced-motion` respetado (Framer Motion + CSS).
- Foco de teclado visible.
- Sin dependencias pesadas: React, ReactDOM y Framer Motion.
