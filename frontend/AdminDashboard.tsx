import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Calendar,
  Users,
  UserCircle,
  ClipboardList,
  FileText,
  Brain,
  Bell,
  DollarSign,
  BarChart3,
  List,
  Settings,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  Star,
  Award,
  Activity,
  AlertTriangle,
  RefreshCw,
  Send,
  Plus,
  X,
  Check,
  Shield,
  Key,
  Globe,
  CreditCard,
  Zap,
  Target,
  User
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import SevenRehabLogo from './SevenRehabLogo';

interface AdminDashboardProps {
  language: 'EN' | 'AR';
  onLanguageToggle: () => void;
  onLogout?: () => void;
  onBackToHome?: () => void;
}

type Module = 
  | 'home'
  | 'bookings'
  | 'therapists'
  | 'patients'
  | 'requests'
  | 'soap'
  | 'ai-monitor'
  | 'notifications'
  | 'finance'
  | 'analytics'
  | 'logs'
  | 'settings';

type ViewMode = 'list' | 'detail' | 'form';

const content = {
  EN: {
    modules: {
      home: 'Home',
      bookings: 'Bookings',
      therapists: 'Therapists',
      patients: 'Patients',
      requests: 'Home Care Requests',
      soap: 'SOAP & QA',
      'ai-monitor': 'AI Monitor',
      notifications: 'Notifications',
      finance: 'Finance & Bonuses',
      analytics: 'Analytics',
      logs: 'Logs & Audit',
      settings: 'Settings'
    },
    common: {
      search: 'Search...',
      filter: 'Filter',
      export: 'Export',
      viewDetails: 'View Details',
      edit: 'Edit',
      delete: 'Delete',
      approve: 'Approve',
      reject: 'Reject',
      cancel: 'Cancel',
      save: 'Save',
      send: 'Send',
      download: 'Download',
      upload: 'Upload',
      back: 'Back',
      loading: 'Loading...',
      noData: 'No data available',
      actions: 'Actions'
    },
    home: {
      title: 'Admin Dashboard',
      kpis: {
        activePatients: 'Active Patients',
        activeTherapists: 'Active Therapists',
        todayBookings: 'Today\'s Bookings',
        pendingConfirmations: 'Pending Confirmations',
        openRequests: 'Open Home-Care Requests',
        avgConfirmationTime: 'Avg Confirmation Time',
        soapSubmitted: 'SOAP Submitted Today',
        plansAwaitingQA: 'Plans Awaiting QA'
      },
      alerts: {
        title: 'Alerts & Notifications',
        expiringBookings: 'Bookings expiring in 60 minutes',
        missingSoap: 'Therapists missing SOAP',
        flaggedPlans: 'AI plans flagged (>30% deviation)',
        inactiveTherapists: 'Inactive therapists (7+ days)',
        failedNotifications: 'Failed notifications',
        apiErrors: 'API errors'
      },
      quickActions: {
        title: 'Quick Actions',
        viewPendingBookings: 'View Pending Bookings',
        approveTherapists: 'Approve Therapists',
        reviewFlaggedPlans: 'Review Flagged Plans',
        openRequests: 'Open Home Requests',
        sendNotification: 'Send Notification',
        viewFinanceSummary: 'View Finance Summary'
      }
    },
    bookings: {
      title: 'Bookings Management',
      columns: {
        id: 'Booking ID',
        patient: 'Patient',
        therapist: 'Therapist',
        type: 'Type',
        dateTime: 'Date & Time',
        status: 'Status',
        payment: 'Payment',
        actions: 'Actions'
      },
      status: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        completed: 'Completed',
        cancelled: 'Cancelled',
        expired: 'Expired'
      },
      types: {
        home: 'Home Visit',
        clinic: 'Clinic Visit',
        consultation: 'Consultation + Treatment',
        treatment: 'Treatment Only'
      },
      filters: {
        allStatus: 'All Status',
        allTypes: 'All Types',
        dateRange: 'Date Range'
      },
      detail: {
        bookingInfo: 'Booking Information',
        timeline: 'Booking Timeline',
        paymentInfo: 'Payment Information',
        notificationLogs: 'Notification Logs',
        reassignTherapist: 'Reassign Therapist',
        contactTherapist: 'Contact Therapist',
        contactPatient: 'Contact Patient'
      }
    },
    therapists: {
      title: 'Therapist Management',
      columns: {
        name: 'Name',
        specialty: 'Specialty',
        status: 'Status',
        rating: 'Rating',
        confirmationRate: 'Confirmation Rate',
        sessionsCount: 'Sessions',
        lastActive: 'Last Active'
      },
      status: {
        active: 'Active',
        pending: 'Pending Review',
        rejected: 'Rejected',
        offline: 'Offline',
        verified: 'Verified'
      },
      profile: {
        personalInfo: 'Personal Information',
        licenseDocuments: 'License & Documents',
        availability: 'Availability Schedule',
        homeCareRadius: 'Home-Care Radius',
        performance: 'Performance Analytics',
        bonusProgress: 'Bonus Progress',
        resetPassword: 'Reset Password',
        deactivate: 'Deactivate Account'
      }
    },
    patients: {
      title: 'Patient Management',
      columns: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        bookingsCount: 'Bookings',
        reportsUploaded: 'Reports',
        status: 'Status'
      },
      status: {
        active: 'Active',
        blocked: 'Blocked'
      },
      profile: {
        personalInfo: 'Personal Information',
        bookingHistory: 'Booking History',
        homeCareRequests: 'Home-Care Requests',
        treatmentPlans: 'Treatment Plans',
        soapSummaries: 'SOAP Summaries',
        uploadedFiles: 'Uploaded Files',
        blockPatient: 'Block Patient',
        exportPDF: 'Export as PDF'
      }
    },
    requests: {
      title: 'Home Care Requests',
      columns: {
        id: 'Request ID',
        patient: 'Patient',
        location: 'Location',
        preferredTimes: 'Preferred Times',
        status: 'Status',
        createdAt: 'Created At'
      },
      status: {
        pending: 'Pending',
        assigned: 'Assigned',
        expired: 'Expired',
        cancelled: 'Cancelled'
      },
      detail: {
        requestInfo: 'Request Information',
        mapPreview: 'Location Map',
        description: 'Description',
        autoExpiry: 'Auto-Expiry Timer',
        nearbyTherapists: 'Nearby Therapists',
        assignTherapist: 'Assign Therapist',
        cancelRequest: 'Cancel Request'
      }
    },
    soap: {
      title: 'SOAP & Treatment Plans',
      tabs: {
        soapNotes: 'SOAP Notes',
        treatmentPlans: 'Treatment Plans'
      },
      columns: {
        patient: 'Patient',
        therapist: 'Therapist',
        date: 'Date',
        sessionNumber: 'Session #',
        missingFields: 'Missing Fields',
        deviation: 'Deviation %',
        status: 'Status'
      },
      detail: {
        subjective: 'Subjective',
        objective: 'Objective',
        assessment: 'Assessment',
        plan: 'Plan',
        attachments: 'Attachments',
        qaComments: 'QA Comments',
        aiGenerated: 'AI-Generated Plan',
        finalPlan: 'Final Plan',
        editHistory: 'Edit History',
        requestCorrections: 'Request Corrections'
      }
    },
    aiMonitor: {
      title: 'AI Monitor',
      usage: {
        plansGenerated: 'Plans Generated',
        avgDeviation: 'Avg Deviation',
        acceptedAsIs: 'Accepted As-Is',
        revised: 'Revised by Therapist'
      },
      graphs: {
        deviationTrend: 'Deviation Trend',
        failureIncidents: 'Failure Incidents',
        completionTime: 'Completion Time Distribution'
      },
      errorLog: {
        title: 'AI Error Log',
        apiFailures: 'API Failures',
        invalidPayloads: 'Invalid SOAP Payloads',
        slowResponses: 'Slow Responses'
      }
    },
    notifications: {
      title: 'Notifications',
      tabs: {
        log: 'Notification Log',
        templates: 'Templates',
        broadcast: 'Broadcast'
      },
      columns: {
        channel: 'Channel',
        recipient: 'Recipient',
        messageType: 'Message Type',
        status: 'Status',
        timestamp: 'Timestamp'
      },
      channels: {
        sms: 'SMS',
        email: 'Email',
        whatsapp: 'WhatsApp'
      },
      broadcast: {
        selectAudience: 'Select Audience',
        selectChannel: 'Select Channel',
        writeMessage: 'Write Message',
        preview: 'Preview'
      }
    },
    finance: {
      title: 'Finance & Bonuses',
      overview: {
        totalRevenue: 'Total Revenue',
        totalPayouts: 'Total Payouts',
        refunds: 'Refunds',
        pendingTransactions: 'Pending Transactions'
      },
      therapistEarnings: {
        title: 'Therapist Earnings',
        sessionsCount: 'Sessions',
        baseEarnings: 'Base Earnings',
        bonusEarnings: 'Bonus',
        total: 'Total',
        payoutStatus: 'Payout Status'
      },
      graphs: {
        dailyRevenue: 'Daily Revenue',
        paymentMethodSplit: 'Payment Method Split'
      }
    },
    analytics: {
      title: 'Analytics',
      charts: {
        sessionsOverTime: 'Sessions Over Time',
        cancellationRate: 'Cancellation Rate Trend',
        responseTime: 'Therapist Response Time',
        topConditions: 'Top Conditions Treated',
        homeVsClinic: 'Home vs Clinic Ratio',
        geographicalDemand: 'Geographical Demand Heatmap'
      }
    },
    logs: {
      title: 'Logs & Audit',
      tabs: {
        system: 'System Logs',
        audit: 'Admin Audit'
      },
      system: {
        apiErrors: 'API Errors',
        frontendErrors: 'Frontend Errors',
        warnings: 'Warnings',
        cronJobs: 'Cron Job Logs'
      },
      audit: {
        columns: {
          admin: 'Admin User',
          action: 'Action',
          changes: 'Before → After',
          timestamp: 'Timestamp'
        }
      }
    },
    settings: {
      title: 'Settings',
      sections: {
        adminRoles: 'Admin Roles & Permissions',
        therapistOnboarding: 'Therapist Onboarding Settings',
        bookingRules: 'Booking Rules',
        homeCareRadius: 'Home-Care Radius',
        aiProvider: 'AI Provider Keys',
        paymentSettings: 'Payment Settings',
        notificationProviders: 'Notification Provider Settings'
      }
    },
    admin: {
      profile: 'Admin Profile',
      logout: 'Logout',
      language: 'اللغه العربه'
    }
  },
  AR: {
    modules: {
      home: 'الرئيسية',
      bookings: 'الحجوزات',
      therapists: 'المعالجون',
      patients: 'المرضى',
      requests: 'طلبات الرعاية المنزلية',
      soap: 'SOAP والجودة',
      'ai-monitor': 'مراقبة الذكاء الاصطناعي',
      notifications: 'الإشعارات',
      finance: 'المالية والمكافآت',
      analytics: 'التحليلات',
      logs: 'السجلات والمراجعة',
      settings: 'الإعدادات'
    },
    common: {
      search: 'بحث...',
      filter: 'تصفية',
      export: 'تصدير',
      viewDetails: 'عرض التفاصيل',
      edit: 'تعديل',
      delete: 'حذف',
      approve: 'موافقة',
      reject: 'رفض',
      cancel: 'إلغاء',
      save: 'حفظ',
      send: 'إرسال',
      download: 'تحميل',
      upload: 'رفع',
      back: 'رجوع',
      loading: 'جاري التحميل...',
      noData: 'لا توجد بيانات',
      actions: 'الإجراءات'
    },
    home: {
      title: 'لوحة التحكم',
      kpis: {
        activePatients: 'المرضى النشطون',
        activeTherapists: 'المعالجون النشطون',
        todayBookings: 'حجوزات اليوم',
        pendingConfirmations: 'تأكيدات معلقة',
        openRequests: 'طلبات رعاية منزلية مفتوحة',
        avgConfirmationTime: 'متوسط وقت التأكيد',
        soapSubmitted: 'SOAP المقدمة اليوم',
        plansAwaitingQA: 'خطط بانتظار المراجعة'
      },
      alerts: {
        title: 'التنبيهات والإشعارات',
        expiringBookings: 'حجوزات تنتهي خلال 60 دقيقة',
        missingSoap: 'معالجون لم يقدموا SOAP',
        flaggedPlans: 'خطط مشير عليها (انحراف > 30%)',
        inactiveTherapists: 'معالجون غير نشطين (7+ أيام)',
        failedNotifications: 'إشعارات فاشلة',
        apiErrors: 'أخطاء API'
      },
      quickActions: {
        title: 'إجراءات سريعة',
        viewPendingBookings: 'عرض الحجوزات المعلقة',
        approveTherapists: 'الموافقة على المعالجين',
        reviewFlaggedPlans: 'مراجعة الخطط المشار عليها',
        openRequests: 'طلبات الرعاية المنزلية المفتوحة',
        sendNotification: 'إرسال إشعار',
        viewFinanceSummary: 'عرض الملخص المالي'
      }
    },
    bookings: {
      title: 'إدارة الحجوزات',
      columns: {
        id: 'رقم الحجز',
        patient: 'المريض',
        therapist: 'المعالج',
        type: 'النوع',
        dateTime: 'التاريخ والوقت',
        status: 'الحالة',
        payment: 'الدفع',
        actions: 'الإجراءات'
      },
      status: {
        pending: 'معلق',
        confirmed: 'مؤكد',
        completed: 'مكتمل',
        cancelled: 'ملغى',
        expired: 'منتهي'
      },
      types: {
        home: 'زيارة منزلية',
        clinic: 'زيارة عيادة',
        consultation: 'استشارة + علاج',
        treatment: 'علاج فقط'
      },
      filters: {
        allStatus: 'جميع الحالات',
        allTypes: 'جميع الأنواع',
        dateRange: 'نطاق التاريخ'
      },
      detail: {
        bookingInfo: 'معلومات الحجز',
        timeline: 'الجدول الزمني للحجز',
        paymentInfo: 'معلومات الدفع',
        notificationLogs: 'سجلات الإشعارات',
        reassignTherapist: 'إعادة تعيين معالج',
        contactTherapist: 'التواصل مع المعالج',
        contactPatient: 'التواصل مع المريض'
      }
    },
    therapists: {
      title: 'إدارة المعالجين',
      columns: {
        name: 'الاسم',
        specialty: 'التخصص',
        status: 'الحالة',
        rating: 'التقييم',
        confirmationRate: 'معدل التأكيد',
        sessionsCount: 'الجلسات',
        lastActive: 'آخر نشاط'
      },
      status: {
        active: 'نشط',
        pending: 'قيد المراجعة',
        rejected: 'مرفوض',
        offline: 'غير متصل',
        verified: 'موثق'
      },
      profile: {
        personalInfo: 'المعلومات الشخصية',
        licenseDocuments: 'الترخيص والوثائق',
        availability: 'جدول التوفر',
        homeCareRadius: 'نطاق الرعاية المنزلية',
        performance: 'تحليلات الأداء',
        bonusProgress: 'تقدم المكافآت',
        resetPassword: 'إعادة تعيين كلمة المرور',
        deactivate: 'إلغاء تفعيل الحساب'
      }
    },
    patients: {
      title: 'إدارة المرضى',
      columns: {
        name: 'الاسم',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        bookingsCount: 'الحجوزات',
        reportsUploaded: 'التقارير',
        status: 'الحالة'
      },
      status: {
        active: 'نشط',
        blocked: 'محظور'
      },
      profile: {
        personalInfo: 'المعلومات الشخصية',
        bookingHistory: 'سجل الحجوزات',
        homeCareRequests: 'طلبات الرعاية المنزلية',
        treatmentPlans: 'خطط العلاج',
        soapSummaries: 'ملخصات SOAP',
        uploadedFiles: 'الملفات المرفوعة',
        blockPatient: 'حظر المريض',
        exportPDF: 'تصدير كـ PDF'
      }
    },
    requests: {
      title: 'طلبات الرعاية المنزلية',
      columns: {
        id: 'رقم الطلب',
        patient: 'المريض',
        location: 'الموقع',
        preferredTimes: 'الأوقات المفضلة',
        status: 'الحالة',
        createdAt: 'تاريخ الإنشاء'
      },
      status: {
        pending: 'معلق',
        assigned: 'معين',
        expired: 'منتهي',
        cancelled: 'ملغى'
      },
      detail: {
        requestInfo: 'معلومات الطلب',
        mapPreview: 'خريطة الموقع',
        description: 'الوصف',
        autoExpiry: 'مؤقت الانتهاء التلقائي',
        nearbyTherapists: 'المعالجون القريبون',
        assignTherapist: 'تعيين معالج',
        cancelRequest: 'إلغاء الطلب'
      }
    },
    soap: {
      title: 'SOAP ومراجعة الجودة',
      tabs: {
        soapNotes: 'ملاحظات SOAP',
        treatmentPlans: 'خطط العلاج'
      },
      columns: {
        patient: 'المريض',
        therapist: 'المعالج',
        date: 'التاريخ',
        sessionNumber: 'رقم الجلسة',
        missingFields: 'حقول ناقصة',
        deviation: 'نسبة الانحراف',
        status: 'الحالة'
      },
      detail: {
        subjective: 'ذاتي',
        objective: 'موضوعي',
        assessment: 'التقييم',
        plan: 'الخطة',
        attachments: 'المرفقات',
        qaComments: 'تعليقات المراجعة',
        aiGenerated: 'خطة الذكاء الاصطناعي',
        finalPlan: 'الخطة النهائية',
        editHistory: 'سجل التعديلات',
        requestCorrections: 'طلب تصحيحات'
      }
    },
    aiMonitor: {
      title: 'مراقبة الذكاء الاصطناعي',
      usage: {
        plansGenerated: 'الخطط المولدة',
        avgDeviation: 'متوسط الانحراف',
        acceptedAsIs: 'مقبولة كما هي',
        revised: 'معدلة من المعالج'
      },
      graphs: {
        deviationTrend: 'اتجاه الانحراف',
        failureIncidents: 'حوادث الفشل',
        completionTime: 'توزيع وقت الإكمال'
      },
      errorLog: {
        title: 'سجل أخطاء الذكاء الاصطناعي',
        apiFailures: 'فشل API',
        invalidPayloads: 'بيانات SOAP غير صالحة',
        slowResponses: 'استجابات بطيئة'
      }
    },
    notifications: {
      title: 'الإشعارات',
      tabs: {
        log: 'سجل الإشعارات',
        templates: 'القوالب',
        broadcast: 'البث'
      },
      columns: {
        channel: 'القناة',
        recipient: 'المستلم',
        messageType: 'نوع الرسالة',
        status: 'الحالة',
        timestamp: 'الوقت'
      },
      channels: {
        sms: 'رسالة نصية',
        email: 'بريد إلكتروني',
        whatsapp: 'واتساب'
      },
      broadcast: {
        selectAudience: 'اختر الجمهور',
        selectChannel: 'اختر القناة',
        writeMessage: 'اكتب الرسالة',
        preview: 'معاينة'
      }
    },
    finance: {
      title: 'المالية والمكافآت',
      overview: {
        totalRevenue: 'إجمالي الإيرادات',
        totalPayouts: 'إجمالي المدفوعات',
        refunds: 'المبالغ المستردة',
        pendingTransactions: 'المعاملات المعلقة'
      },
      therapistEarnings: {
        title: 'أرباح المعالجين',
        sessionsCount: 'الجلسات',
        baseEarnings: 'الأرباح الأساسية',
        bonusEarnings: 'المكافآت',
        total: 'الإجمالي',
        payoutStatus: 'حالة الصرف'
      },
      graphs: {
        dailyRevenue: 'الإيرادات اليومية',
        paymentMethodSplit: 'توزيع طرق الدفع'
      }
    },
    analytics: {
      title: 'التحليلات',
      charts: {
        sessionsOverTime: 'الجلسات عبر الزمن',
        cancellationRate: 'اتجاه معدل الإلغاء',
        responseTime: 'وقت استجابة المعالج',
        topConditions: 'أكثر الحالات علاجاً',
        homeVsClinic: 'نسبة المنزل مقابل العيادة',
        geographicalDemand: 'خريطة الطلب الجغرافي'
      }
    },
    logs: {
      title: 'السجلات والمراجعة',
      tabs: {
        system: 'سجلات النظام',
        audit: 'مراجعة الإدارة'
      },
      system: {
        apiErrors: 'أخطاء API',
        frontendErrors: 'أخطاء الواجهة',
        warnings: 'تحذيرات',
        cronJobs: 'سجلات المهام المجدولة'
      },
      audit: {
        columns: {
          admin: 'مستخدم الإدارة',
          action: 'الإجراء',
          changes: 'قبل ← بعد',
          timestamp: 'الوقت'
        }
      }
    },
    settings: {
      title: 'الإعدادات',
      sections: {
        adminRoles: 'أدوار الإدارة والصلاحيات',
        therapistOnboarding: 'إعدادات تسجيل المعالجين',
        bookingRules: 'قواعد الحجز',
        homeCareRadius: 'نطاق الرعاية المنزلية',
        aiProvider: 'مفاتيح موفر الذكاء الاصطناعي',
        paymentSettings: 'إعدادات الدفع',
        notificationProviders: 'إعدادات موفري الإشعارات'
      }
    },
    admin: {
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
      language: 'Continue in English'
    }
  }
};

