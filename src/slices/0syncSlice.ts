import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchObras } from './obrasSlice';
import { fetchRecursos } from './recursoSlice';
import { fetchUsuariosAndCargos } from './usuarioSlice';
import { fetchObraBodegasByObraId } from './obraBodegaSlice';
import { fetchRecursosBodegaByObra } from './obraBodegaRecursoSlice';

interface SyncState {
  isSyncing: boolean;
  lastSync: string | null;
  error: string | null;
}

const initialState: SyncState = {
  isSyncing: false,
  lastSync: localStorage.getItem('lastSync'),
  error: null
};

export const syncData = createAsyncThunk(
  'sync/syncData',
  async (_, { dispatch, getState }) => {
    // Obtener defaultObra del estado
    const state = getState() as RootState;
    const defaultObra = state.config.defaultObra;

    // Ejecutar consultas base en paralelo
    await Promise.all([
      dispatch(fetchObras()),
      dispatch(fetchRecursos()),
      dispatch(fetchUsuariosAndCargos())
    ]);

    // Si hay una obra por defecto, ejecutar las consultas adicionales
    if (defaultObra) {
      await Promise.all([
        dispatch(fetchObraBodegasByObraId(defaultObra)),
        dispatch(fetchRecursosBodegaByObra(defaultObra))
      ]);
    }

    return new Date().toISOString();
  }
);

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncData.pending, (state) => {
        state.isSyncing = true;
        state.error = null;
      })
      .addCase(syncData.fulfilled, (state, action) => {
        state.isSyncing = false;
        const now = action.payload;
        state.lastSync = now;
        localStorage.setItem('lastSync', now);
      })
      .addCase(syncData.rejected, (state, action) => {
        state.isSyncing = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const syncReducer = syncSlice.reducer;
