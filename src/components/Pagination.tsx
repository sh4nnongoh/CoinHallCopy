import React from "react";
const Pagination = () => {
  const styleButton = (text: string) => (
    <button
      type="button"
      className="flex items-center space-x-1 py-2 px-3 rounded bg-gray-800
      transition duration-100 text-gray-500 cursor-default"
    >
      {text}
    </button>
  );
  return (
    <div className="flex justify-end items-center mt-4 text-sm sm:text-base">
      <div className="flex items-center space-x-1 select-none">
        {styleButton("< Previous")}
        <div className="py-2 px-3 bg-gray-800 rounded">
          1
        </div>
        {styleButton("Next >")}
      </div>
    </div>
  );
};
export default Pagination;
