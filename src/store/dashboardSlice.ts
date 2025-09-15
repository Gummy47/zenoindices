import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ViewMode } from "../core/types";
import { ViewModes } from "../core/constants";

interface DashboardState {
    viewMode: ViewMode;
}

const initialState: DashboardState = {
    viewMode: ViewModes.ACTUAL,
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setViewMode: (state, action: PayloadAction<ViewMode>) => {
            state.viewMode = action.payload;
        },
    },
});

export const { setViewMode } = dashboardSlice.actions;

export default dashboardSlice.reducer;
