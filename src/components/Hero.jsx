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
  const cherryRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Initial Load Animation
      tl.fromTo(
        textRef.current,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 0.05, scale: 1, duration: 2, ease: "power4.out" }
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
        )
        .fromTo(
          cherryRef.current,
          { y: -500, opacity: 0, scale: 0.5, rotation: -45 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "bounce.out"
          },
          "-=1"
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

      gsap.to(cherryRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 150,
        scale: 0.8,
        rotation: 15,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#2b1b11]"
    >
      {/* Background Text */}
      <h1
        ref={textRef}
        className="absolute z-0 text-[20vw] font-modern-negra text-[#d4a373] leading-none select-none tracking-tighter opacity-5 blur-sm"
      >
        KENTUCKY
      </h1>

      {/* Main Image */}
      <div className="relative z-10 w-[90%] md:w-[35%] aspect-[3/4] flex justify-center items-center mt-10">
        <div className="absolute inset-0 bg-[#d4a373]/20 blur-[100px] rounded-full opacity-40"></div>
        <img
          ref={imgRef}
          src="/images/cup-2.png"
          alt="Fresh Mojito"
          className="w-full h-full object-contain drop-shadow-2xl relative z-10"
          style={{
            filter: "drop-shadow(0 0 50px rgba(212, 163, 115, 0.2))",
          }}
        />
        <img
          ref={cherryRef}
          src="/images/cherry.svg"
          alt="Cherry"
          className="absolute top-[18%] md:top-[15%] w-24 h-24 object-contain drop-shadow-2xl z-20 pointer-events-none"
        />
      </div>

      {/* Subtext overlay */}
      <div
        ref={subTextRef}
        className="absolute z-20 bottom-20 md:bottom-10 flex flex-col items-center gap-4"
      >
        <p className="text-[#f5ebd9] font-sans tracking-[0.5em] text-sm md:text-base uppercase">
          A Vintage Classic
        </p>
        <div className="h-16 w-[1px] bg-[#d4a373]/50"></div>
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
