import { useEffect, useRef } from "react";

// Cursor personalizado muy sutil: un anillo que sigue al puntero con retardo.
// El cursor nativo se mantiene visible (nunca sacrificamos usabilidad).
// Los elementos que quieran cambiar su estado usan data-cursor="View case study".
export default function Cursor() {
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = innerWidth / 2, y = innerHeight / 2;
    let tx = x, ty = y, raf = 0, mode = "";

    const setMode = (next, text) => {
      if (next === mode) return;
      mode = next;
      el.classList.toggle("view", next === "view");
      if (text && label.current) label.current.textContent = text;
    };

    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      el.classList.add("on");
      const hit = e.target instanceof Element ? e.target.closest("[data-cursor]") : null;
      setMode(hit ? "view" : "", hit?.dataset.cursor);
    };
    const onDown = () => el.classList.add("tap");
    const onUp = () => el.classList.remove("tap");
    const onLeave = () => el.classList.remove("on");

    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerdown", onDown, { passive: true });
    addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerdown", onDown);
      removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="cursor" ref={ring} aria-hidden="true">
      <span className="lbl" ref={label} />
    </div>
  );
}
