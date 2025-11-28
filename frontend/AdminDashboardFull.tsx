import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home, Calendar, Users, UserCircle, ClipboardList, FileText, Brain, Bell, DollarSign,
  BarChart3, List, Settings, Search, Filter, ChevronDown, ChevronRight, TrendingUp,
  TrendingDown, AlertCircle, CheckCircle, Clock, MapPin, Phone, Mail, Download, Upload,
  Edit, Trash2, Eye, Star, Award, Activity, AlertTriangle, RefreshCw, Send, Plus, X,
  Check, Shield, Key, Globe, CreditCard, Zap, Target, User, LogOut, Lock, MessageSquare,
  Navigation, MoreVertical, ArrowLeft, Circle, CheckCircle2, XCircle, Timer, Package,
  LineChart, PieChart, Map as MapIcon, Wifi, WifiOff, ChevronLeft, Building, FileCheck,
  TrendingDown as TrendDown, Ban, PlayCircle, StopCircle, Copy, Save
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import SevenRehabLogo from './SevenRehabLogo';
import { FinanceModule, AnalyticsModule, LogsModule, SettingsModule } from './AdminModules';
import { HomeModule, BookingsModule } from './AdminHomeBookings';

interface AdminDashboardFullProps {
  language: 'EN' | 'AR';
  onLanguageToggle: () => void;
  onBackToHome?: () => void;
}

type Module = 
  | 'home' | 'bookings' | 'therapists' | 'patients' | 'requests'
  | 'soap' | 'ai-monitor' | 'notifications' | 'finance' | 'analytics'
  | 'logs' | 'settings';

type ViewMode = 'list' | 'detail';

// Mock Data
const mockTherapists = [
  {
    id: 'TH-001',
    name: 'Dr. Fatima Hassan',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    specialty: 'Sports Rehabilitation',
    status: 'active',
    rating: 4.9,
    confirmationRate: '92%',
    sessions: 234,
    lastActive: '2 hours ago',
    phone: '+966501234567',
    email: 'fatima@example.com',
    license: 'LIC-2024-001',
    city: 'Riyadh'
  },
  {
    id: 'TH-002',
    name: 'Dr. Omar Khalid',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    specialty: 'Neurology PT',
    status: 'pending',
    rating: 4.8,
    confirmationRate: '89%',
    sessions: 187,
    lastActive: '5 hours ago',
    phone: '+966507654321',
    email: 'omar@example.com',
    license: 'LIC-2024-002',
    city: 'Jeddah'
  }
];

const mockPatients = [
  {
    id: 'PT-001',
    name: 'Ahmed Al-Rashid',
    phone: '+966501234567',
    email: 'ahmed@example.com',
    bookings: 12,
    reports: 5,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
  },
  {
    id: 'PT-002',
    name: 'Sara Abdullah',
    phone: '+966507654321',
    email: 'sara@example.com',
    bookings: 8,
    reports: 3,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
  }
];

