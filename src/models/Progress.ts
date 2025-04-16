class Progress {
    private lessonsCompleted: number;
    private quizzesCompleted: number;

    constructor() {
        this.lessonsCompleted = 0;
        this.quizzesCompleted = 0;
    }

    public updateLessonsCompleted(count: number): void {
        this.lessonsCompleted += count;
    }

    public updateQuizzesCompleted(count: number): void {
        this.quizzesCompleted += count;
    }

    public getProgress(): { lessons: number; quizzes: number } {
        return {
            lessons: this.lessonsCompleted,
            quizzes: this.quizzesCompleted,
        };
    }
}

export default Progress;