import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { ICompanyDocument } from "../../../core/interfaces";

export const fetchCompanies = createAsyncThunk<
    ICompanyDocument[],
    void,
    { rejectValue: string }
>("companies/fetchCompanies", async (_, { rejectWithValue }) => {
    try {
        const querySnapshot = await getDocs(collection(db, "companyData"));

        const companies = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as ICompanyDocument[];

        return companies;
    } catch (error) {
        console.error("Error fetching companies:", error);
        return rejectWithValue(
            error instanceof Error
                ? error.message
                : "Failed to fetch companies",
        );
    }
});
