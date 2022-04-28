import React from "react";
const FilterButtons = () => {
  const myButton = (text: string) => (
    <button
      type="button"
      className="px-3 py-1 rounded font-semibold transition duration-100 hover:text-violet-300"
    >
      {text}
    </button>
  );
  return (
    <div className="mt-8 mb-4 space-x-2 text-lg text-gray-500">
      { myButton("Top") }
      { myButton("All") }
    </div>
  );
};
export default FilterButtons;
