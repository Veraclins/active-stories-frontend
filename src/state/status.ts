import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentStatusState = {
  loading: boolean;
  error: string;
};

type ErrorPayload = string;

type LoadingStatus = boolean;

const initialState: CurrentStatusState = {
  loading: false,
  error: '',
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    changeLoadingState(state, action: PayloadAction<LoadingStatus>) {
      state.loading = action.payload;
    },
    showError(state, action: PayloadAction<ErrorPayload>) {
      state.error = action.payload;
    },
  },
});

export const { changeLoadingState, showError } = statusSlice.actions;

export default statusSlice.reducer;
