import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { customToast } from '../../../utils/toast'

export const deleteCompany = createAsyncThunk<string, { id: string; name: string }, { rejectValue: string }>(
  'companies/deleteCompany',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'companyData', id))
      
      customToast.success(`Successfully deleted: ${name}`)
      
      return id
    } catch (error) {
      console.error('Error deleting company:', error)
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete company')
    }
  }
)