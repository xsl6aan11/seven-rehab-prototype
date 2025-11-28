import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  User,
  CheckCircle,
  AlertCircle,
  XCircle,
  Brain,
  Bone,
  Heart,
  Plus
} from 'lucide-react';

interface UpcomingSessionsProps {
  language: 'EN' | 'AR';
  onBack: () => void;
  onSetAvailability?: () => void;
  onViewPatientTreatment?: () => void;
}

interface Content {
  title: string;
  subtitle: string;
  filterAll: string;
  filterToday: string;
  filterWeek: string;
  filterCompleted: string;
  today: string;
  tomorrow: string;
  thisWeek: string;
  viewDetails: string;
  markComplete: string;
  confirmed: string;
  pending: string;
  missed: string;
  completed: string;
  consultation: string;
  treatment: string;
  consultationTreatment: string;
  away: string;
  footerText: string;
  sessionsCompleted: string;
  noSessions: string;
  neuro: string;
  ortho: string;
  sports: string;
  cardio: string;
}

const content: Record<'EN' | 'AR', Content> = {
  EN: {
    title: 'Upcoming Sessions',
    subtitle: 'View and manage all your scheduled sessions',
    filterAll: 'All',
    filterToday: 'Today',
    filterWeek: 'This Week',
    filterCompleted: 'Completed',
    today: 'Today',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    viewDetails: 'View Details',
    markComplete: 'Mark Complete',
    confirmed: 'Confirmed',
    pending: 'Pending',
    missed: 'Missed',
    completed: 'Completed',
    consultation: 'Consultation',
    treatment: 'Treatment',
    consultationTreatment: 'Consultation + Treatment',
    away: 'away',
    footerText: 'Tap a session to view treatment progress or edit plan',
    sessionsCompleted: 'sessions completed',
    noSessions: 'No sessions found',
    neuro: 'Neuro',
    ortho: 'Ortho',
    sports: 'Sports',
    cardio: 'Cardio'
  },
  AR: {
    title: 'الجلسات القادمة',
    subtitle: 'عرض وإدارة جميع الجلسات المجدولة',
    filterAll: 'الكل',
    filterToday: 'اليوم',
    filterWeek: 'هذا الأسبوع',
    filterCompleted: 'المكتملة',
    today: 'اليوم',
    tomorrow: 'غداً',
    thisWeek: 'هذا الأسبوع',
    viewDetails: 'عرض التفاصيل',
    markComplete: 'تأكيد الاكتمال',
    confirmed: 'مؤكد',
    pending: 'قيد الانتظار',
    missed: 'فائت',
    completed: 'مكتمل',
    consultation: 'استشارة',
    treatment: 'علاج',
    consultationTreatment: 'استشارة + علاج',
    away: 'بعيد',
    footerText: 'انقر على جلسة لعرض تقدم العلاج أو تعديل الخطة',
    sessionsCompleted: 'جلسات مكتملة',
    noSessions: 'لا توجد جلسات',
    neuro: 'عصبي',
    ortho: 'عظام',
    sports: 'رياضي',
    cardio: 'قلبي'
  }
};

type FilterType = 'all' | 'today' | 'week' | 'completed';
type SessionStatus = 'confirmed' | 'pending' | 'missed' | 'completed';
type SpecialtyType = 'neuro' | 'ortho' | 'sports' | 'cardio';

interface Session {
  id: string;
  patientName: string;
  sessionType: 'consultation' | 'treatment' | 'consultation-treatment';
  time: string;
  date: string;
  dateGroup: 'today' | 'tomorrow' | 'week';
  status: SessionStatus;
  location: string;
  distance: number;
  specialty: SpecialtyType;
  progress?: {
    current: number;
    total: number;
  };
}

