import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
    viewMode: "Actual" | "Previous";
}

const initialState: DashboardState = {
    viewMode: "Actual",
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setViewMode: (state, action: PayloadAction<"Actual" | "Previous">) => {
            state.viewMode = action.payload;
        },
    },
});

export const { setViewMode } = dashboardSlice.actions;

export default dashboardSlice.reducer;
