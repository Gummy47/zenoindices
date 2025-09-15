import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  type DocumentData,
  QuerySnapshot,
  type Unsubscribe
} from 'firebase/firestore'
import { db } from './firebase'

export interface DbDocument {
  id: string
  [key: string]: any
}

export class DatabaseService {
  // Get a single document
  static async getDocument(collectionName: string, documentId: string): Promise<DbDocument | null> {
    try {
      const docRef = doc(db, collectionName, documentId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        }
      }
      return null
    } catch (error) {
      console.error('Error getting document:', error)
      throw error
    }
  }

  // Get all documents from a collection
  static async getCollection(collectionName: string): Promise<DbDocument[]> {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName))
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error getting collection:', error)
      throw error
    }
  }

  // Add a new document
  static async addDocument(collectionName: string, data: any): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return docRef.id
    } catch (error) {
      console.error('Error adding document:', error)
      throw error
    }
  }

  // Update a document
  static async updateDocument(collectionName: string, documentId: string, data: any): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId)
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Error updating document:', error)
      throw error
    }
  }

  // Delete a document
  static async deleteDocument(collectionName: string, documentId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, collectionName, documentId))
    } catch (error) {
      console.error('Error deleting document:', error)
      throw error
    }
  }

  // Query documents with conditions
  static async queryDocuments(
    collectionName: string,
    conditions: Array<{ field: string; operator: any; value: any }> = [],
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'asc',
    limitCount?: number
  ): Promise<DbDocument[]> {
    try {
      let q = collection(db, collectionName)

      // Apply where conditions
      conditions.forEach(condition => {
        q = query(q, where(condition.field, condition.operator, condition.value))
      })

      // Apply ordering
      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection))
      }

      // Apply limit
      if (limitCount) {
        q = query(q, limit(limitCount))
      }

      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error querying documents:', error)
      throw error
    }
  }

  // Real-time listener for a collection
  static subscribeToCollection(
    collectionName: string,
    callback: (documents: DbDocument[]) => void,
    conditions: Array<{ field: string; operator: any; value: any }> = []
  ): Unsubscribe {
    let q = collection(db, collectionName)

    conditions.forEach(condition => {
      q = query(q, where(condition.field, condition.operator, condition.value))
    })

    return onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      callback(documents)
    }, (error) => {
      console.error('Error in collection subscription:', error)
    })
  }
}