import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Lesson } from '../types/lesson';
import { UserStats } from '../services/achievementService';

export class DatabaseService {
  private static convertTimestamp(timestamp: Timestamp): string {
    return timestamp.toDate().toISOString();
  }

  private static convertDocument(doc: DocumentData): any {
    const converted = { ...doc };
    Object.keys(converted).forEach(key => {
      if (converted[key] instanceof Timestamp) {
        converted[key] = this.convertTimestamp(converted[key]);
      }
    });
    return converted;
  }

  // Lessons
  static async getLessons(): Promise<Lesson[]> {
    try {
      const lessonsRef = collection(db, 'lessons');
      const snapshot = await getDocs(lessonsRef);
      return snapshot.docs.map(doc => {
        const data = this.convertDocument(doc.data());
        return {
          id: parseInt(doc.id),
          ...data
        } as Lesson;
      });
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  }

  static async getLesson(id: string): Promise<Lesson | null> {
    try {
      const lessonRef = doc(db, 'lessons', id);
      const lessonSnap = await getDoc(lessonRef);
      if (!lessonSnap.exists()) return null;
      
      return { 
        id: parseInt(id), 
        ...lessonSnap.data(),
        timestamp: lessonSnap.data().timestamp?.toDate()
      } as unknown as Lesson;
    } catch (error) {
      console.error('Error fetching lesson:', error);
      throw error;
    }
  }

  // User Profiles
  static async getUserProfile(userId: string): Promise<any> {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        return null;
      }

      return this.convertDocument(userSnap.data());
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  static async updateUserProfile(userId: string, data: any): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...data,
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  static async createUserProfile(userId: string, data: any): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        ...data,
        created: serverTimestamp(),
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }

  // Progress Tracking
  static async updateProgress(userId: string, lessonId: string, completed: boolean): Promise<void> {
    try {
      const progressRef = doc(db, 'progress', `${userId}_${lessonId}`);
      await setDoc(progressRef, {
        userId,
        lessonId,
        completed,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  }

  static async getProgress(userId: string): Promise<any[]> {
    try {
      const progressRef = collection(db, 'progress');
      const q = query(progressRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => this.convertDocument(doc.data()));
    } catch (error) {
      console.error('Error fetching progress:', error);
      throw error;
    }
  }

  // Quiz Results
  static async saveQuizResult(userId: string, quizId: string, score: number): Promise<void> {
    try {
      const resultRef = doc(db, 'quiz_results', `${userId}_${quizId}`);
      await setDoc(resultRef, {
        userId,
        quizId,
        score,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving quiz result:', error);
      throw error;
    }
  }

  static async getQuizResults(userId: string): Promise<any[]> {
    try {
      const resultsRef = collection(db, 'quiz_results');
      const q = query(resultsRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => this.convertDocument(doc.data()));
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      throw error;
    }
  }
}