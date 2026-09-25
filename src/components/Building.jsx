import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useContent, useUI } from "../i18n";
import Reveal from "./Reveal";
import { srcSetOf } from "./projectImage";

const EASE = [0.22, 0.61, 0.36, 1];
// Ancho con el que se pinta cada imagen (para elegir la variante adecuada).
const SIZES = [
  "(max-width: 639px) 100vw, (max-width: 1023px) 90vw, 58vw",
  "(max-width: 639px) 80vw, (max-width: 1023px) 60vw, 34vw",
  "(max-width: 639px) 100vw, 88vw",
];

// Lo que estoy construyendo ahora: menos texto, más evidencia visual.
// Tres objetos a distinta escala, cada uno con su propio encuadre (marco con
// margen interior, vertical con acento azul, panorámica que sale del viewport).
// Mientras no hay captura real, el marco muestra el hueco; nunca un mockup.
export default function Building() {
  const { building, buildingIntro } = useContent();
  const ui = useUI();
  return (
    <section className="bd" id="building" aria-labelledby="bd-title">
      <div className="bd-in">
        <header className="bd-head">
          <Reveal className="bx-eyebrow">
            <span className="bx-eyebrow-n">{ui.building.eyebrow}</span>
            <i aria-hidden="true" />
            <span>{ui.building.label}</span>
          </Reveal>
          <Reveal as="h2" id="bd-title" className="bd-title" delay={0.1}>
            {buildingIntro}
          </Reveal>
        </header>

        <ol className="bd-list">
          {building.map((b, i) => (
            <Product key={b.id} item={b} index={i} pending={ui.building.pending} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Product({ item, index, pending }) {
  const reduce = useReducedMotion();
  const n = String(index + 1).padStart(2, "0");
  // cada pieza observa su propio elemento y anima sus partes con ese estado
  const ref = useRef(null);
  const state = useInView(ref, { once: true, amount: 0.2 }) ? "shown" : "hidden";

  return (
    <motion.li
      ref={ref}
      className={`bd-item bd-item--${index + 1}`}
      initial="hidden"
      animate={state}
      variants={{ hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <figure className="bd-figure">
        {/* la imagen se revela con una máscara; la dispara la pieza, no la imagen */}
        <motion.div
          className="bd-frame"
          initial="hidden"
          animate={state}
          variants={
            reduce
              ? undefined
              : { hidden: { clipPath: "inset(0 0 100% 0)" }, shown: { clipPath: "inset(0 0 0% 0)" } }
          }
          transition={{ duration: 0.9, ease: EASE }}
        >
          {item.image ? (
            <img
              src={item.image}
              srcSet={srcSetOf(item.image)}
              sizes={SIZES[index] || "100vw"}
              alt={item.alt || ""}
              style={item.crop ? { objectPosition: item.crop } : undefined}
              decoding="async"
            />
          ) : (
            <p className="bd-pending">
              <span>{item.name}</span>
              <span>{pending}</span>
            </p>
          )}
        </motion.div>
        <motion.i
          className="bd-line"
          initial="hidden"
          animate={state}
          aria-hidden="true"
          variants={reduce ? undefined : { hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        />
      </figure>

      <motion.div
        className="bd-info"
          initial="hidden"
          animate={state}
        variants={reduce ? undefined : { hidden: { opacity: 0, y: 10 }, shown: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
      >
        <p className="bd-kicker">
          <span className="bd-n">{n}</span>
          <i aria-hidden="true" />
          <span className="bd-type">{item.type}</span>
        </p>
        <h3 className="bd-name">{item.name}</h3>
        <p className="bd-context">{item.context}</p>
        <p className="bd-desc">{item.description}</p>
      </motion.div>
    </motion.li>
  );
}
