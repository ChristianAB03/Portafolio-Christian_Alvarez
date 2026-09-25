import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Arrow } from "./icons";
import { useUI } from "../i18n";

const EASE = [0.22, 0.61, 0.36, 1];

// Expansión inline y editorial: el contenido extra se despliega dentro de la
// misma pieza, sin modal. Botón con aria-expanded (Enter y Space nativos);
// Escape dentro del contenido lo cierra y devuelve el foco al botón.
// Con reduced-motion aparece sin animar la altura.
export default function Disclosure({ name, more, less, className = "", children }) {
  const common = useUI().common;
  more ??= common.viewMore;
  less ??= common.viewLess;
  const [open, setOpen] = useState(false);
  const id = useId();
  const btn = useRef(null);
  const reduce = useReducedMotion();

  const close = () => {
    setOpen(false);
    btn.current?.focus({ preventScroll: true });
    // si al cerrar el botón quedó por encima del viewport, se trae a la vista
    requestAnimationFrame(() => {
      const r = btn.current?.getBoundingClientRect();
      if (r && r.top < 80) btn.current.scrollIntoView({ block: "center", behavior: "instant" });
    });
  };

  return (
    <div className={`dsc${open ? " is-open" : ""} ${className}`}>
      <button
        ref={btn}
        type="button"
        className="pa-l dsc-btn"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => (open ? close() : setOpen(true))}
      >
        {open ? less : more} <Arrow />
        <span className="bx-sr-only">: {name}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            aria-label={name}
            className="dsc-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.55, ease: EASE }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                close();
              }
            }}
          >
            <div className="dsc-in">
              {children}
              <button type="button" className="pa-l dsc-btn dsc-close" aria-controls={id} onClick={close}>
                {less} <Arrow />
                <span className="bx-sr-only">: {name}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
