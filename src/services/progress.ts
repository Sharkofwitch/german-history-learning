export interface ProgressData {
    lessonId: string;
    completed: boolean;
    score?: number;
}

const userProgress: ProgressData[] = [];

export const saveProgress = (progress: ProgressData): void => {
    const existingProgressIndex = userProgress.findIndex(p => p.lessonId === progress.lessonId);
    if (existingProgressIndex > -1) {
        userProgress[existingProgressIndex] = progress;
    } else {
        userProgress.push(progress);
    }
};

export const getProgress = (lessonId: string): ProgressData | undefined => {
    return userProgress.find(p => p.lessonId === lessonId);
};

export const getAllProgress = (): ProgressData[] => {
    return userProgress;
};