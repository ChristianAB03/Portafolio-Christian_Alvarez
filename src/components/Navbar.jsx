import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { profile } from "../data/content";

const links = [
  ["Work", "work"],
  ["Projects", "projects"],
  ["Stack", "stack"],
  ["About", "about"],
];

// Cada sección del documento apunta al enlace de navegación que la representa.
const SECTION_OF = {
  work: "work",
  experience: "work",
  projects: "projects",
  stack: "stack",
  how: "stack",
  about: "about",
  contact: "contact",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // Indicador de sección activa: se marca la que cruza el centro del viewport.
  // Experience y How I build no están en el menú, así que se atribuyen al
  // enlace más cercano para que el indicador nunca quede apagado.
  useEffect(() => {
    const nodes = Object.keys(SECTION_OF)
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(SECTION_OF[e.target.id]));
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const mark = profile.logo.replace(/[<>/]/g, "");

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <motion.div className="nav-prog" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <div className="nav-in">
        <a href="#top" className="logo" aria-label={profile.name}>
          <i className="br b1">&lt;</i>
          <i>{mark}</i>
          <i className="sl">/</i>
          <i className="br b2">&gt;</i>
          <i className="caret" aria-hidden="true" />
        </a>

        <div className={`nav-links${open ? " open" : ""}`}>
          {links.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "on" : ""}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
            <i aria-hidden="true" />
            <span>Contact</span>
          </a>
        </div>

        <button
          className="menu-btn"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
