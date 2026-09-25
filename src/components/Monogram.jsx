import { brand } from "../data/content";

// Símbolo oficial CA. Se dibuja como SVG inline que referencia el archivo
// oficial (public/brand/ca-monogram.svg#ca): el navegador lo pinta como
// vector a cualquier tamaño, sin rasterizarlo (una máscara CSS sí lo hacía).
// El color llega por currentColor desde quien lo usa; la geometría nunca se toca.
export default function Monogram({ className = "", style }) {
  const { src, viewBox } = brand.monogram;
  return (
    <svg
      className={`mg ${className}`}
      style={style}
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`${src}#ca`} />
    </svg>
  );
}
