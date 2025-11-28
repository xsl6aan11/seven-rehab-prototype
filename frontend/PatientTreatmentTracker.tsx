import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Clock, 
  History, 
  CheckCircle,
  MapPin,
  MessageCircle,
  Navigation,
  BarChart3,
  Play
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PatientTreatmentTrackerProps {
  language?: 'EN' | 'AR';
  onBack?: () => void;
  onOpenMap?: () => void;
  onOpenChat?: () => void;
  onStartSession?: (sessionType: 'consultation-treatment' | 'treatment-only') => void;
}

interface SOAPNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  date?: string;
  hasFiles?: boolean;
}

export default function PatientTreatmentTracker({ 
  language = 'EN', 
  onBack,
  onOpenMap,
  onOpenChat,
  onStartSession
}: PatientTreatmentTrackerProps) {
  const isArabic = language === 'AR';
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showDetailedGraph, setShowDetailedGraph] = useState(false);
  const [chatOnlineStatus, setChatOnlineStatus] = useState<'online' | 'away' | 'offline'>('online');

  // Mock patient data - Sara K. first session (0 completed)
  const patientData = {
    name: isArabic ? 'سارة ك.' : 'Sara K.',
    condition: isArabic ? 'إصابة عصبية' : 'Neurological condition',
    totalSessions: 12,
    completedSessions: 0,
    nextSession: isArabic ? 'اليوم، ٠٩:٠٠ ص' : 'Today, 9:00 AM',
    address: isArabic ? 'عيادة النور' : 'Al Noor Clinic',
    isFirstSession: true // First session - will show SOAP form
  };

  const progressPercentage = Math.round(
    (patientData.completedSessions / patientData.totalSessions) * 100
  );

  // Only show SOAP if there are completed sessions
  const latestSOAP: SOAPNote | null = patientData.completedSessions > 0 ? {
    subjective: isArabic ? 'تصلب أسفل الظهر' : 'Lower back stiffness',
    objective: isArabic 
      ? 'انخفاض نطاق الحركة (الانثناء)' 
      : 'Reduced ROM (flexion)',
    assessment: isArabic ? 'ألم ميكانيكي خفيف أسفل الظهر' : 'Mild mechanical LBP',
    plan: isArabic 
      ? 'تقوية الجذع + العلاج اليدوي' 
      : 'Core stability + manual therapy',
    date: isArabic ? '٢٨ أكتوبر ٢٠٢٥' : 'Oct 28, 2025',
    hasFiles: true
  } : null;

  const content = {
    EN: {
      title: 'Patient Treatment Tracker',
      subtitle: 'SOAP Notes & Treatment Plan Progress',
      patientOverview: 'Patient Overview',
      patient: 'Patient',
      plan: 'Plan',
      sessions: 'sessions',
      completed: 'completed',
      progress: 'Progress',
      nextSession: 'Next Session',
      condition: 'Condition',
      latestSOAP: 'Latest SOAP Summary',
      subjective: 'S',
      objective: 'O',
      assessment: 'A',
      planLabel: 'P',
      viewFiles: '🩻 View Uploaded Files',
      noSOAP: 'No session notes available yet.',
      viewHistory: 'View History',
      startSession: 'Start Session',
      footerNote: 'Track patient progress, communicate easily, and adjust treatment plans in real time.',
      sessionsCompleted: 'sessions completed',
      of: 'of',
      sessionHistory: 'Session History',
      close: 'Close',
      sessionDate: 'Session',
      noHistory: 'No previous sessions recorded.',
      sessionLabel: 'Session',
      duration: 'Duration',
      completedSessionsHistory: 'Completed Sessions',
      location: 'Location',
      chatWithPatient: 'Chat with Patient',
      openMap: 'Open Map',
      progressTracker: 'Progress Tracker',
      showDetailedGraph: 'Show Detailed Graph',
      hideDetailedGraph: 'Hide Detailed Graph',
      chatPlaceholder: 'Type a message...',
      send: 'Send',
      online: 'Online',
      away: 'Away',
      offline: 'Offline',
      mapOpened: 'Opening patient location...',
      chatOpened: 'Opening chat...'
    },
    AR: {
      title: 'متابعة علاج المريض',
      subtitle: 'ملاحظات SOAP وتقدم خطة العلاج',
      patientOverview: 'نظرة عامة على المريض',
      patient: 'المريض',
      plan: 'الخطة',
      sessions: 'جلسة',
      completed: 'مكتمل',
      progress: 'التقدم',
      nextSession: 'الجلسة القادمة',
      condition: 'الحالة',
      latestSOAP: 'آخر ملخص SOAP',
      subjective: 'الذاتي',
      objective: 'الموضوعي',
      assessment: 'التقييم',
      planLabel: 'الخطة',
      viewFiles: '🩻 عرض الملفات المرفوعة',
      noSOAP: 'لا توجد ملاحظات جلسة متاحة بعد.',
      viewHistory: 'عرض السجل',
      startSession: 'بدء الجلسة',
      footerNote: 'تتبع تقدم المريض، وتواصل بسهولة، وقم بتعديل خطط العلاج في الوقت الفعلي.',
      sessionsCompleted: 'جلسات مكتملة',
      of: 'من',
      sessionHistory: 'سجل الجلسات',
      close: 'إغلاق',
      sessionDate: 'الجلسة',
      noHistory: 'لم يتم تسجيل جلسات سابقة.',
      sessionLabel: 'الجلسة',
      duration: 'المدة',
      completedSessionsHistory: 'الجلسات المكتملة',
      location: 'الموقع',
      chatWithPatient: 'محادثة المريض',
      openMap: 'فتح الخريطة',
      progressTracker: 'متتبع التقدم',
      showDetailedGraph: 'عرض الرسم البياني التفصيلي',
      hideDetailedGraph: 'إخفاء الرسم البياني',
      chatPlaceholder: 'اكتب رسالة...',
      send: 'إرسال',
      online: 'متصل',
      away: 'بعيد',
      offline: 'غير متصل',
      mapOpened: 'فتح موقع المريض...',
      chatOpened: 'فتح المحادثة...'
    }
  };

  const text = content[language];

  // Mock session history - simplified to show only completed sessions
  const sessionHistory = [
    {
      id: 1,
      date: isArabic ? '٢٨ أكتوبر ٢٠٢٥' : 'Oct 28, 2025',
      time: isArabic ? '٢:٠٠ م' : '2:00 PM',
      duration: isArabic ? '٤٥ دقيقة' : '45 min',
      sessionNumber: 4
    },
    {
      id: 2,
      date: isArabic ? '٢١ أكتوبر ٢٠٢٥' : 'Oct 21, 2025',
      time: isArabic ? '٠٠:٣٠ ص' : '10:30 AM',
      duration: isArabic ? '٦٠ دقيقة' : '60 min',
      sessionNumber: 3
    },
    {
      id: 3,
      date: isArabic ? '١٤ أكتوبر ٢٠٢٥' : 'Oct 14, 2025',
      time: isArabic ? '٣:١٥ م' : '3:15 PM',
      duration: isArabic ? '٤٥ دقيقة' : '45 min',
      sessionNumber: 2
    },
    {
      id: 4,
      date: isArabic ? '٧ أكتوبر ٢٠٢٥' : 'Oct 7, 2025',
      time: isArabic ? '١١:٠٠ ص' : '11:00 AM',
      duration: isArabic ? '٦٠ دقيقة' : '60 min',
      sessionNumber: 1
    }
  ];

  const handleOpenMap = () => {
    toast.success(text.mapOpened, {
      duration: 2000,
      style: {
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
      }
    });
    if (onOpenMap) {
      onOpenMap();
    }
  };

  const handleOpenChat = () => {
    window.open('https://wa.me/966533867100', '_blank');
  };

  // Status indicator colors
  const statusColors = {
    online: '#10B981',
    away: '#F59E0B',
    offline: '#EF4444'
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #F9FBFF 0%, #EAF3FF 100%)',
        direction: isArabic ? 'rtl' : 'ltr',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif'
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-6 py-4"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #E8F1FF'
        }}
      >
        <div className="flex items-center justify-between">
          {/* Left: Back Button */}
          <button
            onClick={onBack}
            className="p-2 rounded-full transition-all duration-200 hover:bg-blue-50"
            style={{ color: '#2E63FF' }}
          >
            <ArrowLeft 
              size={24} 
              style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }} 
            />
          </button>

          {/* Center: Title */}
          <div className="flex-1 text-center px-4">
            <h1
              className="text-[18px]"
              style={{
                fontWeight: 700,
                color: '#2E63FF'
              }}
            >
              {text.title}
            </h1>
            <p
              className="text-[11px] mt-0.5"
              style={{
                color: '#64748B',
                fontWeight: 500
              }}
            >
              {text.subtitle}
            </p>
          </div>

          {/* Right: Action Icons */}
          <div className="flex items-center gap-2">
            {/* Location Button */}
            <button
              onClick={handleOpenMap}
              className="p-2 rounded-full transition-all duration-200 hover:bg-blue-50"
              style={{ color: '#2E63FF' }}
            >
              <MapPin size={22} />
            </button>

            {/* Chat Button */}
            <button
              onClick={handleOpenChat}
              className="p-2 rounded-full transition-all duration-200 hover:bg-blue-50 relative"
              style={{ color: '#2E63FF' }}
            >
              <MessageCircle size={22} />
              {/* Online Status Indicator */}
              <div
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{
                  background: statusColors[chatOnlineStatus],
                  border: '2px solid white'
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-5">
        {/* Patient Summary Card */}
        <motion.div
          className="rounded-2xl p-5"
          style={{
            background: '#FFFFFF',
            border: '1px solid #DDE9FF',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Patient Name & Condition */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[12px]"
                style={{
                  color: '#808B9A',
                  fontWeight: 600
                }}
              >
                {text.patient}:
              </span>
              <h2
                className="text-[17px]"
                style={{
                  fontWeight: 700,
                  color: '#1F2937'
                }}
              >
                {patientData.name}
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <span
                className="text-[12px]"
                style={{
                  color: '#808B9A',
                  fontWeight: 600
                }}
              >
                {text.condition}:
              </span>
              <span
                className="text-[13px]"
                style={{
                  color: '#64748B',
                  fontWeight: 500
                }}
              >
                {patientData.condition}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            className="my-4"
            style={{
              height: '1px',
              background: '#F0F4FF'
            }}
          />

          {/* Plan Info */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[12px]"
                style={{
                  color: '#808B9A',
                  fontWeight: 600
                }}
              >
                {text.plan}:
              </span>
              <span
                className="text-[14px]"
                style={{
                  color: '#1F2937',
                  fontWeight: 600
                }}
              >
                {patientData.totalSessions} {text.sessions} • {patientData.completedSessions} {text.completed}
              </span>
            </div>

            {/* Progress Bar */}
            <div
              className="w-full rounded-full overflow-hidden"
              style={{
                height: '8px',
                background: '#E8F1FF'
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #5596FF 0%, #2E63FF 100%)',
                  width: `${progressPercentage}%`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>

            {/* Progress Percentage */}
            <p
              className="text-[11px] mt-1 text-center"
              style={{
                color: '#2E63FF',
                fontWeight: 600
              }}
            >
              {progressPercentage}% {text.progress}
            </p>
          </div>

          {/* Next Session */}
          <div className="flex items-center justify-between">
            <span
              className="text-[12px]"
              style={{
                color: '#808B9A',
                fontWeight: 600
              }}
            >
              {text.nextSession}:
            </span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} color="#2E63FF" />
              <span
                className="text-[14px]"
                style={{
                  color: '#2E63FF',
                  fontWeight: 600
                }}
              >
                {patientData.nextSession}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Progress Tracker */}
        <motion.div
          className="rounded-2xl p-5"
          style={{
            background: '#FFFFFF',
            border: '1px solid #DDE9FF',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-[15px]"
              style={{
                fontWeight: 600,
                color: '#1F2937'
              }}
            >
              {text.progressTracker}
            </h3>
            <button
              onClick={() => setShowDetailedGraph(!showDetailedGraph)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{
                background: showDetailedGraph ? '#EAF3FF' : '#F8FAFC',
                border: '1px solid ' + (showDetailedGraph ? '#CDE1FF' : '#E2E8F0')
              }}
            >
              <BarChart3 size={14} color={showDetailedGraph ? '#2E63FF' : '#64748B'} />
              <span
                className="text-[11px]"
                style={{
                  color: showDetailedGraph ? '#2E63FF' : '#64748B',
                  fontWeight: 600
                }}
              >
                {showDetailedGraph ? text.hideDetailedGraph : text.showDetailedGraph}
              </span>
            </button>
          </div>

          {/* Session Circles */}
          <div className="flex items-center justify-between mb-3">
            {Array.from({ length: patientData.totalSessions }).map((_, index) => {
              const isCompleted = index < patientData.completedSessions;
              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <div
                    className="rounded-full flex items-center justify-center mb-1"
                    style={{
                      width: '28px',
                      height: '28px',
                      background: isCompleted
                        ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                        : '#E8F1FF',
                      border: isCompleted ? 'none' : '2px solid #CDE1FF',
                      boxShadow: isCompleted ? '0 2px 6px rgba(46, 99, 255, 0.3)' : 'none'
                    }}
                  >
                    {isCompleted && (
                      <CheckCircle size={16} color="#FFFFFF" />
                    )}
                  </div>
                  <span
                    className="text-[9px]"
                    style={{
                      color: isCompleted ? '#2E63FF' : '#94A3B8',
                      fontWeight: 600
                    }}
                  >
                    {index + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Tooltip */}
          <p
            className="text-[12px] text-center"
            style={{
              color: '#64748B',
              fontWeight: 500
            }}
          >
            {patientData.completedSessions} {text.of} {patientData.totalSessions} {text.sessionsCompleted}
          </p>

          {/* Detailed Graph (Expandable) */}
          <AnimatePresence>
            {showDetailedGraph && (
              <motion.div
                className="mt-4 pt-4"
                style={{
                  borderTop: '1px solid #F0F4FF'
                }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Simple mock graph visualization */}
                <div className="space-y-3">
                  {/* Pain Level (VAS) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[11px]"
                        style={{
                          color: '#64748B',
                          fontWeight: 600
                        }}
                      >
                        {isArabic ? 'مستوى الألم (VAS)' : 'Pain Level (VAS)'}
                      </span>
                      <span
                        className="text-[11px]"
                        style={{
                          color: '#10B981',
                          fontWeight: 600
                        }}
                      >
                        7 → 3 ↓
                      </span>
                    </div>
                    <div
                      className="w-full rounded-full overflow-hidden"
                      style={{
                        height: '6px',
                        background: '#FEE2E2'
                      }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #EF4444 0%, #10B981 100%)',
                          width: '60%'
                        }}
                      />
                    </div>
                  </div>

                  {/* ROM Improvement */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[11px]"
                        style={{
                          color: '#64748B',
                          fontWeight: 600
                        }}
                      >
                        {isArabic ? 'تحسين نطاق الحركة' : 'ROM Improvement'}
                      </span>
                      <span
                        className="text-[11px]"
                        style={{
                          color: '#10B981',
                          fontWeight: 600
                        }}
                      >
                        45° → 75° ↑
                      </span>
                    </div>
                    <div
                      className="w-full rounded-full overflow-hidden"
                      style={{
                        height: '6px',
                        background: '#E0F2FE'
                      }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
                          width: '75%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Latest SOAP Summary */}
        <motion.div
          className="rounded-2xl p-5"
          style={{
            background: '#FFFFFF',
            border: '1px solid #DDE9FF',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-[15px]"
              style={{
                fontWeight: 600,
                color: '#1F2937'
              }}
            >
              {text.latestSOAP}
            </h3>
            <span
              className="text-[11px] px-2 py-1 rounded-full"
              style={{
                background: '#E8F1FF',
                color: '#2E63FF',
                fontWeight: 600
              }}
            >
              {latestSOAP?.date}
            </span>
          </div>

          {/* SOAP Sections */}
          <div className="space-y-3">
            {/* Subjective */}
            <div
              className="p-3 rounded-lg"
              style={{
                background: '#F0F9FF',
                border: '1px solid #BAE6FD'
              }}
            >
              <div className="flex items-start gap-2">
                <span
                  className="text-[13px] flex-shrink-0"
                  style={{
                    color: '#0369A1',
                    fontWeight: 700
                  }}
                >
                  {text.subjective}:
                </span>
                <p
                  className="text-[13px]"
                  style={{
                    color: '#075985',
                    fontWeight: 500
                  }}
                >
                  {latestSOAP?.subjective}
                </p>
              </div>
            </div>

            {/* Objective */}
            <div
              className="p-3 rounded-lg"
              style={{
                background: '#F0FDF4',
                border: '1px solid #BBF7D0'
              }}
            >
              <div className="flex items-start gap-2">
                <span
                  className="text-[13px] flex-shrink-0"
                  style={{
                    color: '#15803D',
                    fontWeight: 700
                  }}
                >
                  {text.objective}:
                </span>
                <p
                  className="text-[13px] whitespace-pre-line"
                  style={{
                    color: '#166534',
                    fontWeight: 500
                  }}
                >
                  {latestSOAP?.objective}
                </p>
              </div>
            </div>

            {/* Assessment */}
            <div
              className="p-3 rounded-lg"
              style={{
                background: '#FEF3C7',
                border: '1px solid #FDE68A'
              }}
            >
              <div className="flex items-start gap-2">
                <span
                  className="text-[13px] flex-shrink-0"
                  style={{
                    color: '#92400E',
                    fontWeight: 700
                  }}
                >
                  {text.assessment}:
                </span>
                <p
                  className="text-[13px]"
                  style={{
                    color: '#78350F',
                    fontWeight: 500
                  }}
                >
                  {latestSOAP?.assessment}
                </p>
              </div>
            </div>

            {/* Plan */}
            <div
              className="p-3 rounded-lg"
              style={{
                background: '#F5F3FF',
                border: '1px solid #DDD6FE'
              }}
            >
              <div className="flex items-start gap-2">
                <span
                  className="text-[13px] flex-shrink-0"
                  style={{
                    color: '#6B21A8',
                    fontWeight: 700
                  }}
                >
                  {text.planLabel}:
                </span>
                <p
                  className="text-[13px] whitespace-pre-line"
                  style={{
                    color: '#581C87',
                    fontWeight: 500
                  }}
                >
                  {latestSOAP?.plan}
                </p>
              </div>
            </div>
          </div>

          {/* View History Button */}
          <div className="mt-4">
            <button
              onClick={() => setShowHistoryModal(true)}
              className="w-full py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105"
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#475569',
                fontWeight: 600,
                fontSize: '13px'
              }}
            >
              <History size={16} />
              {text.viewHistory}
            </button>
          </div>
        </motion.div>

        {/* Start Session Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <button
            onClick={() => {
              if (onStartSession) {
                // Determine session type based on whether patient has completed sessions
                const sessionType = patientData.completedSessions === 0 || patientData.isFirstSession
                  ? 'consultation-treatment'
                  : 'treatment-only';
                onStartSession(sessionType);
              } else {
                toast.success(isArabic ? 'بدء الجلسة...' : 'Starting session...', {
                  duration: 2000,
                  style: {
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
                  }
                });
              }
            }}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '16px',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)'
            }}
          >
            <Play size={22} fill="#FFFFFF" />
            {text.startSession}
          </button>
        </motion.div>

        {/* Quick Action Row */}
        <motion.div
          className="grid grid-cols-1 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {/* Location Button */}
          <button
            onClick={handleOpenMap}
            className="rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: '#FFFFFF',
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
              }}
            >
              <Navigation size={22} color="#FFFFFF" />
            </div>
            <span
              className="text-[14px] text-center"
              style={{
                fontWeight: 600,
                color: '#1F2937'
              }}
            >
              {text.location}
            </span>
          </button>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="pt-4 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <p
            className="text-[13px] text-center"
            style={{
              color: '#8E9BB2',
              fontWeight: 500,
              lineHeight: '1.6'
            }}
          >
            {text.footerNote}
          </p>
        </motion.div>
      </div>

      {/* Session History Modal */}
      <AnimatePresence>
        {showHistoryModal && (
          <div
            className="fixed inset-0 z-50 flex items-end"
            style={{
              background: 'rgba(0, 0, 0, 0.4)'
            }}
            onClick={() => setShowHistoryModal(false)}
          >
            <motion.div
              className="w-full rounded-t-3xl overflow-hidden"
              style={{
                background: '#FFFFFF',
                maxHeight: '85vh'
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div
                  style={{
                    width: '40px',
                    height: '4px',
                    background: '#D1D5DB'
                  }}
                />
              </div>

              {/* Modal Header */}
              <div
                className="px-6 py-4"
                style={{
                  borderBottom: '1px solid #F0F4FF'
                }}
              >
                <h3
                  className="text-[18px] text-center"
                  style={{
                    fontWeight: 700,
                    color: '#1F2937'
                  }}
                >
                  {text.sessionHistory}
                </h3>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 160px)' }}>
                <div className="space-y-3">
                  {sessionHistory.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="rounded-xl p-4"
                      style={{
                        background: index === 0 
                          ? 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)'
                          : '#F8FAFC',
                        border: index === 0 
                          ? '1px solid #BFDBFE'
                          : '1px solid #E2E8F0'
                      }}
                    >
                      {/* Session Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="flex items-center justify-center rounded-lg"
                            style={{
                              width: '32px',
                              height: '32px',
                              background: index === 0 
                                ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                                : 'linear-gradient(135deg, #E0EFFF 0%, #CDE1FF 100%)'
                            }}
                          >
                            <span
                              className="text-[14px]"
                              style={{
                                color: index === 0 ? '#FFFFFF' : '#2E63FF',
                                fontWeight: 700
                              }}
                            >
                              #{session.sessionNumber}
                            </span>
                          </div>
                          <div>
                            <p
                              className="text-[13px]"
                              style={{
                                color: index === 0 ? '#2E63FF' : '#1F2937',
                                fontWeight: 600
                              }}
                            >
                              {text.sessionLabel} {session.sessionNumber}
                            </p>
                            <p
                              className="text-[11px]"
                              style={{
                                color: '#64748B',
                                fontWeight: 500
                              }}
                            >
                              {session.date}
                            </p>
                          </div>
                        </div>
                        
                        {index === 0 && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px]"
                            style={{
                              background: '#2E63FF',
                              color: '#FFFFFF',
                              fontWeight: 600
                            }}
                          >
                            {isArabic ? 'الأحدث' : 'Latest'}
                          </span>
                        )}
                      </div>

                      {/* Session Details */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} color="#64748B" />
                          <span
                            className="text-[12px]"
                            style={{
                              color: '#64748B',
                              fontWeight: 500
                            }}
                          >
                            {session.time}
                          </span>
                        </div>
                        <div
                          className="h-3 w-px"
                          style={{
                            background: '#E2E8F0'
                          }}
                        />
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-[12px]"
                            style={{
                              color: '#64748B',
                              fontWeight: 500
                            }}
                          >
                            {text.duration}: {session.duration}
                          </span>
                        </div>
                      </div>

                      {/* Completion Badge */}
                      <div
                        className="mt-3 pt-3 flex items-center gap-2"
                        style={{
                          borderTop: '1px solid ' + (index === 0 ? '#BFDBFE' : '#E2E8F0')
                        }}
                      >
                        <CheckCircle size={14} color="#10B981" />
                        <span
                          className="text-[12px]"
                          style={{
                            color: '#10B981',
                            fontWeight: 600
                          }}
                        >
                          {isArabic ? 'اكتملت' : 'Completed'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div
                className="px-6 py-4"
                style={{
                  borderTop: '1px solid #F0F4FF'
                }}
              >
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="w-full py-3 rounded-xl transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '15px',
                    boxShadow: '0 2px 8px rgba(46, 99, 255, 0.3)'
                  }}
                >
                  {text.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && (
          <div
            className="fixed inset-0 z-50 flex items-end"
            style={{
              background: 'rgba(0, 0, 0, 0.4)'
            }}
            onClick={() => setShowChatModal(false)}
          >
            <motion.div
              className="w-full rounded-t-3xl overflow-hidden flex flex-col"
              style={{
                background: '#FFFFFF',
                height: '80vh'
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div
                  style={{
                    width: '40px',
                    height: '4px',
                    background: '#D1D5DB'
                  }}
                />
              </div>

              {/* Chat Header */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{
                  borderBottom: '1px solid #F0F4FF'
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center relative"
                    style={{
                      background: 'linear-gradient(135deg, #E0EFFF 0%, #CDE1FF 100%)'
                    }}
                  >
                    <span className="text-[18px]">👤</span>
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                      style={{
                        background: statusColors[chatOnlineStatus],
                        border: '2px solid white'
                      }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-[16px]"
                      style={{
                        fontWeight: 700,
                        color: '#1F2937'
                      }}
                    >
                      {patientData.name}
                    </h3>
                    <p
                      className="text-[11px]"
                      style={{
                        color: statusColors[chatOnlineStatus],
                        fontWeight: 600
                      }}
                    >
                      {text[chatOnlineStatus]}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowChatModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <span className="text-[20px]" style={{ color: '#64748B' }}>×</span>
                </button>
              </div>

              {/* Chat Messages Area */}
              <div
                className="flex-1 px-6 py-4 overflow-y-auto"
                style={{
                  background: '#F9FAFB'
                }}
              >
                <div className="flex flex-col gap-3">
                  {/* Sample messages */}
                  <div className="flex justify-start">
                    <div
                      className="px-4 py-2 rounded-2xl max-w-[75%]"
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      <p
                        className="text-[14px]"
                        style={{
                          color: '#1F2937',
                          fontWeight: 500
                        }}
                      >
                        {isArabic ? 'مرحبا دكتور، متى موعد جلستنا القادمة؟' : 'Hi doctor, when is our next session?'}
                      </p>
                      <span
                        className="text-[10px] mt-1 block"
                        style={{
                          color: '#94A3B8'
                        }}
                      >
                        10:30 AM
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div
                      className="px-4 py-2 rounded-2xl max-w-[75%]"
                      style={{
                        background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                      }}
                    >
                      <p
                        className="text-[14px]"
                        style={{
                          color: '#FFFFFF',
                          fontWeight: 500
                        }}
                      >
                        {isArabic ? 'مساء الثلاثاء الساعة ٤ مساءً' : 'Tuesday at 4:00 PM'}
                      </p>
                      <span
                        className="text-[10px] mt-1 block text-right"
                        style={{
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        10:31 AM
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div
                className="px-6 py-4"
                style={{
                  borderTop: '1px solid #F0F4FF',
                  background: '#FFFFFF'
                }}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={text.chatPlaceholder}
                    className="flex-1 px-4 py-3 rounded-xl outline-none"
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      color: '#1F2937',
                      fontSize: '14px',
                      fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
                    }}
                  />
                  <button
                    className="px-5 py-3 rounded-xl transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '14px',
                      boxShadow: '0 2px 8px rgba(46, 99, 255, 0.3)'
                    }}
                  >
                    {text.send}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}