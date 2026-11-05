interface LoginCredentials {
    email: string;
    password: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authService =  {
    async login(credentials: LoginCredentials) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(credentials),
            
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login Failed');

        }
        return response.json(); // returns { token, user }

    },
    async loginWithGoogle() {
        window.location.href = `${API_BASE_URL}/auth/google`;

    },
};