// Mock data
const mockKPIs = [
  { label: 'activePatients', value: '1,247', trend: '+12%', icon: Users, color: '#5596FF' },
  { label: 'activeTherapists', value: '156', trend: '+8%', icon: UserCircle, color: '#10B981' },
  { label: 'todayBookings', value: '43', trend: '+5%', icon: Calendar, color: '#F5A623' },
  { label: 'pendingConfirmations', value: '12', trend: '-3%', icon: Clock, color: '#FF4D4F' },
  { label: 'openRequests', value: '8', trend: '+2', icon: ClipboardList, color: '#8CB7FF' },
  { label: 'avgConfirmationTime', value: '2.4h', trend: '-0.5h', icon: Activity, color: '#4CAF50' },
  { label: 'soapSubmitted', value: '34', trend: '+7', icon: FileText, color: '#2E63FF' },
  { label: 'plansAwaitingQA', value: '5', trend: '-2', icon: AlertCircle, color: '#F5A623' }
];

const mockAlerts = [
  { type: 'expiringBookings', count: 3, severity: 'error', icon: Clock },
  { type: 'missingSoap', count: 7, severity: 'warning', icon: FileText },
  { type: 'flaggedPlans', count: 4, severity: 'warning', icon: AlertTriangle },
  { type: 'inactiveTherapists', count: 12, severity: 'info', icon: UserCircle },
  { type: 'failedNotifications', count: 2, severity: 'error', icon: Bell },
  { type: 'apiErrors', count: 1, severity: 'error', icon: Zap }
];

