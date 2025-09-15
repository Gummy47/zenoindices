import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import companiesReducer from "./companiesSlice";

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        companies: companiesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
