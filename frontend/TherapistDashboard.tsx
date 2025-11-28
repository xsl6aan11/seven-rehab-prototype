import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Clock, MapPin, Award, Calendar, Lightbulb, Settings } from 'lucide-react';
import SevenRehabLogo from './SevenRehabLogo';
import BonusProgressBar from './BonusProgressBar';

interface TherapistDashboardProps {
  language: 'EN' | 'AR';
  onLanguageToggle: () => void;
  onBackToHome: () => void;
  onViewRequest?: (request: PatientRequest) => void;
  onViewBonusMilestones?: () => void;
  onViewUpcomingSessions?: () => void;
  onViewPatientTreatment?: () => void;
  onViewSettings?: () => void;
}

interface DashboardContent {
  logo: string;
  title: string;
  therapistName: string;
  statusOnline: string;
  statusOffline: string;
  performanceTitle: string;
  performanceText: string;
  newRequestsTitle: string;
  openRequestsTab: string;
  directRequestsTab: string;
  consultationTreatment: string;
  preferredTime: string;
  distance: string;
  openRequest: string;
  directRequest: string;
  acceptButton: string;
  hoursLeft: string;
  firstToAccept: string;
  chosenByPatient: string;
  bonusTitle: string;
  bonusSubtitle: string;
  todaySessionsTitle: string;
  footerTip: string;
  languageToggle: string;
  sessionsLabel: string;
  bonusLabel: string;
}

const content: Record<'EN' | 'AR', DashboardContent> = {
  EN: {
    logo: 'Powered by Seventic',
    title: 'Therapist Dashboard',
    therapistName: 'Dr. Ahmed',
    statusOnline: 'Online',
    statusOffline: 'Offline',
    performanceTitle: 'Monthly Performance',
    performanceText: "You've completed 22 sessions this month.",
    newRequestsTitle: 'New Requests',
    openRequestsTab: 'Open Requests',
    directRequestsTab: 'Direct Requests',
    consultationTreatment: 'Consultation + Treatment',
    preferredTime: 'Preferred Time',
    distance: 'km away',
    openRequest: 'Open Request',
    directRequest: 'Direct Request',
    acceptButton: 'Accept',
    hoursLeft: 'h left',
    firstToAccept: 'First therapist to accept gets the session.',
    chosenByPatient: 'You were chosen by the patient.',
    bonusTitle: 'Bonus Milestones Progress',
    bonusSubtitle: 'Track your earned rewards based on completed sessions.',
    todaySessionsTitle: "Today's Sessions",
    footerTip: 'Tip: Set your schedule to get more matching requests.',
    languageToggle: 'اللغه العربيه',
    sessionsLabel: 'Sessions',
    bonusLabel: 'Bonus'
  },
  AR: {
    logo: 'Powered by Seventic',
    title: 'لوحة تحكم الأخصائي',
    therapistName: 'د. أحمد',
    statusOnline: 'متصل',
    statusOffline: 'غير متصل',
    performanceTitle: 'الأداء الشهري',
    performanceText: 'لقد أكملت 22 جلسة هذا الشهر.',
    newRequestsTitle: 'الطلبات الجديدة',
    openRequestsTab: 'الطلبات المفتوحة',
    directRequestsTab: 'الطلبات المباشرة',
    consultationTreatment: 'استشارة + علاج',
    preferredTime: 'الوقت المفضل',
    distance: 'كم',
    openRequest: 'طلب مفتوح',
    directRequest: 'طلب مباشر',
    acceptButton: 'قبول',
    hoursLeft: 'ساعة متبقية',
    firstToAccept: 'أول معالج يقبل يحصل على الجلسة.',
    chosenByPatient: 'تم اختيارك من قبل المريض.',
    bonusTitle: 'تقدم مكافآت الأداء',
    bonusSubtitle: 'تتبع المكافآت المكتسبة بناءً على الجلسات المكتملة.',
    todaySessionsTitle: 'جلسات اليوم',
    footerTip: 'نصيحة: حدد جدولك للحصول على المزيد من الطلبات المتطابقة.',
    languageToggle: 'Continue in english',
    sessionsLabel: 'الجلسات',
    bonusLabel: 'المكافأة'
  }
};

interface PatientRequest {
  id: string;
  name: string;
  avatar: string;
  type: string;
  time: string;
  distance: number;
  requestType: 'open' | 'direct';
  hoursLeft: number;
}

interface TodaySession {
  id: string;
  name: string;
  time: string;
}

// Current session data for bonus progress
const currentSessionCount = 25;
const currentBonusPercentage = 10;

