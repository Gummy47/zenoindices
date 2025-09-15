import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { type Company } from "../../dashboardSlice";

export const updateCompany = createAsyncThunk<
    Company,
    { id: string; data: Partial<Company> },
    { rejectValue: string }
>(
    "companies/updateCompany",
    async (
        { id, data }: { id: string; data: Partial<Company> },
        { rejectWithValue },
    ) => {
        try {
            const docRef = doc(db, "companyData", id);
            const updatedData = {
                ...data,
                updatedAt: new Date(),
            };
            await updateDoc(docRef, updatedData);
            return {
                id,
                ...updatedData,
            } as Company;
        } catch (error) {
            console.error("Error updating company:", error);
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Failed to update company",
            );
        }
    },
);
