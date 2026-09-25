import { useContent, useUI } from "../i18n";
import Monogram from "./Monogram";
import { Arrow, External, Download } from "./icons";

// Vista Contact: el cierre. Titular grande, el email como protagonista y los
// demás canales reales con jerarquía propia. El footer vive aquí, abajo.
// El monograma aparece como firma de cierre: asoma desde el borde inferior.
export default function Contact({ headingRef }) {
  const { profile, contactTitle } = useContent();
  const ui = useUI();
  const words = contactTitle.split(" ");
  const last = words.pop();

  const channels = [
    {
      k: "WhatsApp",
      v: "+57 304 549 1728",
      href: `https://wa.me/${profile.whatsapp}`,
      external: true,
    },
    { k: "LinkedIn", v: "christianalvarez0316", href: profile.linkedin, external: true },
    { k: "GitHub", v: "@ChristianAB03", href: profile.github, external: true },
    profile.cvReady && { k: "CV", v: ui.contact.downloadPdf, href: profile.cv, download: profile.cvName },
  ].filter(Boolean);

  return (
    <section className="ctc" id="contact" aria-labelledby="ctc-title">
      <Monogram className="ctc-mark" />
      <div className="ctc-in">
        <div className="ctc-main">
          <p className="bx-eyebrow">
            <span className="bx-eyebrow-n">{ui.contact.eyebrow}</span>
            <i aria-hidden="true" />
            <span>{profile.location}</span>
          </p>
          <h2 id="ctc-title" className="ctc-title" ref={headingRef} tabIndex={-1}>
            {words.join(" ")} <span>{last}</span>
          </h2>
          <p className="ctc-avail">{profile.available}</p>

          <a className="ctc-email" href={`mailto:${profile.email}`}>
            <span className="ctc-email-k">{ui.contact.email}</span>{" "}
            <span className="ctc-email-v">{profile.email}</span>
            <Arrow />
          </a>

          <ul className="ctc-channels">
            {channels.map((c) => (
              <li key={c.k}>
                <a
                  className="ctc-ch"
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  {...(c.download ? { download: c.download } : {})}
                >
                  <span className="ctc-ch-k">{c.k}</span>{" "}
                  <span className="ctc-ch-v">
                    {c.v} {c.download ? <Download /> : <External />}
                  </span>
                  {c.external && <span className="bx-sr-only"> {ui.common.newTab}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <footer className="ctc-foot">
          <p>© {profile.year} {profile.name}</p>
          <nav aria-label={ui.contact.footer} className="ctc-foot-nav">
            <a href="#about">{ui.nav.links.about}</a>
            <a href="#top">{ui.contact.backToTop}</a>
          </nav>
        </footer>
      </div>
    </section>
  );
}
