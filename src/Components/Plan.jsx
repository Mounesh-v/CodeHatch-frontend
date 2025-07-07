import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: 1,
    title: "Basic Plan",
    price: "Free",
    description: "Get access to beginner courses and community forums.",
    features: ["Basic Courses", "Community Support", "Limited Resources"],
  },
  {
    id: 2,
    title: "Pro Plan",
    price: "₹499/month",
    description: "Unlock intermediate to advanced courses and projects.",
    features: [
      "All Basic Features",
      "Intermediate & Advanced Courses",
      "Project-Based Learning",
      "Monthly Live Sessions",
    ],
  },
  {
    id: 3,
    title: "Premium Plan",
    price: "₹999/month",
    description:
      "Full access to all resources, mentorship, and certifications.",
    features: [
      "All Pro Features",
      "1-on-1 Mentorship",
      "Career Guidance",
      "Certification",
      "Downloadable Resources",
    ],
  },
];

const Plans = () => {
  const [showMessage, setShowMessage] = useState(false);
  const popupRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();
  const audioRef = useRef(new Audio("/sounds/notify.mp3")); // optional sound

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to access the plans.");
      return navigate("/login");
    }

    try {
      const decoded = jwtDecode(token);
      const role = decoded.role;
      if (role !== "student" && role !== "admin") {
        alert("Unauthorized access.");
        return navigate("/login");
      }
    } catch (err) {
      alert("Invalid token. Please log in again.");
      localStorage.clear();
      return navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // GSAP animation for cards on scroll
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".plan-container",
          start: "top 80%",
        },
      }
    );
  }, []);

  useEffect(() => {
    if (showMessage && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      );

      // Optional: Play sound on entrance
      window.addEventListener(
        "click",
        () => {
          if (audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
        },
        { once: true }
      );
    }
  }, [showMessage]);

  const handleGetStarted = () => {
    if (!showMessage) {
      setShowMessage(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-300">
        Our Plans
      </h1>
      <p className="text-center mb-12 text-gray-300">
        Choose the best plan for your learning journey
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto plan-container">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-[#1a1a2e] p-8 rounded-xl shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
            <p className="text-yellow-300 text-xl font-bold mb-4">
              {plan.price}
            </p>
            <p className="text-sm text-gray-300 mb-4">{plan.description}</p>
            <ul className="text-sm space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="before:content-['✓'] before:mr-2 text-gray-200">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={handleGetStarted}
              className="bg-yellow-300 text-black px-6 py-3 rounded-md hover:bg-yellow-400 transition font-medium w-full"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      {/* GSAP Animated Popup */}
      {showMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl text-center max-w-xl w-full mx-4"
          >
            <h2 className="text-2xl font-bold mb-4 text-yellow-300">
              All Courses Are Free!
            </h2>
            <p className="text-lg text-gray-100 mb-4">
              🎉 Great news! You can access all our courses completely{" "}
              <span className="text-green-400 font-semibold">free of charge</span>.
              <br />
              We are currently not selling any premium plans. Learn anytime, anywhere—without paying!
            </p>
            <button
              onClick={() => setShowMessage(false)}
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
