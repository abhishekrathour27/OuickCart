import React from "react";

const Login = () => {
  return (
    <div>
      <div>
        <div>
          <h1 className="font-semibold text-xl">Login to OuickCart</h1>
          <p className="text-sm text-gray-400">
            Welcome back! Please sign in to continue
          </p>
        </div>
        <div>
          <input type="text" placeholder="Enter your email" className="border py-2 p" />
        </div>
      </div>
    </div>
  );
};

export default Login;
