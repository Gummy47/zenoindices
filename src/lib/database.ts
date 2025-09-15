import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface DbDocument {
    id: string;
    [key: string]: unknown;
}

export class DatabaseService {
    // Get a single document
    static async getDocument(
        collectionName: string,
        documentId: string,
    ): Promise<DbDocument | null> {
        try {
            const docRef = doc(db, collectionName, documentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data(),
                };
            }
            return null;
        } catch (error) {
            console.error("Error getting document:", error);
            throw error;
        }
    }

    // Get all documents from a collection
    static async getCollection(collectionName: string): Promise<DbDocument[]> {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            console.error("Error getting collection:", error);
            throw error;
        }
    }

    // Add a new document
    static async addDocument(
        collectionName: string,
        data: object,
    ): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return docRef.id;
        } catch (error) {
            console.error("Error adding document:", error);
            throw error;
        }
    }

    // Update a document
    static async updateDocument(
        collectionName: string,
        documentId: string,
        data: object,
    ): Promise<void> {
        try {
            const docRef = doc(db, collectionName, documentId);
            await updateDoc(docRef, {
                ...data,
                updatedAt: new Date(),
            });
        } catch (error) {
            console.error("Error updating document:", error);
            throw error;
        }
    }

    // Delete a document
    static async deleteDocument(
        collectionName: string,
        documentId: string,
    ): Promise<void> {
        try {
            await deleteDoc(doc(db, collectionName, documentId));
        } catch (error) {
            console.error("Error deleting document:", error);
            throw error;
        }
    }
}
