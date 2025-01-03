import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TableComponent from '../../components/Tables/TableComponent';

const StockPage = () => {
  const { defaultObra } = useSelector((state: RootState) => state.config);
  const { obraBodegaRecursos, loading, error } = useSelector((state: RootState) => state.obraBodegaRecurso);

  console.log(obraBodegaRecursos)

  const formatTableData = () => {
    const headers = ['Código', 'Recurso', 'Bodega', 'Cantidad', 'Costo', 'Estado'];
    const rows = obraBodegaRecursos.map(item => ({
      'Código': item.recurso_id.codigo,
      'Recurso': item.recurso_id.nombre,
      'Bodega': item.obra_bodega_id.nombre,
      'Cantidad': item.cantidad,
      'Costo': `$${item.costo.toLocaleString()}`,
      'Estado': item.estado
    }));

    return {
      headers,
      rows,
      filter: [true, true, true, false, false, true], // Permite filtrar por código, recurso, bodega y estado
      filterSelect: [false, false, true, false, false, true] // Select para bodega y estado
    };
  };

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!defaultObra) return <div className="p-4">Por favor seleccione una obra en configuración</div>;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Stock Actual</h2>
        <p className="text-gray-600">Inventario actual por bodega</p>
      </div>

      <TableComponent tableData={formatTableData()} />
    </div>
  );
};

export default StockPage;
