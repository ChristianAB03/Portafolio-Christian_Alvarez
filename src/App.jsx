import { MotionConfig } from "framer-motion";
import Chrome from "./components/Chrome";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedWork from "./components/FeaturedWork";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Principles from "./components/Principles";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Chrome />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <FeaturedWork />
        <Experience />
        <Projects />
        <TechStack />
        <Principles />
        <About />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