// Mock session data
const mockSessions: Session[] = [
  {
    id: '1',
    patientName: 'Sara K.',
    sessionType: 'consultation-treatment',
    time: '10:00 AM',
    date: 'Nov 2, 2025',
    dateGroup: 'today',
    status: 'confirmed',
    location: 'Al Noor Clinic',
    distance: 1.5,
    specialty: 'neuro',
    progress: { current: 0, total: 12 }
  },
  {
    id: '2',
    patientName: 'Mohammed R.',
    sessionType: 'treatment',
    time: '1:30 PM',
    date: 'Nov 2, 2025',
    dateGroup: 'today',
    status: 'confirmed',
    location: 'Home Visit',
    distance: 2.3,
    specialty: 'ortho',
    progress: { current: 5, total: 10 }
  },
  {
    id: '3',
    patientName: 'Faisal H.',
    sessionType: 'consultation',
    time: '11:00 AM',
    date: 'Nov 3, 2025',
    dateGroup: 'tomorrow',
    status: 'pending',
    location: 'City Physio Center',
    distance: 3.2,
    specialty: 'sports',
    progress: { current: 1, total: 8 }
  },
  {
    id: '4',
    patientName: 'Layla A.',
    sessionType: 'treatment',
    time: '3:00 PM',
    date: 'Nov 3, 2025',
    dateGroup: 'tomorrow',
    status: 'confirmed',
    location: 'Al Majd Hospital',
    distance: 0.8,
    specialty: 'cardio',
    progress: { current: 7, total: 12 }
  },
  {
    id: '5',
    patientName: 'Khalid M.',
    sessionType: 'consultation-treatment',
    time: '9:00 AM',
    date: 'Nov 4, 2025',
    dateGroup: 'week',
    status: 'confirmed',
    location: 'Wellness Clinic',
    distance: 4.1,
    specialty: 'neuro',
    progress: { current: 2, total: 15 }
  },
  {
    id: '6',
    patientName: 'Noura S.',
    sessionType: 'treatment',
    time: '2:00 PM',
    date: 'Oct 30, 2025',
    dateGroup: 'today',
    status: 'completed',
    location: 'Home Visit',
    distance: 1.2,
    specialty: 'ortho',
    progress: { current: 8, total: 10 }
  },
  {
    id: '7',
    patientName: 'Omar T.',
    sessionType: 'consultation',
    time: '4:30 PM',
    date: 'Oct 29, 2025',
    dateGroup: 'today',
    status: 'completed',
    location: 'Health Plus',
    distance: 2.8,
    specialty: 'sports',
    progress: { current: 4, total: 8 }
  }
];

