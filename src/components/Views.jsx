import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import About from "./About";
import Contact from "./Contact";
import { Arrow } from "./icons";
import { useUI } from "../i18n";

const EASE = [0.22, 0.61, 0.36, 1];
const VIEWS = { "#about": About, "#contact": Contact };
const isView = (h) => Object.prototype.hasOwnProperty.call(VIEWS, h);

// About y Contact son vistas propias sobre la página, no secciones al final
// de un scroll. Viven en la URL (#about, #contact) con su entrada de historial:
// "atrás" vuelve a la vista anterior o a la página, y los enlaces directos
// funcionan. history.state.depth cuenta cuántas vistas se abrieron desde la
// página para que "Close" vuelva exactamente a ella.
export default function Views() {
  const [view, setView] = useState(() => (isView(location.hash) ? location.hash : null));
  const trigger = useRef(null);
  const heading = useRef(null);
  const closing = useRef(false);

  // Enlace directo: esta entrada no tiene una página detrás a la que volver.
  useEffect(() => {
    if (isView(location.hash)) history.replaceState({ view: location.hash, depth: 0 }, "");
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      const h = a?.getAttribute("href");
      if (!isView(h)) return;
      e.preventDefault();
      if (location.hash === h) return;
      const inView = Boolean(history.state?.view);
      if (!inView) trigger.current = a;
      history.pushState({ view: h, depth: (inView ? history.state.depth : 0) + 1 }, "", h);
      setView(h);
    };
    // atrás/adelante, un ancla normal (#work, #top) o un cambio manual del hash
    const sync = () => {
      const h = isView(location.hash) ? location.hash : null;
      // una vista sin página detrás (enlace directo o hash escrito a mano): depth 0
      if (h && !history.state?.view) history.replaceState({ view: h, depth: 0 }, "");
      // "Close" retrocede hasta la página; si llega a una vista de depth 0,
      // esa vista no tiene página detrás y se reemplaza por la página
      if (h && closing.current && history.state?.depth === 0) {
        history.replaceState(null, "", location.pathname + location.search);
        closing.current = false;
        setView(null);
        return;
      }
      if (!h) closing.current = false;
      setView(h);
    };
    document.addEventListener("click", onClick, true);
    addEventListener("popstate", sync);
    addEventListener("hashchange", sync);
    return () => {
      document.removeEventListener("click", onClick, true);
      removeEventListener("popstate", sync);
      removeEventListener("hashchange", sync);
    };
  }, []);

  const close = useCallback(() => {
    const depth = history.state?.view ? history.state.depth : 0;
    if (depth > 0) {
      closing.current = true;
      history.go(-depth);
    }
    else {
      history.replaceState(null, "", location.pathname + location.search);
      setView(null);
    }
  }, []);

  // Con una vista abierta la página queda inerte (fuera del teclado y del
  // lector), el foco va al título de la vista y Escape la cierra.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("bx:view", { detail: view }));
    const main = document.querySelector("main");
    if (main) main.inert = Boolean(view);
    document.body.style.overflow = view ? "hidden" : "";
    if (!view) {
      trigger.current?.focus?.({ preventScroll: true });
      trigger.current = null;
      return;
    }
    const id = requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
    const onKey = (e) => {
      if (e.key === "Escape" && !document.querySelector(".bx-menu, .cs2")) close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("keydown", onKey);
    };
  }, [view, close]);

  const View = view ? VIEWS[view] : null;

  return (
    <AnimatePresence>
      {View && (
        <motion.div
          key={view}
          className="vw"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <View headingRef={heading} onClose={close} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Final de la página: la experiencia continúa en las dos vistas.
export function ContinueNav() {
  const ui = useUI();
  return (
    <nav className="cn" aria-label={ui.continue.label}>
      <div className="cn-in">
        <p className="cn-k">{ui.continue.label}</p>
        <a className="cn-l" href="#about">
          {ui.nav.links.about} <Arrow />
        </a>
        <a className="cn-l" href="#contact">
          {ui.nav.links.contact} <Arrow />
        </a>
      </div>
    </nav>
  );
}
