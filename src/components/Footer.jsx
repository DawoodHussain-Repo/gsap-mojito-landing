import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import { navLinks } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".footer-title", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
      });
      
       gsap.from(".footer-link", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.5
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative w-full py-20 bg-black text-white border-t border-white/5 overflow-hidden flex flex-col justify-between min-h-[80vh]"
    >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#e7d393]/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-5 relative z-10 flex flex-col items-center justify-center grow">
          <p className="font-sans text-xs tracking-[0.5em] text-yellow mb-5 uppercase footer-link">
              Ready for a taste?
          </p>
          <h2 className="footer-title text-[15vw] font-modern-negra leading-none text-center mix-blend-overlay opacity-80">
              CHEERS
          </h2>
          <div className="mt-10 flex gap-5">
               <button className="footer-link px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 font-sans tracking-widest uppercase text-sm">
                   Book a Table
               </button>
               <button className="footer-link px-8 py-3 bg-white text-black hover:bg-[#e7d393] transition-colors duration-300 font-sans tracking-widest uppercase text-sm">
                   Contact Us
               </button>
          </div>
      </div>

      <div className="container mx-auto px-5 relative z-10 flex flex-col md:flex-row justify-between items-end gap-10 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-modern-negra">Velvet Pour</h3>
              <p className="font-sans text-sm text-gray-500 max-w-xs">
                  Elevating the art of mixology, one pour at a time.
              </p>
          </div>

          <div className="flex gap-10">
              <ul className="flex flex-col gap-2 text-sm text-right">
                  <li className="font-bold text-yellow mb-2 uppercase tracking-widest">Socials</li>
                  <li className="text-gray-400 hover:text-white cursor-pointer transition-colors">Instagram</li>
                  <li className="text-gray-400 hover:text-white cursor-pointer transition-colors">Facebook</li>
                  <li className="text-gray-400 hover:text-white cursor-pointer transition-colors">Twitter</li>
              </ul>
              <ul className="flex flex-col gap-2 text-sm text-right">
                  <li className="font-bold text-yellow mb-2 uppercase tracking-widest">Sitemap</li>
                   {navLinks.map((link) => (
                      <li key={link.id}>
                        <a href={`#${link.id}`} className="text-gray-400 hover:text-white cursor-pointer transition-colors">{link.title}</a>
                      </li>
                   ))}
              </ul>
          </div>
      </div>
       <div className="text-center mt-10 text-[10px] text-gray-700 uppercase tracking-widest">
            © 2024 Velvet Pour.
       </div>
    </footer>
  );
};

export default Footer;
