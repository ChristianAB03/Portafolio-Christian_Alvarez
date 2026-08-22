# Portafolio · Christian Álvarez

Portafolio personal de **Software Engineer**. Estética editorial dark, minimalista y responsive, construida con **React + Vite + Framer Motion**.

🔗 **En vivo:** _añade aquí la URL cuando despliegues_ · `https://…vercel.app`

---

## ✨ Qué incluye

- **Hero** con nameplate, glow que reacciona al cursor y "engineering snapshot".
- **Selected Work** — case studies con visual grande, meta (rol/tech/año) y modal de detalle.
- **Experience** — timeline editorial (freelance + roles).
- **Projects** — trabajo adicional; portada real o generada por CSS si falta la imagen.
- **Stack** — panel compacto con _readout_ interactivo (hover/tap sobre cada tecnología).
- **How I build**, **About** y **Contact** (WhatsApp, LinkedIn, GitHub, email).
- Cursor personalizado, líneas que se expanden, aparición al hacer scroll — todo sutil.

## 🚀 Arrancar

```bash
npm install
npm run dev      # http://localhost:5173
```

Build de producción:

```bash
npm run build    # genera /dist
npm run preview  # previsualiza el build
```

## 📝 Personalizar

Casi todo el contenido vive en **un solo archivo**:

```
src/data/content.js
```

Ahí editas: datos de contacto, snapshot del hero, case studies (`featured`),
experiencia (`experience`), proyectos (`additionalProjects`), `stack`,
`principles` y el texto de `about`.

**Imágenes de proyecto** — guárdalas en `public/projects/` (WebP, 16:9, ideal
1600×900) y referencia la ruta en el campo `image` del proyecto:

```js
image: "/projects/mi-proyecto.webp",   // ruta desde la raíz, SIN /public
```

Si dejas `image: ""`, se muestra una **portada generada** (retícula + monograma).

**Tu CV** — coloca el PDF en `public/cv.pdf` y cambia el interruptor en
`content.js`:

```js
cvReady: true,   // muestra los botones "Download CV"
```

Mientras esté en `false`, los botones de descarga se ocultan.

**Colores y tipografías** — tokens CSS al inicio de `src/index.css` (`:root`).
Fuentes: Space Grotesk (títulos), Inter (texto), JetBrains Mono (labels).

## 📁 Estructura

```
src/
  data/content.js        ← TODO el contenido editable
  index.css              ← sistema de diseño (tokens + estilos)
  App.jsx                ← composición de secciones
  components/
    Navbar.jsx  Hero.jsx  FeaturedWork.jsx  Experience.jsx
    Projects.jsx  TechStack.jsx  Principles.jsx  About.jsx
    Contact.jsx  Footer.jsx
    CaseStudyModal.jsx   ← modal de case study
    Media.jsx            ← imagen de proyecto / portada generada
    SectionHead.jsx      ← cabecera de sección reutilizable
    Reveal.jsx           ← aparición al entrar en viewport
    Cursor.jsx  Chrome.jsx   ← cursor y capas de fondo
    icons.jsx            ← iconos SVG inline
public/
  projects/              ← capturas de proyectos (.webp)
  cv.pdf                 ← tu CV (opcional; ver cvReady)
```

## ☁️ Deploy

Funciona tal cual en **Vercel** o **Netlify**: importa el repo, framework
detectado = **Vite**, build `npm run build`, output `dist`. Sin configuración extra.
Cada `git push` a `main` redespliega automáticamente.

## ♿ Accesibilidad y rendimiento

- `prefers-reduced-motion` respetado (Framer Motion + CSS).
- Foco de teclado visible; contacto y stack navegables por teclado.
- Contraste AA en textos sobre el fondo.
- Sin dependencias pesadas: React, ReactDOM y Framer Motion.

---

© 2026 Christian Álvarez
