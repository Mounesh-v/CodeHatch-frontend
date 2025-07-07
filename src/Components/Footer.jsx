import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-[#0a0a1f] to-[#1c1c3b] text-white px-4 sm:px-6 py-10 mt-20 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-300 mb-3">
            Code Hatch
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Empowering learners through interactive education and
            skill-building.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-300 cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="hover:text-yellow-300 cursor-pointer"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/plans"
                className="hover:text-yellow-300 cursor-pointer"
              >
                Plans
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-300 cursor-pointer"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-yellow-300 cursor-pointer">Blog</li>
            <li className="hover:text-yellow-300 cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-yellow-300 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-yellow-300 cursor-pointer">
              Terms of Service
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">mouneshv776@gmail.com</p>
          <p className="text-sm text-gray-400 mb-4">+91 6362533696</p>
          <div className="flex gap-3 flex-wrap">
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-black hover:scale-110 transition">
                  <FaFacebookF size={16} />
                </div>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-black hover:scale-110 transition">
                  <FaTwitter size={16} />
                </div>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-black hover:scale-110 transition">
                  <FaInstagram size={16} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center text-xs sm:text-sm text-gray-500 mt-10 border-t border-white/10 pt-4">
        © {new Date().getFullYear()} E-Learning Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
