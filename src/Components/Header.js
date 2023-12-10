import React from "react";
import { Link } from "react-router-dom";
import logo from "./Logo (1).png";
const Header = () => {
  return (
    <div className=" p-5 border border-gray-300 ">
      <div className=" mx-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className=" w-36 mr-2" />
          <h1 className="text-white text-lg font-semibold">Your Website</h1>
        </div>

        {/* Navigation links on the right corner */}
        <nav className="flex items-center space-x-4">
          <Link to="/" className="">
            Home
          </Link>
          <Link to="/" className="">
            Help
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
