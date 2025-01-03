import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { obraReducer } from '../slices/obrasSlice';


export const store = configureStore({
  reducer: {
    obra: obraReducer,
  },

  //Para que se tome mas tiempo en responder todas las solicitudes de la API
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Aumentar el tiempo de advertencia a 100ms
        warnAfter: 100,
        // Opcionalmente, puedes ignorar ciertas acciones
        ignoredActions: ['some/action/type'],
        // Opcionalmente, puedes ignorar ciertas rutas del estado
        ignoredPaths: ['some.path.to.ignore'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);