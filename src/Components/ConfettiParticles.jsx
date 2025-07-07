import React from "react";
import Particles from "react-tsparticles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";

const ConfettiParticles = () => {
  const particlesInit = async (engine) => {
    await loadConfettiPreset(engine);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-none">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          preset: "confetti",
          fullScreen: {
            enable: true,
            zIndex: 998,
          },
        }}
      />
      <div className="absolute text-4xl sm:text-5xl font-extrabold text-pink-500 drop-shadow-md text-center animate-pulse px-4">
      🔥 Great Start! Time to Unlock New Skills!
      </div>
    </div>
  );
};

export default ConfettiParticles;
