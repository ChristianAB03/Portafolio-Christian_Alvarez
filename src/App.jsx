import { MotionConfig } from "framer-motion";
import BrandNav from "./components/BrandNav";
import BrandHero from "./components/BrandHero";
import SelectedWork from "./components/SelectedWork";
import Experiments from "./components/Experiments";
import Experience from "./components/Experience";
import Building from "./components/Building";
import Views, { ContinueNav } from "./components/Views";
import { LangProvider } from "./i18n";

// Rediseño en curso (rama redesign): Nav, Hero, Selected Work, Experiments,
// Experience y Building ya son la nueva marca. About y Contact son vistas
// propias (Views.jsx) sobre la página; el footer vive dentro de Contact.
export default function App() {
  return (
    <LangProvider>
    <MotionConfig reducedMotion="user">
      <BrandNav />
      <main>
        <BrandHero />
        <SelectedWork />
        <Experiments />
        <Experience />
        <Building />
        <ContinueNav />
      </main>
      <Views />
    </MotionConfig>
    </LangProvider>
  );
}
