import { DateTime } from "luxon";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import type { ICompanyDocument } from "../../../core/interfaces";
import { customToast } from "../../../utils/toast";

export const addCompany = createAsyncThunk<
    ICompanyDocument,
    Pick<ICompanyDocument, "data">,
    { rejectValue: string }
>(
    "companies/addCompany",
    async (
        companyData,
        { rejectWithValue },
    ) => {
        try {
            const docRef = await addDoc(collection(db, "companyData"), {
                ...companyData,
                createdAt: DateTime.local().toISO(),
                updatedAt: DateTime.local().toISO(),
            });

            customToast.success(
                `Successfully imported: ${companyData.data.Company["Company Common Name"]}`,
            );

            return {
                id: docRef.id,
                ...companyData,
            };
        } catch (error) {
            console.error("Error adding company:", error);
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : "Failed to add company",
            );
        }
    },
);
