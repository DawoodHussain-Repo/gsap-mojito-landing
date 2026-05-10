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
    color: "#d4a373",
    bg: "#2b1b11" // Vintage brown
  },
  {
    id: 2,
    name: "Berry Blast",
    desc: "A sweet twist with fresh strawberries and raspberries.",
    img: "/images/drink2.png",
    color: "#ff6b6b",
    bg: "#3a1f18" // Darker reddish brown
  },
  {
    id: 3,
    name: "Tropical Haze",
    desc: "Infused with passion fruit and mango for a caribbean vibe.",
    img: "/images/drink3.png",
    color: "#4ecdc4",
    bg: "#1f2a1a" // Dark greenish brown
  },
  {
    id: 4,
    name: "Midnight Mix",
    desc: "Dark blackberries and a hint of spice for the bold.",
    img: "/images/drink4.png",
    color: "#a66cff",
    bg: "#281b2b" // Dark purple brown
  },
];

const Showcase = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray(".slide");
      const totalSlides = slides.length;
      
      // Horizontal Scroll Calculation
      // We want to move (totalSlides - 1) viewports to the left
      // xPercent operates on the element's width.
      // If element is 400% width, -100% xPercent moves it completely out of view.
      // We want to stop when the last slide is in view.
      // 1 slide = 100vw. Total width = 400vw.
      // Movement needed = 300vw (to show slide 4).
      // 300vw is 75% of 400vw.
      // So xPercent should be -((totalSlides - 1) / totalSlides) * 100
      
      const xPercentMove = -((totalSlides - 1) / totalSlides) * 100;

      const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + containerRef.current.offsetWidth * 2, // Shorter scroll duration to avoid dead space
        }
      });

      tl.to(sliderRef.current, {
        xPercent: xPercentMove,
        ease: "none",
      });

      // Background Color Animation linked to the SAME timeline (scrub)
      // At 0% progress -> Slide 1 Color
      // At 33% progress -> Slide 2 Color
      // At 66% progress -> Slide 3 Color
      // At 100% progress -> Slide 4 Color
      
      slides.forEach((slide, i) => {
         if (i < slides.length - 1) {
             tl.to(bgRef.current, {
                 backgroundColor: drinks[i+1].bg,
                 ease: "none",
                 duration: 1 / (totalSlides - 1) // Distribute evenly
             }, "<"); // Run safely relative to previous start
         }
      });
      
      // Floating Parallax Elements (Beast Mode)
      // We create a separate timeline specifically for parallax elements that floats continuously
      // but also reacts to scroll
      
      gsap.to(".floater", {
          y: "random(-50, 50)",
          rotation: "random(-20, 20)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.1
      });

    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="cocktails"
      className="relative h-screen w-full overflow-hidden flex items-center"
    >
      {/* Dynamic Background */}
      <div ref={bgRef} className="absolute inset-0 bg-[#2b1b11] transition-colors duration-1000"></div>
      
       {/* Global Texture Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('/images/noise.png')] pointer-events-none z-10"></div>

      <div className="absolute top-10 left-10 md:left-20 z-20 mix-blend-difference">
         <h2 className="text-4xl md:text-6xl font-modern-negra text-[#f5ebd9]">The Collection</h2>
      </div>

        {/* The Slider Container - Width = 100vw * 4 */}
      <div ref={sliderRef} className="flex h-full items-center w-[400%] relative z-10 will-change-transform">
        {drinks.map((drink, index) => (
          <div
            key={drink.id}
            className="slide w-[100vw] h-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 shrink-0 px-10 relative"
          >
             {/* Background Decoration Text */}
             <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden">
                 <h2 className="text-[30vw] font-modern-negra text-[#d4a373] opacity-[0.05] select-none whitespace-nowrap">
                     {drink.name.split(" ")[0]}
                 </h2>
             </div>

            {/* Image */}
            <div className="relative w-full md:w-1/3 flex justify-center group perspective-1000">
               {/* Floating Ingredients Parallax */}
               <img src="/images/hero-left-leaf.png" className="floater absolute -top-20 -left-10 w-20 opacity-50 blur-[2px]" />
               <img src="/images/slider-right-leaf.png" className="floater absolute bottom-20 -right-10 w-24 opacity-60" />
               
               <div className="absolute inset-0 bg-[#d4a373]/5 blur-3xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <img
                src={drink.img}
                alt={drink.name}
                className="relative h-[50vh] md:h-[70vh] object-contain drop-shadow-2xl will-change-transform"
                style={{
                     filter: `drop-shadow(0 20px 50px ${drink.color}50)`
                }}
              />
            </div>

            {/* Content */}
            <div className="md:w-1/3 flex flex-col gap-6 text-center md:text-left z-10 p-10 glass rounded-3xl backdrop-blur-md border border-[#d4a373]/10 shadow-2xl bg-[#1f1209]/40">
              <span className="text-stroke text-8xl md:text-9xl font-modern-negra absolute -top-12 -right-10 opacity-30 pointer-events-none select-none">
                 0{index + 1}
              </span>
              <h3 className="text-4xl md:text-6xl font-modern-negra text-[#f5ebd9] leading-none">
                {drink.name}
              </h3>
              <p className="font-sans text-[#f5ebd9]/70 text-lg font-light leading-relaxed">
                {drink.desc}
              </p>
              
              <div className="w-full h-[1px] bg-[#d4a373]/20 my-2"></div>
              
              <div className="flex gap-4 justify-center md:justify-start items-center">
                   <button className="px-8 py-3 bg-[#d4a373] text-[#1f1209] hover:bg-[#f5ebd9] transition-all duration-300 font-sans uppercase tracking-widest text-xs font-bold rounded-full">
                       Order Now
                   </button>
                   <p className="font-modern-negra text-2xl text-[#d4a373]">$18.00</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
       <div className="absolute bottom-10 right-10 flex gap-2 z-20">
          <div className="text-[#f5ebd9]/50 text-xs font-sans uppercase tracking-widest animate-pulse">
              Drag or Scroll
          </div>
       </div>
    </section>
  );
};

export default Showcase;
