import { useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { stack } from "../data/content";

const TOTAL = stack.reduce((a, s) => a + s.items.length, 0);

export default function TechStack() {
  // La tecnología en foco/hover: su descripción se muestra en el readout
  // compartido de abajo, en vez de que cada item reserve su propia fila.
  const [active, setActive] = useState(null);

  return (
    <section className="section" id="stack">
      <div className="wrap">
        <SectionHead
          index="04"
          label="Stack"
          title={<>Las herramientas con las que <em>trabajo</em>.</>}
          lead="No una colección de logos: lo que uso de verdad y para qué lo uso."
        />

        <Reveal className="stk">
          <div className="stk-grid">
            {stack.map((s) => (
              <div className="stk-cat2" key={s.cat}>
                <h4 className="stk-cat">
                  {s.cat} <b>{String(s.items.length).padStart(2, "0")}</b>
                </h4>
                <div className="stk-list">
                  {s.items.map((it) => (
                    <button
                      type="button"
                      className="stk-it2"
                      key={it.n}
                      onMouseEnter={() => setActive(it)}
                      onFocus={() => setActive(it)}
                      onClick={() => setActive(it)}
                      aria-label={`${it.n}: ${it.d}`}
                    >
                      <i className="tick" aria-hidden="true" />
                      <span className="stk-name2">{it.n}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="stk-cat2 stk-meta" aria-hidden="true">
              <div className="stk-meta-n">{TOTAL}</div>
              <div className="stk-meta-l">
                tecnologías
                <br />
                en uso
              </div>
            </div>
          </div>

          <div className="stk-readout">
            <span className="lbl">{active ? active.n : "// stack"}</span>
            <span className="val" key={active ? active.n : "default"}>
              {active
                ? active.d
                : "Pasa el cursor sobre una tecnología para ver cómo la uso."}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
