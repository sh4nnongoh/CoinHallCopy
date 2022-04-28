import React from "react";
import { ReactComponent as SortDesc } from "../assets/sortDesc.svg";
const SortButtons = () => (
  <div className="flex items-stretch space-x-1 mb-4">
    <div className="relative">
      <div className="flex items-stretch divide-x divide-gray-600 hover:divide-violet-600
        rounded transition duration-100"
      >
        <button
          type="button"
          className="flex items-center rounded-l py-2 px-4 bg-gray-800 hover:text-violet-100
          hover:bg-violet-600 hover:bg-opacity-30 transition duration-100"
        >
          <SortDesc data-testid="sort-icon" />
        </button>
        <button
          type="button"
          className="py-2 px-4 bg-gray-800 rounded-r hover:text-violet-100 hover:bg-violet-600
          hover:bg-opacity-30 transition duration-100"
        >
          Market Cap
        </button>
      </div>
    </div>
  </div>
);
export default SortButtons;
