import Reveal, { Rule } from "./Reveal";

// Cabecera editorial compartida: línea azul + índice 0X / 06 + label + título.
export default function SectionHead({ index, total = "07", label, title, lead }) {
  return (
    <header className="sec-head">
      <Rule />
      <div className="sec-head-in rg">
        <Reveal delay={0.05}>
          <div className="sec-idx">
            <b>{index}</b>
            <span>/ {total}</span>
          </div>
          <div className="sec-label">{label}</div>
        </Reveal>
        <div>
          <Reveal as="h2" className="sec-title" delay={0.1}>{title}</Reveal>
          {lead && <Reveal as="p" className="sec-lead" delay={0.16}>{lead}</Reveal>}
        </div>
      </div>
    </header>
  );
}
