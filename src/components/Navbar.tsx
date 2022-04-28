import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
const Navbar = () => (
  <nav className="hidden md:flex space-x-10 p-2.5">
    <div className="w-16">
      <Logo data-testid="logo" />
    </div>
  </nav>
);
export default Navbar;
