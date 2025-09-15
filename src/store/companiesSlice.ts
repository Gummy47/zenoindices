import { createSlice } from "@reduxjs/toolkit";
import { fetchCompanies } from "./actions/companies/fetchCompanies";
import { addCompany } from "./actions/companies/addCompany";
import { updateCompany } from "./actions/companies/updateCompany";
import { deleteCompany } from "./actions/companies/deleteCompany";
import {
    handleFetchAll,
    handleAdd,
    handleUpdate,
    handleDelete,
} from "./utils/asyncReducerHelpers";
import type { ICompanyDocument } from "../core/interfaces";
import { ViewModes } from "../core/constants";
import type { ViewMode } from "../core/types";

interface CompaniesState {
    entities: ICompanyDocument[];
    current: ICompanyDocument | null;
    viewMode: ViewMode;
    loading: boolean;
    error: string | null;
}

const initialState: CompaniesState = {
    entities: [],
    current: null,
    viewMode: ViewModes.ACTUAL,
    loading: false,
    error: null,
};

// Companies slice
const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        clearError: state => {
            state.error = null;
        },
        setCurrent: (state, action: { payload: ICompanyDocument }) => {
            state.current = action.payload;
        },
        setViewMode: (state, action: { payload: ViewMode }) => {
            state.viewMode = action.payload;
        },
    },
    extraReducers: builder => {
        // Use helper functions to reduce boilerplate
        handleFetchAll(builder, fetchCompanies, "entities");
        handleAdd(builder, addCompany, "entities");
        handleUpdate(builder, updateCompany, "entities", "current");
        handleDelete(builder, deleteCompany, "entities", "current");
    },
});

export const { clearError, setCurrent, setViewMode } = companiesSlice.actions;
export default companiesSlice.reducer;
