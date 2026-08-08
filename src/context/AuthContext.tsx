import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { initialUser } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string, salary?: number) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('saviko_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('saviko_token') || 'demo_jwt_token_123';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('saviko_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('saviko_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('saviko_token', token);
    } else {
      localStorage.removeItem('saviko_token');
    }
  }, [token]);

  const login = async (email: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123' })
      });
      const data = await res.json();
      if (data.token && data.user) {
        setUser(data.user);
        setToken(data.token);
        return true;
      }
    } catch (e) {
      console.warn('API fallback for login');
    }
    // Fallback demo user
    setUser({
      ...initialUser,
      email: email || initialUser.email
    });
    setToken(`jwt_demo_${Date.now()}`);
    return true;
  };

  const signup = async (name: string, email: string, password?: string, salary?: number) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: password || 'pass123', monthlySalary: salary || 6000 })
      });
      const data = await res.json();
      if (data.token && data.user) {
        setUser(data.user);
        setToken(data.token);
        return true;
      }
    } catch (e) {
      console.warn('API fallback for signup');
    }
    setUser({
      id: `usr_${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      currency: '$',
      monthlySalary: salary || 6000,
      darkMode: true,
      emailNotifications: true,
      createdAt: new Date().toISOString()
    });
    setToken(`jwt_demo_${Date.now()}`);
    return true;
  };

  const googleLogin = async () => {
    try {
      const res = await fetch('/api/auth/google', { method: 'POST' });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        setToken(data.token);
        return true;
      }
    } catch (e) {
      console.warn('Google login fallback');
    }
    setUser(initialUser);
    setToken(`jwt_google_${Date.now()}`);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      login,
      signup,
      googleLogin,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
