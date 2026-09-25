import { useContent, useUI } from "../i18n";
import Monogram from "./Monogram";

// Portada de la marca. El monograma es arquitectura: un plano navy a gran escala
// que sale del viewport, y una franja donde el mismo símbolo aparece en azul.
// La entrada es CSS escalonada (--i); reduced-motion la desactiva en index.css.
export default function BrandHero() {
  const { profile, brand } = useContent();
  const ui = useUI();
  const [first, ...rest] = profile.name.split(" ");
  return (
    <section className="bx-hero" id="top" aria-labelledby="bx-hero-name">
      <div className="bx-hero-in">
        {/* móvil: plano propio del símbolo */}
        <i className="bx-hero-plane" aria-hidden="true" />
        <div
          className="bx-hero-mark"
          style={{ aspectRatio: brand.monogram.ratio }}
          aria-hidden="true"
        >
          {/* filete de construcción: prolonga el borde de la franja azul y
              ancla el símbolo a la retícula de la página */}
          <i className="bx-hero-line" />
          <Monogram className="bx-layer bx-layer-base" />
          <Monogram className="bx-layer bx-layer-band" />
        </div>

        <p className="bx-eyebrow bx-in" style={{ "--i": 0 }}>
          <span className="bx-eyebrow-n">01</span>
          <i aria-hidden="true" />
          <span>{ui.hero.eyebrow}</span>
        </p>

        <div className="bx-hero-copy">
          <h1 id="bx-hero-name" className="bx-name bx-in" style={{ "--i": 1 }}>
            <span>{first}</span> <span className="bx-name-2">{rest.join(" ")}</span>
          </h1>
          <p className="bx-role bx-in" style={{ "--i": 2 }}>
            {brand.role}
          </p>
          <p className="bx-statement bx-in" style={{ "--i": 3 }}>
            <i aria-hidden="true" />
            {/* escritorio: contexto; móvil: síntesis (solo una es visible y legible) */}
            <span className="bx-long">{brand.statement}</span>
            <span className="bx-short">{brand.statementShort}</span>
          </p>
        </div>

        <p className="bx-loc bx-in" style={{ "--i": 4 }}>
          {profile.location}
        </p>
      </div>

    </section>
  );
}
