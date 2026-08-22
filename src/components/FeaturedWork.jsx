import { useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Media from "./Media";
import CaseStudyModal from "./CaseStudyModal";
import { featured } from "../data/content";
import { Arrow, External, GitHub, ICONS } from "./icons";

function MetaList({ items }) {
  return (
    <div className="meta-list">
      {items.map((m) => (
        <div className="meta-i" key={m.k}>
          <span className="k">{m.k}</span>
          <span className="v">{m.v}</span>
        </div>
      ))}
    </div>
  );
}

export default function FeaturedWork() {
  const [activeId, setActiveId] = useState(null);
  const active = featured.find((f) => f.id === activeId) || null;
  const lead = featured.find((f) => f.hero) || featured[0];
  const rest = featured.filter((f) => f !== lead);

  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionHead
          index="01"
          label="Selected work"
          title={<>Del problema real al producto en <em>producción</em>.</>}
          lead="Case studies de los proyectos que mejor representan cómo trabajo: decisiones técnicas, arquitectura y resultado."
        />

        <div className="work">
          {/* ---------- FEATURED PROJECT ---------- */}
          <Reveal className="fp">
            <div className="fp-top">
              <span className="k">{lead.kicker}</span>
              <i className="flex" aria-hidden="true" />
              {lead.award && (
                <span className="award"><ICONS.trophy />{lead.award}</span>
              )}
              {lead.awardContext && <span className="ctx">{lead.awardContext}</span>}
            </div>

            <Media
              item={lead}
              index="01"
              className="fp-media"
              onClick={() => setActiveId(lead.id)}
            />

            <div className="fp-body">
              <div>
                <h3 className="fp-title">{lead.title}</h3>
                <div className="fp-sub">{lead.subtitle}</div>
                <p className="fp-summary">{lead.summary}</p>
                <div className="fp-actions">
                  <button className="lnk" onClick={() => setActiveId(lead.id)}>
                    View case study <Arrow />
                  </button>
                  {lead.liveUrl && (
                    <a className="lnk live" href={lead.liveUrl} target="_blank" rel="noreferrer">
                      Live site <External />
                    </a>
                  )}
                  {lead.repoUrl && (
                    <a className="lnk neutral" href={lead.repoUrl} target="_blank" rel="noreferrer">
                      Code <GitHub />
                    </a>
                  )}
                </div>
              </div>
              {lead.meta && <MetaList items={lead.meta} />}
            </div>
          </Reveal>

          {/* ---------- RESTO DE CASE STUDIES ---------- */}
          {rest.map((f, i) => {
            const n = String(i + 2).padStart(2, "0");
            return (
              <Reveal className="cw" key={f.id}>
                <Media
                  item={f}
                  index={n}
                  className="cw-media"
                  onClick={() => setActiveId(f.id)}
                />
                <div>
                  <div className="cw-idx">
                    <span className="n">Project {n}</span>
                    <i className="flex" aria-hidden="true" />
                  </div>
                  <h3 className="cw-title">{f.title}</h3>
                  <div className="cw-sub">{f.subtitle}</div>
                  <p className="cw-summary">{f.summary}</p>
                  {f.meta && (
                    <div className="cw-meta">
                      <MetaList items={f.meta} />
                    </div>
                  )}
                  <div className="cw-actions">
                    <button className="lnk" onClick={() => setActiveId(f.id)}>
                      View case study <Arrow />
                    </button>
                    {f.liveUrl && (
                      <a className="lnk live" href={f.liveUrl} target="_blank" rel="noreferrer">
                        Live site <External />
                      </a>
                    )}
                    {f.repoUrl && (
                      <a className="lnk neutral" href={f.repoUrl} target="_blank" rel="noreferrer">
                        Code <GitHub />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <CaseStudyModal item={active} open={!!active} onClose={() => setActiveId(null)} />
    </section>
  );
}
