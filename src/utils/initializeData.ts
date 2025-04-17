import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { lessons } from '../data/lessons';
import { quizzes } from '../data/quizzes';

export const initializeFirestoreData = async () => {
  try {
    // Initialize lessons
    const lessonsCollection = collection(db, 'lessons');
    for (const lesson of lessons) {
      await setDoc(doc(lessonsCollection, lesson.id.toString()), lesson);
    }

    // Initialize quizzes
    const quizzesCollection = collection(db, 'quizzes');
    for (const quiz of quizzes) {
      await setDoc(doc(quizzesCollection, quiz.id.toString()), quiz);
    }
  } catch (error) {
    console.error('Error initializing Firestore data:', error);
    throw error;
  }
};