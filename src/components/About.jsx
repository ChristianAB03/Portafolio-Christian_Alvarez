import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { about, aboutMeta } from "../data/content";

// Renderiza {texto} como <b>texto</b>
function renderAbout(text) {
  return text.split(/(\{[^}]+\})/g).map((part, i) =>
    part.startsWith("{") && part.endsWith("}") ? (
      <b key={i}>{part.slice(1, -1)}</b>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <SectionHead
          index="06"
          label="About"
          title={<>Ingeniero de sistemas, <em>obsesionado</em> con el detalle.</>}
        />

        <div className="rg">
          <Reveal className="ab-meta">
            {aboutMeta.map((m) => (
              <div className="i" key={m.k}>
                <div className="k">{m.k}</div>
                <div className="v">{m.v}</div>
              </div>
            ))}
          </Reveal>
          <Reveal as="p" className="ab-text" delay={0.08}>
            {renderAbout(about)}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
