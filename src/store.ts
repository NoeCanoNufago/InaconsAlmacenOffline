import { configureStore } from '@reduxjs/toolkit';
import { configReducer } from './slices/0configSlice';
import { obraReducer } from './slices/obrasSlice';
import { syncReducer } from './slices/0syncSlice';
import { recursoReducer } from './slices/recursoSlice';
import { usuarioReducer } from './slices/usuarioSlice';

export const store = configureStore({
  reducer: {
    config: configReducer,
    obra: obraReducer,
    sync: syncReducer,
    recurso: recursoReducer,
    usuario: usuarioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;