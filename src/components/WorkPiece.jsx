import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ProjectMeta, ProjectActions } from "./ProjectMeta";
import { Arrow } from "./icons";
import { srcSetOf, WORK_SIZES } from "./projectImage";
import useMedia, { MOBILE } from "./useMedia";
import { useUI } from "../i18n";

const EASE = [0.22, 0.61, 0.36, 1];

// Una pieza de la exposición. Los bloques (cabecera, historia, ficha, acciones
// e imagen) son los mismos en todas; `project.layout` decide cómo se componen.
// La imagen es la entrada visual al case study cuando existe.
export default function WorkPiece({ project, index, onOpen }) {
  const frame = useRef(null);
  const ui = useUI().common;
  const n = String(index + 1).padStart(2, "0");
  const hasCase = Boolean(project.caseStudy);
  const open = () => onOpen(project.id, frame.current);
  // en móvil la imagen se revela con una máscara y el título entra después
  const mobile = useMedia(MOBILE);
  const reduce = useReducedMotion();
  const reveal = mobile && !reduce;
  // el marco (no recortado) decide cuándo entra la imagen
  const media = useRef(null);
  const inView = useInView(media, { once: true, amount: 0.2 });
  const state = inView ? "shown" : "hidden";

  const image = (
    <div className="sw-zoom">
      <motion.img
        src={project.image}
        srcSet={srcSetOf(project.image)}
        sizes={WORK_SIZES[project.layout] || "100vw"}
        alt={project.alt}
        loading={reveal ? "eager" : "lazy"}
        decoding="async"
        style={{ objectPosition: project.crop }}
        // hereda el disparo de la pieza (una imagen recortada al 100% no cuenta
        // como visible para el navegador y nunca dispararía ni cargaría)
        initial="hidden"
        animate={state}
        variants={{
          hidden: reveal ? { clipPath: "inset(0 0 100% 0)", scale: 1.04 } : { opacity: 0, scale: 1.06 },
          shown: reveal ? { clipPath: "inset(0 0 0% 0)", scale: 1 } : { opacity: 1, scale: 1 },
        }}
        transition={{ duration: reveal ? 0.9 : 1.1, ease: EASE }}
      />
    </div>
  );

  return (
    <motion.li
      className={`sw-piece sw-piece--${project.layout}`}
      variants={{ hidden: { opacity: 0, y: 28 }, shown: { opacity: 1, y: 0 } }}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <header className="sw-top">
        <p className="sw-n">
          <span>{n}</span>
          <i aria-hidden="true" />
        </p>
        <motion.h3
          className="sw-name"
          initial={reveal ? "hidden" : false}
          animate={state}
          variants={reveal ? { hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } } : undefined}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
        >
          {project.name}
        </motion.h3>
        <p className="sw-disc">{project.discipline}</p>
      </header>

      <div className="sw-story">
        <p className="sw-desc">{project.description}</p>
        {project.note && <p className="sw-note">{project.note}</p>}
      </div>

      <ProjectMeta meta={project.meta} className="sw-meta" />
      <ProjectActions project={project} onCaseStudy={open} className="sw-actions" />

      <div className="sw-media" ref={media}>
        {hasCase ? (
          // Fuera del orden de tabulación: con teclado se entra por
          // "View case study", que abre exactamente lo mismo.
          <button ref={frame} type="button" tabIndex={-1} className="sw-frame is-button" onClick={open}>
            {image}
            <span className="sw-open" aria-hidden="true">
              {ui.viewCase} <Arrow />
            </span>
            <span className="bx-sr-only">{ui.openCase(project.name)}</span>
          </button>
        ) : (
          <div ref={frame} className="sw-frame">
            {image}
          </div>
        )}
      </div>
    </motion.li>
  );
}