export default function UpcomingSessions({ language, onBack, onSetAvailability, onViewPatientTreatment }: UpcomingSessionsProps) {
  const isArabic = language === 'AR';
  const sessionContent = content[language];
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const specialtyIcons = {
    neuro: <Brain size={16} />,
    ortho: <Bone size={16} />,
    sports: <Heart size={16} />,
    cardio: <Heart size={16} />
  };

  const statusConfig = {
    confirmed: {
      icon: <CheckCircle size={16} />,
      color: '#10B981',
      bg: '#D1FAE5',
      label: sessionContent.confirmed
    },
    pending: {
      icon: <Clock size={16} />,
      color: '#F59E0B',
      bg: '#FEF3C7',
      label: sessionContent.pending
    },
    missed: {
      icon: <XCircle size={16} />,
      color: '#EF4444',
      bg: '#FEE2E2',
      label: sessionContent.missed
    },
    completed: {
      icon: <CheckCircle size={16} />,
      color: '#8B5CF6',
      bg: '#EDE9FE',
      label: sessionContent.completed
    }
  };

  // Filter sessions
  const filteredSessions = mockSessions.filter(session => {
    if (activeFilter === 'all') return session.status !== 'completed';
    if (activeFilter === 'today') return session.dateGroup === 'today' && session.status !== 'completed';
    if (activeFilter === 'week') return session.status !== 'completed';
    if (activeFilter === 'completed') return session.status === 'completed';
    return true;
  });

  // Group sessions by date
  const groupedSessions = filteredSessions.reduce((groups, session) => {
    const group = session.dateGroup;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(session);
    return groups;
  }, {} as Record<string, Session[]>);

  const getSessionTypeLabel = (type: Session['sessionType']) => {
    switch (type) {
      case 'consultation':
        return sessionContent.consultation;
      case 'treatment':
        return sessionContent.treatment;
      case 'consultation-treatment':
        return sessionContent.consultationTreatment;
    }
  };

  const getDateGroupLabel = (group: string) => {
    switch (group) {
      case 'today':
        return sessionContent.today;
      case 'tomorrow':
        return sessionContent.tomorrow;
      case 'week':
        return sessionContent.thisWeek;
      default:
        return group;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #EAF3FF 0%, #CDE1FF 100%)',
        direction: isArabic ? 'rtl' : 'ltr',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
          padding: '48px 24px 32px 24px',
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          boxShadow: '0 8px 16px rgba(46, 99, 255, 0.2)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl transition-all active:scale-95"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <ChevronLeft 
              size={24} 
              color="#FFFFFF" 
              style={{
                transform: isArabic ? 'rotate(180deg)' : 'none'
              }}
            />
          </button>

          <button
            onClick={onSetAvailability}
            className="flex items-center gap-2 px-3 py-2 -mr-2 rounded-xl transition-all active:scale-95"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Calendar size={20} color="#FFFFFF" />
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              {isArabic ? 'الجدول' : 'Schedule'}
            </span>
          </button>
        </div>

        <motion.h1
          className="text-[28px] mb-2"
          style={{
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.5px'
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {sessionContent.title}
        </motion.h1>

        <motion.p
          className="text-[14px]"
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontWeight: 500
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {sessionContent.subtitle}
        </motion.p>
      </div>

      {/* Filter Bar */}
      <div
        className="px-6 py-4 overflow-x-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className="flex gap-2 min-w-max">
          {(['all', 'today', 'week', 'completed'] as FilterType[]).map((filter, index) => {
            const isActive = activeFilter === filter;
            const labels = {
              all: sessionContent.filterAll,
              today: sessionContent.filterToday,
              week: sessionContent.filterWeek,
              completed: sessionContent.filterCompleted
            };

            return (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="px-4 py-2 rounded-xl transition-all"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                    : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#2E63FF',
                  fontWeight: 600,
                  fontSize: '14px',
                  border: isActive ? 'none' : '1px solid #D1E0FF',
                  boxShadow: isActive
                    ? '0 4px 8px rgba(46, 99, 255, 0.25)'
                    : '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {labels[filter]}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Sessions List */}
      <div className="px-6 pb-24">
        {Object.keys(groupedSessions).length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p
              className="text-[16px]"
              style={{
                color: '#64748B',
                fontWeight: 500
              }}
            >
              {sessionContent.noSessions}
            </p>
          </motion.div>
        ) : (
          Object.entries(groupedSessions).map(([group, sessions], groupIndex) => (
            <div key={group} className="mb-6">
              {/* Date Header */}
              <motion.div
                className="mb-3 flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: groupIndex * 0.1 }}
              >
                <div
                  className="h-1 w-1 rounded-full"
                  style={{ background: '#2E63FF' }}
                />
                <h2
                  className="text-[12px] uppercase tracking-wide"
                  style={{
                    fontWeight: 700,
                    color: '#667085',
                    letterSpacing: '0.5px'
                  }}
                >
                  {getDateGroupLabel(group)}
                </h2>
              </motion.div>

              {/* Session Cards */}
              <div className="space-y-3">
                {sessions.map((session, sessionIndex) => {
                  const status = statusConfig[session.status];
                  const specialtyIcon = specialtyIcons[session.specialty];

                  return (
                    <motion.button
                      key={session.id}
                      onClick={() => onViewPatientTreatment?.()}
                      className="rounded-2xl p-4 transition-all active:scale-[0.98] w-full text-left"
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E4EEFF',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: groupIndex * 0.1 + sessionIndex * 0.05 }}
                    >
                      {/* Header Row */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div
                            className="rounded-full flex items-center justify-center"
                            style={{
                              width: '44px',
                              height: '44px',
                              background: 'linear-gradient(135deg, #E0EFFF 0%, #CDE1FF 100%)',
                              border: '2px solid #FFFFFF',
                              boxShadow: '0 2px 6px rgba(46, 99, 255, 0.1)'
                            }}
                          >
                            <User size={20} color="#2E63FF" />
                          </div>

                          {/* Name & Type */}
                          <div>
                            <h3
                              className="text-[16px] mb-1"
                              style={{
                                fontWeight: 600,
                                color: '#1F2937'
                              }}
                            >
                              {session.patientName}
                            </h3>
                            <div className="flex items-center gap-1.5">
                              <div style={{ color: '#2E63FF' }}>
                                {specialtyIcon}
                              </div>
                              <p
                                className="text-[12px]"
                                style={{
                                  color: '#64748B',
                                  fontWeight: 500
                                }}
                              >
                                {getSessionTypeLabel(session.sessionType)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                          style={{
                            background: status.bg,
                            color: status.color
                          }}
                        >
                          <div style={{ color: status.color }}>
                            {status.icon}
                          </div>
                          <span
                            className="text-[11px]"
                            style={{
                              fontWeight: 600
                            }}
                          >
                            {status.label}
                          </span>
                        </div>
                      </div>

                      {/* Details Row */}
                      <div className="flex items-center gap-4 mb-3 px-1">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} color="#64748B" />
                          <span
                            className="text-[13px]"
                            style={{
                              color: '#64748B',
                              fontWeight: 500
                            }}
                          >
                            {session.time}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} color="#64748B" />
                          <span
                            className="text-[13px]"
                            style={{
                              color: '#64748B',
                              fontWeight: 500
                            }}
                          >
                            {session.distance} km {sessionContent.away}
                          </span>
                        </div>
                      </div>

                      {/* Location */}
                      <p
                        className="text-[12px] mb-3 px-1"
                        style={{
                          color: '#94A3B8',
                          fontWeight: 500
                        }}
                      >
                        📍 {session.location}
                      </p>

                      {/* Progress Indicator */}
                      {session.progress && (
                        <div
                          className="mb-3 px-3 py-2 rounded-lg"
                          style={{
                            background: '#F8FAFC',
                            border: '1px solid #E2E8F0'
                          }}
                        >
                          <p
                            className="text-[11px]"
                            style={{
                              color: '#64748B',
                              fontWeight: 600
                            }}
                          >
                            {session.progress.current}/{session.progress.total} {sessionContent.sessionsCompleted}
                          </p>
                        </div>
                      )}

                      {/* Action Label */}
                      <div
                        className="w-full py-2.5 rounded-xl transition-all text-center"
                        style={{
                          background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                          color: '#FFFFFF',
                          fontWeight: 600,
                          fontSize: '14px',
                          boxShadow: '0 4px 8px rgba(46, 99, 255, 0.25)',
                          textAlign: 'center'
                        }}
                      >
                        {sessionContent.viewDetails}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed rounded-full flex items-center justify-center"
        style={{
          bottom: '32px',
          right: isArabic ? 'auto' : '24px',
          left: isArabic ? '24px' : 'auto',
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
          boxShadow: '0 8px 16px rgba(46, 99, 255, 0.3)',
          zIndex: 50
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Plus size={28} color="#FFFFFF" />
      </motion.button>

      {/* Footer */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 py-4 text-center"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid #E4EEFF'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <p
          className="text-[13px]"
          style={{
            color: '#9AA7B5',
            fontWeight: 500
          }}
        >
          {sessionContent.footerText}
        </p>
      </motion.div>
    </div>
  );
}