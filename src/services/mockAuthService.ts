import { User, UserRole, RegisterPayload } from '../types';
import { mockUser } from '../data/mockData';

// Simulated database
let registeredUsers: User[] = [
  {
    ...mockUser,
    id: 'citizen-1',
    name: 'สมชาย รักเมือง',
    phone: '0911111111',
    email: 'somchai@example.com',
    role: 'CITIZEN',
    username: 'citizen1',
    password: 'password123'
  },
  {
    ...mockUser,
    id: 'agency-1',
    name: 'เจ้าหน้าที่ นครพนม',
    phone: '0922222222',
    email: 'agency@example.com',
    role: 'AGENCY',
    username: 'agency1',
    password: 'password123'
  },
  {
    ...mockUser,
    id: 'auditor-1',
    name: 'ผู้ตรวจสอบ จังหวัด',
    phone: '0933333333',
    email: 'auditor@example.com',
    role: 'AUDITOR',
    username: 'auditor1',
    password: 'password123'
  }
];

export const mockAuthService = {
  login: async (identifier: string, password: string): Promise<User | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = registeredUsers.find(
      u => (u.username === identifier || u.phone === identifier) && u.password === password
    );

    return user || null;
  },

  register: async (payload: RegisterPayload): Promise<{ success: boolean; user?: User; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if user already exists
    const exists = registeredUsers.some(
      u => u.username === payload.username || u.phone === payload.phone
    );

    if (exists) {
      return { success: false, error: 'ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว' };
    }

    const newUser: User = {
      ...mockUser,
      id: Math.random().toString(36).substring(7),
      name: payload.fullName,
      phone: payload.phone,
      email: payload.email,
      role: payload.role,
      username: payload.username,
      password: payload.password || 'password123', // In a real app, this would be hashed
    };

    registeredUsers.push(newUser);

    return { success: true, user: newUser };
  }
};
