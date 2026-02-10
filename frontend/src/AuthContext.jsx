import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, password) => {
        // Simulate login by checking against localStorage
        // In a real app, this would be an API call
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const userData = { email: foundUser.email, name: foundUser.name };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    const register = (userData) => {
        // Simulate registration
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'User already exists' };
        }

        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const checkEmail = (email) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        return users.some(u => u.email === email);
    };

    const resetPassword = (email, newPassword) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === email);

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            return { success: true };
        }
        return { success: false, message: 'User not found' };
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, checkEmail, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
