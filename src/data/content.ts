export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  pages: LessonPage[];
  era: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  nextLessonId?: string;
}

export interface LessonPage {
  id: number;
  title: string;
  type: 'text' | 'image' | 'interactive' | 'timeline';
  content: string;
  image?: string;
  imageCaption?: string;
  interactiveElements?: InteractiveElement[];
}

export interface InteractiveElement {
  type: 'timeline' | 'map' | 'artifact';
  data: any;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const lessons: Lesson[] = [
  {
    id: 'medieval-holy-roman-empire',
    title: 'The Holy Roman Empire',
    subtitle: 'The First German Reich',
    era: 'Medieval',
    difficulty: 'beginner',
    estimatedTime: 20,
    nextLessonId: 'medieval-germany-rise',
    pages: [
      {
        id: 1,
        title: "Foundation of the Empire",
        type: 'text',
        content: `The Holy Roman Empire emerged from the eastern portion of Charlemagne's empire. 
                 In 962, Otto I was crowned as Emperor, marking the beginning of what would later 
                 be called the Holy Roman Empire. This marked a crucial moment in German history, 
                 establishing a political structure that would last for over 800 years.`
      },
      {
        id: 2,
        title: "Structure and Territory",
        type: 'image',
        content: `The Empire was a complex federation of principalities, kingdoms, and other 
                 territories. Unlike centralized monarchies like England or France, the Holy 
                 Roman Empire was a decentralized entity where local rulers held significant power.`,
        image: "/assets/Holy_Roman_Empire_map.svg",
        imageCaption: "The Holy Roman Empire at its greatest extent, circa 1250"
      },
      {
        id: 3,
        title: "Key Historical Events",
        type: 'timeline',
        content: `The Empire's history was marked by several crucial events that shaped 
                 medieval European history.`,
        interactiveElements: [{
          type: 'timeline',
          data: [
            { year: 962, event: "Coronation of Otto I" },
            { year: 1076, event: "Henry IV's Walk to Canossa" },
            { year: 1122, event: "Concordat of Worms" },
            { year: 1356, event: "Golden Bull of Charles IV" }
          ]
        }]
      },
      {
        id: 4,
        title: "Imperial Institutions",
        type: 'interactive',
        content: `The Empire developed unique institutions that balanced power between the 
                 Emperor and the princes. The Imperial Diet (Reichstag) was one of the most 
                 important, where Imperial Estates met to make decisions.`
      }
    ]
  }
];

export const quizzes: Quiz[] = [
  {
    id: 'medieval-basics',
    title: 'Medieval German History',
    description: 'Test your knowledge about the Holy Roman Empire',
    difficulty: 'beginner',
    questions: [
      {
        id: 'q1',
        question: 'Who was crowned as the first Holy Roman Emperor in 962 CE?',
        options: [
          'Charlemagne',
          'Otto I',
          'Frederick Barbarossa',
          'Charles V'
        ],
        correctAnswer: 1,
        explanation: 'Otto I was crowned as the first Holy Roman Emperor in 962 CE, marking the official beginning of the Holy Roman Empire.'
      },
      {
        id: 'q2',
        question: 'What was the Golden Bull of 1356?',
        options: [
          'A papal decree',
          'A constitution for the Empire',
          'A trade agreement',
          'A military treaty'
        ],
        correctAnswer: 1,
        explanation: 'The Golden Bull of 1356 was a constitutional document that established the basic structure of the Empire, including the election process for the Emperor.'
      },
      {
        id: 'q3',
        question: 'What made the Holy Roman Empire unique among medieval kingdoms?',
        options: [
          'Its vast naval power',
          'Its decentralized structure',
          'Its colonial possessions',
          'Its standing army'
        ],
        correctAnswer: 1,
        explanation: 'The Holy Roman Empire was unique for its decentralized structure, where local rulers maintained significant autonomy while acknowledging the Emperor\'s authority.'
      }
    ]
  }
];