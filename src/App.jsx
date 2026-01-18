import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import About from "./components/About";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <main className="noisy bg-black w-full min-h-screen">
      <Navbar />
      <Hero />
      <Showcase />
      <About />
      <Footer />
    </main>
  );
};

export default App;
