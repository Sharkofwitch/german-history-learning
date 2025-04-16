export const login = (username: string, password: string): Promise<boolean> => {
    // Logic for user login
    return new Promise((resolve, reject) => {
        // Simulate an API call
        setTimeout(() => {
            if (username === "testUser" && password === "testPass") {
                resolve(true);
            } else {
                reject("Invalid credentials");
            }
        }, 1000);
    });
};

export const logout = (): Promise<void> => {
    // Logic for user logout
    return new Promise((resolve) => {
        // Simulate an API call
        setTimeout(() => {
            resolve();
        }, 1000);
    });
};

export const register = (username: string, email: string, password: string): Promise<boolean> => {
    // Logic for user registration
    return new Promise((resolve) => {
        // Simulate an API call
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
};