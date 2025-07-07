import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    id: 1,
    slug: "Full Stack Web Development",
    title: "Full Stack Web Development",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB.",
    level: "Beginner to Advanced",
  },
  {
    id: 2,
    slug: "Python for Data Science",
    title: "Python for Data Science",
    description:
      "Master Python, Pandas, NumPy, and Matplotlib with real-world projects.",
    level: "Beginner",
  },
  {
    id: 3,
    slug: "Machine Learning with Python",
    title: "Machine Learning with Python",
    description: "Hands-on ML using scikit-learn, NumPy, and Jupyter Notebook.",
    level: "Intermediate",
  },
  {
    id: 4,
    slug: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    description:
      "Understand core cybersecurity principles including threats, network security, cryptography, and defense strategies.",
    level: "Beginner to Intermediate",
  },
  {
    id: 5,
    slug: "Android App Development",
    title: "Android App Development",
    description:
      "Build modern Android apps using Kotlin, Jetpack Compose, and Firebase.",
    level: "Beginner to Intermediate",
  },
  {
    id: 6,
    slug: "AI & Machine Learning",
    title: "AI & Machine Learning",
    description:
      "Master ML algorithms, Python, TensorFlow, and real-world AI projects.",
    level: "Intermediate to Advanced",
  },
];

const Courses = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const handleViewCourse = (slug) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to view the course.");
      return navigate("/login");
    }

    try {
      const decoded = jwtDecode(token);
      const role = decoded.role;

      if (role !== "student" && role !== "admin") {
        alert("Unauthorized role.");
        return;
      }

      navigate(`/courses/${slug}`);
    } catch (err) {
      alert("Invalid token. Please log in again.");
      localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
    const cards = sectionRef.current.querySelectorAll(".course-card");

    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 text-white"
      id="courses"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl font-bold text-center mb-12"
        >
          Explore Our <span className="text-yellow-400">Courses</span>
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.slug}
              className="course-card bg-[#1a1a2e] p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-700 hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2 text-yellow-300">
                {course.title}
              </h3>
              <p className="text-gray-300 mb-3">{course.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                Level: {course.level}
              </p>
              <button
                onClick={() => handleViewCourse(course.slug)}
                className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300 transition"
              >
                View Course
              </button>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 flex justify-center mt-10">
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-300 hover:bg-yellow-400 text-black cursor-pointer font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
