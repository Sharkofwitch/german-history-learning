export const quizzes = [
    {
        id: 1,
        question: "What year did the Berlin Wall fall?",
        options: [
            { answer: "1987", isCorrect: false },
            { answer: "1989", isCorrect: true },
            { answer: "1991", isCorrect: false },
            { answer: "1993", isCorrect: false }
        ]
    },
    {
        id: 2,
        question: "Who was the first Chancellor of Germany?",
        options: [
            { answer: "Otto von Bismarck", isCorrect: true },
            { answer: "Konrad Adenauer", isCorrect: false },
            { answer: "Helmut Kohl", isCorrect: false },
            { answer: "Angela Merkel", isCorrect: false }
        ]
    },
    {
        id: 3,
        question: "What event is considered the start of World War I?",
        options: [
            { answer: "The sinking of the Lusitania", isCorrect: false },
            { answer: "The assassination of Archduke Franz Ferdinand", isCorrect: true },
            { answer: "The invasion of Poland", isCorrect: false },
            { answer: "The signing of the Treaty of Versailles", isCorrect: false }
        ]
    },
    {
        id: 4,
        question: "Which treaty ended World War II in Europe?",
        options: [
            { answer: "Treaty of Versailles", isCorrect: false },
            { answer: "Treaty of Paris", isCorrect: false },
            { answer: "Treaty of Potsdam", isCorrect: false },
            { answer: "Unconditional surrender of Germany", isCorrect: true }
        ]
    },
    {
        id: 5,
        era: "Ancient",
        question: "Which battle marked a decisive victory of Germanic tribes over Rome?",
        image: "https://images.unsplash.com/photo-1590674899484-d5642f835238",
        options: [
            { answer: "Battle of Teutoburg Forest", isCorrect: true },
            { answer: "Battle of Adrianople", isCorrect: false },
            { answer: "Battle of the Catalaunian Plains", isCorrect: false },
            { answer: "Battle of Chalons", isCorrect: false }
        ],
        explanation: "The Battle of Teutoburg Forest in 9 CE was a crucial moment where Germanic tribes under Arminius defeated three Roman legions."
    },
    {
        id: 6,
        era: "Medieval",
        question: "Who was crowned as the first Holy Roman Emperor?",
        image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84",
        options: [
            { answer: "Otto I", isCorrect: false },
            { answer: "Charlemagne", isCorrect: true },
            { answer: "Frederick Barbarossa", isCorrect: false },
            { answer: "Henry IV", isCorrect: false }
        ],
        explanation: "Charlemagne was crowned by Pope Leo III on Christmas Day, 800 CE, establishing the Holy Roman Empire."
    },
    {
        id: 7,
        era: "Renaissance",
        question: "What was a significant cultural movement during the Renaissance?",
        image: "https://images.unsplash.com/photo-1517841905240-4729888e3b1e",
        options: [
            { answer: "Humanism", isCorrect: true },
            { answer: "Feudalism", isCorrect: false },
            { answer: "Industrialism", isCorrect: false },
            { answer: "Romanticism", isCorrect: false }
        ],
        explanation: "Humanism was a significant cultural movement during the Renaissance that emphasized the value of human potential and achievements."
    }
];