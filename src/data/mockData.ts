import { Case, User, AgencyStaff } from '../types';

export const mockUser: User = {
  id: 'u1',
  name: 'สมชาย รักเมือง',
  email: 'somchai.city@example.com',
  phone: '0911111111',
  role: 'CITIZEN',
  stats: {
    totalReports: 12,
    inProgress: 3,
    resolved: 9,
  },
};

export const mockAgencyUser: User = {
  id: 'a1',
  name: 'วิศรุต ใจดี',
  email: 'witsarut.gov@example.com',
  phone: '0922222222',
  role: 'AGENCY',
  stats: {
    totalReports: 156,
    inProgress: 42,
    resolved: 114,
  },
};

export const mockStaff: AgencyStaff[] = [
  { id: 's1', name: 'นายกิตติพงษ์ ดวงดี', role: 'ช่างโยธาชำนาญการ', status: 'active', workload: 5 },
  { id: 's2', name: 'นางสาวรัตนา มีสุข', role: 'เจ้าหน้าที่ภาคสนาม', status: 'active', workload: 3 },
  { id: 's3', name: 'นายมานะ อดทน', role: 'ช่างไฟฟ้า', status: 'active', workload: 8 },
  { id: 's4', name: 'นางวันดี รักสะอาด', role: 'เจ้าหน้าที่สิ่งแวดล้อม', status: 'active', workload: 2 },
];

