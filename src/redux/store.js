import { configureStore } from '@reduxjs/toolkit';
import workspaceReducer from './workspaceSlice';
import postitReducer from './postitSlice';

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    postit: postitReducer,
  },
});
