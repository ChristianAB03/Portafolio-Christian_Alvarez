import { Arrow, External } from "./icons";
import { useUI } from "../i18n";

// Ficha del proyecto con los datos reales de `featured.meta` (Role, Tech, Year,
// Status). Status lleva una señal pequeña; el texto sigue diciendo el estado,
// así que el color nunca es la única pista.
export function ProjectMeta({ meta, className = "" }) {
  const labels = useUI().meta;
  if (!meta?.length) return null;
  return (
    <dl className={`pm ${className}`}>
      {meta.map((m) => (
        <div className="pm-i" key={m.k}>
          <dt>{labels[m.k]}</dt>
          <dd>
            {m.k === "status" && (
              <i className={`pm-sig${m.live ? " is-live" : ""}`} aria-hidden="true" />
            )}
            {/* el separador queda pegado a la palabra anterior: nunca empieza línea */}
            {m.v.replace(/ · /g, " · ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// Acciones contextuales: solo aparecen si el destino existe de verdad
// (caseStudy, liveUrl, repoUrl). Los nombres accesibles incluyen el proyecto.
export function ProjectActions({ project, onCaseStudy, className = "" }) {
  const ui = useUI().common;
  const name = project.name;
  return (
    <div className={`pa ${className}`}>
      {project.caseStudy && onCaseStudy && (
        <button type="button" className="pa-l pa-case" onClick={onCaseStudy}>
          {ui.viewCase} <Arrow />
          <span className="bx-sr-only">: {name}</span>
        </button>
      )}
      {project.liveUrl && (
        <a className="pa-l" href={project.liveUrl} target="_blank" rel="noreferrer">
          {ui.liveSite} <External />
          <span className="bx-sr-only">: {name} {ui.newTab}</span>
        </a>
      )}
      {project.repoUrl && (
        <a className="pa-l pa-code" href={project.repoUrl} target="_blank" rel="noreferrer">
          {ui.code} <External />
          <span className="bx-sr-only">: {name} {ui.onGitHub} {ui.newTab}</span>
        </a>
      )}
    </div>
  );
}
