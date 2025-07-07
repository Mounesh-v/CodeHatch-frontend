import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import Main from "./Main";
import Courses from "./Courses";
import Plans from "./Plan";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);
const Home = () => {
  const starRef = useRef([]);
  const boxRef = useRef([]);

  useEffect(() => {
    // Animate stars
    starRef.current.forEach((star, i) => {
      gsap.to(star, {
        y: () => -50 - i * 20,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    });

    // Animate boxes
    boxRef.current.forEach((box, i) => {
      gsap.to(box, {
        y: () => -100 - i * 30,
        rotation: 10 + i * 5,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });
    });
  }, []);
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a1f] to-black text-white overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`star-${i}`}
          ref={(el) => (starRef.current[i] = el)}
          className="absolute w-[2px] h-[2px] bg-white opacity-60 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`box-${i}`}
          ref={(el) => (boxRef.current[i] = el)}
          className="absolute w-16 h-16 bg-purple-500 opacity-30 border border-white/80 rounded-lg blur-sm"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 90}%`,
          }}
        />
      ))}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
