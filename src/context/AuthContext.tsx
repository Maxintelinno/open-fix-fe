import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, RegisterPayload } from '../types';
import { mockAuthService } from '../services/mockAuthService';

interface AuthContextType {
  user: User | null;
  userToken: string | null;
  isLoading: boolean;
  signIn: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; error?: string }>;
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

  const signIn = async (identifier: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await mockAuthService.login(identifier, password);
      
      if (loggedInUser) {
        setUser(loggedInUser);
        setUserToken('mock-auth-token-' + loggedInUser.role.toLowerCase());
        return { success: true };
      } else {
        return { success: false, error: 'ไม่พบบัญชีผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง' };
      }
    } catch (error) {
      return { success: false, error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const result = await mockAuthService.register(payload);
      
      if (result.success && result.user) {
        // If it's a citizen, we can sign them in immediately
        if (payload.role === 'CITIZEN') {
          setUser(result.user);
          setUserToken('mock-auth-token-citizen');
        }
        return { success: true };
      } else {
        return { success: false, error: result.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก' };
      }
    } catch (error) {
      return { success: false, error: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, userToken, isLoading, signIn, register, signOut }}>
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
