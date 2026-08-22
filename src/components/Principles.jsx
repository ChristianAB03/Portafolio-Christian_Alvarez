import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { principles } from "../data/content";

export default function Principles() {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <SectionHead
          index="05"
          label="How I build"
          title={<>Cómo <em>construyo</em>.</>}
          lead="Cuatro principios que aplico en cada proyecto, del primer commit al despliegue."
        />

        <div className="prin">
          {principles.map((p, i) => (
            <Reveal className="prin-i" key={p.t} delay={i * 0.05}>
              <div className="n">0{i + 1}</div>
              <div className="t">{p.t}</div>
              <div className="d">{p.d}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
