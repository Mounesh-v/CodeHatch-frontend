import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    title: "Full Stack Web Development",
    duration: "6 hours",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB to become a full-stack developer.",
  },
  {
    title: "Python Programming",
    duration: "3 hours",
    description: "Master Python basics, data structures, OOP, and libraries like Pandas and NumPy.",
  },
  {
    title: "Java Development",
    duration: "4 hours",
    description: "Build strong foundations in Java, object-oriented programming, and backend APIs.",
  },
  {
    title: "Data Structures & Algorithms",
    duration: "2.5 hours",
    description: "Sharpen your problem-solving skills using C++, Java, or Python for coding interviews.",
  },
  {
    title: "Machine Learning with Python",
    duration: "5 hours",
    description: "Learn supervised and unsupervised ML algorithms using sklearn, pandas, and Jupyter.",
  },
  {
    title: "Frontend with React",
    duration: "2 hours",
    description: "Design dynamic and responsive UIs using React, Tailwind CSS, and component libraries.",
  },
];

const TopCourses = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Heading and text entrance
    gsap.fromTo(
      headingRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // Course cards animation
    const cards = containerRef.current.querySelectorAll(".course-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, rotateY: 45 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-16 px-6 bg-gradient-to-b from-black via-[#0a0a1f] to-black text-white"
    >
      <div className="text-center mb-10">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Top Courses
        </h2>
        <p
          ref={textRef}
          className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg"
        >
          Explore our most popular, career-focused courses designed for developers, analysts, and learners of all levels.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="course-card bg-white/5 border border-white/10 rounded-xl p-6 hover:scale-105 transition-transform shadow-xl backdrop-blur-md"
          >
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">
              {course.title}
            </h3>
            <p className="text-sm text-gray-300 mb-3">{course.description}</p>
            <span className="text-sm text-gray-400">
              Duration:{" "}
              <strong className="text-white">{course.duration}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCourses;