export default function TherapistDashboard({ language, onLanguageToggle, onBackToHome, onViewRequest, onViewBonusMilestones, onViewUpcomingSessions, onViewPatientTreatment, onViewSettings }: TherapistDashboardProps) {
  const isArabic = language === 'AR';
  const dashboardContent = content[language];
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<'open' | 'direct'>('open');
  
  // Open Requests
  const [openRequests, setOpenRequests] = useState<PatientRequest[]>([
    {
      id: 'req-1',
      name: isArabic ? 'ليلى أحمد' : 'Layla Ahmed',
      avatar: '👩',
      type: dashboardContent.consultationTreatment,
      time: isArabic ? 'اليوم 3:00 م' : 'Today 3:00 PM',
      distance: 1.2,
      requestType: 'open',
      hoursLeft: 10
    },
    {
      id: 'req-2',
      name: isArabic ? 'فاطمة سالم' : 'Fatima Salem',
      avatar: '👩',
      type: dashboardContent.consultationTreatment,
      time: isArabic ? 'اليوم 5:30 م' : 'Today 5:30 PM',
      distance: 2.8,
      requestType: 'open',
      hoursLeft: 8
    }
  ]);

  // Direct Requests
  const [directRequests, setDirectRequests] = useState<PatientRequest[]>([
    {
      id: 'req-3',
      name: isArabic ? 'خالد محمد' : 'Khaled Mohammed',
      avatar: '👨',
      type: dashboardContent.consultationTreatment,
      time: isArabic ? 'غداً 10:00 ص' : 'Tomorrow 10:00 AM',
      distance: 2.5,
      requestType: 'direct',
      hoursLeft: 24
    },
    {
      id: 'req-4',
      name: isArabic ? 'نورة عبدالله' : 'Noura Abdullah',
      avatar: '👩',
      type: dashboardContent.consultationTreatment,
      time: isArabic ? 'غداً 2:00 م' : 'Tomorrow 2:00 PM',
      distance: 3.5,
      requestType: 'direct',
      hoursLeft: 20
    }
  ]);

  const [todaySessions, setTodaySessions] = useState<TodaySession[]>([
    {
      id: 'session-1',
      name: isArabic ? 'سارة ك.' : 'Sara K.',
      time: '10:00 AM'
    },
    {
      id: 'session-2',
      name: isArabic ? 'محمد ر.' : 'Mohammed R.',
      time: '1:30 PM'
    }
  ]);

  const handleViewRequest = (requestId: string, requestType: 'open' | 'direct') => {
    const requests = requestType === 'open' ? openRequests : directRequests;
    const request = requests.find(r => r.id === requestId);
    
    if (request && onViewRequest) {
      onViewRequest(request);
    }
  };

  const handleAcceptRequest = (requestId: string, requestType: 'open' | 'direct') => {
    const requests = requestType === 'open' ? openRequests : directRequests;
    const setRequests = requestType === 'open' ? setOpenRequests : setDirectRequests;
    
    const request = requests.find(r => r.id === requestId);
    if (request) {
      // Add to today's sessions
      setTodaySessions([...todaySessions, {
        id: request.id,
        name: request.name,
        time: request.time
      }]);
      // Remove from requests
      setRequests(requests.filter(r => r.id !== requestId));
    }
  };

  const currentRequests = activeTab === 'open' ? openRequests : directRequests;

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #EAF3FF 0%, #CDE1FF 100%)',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif'
      }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Mobile Container */}
      <div 
        className="relative overflow-hidden"
        style={{
          width: '390px',
          height: '844px',
          background: 'linear-gradient(180deg, #EAF3FF 0%, #CDE1FF 100%)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto" style={{ paddingBottom: '32px' }}>
          {/* Header Section */}
          <div style={{ padding: '48px 24px 24px 24px', position: 'relative' }}>
            {/* Settings Button - Top Right */}
            <motion.button
              onClick={onViewSettings}
              className="absolute rounded-full flex items-center justify-center"
              style={{
                top: '48px',
                right: isArabic ? 'auto' : '24px',
                left: isArabic ? '24px' : 'auto',
                width: '44px',
                height: '44px',
                background: '#FFFFFF',
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(30, 77, 255, 0.2)',
                zIndex: 10
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings
                size={20}
                style={{
                  background: 'linear-gradient(135deg, #1E4DFF 0%, #3FA9F5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              />
            </motion.button>

            {/* Logo */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SevenRehabLogo width={120} backgroundColor="linear-gradient(180deg, #EAF3FF 0%, #CDE1FF 100%)" />
            </motion.div>

            {/* Title and Therapist Info */}
            <motion.div 
              className="flex items-start justify-between mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div>
                <h2 
                  style={{ 
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#1F2937',
                    marginBottom: '4px'
                  }}
                >
                  {dashboardContent.title}
                </h2>
                <p 
                  style={{ 
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#6B7280'
                  }}
                >
                  {dashboardContent.therapistName}
                </p>
              </div>

              {/* Status Toggle */}
              <motion.button
                onClick={() => setIsOnline(!isOnline)}
                className="relative rounded-full"
                style={{
                  width: '56px',
                  height: '32px',
                  background: isOnline 
                    ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                    : 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
                  boxShadow: isOnline 
                    ? '0 3px 8px rgba(46, 99, 255, 0.3)'
                    : '0 3px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="absolute top-1 rounded-full"
                  style={{ 
                    width: '24px',
                    height: '24px',
                    background: '#FFFFFF',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                  animate={{
                    left: isOnline ? '28px' : '4px'
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }}
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Performance Summary Card */}
          <motion.div 
            style={{ padding: '0 24px', marginBottom: '24px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div 
              className="rounded-xl p-4 flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #E0F2FF 0%, #BAE6FF 100%)',
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div 
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                  boxShadow: '0 2px 6px rgba(46, 99, 255, 0.3)'
                }}
              >
                <CheckCircle2 size={20} color="#FFFFFF" />
              </div>
              <div>
                <p 
                  style={{ 
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#2E63FF',
                    marginBottom: '2px'
                  }}
                >
                  {dashboardContent.performanceTitle}
                </p>
                <p 
                  style={{ 
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#1F2937'
                  }}
                >
                  {dashboardContent.performanceText}
                </p>
              </div>
            </div>
          </motion.div>

          {/* New Requests Section */}
          <motion.div 
            style={{ padding: '0 24px', marginBottom: '24px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 
              style={{ 
                fontSize: '20px',
                fontWeight: 700,
                color: '#2E63FF',
                marginBottom: '16px'
              }}
            >
              {dashboardContent.newRequestsTitle}
            </h3>

            {/* Category Tabs - Pill-style Segmented Control */}
            <div
              className="flex items-center gap-2 p-1 rounded-full mb-4"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}
            >
              <button
                onClick={() => setActiveTab('open')}
                className="flex-1 py-2.5 px-4 rounded-full transition-all duration-300"
                style={{
                  background: activeTab === 'open'
                    ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                    : 'transparent',
                  color: activeTab === 'open' ? '#FFFFFF' : '#2E63FF',
                  fontSize: '15px',
                  fontWeight: 600,
                  border: activeTab === 'open' ? 'none' : '2px solid transparent'
                }}
              >
                {dashboardContent.openRequestsTab}
              </button>

              <button
                onClick={() => setActiveTab('direct')}
                className="flex-1 py-2.5 px-4 rounded-full transition-all duration-300"
                style={{
                  background: activeTab === 'direct'
                    ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                    : 'transparent',
                  color: activeTab === 'direct' ? '#FFFFFF' : '#2E63FF',
                  fontSize: '15px',
                  fontWeight: 600,
                  border: activeTab === 'direct' ? 'none' : '2px solid transparent'
                }}
              >
                {dashboardContent.directRequestsTab}
              </button>
            </div>

            {/* Request Cards with Animated Transition */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                className="space-y-3"
                initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isArabic ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    className="rounded-2xl p-5"
                    style={{
                      background: '#FFFFFF',
                      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {/* Avatar + Name + Tag */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="flex items-center justify-center rounded-full text-2xl"
                          style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #E0F2FF 0%, #BAE6FF 100%)'
                          }}
                        >
                          {request.avatar}
                        </div>
                        <div>
                          <p 
                            style={{ 
                              fontSize: '16px',
                              fontWeight: 600,
                              color: '#1F2937',
                              marginBottom: '2px'
                            }}
                          >
                            {request.name}
                          </p>
                          <p 
                            style={{ 
                              fontSize: '13px',
                              fontWeight: 500,
                              color: '#94A3B8'
                            }}
                          >
                            {request.type}
                          </p>
                        </div>
                      </div>

                      {/* Tag */}
                      <div 
                        className="px-3 py-1.5 rounded-full"
                        style={{
                          background: request.requestType === 'open' 
                            ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)'
                            : 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: request.requestType === 'open' ? '#92400E' : '#1E40AF'
                        }}
                      >
                        {request.requestType === 'open' ? dashboardContent.openRequest : dashboardContent.directRequest}
                      </div>
                    </div>

                    {/* Info Row: Time + Distance */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} color="#6B7280" />
                        <span 
                          style={{ 
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#475569'
                          }}
                        >
                          {request.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} color="#6B7280" />
                        <span 
                          style={{ 
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#475569'
                          }}
                        >
                          {request.distance} {dashboardContent.distance}
                        </span>
                      </div>
                    </div>

                    {/* Accept Button */}
                    <motion.button
                      onClick={() => handleViewRequest(request.id, request.requestType)}
                      className="w-full h-[44px] rounded-xl text-white flex items-center justify-center gap-2 mb-3"
                      style={{
                        background: request.requestType === 'open'
                          ? 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)'
                          : 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                        boxShadow: request.requestType === 'open'
                          ? '0 4px 12px rgba(56, 161, 105, 0.3)'
                          : '0 4px 12px rgba(46, 99, 255, 0.3)',
                        fontSize: '15px',
                        fontWeight: 600
                      }}
                      whileHover={{ 
                        y: -2,
                        scale: 1.02
                      }}
                      whileTap={{ 
                        scale: 0.98,
                        y: 0
                      }}
                    >
                      {dashboardContent.acceptButton}
                      <div 
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          fontWeight: 600
                        }}
                      >
                        {request.hoursLeft}{dashboardContent.hoursLeft}
                      </div>
                    </motion.button>

                    {/* Footer Note */}
                    <p
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#94A3B8',
                        textAlign: 'center',
                        lineHeight: '1.4'
                      }}
                    >
                      {request.requestType === 'open' 
                        ? dashboardContent.firstToAccept 
                        : dashboardContent.chosenByPatient}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Bonus Milestones Graph */}
          <motion.div 
            style={{ padding: '0 24px', marginBottom: '24px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button
              onClick={onViewBonusMilestones}
              className="w-full rounded-xl p-4 transition-all duration-200 hover:scale-[1.02]"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)',
                textAlign: isArabic ? 'right' : 'left',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <div className="flex items-start gap-2 mb-2">
                <Award size={20} color="#2E63FF" />
                <div className="flex-1">
                  <h3 
                    style={{ 
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#1F2937',
                      marginBottom: '4px'
                    }}
                  >
                    {dashboardContent.bonusTitle}
                  </h3>
                  <p 
                    style={{ 
                      fontSize: '12px',
                      fontWeight: 500,
                      color: '#6B7280'
                    }}
                  >
                    {dashboardContent.bonusSubtitle}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginTop: '16px', pointerEvents: 'none' }}>
                <BonusProgressBar
                  currentSessions={currentSessionCount}
                  currentBonus={currentBonusPercentage}
                  language={language}
                  size="compact"
                  showMilestones={false}
                  showLabel={true}
                />
              </div>
            </button>
          </motion.div>

          {/* Today's Sessions Section */}
          <motion.div 
            style={{ padding: '0 24px', marginBottom: '24px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 
                style={{ 
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1F2937'
                }}
              >
                {dashboardContent.todaySessionsTitle}
              </h3>
              <button
                onClick={() => onViewUpcomingSessions?.()}
                className="px-3 py-1.5 rounded-lg transition-all active:scale-95"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D1E0FF',
                  color: '#2E63FF',
                  fontWeight: 600,
                  fontSize: '13px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
              >
                {isArabic ? 'عرض الكل' : 'View All'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {todaySessions.map((session, index) => (
                <motion.button
                  key={session.id}
                  onClick={() => onViewPatientTreatment?.()}
                  className="rounded-xl p-3 transition-all active:scale-95 text-left"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} color="#2E63FF" />
                    <p 
                      style={{ 
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#1F2937'
                      }}
                    >
                      {session.name}
                    </p>
                  </div>
                  <p 
                    style={{ 
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#6B7280'
                    }}
                  >
                    {session.time}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Footer Tip Section */}
          <motion.div 
            style={{ padding: '0 24px', marginBottom: '24px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div 
              className="rounded-xl p-4 flex items-start gap-3"
              style={{
                background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
              }}
            >
              <Lightbulb size={20} color="#92400E" />
              <p 
                style={{ 
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#92400E',
                  lineHeight: '1.5'
                }}
              >
                {dashboardContent.footerTip}
              </p>
            </div>
          </motion.div>

          {/* Language Toggle */}
          <motion.div 
            style={{ padding: '0 24px', marginBottom: '24px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="text-center">
              <button
                type="button"
                onClick={onLanguageToggle}
                className="text-[16px] transition-colors duration-200 hover:text-[#2E63FF]"
                style={{
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                  fontWeight: 500,
                  color: '#5596FF'
                }}
              >
                {dashboardContent.languageToggle}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}