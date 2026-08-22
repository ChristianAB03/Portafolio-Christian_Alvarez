import { Arrow } from "./icons";

// Portada generada cuando el proyecto todavía no tiene captura.
// No es un placeholder: es una pieza gráfica con la misma retícula
// técnica, el monograma en contorno y el azul de firma.
export function ProjectVisual({ path, mark, index }) {
  return (
    <div className="pv" aria-hidden="true">
      <div className="pv-mesh" />
      <div className="pv-halo" />
      {path && <span className="pv-path">{path}</span>}
      {index && <span className="pv-idx">{index}</span>}
      <div className="pv-ui"><i /><i /><i /><i /></div>
      <div className="pv-mark">{mark}</div>
      <span className="pv-c tl" /><span className="pv-c tr" />
      <span className="pv-c bl" /><span className="pv-c br" />
    </div>
  );
}

// Contenedor de imagen: zoom mínimo en hover, overlay y CTA que aparece.
export default function Media({
  item,
  index,
  className = "",
  cta = "View case study",
  onClick,
  href,
  as,
}) {
  const Tag = as || (href ? "a" : onClick ? "button" : "div");
  const interactive = Tag === "button" || Tag === "a";
  const name = item.title || item.name;

  return (
    <Tag
      className={`media ${className}`.trim()}
      onClick={onClick}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      type={Tag === "button" ? "button" : undefined}
      aria-haspopup={Tag === "button" ? "dialog" : undefined}
      data-cursor={interactive ? cta : undefined}
      aria-label={interactive ? `${cta}: ${name}` : undefined}
    >
      <div className="media-inner">
        {item.image ? (
          <img src={item.image} alt={`Vista previa de ${name}`} loading="lazy" />
        ) : (
          <ProjectVisual path={item.path} mark={item.mark} index={index} />
        )}
      </div>
      <div className="media-ov" aria-hidden="true" />
      {interactive && (
        <span className="media-cta" aria-hidden="true">
          {cta} <Arrow />
        </span>
      )}
    </Tag>
  );
}
