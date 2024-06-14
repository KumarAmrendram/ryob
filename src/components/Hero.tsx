import React from "react";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import Image1 from "@public/images/m6.png";
import Image2 from "@public/images/m1.png";
import centerImage from "@public/images/m7.png";
import Image4 from "@public/images/keerthi-2.png";
import Image5 from "@public/images/keerthi.png";
import "./hero.css"
const Hero = () => {
  return (
    <section className="relative mt-10 min-h-[100vh] w-[90vw] bg-secondary mx-auto rounded-[30px] shadow-lg overflow-hidden">
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
      <main className="absolute w-full flex justify-center bottom-[-90px] overflow-hidden">
        <div>
          <Image
            src={centerImage}
            alt="center Image"
            className="center-image mt-[70px] z-50"
          />
        </div>{" "}
        <div className="secondary-image-container rotate-[-45deg] left-[130px] top-[350px]">
          <Image src={Image1} alt="image-1" className="secondary-image " />
        </div>
        <div className="secondary-image-container rotate-[-22deg] left-[300px] top-[200px] z-50">
          <Image src={Image2} alt="image-2" className="secondary-image" />
        </div>
        <div className="secondary-image-container rotate-[22deg] right-[300px] top-[200px] z-50">
          <Image src={Image4} alt="image-4" className="secondary-image " />
        </div>
        <div className="secondary-image-container rotate-[45deg] right-[130px] top-[350px]">
          <Image src={Image5} alt="image-5" className="tertiary-image  " />
        </div>
      </main>
    </section>
  );
};

export default Hero;
