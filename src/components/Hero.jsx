import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Initial Load Animation
      tl.fromTo(
        textRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 0.1, scale: 1, duration: 2, ease: "power4.out" }
      )
        .fromTo(
          imgRef.current,
          { y: 200, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
          "-=1.5"
        )
        .fromTo(
          subTextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.5"
        );

      // Scroll Parallax
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -150,
        opacity: 0,
      });

      gsap.to(imgRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 100,
        scale: 1.1,
      });

      // Leaves Parallax
      gsap.to(".leaf-parallax", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: (i) => (i + 1) * -100,
        rotation: (i) => (i + 1) * 45,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black"
    >
      {/* Background Text */}
      <h1
        ref={textRef}
        className="absolute z-0 text-[20vw] font-modern-negra text-white leading-none select-none tracking-tighter opacity-10 blur-sm"
      >
        MOJITO
      </h1>

      {/* Main Image */}
      <div className="relative z-10 w-[90%] md:w-[35%] aspect-[3/4] flex justify-center items-center">
        <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full opacity-50"></div>
        <img
          ref={imgRef}
          src="/images/cup-2.png"
          alt="Fresh Mojito"
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{
            filter: "drop-shadow(0 0 50px rgba(231, 211, 147, 0.3))",
          }}
        />
      </div>

      {/* Subtext overlay */}
      <div
        ref={subTextRef}
        className="absolute z-20 bottom-20 md:bottom-10 flex flex-col items-center gap-4 mix-blend-difference"
      >
        <p className="text-white font-sans tracking-[0.5em] text-sm md:text-base uppercase">
          The Classic Refresher
        </p>
        <div className="h-16 w-[1px] bg-white/50"></div>
      </div>

      {/* Floating Leaves */}
      <img
        src="/images/hero-left-leaf.png"
        className="leaf-parallax absolute top-1/4 left-[10%] w-[15vw] md:w-[8vw] z-20 opacity-80 blur-[1px]"
        alt="mint"
      />
      <img
        src="/images/hero-right-leaf.png"
        className="leaf-parallax absolute bottom-1/4 right-[10%] w-[12vw] md:w-[6vw] z-20 opacity-80 blur-[2px]"
        alt="mint"
      />
    </section>
  );
};

export default Hero;
