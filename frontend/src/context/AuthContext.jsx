import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load user from localStorage on mount
        const savedUser = localStorage.getItem('auth_user');
        const onboardingStatus = localStorage.getItem('onboarding_status');

        if (savedUser && savedUser !== 'undefined') {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse auth_user", e);
                localStorage.removeItem('auth_user');
            }
        }
        if (onboardingStatus === 'completed') {
            setIsOnboarded(true);
        }
        setLoading(false);
    }, []);

    const login = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        const userData = {
            id: decoded.sub,
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture
        };
        setUser(userData);
        localStorage.setItem('auth_user', JSON.stringify(userData));

        // For existing users, we might check a database here. 
        // For the demo, we check localStorage.
        const onboardingStatus = localStorage.getItem(`onboarding_${decoded.sub}`);
        if (onboardingStatus === 'completed') {
            setIsOnboarded(true);
            localStorage.setItem('onboarding_status', 'completed');
        } else {
            setIsOnboarded(false);
            localStorage.removeItem('onboarding_status');
        }
    };

    const logout = () => {
        setUser(null);
        setIsOnboarded(false);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('onboarding_status');
    };

    const completeOnboarding = (data) => {
        console.log('Onboarding data:', data);
        setIsOnboarded(true);
        localStorage.setItem('onboarding_status', 'completed');
        if (user) {
            localStorage.setItem(`onboarding_${user.id}`, 'completed');
            localStorage.setItem(`onboarding_data_${user.id}`, JSON.stringify(data));
        }
    };

    return (
        <AuthContext.Provider value={{ user, isOnboarded, login, logout, completeOnboarding, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
