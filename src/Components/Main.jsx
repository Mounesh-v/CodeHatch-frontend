import React, { useEffect, useRef, useState } from "react";
import image1 from "../assets/image1.webp";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import google from "../assets/LearnersPlatform/Google.svg";
import Apple from "../assets/LearnersPlatform/Apple.svg";
import IBM from "../assets/LearnersPlatform/IBM.svg";
import Instagram from "../assets/LearnersPlatform/Instagram.svg";
import meta from "../assets/LearnersPlatform/meta.svg";
import Microsoft from "../assets/LearnersPlatform/Microsoft.svg";
import SkillsShowcase from "../Courses/SkillsShowcase";
import TopCourses from "../Courses/TopCourses";

gsap.registerPlugin(SplitText);
const wordList = ["Skills", "Knowledge", "Growth", "Creativity"];

const Main = () => {
  const paraRef = useRef(null);
  const skillRef = useRef(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (skillRef.current) {
      skillRef.current.textContent = wordList[currentWordIndex];
      const split = SplitText.create(skillRef.current, { type: "chars" });

      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power2.out",
          repeat: 1,
          yoyo: true,
          onRepeat: () =>
            setCurrentWordIndex((prev) => (prev + 1) % wordList.length),
        }
      );
    }
  }, [currentWordIndex]);

  useEffect(() => {
    const split = SplitText.create(paraRef.current, {
      type: "words,lines",
      mask: "words",
    });

    gsap.from(split.words, {
      duration: 1,
      opacity: 0,
      y: 20,
      stagger: 0.03,
      ease: "power2.out",
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 py-12 bg-black text-white">
        {/* Text Section */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Develop your <br />
            <span ref={skillRef} className="text-yellow-400 skill-text">
              {wordList[currentWordIndex]}
            </span>
          </h1>
          <p
            ref={paraRef}
            className="split text-base sm:text-lg leading-7 tracking-wide text-gray-300"
          >
            I am building a modern e-learning website designed to help students
            and professionals improve their skills through interactive content,
            video tutorials, coding challenges, and real-world projects. The
            platform features user-friendly navigation, progress tracking,
            personalized learning paths, and responsive design for seamless
            access across all devices. Our mission is to make quality education
            accessible to everyone, regardless of location or background.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-[450px] h-auto flex justify-center">
          <img
            src={image1}
            alt="e-learning visual"
            className="w-[90%] sm:w-[70%] md:w-full object-cover rounded-2xl shadow-xl border border-gray-600"
          />
        </div>
      </div>
      <div>
        <div className="py-10 px-4 text-white bg-black">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10">
            Our learners work at
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            <img
              src={google}
              alt="Google"
              className="h-8 sm:h-10 object-contain"
            />
            <img
              src={Apple}
              alt="Apple"
              className="h-8 sm:h-10 object-contain"
            />
            <img src={IBM} alt="IBM" className="h-8 sm:h-10 object-contain" />
            <img
              src={Instagram}
              alt="Instagram"
              className="h-8 sm:h-10 object-contain"
            />
            <img src={meta} alt="Meta" className="h-8 sm:h-10 object-contain" />
            <img
              src={Microsoft}
              alt="Microsoft"
              className="h-8 sm:h-10 object-contain"
            />
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto mt-20 px-4">
          <SkillsShowcase />
        </div>

        <div>
          <TopCourses />
        </div>
      </div>
    </div>
  );
};

export default Main;
