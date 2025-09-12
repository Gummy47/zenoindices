import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import dashboardReducer from "./dashboardSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        dashboard: dashboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
