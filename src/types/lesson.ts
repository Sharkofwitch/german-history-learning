export interface LessonPage {
  type: 'text' | 'image';
  content: string;
  image?: string;
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  duration: number;
  level: string;
  image: string;
  era: string;
  pages: LessonPage[];
  additionalImages?: {
    url: string;
    caption: string;
  }[];
  theme?: {
    primary: string;
    secondary: string;
  };
  createdAt?: string; // ISO string format
  updatedAt?: string; // ISO string format
}