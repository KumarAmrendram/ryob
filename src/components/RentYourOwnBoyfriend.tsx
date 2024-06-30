import React from "react";
import Image from "next/image";
import couple from "@public/images/couple.png";
const RentYourOwnBoyfriend = () => {
  return (
    <section className="px-4 md:px-20 flex flex-row justify-between items-center w-screen">
      <div className="lg:w-1/2">
        <div className="leading-tight text-center">
          <div className="pe-4 lg:ps-[120px]">
            <span className="allura-regular text-[3rem] lg:text-[10rem] text-primary leading-tight">
              Rent
            </span>
            <span className="text-xl lg:text-5xl font-bold leading-tight ps-6">
              your own{" "}
            </span>
          </div>
          <div className="mt-[-2rem] lg:mt-[-4rem]">
            <p className="text-[3rem] lg:text-[10rem] font-medium leading-tight">
              Boyfriend
            </p>
          </div>  
        </div>
        <p className="my-4 text-xs lg:my-0 md:text-lg">
          We&#39;re inviting men to join our vibrant platform, where you can offer
          companionship to women seeking friendly and respectful dates. At RYOB
          India, we emphasize respect, consent, and appropriate behavior,
          ensuring a positive experience for everyone. Join us today to be part
          of a welcoming community and enjoy exciting perks along the way!
        </p>
      </div>
      <div className="lg:w-1/2 flex justify-center items-center">
        <Image
          src={couple}
          alt="couple"
          className="md:h-full min-h-[220px] min-w-[170px] lg:h-[90vh] lg:w-[600px] object-cover rounded-xl"></Image>
      </div>
    </section>
  );
};

export default RentYourOwnBoyfriend;
