import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { profile, snapshot } from "../data/content";
import { Arrow, Download } from "./icons";

const EASE = [0.2, 0.7, 0.2, 1];
const fade = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export default function Hero() {
  const host = useRef(null);
  const halo = useRef(null);

  // El glow azul del fondo reacciona muy lentamente al puntero.
  useEffect(() => {
    const el = halo.current, box = host.current;
    if (!el || !box) return;

    let r = box.getBoundingClientRect();
    let x = r.width * 0.62, y = r.height * 0.34;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;

    let tx = x, ty = y, raf = 0;
    const onMove = (e) => {
      r = box.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const loop = () => {
      x += (tx - x) * 0.045;
      y += (ty - y) * 0.045;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <header className="hero" id="top" ref={host}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-halo" ref={halo} />
        <div className="hero-mesh" />
      </div>

      <div className="wrap">
        <div className="rg">
          <motion.div className="hero-rail" {...fade(0.08)} aria-hidden="true">
            <div className="tag">[01]</div>
            <hr />
            {profile.heroRail.map((w) => (
              <span className="word" key={w}>{w}</span>
            ))}
            <div className="meta">
              {profile.location}
              <br />
              {profile.year} — Available
            </div>
          </motion.div>

          <div>
            <motion.div className="hero-id" {...fade(0.02)}>
              <span className="hero-id-name">{profile.name}</span>
              <i className="hero-id-rule" aria-hidden="true" />
              <span className="hero-id-role">{profile.location}</span>
            </motion.div>

            <motion.div className="hero-state" {...fade(0.05)}>
              <span className="state">
                <span className="sig" aria-hidden="true"><i /><i /><i /><i /></span>
                {profile.available}
              </span>
              <i className="ln" aria-hidden="true" />
            </motion.div>

            <motion.h1 {...fade(0.12)}>
              Software Engineer <span className="lo">building</span> modern web apps{" "}
              <span className="amp">&amp;</span> <span className="hi">AI-powered</span> products
              <span className="caret" aria-hidden="true" />
            </motion.h1>

            <motion.p className="hero-sub" {...fade(0.2)}>
              {profile.heroLead}
            </motion.p>

            <motion.div className="hero-cta" {...fade(0.28)}>
              <a href="#work" className="btn btn-primary">
                View Work <Arrow />
              </a>
              {profile.cvReady && (
                <a href={profile.cv} download={profile.cvName} className="btn btn-ghost">
                  Download CV <Download />
                </a>
              )}
            </motion.div>
          </div>
        </div>

        <motion.div className="snap" {...fade(0.38)}>
          <div className="snap-head">
            <span className="k">Engineering snapshot</span>
            <span className="v">At a glance</span>
          </div>
          <div className="snap-grid">
            {snapshot.map((s, i) => (
              <div className={`snap-i${s.accent ? " accent" : ""}`} key={s.k}>
                <div className="idx">0{i + 1}</div>
                <div className="n">{s.n}</div>
                <div className="k">{s.k}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}
