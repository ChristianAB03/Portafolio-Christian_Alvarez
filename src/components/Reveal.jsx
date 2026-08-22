import { motion } from "framer-motion";

const EASE = [0.2, 0.7, 0.2, 1];

// Aparición al entrar en viewport: slide-up muy corto, rápido y discreto.
// framer-motion respeta prefers-reduced-motion automáticamente.
export default function Reveal({ children, delay = 0, y = 14, as = "div", className, style, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Línea fina que se expande de izquierda a derecha. Es el gesto que
// atraviesa todo el sitio: cada sección la abre con un trazo azul.
export function Rule({ delay = 0, className = "" }) {
  return (
    <div className={`rule ${className}`.trim()}>
      <motion.i
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      />
    </div>
  );
}
