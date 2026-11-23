'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const DEMO_USERS: User[] = [
  {
    id: 'sa-001',
    email: 'admin@gymos.demo',
    password: 'Demo@123',
    name: 'Rajesh Kumar',
    role: 'super-admin',
    phone: '+91 98765 43210',
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 'ga-001',
    email: 'owner@gymos.demo',
    password: 'Demo@123',
    name: 'Priya Sharma',
    role: 'gym-admin',
    gymId: 'gym-001',
    phone: '+91 98765 43211',
    status: 'active',
    createdAt: '2024-02-15',
  },
  {
    id: 'tr-001',
    email: 'trainer@gymos.demo',
    password: 'Demo@123',
    name: 'Arjun Patel',
    role: 'trainer',
    gymId: 'gym-001',
    phone: '+91 98765 43212',
    status: 'active',
    createdAt: '2024-03-01',
  },
  {
    id: 'mb-001',
    email: 'member@gymos.demo',
    password: 'Demo@123',
    name: 'Ananya Verma',
    role: 'member',
    gymId: 'gym-001',
    phone: '+91 98765 43213',
    status: 'active',
    createdAt: '2024-04-10',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('gymos_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('gymos_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const found = DEMO_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const userData = { ...found };
      setUser(userData);
      localStorage.setItem('gymos_user', JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('gymos_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function getRolePath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    'super-admin': '/super-admin',
    'gym-admin': '/gym-admin',
    'trainer': '/trainer',
    'member': '/member',
  };
  return paths[role];
}

export { DEMO_USERS };
