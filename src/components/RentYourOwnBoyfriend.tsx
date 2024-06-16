import React from "react";
import Image from "next/image";
import couple from "@public/images/couple.png";
const RentYourOwnBoyfriend = () => {
  return (
    <section className="px-20 flex justify-between items-center w-screen">
      <div className="w-1/2">
        <div className="leading-tight text-center">
          <div className="pe-4 ps-[120px]">
            <span className="allura-regular text-[10rem] text-primary leading-tight">
              Rent
            </span>
            <span className="text-5xl font-bold leading-tight ps-6">
              your own{" "}
            </span>
          </div>
          <div className="mt-[-4rem]">
            <p className="text-[10rem] font-medium leading-tight">
              Boyfriend
            </p>
          </div>
        </div>
        <p className="text-lg">
          Join RYOB India! we&apos;re a platform for all men to offer
          companionship to women seeking friendly dates. We promote respect,
          consent, and appropriate behavior. Looking forward to having you in
          out community!{" "}
        </p>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <Image
          src={couple}
          alt="couple"
          className="h-[90vh] w-[600px] object-cover rounded-xl"></Image>
      </div>
    </section>
  );
};

export default RentYourOwnBoyfriend;
