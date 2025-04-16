export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const calculateProgress = (completed: number, total: number): number => {
    return total > 0 ? (completed / total) * 100 : 0;
};

export const shuffleArray = <T>(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
};