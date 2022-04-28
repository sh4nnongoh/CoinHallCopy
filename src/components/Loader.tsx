import React from "react";
const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="animate-pulse animate-bounce inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span className="invisible">Loading...</span>
    </div>
  </div>
);
export default Loader;
