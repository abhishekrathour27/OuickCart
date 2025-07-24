import React from "react";
import CustomBtn from "../../custom/CustomBtn";

interface Slider1Props {
  offer: string;
  description: string;
  img: string;
}

const Slider1: React.FC<Slider1Props> = ({ offer, description, img }) => {
  return (
    <div>
      <div className="flex justify-around items-center mt-10 h-[50vh]">
        <div className="w-[50%] space-y-3">
          <p className="text-[#EA580C]">{offer}</p>
          <h1 className="text-5xl font-semibold">{description}</h1>
          <CustomBtn className="rounded-full">Shop Now</CustomBtn>
        </div>
        <div>
          <img src={img} alt="headphone" className="w-[250px] " />
        </div>
      </div>
    </div>
  );
};

export default Slider1;