export const mockCases: Case[] = [
  {
    id: 'c1',
    title: 'ไฟถนนเสีย',
    description: 'ไฟถนนที่ถนนโอ๊คกะพริบมาสามวันแล้ว และตอนนี้ดับสนิทแล้ว ทำให้บริเวณนี้มืดและอันตรายมาก',
    category: 'lighting',
    status: 'PENDING',
    urgency: 'high',
    createdAt: '2026-04-05T10:00:00Z',
    updatedAt: '2026-04-05T10:00:00Z',
    location: {
      latitude: 13.7563,
      longitude: 100.5018,
      address: '123 ถนนโอ๊ค, เขตพระนคร',
    },
    images: [require('../assets/light_broken.png')],
    citizenId: 'u1',
    timeline: [
      {
        id: 't1',
        status: 'PENDING',
        title: 'ส่งรายงานแล้ว',
        description: 'ได้รับรายงานของคุณแล้วและกำลังรอการตรวจสอบจากเจ้าหน้าที่',
        timestamp: '2026-04-05T10:00:00Z',
      },
    ],
    comments: [
      {
        id: 'com1',
        role: 'system',
        user: 'ระบบ OpenFix',
        message: 'ได้รับเรื่องร้องเรียนเข้าสู่ระบบเรียบร้อยแล้ว กำลังรอเจ้าหน้าที่ตรวจสอบความถูกต้องของข้อมูล',
        timestamp: '2026-04-05T10:00:05Z',
      },
    ],
  },
  {
    id: 'c2',
    title: 'ถนนเป็นหลุมเป็นบ่อ',
    description: 'มีหลุมขนาดใหญ่บริเวณใกล้สี่แยกถนนเมนและซอย 5 อันตรายต่อรถจักรยานยนต์อย่างมาก',
    category: 'road',
    status: 'IN_PROGRESS',
    urgency: 'emergency',
    createdAt: '2026-04-01T08:30:00Z',
    updatedAt: '2026-04-02T14:15:00Z',
    location: {
      latitude: 13.7565,
      longitude: 100.5020,
      address: 'สี่แยกถนนเมน ตัดซอย 5',
    },
    images: [require('../assets/pothole.png')],
    citizenId: 'u1',
    assignedAgency: 'กรมทางหลวง/โยธา',
    assignedStaffId: 's1',
    slaDueAt: '2026-04-04T17:00:00Z',
    timeline: [
      {
        id: 't1',
        status: 'PENDING',
        title: 'ส่งรายงานแล้ว',
        description: 'ได้รับรายงานของคุณแล้ว',
        timestamp: '2026-04-01T08:30:00Z',
      },
      {
        id: 't2',
        status: 'IN_PROGRESS',
        title: 'มอบหมายงานแล้ว',
        description: 'มอบหมายให้ฝ่ายโยธาเข้าดำเนินการตรวจสอบพื้นที่',
        timestamp: '2026-04-02T10:00:00Z',
        agency: 'กรมทางหลวง',
      },
      {
        id: 't3',
        status: 'IN_PROGRESS',
        title: 'กำหนดการซ่อมแซม',
        description: 'ทีมซ่อมแซมมีกำหนดการเข้าพื้นที่ในวันศุกร์นี้ช่วงเช้า',
        timestamp: '2026-04-02T14:15:00Z',
        agency: 'กรมทางหลวง',
      },
    ],
    comments: [
      {
        id: 'com1',
        role: 'system',
        user: 'ระบบ OpenFix',
        message: 'ส่งเรื่องต่อให้กรมทางหลวงเรียบร้อยแล้ว',
        timestamp: '2026-04-02T10:05:00Z',
      },
      {
        id: 'com2',
        role: 'agency',
        user: 'นายช่างวิศรุต (กรมทางหลวง)',
        message: 'รับทราบครับ กำลังรวบรวมทีมช่างและเครื่องจักร คาดว่าจะเข้าดำเนินการได้ในวันที่ 4 เมษายนครับ',
        timestamp: '2026-04-02T11:30:00Z',
      },
    ],
  },
  {
    id: 'c3',
    title: 'การลักลอบทิ้งขยะ',
    description: 'มีการทิ้งกากวัสดุก่อสร้างหลายถุงในซอยเบื้องหลังอาคารพาณิชย์',
    category: 'garbage',
    status: 'COMPLETED',
    urgency: 'medium',
    createdAt: '2026-03-25T11:00:00Z',
    updatedAt: '2026-03-26T09:00:00Z',
    location: {
      latitude: 13.7570,
      longitude: 100.5030,
      address: 'ซอยข้างอาคารเลขที่ 456 ถนนเมเปิ้ล',
    },
    images: [require('../assets/garbage.png')],
    citizenId: 'u1',
    assignedAgency: 'สำนักงานเขต ฝ่ายรักษาความสะอาด',
    assignedStaffId: 's4',
    timeline: [
      {
        id: 't1',
        status: 'PENDING',
        title: 'ส่งรายงานแล้ว',
        description: 'ได้รับรายงานของคุณแล้ว',
        timestamp: '2026-03-25T11:00:00Z',
      },
      {
        id: 't2',
        status: 'IN_PROGRESS',
        title: 'กำลังดำเนินการเก็บขยะ',
        description: 'รถขยะได้รับแจ้งและกำลังเข้าพื้นที่ดำเนินการ',
        timestamp: '2026-03-25T15:00:00Z',
        agency: 'ฝ่ายรักษาความสะอาด',
      },
      {
        id: 't3',
        status: 'COMPLETED',
        title: 'ดำเนินการเสร็จสิ้น',
        description: 'พื้นที่ได้รับการทำความสะอาดเรียบร้อยแล้ว ตรวจสอบรูปหลักฐานได้ที่นี่',
        timestamp: '2026-03-26T09:00:00Z',
        agency: 'ฝ่ายรักษาความสะอาด',
        evidenceImages: [require('../assets/clean_alley.png')],
      },
    ],
    comments: [
      {
        id: 'com1',
        role: 'agency',
        user: 'เจ้าหน้าที่สมศรี (ฝ่ายรักษาความสะอาด)',
        message: 'เจ้าหน้าที่เข้าดำเนินการเก็บกวาดขยะเรียบร้อยแล้วค่ะ หากพบเห็นการลักลอบทิ้งอีก แจ้งได้ทันทีนะคะ',
        timestamp: '2026-03-26T09:15:00Z',
      },
    ],
  },
];

export const mockKPIs = {
  totalCases: 245,
  pendingCases: 18,
  inProgressCases: 42,
  completedCases: 185,
  slaCompliance: 94,
  avgResolutionTime: '2.4 วัน',
  citizenRating: 4.8,
};
