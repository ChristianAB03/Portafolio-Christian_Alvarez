import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Monogram from "./Monogram";
import { ProjectMeta, ProjectActions } from "./ProjectMeta";
import { Arrow } from "./icons";
import { srcSetOf } from "./projectImage";
import { useUI } from "../i18n";

const EASE = [0.22, 0.61, 0.36, 1];

const rise = {
  out: { opacity: 0, y: 16 },
  in: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.05 + i * 0.07, ease: EASE } }),
};

// Case study como expansión de la pieza: la imagen crece desde su posición en
// Selected Work hasta la cabecera del caso (se anima su caja real, no un scale,
// para que la captura no se deforme) y después aparece el contenido.
// Sin origen (enlace directo, "siguiente proyecto") o con reduced-motion,
// solo hay un fundido.
export default function CaseStudy({ project, index, origin, onClose, next, onNext }) {
  const reduce = useReducedMotion();
  const ui = useUI();
  const root = useRef(null);
  const scroller = useRef(null);
  const hero = useRef(null);
  const closeBtn = useRef(null);
  const [target, setTarget] = useState(null);
  const [expanded, setExpanded] = useState(!origin || reduce);
  const n = String(index + 1).padStart(2, "0");

  // Destino de la expansión: la posición final de la imagen de cabecera.
  useLayoutEffect(() => {
    if (expanded || !hero.current) return;
    const r = hero.current.getBoundingClientRect();
    setTarget({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [expanded]);

  // Diálogo: scroll del fondo bloqueado, Escape cierra y el foco no sale.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const f = [...root.current.querySelectorAll("a[href], button:not([tabindex='-1'])")];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Al pasar al siguiente proyecto se vuelve arriba.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const cs = project.caseStudy;

  return (
    <motion.div
      ref={root}
      className="cs2"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cs2-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <div className="cs2-scroll" ref={scroller}>
        <header className="cs2-bar">
          <div className="cs2-bar-in">
            <span className="cs2-mark">
              <Monogram />
            </span>
            <p className="cs2-crumb">
              <span>{ui.work.eyebrow}</span>
              <i aria-hidden="true" />
              <span>{n}</span>
            </p>
            <button ref={closeBtn} type="button" className="cs2-close" onClick={onClose}>
              {ui.common.close}<span className="bx-sr-only"> {ui.caseStudy.close}</span>
            </button>
          </div>
        </header>

        <motion.article
          key={project.id}
          className="cs2-in"
          initial="out"
          animate={expanded ? "in" : "out"}
        >
          <figure className="cs2-hero" ref={hero} style={{ visibility: expanded ? "visible" : "hidden" }}>
            <img src={project.image} srcSet={srcSetOf(project.image)} sizes="100vw" alt={project.alt} style={{ objectPosition: project.crop }} />
          </figure>

          <div className="cs2-head">
            <motion.div className="cs2-title-block" variants={rise} custom={0}>
              <p className="sw-n">
                <span>{n}</span>
                <i aria-hidden="true" />
              </p>
              <h2 id="cs2-title" className="cs2-title">{project.name}</h2>
              <p className="cs2-disc">{project.discipline}</p>
              <p className="cs2-lead">{project.description}</p>
              {project.note && <p className="sw-note">{project.note}</p>}
            </motion.div>
            <motion.aside className="cs2-side" variants={rise} custom={1}>
              <ProjectMeta meta={project.meta} />
              <ProjectActions project={project} />
            </motion.aside>
          </div>

          <motion.div variants={rise} custom={2}>
            <CaseBody cs={cs} />
          </motion.div>

          {next && (
            <motion.footer className="cs2-next" variants={rise} custom={3}>
              <p className="cs2-k">{ui.caseStudy.next}</p>
              <button type="button" className="cs2-next-btn" onClick={onNext}>
                <span className="cs2-next-n">{next.n}</span>
                <span className="cs2-next-name">{next.name}</span>
                <Arrow />
              </button>
            </motion.footer>
          )}
        </motion.article>
      </div>

      {!expanded && origin && (
        <motion.div
          className="cs2-expander"
          aria-hidden="true"
          initial={origin}
          animate={target || origin}
          transition={{ duration: 0.7, ease: EASE }}
          onAnimationComplete={() => target && setExpanded(true)}
        >
          <img src={project.image} srcSet={srcSetOf(project.image)} sizes="100vw" alt="" style={{ objectPosition: project.crop }} />
        </motion.div>
      )}
    </motion.div>
  );
}

// Contenido del caso: solo se muestran las secciones que existen en los datos.
function CaseBody({ cs }) {
  const l = useUI().caseStudy;
  if (!cs) return null;
  const story = [cs.problem, cs.overview].filter(Boolean);
  return (
    <div className="cs2-body">
      {story.length > 0 && (
        <Block title={l.story}>
          {story.map((p) => <p className="cs2-p" key={p.slice(0, 24)}>{p}</p>)}
        </Block>
      )}
      {cs.tech && (
        <Block title={l.stack}>
          <p className="cs2-stack">
            {cs.tech.map((t, i) => (
              <span key={t}>
                {i > 0 && " · "}
                <span className="cs2-nowrap">{t}</span>
              </span>
            ))}
          </p>
        </Block>
      )}
      {cs.architecture && (
        <Block title={l.architecture}>
          <ol className="cs2-flow">
            {cs.architecture.nodes.map((node, i) => <li key={node + i}>{node}</li>)}
          </ol>
          {cs.architecture.note && <p className="cs2-note">{cs.architecture.note}</p>}
        </Block>
      )}
      {(cs.features || cs.delivers) && (
        <Block title={cs.features ? l.features : l.delivers}>
          {cs.features && cs.delivers ? (
            <div className="cs2-cols">
              <List items={cs.features} />
              <div>
                <p className="cs2-sub">{l.delivers}</p>
                <List items={cs.delivers} />
              </div>
            </div>
          ) : (
            <List items={cs.features || cs.delivers} />
          )}
        </Block>
      )}
      {cs.contribution && (
        <Block title={l.built}>
          <List items={cs.contribution} accent />
        </Block>
      )}
      {cs.technicalDecisions && (
        <Block title={l.decisions}>
          {Array.isArray(cs.technicalDecisions) ? (
            <List items={cs.technicalDecisions} />
          ) : (
            <p className="cs2-p">{cs.technicalDecisions}</p>
          )}
        </Block>
      )}
      {cs.modular && (
        <Block title={l.underTheHood}>
          <p className="cs2-p">{cs.modular}</p>
        </Block>
      )}
      {cs.result && (
        <Block title={l.result}>
          <p className="cs2-p">{cs.result}</p>
        </Block>
      )}
      {cs.learnings && (
        <Block title={l.learned}>
          <List items={cs.learnings} />
        </Block>
      )}
    </div>
  );
}

function Block({ title, children }) {
  return (
    <section className="cs2-block">
      <h3 className="cs2-k">{title}</h3>
      <div className="cs2-content">{children}</div>
    </section>
  );
}

// Las listas largas se reparten en dos columnas para no dejar media fila vacía.
function List({ items, accent }) {
  const split = items.length > 5 ? " is-split" : "";
  return (
    <ul className={`cs2-list${accent ? " is-accent" : ""}${split}`}>
      {items.map((it) => <li key={it}>{it}</li>)}
    </ul>
  );
}
