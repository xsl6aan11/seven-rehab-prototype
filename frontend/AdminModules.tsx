import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  DollarSign, TrendingUp, Award, AlertCircle, Eye, Download, X, Calendar,
  BarChart3, LineChart, PieChart, Activity, Clock, CheckCircle, Users,
  List, Search, Filter, ChevronRight, User, Shield, Building, Bell, Brain,
  Zap, MapPin, Settings as SettingsIcon, Lock, Globe, CreditCard, Upload,
  Save, Plus, Edit, Trash2, MoreVertical, FileText, Target, XCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock Data for Finance Module
const mockPayoutData = [
  {
    id: 'TH-001',
    name: 'Dr. Fatima Hassan',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    sessions: 67,
    baseEarnings: 23450, // 67 * 350
    bonusRate: 20, // 50-75 tier
    bonuses: 4690,
    penalties: 350, // 1 no-show
    totalPayout: 27790,
    status: 'pending'
  },
  {
    id: 'TH-002',
    name: 'Dr. Omar Khalid',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    sessions: 43,
    baseEarnings: 15050,
    bonusRate: 10,
    bonuses: 1505,
    penalties: 0,
    totalPayout: 16555,
    status: 'paid'
  },
  {
    id: 'TH-003',
    name: 'Dr. Layla Ibrahim',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    sessions: 89,
    baseEarnings: 31150,
    bonusRate: 30,
    bonuses: 9345,
    penalties: 700,
    totalPayout: 39795,
    status: 'pending'
  }
];

// Mock Data for Analytics
const analyticsData = {
  totalBookings: 1247,
  completionRate: 87.3,
  avgConfirmationTime: '2.4h',
  expiredRate: 4.2,
  homeCareAssignmentTime: '12.5 min',
  therapistOnline: 78
};

// Mock Data for Logs
const mockLogs = [
  {
    id: 'LOG-001',
    timestamp: '2024-11-24 14:32:15',
    actor: 'Admin (Sarah A.)',
    role: 'Admin',
    entity: 'Booking',
    action: 'Approved',
    status: 'Success',
    details: { bookingId: 'BK-001', oldValue: 'pending', newValue: 'confirmed' }
  },
  {
    id: 'LOG-002',
    timestamp: '2024-11-24 14:15:03',
    actor: 'System',
    role: 'System',
    entity: 'Home Care Request',
    action: 'Auto-Expired',
    status: 'Success',
    details: { requestId: 'REQ-042', reason: '10-hour limit exceeded' }
  },
  {
    id: 'LOG-003',
    timestamp: '2024-11-24 13:45:22',
    actor: 'Dr. Fatima Hassan',
    role: 'Therapist',
    entity: 'SOAP Note',
    action: 'Created',
    status: 'Success',
    details: { soapId: 'SOAP-156', patientId: 'PT-023' }
  },
  {
    id: 'LOG-004',
    timestamp: '2024-11-24 12:28:41',
    actor: 'AI System',
    role: 'System',
    entity: 'Treatment Plan',
    action: 'Generated',
    status: 'Error',
    details: { planId: 'TP-089', error: 'Invalid SOAP format', deviation: '35%' }
  }
];

interface FinanceModuleProps {
  language: 'EN' | 'AR';
}

