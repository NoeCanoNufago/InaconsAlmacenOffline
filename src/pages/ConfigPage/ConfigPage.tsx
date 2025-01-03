import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchObras } from '../../slices/obrasSlice';
import { setDefaultObra } from '../../slices/0configSlice';
import { syncData } from '../../slices/0syncSlice';
import { FiRefreshCw } from 'react-icons/fi';

const ConfigPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { obras } = useSelector((state: RootState) => state.obra);
  const { defaultObra } = useSelector((state: RootState) => state.config);
  const { isSyncing, lastSync, error } = useSelector((state: RootState) => state.sync);
  const appVersion = import.meta.env.VITE_APP_VERSION;

  useEffect(() => {
    dispatch(fetchObras());
  }, [dispatch]);

  const handleObraChange = (obraId: string) => {
    dispatch(setDefaultObra(obraId));
  };

  const handleSync = async () => {
    await dispatch(syncData());
    dispatch(fetchObras()); // Actualizar datos locales después de la sincronización
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 p-4 shadow-lg rounded-2xl">
        <h2 className="text-xl font-medium text-white ">Configuración</h2>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-md mb-4">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Obra Predeterminada</h3>
            <p className="text-sm text-gray-600 mt-1">
              Selecciona la obra que se cargará por defecto
            </p>
          </div>
          
          <div className="p-4">
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors
                         bg-white text-gray-800"
              value={defaultObra || ''}
              onChange={(e) => handleObraChange(e.target.value)}
            >
              <option value="">Seleccionar obra</option>
              {obras.map((obra) => (
                <option key={obra.id} value={obra.id}>
                  {obra.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sincronización */}
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-md mb-4">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Sincronización de Datos</h3>
              <p className="text-sm text-gray-600 mt-1">
                Última sincronización: {formatDate(lastSync)}
              </p>
            </div>
            
            <div className="p-4">
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className={`flex items-center justify-center w-full px-4 py-3 rounded-lg 
                           ${isSyncing ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'} 
                           text-white font-medium transition-colors duration-200`}
              >
                <FiRefreshCw className={`mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Sincronizando...' : 'Sincronizar Datos'}
              </button>
              
              {error && (
                <p className="mt-2 text-sm text-red-600">
                  Error: {error}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Versión de la app */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Versión {appVersion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
