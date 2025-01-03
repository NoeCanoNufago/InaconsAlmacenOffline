import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_GRAPHQL_URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetAllData {
              obras {
                id
                nombre
                descripcion
                ubicacion
                direccion
                estado
                tipo_id {
                  id
                  nombre
                }
              }
              # Aquí puedes agregar más queries para otros datos necesarios
            }
          `
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error de sincronización');
    }
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
      .addCase(syncData.fulfilled, (state) => {
        state.isSyncing = false;
        const now = new Date().toISOString();
        state.lastSync = now;
        localStorage.setItem('lastSync', now);
      })
      .addCase(syncData.rejected, (state, action) => {
        state.isSyncing = false;
        state.error = action.payload as string;
      });
  }
});

export const syncReducer = syncSlice.reducer;