export function FinanceModule({ language }: FinanceModuleProps) {
  const isArabic = language === 'AR';
  const [selectedTherapist, setSelectedTherapist] = useState<any>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const getBonusTier = (sessions: number) => {
    if (sessions >= 100) return { rate: 40, tier: '100+', color: '#8B5CF6' };
    if (sessions >= 75) return { rate: 30, tier: '75-100', color: '#3B82F6' };
    if (sessions >= 50) return { rate: 20, tier: '50-75', color: '#10B981' };
    if (sessions >= 25) return { rate: 10, tier: '25-50', color: '#F59E0B' };
    if (sessions >= 10) return { rate: 5, tier: '10-25', color: '#6B7280' };
    return { rate: 0, tier: '0-10', color: '#9CA3AF' };
  };

  const totalPayoutThisMonth = mockPayoutData.reduce((sum, t) => sum + t.totalPayout, 0);
  const totalBonuses = mockPayoutData.reduce((sum, t) => sum + t.bonuses, 0);
  const totalSessions = mockPayoutData.reduce((sum, t) => sum + t.sessions, 0);
  const pendingPayouts = mockPayoutData.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.totalPayout, 0);
  const revenueThisMonth = totalSessions * 500; // Revenue from sessions at 500 SAR per session

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
        {isArabic ? 'لوحة المالية والمكافآت' : 'Finance & Bonuses Dashboard'}
      </h2>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { label: isArabic ? 'الإيرادات هذا الشهر' : 'Revenue This Month', value: `SAR ${revenueThisMonth.toLocaleString()}`, icon: TrendingUp, color: '#8B5CF6' },
          { label: isArabic ? 'إجمالي المدفوعات هذا الشهر' : 'Total Payout This Month', value: `SAR ${totalPayoutThisMonth.toLocaleString()}`, icon: DollarSign, color: '#5596FF' },
          { label: isArabic ? 'إجمالي المكافآت الموزعة' : 'Total Bonuses Distributed', value: `SAR ${totalBonuses.toLocaleString()}`, icon: Award, color: '#10B981' },
          { label: isArabic ? 'إجمالي الجلسات المكتملة' : 'Total Sessions Completed', value: totalSessions.toString(), icon: Activity, color: '#F59E0B' },
          { label: isArabic ? 'المدفوعات المعلقة' : 'Pending Payouts', value: `SAR ${pendingPayouts.toLocaleString()}`, icon: Clock, color: '#DC2626' }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
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
              </div>
              <div style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>{kpi.label}</div>
              <div style={{ color: '#1A2A42', fontSize: '28px', fontWeight: 700 }}>{kpi.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Bonus Tier System */}
      <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
        <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '18px', fontWeight: 600 }}>
          {isArabic ? 'نظام المكافآت المتدرجة' : 'Bonus Tier System'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { sessions: '10-25', bonus: '5%', color: '#6B7280' },
            { sessions: '25-50', bonus: '10%', color: '#F59E0B' },
            { sessions: '50-75', bonus: '20%', color: '#10B981' },
            { sessions: '75-100', bonus: '30%', color: '#3B82F6' },
            { sessions: '100+', bonus: '40%', color: '#8B5CF6' }
          ].map((tier, idx) => (
            <div key={idx} className="p-4 rounded-xl text-center" style={{ background: `${tier.color}10`, border: `2px solid ${tier.color}30` }}>
              <div style={{ color: tier.color, fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>{tier.bonus}</div>
              <div style={{ color: '#64748B', fontSize: '13px', fontWeight: 500 }}>{tier.sessions} {isArabic ? 'جلسات' : 'sessions'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
        <div className="p-6 border-b" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex items-center justify-between">
            <h3 style={{ color: '#1A2A42', fontSize: '18px', fontWeight: 600 }}>
              {isArabic ? 'نظرة عامة على مدفوعات المعالجين' : 'Therapist Payout Overview'}
            </h3>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
                <Filter size={18} /> {isArabic ? 'تصفية' : 'Filter'}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
                <Download size={18} /> {isArabic ? 'تصدير' : 'Export'}
              </button>
            </div>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr style={{ background: '#F5F9FF', borderBottom: '1px solid #E2E8F0' }}>
              {[
                isArabic ? 'المعالج' : 'Therapist',
                isArabic ? 'الجلسات' : 'Sessions',
                isArabic ? 'الأرباح الأساسية' : 'Base Earnings',
                isArabic ? 'المكافآت' : 'Bonuses',
                isArabic ? 'الغرامات' : 'Penalties',
                isArabic ? 'إجمالي المدفوعات' : 'Total Payout',
                isArabic ? 'الحالة' : 'Status',
                isArabic ? 'الإجراءات' : 'Actions'
              ].map((col) => (
                <th key={col} className="px-6 py-4 text-left" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockPayoutData.map((therapist, idx) => {
              const bonusTier = getBonusTier(therapist.sessions);
              const progress = Math.min((therapist.sessions / 100) * 100, 100);
              
              return (
                <tr key={therapist.id} className="border-b hover:bg-gray-50" style={{ borderColor: '#E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
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
                  <td className="px-6 py-4">
                    <div>
                      <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{therapist.sessions}</div>
                      <div className="mt-2 w-24">
                        <div className="w-full h-1.5 rounded-full" style={{ background: '#E2E8F0' }}>
                          <div className="h-full rounded-full" style={{ width: `${progress}%`, background: bonusTier.color }} />
                        </div>
                        <div className="text-xs mt-1" style={{ color: bonusTier.color, fontWeight: 600 }}>
                          {bonusTier.rate}% tier
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      SAR {therapist.baseEarnings.toLocaleString()}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      SAR 350/session
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div style={{ color: '#10B981', fontSize: '14px', fontWeight: 700 }}>
                      +SAR {therapist.bonuses.toLocaleString()}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {bonusTier.rate}% bonus
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div style={{ color: therapist.penalties > 0 ? '#DC2626' : '#64748B', fontSize: '14px', fontWeight: 600 }}>
                      {therapist.penalties > 0 ? `-SAR ${therapist.penalties}` : 'None'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 700 }}>
                      SAR {therapist.totalPayout.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs"
                      style={{
                        background: therapist.status === 'paid' ? '#DCFCE7' : '#FEF3C7',
                        color: therapist.status === 'paid' ? '#16A34A' : '#D97706',
                        fontWeight: 600
                      }}
                    >
                      {isArabic ? (therapist.status === 'paid' ? 'مدفوع' : 'معلق') : (therapist.status === 'paid' ? 'Paid' : 'Pending')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedTherapist(therapist);
                        setShowDrawer(true);
                      }}
                      className="flex items-center gap-2 px-3 py-1 rounded-lg"
                      style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '12px', fontWeight: 500 }}
                    >
                      <Eye size={14} /> {isArabic ? 'عرض التفاصيل' : 'View Breakdown'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Payout Breakdown Drawer */}
      {showDrawer && selectedTherapist && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-end"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowDrawer(false)}
        >
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            className="h-full w-full max-w-lg overflow-y-auto"
            style={{ background: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b sticky top-0 bg-white z-10" style={{ borderColor: '#E2E8F0' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ color: '#1A2A42', fontSize: '20px', fontWeight: 600 }}>
                  {isArabic ? 'تفاصيل المدفوعات' : 'Payout Breakdown'}
                </h3>
                <button onClick={() => setShowDrawer(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X size={20} style={{ color: '#64748B' }} />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <ImageWithFallback src={selectedTherapist.photo} alt={selectedTherapist.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>{selectedTherapist.name}</div>
                  <div style={{ color: '#64748B', fontSize: '14px' }}>{selectedTherapist.id}</div>
                </div>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6">
              {/* Sessions List */}
              <div>
                <h4 className="mb-3" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'الجلسات المساهمة' : 'Contributing Sessions'}
                </h4>
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="p-3 rounded-lg flex items-center justify-between" style={{ background: '#F9FAFB' }}>
                      <div>
                        <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>
                          Session #{idx + 1} - Patient {String.fromCharCode(65 + idx)}
                        </div>
                        <div style={{ color: '#64748B', fontSize: '12px' }}>
                          2024-11-{24 - idx}
                        </div>
                      </div>
                      <div style={{ color: '#10B981', fontSize: '14px', fontWeight: 600 }}>
                        SAR 350
                      </div>
                    </div>
                  ))}
                  <div className="text-center py-2" style={{ color: '#64748B', fontSize: '12px' }}>
                    + {selectedTherapist.sessions - 5} more sessions
                  </div>
                </div>
              </div>

              {/* Bonus Calculation */}
              <div className="p-4 rounded-xl" style={{ background: '#F0FDF4', border: '1px solid #86EFAC' }}>
                <h4 className="mb-3" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'حساب المكافآت' : 'Bonus Calculation'}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'عدد الجلسات' : 'Sessions Count'}:</span>
                    <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{selectedTherapist.sessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'مستوى المكافأة' : 'Bonus Tier'}:</span>
                    <span style={{ color: getBonusTier(selectedTherapist.sessions).color, fontSize: '14px', fontWeight: 600 }}>
                      {getBonusTier(selectedTherapist.sessions).rate}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'إجمالي المكافآت' : 'Total Bonus'}:</span>
                    <span style={{ color: '#10B981', fontSize: '14px', fontWeight: 700 }}>
                      +SAR {selectedTherapist.bonuses.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Penalties */}
              {selectedTherapist.penalties > 0 && (
                <div className="p-4 rounded-xl" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                  <h4 className="mb-3" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                    {isArabic ? 'الغرامات' : 'Penalties'}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'عدم الحضور' : 'No-show sessions'}:</span>
                      <span style={{ color: '#DC2626', fontSize: '14px', fontWeight: 600 }}>-SAR 350</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Final Summary */}
              <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, #EAF3FF 0%, #D0E7FF 100%)', border: '2px solid #5596FF' }}>
                <h4 className="mb-3" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'ملخص المدفوعات النهائي' : 'Final Payout Summary'}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'الأرباح الأساسية' : 'Base Earnings'}:</span>
                    <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>SAR {selectedTherapist.baseEarnings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'المكافآت' : 'Bonuses'}:</span>
                    <span style={{ color: '#10B981', fontSize: '14px', fontWeight: 700 }}>+SAR {selectedTherapist.bonuses.toLocaleString()}</span>
                  </div>
                  {selectedTherapist.penalties > 0 && (
                    <div className="flex justify-between">
                      <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'الغرامات' : 'Penalties'}:</span>
                      <span style={{ color: '#DC2626', fontSize: '14px', fontWeight: 700 }}>-SAR {selectedTherapist.penalties}</span>
                    </div>
                  )}
                  <div className="h-px my-2" style={{ background: '#5596FF' }} />
                  <div className="flex justify-between">
                    <span style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 700 }}>{isArabic ? 'الإجمالي' : 'Total'}:</span>
                    <span style={{ color: '#2E63FF', fontSize: '20px', fontWeight: 700 }}>SAR {selectedTherapist.totalPayout.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Export Button */}
              <button
                className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)', color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}
              >
                <Download size={18} /> {isArabic ? 'تصدير كـ PDF' : 'Export as PDF'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

interface AnalyticsModuleProps {
  language: 'EN' | 'AR';
}

export function AnalyticsModule({ language }: AnalyticsModuleProps) {
  const isArabic = language === 'AR';

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
        {isArabic ? 'لوحة التحليلات' : 'Analytics Dashboard'}
      </h2>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: isArabic ? 'إجمالي الحجوزات (30 يوم)' : 'Total Bookings (30 days)', value: analyticsData.totalBookings.toString(), icon: Calendar, color: '#5596FF', trend: '+12%' },
          { label: isArabic ? 'معدل الإكمال' : 'Completion Rate', value: `${analyticsData.completionRate}%`, icon: CheckCircle, color: '#10B981', trend: '+3.2%' },
          { label: isArabic ? 'متوسط وقت التأكيد' : 'Avg Confirmation Time', value: analyticsData.avgConfirmationTime, icon: Clock, color: '#F59E0B', trend: '-0.3h' },
          { label: isArabic ? 'معدل الحجوزات المنتهية' : 'Expired Booking Rate', value: `${analyticsData.expiredRate}%`, icon: AlertCircle, color: '#DC2626', trend: '-1.1%' },
          { label: isArabic ? 'وقت تعيين الرعاية المنزلية' : 'Home-Care Assignment Time', value: analyticsData.homeCareAssignmentTime, icon: MapPin, color: '#8B5CF6', trend: '-2.5 min' },
          { label: isArabic ? 'المعالجون المتصلون' : 'Therapists Online', value: `${analyticsData.therapistOnline}%`, icon: Users, color: '#3B82F6', trend: '+5%' }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
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
                <div className="px-2 py-1 rounded text-xs" style={{ background: kpi.trend.startsWith('+') ? '#DCFCE7' : '#FEE2E2', color: kpi.trend.startsWith('+') ? '#16A34A' : '#DC2626', fontWeight: 600 }}>
                  {kpi.trend}
                </div>
              </div>
              <div style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>{kpi.label}</div>
              <div style={{ color: '#1A2A42', fontSize: '28px', fontWeight: 700 }}>{kpi.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Over Time */}
        <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
            {isArabic ? 'الحجوزات عبر الزمن' : 'Bookings Over Time'}
          </h3>
          <div className="w-full h-64 rounded-xl flex items-center justify-center" style={{ background: '#F5F9FF' }}>
            <LineChart size={64} style={{ color: '#5596FF' }} />
          </div>
        </div>

        {/* Booking Type Split */}
        <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
            {isArabic ? 'تقسيم نوع الحجز' : 'Booking Type Split'}
          </h3>
          <div className="w-full h-64 rounded-xl flex items-center justify-center" style={{ background: '#F5F9FF' }}>
            <BarChart3 size={64} style={{ color: '#10B981' }} />
          </div>
        </div>

        {/* Top Performing Therapists */}
        <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
            {isArabic ? 'أفضل المعالجين أداءً' : 'Top Performing Therapists'}
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Dr. Fatima Hassan', sessions: 89, color: '#8B5CF6' },
              { name: 'Dr. Omar Khalid', sessions: 67, color: '#3B82F6' },
              { name: 'Dr. Layla Ibrahim', sessions: 54, color: '#10B981' }
            ].map((therapist, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{therapist.name}</span>
                    <span style={{ color: '#64748B', fontSize: '14px', fontWeight: 600 }}>{therapist.sessions}</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ background: '#E2E8F0' }}>
                    <div className="h-full rounded-full" style={{ width: `${(therapist.sessions / 89) * 100}%`, background: therapist.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Common Conditions */}
        <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
            {isArabic ? 'أكثر الحالات شيوعاً' : 'Most Common Conditions'}
          </h3>
          <div className="w-full h-64 rounded-xl flex items-center justify-center" style={{ background: '#F5F9FF' }}>
            <PieChart size={64} style={{ color: '#F59E0B' }} />
          </div>
        </div>
      </div>

      {/* AI Performance & Home Care SLA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Performance */}
        <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', border: '1px solid #7DD3FC', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#FFFFFF' }}>
              <Brain size={24} style={{ color: '#0EA5E9' }} />
            </div>
            <h3 style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
              {isArabic ? 'أداء الذكاء الاصطناعي' : 'AI Performance'}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: isArabic ? 'متوسط الانحراف' : 'Avg Deviation', value: '18.4%' },
              { label: isArabic ? 'معدل الإشارة' : 'Flag Rate', value: '12.3%' },
              { label: isArabic ? 'اكتمال SOAP' : 'SOAP Completeness', value: '94.2%' },
              { label: isArabic ? 'أخطاء AI' : 'AI Errors', value: '7' }
            ].map((metric, idx) => (
              <div key={idx} className="p-3 rounded-lg" style={{ background: '#FFFFFF' }}>
                <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>{metric.label}</div>
                <div style={{ color: '#0EA5E9', fontSize: '20px', fontWeight: 700 }}>{metric.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Home Care SLA */}
        <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', border: '1px solid #FCD34D', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#FFFFFF' }}>
              <MapPin size={24} style={{ color: '#F59E0B' }} />
            </div>
            <h3 style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
              {isArabic ? 'معايير الرعاية المنزلية' : 'Home Care SLA'}
            </h3>
          </div>
          <div className="space-y-4">
            {[
              { label: isArabic ? 'متوسط وقت التعيين' : 'Avg Assignment Time', value: '12.5 min' },
              { label: isArabic ? 'مُعيّن خلال 15 دقيقة' : 'Assigned < 15 min', value: '87.3%' },
              { label: isArabic ? 'الطلبات المنتهية' : 'Expired Requests', value: '4.2%' }
            ].map((metric, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#FFFFFF' }}>
                <span style={{ color: '#64748B', fontSize: '14px' }}>{metric.label}</span>
                <span style={{ color: '#F59E0B', fontSize: '16px', fontWeight: 700 }}>{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface LogsModuleProps {
  language: 'EN' | 'AR';
}

export function LogsModule({ language }: LogsModuleProps) {
  const isArabic = language === 'AR';
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [errorOnlyFilter, setErrorOnlyFilter] = useState(false);

  const filteredLogs = errorOnlyFilter ? mockLogs.filter(log => log.status === 'Error') : mockLogs;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
          {isArabic ? 'سجل النظام والمراجعة' : 'System Logs & Audit Trail'}
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setErrorOnlyFilter(!errorOnlyFilter)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{
              background: errorOnlyFilter ? '#FEE2E2' : '#F5F9FF',
              color: errorOnlyFilter ? '#DC2626' : '#2E63FF',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            <AlertCircle size={18} /> {isArabic ? 'الأخطاء فقط' : 'Errors Only'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
            <Filter size={18} /> {isArabic ? 'تصفية' : 'Filter'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
            <Download size={18} /> {isArabic ? 'تصدير كـ CSV' : 'Export CSV'}
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F5F9FF', borderBottom: '1px solid #E2E8F0' }}>
              {[
                isArabic ? 'الوقت' : 'Timestamp',
                isArabic ? 'الفاعل' : 'Actor',
                isArabic ? 'الدور' : 'Role',
                isArabic ? 'الكيان' : 'Entity',
                isArabic ? 'الإجراء' : 'Action',
                isArabic ? 'الحالة' : 'Status',
                isArabic ? 'التفاصيل' : 'Details'
              ].map((col) => (
                <th key={col} className="px-6 py-4 text-left" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, idx) => (
              <tr
                key={log.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                style={{ borderColor: '#E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}
                onClick={() => {
                  setSelectedLog(log);
                  setShowDrawer(true);
                }}
              >
                <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '13px', fontFamily: 'monospace' }}>
                  {log.timestamp}
                </td>
                <td className="px-6 py-4">
                  <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{log.actor}</div>
                </td>
                <td className="px-6 py-4">
                  <div
                    className="inline-block px-2 py-1 rounded text-xs"
                    style={{
                      background: log.role === 'Admin' ? '#E0E7FF' : log.role === 'System' ? '#F3F4F6' : '#DCFCE7',
                      color: log.role === 'Admin' ? '#4F46E5' : log.role === 'System' ? '#6B7280' : '#16A34A',
                      fontWeight: 600
                    }}
                  >
                    {log.role}
                  </div>
                </td>
                <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>
                  {log.entity}
                </td>
                <td className="px-6 py-4">
                  <div
                    className="inline-block px-2 py-1 rounded text-xs"
                    style={{
                      background: '#FEF3C7',
                      color: '#D97706',
                      fontWeight: 600
                    }}
                  >
                    {log.action}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div
                    className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
                    style={{
                      background: log.status === 'Success' ? '#DCFCE7' : '#FEE2E2',
                      color: log.status === 'Success' ? '#16A34A' : '#DC2626',
                      fontWeight: 600
                    }}
                  >
                    {log.status === 'Success' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {log.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-1 px-3 py-1 rounded-lg" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '12px', fontWeight: 500 }}>
                    <Eye size={14} /> {isArabic ? 'عرض' : 'View'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Drawer */}
      {showDrawer && selectedLog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-end"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowDrawer(false)}
        >
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            className="h-full w-full max-w-lg overflow-y-auto"
            style={{ background: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b sticky top-0 bg-white z-10" style={{ borderColor: '#E2E8F0' }}>
              <div className="flex items-center justify-between">
                <h3 style={{ color: '#1A2A42', fontSize: '20px', fontWeight: 600 }}>
                  {isArabic ? 'تفاصيل السجل' : 'Log Details'}
                </h3>
                <button onClick={() => setShowDrawer(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X size={20} style={{ color: '#64748B' }} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Event Info */}
              <div className="p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                <h4 className="mb-3" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'معلومات الحدث' : 'Event Information'}
                </h4>
                <div className="space-y-2">
                  {[
                    { label: isArabic ? 'الطابع الزمني' : 'Timestamp', value: selectedLog.timestamp },
                    { label: isArabic ? 'الفاعل' : 'Actor', value: selectedLog.actor },
                    { label: isArabic ? 'الدور' : 'Role', value: selectedLog.role },
                    { label: isArabic ? 'الكيان' : 'Entity', value: selectedLog.entity },
                    { label: isArabic ? 'الإجراء' : 'Action', value: selectedLog.action },
                    { label: isArabic ? 'الحالة' : 'Status', value: selectedLog.status }
                  ].map((field, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b" style={{ borderColor: '#E2E8F0' }}>
                      <span style={{ color: '#64748B', fontSize: '14px' }}>{field.label}:</span>
                      <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Change Details */}
              <div className="p-4 rounded-xl" style={{ background: '#F0FDF4', border: '1px solid #86EFAC' }}>
                <h4 className="mb-3" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'تفاصيل التغيير' : 'Change Details'}
                </h4>
                <div className="space-y-3">
                  {Object.entries(selectedLog.details).map(([key, value]) => (
                    <div key={key}>
                      <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>
                        {key}:
                      </div>
                      <div
                        className="p-2 rounded font-mono text-xs"
                        style={{ background: '#FFFFFF', color: '#1A2A42', border: '1px solid #D1D5DB' }}
                      >
                        {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                <h4 className="mb-3" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'البيانات الوصفية' : 'Metadata'}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'عنوان IP' : 'IP Address'}:</span>
                    <span style={{ color: '#1A2A42', fontSize: '14px', fontFamily: 'monospace' }}>192.168.1.100</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'الجهاز' : 'Device'}:</span>
                    <span style={{ color: '#1A2A42', fontSize: '14px' }}>Chrome/Mac OS</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'معرف السجل' : 'Log ID'}:</span>
                    <span style={{ color: '#1A2A42', fontSize: '14px', fontFamily: 'monospace' }}>{selectedLog.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

interface SettingsModuleProps {
  language: 'EN' | 'AR';
}

export function SettingsModule({ language }: SettingsModuleProps) {
  const isArabic = language === 'AR';
  const [activeTab, setActiveTab] = useState('system');
  const [expandedSections, setExpandedSections] = useState<string[]>(['system']);

  const tabs = [
    { id: 'system', label: isArabic ? 'إعدادات النظام' : 'System Settings', icon: SettingsIcon },
    { id: 'booking', label: isArabic ? 'قواعد الحجز' : 'Booking Rules', icon: Calendar },
    { id: 'homecare', label: isArabic ? 'قواعد الرعاية المنزلية' : 'Home Care Rules', icon: MapPin },
    { id: 'ai', label: isArabic ? 'إعدادات الذكاء الاصطناعي' : 'AI Settings', icon: Brain },
    { id: 'notifications', label: isArabic ? 'إعدادات الإشعارات' : 'Notification Settings', icon: Bell },
    { id: 'permissions', label: isArabic ? 'الأدوار والصلاحيات' : 'Roles & Permissions', icon: Shield }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
        {isArabic ? 'إعدادات الإدارة' : 'Admin Settings'}
      </h2>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap"
              style={{
                background: activeTab === tab.id ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)' : '#F5F9FF',
                color: activeTab === tab.id ? '#FFFFFF' : '#2E63FF',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* System Settings */}
        {activeTab === 'system' && (
          <div className="space-y-4">
            {/* Business Info */}
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'معلومات العمل' : 'Business Information'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label style={{ color: '#64748B', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    {isArabic ? 'اسم المنصة' : 'Platform Name'}
                  </label>
                  <input
                    type="text"
                    defaultValue="Seven Rehab"
                    className="w-full px-4 py-2 rounded-xl"
                    style={{ background: '#F9FAFB', border: '1px solid #E2E8F0', color: '#1A2A42' }}
                  />
                </div>
                <div>
                  <label style={{ color: '#64748B', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    {isArabic ? 'تحميل الشعار' : 'Logo Upload'}
                  </label>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}>
                    <Upload size={18} /> {isArabic ? 'تحميل صورة' : 'Upload Image'}
                  </button>
                </div>
                <div>
                  <label style={{ color: '#64748B', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    {isArabic ? 'اللغة الافتراضية' : 'Default Language'}
                  </label>
                  <select className="w-full px-4 py-2 rounded-xl" style={{ background: '#F9FAFB', border: '1px solid #E2E8F0', color: '#1A2A42' }}>
                    <option>English</option>
                    <option>العربية</option>
                    <option>Both</option>
                  </select>
                </div>
                <div>
                  <label style={{ color: '#64748B', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    {isArabic ? 'ساعات العمل الافتراضية' : 'Default Working Hours'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="time" defaultValue="09:00" className="px-4 py-2 rounded-xl" style={{ background: '#F9FAFB', border: '1px solid #E2E8F0' }} />
                    <input type="time" defaultValue="17:00" className="px-4 py-2 rounded-xl" style={{ background: '#F9FAFB', border: '1px solid #E2E8F0' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Rules */}
        {activeTab === 'booking' && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'قواعد تأكيد الحجز' : 'Booking Confirmation Rules'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                  <div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {isArabic ? 'نافذة التأكيد (متصل)' : 'Confirmation Window (Online)'}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {isArabic ? 'للمعالجين المتصلين' : 'For online therapists'}
                    </div>
                  </div>
                  <input type="number" defaultValue="2" className="w-20 px-3 py-2 rounded-lg text-center" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', fontWeight: 600 }} />
                  <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'ساعات' : 'hours'}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                  <div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {isArabic ? 'نافذة التأكيد (غير متصل)' : 'Confirmation Window (Offline)'}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {isArabic ? 'للمعالجين غير المتصلين' : 'For offline therapists'}
                    </div>
                  </div>
                  <input type="number" defaultValue="10" className="w-20 px-3 py-2 rounded-lg text-center" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', fontWeight: 600 }} />
                  <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'ساعات' : 'hours'}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                  <div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {isArabic ? 'الانتهاء التلقائي' : 'Auto-Expiry'}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {isArabic ? 'إلغاء الحجوزات غير المؤكدة تلقائياً' : 'Automatically cancel unconfirmed bookings'}
                    </div>
                  </div>
                  <button className="w-14 h-8 rounded-full relative" style={{ background: '#10B981' }}>
                    <div className="absolute right-1 top-1 w-6 h-6 rounded-full" style={{ background: '#FFFFFF' }} />
                  </button>
                </div>

                <div>
                  <label style={{ color: '#64748B', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    {isArabic ? 'مدة الجلسة الافتراضية' : 'Default Session Duration'}
                  </label>
                  <select className="w-full px-4 py-2 rounded-xl" style={{ background: '#F9FAFB', border: '1px solid #E2E8F0', color: '#1A2A42' }}>
                    <option>45 minutes</option>
                    <option>60 minutes</option>
                    <option>90 minutes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Home Care Rules */}
        {activeTab === 'homecare' && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'قواعد الرعاية المنزلية' : 'Home Care Configuration'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                  <div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {isArabic ? 'نطاق الخدمة الافتراضي' : 'Default Service Radius'}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {isArabic ? 'نطاق البحث عن المعالجين' : 'Therapist search radius'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" defaultValue="5" className="w-20 px-3 py-2 rounded-lg text-center" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', fontWeight: 600 }} />
                    <span style={{ color: '#64748B', fontSize: '14px' }}>km</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                  <div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {isArabic ? 'التعيين التلقائي' : 'Auto-Assign'}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {isArabic ? 'تعيين المعالجين تلقائياً' : 'Automatically assign therapists'}
                    </div>
                  </div>
                  <button className="w-14 h-8 rounded-full relative" style={{ background: '#E2E8F0' }}>
                    <div className="absolute left-1 top-1 w-6 h-6 rounded-full" style={{ background: '#FFFFFF' }} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                  <div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {isArabic ? 'هدف SLA للتعيين' : 'SLA Assignment Target'}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {isArabic ? 'الوقت المستهدف لتعيين معالج' : 'Target time to assign a therapist'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" defaultValue="15" className="w-20 px-3 py-2 rounded-lg text-center" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', fontWeight: 600 }} />
                    <span style={{ color: '#64748B', fontSize: '14px' }}>{isArabic ? 'دقيقة' : 'min'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Settings */}
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'تكوين الذكاء الاصطناعي' : 'AI Configuration'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label style={{ color: '#64748B', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    {isArabic ? 'مزود الذكاء الاصطناعي' : 'AI Provider'}
                  </label>
                  <select className="w-full px-4 py-2 rounded-xl" style={{ background: '#F9FAFB', border: '1px solid #E2E8F0', color: '#1A2A42' }}>
                    <option>DeepSeek</option>
                    <option>OpenAI</option>
                    <option>Custom Provider</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#64748B', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    {isArabic ? 'مفتاح API (محمي)' : 'API Key (Masked)'}
                  </label>
                  <input
                    type="password"
                    defaultValue="sk-••••••••••••••••"
                    className="w-full px-4 py-2 rounded-xl font-mono"
                    style={{ background: '#F9FAFB', border: '1px solid #E2E8F0', color: '#1A2A42' }}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                  <div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {isArabic ? 'عتبة انحراف الخطة' : 'Plan Deviation Threshold'}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {isArabic ? 'الحد الأقصى للانحراف المسموح به' : 'Maximum allowed deviation'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" defaultValue="30" className="w-20 px-3 py-2 rounded-lg text-center" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', fontWeight: 600 }} />
                    <span style={{ color: '#64748B', fontSize: '14px' }}>%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                  <div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {isArabic ? 'قاعدة الإشارة التلقائية' : 'Auto-Flag Rule'}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {isArabic ? 'الإشارة التلقائية للخطط ذات الانحراف العالي' : 'Automatically flag high-deviation plans'}
                    </div>
                  </div>
                  <button className="w-14 h-8 rounded-full relative" style={{ background: '#10B981' }}>
                    <div className="absolute right-1 top-1 w-6 h-6 rounded-full" style={{ background: '#FFFFFF' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'قنوات الإشعارات الافتراضية' : 'Default Notification Channels'}
              </h3>
              <div className="space-y-3">
                {['SMS', 'WhatsApp', 'Email'].map((channel) => (
                  <div key={channel} className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                    <div className="flex items-center gap-3">
                      <Bell size={20} style={{ color: '#5596FF' }} />
                      <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{channel}</span>
                    </div>
                    <button className="w-14 h-8 rounded-full relative" style={{ background: '#10B981' }}>
                      <div className="absolute right-1 top-1 w-6 h-6 rounded-full" style={{ background: '#FFFFFF' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl" style={{ background: '#F0F9FF', border: '1px solid #7DD3FC' }}>
              <div className="flex items-start gap-3">
                <Bell size={20} style={{ color: '#0EA5E9' }} />
                <div>
                  <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                    {isArabic ? 'إدارة القوالب' : 'Template Management'}
                  </div>
                  <div style={{ color: '#64748B', fontSize: '13px', marginBottom: '8px' }}>
                    {isArabic ? 'قم بتحرير قوالب الإشعارات من وحدة الإشعارات' : 'Edit notification templates from the Notifications module'}
                  </div>
                  <button className="px-3 py-1 rounded-lg" style={{ background: '#0EA5E9', color: '#FFFFFF', fontSize: '12px', fontWeight: 500 }}>
                    {isArabic ? 'انتقل إلى القوالب' : 'Go to Templates'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Roles & Permissions */}
        {activeTab === 'permissions' && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {isArabic ? 'مستخدمو الإدارة' : 'Admin Users'}
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)', color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                  <Plus size={18} /> {isArabic ? 'إضافة مسؤول' : 'Add Admin'}
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Sarah Admin', email: 'sarah@sevenrehab.com', role: 'Super Admin' },
                  { name: 'Ahmad Manager', email: 'ahmad@sevenrehab.com', role: 'Operations Manager' }
                ].map((admin, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#F9FAFB' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)' }}>
                        <User size={20} style={{ color: '#FFFFFF' }} />
                      </div>
                      <div>
                        <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>{admin.name}</div>
                        <div style={{ color: '#64748B', fontSize: '12px' }}>{admin.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full" style={{ background: '#E0E7FF', color: '#4F46E5', fontSize: '12px', fontWeight: 600 }}>
                        {admin.role}
                      </div>
                      <button className="p-2 rounded-lg hover:bg-gray-100">
                        <MoreVertical size={16} style={{ color: '#64748B' }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Permissions Matrix */}
            <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                {isArabic ? 'مصفوفة الصلاحيات' : 'Permissions Matrix'}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                      <th className="px-4 py-3 text-left" style={{ color: '#64748B', fontSize: '12px', fontWeight: 600 }}>
                        {isArabic ? 'الوحدة' : 'Module'}
                      </th>
                      <th className="px-4 py-3 text-center" style={{ color: '#64748B', fontSize: '12px', fontWeight: 600 }}>
                        {isArabic ? 'عرض' : 'View'}
                      </th>
                      <th className="px-4 py-3 text-center" style={{ color: '#64748B', fontSize: '12px', fontWeight: 600 }}>
                        {isArabic ? 'تعديل' : 'Edit'}
                      </th>
                      <th className="px-4 py-3 text-center" style={{ color: '#64748B', fontSize: '12px', fontWeight: 600 }}>
                        {isArabic ? 'حذف' : 'Delete'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Bookings', 'Therapists', 'Patients', 'Finance', 'Settings'].map((module, idx) => (
                      <tr key={idx} className="border-b" style={{ borderColor: '#E2E8F0' }}>
                        <td className="px-4 py-3" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>{module}</td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" defaultChecked className="w-4 h-4 rounded" style={{ accentColor: '#5596FF' }} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" defaultChecked={idx < 3} className="w-4 h-4 rounded" style={{ accentColor: '#5596FF' }} />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" defaultChecked={idx === 0} className="w-4 h-4 rounded" style={{ accentColor: '#5596FF' }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)', color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
            <Save size={18} /> {isArabic ? 'حفظ التغييرات' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
