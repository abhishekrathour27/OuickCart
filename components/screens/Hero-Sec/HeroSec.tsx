"use client";
import React, { useEffect, useState } from "react";
import Slider1 from "./Slider1";
import { MoveLeft, MoveRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const HeroSec = () => {
  const sliderData = [
    {
      offer: "Limited Time Offer 30% Off",
      description: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      img: "header_headphone_image.png",
    },
    {
      offer: "Hurry up only few lefts!",
      description:
        "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      img: "header_playstation_image.png",
    },
    {
      offer: "Exclusive Deal 40% Off",
      description: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      img: "header_macbook_image.png",
    },
  ];

  const sliderArr = [
    {
      key: 0,
      node: (
        <Slider1
          offer={sliderData[0].offer}
          description={sliderData[0].description}
          img={sliderData[0].img}
        />
      ),
    },
    {
      key: 1,
      node: (
        <Slider1
          offer={sliderData[1].offer}
          description={sliderData[1].description}
          img={sliderData[1].img}
        />
      ),
    },
    {
      key: 2,
      node: (
        <Slider1
          offer={sliderData[2].offer}
          description={sliderData[2].description}
          img={sliderData[2].img}
        />
      ),
    },
  ];

  const [index, setIndex] = useState(0);


  return (
    <div>
      <div className="flex items-center justify-center mt-5 gap-5">
        <div className="bg-[#E6E9F2] w-8 h-8 flex justify-center items-center rounded-full  ">
          <MoveLeft
            onClick={() =>
              setIndex((prev) => (prev === 0 ? sliderArr.length - 1 : prev - 1))
            }
            className="text-6xl cursor-pointer"
          />
        </div>
        <div className="bg-[#E6E9F2] h-[60vh] w-[77vw] rounded-xl overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex items-center justify-center"
            >
              {sliderArr[index].node}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="bg-[#E6E9F2] w-8 h-8 flex justify-center items-center rounded-full  ">
          <MoveRight
            onClick={() =>
              setIndex((prev) => (prev === sliderArr.length - 1 ? 0 : prev + 1))
            }
            className="text-6xl cursor-pointer"
          />
        </div>
      </div>
      <center className="flex mt-5 justify-center gap-2">
        <div
          className={`h-3 w-3 rounded-full ${
            index === 0 ? "bg-[#EA580C]" : "bg-[#ced1d9]"
          } `}
        ></div>
        <div
          className={`h-3 w-3 rounded-full ${
            index === 1 ? "bg-[#EA580C]" : "bg-[#ced1d9]"
          } `}
        ></div>
        <div
          className={`h-3 w-3 rounded-full ${
            index === 2 ? "bg-[#EA580C]" : "bg-[#ced1d9]"
          } `}
        ></div>
      </center>
    </div>
  );
};

export default HeroSec;
