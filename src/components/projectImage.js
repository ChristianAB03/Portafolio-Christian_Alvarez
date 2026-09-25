// Las capturas originales miden ~4000px. Para no descargarlas ni decodificarlas
// a ese tamaño se sirven variantes de 960/1600/2400px (mismo nombre + "-<ancho>").
const WIDTHS = [960, 1600, 2400];

export function srcSetOf(src) {
  if (!src?.endsWith(".webp")) return undefined;
  const base = src.slice(0, -5);
  return WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(", ");
}

// Ancho real con el que se pinta cada composición. Las piezas recortan con
// object-fit: cover, así que la imagen se dibuja más ancha que su marco
// (sobre todo el retrato); los valores lo tienen en cuenta.
export const WORK_SIZES = {
  bleed: "(max-width: 1023px) 100vw, 62vw",
  inset: "(max-width: 1023px) 100vw, 66vw",
  type: "(max-width: 1023px) 100vw, 70vw",
  panorama: "(max-width: 1023px) 100vw, 82vw",
};
