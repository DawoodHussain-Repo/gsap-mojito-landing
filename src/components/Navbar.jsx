import React from "react";
import { navLinks } from "../../constants/index";
import logo from "../../public/images/logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });
    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#00000050",
        duration: 1,
        ease: "power1.inOut",
        backgroundFilter: "blur(10px)",
      }
    );
  });
  return (
    <nav>
      <div>
        <a href="#home" className="flex items-center gap-2">
          <img src={logo} alt="logo" />
          <p>Velvet Pour</p>
        </a>
        <ul>
          {navLinks.map((link) => {
            return (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
