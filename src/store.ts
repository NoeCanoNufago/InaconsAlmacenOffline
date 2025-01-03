import { configureStore } from '@reduxjs/toolkit';
import { configReducer } from './slices/0configSlice';
import { obraReducer } from './slices/obrasSlice';
import { syncReducer } from './slices/0syncSlice';
import { recursoReducer } from './slices/recursoSlice';
import { usuarioReducer } from './slices/usuarioSlice';
import { obraBodegaReducer } from './slices/obraBodegaSlice';
import { obraBodegaRecursoReducer } from './slices/obraBodegaRecursoSlice';

export const store = configureStore({
  reducer: {
    config: configReducer,
    obra: obraReducer,
    sync: syncReducer,
    recurso: recursoReducer,
    usuario: usuarioReducer,
    obraBodega: obraBodegaReducer,
    obraBodegaRecurso: obraBodegaRecursoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;