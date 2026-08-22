import Reveal, { Rule } from "./Reveal";
import { profile } from "../data/content";
import { Arrow, Download, WhatsApp, LinkedIn, GitHub } from "./icons";

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <Rule />
        <div className="sec-head-in rg">
          <Reveal delay={0.05}>
            <div className="sec-idx">
              <b>07</b>
              <span>/ 07</span>
            </div>
            <div className="sec-label">Contact</div>
          </Reveal>

          <div>
            <Reveal as="h2" className="ct-title" delay={0.1}>
              Let's build
              <br />
              something
              <br />
              <span className="hi">useful.</span>
            </Reveal>

            <Reveal as="p" className="ct-lead" delay={0.16}>
              Disponible para oportunidades como Software Engineer, proyectos freelance
              y productos que valga la pena construir.
            </Reveal>

            <Reveal delay={0.22}>
              <a className="ct-cta" href={`mailto:${profile.email}`}>
                Start a conversation <Arrow />
              </a>
            </Reveal>

            <Reveal className="ct-alt" delay={0.28}>
              <a
                className="lnk neutral"
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp <WhatsApp />
              </a>
              <a className="lnk neutral" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <LinkedIn />
              </a>
              <a className="lnk neutral" href={profile.github} target="_blank" rel="noreferrer">
                GitHub <GitHub />
              </a>
              {profile.cvReady && (
                <a className="lnk neutral" href={profile.cv} download={profile.cvName}>
                  Download CV <Download />
                </a>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
