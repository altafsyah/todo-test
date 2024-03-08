import { configureStore, createSlice } from "@reduxjs/toolkit";
import { todosApi } from "./services/todos";
import { setupListeners } from "@reduxjs/toolkit/query";

const pagination = createSlice({
  name: "pagination",
  initialState: {
    start: "1",
  },
  reducers: {
    setStart: (state, action) => {
      state.start = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    [todosApi.reducerPath]: todosApi.reducer,
    pagination: pagination.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;
export const { setStart } = pagination.actions;
export default store;
