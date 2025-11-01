// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Sử dụng useRef để lưu trữ function mà không gây re-render
  const loginRef = useRef((token, role) => {
    setUser({ token, role });
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userRole', role);
  });

  const logoutRef = useRef(() => {
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('refreshToken');
    setUser(null);
  });

  useEffect(() => {
    const token = getCookie('accessToken') || localStorage.getItem('accessToken');
    const role = localStorage.getItem('userRole');
    
    if (token && role) {
      setUser({ token, role });
    }
    setLoading(false);
  }, []);

  const value = {
    user,
    login: loginRef.current,
    logout: logoutRef.current,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};