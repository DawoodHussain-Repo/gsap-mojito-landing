import React from "react";
import { navLinks } from "../../constants/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    
  useGSAP(() => {
    const showAnim = gsap.from("nav", {
        yPercent: -100,
        paused: true,
        duration: 0.2
    }).progress(1);

    ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
            self.direction === -1 ? showAnim.play() : showAnim.reverse();
        }
    });
  });

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-5 mix-blend-difference">
      <div className="container mx-auto flex justify-between items-center glass rounded-full px-8 py-4">
        <a href="#hero" className="flex items-center gap-2 text-white">
          <p className="font-modern-negra text-2xl tracking-wide">Velvet Pour</p>
        </a>
        <ul className="hidden md:flex gap-10">
          {navLinks.map((link) => {
            return (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-white font-sans text-xs uppercase tracking-widest hover:text-[#e7d393] transition-colors">
                    {link.title}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="md:hidden text-white font-sans text-xs uppercase cursor-pointer">
            Menu
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
