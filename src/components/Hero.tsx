import React from "react";
import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import Image1 from "@public/images/m6.png";
import Image2 from "@public/images/m1.png";
import centerImage from "@public/images/m7.png";
import Image4 from "@public/images/keerthi-2.png";
import Image5 from "@public/images/keerthi.png";
import heroImage from "@public/images/hero.jpeg";
import "./hero.css";
const Hero = () => {
  return (
    <div>
      <section className="hidden md:block relative mt-10 min-h-[35vh] md:min-h-[100vh] w-[90vw] bg-secondary mx-auto rounded-[30px] shadow-lg overflow-hidden">
        {/* Top Border */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center text-white p-4">
          <FaCircle className="black-dot text-black" />
          <p className="border-text text-lg font-bold text-center">
            FIND YOUR PERFECT PARTNER
          </p>
          <FaCircle className="black-dot text-black" />
          <p className="border-text md:block text-lg font-bold text-center">
            FIND YOUR PERFECT PARTNER
          </p>
          <FaCircle className="black-dot md:block text-black" />
          <p className="hidden md:block text-lg font-bold text-center">
            FIND YOUR PERFECT PARTNER
          </p>
          <FaCircle className="black-dot hidden md:block text-black" />
          <p className="hidden md:block text-lg font-bold text-center">
            FIND YOUR PERFECT PARTNER
          </p>
          <FaCircle className="black-dot hidden md:block text-black" />
        </div>

        {/* Left Border */}
        <div className="absolute top-0 left-[-55px] h-full flex flex-col justify-between items-center text-white pt-[100px] md:pt-[200px] md:left-[-110px]">
          <div className="rotate-90">
            <p className="border-text text-lg font-bold text-center">
              FIND YOUR PERFECT PARTNER
            </p>
          </div>
          <FaCircle className="black-dot text-black" />
          <div className="hidden md:block rotate-90">
            <p className="text-lg font-bold text-center">
              FIND YOUR PERFECT PARTNER
            </p>
          </div>
          <FaCircle className="black-dot hidden md:block text-black" />
          <div className="rotate-90">
            <p className="border-text text-lg font-bold text-center">
              FIND YOUR PERFECT PARTNER
            </p>
          </div>
        </div>

        {/* Right Border */}
        <div className="absolute border-text top-0 right-[-55px] h-full flex flex-col justify-between items-center text-white pt-[105px] md:right-[-110px] md:pt-[200px]">
          <div className="rotate-90">
            <p className="border-text text-lg font-bold text-center">
              FIND YOUR PERFECT PARTNER
            </p>
          </div>
          <FaCircle className="black-dot text-black" />
          <div className="hidden md:block rotate-90">
            <p className="text-lg font-bold text-center">
              FIND YOUR PERFECT PARTNER
            </p>
          </div>
          <FaCircle className="black-dot hidden md:block text-black" />
          <div className="rotate-90">
            <p className="border-text text-lg font-bold text-center">
              FIND YOUR PERFECT PARTNER
            </p>
          </div>
        </div>
        <main className="absolute w-full flex justify-center bottom-[-50px] md:bottom-[-90px] overflow-hidden">
          <div>
            <Image
              src={centerImage}
              alt="center Image"
              className="center-image mt-[70px] z-50"
            />
          </div>{" "}
          <div className="secondary-image-container rotate-[-45deg] md:left-[130px] md:top-[350px] left-[30px] top-[130px]">
            <Image src={Image1} alt="image-1" className="tertiary-image " />
          </div>
          <div className="secondary-image-container rotate-[-22deg] md:left-[300px] md:top-[200px] left-[70px] top-[100px] z-50">
            <Image src={Image2} alt="image-2" className="secondary-image" />
          </div>
          <div className="secondary-image-container rotate-[22deg] md:right-[300px] md:top-[200px] right-[70px] top-[105px] z-50">
            <Image src={Image4} alt="image-4" className="secondary-image " />
          </div>
          <div className="secondary-image-container rotate-[45deg] md:right-[130px] md:top-[350px] right-[30px] top-[130px]">
            <Image src={Image5} alt="image-5" className="tertiary-image  " />
          </div>
        </main>
      </section>
      <section className="md:hidden">
        <Image src={heroImage} alt="hero image" className="hero-image"></Image>
      </section>
    </div>
  );
};

export default Hero;
