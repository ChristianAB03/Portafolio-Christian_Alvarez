import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as raw from "../data/content";
import { ui } from "./ui";
import { TR } from "./t";

// Internacionalización ligera, sin librería.
// - El contenido vive en data/content.js. Cada texto traducible es t(en, es);
//   lo que no se traduce (nombres propios, tecnologías, URLs) es un valor plano.
// - Los textos de interfaz (botones, etiquetas, accesibilidad) viven en ui.js.
// - useContent() entrega el contenido ya resuelto al idioma activo; los
//   componentes nunca preguntan por el idioma para elegir un texto.
export const LANGS = ["en", "es"];
const DEFAULT = "en";
const KEY = "bx-lang";

// Resuelve en profundidad un árbol de contenido a un idioma.
function resolve(node, lang) {
  if (Array.isArray(node)) return node.map((n) => resolve(n, lang));
  if (node && typeof node === "object") {
    if (node[TR]) return node[lang];
    const out = {};
    for (const k in node) out[k] = resolve(node[k], lang);
    return out;
  }
  return node;
}

// El contenido resuelto se calcula una vez por idioma.
const cache = {};
const contentFor = (lang) => (cache[lang] ||= resolve({ ...raw }, lang));

const read = () => {
  try {
    const v = localStorage.getItem(KEY);
    return LANGS.includes(v) ? v : DEFAULT;
  } catch {
    return DEFAULT;
  }
};

const LangContext = createContext({ lang: DEFAULT, setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(read);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return;
    setLangState((cur) => {
      if (cur === next) return cur;
      try {
        localStorage.setItem(KEY, next);
      } catch {
        /* sin almacenamiento (modo privado): el idioma vale para esta visita */
      }
      // fundido corto del contenido; con reduced-motion el CSS lo anula
      const root = document.documentElement;
      root.classList.remove("bx-lang-fade");
      void root.offsetWidth;
      root.classList.add("bx-lang-fade");
      setTimeout(() => root.classList.remove("bx-lang-fade"), 320);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
export const useContent = () => contentFor(useLang().lang);
export const useUI = () => ui[useLang().lang];