const mockBookings = [
  {
    id: 'BK-2024-001',
    patient: { name: 'Ahmed Al-Rashid', phone: '+966501234567' },
    therapist: { name: 'Dr. Fatima Hassan', specialty: 'Sports Rehab' },
    type: 'home',
    dateTime: '2024-11-25, 2:00 PM',
    status: 'confirmed',
    payment: 'paid'
  },
  {
    id: 'BK-2024-002',
    patient: { name: 'Sara Abdullah', phone: '+966507654321' },
    therapist: { name: 'Dr. Omar Khalid', specialty: 'Neurology PT' },
    type: 'clinic',
    dateTime: '2024-11-25, 4:00 PM',
    status: 'pending',
    payment: 'pending'
  },
  {
    id: 'BK-2024-003',
    patient: { name: 'Mohammed Ali', phone: '+966509876543' },
    therapist: { name: 'Dr. Layla Ibrahim', specialty: 'Pediatric PT' },
    type: 'home',
    dateTime: '2024-11-25, 10:00 AM',
    status: 'completed',
    payment: 'paid'
  }
];

const mockTherapists = [
  {
    id: 'TH-001',
    name: 'Dr. Fatima Hassan',
    photo: 'https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?w=400',
    specialty: 'Sports Rehabilitation',
    status: 'active',
    rating: 4.9,
    confirmationRate: '92%',
    sessionsCount: 234,
    lastActive: '2 hours ago'
  },
  {
    id: 'TH-002',
    name: 'Dr. Omar Khalid',
    photo: 'https://images.unsplash.com/photo-1666886573230-2b730505f298?w=400',
    specialty: 'Neurology Physical Therapy',
    status: 'active',
    rating: 4.8,
    confirmationRate: '89%',
    sessionsCount: 187,
    lastActive: '5 hours ago'
  },
  {
    id: 'TH-003',
    name: 'Dr. Layla Ibrahim',
    photo: 'https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?w=400',
    specialty: 'Pediatric Physical Therapy',
    status: 'pending',
    rating: 4.7,
    confirmationRate: '95%',
    sessionsCount: 142,
    lastActive: '1 day ago'
  }
];

