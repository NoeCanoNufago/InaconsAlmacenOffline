import React from 'react';
import { BsGear } from 'react-icons/bs';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { GrNotification } from 'react-icons/gr';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const logo = '/vite.svg';

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-gray-800 via-black to-gray-700 z-50 shadow-lg">
      <div className="h-full mx-auto">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-8 ">
            <button 
              onClick={toggleSidebar} 
              className="text-white hover:text-blue-600 transition-colors duration-200"
              aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isSidebarOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
            <img src={logo} alt="Logo" className="h-10" />
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-64 px-5 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              />
              <FiSearch className="absolute right-4 top-2.5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            </div>

            <button className="relative text-white hover:text-black transition-colors duration-200">
              <GrNotification className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                0
              </span>
            </button>

            <button className="text-white hover:text-black transition-colors duration-200">
              <BsGear className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;