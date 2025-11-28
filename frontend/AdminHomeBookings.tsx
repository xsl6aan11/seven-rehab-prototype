import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users, UserCircle, Calendar, Clock, ClipboardList, FileText, Brain, 
  AlertCircle, AlertTriangle, TrendingUp, Eye, Filter, Search, ChevronLeft,
  ChevronRight, CheckCircle, XCircle, Home as HomeIcon, MapPin, CreditCard,
  MessageSquare, RefreshCw, X, ArrowLeft, Check, Ban, Edit
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeModuleProps {
  language: 'EN' | 'AR';
  onQuickAction: (action: string) => void;
}

interface BookingsModuleProps {
  language: 'EN' | 'AR';
  viewMode: 'list' | 'detail';
  selectedBooking: any;
  onSelectBooking: (booking: any) => void;
  onBack: () => void;
}

// Mock bookings data
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

export function HomeModule({ language, onQuickAction }: HomeModuleProps) {
  const isArabic = language === 'AR';

  const kpiData = [
    { title: isArabic ? 'المرضى النشطون' : 'Active Patients', value: '1,247', trend: '+12%', icon: Users, color: '#5596FF' },
    { title: isArabic ? 'المعالجون النشطون' : 'Active Therapists', value: '89', trend: '+5%', icon: UserCircle, color: '#10B981' },
    { title: isArabic ? 'حجوزات اليوم' : "Today's Bookings", value: '34', trend: '+8%', icon: Calendar, color: '#F59E0B' },
    { title: isArabic ? 'التأكيدات المعلقة' : 'Pending Confirmations', value: '12', trend: '-3%', icon: Clock, color: '#DC2626' },
    { title: isArabic ? 'طلبات الرعاية المنزلية المفتوحة' : 'Open Home-Care Requests', value: '7', trend: '+2', icon: ClipboardList, color: '#8B5CF6' },
    { title: isArabic ? 'متوسط وقت التأكيد' : 'Avg Confirmation Time', value: '2.4h', trend: '-0.3h', icon: Clock, color: '#3B82F6' },
    { title: isArabic ? 'SOAP المقدمة اليوم' : 'SOAP Submitted Today', value: '28', trend: '+6', icon: FileText, color: '#0EA5E9' },
    { title: isArabic ? 'الخطط في انتظار المراجعة' : 'Plans Awaiting QA', value: '5', trend: '+1', icon: Brain, color: '#EC4899' }
  ];

  const alerts = [
    { type: 'warning', title: isArabic ? 'حجوزات على وشك الانتهاء' : 'Expiring Bookings', count: '3 bookings', time: '< 2 hours', color: '#F59E0B' },
    { type: 'error', title: isArabic ? 'SOAP مفقودة' : 'Missing SOAP Notes', count: '5 sessions', time: 'overdue', color: '#DC2626' },
    { type: 'warning', title: isArabic ? 'خطط مشار عليها' : 'Flagged Plans', count: '2 plans', time: 'high deviation', color: '#F59E0B' },
    { type: 'info', title: isArabic ? 'معالجون غير نشطون' : 'Inactive Therapists', count: '4 therapists', time: '> 7 days', color: '#6B7280' },
    { type: 'error', title: isArabic ? 'إشعارات فاشلة' : 'Failed Notifications', count: '8 messages', time: 'retry needed', color: '#DC2626' }
  ];

  const quickActions = [
    { label: isArabic ? 'عرض الحجوزات المعلقة' : 'View Pending Bookings', action: 'bookings', color: '#5596FF' },
    { label: isArabic ? 'الموافقة على المعالجين' : 'Approve Therapists', action: 'therapists', color: '#10B981' },
    { label: isArabic ? 'مراجعة الخطط المشار عليها' : 'Review Flagged Plans', action: 'soap', color: '#F59E0B' },
    { label: isArabic ? 'طلبات الرعاية المنزلية' : 'Open Home Requests', action: 'requests', color: '#8B5CF6' },
    { label: isArabic ? 'عرض ملخص المالية' : 'View Finance Summary', action: 'finance', color: '#3B82F6' },
    { label: isArabic ? 'إرسال إشعار' : 'Send Notification', action: 'notifications', color: '#EC4899' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
        {isArabic ? 'لوحة المعلومات الرئيسية' : 'Home Dashboard'}
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          const isTrendPositive = kpi.trend.startsWith('+');
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 rounded-2xl"
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}15` }}>
                  <Icon size={24} style={{ color: kpi.color }} />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded text-xs" style={{ background: isTrendPositive ? '#DCFCE7' : '#FEE2E2', color: isTrendPositive ? '#16A34A' : '#DC2626', fontWeight: 600 }}>
                  {isTrendPositive ? <TrendingUp size={12} /> : <TrendingUp size={12} style={{ transform: 'rotate(180deg)' }} />}
                  {kpi.trend}
                </div>
              </div>
              <div style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>{kpi.title}</div>
              <div style={{ color: '#1A2A42', fontSize: '32px', fontWeight: 700 }}>{kpi.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Alerts Widget */}
      <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ color: '#1A2A42', fontSize: '18px', fontWeight: 600 }}>
            {isArabic ? 'التنبيهات' : 'Alerts'}
          </h3>
          <div className="px-3 py-1 rounded-full" style={{ background: '#FEE2E2', color: '#DC2626', fontSize: '12px', fontWeight: 600 }}>
            {alerts.length} {isArabic ? 'تنبيهات' : 'alerts'}
          </div>
        </div>
        <div className="space-y-3">
          {alerts.map((alert, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all cursor-pointer" style={{ background: '#F9FAFB', border: `1px solid ${alert.color}30` }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${alert.color}15` }}>
                  <AlertTriangle size={20} style={{ color: alert.color }} />
                </div>
                <div>
                  <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{alert.title}</div>
                  <div style={{ color: '#64748B', fontSize: '12px' }}>{alert.count} • {alert.time}</div>
                </div>
              </div>
              <button className="px-3 py-1 rounded-lg" style={{ background: `${alert.color}15`, color: alert.color, fontSize: '12px', fontWeight: 500 }}>
                <Eye size={14} className="inline mr-1" /> {isArabic ? 'عرض' : 'View'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
        <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '18px', fontWeight: 600 }}>
          {isArabic ? 'إجراءات سريعة' : 'Quick Actions'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => onQuickAction(action.action)}
              className="p-4 rounded-xl text-center hover:shadow-lg transition-all"
              style={{ background: `${action.color}10`, border: `2px solid ${action.color}30`, color: action.color, fontSize: '14px', fontWeight: 600 }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BookingsModule({ language, viewMode, selectedBooking, onSelectBooking, onBack }: BookingsModuleProps) {
  const isArabic = language === 'AR';
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      confirmed: { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' },
      pending: { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' },
      expired: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA' }
    };
    return colors[status] || colors.pending;
  };

  if (viewMode === 'detail' && selectedBooking) {
    // Booking Details View
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-xl hover:bg-gray-100">
            <ArrowLeft size={20} style={{ color: '#64748B' }} />
          </button>
          <div>
            <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>{selectedBooking.id}</h2>
            <p style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'تفاصيل الحجز' : 'Booking Details'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Timeline */}
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'الجدول الزمني للحجز' : 'Booking Timeline'}
              </h3>
              <div className="space-y-4">
                {[
                  { label: isArabic ? 'تم الإنشاء' : 'Created', time: selectedBooking.created, status: 'complete' },
                  { label: isArabic ? 'تأكيد المعالج' : 'Therapist Confirmed', time: selectedBooking.confirmationDeadline, status: selectedBooking.status === 'confirmed' ? 'complete' : 'pending' },
                  { label: isArabic ? 'الجلسة المجدولة' : 'Scheduled Session', time: `${selectedBooking.date} ${selectedBooking.time}`, status: 'pending' },
                  { label: isArabic ? 'اكتملت' : 'Completed', time: '-', status: 'pending' }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.status === 'complete' ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {step.status === 'complete' ? <CheckCircle size={20} style={{ color: '#10B981' }} /> : <Clock size={20} style={{ color: '#94A3B8' }} />}
                      </div>
                      {idx < 3 && <div className={`absolute left-1/2 top-10 w-0.5 h-12 -translate-x-1/2 ${step.status === 'complete' ? 'bg-green-200' : 'bg-gray-200'}`} />}
                    </div>
                    <div className="flex-1">
                      <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{step.label}</div>
                      <div style={{ color: '#64748B', fontSize: '12px' }}>{step.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Card */}
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'معلومات الدفع' : 'Payment Information'}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'حالة الدفع' : 'Payment Status'}:</span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ background: selectedBooking.payment === 'paid' ? '#DCFCE7' : '#FEF3C7', color: selectedBooking.payment === 'paid' ? '#16A34A' : '#D97706', fontWeight: 600 }}>
                    {selectedBooking.payment === 'paid' ? (isArabic ? 'مدفوع' : 'Paid') : (isArabic ? 'معلق' : 'Pending')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'المبلغ' : 'Amount'}:</span>
                  <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>SAR 330</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'طريقة الدفع' : 'Payment Method'}:</span>
                  <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{isArabic ? 'بطاقة ائتمان' : 'Credit Card'}</span>
                </div>
              </div>
            </div>

            {/* Notification History */}
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'سجل الإشعارات' : 'Notification History'}
              </h3>
              <div className="space-y-3">
                {[
                  { type: 'SMS', message: 'Booking confirmation sent', time: '2 hours ago', status: 'delivered' },
                  { type: 'Email', message: 'Receipt sent', time: '2 hours ago', status: 'delivered' }
                ].map((notif, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#F9FAFB' }}>
                    <div>
                      <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{notif.message}</div>
                      <div style={{ color: '#64748B', fontSize: '12px' }}>{notif.type} • {notif.time}</div>
                    </div>
                    <CheckCircle size={16} style={{ color: '#10B981' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Patient Card */}
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'المريض' : 'Patient'}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ImageWithFallback src={selectedBooking.patient.avatar} alt={selectedBooking.patient.name} className="w-full h-full object-cover" />
                </div>
                <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{selectedBooking.patient.name}</div>
              </div>
            </div>

            {/* Therapist Card */}
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'المعالج' : 'Therapist'}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ImageWithFallback src={selectedBooking.therapist.avatar} alt={selectedBooking.therapist.name} className="w-full h-full object-cover" />
                </div>
                <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{selectedBooking.therapist.name}</div>
              </div>
            </div>

            {/* SOAP Note Preview */}
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'ملاحظة SOAP' : 'SOAP Note'}
              </h3>
              <p style={{ color: '#64748B', fontSize: '14px' }}>
                {isArabic ? 'لم يتم تقديم ملاحظة SOAP بعد' : 'No SOAP note submitted yet'}
              </p>
            </div>

            {/* Admin Actions */}
            <div className="p-6 rounded-2xl space-y-3" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'إجراءات الإدارة' : 'Admin Actions'}
              </h3>
              <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)', color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                <RefreshCw size={16} /> {isArabic ? 'إعادة تعيين معالج' : 'Reassign Therapist'}
              </button>
              <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
                <Edit size={16} /> {isArabic ? 'تغيير الحالة' : 'Change Status'}
              </button>
              <button className="w-full py-2 rounded-xl flex items-center justify-center gap-2" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
                <MessageSquare size={16} /> {isArabic ? 'رسالة المعالج' : 'Message Therapist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Bookings List View
  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
          {isArabic ? 'إدارة الحجوزات' : 'Bookings Management'}
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
            <input
              type="text"
              placeholder={isArabic ? 'البحث في الحجوزات...' : 'Search bookings...'}
              className="pl-10 pr-4 py-2 rounded-xl border-0 outline-none"
              style={{ background: '#F5F9FF', color: '#1A2A42', fontSize: '14px', width: '280px' }}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
            <Filter size={18} /> {isArabic ? 'تصفية' : 'Filter'}
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F5F9FF', borderBottom: '1px solid #E2E8F0' }}>
              {[
                isArabic ? 'معرف الحجز' : 'Booking ID',
                isArabic ? 'المريض' : 'Patient',
                isArabic ? 'المعالج' : 'Therapist',
                isArabic ? 'النوع' : 'Type',
                isArabic ? 'التاريخ والوقت' : 'Date & Time',
                isArabic ? 'الحالة' : 'Status',
                isArabic ? 'حالة الدفع' : 'Payment',
                isArabic ? 'الإجراءات' : 'Actions'
              ].map((col) => (
                <th key={col} className="px-6 py-4 text-left" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockBookings.map((booking, idx) => {
              const statusColor = getStatusColor(booking.status);
              return (
                <tr
                  key={booking.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  style={{ borderColor: '#E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}
                  onClick={() => onSelectBooking(booking)}
                >
                  <td className="px-6 py-4" style={{ color: '#2E63FF', fontSize: '14px', fontWeight: 600 }}>{booking.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <ImageWithFallback src={booking.patient.avatar} alt={booking.patient.name} className="w-full h-full object-cover" />
                      </div>
                      <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{booking.patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <ImageWithFallback src={booking.therapist.avatar} alt={booking.therapist.name} className="w-full h-full object-cover" />
                      </div>
                      <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{booking.therapist.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {booking.type === 'home' ? <MapPin size={14} style={{ color: '#8B5CF6' }} /> : <HomeIcon size={14} style={{ color: '#3B82F6' }} />}
                      <span style={{ color: '#64748B', fontSize: '14px' }}>
                        {booking.type === 'home' ? (isArabic ? 'منزلي' : 'Home') : (isArabic ? 'عيادة' : 'Clinic')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{booking.date}</div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>{booking.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-block px-3 py-1 rounded-full text-xs" style={{ background: statusColor.bg, color: statusColor.text, border: `1px solid ${statusColor.border}`, fontWeight: 600 }}>
                      {isArabic ? (booking.status === 'confirmed' ? 'مؤكد' : booking.status === 'pending' ? 'معلق' : 'منتهي') : booking.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-block px-3 py-1 rounded-full text-xs" style={{ background: booking.payment === 'paid' ? '#DCFCE7' : '#FEF3C7', color: booking.payment === 'paid' ? '#16A34A' : '#D97706', fontWeight: 600 }}>
                      {booking.payment === 'paid' ? (isArabic ? 'مدفوع' : 'Paid') : (isArabic ? 'معلق' : 'Pending')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1 rounded-lg" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '12px', fontWeight: 500 }}>
                      <Eye size={14} className="inline mr-1" /> {isArabic ? 'عرض' : 'View'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: '#E2E8F0' }}>
          <div style={{ color: '#64748B', fontSize: '14px' }}>
            {isArabic ? 'عرض 1-3 من 3 نتائج' : 'Showing 1-3 of 3 results'}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100" disabled style={{ color: '#94A3B8' }}>
              <ChevronLeft size={18} />
            </button>
            <button className="px-3 py-1 rounded-lg" style={{ background: '#5596FF', color: '#FFFFFF', fontSize: '14px', fontWeight: 500 }}>
              1
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100" disabled style={{ color: '#94A3B8' }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
