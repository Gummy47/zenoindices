import { createAsyncThunk } from '@reduxjs/toolkit'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { type Company } from '../../dashboardSlice'

export const fetchCompanyById = createAsyncThunk<Company, string, { rejectValue: string }>(
  'companies/fetchCompanyById',
  async (companyId: string, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'companyData', companyId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Company
      } else {
        return rejectWithValue('Company not found')
      }
    } catch (error) {
      console.error('Error fetching company:', error)
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch company')
    }
  }
)