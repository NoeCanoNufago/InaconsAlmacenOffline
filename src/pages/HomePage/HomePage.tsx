import React from 'react';
import { 
  FiBox, 
  FiInfo, 
  FiTruck,
  FiMap,
  FiShoppingCart,
  FiPackage,
  FiDatabase,
  FiClipboard,
} from 'react-icons/fi';
import { WaveBackground } from '../../components/WaveBackground/WaveBackground';

interface MenuItemProps {
  title: string;
  icon: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps & { notifications?: number }> = ({ title, icon, notifications }) => (
  <div className="flex flex-col items-center justify-center relative bg-transparent rounded-lg p-4 text-white cursor-pointer transition-all duration-300 h-32 min-w-full">
    <WaveBackground />
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
      {(notifications ?? 0) > 0 && (
        <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {notifications}
        </div>
      )}
      <div className="text-3xl mb-2">{icon}</div>
      <span className="text-sm text-center">{title}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const menuItems = [
    { title: 'Movimientos', icon: <FiBox />, notifications: 0, to: '/home/movimientos' },
    { title: 'Acerca de', icon: <FiInfo />, notifications: 1, to: '/home/acerca' },
    { title: 'Recepción', icon: <FiTruck />, notifications: 2, to: '/home/recepcion' },
    { title: 'Ubicaciones', icon: <FiMap />, notifications: 2, to: '/home/ubicaciones' },
    { title: 'Picking', icon: <FiShoppingCart />, notifications: 2, to: '/home/picking' },
    { title: 'Packing', icon: <FiPackage />, notifications: 2, to: '/home/packing' },
    { title: 'Stock', icon: <FiDatabase />, notifications: 2, to: '/home/stock' },
    { title: 'Inventarios', icon: <FiClipboard />, notifications: 2, to: '/home/inventarios' },
  ];

  return (
    <div className="min-w-[100vw-20rem] bg-white/10 h-[calc(100vh-8rem)] w-full">
      <div className="mx-auto p-4">

        {/* Title */}
        <div className="mb-6">
          <h3 className="text-xl font-bold">Gestión de almacenes</h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;