import React from "react";

const Loader = ({ fullPage = true }: { fullPage?: boolean }) => {
  return (
    <div
      className={`${
        fullPage ? "min-h-screen" : "h-full"
      } flex flex-col justify-center items-center bg-white`}
    >
      {/* Spinner */}
      <div
        className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      ></div>

      {/* Branding text */}
      <p className="mt-4 text-orange-600 font-semibold text-lg animate-pulse">
        Loading QuickCart...
      </p>
    </div>
  );
};

export default Loader;
