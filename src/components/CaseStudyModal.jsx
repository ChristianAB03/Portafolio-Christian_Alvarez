import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ICONS } from "./icons";

// Lista reutilizable con marcador (– neutro / + acento)
function MarkedList({ items, accent }) {
  return (
    <ul className={`cs-list${accent ? " accent" : ""}`}>
      {items.map((i) => <li key={i}>{i}</li>)}
    </ul>
  );
}

// Diagrama de arquitectura conceptual (vertical, con flechas)
function Architecture({ data }) {
  return (
    <section className="cs-section">
      <h3 className="cs-k">{data.label}</h3>
      <div className="cs-arch">
        {data.nodes.map((node, i) => (
          <div className="cs-arch-row" key={node + i}>
            <div className="cs-node">{node}</div>
            {i < data.nodes.length - 1 && <div className="cs-arrow" aria-hidden="true">↓</div>}
          </div>
        ))}
      </div>
      {data.note && <p className="cs-note">{data.note}</p>}
    </section>
  );
}

export default function CaseStudyModal({ item, open, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!item) return null;
  const cs = item.caseStudy;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cs-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="cs-panel"
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            tabIndex={-1}
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.985 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <button className="cs-close" onClick={onClose} aria-label="Cerrar">✕</button>

            {item.image && (
              <div className="cs-banner">
                <img src={item.image} alt={`Vista previa de ${item.title}`} />
              </div>
            )}

            <header className="cs-head">
              <div className="cs-tag">{item.kicker}</div>
              <h2>{item.title}</h2>
              <div className="cs-sub">{item.subtitle}</div>
              {(item.status || item.badges) && (
                <div className="cs-pills">
                  {item.status && <span className="state"><span className="dot" />{item.status}</span>}
                  {item.badges?.map((b) => {
                    const Icon = ICONS[b.icon];
                    return (
                      <span className="award" key={b.label}>
                        {Icon && <Icon />}{b.label}
                      </span>
                    );
                  })}
                </div>
              )}
              {item.liveUrl && (
                <a className="cs-live" href={item.liveUrl} target="_blank" rel="noreferrer">
                  <span className="dot" />Visitar sitio en vivo
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8"/></svg>
                </a>
              )}
            </header>

            {cs.problem && (
              <section className="cs-section">
                <h3 className="cs-k">Problema</h3>
                <p className="cs-body">{cs.problem}</p>
              </section>
            )}
            {cs.overview && (
              <section className="cs-section">
                <h3 className="cs-k">Overview</h3>
                <p className="cs-body">{cs.overview}</p>
              </section>
            )}

            {cs.tech && (
              <section className="cs-section">
                <h3 className="cs-k">Stack</h3>
                <div className="cs-chips">
                  {cs.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
                </div>
              </section>
            )}

            {cs.architecture && <Architecture data={cs.architecture} />}

            {/* Pares de columnas según lo que exista */}
            {(cs.features || cs.delivers) && (
              <div className="cs-cols">
                {cs.features && (
                  <section className="cs-section">
                    <h3 className="cs-k">Características</h3>
                    <MarkedList items={cs.features} />
                  </section>
                )}
                {cs.delivers && (
                  <section className="cs-section">
                    <h3 className="cs-k">Qué entrega</h3>
                    <MarkedList items={cs.delivers} accent />
                  </section>
                )}
              </div>
            )}

            {(cs.responsibilities || cs.contribution) && (
              <div className="cs-cols">
                {cs.responsibilities && (
                  <section className="cs-section">
                    <h3 className="cs-k">Responsabilidades</h3>
                    <MarkedList items={cs.responsibilities} />
                  </section>
                )}
                {cs.contribution && (
                  <section className="cs-section">
                    <h3 className="cs-k">{cs.contributionLabel || "Mi contribución"}</h3>
                    <MarkedList items={cs.contribution} accent />
                  </section>
                )}
              </div>
            )}

            {cs.technicalDecisions && (
              <section className="cs-section">
                <h3 className="cs-k">Technical decisions</h3>
                {Array.isArray(cs.technicalDecisions) ? (
                  <MarkedList items={cs.technicalDecisions} accent />
                ) : (
                  <p className="cs-body">{cs.technicalDecisions}</p>
                )}
              </section>
            )}

            {cs.modular && (
              <section className="cs-section">
                <h3 className="cs-k">Arquitectura modular</h3>
                <p className="cs-body">{cs.modular}</p>
              </section>
            )}

            {cs.result && (
              <section className="cs-section">
                <h3 className="cs-k">Resultado</h3>
                <p className="cs-body">{cs.result}</p>
              </section>
            )}

            {cs.learnings && (
              <section className="cs-section">
                <h3 className="cs-k">Lo que aprendí</h3>
                <MarkedList items={cs.learnings} accent />
              </section>
            )}

            {cs.projects && (
              <section className="cs-section">
                <h3 className="cs-k">Aplicaciones en las que participé</h3>
                <div className="cs-projects">
                  {cs.projects.map((p) => <span className="cs-proj" key={p}>{p}</span>)}
                </div>
              </section>
            )}

            {cs.confidentiality && (
              <div className="cs-confidential">
                <span className="cs-lock" aria-hidden="true"><ICONS.lock /></span>
                <p>{cs.confidentiality}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
