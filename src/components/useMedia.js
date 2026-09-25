import { useEffect, useState } from "react";

// true mientras la media query se cumple. Sirve para las pocas decisiones de
// contenido que no se pueden resolver solo con CSS (síntesis en móvil).
export const MOBILE = "(max-width: 639px)";

export default function useMedia(query) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && matchMedia(query).matches);
  useEffect(() => {
    const m = matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}
