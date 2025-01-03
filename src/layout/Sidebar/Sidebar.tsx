import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiBox, FiInfo, FiTruck, FiMap, FiShoppingCart, FiPackage, FiDatabase, FiClipboard } from 'react-icons/fi';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const menuItems = [
    { to: "/home", icon: FiHome, text: "Inicio" },
    { to: "/home/movimientos", icon: FiBox, text: "Movimientos", notifications: 0 },
    { to: "/home/recepcion", icon: FiTruck, text: "Recepción", notifications: 2 },
    { to: "/home/ubicaciones", icon: FiMap, text: "Ubicaciones", notifications: 2 },
    { to: "/home/picking", icon: FiShoppingCart, text: "Picking", notifications: 2 },
    { to: "/home/packing", icon: FiPackage, text: "Packing", notifications: 2 },
    { to: "/home/stock", icon: FiDatabase, text: "Stock", notifications: 2 },
    { to: "/home/inventarios", icon: FiClipboard, text: "Inventarios", notifications: 2 },
    { to: "/home/acerca", icon: FiInfo, text: "Acerca de", notifications: 1 },
  ];

  return (
    <div 
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-800 via-gray-700 to-black
              shadow-2xl transition-all duration-500 z-40 text-white hover:text-gray-700
              ${isSidebarOpen ? 'w-64' : 'w-0 lg:w-16'}
              ${isHovered && !isSidebarOpen ? 'lg:w-64' : ''}`}
      onMouseEnter={() => {
        setIsHovered(true);
        toggleSidebar();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        toggleSidebar();
      }}
    >
      <nav className="flex flex-col p-2 h-full overflow-y-auto space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/home"}
            className={({ isActive }) =>
              `flex items-center py-3 px-4 rounded-lg transition-all duration-300 ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-white-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5 min-w-[1.25rem]" />
            {(isSidebarOpen || isHovered) && (
              <span className="ml-3 h-5 whitespace-nowrap overflow-hidden transition-all duration-300">
                {item.text}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;