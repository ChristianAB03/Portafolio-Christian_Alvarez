// Marca un texto traducible del contenido: t("English", "Español").
// Lo que no lleva t() (nombres propios, tecnologías, URLs) es igual en ambos idiomas.
export const TR = Symbol("translatable");
export const t = (en, es) => ({ [TR]: true, en, es });
