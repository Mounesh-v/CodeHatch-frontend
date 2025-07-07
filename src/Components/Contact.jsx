import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const messageRef = useRef(null); // for gsap

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xzzgqlvd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  useEffect(() => {
    if (sent && messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [sent]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1f] to-black px-6 py-20 text-white">
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl shadow-lg p-8 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <p className="text-center text-gray-300 mb-10">
          Have questions or feedback? Reach out and we’ll get back to you.
        </p>

        {sent && (
          <div
            ref={messageRef}
            className="text-green-400 text-center font-semibold mb-6"
          >
            ✅ Message sent successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm">Your Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Your Message</label>
            <textarea
              name="message"
              required
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-md resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
