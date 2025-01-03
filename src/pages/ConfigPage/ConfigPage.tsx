import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setDefaultObra } from '../../slices/0configSlice';
import { syncData } from '../../slices/0syncSlice';
import { FiRefreshCw } from 'react-icons/fi';

// Lista de consultas disponibles
const availableQueries = [
  { id: 'obras', name: 'Obras', description: 'Obras y sus detalles' },
  { id: 'usuarios', name: 'Usuarios', description: 'Usuarios y cargos del sistema' },
  { id: 'recursos', name: 'Recursos', description: 'Inventario de recursos' },
];

const ConfigPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { obras } = useSelector((state: RootState) => state.obra);
  const { defaultObra } = useSelector((state: RootState) => state.config);
  const { isSyncing, lastSync, error } = useSelector((state: RootState) => state.sync);
  const appVersion = import.meta.env.VITE_APP_VERSION;

  const handleObraChange = (obraId: string) => {
    dispatch(setDefaultObra(obraId));
  };

  const handleSync = async () => {
    await dispatch(syncData());
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-gray-100/10">
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

        {/* Nueva sección de consultas */}
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-md mb-4">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Consultas Disponibles</h3>
              <p className="text-sm text-gray-600 mt-1">
                Lista de consultas que se actualizan durante la sincronización
              </p>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                {availableQueries.map((query) => (
                  <div key={query.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">{query.name}</h4>
                      <p className="text-sm text-gray-600">{query.description}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {lastSync ? 'Actualizado' : 'Pendiente'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
