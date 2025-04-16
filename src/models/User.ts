class User {
    private username: string;
    private email: string;
    private progress: Record<string, any>;

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
        this.progress = {};
    }

    updateProgress(lessonId: string, status: boolean): void {
        this.progress[lessonId] = status;
    }

    getProgress(): Record<string, any> {
        return this.progress;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }
}

export default User;