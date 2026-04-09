import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUser } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  userToken: string | null;
  isLoading: boolean;
  signIn: (phoneNumber: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token in storage
    const bootstrapAsync = async () => {
      // Simulation of checking session
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    bootstrapAsync();
  }, []);

  const signIn = async (phoneNumber: string) => {
    // Determine role based on phone number
    let role: UserRole = 'CITIZEN';
    let name = 'สมชาย รักเมือง';

    if (phoneNumber === '0922222222') {
      role = 'AGENCY';
      name = 'เจ้าหน้าที่โยธา (Agencies)';
    } else if (phoneNumber === '0933333333') {
      role = 'AUDITOR';
      name = 'ผู้ตรวจสอบ (Auditor)';
    }

    // Simulate login
    const loggedInUser: User = {
      ...mockUser,
      phone: phoneNumber,
      role: role,
      name: name,
    };

    setUser(loggedInUser);
    setUserToken('mock-auth-token-' + role.toLowerCase());
  };

  const signOut = () => {
    setUser(null);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, userToken, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
