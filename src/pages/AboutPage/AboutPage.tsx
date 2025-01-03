import React from 'react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const AboutPage: React.FC = () => {
  const appVersion = import.meta.env.VITE_APP_VERSION;
  const { recursos } = useSelector((state: RootState) => state.recurso);
  console.log(recursos);
  return (
    <div className="h-[calc(100vh-8rem)] w-full p-8 bg-gray-50/10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Acerca de la App</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Sistema de Gestión de Almacenes
          </h2>
          <p className="text-gray-600 mb-4">
            Versión {appVersion}
          </p>
          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Características principales:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Gestión de inventario en tiempo real</li>
              <li>Control de ubicaciones</li>
              <li>Proceso de picking y packing</li>
              <li>Seguimiento de movimientos</li>
              <li>Gestión de stock</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Información de contacto
          </h2>
          <div className="text-gray-600">
            <p>Soporte técnico: cervando@inacons.com.pe</p>
            <p>Teléfono: (051) 939-456-997</p>
            <p>Horario: Lunes a Viernes 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
