import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'

export const deleteCompany = createAsyncThunk<string, string, { rejectValue: string }>(
  'companies/deleteCompany',
  async (companyId: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'companyData', companyId))
      return companyId
    } catch (error) {
      console.error('Error deleting company:', error)
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete company')
    }
  }
)