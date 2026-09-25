import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LANGS, useContent, useLang, useUI } from "../i18n";
import { ui as dict } from "../i18n/ui";
import Monogram from "./Monogram";

const EASE = [0.22, 0.61, 0.36, 1];
// nombre de cada idioma en su propio idioma (así lo anuncia el lector)
const NAMES = { en: "English", es: "Español" };

export default function BrandNav() {
  const { profile, brand } = useContent();
  const ui = useUI().nav;
  const [active, setActive] = useState("");
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  // About y Contact son vistas (Views.jsx): mientras una está abierta manda
  // sobre la sección visible, y la barra toma fondo sólido.
  const [view, setView] = useState(null);
  useEffect(() => {
    const onView = (e) => setView(e.detail ? e.detail.slice(1) : null);
    addEventListener("bx:view", onView);
    return () => removeEventListener("bx:view", onView);
  }, []);
  const current = view || active;
  const btn = useRef(null);
  const menu = useRef(null);

  // La barra es transparente sobre el hero y toma fondo cuando el hero sale.
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  // Sección activa: la que cruza el centro del viewport. Sobre el hero, ninguna.
  useEffect(() => {
    const ids = ["top", ...brand.nav];
    // solo secciones de la página: About y Contact son vistas (su estado llega por bx:view)
    const nodes = ids.map((id) => document.getElementById(id)).filter((n) => n?.closest("main"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === "top" ? "" : e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [brand.nav]);

  // Menú móvil: Escape cierra, el foco queda atrapado entre botón y enlaces,
  // y al cerrar vuelve al botón. Si la ventana crece a desktop, se cierra.
  useEffect(() => {
    if (!open) return;
    const wide = matchMedia("(min-width: 640px)");
    const close = () => wide.matches && setOpen(false);
    const onKey = (e) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const ring = [btn.current, ...(menu.current?.querySelectorAll("a[href], button") || [])];
      const i = ring.indexOf(document.activeElement);
      const next = e.shiftKey ? (i <= 0 ? ring.length - 1 : i - 1) : (i + 1) % ring.length;
      e.preventDefault();
      ring[next].focus();
    };
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", close);
    document.body.style.overflow = "hidden";
    menu.current?.querySelector("a[href]")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", close);
      document.body.style.overflow = "";
      btn.current?.focus();
    };
  }, [open]);

  return (
    <header className={`bx-nav${solid || view ? " is-solid" : ""}${open ? " is-open" : ""}`}>
      <div className="bx-nav-in">
        <a href="#top" className="bx-logo" aria-label={ui.home(profile.name)}>
          <Monogram />
        </a>

        <div className="bx-right">
        <nav className="bx-links" aria-label={ui.main}>
          {brand.nav.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={current === id ? "is-active" : undefined}
              aria-current={current === id ? "location" : undefined}
            >
              {ui.links[id]}
            </a>
          ))}
        </nav>

        <LangSwitch className="bx-lang--bar" />

        <button
          ref={btn}
          type="button"
          className="bx-menu-btn"
          aria-expanded={open}
          aria-controls="bx-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? ui.close : ui.menu}
        </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menu}
            id="bx-menu"
            className="bx-menu"
            role="dialog"
            aria-modal="true"
            aria-label={ui.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <Monogram className="bx-menu-mark" />
            <nav aria-label={ui.main}>
              <ul>
                {brand.nav.map((id, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.45, ease: EASE }}
                  >
                    <a
                      href={`#${id}`}
                      className={current === id ? "is-active" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {ui.links[id]}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="bx-menu-foot">
              <p>{profile.location}</p>
              <LangSwitch className="bx-lang--menu" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Selector de idioma: dos códigos, el activo con tinta plena y filete azul.
// Cada botón se anuncia en su propio idioma y dice si es el actual
// ("English, current language" / "Español, cambiar idioma"): el estado no
// depende solo del color.
function LangSwitch({ className = "" }) {
  const { lang, setLang } = useLang();
  const ui = useUI().lang;
  return (
    <div className={`bx-lang ${className}`} role="group" aria-label={ui.group}>
      {LANGS.map((l, i) => {
        const active = l === lang;
        return (
          <Fragment key={l}>
            {i > 0 && <span className="bx-lang-sep" aria-hidden="true">/</span>}
            <button
              type="button"
              lang={l}
              className={active ? "is-active" : undefined}
              aria-label={`${NAMES[l]}, ${active ? dict[l].lang.current : dict[l].lang.switch}`}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
