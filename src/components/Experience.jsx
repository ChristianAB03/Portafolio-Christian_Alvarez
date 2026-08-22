import { useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import CaseStudyModal from "./CaseStudyModal";
import { experience } from "../data/content";
import { Arrow } from "./icons";

export default function Experience() {
  const [activeId, setActiveId] = useState(null);
  const active = experience.find((e) => e.id === activeId) || null;

  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SectionHead
          index="02"
          label="Experience"
          title={<>Un historial corto, con software <em>en producción</em>.</>}
          lead="Dónde trabajo, qué construyo y con qué stack lo hago."
        />

        <ol>
          {experience.map((e, i) => (
            <Reveal as="li" className="tl-i" key={e.id} delay={i * 0.05}>
              <div className="tl-when">
                <div className="p">{e.period}</div>
                {e.current && (
                  <div className="s"><span className="dot" />Current</div>
                )}
              </div>

              <div className="tl-body">
                <span className="tl-node" aria-hidden="true" />
                <h3 className="tl-co">{e.company}</h3>
                <div className="tl-role">{e.role}</div>
                {e.client && <div className="tl-client">Client · {e.client}</div>}
                <p className="tl-sum">{e.summary}</p>

                {e.highlights && (
                  <div className="tl-hl">
                    {e.highlights.map((h) => (
                      <div className="h" key={h.l}>
                        <div className="n">{h.n}</div>
                        <div className="l">{h.l}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="tl-tech techline">{e.tech.join(" · ")}</div>

                {e.caseStudy && (
                  <div className="tl-actions">
                    <button className="lnk" onClick={() => setActiveId(e.id)}>
                      View case study <Arrow />
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <CaseStudyModal item={active} open={!!active} onClose={() => setActiveId(null)} />
    </section>
  );
}