const mockPatients = [
  {
    id: 'PT-001',
    name: 'Ahmed Al-Rashid',
    phone: '+966501234567',
    email: 'ahmed@example.com',
    bookingsCount: 12,
    reportsUploaded: 5,
    status: 'active'
  },
  {
    id: 'PT-002',
    name: 'Sara Abdullah',
    phone: '+966507654321',
    email: 'sara@example.com',
    bookingsCount: 8,
    reportsUploaded: 3,
    status: 'active'
  }
];

export default function AdminDashboard({ language, onLanguageToggle, onLogout, onBackToHome }: AdminDashboardProps) {
  const isArabic = language === 'AR';
  const t = content[language];
  
  const [activeModule, setActiveModule] = useState<Module>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [soapTab, setSoapTab] = useState<'notes' | 'plans'>('notes');
  const [notificationTab, setNotificationTab] = useState<'log' | 'templates' | 'broadcast'>('log');
  const [logTab, setLogTab] = useState<'system' | 'audit'>('system');

  const sidebarItems: { module: Module; icon: any; label: string }[] = [
    { module: 'home', icon: Home, label: t.modules.home },
    { module: 'bookings', icon: Calendar, label: t.modules.bookings },
    { module: 'therapists', icon: UserCircle, label: t.modules.therapists },
    { module: 'patients', icon: Users, label: t.modules.patients },
    { module: 'requests', icon: ClipboardList, label: t.modules.requests },
    { module: 'soap', icon: FileText, label: t.modules.soap },
    { module: 'ai-monitor', icon: Brain, label: t.modules['ai-monitor'] },
    { module: 'notifications', icon: Bell, label: t.modules.notifications },
    { module: 'finance', icon: DollarSign, label: t.modules.finance },
    { module: 'analytics', icon: BarChart3, label: t.modules.analytics },
    { module: 'logs', icon: List, label: t.modules.logs },
    { module: 'settings', icon: Settings, label: t.modules.settings }
  ];

  const handleModuleClick = (module: Module) => {
    setActiveModule(module);
    setViewMode('list');
    setSelectedItem(null);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      confirmed: { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' },
      pending: { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' },
      completed: { bg: '#E0E7FF', text: '#4F46E5', border: '#C7D2FE' },
      cancelled: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA' },
      expired: { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' },
      active: { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' },
      offline: { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' },
      rejected: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA' },
      paid: { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' },
      blocked: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA' },
      assigned: { bg: '#E0E7FF', text: '#4F46E5', border: '#C7D2FE' },
      verified: { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' }
    };
    return colors[status] || colors.pending;
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      error: '#FF4D4F',
      warning: '#F5A623',
      info: '#5596FF'
    };
    return colors[severity] || colors.info;
  };

  // Render Home Module
  const renderHome = () => (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div>
        <h2 className="mb-6" style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
          {t.home.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockKPIs.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 rounded-2xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${kpi.color}15` }}
                  >
                    <Icon size={24} style={{ color: kpi.color }} />
                  </div>
                  <div
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      background: kpi.trend.startsWith('+') ? '#DCFCE7' : '#FEE2E2',
                      color: kpi.trend.startsWith('+') ? '#16A34A' : '#DC2626',
                      fontWeight: 600
                    }}
                  >
                    {kpi.trend}
                  </div>
                </div>
                <div style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>
                  {t.home.kpis[kpi.label as keyof typeof t.home.kpis]}
                </div>
                <div style={{ color: '#1A2A42', fontSize: '28px', fontWeight: 700 }}>
                  {kpi.value}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Alerts */}
      <div>
        <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '18px', fontWeight: 600 }}>
          {t.home.alerts.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAlerts.map((alert, idx) => {
            const Icon = alert.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl flex items-center justify-between"
                style={{
                  background: '#FFFFFF',
                  border: `1px solid ${getSeverityColor(alert.severity)}30`,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${getSeverityColor(alert.severity)}15` }}
                  >
                    <Icon size={20} style={{ color: getSeverityColor(alert.severity) }} />
                  </div>
                  <div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {t.home.alerts[alert.type as keyof typeof t.home.alerts]}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {alert.count} {alert.count === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                </div>
                <button
                  className="px-3 py-1 rounded-lg text-xs transition-all"
                  style={{
                    background: '#F5F9FF',
                    color: '#2E63FF',
                    fontWeight: 500
                  }}
                >
                  {t.common.viewDetails}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '18px', fontWeight: 600 }}>
          {t.home.quickActions.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(t.home.quickActions)
            .filter(key => key !== 'title')
            .map((action, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl text-center transition-all"
                style={{
                  background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(46, 99, 255, 0.25)'
                }}
              >
                {t.home.quickActions[action as keyof typeof t.home.quickActions]}
              </motion.button>
            ))}
        </div>
      </div>
    </div>
  );

  // Render Bookings Module
  const renderBookings = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
          {t.bookings.title}
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: '#64748B' }}
            />
            <Input
              placeholder={t.common.search}
              className="pl-10"
              style={{ minWidth: '300px' }}
            />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{
              background: '#F5F9FF',
              color: '#2E63FF',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            <Filter size={18} />
            {t.common.filter}
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{
              background: '#F5F9FF',
              color: '#2E63FF',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            <Download size={18} />
            {t.common.export}
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
        }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F5F9FF', borderBottom: '1px solid #E2E8F0' }}>
              {[
                'id',
                'patient',
                'therapist',
                'type',
                'dateTime',
                'status',
                'payment',
                'actions'
              ].map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-left"
                  style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}
                >
                  {t.bookings.columns[col as keyof typeof t.bookings.columns]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockBookings.map((booking, idx) => {
              const statusColor = getStatusColor(booking.status);
              const paymentColor = getStatusColor(booking.payment);
              return (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b"
                  style={{
                    borderColor: '#E2E8F0',
                    background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB'
                  }}
                >
                  <td className="px-6 py-4" style={{ color: '#2E63FF', fontSize: '14px', fontWeight: 600 }}>
                    {booking.id}
                  </td>
                  <td className="px-6 py-4">
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>
                      {booking.patient.name}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {booking.patient.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>
                      {booking.therapist.name}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {booking.therapist.specialty}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-lg"
                      style={{ background: '#F5F9FF', color: '#2E63FF', fontSize: '12px', fontWeight: 500 }}
                    >
                      {booking.type === 'home' ? <Home size={14} /> : <MapPin size={14} />}
                      {t.bookings.types[booking.type as keyof typeof t.bookings.types]}
                    </div>
                  </td>
                  <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>
                    {booking.dateTime}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs"
                      style={{
                        background: statusColor.bg,
                        color: statusColor.text,
                        border: `1px solid ${statusColor.border}`,
                        fontWeight: 600
                      }}
                    >
                      {t.bookings.status[booking.status as keyof typeof t.bookings.status]}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs"
                      style={{
                        background: paymentColor.bg,
                        color: paymentColor.text,
                        border: `1px solid ${paymentColor.border}`,
                        fontWeight: 600
                      }}
                    >
                      {booking.payment}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedItem(booking);
                        setViewMode('detail');
                      }}
                      className="flex items-center gap-2 px-3 py-1 rounded-lg transition-all"
                      style={{
                        background: '#F5F9FF',
                        color: '#2E63FF',
                        fontSize: '12px',
                        fontWeight: 500
                      }}
                    >
                      <Eye size={14} />
                      {t.common.viewDetails}
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Therapists Module
  const renderTherapists = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
          {t.therapists.title}
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: '#64748B' }}
            />
            <Input
              placeholder={t.common.search}
              className="pl-10"
              style={{ minWidth: '300px' }}
            />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{
              background: '#F5F9FF',
              color: '#2E63FF',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            <Filter size={18} />
            {t.common.filter}
          </button>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTherapists.map((therapist, idx) => {
          const statusColor = getStatusColor(therapist.status);
          return (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 rounded-2xl"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
              }}
            >
              {/* Status Badge */}
              <div className="flex justify-end mb-3">
                <div
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: statusColor.bg,
                    color: statusColor.text,
                    border: `1px solid ${statusColor.border}`,
                    fontWeight: 600
                  }}
                >
                  {t.therapists.status[therapist.status as keyof typeof t.therapists.status]}
                </div>
              </div>

              {/* Photo */}
              <div className="flex justify-center mb-4">
                <div
                  className="w-24 h-24 rounded-full overflow-hidden"
                  style={{
                    border: '3px solid #5596FF',
                    boxShadow: '0 4px 12px rgba(46, 99, 255, 0.2)'
                  }}
                >
                  <ImageWithFallback
                    src={therapist.photo}
                    alt={therapist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="text-center mb-4">
                <h3 className="mb-1" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {therapist.name}
                </h3>
                <p style={{ color: '#64748B', fontSize: '14px' }}>{therapist.specialty}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 rounded-lg" style={{ background: '#F5F9FF' }}>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star size={14} fill="#FFA75F" style={{ color: '#FFA75F' }} />
                    <span style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {therapist.rating}
                    </span>
                  </div>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>
                    {t.therapists.columns.rating}
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: '#F5F9FF' }}>
                  <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
                    {therapist.confirmationRate}
                  </div>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>
                    {t.therapists.columns.confirmationRate}
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: '#F5F9FF' }}>
                  <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
                    {therapist.sessionsCount}
                  </div>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>
                    {t.therapists.columns.sessionsCount}
                  </div>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: '#F5F9FF' }}>
                  <div style={{ color: '#64748B', fontSize: '11px', marginBottom: '2px' }}>
                    {t.therapists.columns.lastActive}
                  </div>
                  <div style={{ color: '#1A2A42', fontSize: '12px', fontWeight: 600 }}>
                    {therapist.lastActive}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() => {
                  setSelectedItem(therapist);
                  setViewMode('detail');
                }}
                className="w-full py-2 rounded-xl transition-all"
                style={{
                  background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600
                }}
              >
                {t.common.viewDetails}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  // Render Patients Module
  const renderPatients = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
          {t.patients.title}
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: '#64748B' }}
            />
            <Input
              placeholder={t.common.search}
              className="pl-10"
              style={{ minWidth: '300px' }}
            />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{
              background: '#F5F9FF',
              color: '#2E63FF',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            <Download size={18} />
            {t.common.export}
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
        }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F5F9FF', borderBottom: '1px solid #E2E8F0' }}>
              {['name', 'phone', 'email', 'bookingsCount', 'reportsUploaded', 'status', 'actions'].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-4 text-left"
                    style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}
                  >
                    {col === 'actions'
                      ? t.common.actions
                      : t.patients.columns[col as keyof typeof t.patients.columns]}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {mockPatients.map((patient, idx) => {
              const statusColor = getStatusColor(patient.status);
              return (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b"
                  style={{
                    borderColor: '#E2E8F0',
                    background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB'
                  }}
                >
                  <td className="px-6 py-4" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>
                    {patient.name}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>
                    {patient.phone}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#64748B', fontSize: '14px' }}>
                    {patient.email}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                    {patient.bookingsCount}
                  </td>
                  <td className="px-6 py-4" style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                    {patient.reportsUploaded}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs"
                      style={{
                        background: statusColor.bg,
                        color: statusColor.text,
                        border: `1px solid ${statusColor.border}`,
                        fontWeight: 600
                      }}
                    >
                      {t.patients.status[patient.status as keyof typeof t.patients.status]}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedItem(patient);
                        setViewMode('detail');
                      }}
                      className="flex items-center gap-2 px-3 py-1 rounded-lg transition-all"
                      style={{
                        background: '#F5F9FF',
                        color: '#2E63FF',
                        fontSize: '12px',
                        fontWeight: 500
                      }}
                    >
                      <Eye size={14} />
                      {t.common.viewDetails}
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Simple Placeholder for Other Modules
  const renderModulePlaceholder = (title: string) => (
    <div className="space-y-6">
      <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>{title}</h2>
      <div
        className="p-12 rounded-2xl text-center"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div className="mb-4">
          <Activity size={48} style={{ color: '#5596FF', margin: '0 auto' }} />
        </div>
        <p style={{ color: '#64748B', fontSize: '14px' }}>
          {title} module content coming soon...
        </p>
      </div>
    </div>
  );

  // Render Main Content Based on Active Module
  const renderMainContent = () => {
    switch (activeModule) {
      case 'home':
        return renderHome();
      case 'bookings':
        return renderBookings();
      case 'therapists':
        return renderTherapists();
      case 'patients':
        return renderPatients();
      case 'requests':
        return renderModulePlaceholder(t.requests.title);
      case 'soap':
        return renderModulePlaceholder(t.soap.title);
      case 'ai-monitor':
        return renderModulePlaceholder(t.aiMonitor.title);
      case 'notifications':
        return renderModulePlaceholder(t.notifications.title);
      case 'finance':
        return renderModulePlaceholder(t.finance.title);
      case 'analytics':
        return renderModulePlaceholder(t.analytics.title);
      case 'logs':
        return renderModulePlaceholder(t.logs.title);
      case 'settings':
        return renderModulePlaceholder(t.settings.title);
      default:
        return renderHome();
    }
  };

  return (
    <div
      className="min-h-screen flex"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        background: '#F5F9FF',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif'
      }}
    >
      {/* Sidebar */}
      <aside
        className="sticky top-0 h-screen flex flex-col"
        style={{
          width: '280px',
          background: '#FFFFFF',
          borderRight: isArabic ? 'none' : '1px solid #E2E8F0',
          borderLeft: isArabic ? '1px solid #E2E8F0' : 'none',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-3">
            <SevenRehabLogo width={40} />
            <div>
              <div style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 700 }}>
                Seventic
              </div>
              <div style={{ color: '#64748B', fontSize: '12px' }}>Admin Portal</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.module;
            return (
              <button
                key={item.module}
                onClick={() => handleModuleClick(item.module)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200"
                style={{
                  background: isActive ? 'linear-gradient(135deg, #EAF3FF 0%, #D0E7FF 100%)' : 'transparent',
                  color: isActive ? '#2E63FF' : '#64748B',
                  position: 'relative'
                }}
              >
                {isActive && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r"
                    style={{ background: 'linear-gradient(180deg, #5596FF 0%, #2E63FF 100%)' }}
                  />
                )}
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span style={{ fontSize: '14px', fontWeight: isActive ? 600 : 500 }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header
          className="sticky top-0 z-30 backdrop-blur-md"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderBottom: '1px solid #E2E8F0'
          }}
        >
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Clock size={20} style={{ color: '#64748B' }} />
              <span style={{ color: '#64748B', fontSize: '14px' }}>
                {new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={onLanguageToggle}
                className="px-4 py-2 rounded-xl transition-all"
                style={{
                  background: '#F5F9FF',
                  color: '#2E63FF',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {t.admin.language}
              </button>

              {/* Notifications */}
              <button
                className="relative p-2 rounded-xl"
                style={{ background: '#F5F9FF' }}
              >
                <Bell size={20} style={{ color: '#2E63FF' }} />
                <div
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ background: '#FF4D4F' }}
                />
              </button>

              {/* Admin Profile */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                  }}
                >
                  <User size={20} style={{ color: '#FFFFFF' }} />
                </div>
                <div>
                  <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                    Admin
                  </div>
                  <button
                    onClick={onLogout}
                    style={{ color: '#64748B', fontSize: '12px' }}
                  >
                    {t.admin.logout}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderMainContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
