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
    <main className="noisy bg-[#2b1b11] w-full min-h-screen text-[#f5ebd9]">
      <Navbar />
      <Hero />
      <Showcase />
      <About />
      <Footer />
    </main>
  );
};

export default App;
