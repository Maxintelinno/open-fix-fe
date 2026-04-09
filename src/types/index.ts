export type CaseStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export type CaseCategory = 'road' | 'lighting' | 'garbage' | 'drainage' | 'safety' | 'other';

export type UserRole = 'CITIZEN' | 'AGENCY' | 'AUDITOR';

export type Urgency = 'low' | 'medium' | 'high' | 'emergency';

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface TimelineUpdate {
  id: string;
  status: CaseStatus;
  title: string;
  description: string;
  timestamp: string;
  agency?: string;
  evidenceImages?: any[];
}

export interface Comment {
  id: string;
  role: 'citizen' | 'agency' | 'system';
  user: string;
  message: string;
  timestamp: string;
}

export interface AgencyStaff {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive';
  workload: number;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  category: CaseCategory;
  status: CaseStatus;
  urgency?: Urgency;
  createdAt: string;
  updatedAt: string;
  location: Location;
  images: any[];
  citizenId: string;
  assignedStaffId?: string;
  assignedAgency?: string;
  slaDueAt?: string;
  timeline: TimelineUpdate[];
  comments: Comment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  stats: {
    totalReports: number;
    inProgress: number;
    resolved: number;
  };
}

export type RootStackParamList = {
  Login: undefined;
  OTP: { phoneNumber: string };
  MainTabs: undefined; // Citizen Tabs
  AgencyTabs: undefined; // Agency Tabs
  CaseDetail: { caseId: string };
  AgencyCaseDetail: { caseId: string };
  AssignStaff: { caseId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Report: undefined;
  Map: undefined;
  MyCases: undefined;
  Profile: undefined;
};

export type AgencyTabParamList = {
  Inbox: undefined;
  Assigned: undefined;
  Dashboard: undefined;
  Map: undefined;
  Settings: undefined;
};
