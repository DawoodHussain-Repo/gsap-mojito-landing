import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const drinks = [
  {
    id: 1,
    name: "Classic Mint",
    desc: "The timeless refresher with crushed mint and fresh lime.",
    img: "/images/drink1.png",
    color: "#e7d393",
  },
  {
    id: 2,
    name: "Berry Blast",
    desc: "A sweet twist with fresh strawberries and raspberries.",
    img: "/images/drink2.png",
    color: "#ff6b6b",
  },
  {
    id: 3,
    name: "Tropical Haze",
    desc: "Infused with passion fruit and mango for a caribbean vibe.",
    img: "/images/drink3.png",
    color: "#4ecdc4",
  },
  {
    id: 4,
    name: "Midnight Mix",
    desc: "Dark blackberries and a hint of spice for the bold.",
    img: "/images/drink4.png",
    color: "#a66cff",
  },
];

const Showcase = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray(".slide");

      gsap.to(sliderRef.current, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (slides.length - 1),
          end: () => "+=" + containerRef.current.offsetWidth * 3, // Scroll duration
        },
      });
      
      // Card Parallax
       slides.forEach((slide) => {
         const img = slide.querySelector("img");
         const text = slide.querySelector(".slide-text");
         
         if (img && text) {
             gsap.from(img, {
                 scale: 0.8,
                 opacity: 0,
                 scrollTrigger: {
                     trigger: slide,
                     containerAnimation: gsap.getById("sliderTween"), // We need to link this if we were doing container animation, but here we are moving the slider.
                     // Since we are horizontally scrolling, native trigger works if we weren't pinning.
                     // For pinned horizontal scroll, standard practice is to animate elements based on x position or just keep them static and let the slider move.
                     // Simpler approach: Just let them slide.
                 }
             })
         }
       })
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="cocktails"
      className="relative h-screen w-full overflow-hidden bg-black flex items-center"
    >
      <div className="absolute top-10 left-10 md:left-20 z-20 mix-blend-difference">
         <h2 className="text-4xl md:text-6xl font-modern-negra text-white">The Collection</h2>
      </div>

      <div ref={sliderRef} className="flex h-[70vh] items-center px-10 md:px-20 gap-20 md:gap-40 w-[400%]">
        {drinks.map((drink, index) => (
          <div
            key={drink.id}
            className="slide w-screen flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 shrink-0"
          >
            {/* Image */}
            <div className="relative w-full md:w-1/3 flex justify-center group">
               <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <img
                src={drink.img}
                alt={drink.name}
                className="relative h-[40vh] md:h-[60vh] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105 hover:-rotate-6"
              />
            </div>

            {/* Content */}
            <div className="md:w-1/3 flex flex-col gap-6 text-center md:text-left z-10 p-8 glass rounded-2xl w-[90%]">
              <span className="text-stroke text-8xl md:text-9xl font-modern-negra absolute -top-10 -right-5 md:-right-10 opacity-20 pointer-events-none">
                 0{index + 1}
              </span>
              <h3 className="text-4xl md:text-5xl font-modern-negra text-white">
                {drink.name}
              </h3>
              <p className="font-sans text-gray-400 text-lg font-light leading-relaxed">
                {drink.desc}
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                   <button className="px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-sans uppercase tracking-widest text-xs">
                       Details
                   </button>
                    <button className="px-6 py-2 bg-white text-black hover:bg-[#e7d393] transition-all duration-300 font-sans uppercase tracking-widest text-xs">
                       Order Now
                   </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
       <div className="absolute bottom-10 right-10 flex gap-2 z-20">
          <div className="text-white/50 text-xs font-sans uppercase tracking-widest">
              Scroll to Explore
          </div>
       </div>
    </section>
  );
};

export default Showcase;
