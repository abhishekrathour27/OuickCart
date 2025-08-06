import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center mt-20" >
      <div className="grid grid-cols-[1.8fr_1fr_1fr] gap-5 w-[77vw] ">
        <div className="space-y-5">
          <img src="logo.svg" alt="logo" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
        </div>
        <div className="ml-10 space-y-5">
            <h1 className="font-semibold">Company</h1>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="space-y-5">
            <h1 className="font-semibold">Get in touch</h1>
            <ul>
                <li>+1-234-567-890</li>
                <li>abhishekrathour@gmail.com</li>
            </ul>
        </div>
      </div>
      <div className="border border-gray-400 w-full mt-10"></div>
      <p className="my-2">Copyright 2025 © abhishek.dev All Right Reserved</p>
    </div>
  );
};

export default Footer;
