import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useContent, useUI } from "../i18n";
import Monogram from "./Monogram";
import Reveal from "./Reveal";
import Disclosure from "./Disclosure";
import useMedia, { MOBILE } from "./useMedia";
import { Arrow, External } from "./icons";

const EASE = [0.22, 0.61, 0.36, 1];

// Lo que exploro: historias cortas (pregunta → qué hice → qué salió).
// A diferencia de Selected Work no hay capturas ni ficha: manda la pregunta.
export default function Experiments() {
  const { experiments, experimentsIntro } = useContent();
  const ui = useUI();
  return (
    <section className="ex" id="experiments" aria-labelledby="ex-title">
      <div className="ex-in">
        <header className="ex-head">
          <SectionMark />
          <Reveal className="bx-eyebrow ex-eyebrow" delay={0.35}>
            <span className="bx-eyebrow-n">03</span>
            <i aria-hidden="true" />
            <span>{ui.experiments.eyebrow}</span>
          </Reveal>
          <Reveal as="h2" id="ex-title" className="ex-title" delay={0.45}>
            {experimentsIntro}
          </Reveal>
        </header>

        <ol className="ex-list">
          {experiments.map((e, i) => (
            <Entry key={e.id} exp={e} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

// Sello de transición Selected Work → Experiments: el símbolo completo, plano,
// en Soft Navy con un único segmento azul. Nunca se recorta ni sale del viewport.
// Entra con una máscara vertical corta; lo dispara el contenedor (sin recortar).
function SectionMark() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const state = useInView(ref, { once: true, amount: 0.4 }) || reduce ? "shown" : "hidden";
  return (
    <div ref={ref} className="ex-mark" aria-hidden="true">
      <motion.div
        className="ex-mark-sym"
        initial={reduce ? false : "hidden"}
        animate={state}
        variants={{
          hidden: { clipPath: "inset(100% 0 0 0)", y: 12 },
          shown: { clipPath: "inset(0% 0 0 0)", y: 0 },
        }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <Monogram className="ex-mark-base" />
        <motion.span
          className="ex-mark-band"
          initial={reduce ? false : "hidden"}
          animate={state}
          variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
          transition={{ duration: 0.4, delay: 0.45, ease: EASE }}
        >
          <Monogram />
        </motion.span>
      </motion.div>
    </div>
  );
}

function Entry({ exp, index }) {
  const { featured } = useContent();
  const ui = useUI();
  const n = String(index + 1).padStart(2, "0");
  const related = exp.related && featured.find((p) => p.id === exp.related);
  const hasLinks = related || exp.repoUrl;
  const mobile = useMedia(MOBILE);

  return (
    <motion.li
      className={`ex-entry ex-entry--${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <motion.i
        className="ex-rule"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      />

      {/* anotación al margen: acompaña la entrada mientras se lee */}
      <p className="ex-margin">
        <span className="ex-n">{n}</span>
        <span className="ex-period">{exp.period}</span>
        {exp.state && <span className="ex-state">{exp.state}</span>}
      </p>

      <div className="ex-main">
        {exp.summary ? (
          // primera vista mínima (qué es); todo lo demás vive en la expansión
          <>
            <h3 className="ex-name ex-name--lead">{exp.short}</h3>
            {exp.tags && (
              <ul className="ex-tags" aria-label={ui.experiments.areas}>
                {exp.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            )}
            <p className="ex-summary">{exp.summary}</p>
            <Disclosure name={exp.short} less={ui.common.close} className="ex-more">
              {exp.shift && <p className="ex-idea">{exp.shift.after.title}</p>}
              <dl className="ex-brief">
                <div>
                  <dt>{ui.experiments.problem}</dt>
                  <dd>{exp.problem}</dd>
                </div>
                <div>
                  <dt>{ui.experiments.built}</dt>
                  <dd>{exp.built}</dd>
                </div>
              </dl>
              <p className="ex-fullname">{exp.name}</p>
              <Question exp={exp} />
              <Notes exp={exp} />
              {exp.shift && <Shift data={exp.shift} />}
              {exp.modules && <Modules data={exp.modules} />}
              {hasLinks && <Links exp={exp} related={related} />}
            </Disclosure>
          </>
        ) : (
          <>
            <h3 className="ex-name">
              {exp.name}
              {exp.subtitle && <span className="ex-sub">{exp.subtitle}</span>}
            </h3>
            {mobile ? (
              // móvil: el resultado; la pregunta y el proceso, a un toque
              <>
                <Notes exp={exp} only="outcome" />
                <Disclosure name={exp.name} less={ui.common.close} className="ex-more">
                  <Question exp={exp} />
                  <Notes exp={exp} only="did" />
                  {hasLinks && <Links exp={exp} related={related} />}
                </Disclosure>
              </>
            ) : (
              <>
                <Question exp={exp} />
                <Notes exp={exp} />
                {hasLinks && <Links exp={exp} related={related} />}
              </>
            )}
          </>
        )}
      </div>
    </motion.li>
  );
}

// Piezas del experimento: pregunta, notas (qué hice / qué salió) y enlaces.
function Question({ exp }) {
  // las preguntas largas bajan de cuerpo para no pasar de ~5 líneas
  return <p className={`ex-q${exp.question.length > 150 ? " is-long" : ""}`}>{exp.question}</p>;
}

function Notes({ exp, only }) {
  const ui = useUI().experiments;
  return (
    <dl className={`ex-notes${only ? " is-single" : ""}`}>
      {only !== "outcome" && (
        <div>
          <dt>{ui.did}</dt>
          <dd>
            {[].concat(exp.did).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </dd>
        </div>
      )}
      {only !== "did" && (
        <div>
          <dt>{ui.outcome}</dt>
          <dd>{exp.outcome}</dd>
        </div>
      )}
    </dl>
  );
}

function Links({ exp, related }) {
  const ui = useUI();
  return (
    <div className="pa ex-links">
      {related && (
        <a className="pa-l pa-case" href={`#case-${related.id}`}>
          {ui.experiments.caseLink(related.name)} <Arrow />
        </a>
      )}
      {exp.repoUrl && (
        <a className="pa-l pa-code" href={exp.repoUrl} target="_blank" rel="noreferrer">
          {ui.common.code} <External />
          <span className="bx-sr-only">: {exp.name} {ui.common.onGitHub} {ui.common.newTab}</span>
        </a>
      )}
    </div>
  );
}

// El cambio de modelo del sistema, contado como antes → después, con los
// estados reales que hoy propone al abogado.
function Shift({ data }) {
  const { before, after, states } = data;
  return (
    <figure className="ex-shift">
      <div className="ex-shift-row">
        <div className="ex-shift-before">
          <p className="ex-shift-tag">{before.tag}</p>
          <p className="ex-shift-title">{before.title}</p>
          <p className="ex-shift-detail">{before.detail}</p>
        </div>
        <motion.i
          className="ex-shift-line"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        />
        <div className="ex-shift-after">
          <p className="ex-shift-tag">{after.tag}</p>
          <p className="ex-shift-quote">{after.title}</p>
        </div>
      </div>
      {states && (
        <figcaption className="ex-states">
          <span className="ex-states-k">{states.label}</span>
          <ul>
            {states.items.map((it) => <li key={it}>{it}</li>)}
          </ul>
        </figcaption>
      )}
    </figure>
  );
}

// El sistema hoy: módulos activos, en letra pequeña, como anotación.
function Modules({ data }) {
  return (
    <div className="ex-mods">
      <p className="ex-states-k">{data.label}</p>
      <ul>
        {data.items.map((m) => (
          <li key={m.name}>
            <span className="ex-mod-name">{m.name}</span>
            <span className="ex-mod-detail">{m.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
