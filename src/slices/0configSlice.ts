import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
  defaultObra: string | null;
}

const initialState: ConfigState = {
  defaultObra: localStorage.getItem('defaultObra'),
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setDefaultObra: (state, action: PayloadAction<string>) => {
      state.defaultObra = action.payload;
      localStorage.setItem('defaultObra', action.payload);
    },
  },
});

export const { setDefaultObra } = configSlice.actions;
export const configReducer = configSlice.reducer;
