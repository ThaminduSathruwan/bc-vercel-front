// Navbar.tsx

import React, { useState, FunctionComponent } from "react";
import { FaChartBar, FaCog, FaQuestionCircle } from 'react-icons/fa';
import Logo from "../Assets/Logo.png";

interface NavbarProps {
   openStatsModal: () => void;
   openHelpModal: () => void;
}
const Navbar: React.FC<NavbarProps> = ({openStatsModal, openHelpModal}) => {
  
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={Logo} alt="Site Logo" className="h-8 w-8" />
        <span className="font-semibold text-xl tracking-tight">OneBCVis</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
            />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <button
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
              onClick={() => openStatsModal()}
            >
              <FaChartBar className="inline-block mr-1" /> Stats
            </button>
            <button
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
              onClick={() => openHelpModal()}
            >
              <FaQuestionCircle className="inline-block mr-1" /> Help
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <input
            className="border rounded-lg p-1 bg-gray-700 text-white"
            type="text"
            placeholder="Search..."
          />
          <button className="ml-2 p-1 bg-gray-700 text-white rounded-lg">
            <svg
              className="fill-current h-4 w-4"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Search</title>
              <path
                fillRule="evenodd"
                d="M13.293 11.707a6 6 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243zM6 11a5 5 0 100-10 5 5 0 000 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
