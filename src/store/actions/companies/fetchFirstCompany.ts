import { createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { type Company } from '../../dashboardSlice'

export const fetchFirstCompany = createAsyncThunk<Company, void, { rejectValue: string }>(
  'companies/fetchFirstCompany',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'companyData'))
      if (querySnapshot.empty) {
        return rejectWithValue('No companies found in companyData collection')
      }
      const firstDoc = querySnapshot.docs[0]
      return {
        id: firstDoc.id,
        ...firstDoc.data()
      } as Company
    } catch (error) {
      console.error('Error fetching first company:', error)
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch company')
    }
  }
)