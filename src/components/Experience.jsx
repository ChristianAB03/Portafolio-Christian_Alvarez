import { motion } from "framer-motion";
import { useContent, useUI } from "../i18n";
import Reveal from "./Reveal";
import Disclosure from "./Disclosure";

const EASE = [0.22, 0.61, 0.36, 1];
// Los periodos se muestran con guion simple ("Jul 2025 - Ene 2026").
const dash = (s) => s.replace(/\s*[—–]\s*/g, " - ");
const startYear = (period) => period.match(/\d{4}/)?.[0];

// Trayectoria: dónde he trabajado y qué hice. Editorial, no un CV: el año
// funciona como elemento gráfico, la empresa manda y el rol la describe.
// Cada puesto lleva una regla de duración; la del trabajo en curso no se
// cierra y sale del viewport.
export default function Experience() {
  const { experience, experienceIntro } = useContent();
  const ui = useUI();
  return (
    <section className="xp" id="experience" aria-labelledby="xp-title">
      <div className="xp-in">
        <header className="xp-head">
          <Reveal className="bx-eyebrow">
            <span className="bx-eyebrow-n">04</span>
            <i aria-hidden="true" />
            <span>{ui.experience.eyebrow}</span>
          </Reveal>
          <Reveal as="h2" id="xp-title" className="xp-title" delay={0.1}>
            {experienceIntro}
          </Reveal>
        </header>

        <ol className="xp-list">
          {experience.map((job) => (
            <Job key={job.id} job={job} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Job({ job }) {
  const ui = useUI().experience;
  return (
    <motion.li
      className={`xp-job${job.current ? " is-current" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <motion.i
        className="xp-span"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
      />

      <p className="xp-when">
        {/* el año es gráfico; el periodo completo es el dato que se lee */}
        <span className="xp-year" aria-hidden="true">{startYear(job.period)}</span>
        <span className="xp-period">{dash(job.period)}</span>
        {job.current && <span className="xp-now">{ui.ongoing}</span>}
      </p>

      <div className="xp-body">
        <div className="xp-name">
          <h3 className="xp-company">{job.company}</h3>
          {/* marcas pequeñas junto a la empresa; el nombre ya está en texto */}
          {job.logos && (
            <p className="xp-logos">
              {job.logos.map((l) => (
                <span key={l.id} className={`xp-logo xp-logo--${l.id}`}>
                  <img src={l.src} alt="" loading="lazy" decoding="async" />
                </span>
              ))}
            </p>
          )}
        </div>
        <p className="xp-role">
          {job.role}
          {job.client && <span className="xp-client">{ui.client}: {job.client}</span>}
        </p>
        <p className="xp-summary">{job.summary}</p>
        {job.tech && (
          <p className="xp-tools">
            <span className="xp-k">{ui.workedWith}</span>
            <span>{job.tech.join(" · ")}</span>
          </p>
        )}
        {job.caseStudy && (
          <Disclosure name={job.company} more={ui.details} less={ui.hideDetails} className="xp-more">
            <RoleDetails cs={job.caseStudy} />
          </Disclosure>
        )}
      </div>
    </motion.li>
  );
}

// Detalle del puesto con los datos reales que antes vivían en el modal.
// (El diagrama de arquitectura se omite: el propio dato aclara que es
// conceptual y no representa la arquitectura real.)
function RoleDetails({ cs }) {
  const ui = useUI().experience;
  return (
    <div className="xp-detail">
      {cs.overview && <p className="xp-overview">{cs.overview}</p>}
      <div className="xp-cols">
        {cs.responsibilities && (
          <div>
            <p className="xp-k">{ui.responsibilities}</p>
            <ul className="xp-list-s">
              {cs.responsibilities.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        )}
        {cs.learnings && (
          <div>
            <p className="xp-k">{ui.learned}</p>
            <ul className="xp-list-s">
              {cs.learnings.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        )}
      </div>
      {cs.projects && (
        <div className="xp-apps">
          <p className="xp-k">{ui.apps}</p>
          <p className="xp-apps-list">
            {cs.projects.map((a) => <span key={a}>{a}</span>)}
          </p>
        </div>
      )}
      {cs.confidentiality && <p className="xp-note">{cs.confidentiality}</p>}
    </div>
  );
}
