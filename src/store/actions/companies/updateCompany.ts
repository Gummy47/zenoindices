import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { DateTime } from "luxon";
import type { ICompanyDocument } from "../../../core/interfaces";

export const updateCompany = createAsyncThunk<
    ICompanyDocument,
    { id: string; data: Pick<ICompanyDocument, "data"> },
    { rejectValue: string }
>(
    "companies/updateCompany",
    async (
        { id, data },
        { rejectWithValue },
    ) => {
        try {
            const docRef = doc(db, "companyData", id);
            
            const updatedData = {
                ...data,
                updatedAt: DateTime.local().toISO(),
            };

            await updateDoc(docRef, updatedData);
            return {
                id,
                ...updatedData,
            };
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
