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
  User,
  LogOut,
  Lock,
  MessageSquare,
  Navigation,
  MoreVertical,
  ArrowLeft,
  Circle,
  CheckCircle2,
  XCircle,
  Timer,
  Package,
  LineChart,
  PieChart,
  Map as MapIcon,
  Wifi,
  WifiOff
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import SevenRehabLogo from './SevenRehabLogo';

interface AdminDashboardCompleteProps {
  language: 'EN' | 'AR';
  onLanguageToggle: () => void;
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

type ViewMode = 'list' | 'detail';

const content = {
  EN: {
    modules: {
      home: 'Home',
      bookings: 'Bookings',
      therapists: 'Therapists',
      patients: 'Patients',
      requests: 'Home Care Requests',
      soap: 'SOAP & Plans (QA)',
      'ai-monitor': 'AI Monitor',
      notifications: 'Notifications',
      finance: 'Finance & Bonuses',
      analytics: 'Analytics',
      logs: 'Logs & Audit',
      settings: 'Settings'
    },
    topBar: {
      searchPlaceholder: 'Search dashboard...',
      notifications: 'Notifications',
      profile: 'Profile',
      changePassword: 'Change Password',
      logout: 'Logout',
      admin: 'Admin'
    },
    home: {
      title: 'Dashboard Overview',
      kpis: {
        activePatients: 'Active Patients',
        activeTherapists: 'Active Therapists',
        todayBookings: "Today's Bookings",
        pendingConfirmations: 'Pending Confirmations',
        openRequests: 'Open Home-Care Requests',
        avgConfirmationTime: 'Avg Confirmation Time',
        soapSubmitted: 'SOAP Submitted Today',
        plansAwaitingQA: 'Plans Awaiting QA'
      },
      alerts: {
        title: 'Alerts & Notifications',
        expiringBookings: 'Bookings expiring in 60 min',
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
      addBooking: 'Add Booking',
      filters: 'Filters',
      export: 'Export',
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
        clinic: 'Clinic Visit'
      },
      detail: {
        bookingTimeline: 'Booking Timeline',
        confirmationDeadline: 'Confirmation Deadline',
        bookingMeta: 'Booking Metadata',
        paymentInfo: 'Payment Information',
        notificationHistory: 'Notification History',
        patientInfo: 'Patient Information',
        therapistInfo: 'Therapist Information',
        linkedSOAP: 'Linked SOAP Note',
        linkedPlan: 'Linked Treatment Plan',
        reassignTherapist: 'Reassign Therapist',
        changeStatus: 'Change Status',
        contactTherapist: 'Contact Therapist',
        contactPatient: 'Contact Patient'
      }
    },
    therapists: {
      title: 'Therapist Management',
      addTherapist: 'Add Therapist',
      columns: {
        name: 'Name',
        specialty: 'Specialty',
        status: 'Status',
        rating: 'Rating',
        confirmationRate: 'Confirmation Rate',
        sessions: 'Sessions',
        lastActive: 'Last Active'
      },
      status: {
        active: 'Active',
        pending: 'Pending Review',
        rejected: 'Rejected',
        offline: 'Offline'
      },
      profile: {
        personalInfo: 'Personal Information',
        license: 'License & Documents',
        availability: 'Availability Schedule',
        radius: 'Home-Care Radius',
        performance: 'Performance Metrics',
        bonusProgress: 'Bonus Progress',
        approve: 'Approve',
        reject: 'Reject',
        resetPassword: 'Reset Password',
        deactivate: 'Deactivate'
      }
    },
    patients: {
      title: 'Patient Management',
      columns: {
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        bookings: 'Bookings',
        reports: 'Reports',
        status: 'Status'
      },
      profile: {
        personalInfo: 'Personal Information',
        bookingHistory: 'Booking History',
        requestsHistory: 'Home-Care Requests',
        treatmentPlans: 'Treatment Plans',
        soapNotes: 'SOAP Notes',
        uploadedReports: 'Uploaded Reports',
        editPatient: 'Edit Patient',
        blockPatient: 'Block Patient',
        exportPDF: 'Export PDF'
      }
    },
    requests: {
      title: 'Home Care Requests',
      columns: {
        id: 'Request ID',
        patient: 'Patient',
        area: 'Area',
        preferredTimes: 'Preferred Times',
        status: 'Status',
        created: 'Created At'
      },
      detail: {
        patientInfo: 'Patient Information',
        mapPreview: 'Location Map',
        description: 'Request Description',
        expiryTimer: 'Auto-Expiry Timer',
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
        session: 'Session #',
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
        comments: 'QA Comments',
        aiPlan: 'AI-Generated Plan',
        finalPlan: 'Final Plan',
        soapReference: 'SOAP Reference',
        versionHistory: 'Version History',
        approve: 'Approve',
        requestRevisions: 'Request Revisions'
      }
    },
    aiMonitor: {
      title: 'AI Monitor',
      metrics: {
        plansGenerated: 'Plans Generated',
        avgDeviation: 'Avg Deviation',
        acceptanceRate: 'Acceptance Rate',
        revisionRate: 'Revision Rate'
      },
      charts: {
        deviationTrend: 'Deviation Trend',
        dailyGeneration: 'Daily Plan Generation',
        apiFailures: 'API Failure Logs'
      },
      errorLog: {
        title: 'Error Log',
        timestamp: 'Timestamp',
        type: 'Type',
        endpoint: 'API Endpoint',
        message: 'Error Message'
      }
    },
    notifications: {
      title: 'Notifications Center',
      tabs: {
        log: 'Log',
        templates: 'Templates',
        broadcast: 'Broadcast'
      },
      columns: {
        channel: 'Channel',
        recipient: 'Recipient',
        messageType: 'Message Type',
        status: 'Status',
        timestamp: 'Timestamp',
        preview: 'Preview'
      },
      broadcast: {
        selectAudience: 'Select Audience',
        selectChannel: 'Select Channel',
        composeMessage: 'Compose Message',
        preview: 'Preview',
        send: 'Send'
      }
    },
    finance: {
      title: 'Finance & Bonuses',
      cards: {
        revenue: 'Total Revenue',
        payouts: 'Total Payouts',
        outstanding: 'Outstanding',
        refunds: 'Refunds'
      },
      charts: {
        dailyRevenue: 'Daily Revenue',
        paymentMethods: 'Payment Methods'
      },
      therapistEarnings: {
        title: 'Therapist Earnings',
        name: 'Name',
        sessions: 'Sessions',
        base: 'Base Earnings',
        bonus: 'Bonus',
        total: 'Total',
        status: 'Payout Status'
      }
    },
    analytics: {
      title: 'Analytics Dashboard',
      charts: {
        sessionsOverTime: 'Sessions Over Time',
        cancellationRate: 'Cancellation Rate Trend',
        responseTime: 'Therapist Response Time',
        topConditions: 'Top Conditions Treated',
        homeVsClinic: 'Home vs Clinic Ratio',
        demandHeatmap: 'Geographical Demand Heatmap'
      }
    },
    logs: {
      title: 'Logs & Audit',
      tabs: {
        system: 'System Logs',
        audit: 'Audit Logs'
      },
      system: {
        timestamp: 'Timestamp',
        module: 'Module',
        severity: 'Severity',
        message: 'Message',
        action: 'Action'
      },
      audit: {
        admin: 'Admin User',
        action: 'Action',
        entity: 'Affected Entity',
        changes: 'Before → After',
        timestamp: 'Timestamp'
      }
    },
    settings: {
      title: 'Settings',
      sections: {
        rolesPermissions: 'Roles & Permissions',
        therapistOnboarding: 'Therapist Onboarding Rules',
        bookingRules: 'Booking Rules',
        homeCareRadius: 'Home-Care Radius Settings',
        aiProvider: 'AI Provider Keys',
        paymentSettings: 'Payment Settings',
        notificationChannels: 'Notification Channels',
        appTheme: 'App Theme',
        languageDefaults: 'Language Defaults'
      }
    },
    common: {
      search: 'Search...',
      filter: 'Filter',
      export: 'Export',
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      approve: 'Approve',
      reject: 'Reject',
      save: 'Save',
      cancel: 'Cancel',
      back: 'Back',
      loading: 'Loading...',
      noData: 'No data available',
      showMore: 'Show More',
      showLess: 'Show Less'
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
    topBar: {
      searchPlaceholder: 'البحث في لوحة التحكم...',
      notifications: 'الإشعارات',
      profile: 'الملف الشخصي',
      changePassword: 'تغيير كلمة المرور',
      logout: 'تسجيل الخروج',
      admin: 'مسؤول'
    },
    home: {
      title: 'نظرة عامة',
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
      addBooking: 'إضافة حجز',
      filters: 'تصفية',
      export: 'تصدير',
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
        clinic: 'زيارة عيادة'
      },
      detail: {
        bookingTimeline: 'الجدول الزمني للحجز',
        confirmationDeadline: 'موعد التأكيد النهائي',
        bookingMeta: 'بيانات الحجز',
        paymentInfo: 'معلومات الدفع',
        notificationHistory: 'سجل الإشعارات',
        patientInfo: 'معلومات المريض',
        therapistInfo: 'معلومات المعالج',
        linkedSOAP: 'ملاحظة SOAP المرتبطة',
        linkedPlan: 'خطة العلاج المرتبطة',
        reassignTherapist: 'إعادة تعيين معالج',
        changeStatus: 'تغيير الحالة',
        contactTherapist: 'التواصل مع المعالج',
        contactPatient: 'التواصل مع المريض'
      }
    },
    therapists: {
      title: 'إدارة المعالجين',
      addTherapist: 'إضافة معالج',
      columns: {
        name: 'الاسم',
        specialty: 'التخصص',
        status: 'الحالة',
        rating: 'التقييم',
        confirmationRate: 'معدل التأكيد',
        sessions: 'الجلسات',
        lastActive: 'آخر نشاط'
      },
      status: {
        active: 'نشط',
        pending: 'قيد المراجعة',
        rejected: 'مرفوض',
        offline: 'غير متصل'
      },
      profile: {
        personalInfo: 'المعلومات الشخصية',
        license: 'الترخيص والوثائق',
        availability: 'جدول التوفر',
        radius: 'نطاق الرعاية المنزلية',
        performance: 'مقاييس الأداء',
        bonusProgress: 'تقدم المكافآت',
        approve: 'موافقة',
        reject: 'رفض',
        resetPassword: 'إعادة تعيين كلمة المرور',
        deactivate: 'إلغاء التفعيل'
      }
    },
    patients: {
      title: 'إدارة المرضى',
      columns: {
        name: 'الاسم',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        bookings: 'الحجوزات',
        reports: 'التقارير',
        status: 'الحالة'
      },
      profile: {
        personalInfo: 'المعلومات الشخصية',
        bookingHistory: 'سجل الحجوزات',
        requestsHistory: 'طلبات الرعاية المنزلية',
        treatmentPlans: 'خطط العلاج',
        soapNotes: 'ملاحظات SOAP',
        uploadedReports: 'التقارير المرفوعة',
        editPatient: 'تعديل المريض',
        blockPatient: 'حظر المريض',
        exportPDF: 'تصدير كـ PDF'
      }
    },
    requests: {
      title: 'طلبات الرعاية المنزلية',
      columns: {
        id: 'رقم الطلب',
        patient: 'المريض',
        area: 'المنطقة',
        preferredTimes: 'الأوقات المفضلة',
        status: 'الحالة',
        created: 'تاريخ الإنشاء'
      },
      detail: {
        patientInfo: 'معلومات المريض',
        mapPreview: 'خريطة الموقع',
        description: 'وصف الطلب',
        expiryTimer: 'مؤقت الانتهاء التلقائي',
        nearbyTherapists: 'المعالجون القريبون',
        assignTherapist: 'تعيين معالج',
        cancelRequest: 'إلغاء الطلب'
      }
    },
    soap: {
      title: 'SOAP وخطط العلاج',
      tabs: {
        soapNotes: 'ملاحظات SOAP',
        treatmentPlans: 'خطط العلاج'
      },
      columns: {
        patient: 'المريض',
        therapist: 'المعالج',
        date: 'التاريخ',
        session: 'رقم الجلسة',
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
        comments: 'تعليقات المراجعة',
        aiPlan: 'خطة الذكاء الاصطناعي',
        finalPlan: 'الخطة النهائية',
        soapReference: 'مرجع SOAP',
        versionHistory: 'سجل الإصدارات',
        approve: 'موافقة',
        requestRevisions: 'طلب تصحيحات'
      }
    },
    aiMonitor: {
      title: 'مراقبة الذكاء الاصطناعي',
      metrics: {
        plansGenerated: 'الخطط المولدة',
        avgDeviation: 'متوسط الانحراف',
        acceptanceRate: 'معدل القبول',
        revisionRate: 'معدل التعديل'
      },
      charts: {
        deviationTrend: 'اتجاه الانحراف',
        dailyGeneration: 'التوليد اليومي للخطط',
        apiFailures: 'سجلات فشل API'
      },
      errorLog: {
        title: 'سجل الأخطاء',
        timestamp: 'الوقت',
        type: 'النوع',
        endpoint: 'نقطة نهاية API',
        message: 'رسالة الخطأ'
      }
    },
    notifications: {
      title: 'مركز الإشعارات',
      tabs: {
        log: 'السجل',
        templates: 'القوالب',
        broadcast: 'البث'
      },
      columns: {
        channel: 'القناة',
        recipient: 'المستلم',
        messageType: 'نوع الرسالة',
        status: 'الحالة',
        timestamp: 'الوقت',
        preview: 'معاينة'
      },
      broadcast: {
        selectAudience: 'اختر الجمهور',
        selectChannel: 'اختر القناة',
        composeMessage: 'اكتب الرسالة',
        preview: 'معاينة',
        send: 'إرسال'
      }
    },
    finance: {
      title: 'المالية والمكافآت',
      cards: {
        revenue: 'إجمالي الإيرادات',
        payouts: 'إجمالي المدفوعات',
        outstanding: 'المستحقات',
        refunds: 'المبالغ المستردة'
      },
      charts: {
        dailyRevenue: 'الإيرادات اليومية',
        paymentMethods: 'طرق الدفع'
      },
      therapistEarnings: {
        title: 'أرباح المعالجين',
        name: 'الاسم',
        sessions: 'الجلسات',
        base: 'الأرباح الأساسية',
        bonus: 'المكافآت',
        total: 'الإجمالي',
        status: 'حالة الصرف'
      }
    },
    analytics: {
      title: 'لوحة التحليلات',
      charts: {
        sessionsOverTime: 'الجلسات عبر الزمن',
        cancellationRate: 'اتجاه معدل الإلغاء',
        responseTime: 'وقت استجابة المعالج',
        topConditions: 'أكثر الحالات علاجاً',
        homeVsClinic: 'نسبة المنزل مقابل العيادة',
        demandHeatmap: 'خريطة الطلب الجغرافي'
      }
    },
    logs: {
      title: 'السجلات والمراجعة',
      tabs: {
        system: 'سجلات النظام',
        audit: 'سجلات المراجعة'
      },
      system: {
        timestamp: 'الوقت',
        module: 'الوحدة',
        severity: 'الخطورة',
        message: 'الرسالة',
        action: 'الإجراء'
      },
      audit: {
        admin: 'مستخدم الإدارة',
        action: 'الإجراء',
        entity: 'الكيان المتأثر',
        changes: 'قبل ← بعد',
        timestamp: 'الوقت'
      }
    },
    settings: {
      title: 'الإعدادات',
      sections: {
        rolesPermissions: 'الأدوار والصلاحيات',
        therapistOnboarding: 'قواعد تسجيل المعالجين',
        bookingRules: 'قواعد الحجز',
        homeCareRadius: 'إعدادات نطاق الرعاية المنزلية',
        aiProvider: 'مفاتيح موفر الذكاء الاصطناعي',
        paymentSettings: 'إعدادات الدفع',
        notificationChannels: 'قنوات الإشعارات',
        appTheme: 'مظهر التطبيق',
        languageDefaults: 'اللغة الافتراضية'
      }
    },
    common: {
      search: 'بحث...',
      filter: 'تصفية',
      export: 'تصدير',
      view: 'عرض',
      edit: 'تعديل',
      delete: 'حذف',
      approve: 'موافقة',
      reject: 'رفض',
      save: 'حفظ',
      cancel: 'إلغاء',
      back: 'رجوع',
      loading: 'جاري التحميل...',
      noData: 'لا توجد بيانات',
      showMore: 'عرض المزيد',
      showLess: 'عرض أقل'
    }
  }
};

// Mock data
const mockBookings = [
  {
    id: 'BK-001',
    patient: { name: 'Ahmed Al-Rashid', phone: '+966501234567', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
    therapist: { name: 'Dr. Fatima Hassan', specialty: 'Sports Rehab' },
    type: 'home',
    dateTime: '2024-11-25, 2:00 PM',
    status: 'confirmed',
    payment: 'paid'
  },
  {
    id: 'BK-002',
    patient: { name: 'Sara Abdullah', phone: '+966507654321', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
    therapist: { name: 'Dr. Omar Khalid', specialty: 'Neurology PT' },
    type: 'clinic',
    dateTime: '2024-11-25, 4:00 PM',
    status: 'pending',
    payment: 'pending'
  },
  {
    id: 'BK-003',
    patient: { name: 'Mohammed Ali', phone: '+966509876543', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    therapist: { name: 'Dr. Layla Ibrahim', specialty: 'Pediatric PT' },
    type: 'home',
    dateTime: '2024-11-24, 10:00 AM',
    status: 'completed',
    payment: 'paid'
  }
];

export default function AdminDashboardComplete({ language, onLanguageToggle, onBackToHome }: AdminDashboardCompleteProps) {
  const isArabic = language === 'AR';
  const t = content[language];
  
  const [activeModule, setActiveModule] = useState<Module>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
      confirmed: { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' },
      pending: { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' },
      completed: { bg: '#E0E7FF', text: '#4F46E5', border: '#C7D2FE' },
      cancelled: { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA' },
      expired: { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' },
      active: { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' },
      paid: { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' }
    };
    return colors[status] || colors.pending;
  };

  // Render Home Module (Micro Prompt 3)
  const renderHome = () => {
    const kpis = [
      { key: 'activePatients', value: '1,247', trend: '+12%', icon: Users, color: '#5596FF', isPositive: true },
      { key: 'activeTherapists', value: '156', trend: '+8%', icon: UserCircle, color: '#10B981', isPositive: true },
      { key: 'todayBookings', value: '43', trend: '+5%', icon: Calendar, color: '#F5A623', isPositive: true },
      { key: 'pendingConfirmations', value: '12', trend: '-3%', icon: Clock, color: '#FF4D4F', isPositive: false },
      { key: 'openRequests', value: '8', trend: '+2', icon: ClipboardList, color: '#8CB7FF', isPositive: true },
      { key: 'avgConfirmationTime', value: '2.4h', trend: '-0.5h', icon: Activity, color: '#4CAF50', isPositive: true },
      { key: 'soapSubmitted', value: '34', trend: '+7', icon: FileText, color: '#2E63FF', isPositive: true },
      { key: 'plansAwaitingQA', value: '5', trend: '-2', icon: AlertCircle, color: '#F5A623', isPositive: true }
    ];

    const alerts = [
      { key: 'expiringBookings', count: 3, severity: 'error', icon: Clock },
      { key: 'missingSoap', count: 7, severity: 'warning', icon: FileText },
      { key: 'flaggedPlans', count: 4, severity: 'warning', icon: AlertTriangle },
      { key: 'inactiveTherapists', count: 12, severity: 'info', icon: UserCircle },
      { key: 'failedNotifications', count: 2, severity: 'error', icon: Bell },
      { key: 'apiErrors', count: 1, severity: 'error', icon: Zap }
    ];

    const quickActions = [
      { key: 'viewPendingBookings', icon: Calendar },
      { key: 'approveTherapists', icon: CheckCircle },
      { key: 'reviewFlaggedPlans', icon: AlertTriangle },
      { key: 'openRequests', icon: ClipboardList },
      { key: 'sendNotification', icon: Send },
      { key: 'viewFinanceSummary', icon: DollarSign }
    ];

    return (
      <div className="space-y-8">
        {/* KPI Cards */}
        <div>
          <h3 className="mb-6" style={{ color: '#1A2A42', fontSize: '18px', fontWeight: 600 }}>
            {t.home.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={kpi.key}
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
                      className="px-2 py-1 rounded text-xs flex items-center gap-1"
                      style={{
                        background: kpi.isPositive ? '#DCFCE7' : '#FEE2E2',
                        color: kpi.isPositive ? '#16A34A' : '#DC2626',
                        fontWeight: 600
                      }}
                    >
                      {kpi.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {kpi.trend}
                    </div>
                  </div>
                  <div style={{ color: '#64748B', fontSize: '14px', marginBottom: '4px' }}>
                    {t.home.kpis[kpi.key as keyof typeof t.home.kpis]}
                  </div>
                  <div style={{ color: '#1A2A42', fontSize: '32px', fontWeight: 700 }}>
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
            {alerts.map((alert, idx) => {
              const Icon = alert.icon;
              const severityColors = {
                error: '#FF4D4F',
                warning: '#F5A623',
                info: '#5596FF'
              };
              const color = severityColors[alert.severity as keyof typeof severityColors];
              
              return (
                <motion.div
                  key={alert.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 rounded-xl flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${color}30`,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${color}15` }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div>
                      <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                        {t.home.alerts[alert.key as keyof typeof t.home.alerts]}
                      </div>
                      <div style={{ color: '#64748B', fontSize: '12px' }}>
                        {alert.count} {isArabic ? 'عنصر' : 'items'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} style={{ color: '#94A3B8' }} />
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
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-xl text-center transition-all flex items-center justify-center gap-3"
                  style={{
                    background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(46, 99, 255, 0.25)'
                  }}
                >
                  <Icon size={18} />
                  {t.home.quickActions[action.key as keyof typeof t.home.quickActions]}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Render Bookings Module (Micro Prompts 4 & 5)
  const renderBookings = () => {
    if (viewMode === 'detail' && selectedItem) {
      // Booking Details Page (Micro Prompt 5)
      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setViewMode('list');
                  setSelectedItem(null);
                }}
                className="p-2 rounded-xl hover:bg-gray-100 transition-all"
              >
                <ArrowLeft size={20} style={{ color: '#64748B' }} />
              </button>
              <div>
                <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
                  {selectedItem.id}
                </h2>
                <p style={{ color: '#64748B', fontSize: '14px' }}>
                  {t.bookings.detail.bookingMeta}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 rounded-xl flex items-center gap-2"
                style={{
                  background: '#F5F9FF',
                  color: '#2E63FF',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                <Edit size={16} />
                {t.common.edit}
              </button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Timeline */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {t.bookings.detail.bookingTimeline}
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Booking Created', time: '2 hours ago', status: 'completed' },
                    { label: 'Therapist Assigned', time: '1.5 hours ago', status: 'completed' },
                    { label: 'Confirmed by Therapist', time: '1 hour ago', status: 'completed' },
                    { label: 'Payment Received', time: '45 min ago', status: 'completed' },
                    { label: 'Session Scheduled', time: 'Upcoming', status: 'pending' }
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="relative">
                        {step.status === 'completed' ? (
                          <CheckCircle2 size={20} style={{ color: '#10B981' }} />
                        ) : (
                          <Circle size={20} style={{ color: '#94A3B8' }} />
                        )}
                        {idx < 4 && (
                          <div
                            className="absolute left-2.5 top-6 w-0.5 h-8"
                            style={{ background: step.status === 'completed' ? '#10B981' : '#E2E8F0' }}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>
                          {step.label}
                        </div>
                        <div style={{ color: '#64748B', fontSize: '12px' }}>
                          {step.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Info */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {t.bookings.detail.paymentInfo}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>
                      Amount
                    </div>
                    <div style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                      SAR 330
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>
                      Method
                    </div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>
                      Credit Card
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>
                      Transaction ID
                    </div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>
                      TXN-2024-1125-001
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>
                      Status
                    </div>
                    <div
                      className="inline-block px-2 py-1 rounded-full text-xs"
                      style={{
                        background: '#DCFCE7',
                        color: '#16A34A',
                        fontWeight: 600
                      }}
                    >
                      Paid
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification History */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {t.bookings.detail.notificationHistory}
                </h3>
                <div className="space-y-3">
                  {[
                    { type: 'SMS', recipient: 'Patient', time: '2 hours ago', status: 'delivered' },
                    { type: 'Email', recipient: 'Therapist', time: '1.5 hours ago', status: 'delivered' },
                    { type: 'WhatsApp', recipient: 'Patient', time: '1 hour ago', status: 'delivered' }
                  ].map((notif, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg" style={{ background: '#F9FAFB' }}>
                      <div className="flex items-center gap-3">
                        <Bell size={16} style={{ color: '#5596FF' }} />
                        <div>
                          <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>
                            {notif.type} to {notif.recipient}
                          </div>
                          <div style={{ color: '#64748B', fontSize: '12px' }}>
                            {notif.time}
                          </div>
                        </div>
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
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {t.bookings.detail.patientInfo}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full overflow-hidden"
                    style={{ border: '2px solid #5596FF' }}
                  >
                    <ImageWithFallback
                      src={selectedItem.patient.avatar}
                      alt={selectedItem.patient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {selectedItem.patient.name}
                    </div>
                    <div style={{ color: '#64748B', fontSize: '12px' }}>
                      {selectedItem.patient.phone}
                    </div>
                  </div>
                </div>
                <button
                  className="w-full py-2 rounded-xl flex items-center justify-center gap-2"
                  style={{
                    background: '#F5F9FF',
                    color: '#2E63FF',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  <MessageSquare size={16} />
                  {t.bookings.detail.contactPatient}
                </button>
              </div>

              {/* Therapist Card */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  {t.bookings.detail.therapistInfo}
                </h3>
                <div className="mb-4">
                  <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
                    {selectedItem.therapist.name}
                  </div>
                  <div style={{ color: '#64748B', fontSize: '12px' }}>
                    {selectedItem.therapist.specialty}
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    className="w-full py-2 rounded-xl flex items-center justify-center gap-2"
                    style={{
                      background: '#F5F9FF',
                      color: '#2E63FF',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    <MessageSquare size={16} />
                    {t.bookings.detail.contactTherapist}
                  </button>
                  <button
                    className="w-full py-2 rounded-xl flex items-center justify-center gap-2"
                    style={{
                      background: '#FEF3C7',
                      color: '#D97706',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    <RefreshCw size={16} />
                    {t.bookings.detail.reassignTherapist}
                  </button>
                </div>
              </div>

              {/* Admin Actions */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <h3 className="mb-4" style={{ color: '#1A2A42', fontSize: '16px', fontWeight: 600 }}>
                  Actions
                </h3>
                <div className="space-y-2">
                  <button
                    className="w-full py-2 rounded-xl flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    <Check size={16} />
                    {t.bookings.detail.changeStatus}
                  </button>
                  <button
                    className="w-full py-2 rounded-xl flex items-center justify-center gap-2"
                    style={{
                      background: '#FEE2E2',
                      color: '#DC2626',
                      fontSize: '14px',
                      fontWeight: 500
                    }}
                  >
                    <X size={16} />
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Bookings List Page (Micro Prompt 4)
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 style={{ color: '#1A2A42', fontSize: '22px', fontWeight: 600 }}>
            {t.bookings.title}
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              {t.bookings.filters}
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
              {t.bookings.export}
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              <Plus size={18} />
              {t.bookings.addBooking}
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
                {['id', 'patient', 'therapist', 'type', 'dateTime', 'status', 'payment', 'actions'].map((col) => (
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
                    className="border-b hover:bg-gray-50 cursor-pointer transition-all"
                    style={{ borderColor: '#E2E8F0', background: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}
                    onClick={() => {
                      setSelectedItem(booking);
                      setViewMode('detail');
                    }}
                  >
                    <td className="px-6 py-4" style={{ color: '#2E63FF', fontSize: '14px', fontWeight: 600 }}>
                      {booking.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={booking.patient.avatar}
                            alt={booking.patient.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 500 }}>
                            {booking.patient.name}
                          </div>
                          <div style={{ color: '#64748B', fontSize: '12px' }}>
                            {booking.patient.phone}
                          </div>
                        </div>
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
                        {booking.type === 'home' ? <MapPin size={14} /> : <MapIcon size={14} />}
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
                        onClick={(e) => {
                          e.stopPropagation();
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
                        {t.common.view}
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4">
          <div style={{ color: '#64748B', fontSize: '14px' }}>
            Showing 1-{mockBookings.length} of {mockBookings.length} bookings
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 rounded-lg"
              style={{ background: '#F5F9FF', color: '#64748B', fontSize: '14px' }}
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-2 rounded-lg"
              style={{ background: '#5596FF', color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}
            >
              1
            </button>
            <button
              className="px-3 py-2 rounded-lg"
              style={{ background: '#F5F9FF', color: '#64748B', fontSize: '14px' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div
      className="min-h-screen flex"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        background: '#F5F9FF',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif'
      }}
    >
      {/* Sidebar (Micro Prompt 1) */}
      <aside
        className="sticky top-0 h-screen flex flex-col"
        style={{
          width: '280px',
          background: '#FFFFFF',
          borderRadius: isArabic ? '12px 0 0 0' : '0 12px 0 0',
          borderRight: isArabic ? 'none' : '1px solid #E2E8F0',
          borderLeft: isArabic ? '1px solid #E2E8F0' : 'none',
          boxShadow: '2px 0 12px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-3">
            <SevenRehabLogo width={40} />
            <div>
              <div style={{ color: '#1A2A42', fontSize: '18px', fontWeight: 700 }}>
                Seventic
              </div>
              <div style={{ color: '#64748B', fontSize: '13px' }}>Admin Portal</div>
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
                onClick={() => {
                  setActiveModule(item.module);
                  setViewMode('list');
                  setSelectedItem(null);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 relative"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #EAF3FF 0%, #D0E7FF 100%)'
                    : 'transparent',
                  color: isActive ? '#2E63FF' : '#64748B'
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
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar (Micro Prompt 2) */}
        <header
          className="sticky top-0 z-30 backdrop-blur-md"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderBottom: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div className="px-8 py-4 flex items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: '#94A3B8' }}
              />
              <input
                type="text"
                placeholder={t.topBar.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 rounded-xl border-0 outline-none transition-all"
                style={{
                  background: '#F5F9FF',
                  color: '#1A2A42',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={onLanguageToggle}
                className="px-4 py-2 rounded-xl transition-all hover:shadow-md"
                style={{
                  background: '#F5F9FF',
                  color: '#2E63FF',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                {isArabic ? 'EN' : 'AR'}
              </button>

              {/* Notifications */}
              <button
                className="relative p-2 rounded-xl transition-all hover:shadow-md"
                style={{ background: '#F5F9FF' }}
              >
                <Bell size={20} style={{ color: '#2E63FF' }} />
                <div
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ background: '#FF4D4F' }}
                />
              </button>

              {/* Admin Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all hover:shadow-md"
                  style={{ background: '#F5F9FF' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                    }}
                  >
                    <User size={20} style={{ color: '#FFFFFF' }} />
                  </div>
                  <div className="text-left hidden md:block">
                    <div style={{ color: '#1A2A42', fontSize: '14px', fontWeight: 600 }}>
                      {t.topBar.admin}
                    </div>
                  </div>
                  <ChevronDown size={16} style={{ color: '#64748B' }} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showAdminMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden"
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        zIndex: 50
                      }}
                    >
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all"
                        style={{ color: '#1A2A42', fontSize: '14px' }}
                      >
                        <User size={16} />
                        {t.topBar.profile}
                      </button>
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all"
                        style={{ color: '#1A2A42', fontSize: '14px' }}
                      >
                        <Lock size={16} />
                        {t.topBar.changePassword}
                      </button>
                      <div
                        className="border-t"
                        style={{ borderColor: '#E2E8F0' }}
                      />
                      <button
                        onClick={onBackToHome}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all"
                        style={{ color: '#DC2626', fontSize: '14px' }}
                      >
                        <LogOut size={16} />
                        {t.topBar.logout}
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
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeModule === 'home' && renderHome()}
              {activeModule === 'bookings' && renderBookings()}
              {activeModule !== 'home' && activeModule !== 'bookings' && (
                <div
                  className="p-12 rounded-2xl text-center"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <Activity size={48} style={{ color: '#5596FF', margin: '0 auto 16px' }} />
                  <p style={{ color: '#64748B', fontSize: '16px' }}>
                    {t.modules[activeModule]} module coming soon...
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
