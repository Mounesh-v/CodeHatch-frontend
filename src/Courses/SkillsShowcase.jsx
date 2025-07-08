import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Particles from "react-tsparticles"; 
import { loadFull } from "tsparticles";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", style: { filter: "invert(1)" } },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg",style: { filter: "invert(1)" } },
  { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
];

const SkillsShowcase = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const audioRef = useRef(new Audio("/sounds/whoosh.mp3"));

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };
  
  useEffect(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=700",
      pin: true,
      scrub: true,
    });

    gsap.fromTo(
      headingRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
        },
      }
    );
    gsap.fromTo(
      subheadingRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: "top 90%",
        },
      }
    );
    const cards = containerRef.current.querySelectorAll(".skill-card");
    gsap.fromTo(
      cards,
      { rotateY: 90, opacity: 0 },
      {
        rotateY: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => audioRef.current.play(),
        },
      }
    );
  }, []);

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotationY: x / 20,
      rotationX: -y / 20,
      transformPerspective: 800,
      ease: "power2.out",
      duration: 0.3,
    });
  };

  const handleMouseLeave = (card) => {
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  return (
    <div
      id="skills"
      ref={containerRef}
      className="relative py-14 px-4 sm:px-6 bg-gradient-to-b from-[#0a0a1f] to-black text-white overflow-hidden"
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            size: { value: 2 },
            color: { value: "#ffffff" },
            move: { speed: 1 },
            links: {
              enable: true,
              color: "#ffffff",
              distance: 120,
              opacity: 0.2,
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 text-center mb-8">
        <h2 ref={headingRef} className="text-2xl sm:text-4xl font-bold mb-2">
          Build Skills That Stand Out
        </h2>
        <p
          ref={subheadingRef}
          className="text-gray-400 text-sm sm:text-base max-w-md mx-auto"
        >
          Master the most in-demand programming languages and boost your tech career.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="skill-card bg-white/5 border border-white/10 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform"
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <img
              src={skill.logo}
              alt={skill.name}
              className="w-8 h-8 mb-2"
              loading="lazy"
              style={skill.style}
            />
            <span className="text-xs font-medium text-white text-center">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsShowcase;
