import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { featured as rawFeatured } from "../data/content";
import { useContent, useUI } from "../i18n";
import Monogram from "./Monogram";
import Reveal from "./Reveal";
import WorkPiece from "./WorkPiece";
import CaseStudy from "./CaseStudy";

const EASE = [0.22, 0.61, 0.36, 1];
const HASH = /^#case-(.+)$/;
// la estructura (ids, orden, qué tiene case study) es igual en ambos idiomas
const indexOf = (id) => rawFeatured.findIndex((p) => p.id === id);
const hasCase = (id) => Boolean(rawFeatured[indexOf(id)]?.caseStudy);

// Exposición de trabajo + case studies. No hay router: el caso abierto se
// refleja en la URL (#case-<id>) con el historial, así "atrás" lo cierra y
// el enlace se puede compartir.
export default function SelectedWork() {
  const { featured, selectedWork } = useContent();
  const ui = useUI();
  const [open, setOpen] = useState(null); // { id, origin }
  const trigger = useRef(null);
  // true solo si abrir el caso añadió una entrada al historial: entonces
  // cerrar es "atrás". Con un enlace directo no hay a dónde volver.
  const pushed = useRef(false);

  const openCase = useCallback((id, frameEl) => {
    if (!hasCase(id)) return;
    trigger.current = document.activeElement;
    const r = frameEl?.getBoundingClientRect();
    const origin = r ? { top: r.top, left: r.left, width: r.width, height: r.height } : null;
    setOpen({ id, origin });
    history.pushState({ cs: id }, "", `#case-${id}`);
    pushed.current = true;
  }, []);

  const closeCase = useCallback(() => {
    if (pushed.current) history.back(); // popstate cierra
    else {
      setOpen(null);
      history.replaceState(null, "", location.pathname + location.search);
    }
  }, []);

  const goNext = useCallback(() => {
    setOpen((cur) => {
      const nextId = rawFeatured[(indexOf(cur.id) + 1) % rawFeatured.length].id;
      history.replaceState({ cs: nextId }, "", `#case-${nextId}`);
      return { id: nextId, origin: null };
    });
  }, []);

  // Atrás / adelante y enlaces directos a un caso.
  useEffect(() => {
    const sync = () => {
      const m = location.hash.match(HASH);
      const next = m && hasCase(m[1]) ? { id: m[1], origin: null } : null;
      if (!next) pushed.current = false;
      // abierto desde otro enlace de la página (p. ej. Experiments): al cerrar,
      // el foco vuelve a ese enlace
      else if (document.activeElement !== document.body) trigger.current = document.activeElement;
      setOpen(next);
    };
    if (HASH.test(location.hash)) sync();
    addEventListener("popstate", sync);
    return () => removeEventListener("popstate", sync);
  }, []);

  // Al cerrar, el foco vuelve a quien abrió el caso.
  useEffect(() => {
    if (!open && trigger.current) {
      trigger.current.focus?.({ preventScroll: true });
      trigger.current = null;
    }
  }, [open]);

  const i = open ? indexOf(open.id) : -1;
  const project = i >= 0 ? featured[i] : null;
  const nextP = project ? featured[(i + 1) % featured.length] : null;

  return (
    <section className="sw" id="work" aria-labelledby="sw-title">
      <div className="sw-in">
        {/* retícula editorial, casi invisible: organiza las columnas de la exposición */}
        <div className="sw-grid" aria-hidden="true">
          <i /><i /><i /><i />
        </div>

        <header className="sw-head">
          <Monogram className="sw-thread" />
          <motion.i
            className="sw-rule"
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
          />
          <Reveal className="bx-eyebrow sw-eyebrow" delay={0.15}>
            <span className="bx-eyebrow-n">02</span>
            <i aria-hidden="true" />
            <span>{ui.work.eyebrow}</span>
          </Reveal>
          <Reveal as="h2" id="sw-title" className="sw-title" delay={0.25}>
            {selectedWork.intro}
          </Reveal>
        </header>

        <ol className="sw-list">
          {featured.map((p, idx) => (
            <WorkPiece key={p.id} project={p} index={idx} onOpen={openCase} />
          ))}
        </ol>
      </div>

      <AnimatePresence>
        {project && (
          <CaseStudy
            key="case-study"
            project={project}
            index={i}
            origin={open.origin}
            onClose={closeCase}
            next={nextP && { n: String(((i + 1) % featured.length) + 1).padStart(2, "0"), name: nextP.name }}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
