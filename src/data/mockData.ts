import { Case, User, AgencyStaff, AuditKPI, ProvinceMetric, AgencyMetric, AnomalyItem, DatasetItem } from '../types';

export const mockUser: User = {
  id: 'u1',
  name: 'สมชาย รักเมือง',
  email: 'somchai.city@example.com',
  phone: '0911111111',
  role: 'CITIZEN',
  username: 'citizen1',
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
  username: 'agency1',
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

export const mockAuditorUser: User = {
  id: 'au1',
  name: 'นภา ตรวจสอบดี',
  email: 'napha.audit@example.com',
  phone: '0933333333',
  role: 'AUDITOR',
  username: 'auditor1',
  stats: {
    totalReports: 0,
    inProgress: 0,
    resolved: 0,
  },
};

export const mockAuditKPIs: AuditKPI = {
  totalComplaints: 12450,
  pendingCases: 840,
  inProgressCases: 1250,
  completedCases: 10360,
  suspiciousClosures: 42,
  duplicatedEvidenceFlags: 15,
  slaCompliance: 92,
  avgResolutionTime: '2.8 วัน',
  avgSatisfactionScore: 4.6,
};

export const mockProvinces: ProvinceMetric[] = [
  { id: 'p1', name: 'กรุงเทพมหานคร', totalComplaints: 5420, avgResolutionHours: 48, slaCompliance: 92, satisfactionScore: 4.5, trend: 'stable' },
  { id: 'p2', name: 'เชียงใหม่', totalComplaints: 2150, avgResolutionHours: 56, slaCompliance: 88, satisfactionScore: 4.2, trend: 'up' },
  { id: 'p3', name: 'ขอนแก่น', totalComplaints: 1840, avgResolutionHours: 52, slaCompliance: 90, satisfactionScore: 4.4, trend: 'stable' },
  { id: 'p4', name: 'ชลบุรี', totalComplaints: 1650, avgResolutionHours: 42, slaCompliance: 94, satisfactionScore: 4.7, trend: 'down' },
  { id: 'p5', name: 'สงขลา', totalComplaints: 1390, avgResolutionHours: 64, slaCompliance: 85, satisfactionScore: 4.0, trend: 'up' },
];

export const mockAgencyMetrics: AgencyMetric[] = [
  { id: 'ag1', name: 'กรมทางหลวง (ศาลายา)', province: 'กรุงเทพมหานคร', totalComplaints: 850, avgResolutionHours: 42, slaCompliance: 95, satisfactionScore: 4.8, trend: 'stable' },
  { id: 'ag2', name: 'ฝ่ายรักษาความสะอาด (เขตลาดพร้าว)', province: 'กรุงเทพมหานคร', totalComplaints: 1240, avgResolutionHours: 24, slaCompliance: 98, satisfactionScore: 4.9, trend: 'stable' },
  { id: 'ag3', name: 'การไฟฟ้าส่วนภูมิภาค (เชียงใหม่)', province: 'เชียงใหม่', totalComplaints: 620, avgResolutionHours: 72, slaCompliance: 82, satisfactionScore: 3.8, trend: 'up' },
];

export const mockAnomalies: AnomalyItem[] = [
  {
    id: 'an1',
    complaintId: 'c101',
    title: 'ซ่อมท่อระบายน้ำ',
    province: 'กรุงเทพมหานคร',
    agency: 'ฝ่ายโยธา (เขตจตุจักร)',
    anomalyType: 'ปิดงานเร็วเกินจริง',
    severity: 'high',
    detectedAt: '2026-04-08T09:00:00Z',
    status: 'pending',
    description: 'งานซ่อมท่อระบายน้ำขนาดใหญ่ถูกปิดสถานะเสร็จสิ้นภายใน 15 นาทีหลังจากรับเรื่อง',
  },
  {
    id: 'an2',
    complaintId: 'c105',
    title: 'เก็บขยะตกค้าง',
    province: 'ชลบุรี',
    agency: 'เทศบาลเมืองแสนสุข',
    anomalyType: 'ใช้รูปหลักฐานซ้ำ',
    severity: 'medium',
    detectedAt: '2026-04-07T14:30:00Z',
    status: 'investigating',
    description: 'รูปภาพหลักฐานการดำเนินการเสร็จสิ้นมีความคล้ายคลึงกับรูปงานเก่าในสัปดาห์ที่แล้ว',
  },
];

export const mockDatasets: DatasetItem[] = [
  {
    id: 'd1',
    title: 'สถิติเรื่องร้องเรียนรายจังหวัด (2569)',
    description: 'รวบรวมจำนวนเรื่องร้องเรียน ประเภทปัญหา และสถานะการดำเนินการแยกตามจังหวัด',
    format: 'CSV, JSON',
    lastUpdated: '2026-04-01',
    endpoint: '/api/v1/opendata/complaints-by-province',
    fields: ['province_id', 'province_name', 'category', 'status_count', 'month'],
    agency: 'ศูนย์รับเรื่องราวร้องทุกข์',
    downloadCount: 1250,
  },
  {
    id: 'd2',
    title: 'คะแนนความพึงพอใจรายหน่วยงาน',
    description: 'ข้อมูลคะแนนความพึงพอใจเฉลี่ยที่ได้จากประชาชนหลังปิดงาน',
    format: 'JSON',
    lastUpdated: '2026-04-05',
    endpoint: '/api/v1/opendata/agency-satisfaction',
    fields: ['agency_id', 'agency_name', 'avg_score', 'total_ratings'],
    agency: 'กรุงเทพมหานคร',
    downloadCount: 840,
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
