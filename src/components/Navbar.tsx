import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import WalletConnect from "./WalletConnect";
const Navbar = () => (
  <nav className="relative h-14 text-lg z-50">
    <div className="relative flex justify-between items-center bg-gray-900 border-b border-gray-800 h-full">
      <div className="flex h-full justify-start items-center w-16">
        <Logo data-testid="logo" />
      </div>
      <div className="flex justify-end items-center sm:mr-4">
        <WalletConnect />
      </div>
    </div>
  </nav>
);
export default Navbar;
