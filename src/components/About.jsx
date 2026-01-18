import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Split text (simplified approach without SplitText plugin)
      const spans = gsap.utils.toArray(".reveal-text span");

      gsap.to(spans, {
        color: "#e7d393",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      // Parallax Images
      gsap.to(".floating-img", {
        y: (i) => (i + 1) * -50,
        rotation: (i) => (i % 2 === 0 ? 10 : -10),
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
      })
    },
    { scope: containerRef }
  );

  const text =
    "Crafting the perfect cocktail isn't just about mixing drinks; it's about balancing flavors, textures, and aromas to create an experience. Every sip tells a story of freshness and passion.";

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen w-full bg-black text-white flex flex-col justify-center items-center py-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-5 md:px-20 relative z-10 flex flex-col items-center">
        <p className="font-sans text-xs tracking-[0.5em] text-gray-500 mb-10 uppercase">
          The Philosophy
        </p>

        <h2 className="reveal-text text-4xl md:text-7xl font-modern-negra text-center leading-tight max-w-5xl text-white/20">
          {text.split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-3 md:mr-5">
              {word}
            </span>
          ))}
        </h2>

        {/* Floating Images Grid */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
             <img src="/images/abt1.png" className="floating-img absolute top-[10%] left-[5%] w-40 md:w-60 rounded-lg opacity-30 grayscale mix-blend-screen" />
             <img src="/images/abt2.png" className="floating-img absolute top-[20%] right-[10%] w-32 md:w-52 rounded-lg opacity-30 grayscale mix-blend-screen" />
             <img src="/images/abt3.png" className="floating-img absolute bottom-[20%] left-[15%] w-36 md:w-64 rounded-lg opacity-30 grayscale mix-blend-screen" />
             <img src="/images/abt1.png" className="floating-img absolute bottom-[10%] right-[5%] w-40 md:w-56 rounded-lg opacity-30 grayscale mix-blend-screen" />
        </div>
      </div>
    </section>
  );
};

export default About;
