import { useContent, useUI } from "../i18n";
import { Arrow } from "./icons";

// {texto} en el párrafo de About se resalta.
const rich = (t) =>
  t.split(/(\{[^}]+\})/).map((part, i) =>
    part.startsWith("{") ? <strong key={i}>{part.slice(1, -1)}</strong> : part
  );

// Vista About: quién es Christian detrás del trabajo y con qué construye.
// Pensada para leerse entera en una pantalla de escritorio. La trayectoria
// solo se menciona (el detalle vive en Experience) y el stack es un índice
// tipográfico con las categorías y herramientas reales de `stack`.
export default function About({ headingRef }) {
  const { brand, profile, about, aboutMeta, stack, experience } = useContent();
  const ui = useUI();
  const current = experience.find((e) => e.current);
  const past = experience.filter((e) => !e.current);
  const focus = aboutMeta.find((m) => m.k === "Focus")?.v;

  const highlights = [...about.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);

  // las secundarias (trayectoria y foco) no se muestran en móvil: están en Experience y en el texto
  const facts = [
    [ui.about.basedIn, profile.location],
    [ui.about.currently, current && `${current.company}, ${current.role}`],
    [ui.about.before, past.map((e) => (e.client ? `${e.company} / ${e.client}` : e.company)).join(", "), true],
    [ui.about.focus, focus, true],
  ].filter(([, v]) => v);

  return (
    <section className="abt" id="about" aria-labelledby="abt-title">
      <div className="abt-in">
        <div className="abt-main">
          <p className="bx-eyebrow">
            <span className="bx-eyebrow-n">{ui.about.eyebrow}</span>
            <i aria-hidden="true" />
            <span>{profile.name}</span>
          </p>
          <h2 id="abt-title" className="abt-title" ref={headingRef} tabIndex={-1}>
            {brand.role}
          </h2>
          {/* escritorio: el párrafo; móvil: sus tres ideas resaltadas, sin más palabras */}
          <p className="abt-intro">{rich(about)}</p>
          <ul className="abt-intro-short">
            {highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>

          <dl className="abt-facts">
            {facts.map(([k, v, secondary]) => (
              <div key={k} className={secondary ? "abt-fact-2" : undefined}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <a className="pa-l abt-next" href="#contact">
            {ui.nav.links.contact} <Arrow />
          </a>
        </div>

        <aside className="abt-stack" aria-labelledby="abt-stack-k">
          <p id="abt-stack-k" className="abt-k">{ui.about.worksWith}</p>
          <dl>
            {stack.map((c) => (
              <div key={c.cat}>
                <dt>{c.cat}</dt>
                <dd>
                  {c.items.map((it, i) => (
                    <span key={it.n}>
                      {i > 0 && " · "}
                      <span className="abt-nowrap">{it.n}</span>
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
