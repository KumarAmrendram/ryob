import React from "react";
import { FaCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative mt-10 min-h-[115vh] w-[90vw] bg-secondary mx-auto rounded-[30px] shadow-lg overflow-hidden">
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center text-white p-4">
        <FaCircle className="text-black" />
        <p className="text-lg font-bold text-center">
          FIND YOUR PERFECT PARTNER
        </p>
        <FaCircle className="text-black" />
        <p className="text-lg font-bold text-center">
          FIND YOUR PERFECT PARTNER
        </p>
        <FaCircle className="text-black" />
        <p className="text-lg font-bold text-center">
          FIND YOUR PERFECT PARTNER
        </p>
        <FaCircle className="text-black" />
        <p className="text-lg font-bold text-center">
          FIND YOUR PERFECT PARTNER
        </p>
        <FaCircle className="text-black" />
      </div>


      {/* Left Border */}
      <div className="absolute top-0 left-[-110px] h-full flex flex-col justify-between items-center text-white pt-[200px]">
        <div className="rotate-90">
          <p className="text-lg font-bold text-center">
            FIND YOUR PERFECT PARTNER
          </p>
        </div>
        <FaCircle className="text-black" />
        <div className="rotate-90">
          <p className="text-lg font-bold text-center">
            FIND YOUR PERFECT PARTNER
          </p>
        </div>
        <FaCircle className="text-black" />
        <div className="rotate-90">
          <p className="text-lg font-bold text-center">
            FIND YOUR PERFECT PARTNER
          </p>
        </div>
      </div>

      {/* Right Border */}
      <div className="absolute top-0 right-[-110px] h-full flex flex-col justify-between items-center text-white pt-[200px]">
        <div className="rotate-90">
          <p className="text-lg font-bold text-center">
            FIND YOUR PERFECT PARTNER
          </p>
        </div>
        <FaCircle className="text-black" />
        <div className="rotate-90">
          <p className="text-lg font-bold text-center">
            FIND YOUR PERFECT PARTNER
          </p>
        </div>
        <FaCircle className="text-black" />
        <div className="rotate-90">
          <p className="text-lg font-bold text-center">
            FIND YOUR PERFECT PARTNER
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
