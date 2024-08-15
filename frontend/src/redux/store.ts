import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // You will create this slice later

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here as your app grows
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;