const mockRequests = [
  {
    id: 'REQ-001',
    patient: { name: 'Ahmed Al-Rashid', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    area: 'Al Nahda, Riyadh',
    preferredTimes: ['2:00 PM', '4:00 PM', '6:00 PM'],
    status: 'pending',
    created: '2 hours ago'
  },
  {
    id: 'REQ-002',
    patient: { name: 'Sara Abdullah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    area: 'Al Malqa, Riyadh',
    preferredTimes: ['10:00 AM', '12:00 PM'],
    status: 'assigned',
    created: '5 hours ago'
  }
];

const mockBookings = [
  {
    id: 'BK-2024-001',
    patient: { name: 'Ahmed Al-Rashid', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    therapist: { name: 'Dr. Fatima Hassan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    type: 'home',
    date: '2024-11-25',
    time: '2:00 PM',
    status: 'confirmed',
    payment: 'paid',
    created: '2024-11-24 10:30',
    confirmationDeadline: '2024-11-24 12:30'
  },
  {
    id: 'BK-2024-002',
    patient: { name: 'Sara Abdullah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    therapist: { name: 'Dr. Omar Khalid', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    type: 'clinic',
    date: '2024-11-26',
    time: '10:00 AM',
    status: 'pending',
    payment: 'pending',
    created: '2024-11-24 14:15',
    confirmationDeadline: '2024-11-25 00:15'
  },
  {
    id: 'BK-2024-003',
    patient: { name: 'Khalid Mohammed', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    therapist: { name: 'Dr. Fatima Hassan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    type: 'home',
    date: '2024-11-24',
    time: '4:00 PM',
    status: 'expired',
    payment: 'refunded',
    created: '2024-11-23 18:30',
    confirmationDeadline: '2024-11-24 04:30'
  }
];

const mockSOAPNotes = [
  {
    id: 'SOAP-001',
    patient: 'Ahmed Al-Rashid',
    therapist: 'Dr. Fatima Hassan',
    date: '2024-11-24',
    session: 3,
    missingFields: false,
    status: 'approved'
  },
  {
    id: 'SOAP-002',
    patient: 'Sara Abdullah',
    therapist: 'Dr. Omar Khalid',
    date: '2024-11-24',
    session: 1,
    missingFields: true,
    status: 'pending'
  }
];

const mockTreatmentPlans = [
  {
    id: 'TP-001',
    patient: 'Ahmed Al-Rashid',
    therapist: 'Dr. Fatima Hassan',
    deviation: '12%',
    status: 'approved',
    date: '2024-11-24'
  },
  {
    id: 'TP-002',
    patient: 'Sara Abdullah',
    therapist: 'Dr. Omar Khalid',
    deviation: '35%',
    status: 'flagged',
    date: '2024-11-24'
  }
];

export default function AdminDashboardFull({ language, onLanguageToggle, onBackToHome }: AdminDashboardFullProps) {
  const isArabic = language === 'AR';
  const [activeModule, setActiveModule] = useState<Module>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [soapTab, setSoapTab] = useState<'notes' | 'plans'>('notes');
  const [notificationTab, setNotificationTab] = useState<'log' | 'templates' | 'broadcast'>('log');
  const [logTab, setLogTab] = useState<'system' | 'audit'>('system');
  const [expandedSections, setExpandedSections] = useState<string[]>(['rolesPermissions']);

  const t = {
    modules: {
      home: isArabic ? 'الرئيسية' : 'Home',
      bookings: isArabic ? 'الحجوزات' : 'Bookings',
      therapists: isArabic ? 'المعالجون' : 'Therapists',
      patients: isArabic ? 'المرضى' : 'Patients',
      requests: isArabic ? 'طلبات الرعاية المنزلية' : 'Home Care Requests',
      soap: isArabic ? 'SOAP والجودة' : 'SOAP & Plans (QA)',
      'ai-monitor': isArabic ? 'مراقبة الذكاء الاصطناعي' : 'AI Monitor',
      notifications: isArabic ? 'الإشعارات' : 'Notifications',
      finance: isArabic ? 'المالية والمكافآت' : 'Finance & Bonuses',
      analytics: isArabic ? 'التحليلات' : 'Analytics',
      logs: isArabic ? 'السجلات والمراجعة' : 'Logs & Audit',
      settings: isArabic ? 'الإعدادات' : 'Settings'
    },
    common: {
      search: isArabic ? 'بحث...' : 'Search...',
      filter: isArabic ? 'تصفية' : 'Filter',
      export: isArabic ? 'تصدير' : 'Export',
      view: isArabic ? 'عرض' : 'View',
      edit: isArabic ? 'تعديل' : 'Edit',
      approve: isArabic ? 'موافقة' : 'Approve',
      reject: isArabic ? 'رفض' : 'Reject',
      save: isArabic ? 'حفظ' : 'Save',
      back: isArabic ? 'رجوع' : 'Back',
      add: isArabic ? 'إضافة' : 'Add'
    }
  };

  const sidebarItems = [
    { module: 'home' as Module, icon: Home, label: t.modules.home },
    { module: 'bookings' as Module, icon: Calendar, label: t.modules.bookings },
    { module: 'therapists' as Module, icon: UserCircle, label: t.modules.therapists },
    { module: 'patients' as Module, icon: Users, label: t.modules.patients },
    { module: 'requests' as Module, icon: ClipboardList, label: t.modules.requests },
    { module: 'soap' as Module, icon: FileText, label: t.modules.soap },
    { module: 'ai-monitor' as Module, icon: Brain, label: t.modules['ai-monitor'] },
    { module: 'notifications' as Module, icon: Bell, label: t.modules.notifications },
    { module: 'finance' as Module, icon: DollarSign, label: t.modules.finance },
    { module: 'analytics' as Module, icon: BarChart3, label: t.modules.analytics },
    { module: 'logs' as Module, icon: List, label: t.modules.logs },
    { module: 'settings' as Module, icon: Settings, label: t.modules.settings }
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      active: { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' },
      pending: { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' },
      approved: { bg: '#E0E7FF', text: '#4F46E5', border: '#C7D2FE' },
      rejected: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA' },
      flagged: { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' },
      assigned: { bg: '#E0E7FF', text: '#4F46E5', border: '#C7D2FE' },
      completed: { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' },
      cancelled: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA' },
      expired: { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' }
    };
    return colors[status] || colors.pending;
  };

  // Micro Prompt 6: Therapists Directory
  const renderTherapists = () => {
    if (viewMode === 'detail' && selectedItem) {
      // Micro Prompt 7: Therapist Profile
      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => { setViewMode('list'); setSelectedItem(null); }} className="p-2 rounded-xl hover:bg-gray-100">
                <ArrowLeft size={20} style={{ color: '#64748B' }} />
              </button>
              <div>
                <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>{selectedItem.name}</h2>
                <p style={{ color: '#64748B', fontSize: '14px' }}>{selectedItem.specialty}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Info */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'المعلومات الشخصية' : 'Personal Information'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>{isArabic ? 'الهاتف' : 'Phone'}</div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{selectedItem.phone}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>{isArabic ? 'البريد الإلكتروني' : 'Email'}</div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{selectedItem.email}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>{isArabic ? 'رقم الترخيص' : 'License'}</div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{selectedItem.license}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>{isArabic ? 'المدينة' : 'City'}</div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{selectedItem.city}</div>
                  </div>
                </div>
              </div>

              {/* License & Documents */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'الترخيص والوثائق' : 'License & Documents'}
                </h3>
                <div className="space-y-3">
                  {['License Certificate', 'ID Document', 'Qualification Certificate'].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#F9FAFB' }}>
                      <div className="flex items-center gap-3">
                        <FileCheck size={20} style={{ color: '#10B981' }} />
                        <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{doc}</span>
                      </div>
                      <button className="px-3 py-1 rounded-lg" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '12px', fontWeight: 500 }}>
                        <Eye size={14} className="inline mr-1" /> {t.common.view}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Schedule */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'جدول التوفر' : 'Availability Schedule'}
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                    <div key={idx} className="text-center p-3 rounded-lg" style={{ background: idx < 5 ? '#DCFCE7' : '#F3F4F6' }}>
                      <div style={{ color: idx < 5 ? '#16A34A' : '#6B7280', fontSize: '12px', fontWeight: 600 }}>{day}</div>
                      <div style={{ color: idx < 5 ? '#16A34A' : '#6B7280', fontSize: '10px', marginTop: '4px' }}>
                        {idx < 5 ? '9AM-5PM' : 'Off'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'مقاييس الأداء' : 'Performance Metrics'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Confirmation Rate', value: selectedItem.confirmationRate, color: '#10B981' },
                    { label: 'Avg Confirmation Time', value: '2.3h', color: '#5596FF' },
                    { label: 'No-show Rate', value: '3%', color: '#F5A623' },
                    { label: 'SOAP Compliance', value: '95%', color: '#4F46E5' }
                  ].map((metric, idx) => (
                    <div key={idx} className="p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                      <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>{metric.label}</div>
                      <div style={{ color: metric.color, fontSize: '20px', fontWeight: 700 }}>{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Photo */}
              <div className="p-6 rounded-2xl text-center" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4" style={{ border: '4px solid #5596FF' }}>
                  <ImageWithFallback src={selectedItem.photo} alt={selectedItem.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star size={16} fill="#FFA75F" style={{ color: '#FFA75F' }} />
                  <span style={{ color: '#1A2A42', fontSize: '18px', fontWeight: 700 }}>{selectedItem.rating}</span>
                </div>
              </div>

              {/* Bonus Progress */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'تقدم المكافآت' : 'Bonus Progress'}
                </h3>
                <div className="mb-3">
                  <div className="flex justify-between mb-2">
                    <span style={{ color: '#64748B', fontSize: '12px' }}>Monthly Sessions</span>
                    <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>34/50</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: '#E2E8F0' }}>
                    <div className="h-full rounded-full" style={{ width: '68%', background: 'linear-gradient(90deg, #5596FF 0%, #2E63FF 100%)' }} />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 rounded-2xl space-y-3" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>Actions</h3>
                <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)', color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                  <Check size={16} /> {t.common.approve}
                </button>
                <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: '#FEE2E2', color: '#DC2626', fontSize: '14px', fontWeight: 500 }}>
                  <X size={16} /> {t.common.reject}
                </button>
                <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: '#FEF3C7', color: '#D97706', fontSize: '14px', fontWeight: 500 }}>
                  <Lock size={16} /> {isArabic ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
                </button>
                <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: '#F3F4F6', color: '#6B7280', fontSize: '14px', fontWeight: 500 }}>
                  <Ban size={16} /> {isArabic ? 'إلغاء التفعيل' : 'Deactivate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Therapists List
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>{isArabic ? 'إدارة المعالجين' : 'Therapist Management'}</h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
              <Filter size={18} /> {t.common.filter}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)', color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
              <Plus size={18} /> {t.common.add} {isArabic ? 'معالج' : 'Therapist'}
            </button>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F5F9FF', borderBottom: '1px solid #E2E8F0' }}>
                {[isArabic ? 'الاسم' : 'Name', isArabic ? 'التخصص' : 'Specialty', isArabic ? 'الحالة' : 'Status', isArabic ? 'التقييم' : 'Rating', isArabic ? 'معدل التأكيد' : 'Confirmation Rate', isArabic ? 'الجلسات' : 'Sessions', isArabic ? 'آخر نشاط' : 'Last Active', isArabic ? 'الإجراءات' : 'Actions'].map((col) => (
                  <th key={col} className="px-6 py-4 text-left" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTherapists.map((therapist, idx) => {
                const statusColor = getStatusColor(therapist.status);
                return (
                  <tr key={therapist.id} className="border-b hover:bg-gray-50 cursor-pointer" style={{ borderColor: '#E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }} onClick={() => { setSelectedItem(therapist); setViewMode('detail'); }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <ImageWithFallback src={therapist.photo} alt={therapist.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{therapist.name}</div>
                          <div style={{ color: '#64748B', fontSize: '12px' }}>{therapist.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{therapist.specialty}</td>
                    <td className="px-6 py-4">
                      <div className="inline-block px-3 py-1 rounded-full text-xs" style={{ background: statusColor.bg, color: statusColor.text, border: `1px solid ${statusColor.border}`, fontWeight: 600 }}>
                        {isArabic ? (therapist.status === 'active' ? 'نشط' : 'قيد المراجعة') : (therapist.status === 'active' ? 'Active' : 'Pending Review')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} fill="#FFA75F" style={{ color: '#FFA75F' }} />
                        <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{therapist.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{therapist.confirmationRate}</td>
                    <td className="px-6 py-4" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{therapist.sessions}</td>
                    <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{therapist.lastActive}</td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1 rounded-lg" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '12px', fontWeight: 500 }}>
                        <Eye size={14} className="inline mr-1" /> {t.common.view}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Micro Prompt 8 & 9: Patients
  const renderPatients = () => {
    if (viewMode === 'detail' && selectedItem) {
      // Patient Profile
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => { setViewMode('list'); setSelectedItem(null); }} className="p-2 rounded-xl hover:bg-gray-100">
                <ArrowLeft size={20} style={{ color: '#64748B' }} />
              </button>
              <div>
                <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>{selectedItem.name}</h2>
                <p style={{ color: '#64748B', fontSize: '14px' }}>{selectedItem.id}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Info */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'المعلومات الشخصية' : 'Personal Information'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>{isArabic ? 'الهاتف' : 'Phone'}</div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{selectedItem.phone}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>{isArabic ? 'البريد الإلكتروني' : 'Email'}</div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{selectedItem.email}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>{isArabic ? 'عدد الحجوزات' : 'Total Bookings'}</div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{selectedItem.bookings}</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>{isArabic ? 'التقارير المرفوعة' : 'Reports Uploaded'}</div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{selectedItem.reports}</div>
                  </div>
                </div>
              </div>

              {/* Booking History */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'سجل الحجوزات' : 'Booking History'}
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((_, idx) => (
                    <div key={idx} className="p-3 rounded-lg flex items-center justify-between" style={{ background: '#F9FAFB' }}>
                      <div>
                        <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>BK-2024-{String(idx + 1).padStart(3, '0')}</div>
                        <div style={{ color: '#64748B', fontSize: '12px' }}>2024-11-{24 - idx}</div>
                      </div>
                      <div className="inline-block px-3 py-1 rounded-full text-xs" style={{ background: '#DCFCE7', color: '#16A34A', fontWeight: 600 }}>
                        Completed
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Plans */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'خطط العلاج' : 'Treatment Plans'}
                </h3>
                <p style={{ color: '#64748B', fontSize: '14px' }}>
                  {isArabic ? 'عرض خطط العلاج للمريض' : 'View patient treatment plans'}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl text-center" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4" style={{ border: '4px solid #5596FF' }}>
                  <ImageWithFallback src={selectedItem.avatar} alt={selectedItem.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 rounded-2xl space-y-3" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>Actions</h3>
                <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)', color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                  <Edit size={16} /> {t.common.edit} {isArabic ? 'المريض' : 'Patient'}
                </button>
                <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
                  <Lock size={16} /> {isArabic ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
                </button>
                <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: '#FEE2E2', color: '#DC2626', fontSize: '14px', fontWeight: 500 }}>
                  <Ban size={16} /> {isArabic ? 'حظر المريض' : 'Block Patient'}
                </button>
                <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: '#F3F4F6', color: '#6B7280', fontSize: '14px', fontWeight: 500 }}>
                  <Download size={16} /> {isArabic ? 'تصدير كـ PDF' : 'Export as PDF'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Patient List
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>{isArabic ? 'إدارة المرضى' : 'Patient Management'}</h2>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
            <Filter size={18} /> {t.common.filter}
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F5F9FF', borderBottom: '1px solid #E2E8F0' }}>
                {[isArabic ? 'الاسم' : 'Name', isArabic ? 'الهاتف' : 'Phone', isArabic ? 'البريد الإلكتروني' : 'Email', isArabic ? 'الحجوزات' : 'Bookings', isArabic ? 'التقارير' : 'Reports', isArabic ? 'الحالة' : 'Status', isArabic ? 'الإجراءات' : 'Actions'].map((col) => (
                  <th key={col} className="px-6 py-4 text-left" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockPatients.map((patient, idx) => {
                const statusColor = getStatusColor(patient.status);
                return (
                  <tr key={patient.id} className="border-b hover:bg-gray-50 cursor-pointer" style={{ borderColor: '#E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }} onClick={() => { setSelectedItem(patient); setViewMode('detail'); }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <ImageWithFallback src={patient.avatar} alt={patient.name} className="w-full h-full object-cover" />
                        </div>
                        <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{patient.phone}</td>
                    <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{patient.email}</td>
                    <td className="px-6 py-4" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{patient.bookings}</td>
                    <td className="px-6 py-4" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{patient.reports}</td>
                    <td className="px-6 py-4">
                      <div className="inline-block px-3 py-1 rounded-full text-xs" style={{ background: statusColor.bg, color: statusColor.text, border: `1px solid ${statusColor.border}`, fontWeight: 600 }}>
                        {isArabic ? 'نشط' : 'Active'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1 rounded-lg" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '12px', fontWeight: 500 }}>
                        <Eye size={14} className="inline mr-1" /> {t.common.view}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Micro Prompt 10 & 11: Home Care Requests
  const renderRequests = () => {
    if (viewMode === 'detail' && selectedItem) {
      // Request Detail Page
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <button onClick={() => { setViewMode('list'); setSelectedItem(null); }} className="p-2 rounded-xl hover:bg-gray-100">
              <ArrowLeft size={20} style={{ color: '#64748B' }} />
            </button>
            <div>
              <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>{selectedItem.id}</h2>
              <p style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'تفاصيل الطلب' : 'Request Details'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Patient Info */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'معلومات المريض' : 'Patient Information'}
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <ImageWithFallback src={selectedItem.patient.avatar} alt={selectedItem.patient.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{selectedItem.patient.name}</div>
                  </div>
                </div>
              </div>

              {/* Map Preview */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'خريطة الموقع' : 'Location Map'}
                </h3>
                <div className="w-full h-48 rounded-xl flex items-center justify-center" style={{ background: '#F5F9FF' }}>
                  <MapPin size={48} style={{ color: '#5596FF' }} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <MapPin size={16} style={{ color: '#64748B' }} />
                  <span style={{ color: '#64748B', fontSize: '14px' }}>{selectedItem.area}</span>
                </div>
              </div>

              {/* Request Description */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'وصف الطلب' : 'Request Description'}
                </h3>
                <p style={{ color: '#64748B', fontSize: '14px' }}>
                  {isArabic ? 'ألم في أسفل الظهر. يحتاج إلى علاج طبيعي في المنزل.' : 'Lower back pain. Needs physical therapy at home.'}
                </p>
              </div>

              {/* Nearby Therapists */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'المعالجون القريبون' : 'Nearby Therapists'}
                </h3>
                <div className="space-y-3">
                  {mockTherapists.slice(0, 2).map((therapist) => (
                    <div key={therapist.id} className="p-3 rounded-lg flex items-center justify-between" style={{ background: '#F9FAFB' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <ImageWithFallback src={therapist.photo} alt={therapist.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{therapist.name}</div>
                          <div style={{ color: '#64748B', fontSize: '12px' }}>{therapist.specialty}</div>
                        </div>
                      </div>
                      <button className="px-3 py-1 rounded-lg" style={{ background: '#5596FF', color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>
                        {isArabic ? 'تعيين' : 'Assign'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Preferred Times */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'الأوقات المفضلة' : 'Preferred Times'}
                </h3>
                <div className="space-y-2">
                  {selectedItem.preferredTimes.map((time: string, idx: number) => (
                    <div key={idx} className="p-2 rounded-lg text-center" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
                      {time}
                    </div>
                  ))}
                </div>
              </div>

              {/* Auto-Expiry Timer */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'مؤقت الانتهاء' : 'Auto-Expiry Timer'}
                </h3>
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#FEF3C7' }}>
                    <Timer size={20} style={{ color: '#D97706' }} />
                    <span style={{ color: '#D97706', fontSize: '18px', fontWeight: 700 }}>8h 45m</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 rounded-2xl space-y-3" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>Actions</h3>
                <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)', color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                  <UserCircle size={16} /> {isArabic ? 'تعيين معالج' : 'Assign Therapist'}
                </button>
                <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: '#FEE2E2', color: '#DC2626', fontSize: '14px', fontWeight: 500 }}>
                  <X size={16} /> {isArabic ? 'إلغاء الطلب' : 'Cancel Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Requests List
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>{isArabic ? 'طلبات الرعاية المنزلية' : 'Home Care Requests'}</h2>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
            <Filter size={18} /> {t.common.filter}
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F5F9FF', borderBottom: '1px solid #E2E8F0' }}>
                {[isArabic ? 'رقم الطلب' : 'Request ID', isArabic ? 'المريض' : 'Patient', isArabic ? 'المنطقة' : 'Area', isArabic ? 'الأوقات المفضلة' : 'Preferred Times', isArabic ? 'الحالة' : 'Status', isArabic ? 'تاريخ الإنشاء' : 'Created At', isArabic ? 'الإجراءات' : 'Actions'].map((col) => (
                  <th key={col} className="px-6 py-4 text-left" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockRequests.map((request, idx) => {
                const statusColor = getStatusColor(request.status);
                return (
                  <tr key={request.id} className="border-b hover:bg-gray-50 cursor-pointer" style={{ borderColor: '#E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }} onClick={() => { setSelectedItem(request); setViewMode('detail'); }}>
                    <td className="px-6 py-4" style={{ color: '#2E63FF', fontSize: '14px', fontWeight: 600 }}>{request.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <ImageWithFallback src={request.patient.avatar} alt={request.patient.name} className="w-full h-full object-cover" />
                        </div>
                        <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{request.patient.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} style={{ color: '#64748B' }} />
                        <span style={{ color: '#64748B', fontSize: '14px' }}>{request.area}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{request.preferredTimes.slice(0, 2).join(', ')}</td>
                    <td className="px-6 py-4">
                      <div className="inline-block px-3 py-1 rounded-full text-xs" style={{ background: statusColor.bg, color: statusColor.text, border: `1px solid ${statusColor.border}`, fontWeight: 600 }}>
                        {isArabic ? (request.status === 'pending' ? 'معلق' : 'معين') : (request.status === 'pending' ? 'Pending' : 'Assigned')}
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{request.created}</td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1 rounded-lg" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '12px', fontWeight: 500 }}>
                        <Eye size={14} className="inline mr-1" /> {t.common.view}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Micro Prompt 12: SOAP & QA
  const renderSOAP = () => (
    <div className="space-y-6">
      <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>{isArabic ? 'SOAP ومراجعة الجودة' : 'SOAP & Treatment Plans'}</h2>

      {/* Tabs */}
      <div className="flex gap-2">
        <button onClick={() => setSoapTab('notes')} className="px-6 py-3 rounded-xl" style={{ background: soapTab === 'notes' ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)' : '#F5F9FF', color: soapTab === 'notes' ? '#FFFFFF' : '#2E63FF', fontSize: '14px', fontWeight: 600 }}>
          {isArabic ? 'ملاحظات SOAP' : 'SOAP Notes'}
        </button>
        <button onClick={() => setSoapTab('plans')} className="px-6 py-3 rounded-xl" style={{ background: soapTab === 'plans' ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)' : '#F5F9FF', color: soapTab === 'plans' ? '#FFFFFF' : '#2E63FF', fontSize: '14px', fontWeight: 600 }}>
          {isArabic ? 'خطط العلاج' : 'Treatment Plans'}
        </button>
      </div>

      {/* SOAP Notes Table */}
      {soapTab === 'notes' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F5F9FF', borderBottom: '1px solid #E2E8F0' }}>
                {[isArabic ? 'المريض' : 'Patient', isArabic ? 'المعالج' : 'Therapist', isArabic ? 'التاريخ' : 'Date', isArabic ? 'رقم الجلسة' : 'Session #', isArabic ? 'حقول ناقصة' : 'Missing Fields', isArabic ? 'الحالة' : 'Status', isArabic ? 'الإجراءات' : 'Actions'].map((col) => (
                  <th key={col} className="px-6 py-4 text-left" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockSOAPNotes.map((note, idx) => {
                const statusColor = getStatusColor(note.status);
                return (
                  <tr key={note.id} className="border-b hover:bg-gray-50" style={{ borderColor: '#E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
                    <td className="px-6 py-4" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{note.patient}</td>
                    <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{note.therapist}</td>
                    <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{note.date}</td>
                    <td className="px-6 py-4" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{note.session}</td>
                    <td className="px-6 py-4">
                      {note.missingFields ? (
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: '#FEE2E2', color: '#DC2626', fontSize: '12px', fontWeight: 600 }}>
                          <AlertTriangle size={12} /> {isArabic ? 'نعم' : 'Yes'}
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: '#DCFCE7', color: '#16A34A', fontSize: '12px', fontWeight: 600 }}>
                          <CheckCircle size={12} /> {isArabic ? 'لا' : 'No'}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-block px-3 py-1 rounded-full text-xs" style={{ background: statusColor.bg, color: statusColor.text, border: `1px solid ${statusColor.border}`, fontWeight: 600 }}>
                        {isArabic ? (note.status === 'approved' ? 'مقبول' : 'معلق') : (note.status === 'approved' ? 'Approved' : 'Pending')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1 rounded-lg" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '12px', fontWeight: 500 }}>
                        <Eye size={14} className="inline mr-1" /> {isArabic ? 'مراجعة' : 'Review'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Treatment Plans Table */}
      {soapTab === 'plans' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F5F9FF', borderBottom: '1px solid #E2E8F0' }}>
                {[isArabic ? 'المريض' : 'Patient', isArabic ? 'المعالج' : 'Therapist', isArabic ? 'نسبة الانحراف' : 'Deviation %', isArabic ? 'الحالة' : 'Status', isArabic ? 'التاريخ' : 'Date', isArabic ? 'الإجراءات' : 'Actions'].map((col) => (
                  <th key={col} className="px-6 py-4 text-left" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTreatmentPlans.map((plan, idx) => {
                const statusColor = getStatusColor(plan.status);
                const deviationNum = parseInt(plan.deviation);
                const deviationColor = deviationNum > 30 ? '#DC2626' : deviationNum > 20 ? '#F5A623' : '#10B981';
                return (
                  <tr key={plan.id} className="border-b hover:bg-gray-50" style={{ borderColor: '#E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
                    <td className="px-6 py-4" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{plan.patient}</td>
                    <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{plan.therapist}</td>
                    <td className="px-6 py-4">
                      <span style={{ color: deviationColor, fontSize: '14px', fontWeight: 700 }}>{plan.deviation}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-block px-3 py-1 rounded-full text-xs" style={{ background: statusColor.bg, color: statusColor.text, border: `1px solid ${statusColor.border}`, fontWeight: 600 }}>
                        {isArabic ? (plan.status === 'approved' ? 'مقبول' : 'مشار عليه') : (plan.status === 'approved' ? 'Approved' : 'Flagged')}
                      </div>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{plan.date}</td>
                    <td className="px-6 py-4">
                      <button className="px-3 py-1 rounded-lg" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '12px', fontWeight: 500 }}>
                        <Eye size={14} className="inline mr-1" /> {isArabic ? 'مراجعة' : 'Review'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  // Micro Prompt 13: AI Monitor
  const renderAIMonitor = () => (
    <div className="space-y-6">
      <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>{isArabic ? 'مراقبة الذكاء الاصطناعي' : 'AI Monitor'}</h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: isArabic ? 'الخطط المولدة' : 'Plans Generated', value: '234', icon: Brain, color: '#5596FF' },
          { label: isArabic ? 'متوسط الانحراف' : 'Avg Deviation', value: '18%', icon: Target, color: '#F5A623' },
          { label: isArabic ? 'معدل القبول' : 'Acceptance Rate', value: '87%', icon: CheckCircle, color: '#10B981' },
          { label: isArabic ? 'معدل التعديل' : 'Revision Rate', value: '13%', icon: Edit, color: '#DC2626' }
        ].map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${metric.color}15` }}>
                  <Icon size={24} style={{ color: metric.color }} />
                </div>
              </div>
              <div style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>{metric.label}</div>
              <div style={{ color: '#1A2A42', fontSize: '32px', fontWeight: 700 }}>{metric.value}</div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
            {isArabic ? 'اتجاه الانحراف' : 'Deviation Trend'}
          </h3>
          <div className="w-full h-48 rounded-xl flex items-center justify-center" style={{ background: '#F5F9FF' }}>
            <LineChart size={48} style={{ color: '#5596FF' }} />
          </div>
        </div>

        <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
            {isArabic ? 'التوليد اليومي للخطط' : 'Daily Plan Generation'}
          </h3>
          <div className="w-full h-48 rounded-xl flex items-center justify-center" style={{ background: '#F5F9FF' }}>
            <BarChart3 size={48} style={{ color: '#5596FF' }} />
          </div>
        </div>
      </div>

      {/* Error Log */}
      <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
        <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
          {isArabic ? 'سجل الأخطاء' : 'API Error Log'}
        </h3>
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E2E8F0' }}>
                {[isArabic ? 'الوقت' : 'Timestamp', isArabic ? 'النوع' : 'Type', isArabic ? 'نقطة النهاية' : 'Endpoint', isArabic ? 'رسالة الخطأ' : 'Error Message'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left" style={{ color: '#1A2A42', fontSize: '12px', fontWeight: 600 }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { timestamp: '2024-11-24 14:32', type: 'Timeout', endpoint: '/api/ai/generate', message: 'Request timeout after 30s' },
                { timestamp: '2024-11-24 12:15', type: 'Invalid', endpoint: '/api/ai/validate', message: 'Invalid SOAP format' }
              ].map((error, idx) => (
                <tr key={idx} className="border-b" style={{ borderColor: '#E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
                  <td className="px-4 py-3" style={{ color: '#64748B', fontSize: '12px' }}>{error.timestamp}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded text-xs" style={{ background: '#FEE2E2', color: '#DC2626', fontWeight: 600 }}>
                      {error.type}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: '#2E63FF', fontSize: '12px', fontFamily: 'monospace' }}>{error.endpoint}</td>
                  <td className="px-4 py-3" style={{ color: '#64748B', fontSize: '12px' }}>{error.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Micro Prompt 14: Notifications
  const renderNotifications = () => (
    <div className="space-y-6">
      <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>{isArabic ? 'مركز الإشعارات' : 'Notifications Center'}</h2>

      {/* Tabs */}
      <div className="flex gap-2">
        {['log', 'templates', 'broadcast'].map((tab) => (
          <button key={tab} onClick={() => setNotificationTab(tab as any)} className="px-6 py-3 rounded-xl" style={{ background: notificationTab === tab ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)' : '#F5F9FF', color: notificationTab === tab ? '#FFFFFF' : '#2E63FF', fontSize: '14px', fontWeight: 600 }}>
            {isArabic ? (tab === 'log' ? 'السجل' : tab === 'templates' ? 'القوالب' : 'البث') : (tab === 'log' ? 'Log' : tab === 'templates' ? 'Templates' : 'Broadcast')}
          </button>
        ))}
      </div>

      {/* Log Tab */}
      {notificationTab === 'log' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F5F9FF', borderBottom: '1px solid #E2E8F0' }}>
                {[isArabic ? 'القناة' : 'Channel', isArabic ? 'المستلم' : 'Recipient', isArabic ? 'نوع الرسالة' : 'Message Type', isArabic ? 'الحالة' : 'Status', isArabic ? 'الوقت' : 'Timestamp'].map((col) => (
                  <th key={col} className="px-6 py-4 text-left" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { channel: 'SMS', recipient: '+966501234567', type: 'Booking Confirmation', status: 'delivered', time: '2 hours ago' },
                { channel: 'Email', recipient: 'patient@example.com', type: 'Treatment Plan', status: 'delivered', time: '3 hours ago' },
                { channel: 'WhatsApp', recipient: '+966507654321', type: 'Reminder', status: 'failed', time: '5 hours ago' }
              ].map((notif, idx) => (
                <tr key={idx} className="border-b" style={{ borderColor: '#E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs" style={{ background: '#E0E7FF', color: '#4F46E5', fontWeight: 600 }}>
                      {notif.channel}
                    </span>
                  </td>
                  <td className="px-6 py-4" style={{ color: '#1A2A42', fontSize: '14px' }}>{notif.recipient}</td>
                  <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{notif.type}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs" style={{ background: notif.status === 'delivered' ? '#DCFCE7' : '#FEE2E2', color: notif.status === 'delivered' ? '#16A34A' : '#DC2626', fontWeight: 600 }}>
                      {notif.status}
                    </span>
                  </td>
                  <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>{notif.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Templates Tab */}
      {notificationTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
            <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
              {isArabic ? 'القوالب' : 'Templates'}
            </h3>
            <div className="space-y-2">
              {['Booking Confirmation', 'Reminder', 'Cancellation'].map((template, idx) => (
                <button key={idx} className="w-full p-3 rounded-lg text-left hover:bg-gray-50 transition-all" style={{ background: idx === 0 ? '#F5F9FF' : 'transparent', border: idx === 0 ? '1px solid #5596FF' : '1px solid transparent' }}>
                  <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{template}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
            <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
              {isArabic ? 'محرر القالب' : 'Template Editor'}
            </h3>
            <textarea className="w-full p-4 rounded-xl mb-4" rows={8} style={{ background: '#F9FAFB', border: '1px solid #E2E8F0', color: '#1A2A42', fontSize: '14px', resize: 'none' }} defaultValue="Dear {patient_name},\n\nYour booking has been confirmed for {date} at {time}.\n\nTherapist: {therapist_name}\nLocation: {location}\n\nThank you for choosing Seven Rehab." />
            <button className="px-6 py-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)', color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
              <Save size={16} className="inline mr-2" /> {t.common.save}
            </button>
          </div>
        </div>
      )}

      {/* Broadcast Tab */}
      {notificationTab === 'broadcast' && (
        <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <div className="space-y-6">
            <div>
              <label style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                {isArabic ? 'اختر الجمهور' : 'Select Audience'}
              </label>
              <div className="flex gap-3">
                {['All Patients', 'All Therapists', 'Active Users'].map((audience, idx) => (
                  <button key={idx} className="px-4 py-2 rounded-xl" style={{ background: idx === 0 ? '#5596FF' : '#F5F9FF', color: idx === 0 ? '#FFFFFF' : '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
                    {audience}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                {isArabic ? 'اختر القناة' : 'Select Channel'}
              </label>
              <div className="flex gap-3">
                {['SMS', 'Email', 'WhatsApp'].map((channel, idx) => (
                  <button key={idx} className="px-4 py-2 rounded-xl flex items-center gap-2" style={{ background: idx === 0 ? '#5596FF' : '#F5F9FF', color: idx === 0 ? '#FFFFFF' : '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
                    <Bell size={16} /> {channel}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                {isArabic ? 'اكتب الرسالة' : 'Compose Message'}
              </label>
              <textarea className="w-full p-4 rounded-xl" rows={6} style={{ background: '#F9FAFB', border: '1px solid #E2E8F0', color: '#1A2A42', fontSize: '14px', resize: 'none' }} placeholder={isArabic ? 'اكتب رسالتك هنا...' : 'Write your message here...'} />
            </div>

            <button className="px-8 py-3 rounded-xl flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)', color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
              <Send size={16} /> {isArabic ? 'إرسال' : 'Send Broadcast'}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Render based on active module
  const renderContent = () => {
    switch (activeModule) {
      case 'home': 
        return <HomeModule language={language} onQuickAction={(action) => setActiveModule(action as Module)} />;
      case 'bookings': 
        return (
          <BookingsModule 
            language={language}
            viewMode={viewMode}
            selectedBooking={selectedItem}
            onSelectBooking={(booking) => {
              setSelectedItem(booking);
              setViewMode('detail');
            }}
            onBack={() => {
              setSelectedItem(null);
              setViewMode('list');
            }}
          />
        );
      case 'therapists': return renderTherapists();
      case 'patients': return renderPatients();
      case 'requests': return renderRequests();
      case 'soap': return renderSOAP();
      case 'ai-monitor': return renderAIMonitor();
      case 'notifications': return renderNotifications();
      case 'finance': return <FinanceModule language={language} />;
      case 'analytics': return <AnalyticsModule language={language} />;
      case 'logs': return <LogsModule language={language} />;
      case 'settings': return <SettingsModule language={language} />;
      default:
        return (
          <div className="p-12 rounded-2xl text-center" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
            <Activity size={48} style={{ color: '#5596FF', margin: '0 auto 16px' }} />
            <p style={{ color: '#64748B', fontSize: '16px' }}>
              {t.modules[activeModule]} {isArabic ? 'قيد التطوير...' : 'coming soon...'}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex" dir={isArabic ? 'rtl' : 'ltr'} style={{ background: '#F5F9FF', fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen flex flex-col" style={{ width: '280px', background: '#FFFFFF', borderRadius: isArabic ? '12px 0 0 0' : '0 12px 0 0', borderRight: isArabic ? 'none' : '1px solid #E2E8F0', borderLeft: isArabic ? '1px solid #E2E8F0' : 'none', boxShadow: '2px 0 12px rgba(0, 0, 0, 0.04)' }}>
        <div className="p-6 border-b" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-3">
            <SevenRehabLogo width={40} />
            <div>
              <div style={{ color: '#1A2A42', fontSize: '18px', fontWeight: 700 }}>Seventic</div>
              <div style={{ color: '#64748B', fontSize: '13px' }}>Admin Portal</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.module;
            return (
              <button key={item.module} onClick={() => { setActiveModule(item.module); setViewMode('list'); setSelectedItem(null); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 relative" style={{ background: isActive ? 'linear-gradient(135deg, #EAF3FF 0%, #D0E7FF 100%)' : 'transparent', color: isActive ? '#2E63FF' : '#64748B' }}>
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r" style={{ background: 'linear-gradient(180deg, #5596FF 0%, #2E63FF 100%)' }} />}
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span style={{ fontSize: '14px', fontWeight: isActive ? 600 : 500 }}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 backdrop-blur-md" style={{ background: 'rgba(255, 255, 255, 0.95)', borderBottom: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)' }}>
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
              <input type="text" placeholder={isArabic ? 'البحث في لوحة التحكم...' : 'Search dashboard...'} className="w-full pl-10 pr-4 py-2 rounded-xl border-0 outline-none transition-all" style={{ background: '#F5F9FF', color: '#1A2A42', fontSize: '14px' }} />
            </div>

            <div className="flex items-center gap-4">
              <button onClick={onLanguageToggle} className="px-4 py-2 rounded-xl transition-all hover:shadow-md" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
                {isArabic ? 'EN' : 'AR'}
              </button>

              <button className="relative p-2 rounded-xl transition-all hover:shadow-md" style={{ background: '#F5F9FF' }}>
                <Bell size={20} style={{ color: '#2E63FF' }} />
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#FF4D4F' }} />
              </button>

              <div className="relative">
                <button onClick={() => setShowAdminMenu(!showAdminMenu)} className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all hover:shadow-md" style={{ background: '#F5F9FF' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)' }}>
                    <User size={20} style={{ color: '#FFFFFF' }} />
                  </div>
                  <ChevronDown size={16} style={{ color: '#64748B' }} />
                </button>

                <AnimatePresence>
                  {showAdminMenu && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', zIndex: 50 }}>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all" style={{ color: '#1A2A42', fontSize: '14px' }}>
                        <User size={16} /> {isArabic ? 'الملف الشخصي' : 'Profile'}
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all" style={{ color: '#1A2A42', fontSize: '14px' }}>
                        <Lock size={16} /> {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
                      </button>
                      <div className="border-t" style={{ borderColor: '#E2E8F0' }} />
                      <button onClick={onBackToHome} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all" style={{ color: '#DC2626', fontSize: '14px' }}>
                        <LogOut size={16} /> {isArabic ? 'تسجيل الخروج' : 'Logout'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeModule} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
