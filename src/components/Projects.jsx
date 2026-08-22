import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Media from "./Media";
import { additionalProjects } from "../data/content";
import { Arrow } from "./icons";

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <SectionHead
          index="03"
          label="Projects"
          title={<>Trabajo adicional y <em>académico</em>.</>}
          lead="Proyectos que complementan la experiencia profesional: exploración, aprendizaje y producto."
        />

        <div className="pj-grid">
          {additionalProjects.map((p, i) => {
            const live = p.link && p.link !== "#" && !p.link.startsWith("#");
            return (
              <Reveal className="pj" key={p.name} delay={(i % 3) * 0.06}>
                <Media
                  item={p}
                  index={`0${i + 1}`}
                  className="pj-media"
                  cta="Ver proyecto"
                  href={live ? p.link : undefined}
                />
                <div className="pj-head">
                  <span className="pj-name">{p.name}</span>
                  <span className="pj-year">{p.year}</span>
                </div>
                <div className="pj-tag">{p.tag}</div>
                <p className="pj-desc">{p.desc}</p>
                <div className="pj-solve">{p.solve}</div>
                <div className="pj-tech techline">{p.tech.join(" · ")}</div>
                {p.link && p.link !== "#" && (
                  <a
                    className="lnk neutral pj-link"
                    href={p.link}
                    target={live ? "_blank" : undefined}
                    rel={live ? "noreferrer" : undefined}
                  >
                    {live ? "Ver proyecto" : "Hablemos"} <Arrow />
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
