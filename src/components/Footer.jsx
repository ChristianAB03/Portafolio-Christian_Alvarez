import { profile } from "../data/content";

export default function Footer() {
  const mark = profile.logo.replace(/[<>/]/g, "");

  return (
    <footer>
      <div className="wrap foot">
        <a href="#top" className="logo" aria-label={profile.name}>
          <i className="br b1">&lt;</i>
          <i>{mark}</i>
          <i className="sl">/</i>
          <i className="br b2">&gt;</i>
        </a>

        <div className="foot-links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>

        <span className="c">© 2026 {profile.name}</span>
      </div>
    </footer>
  );
}
