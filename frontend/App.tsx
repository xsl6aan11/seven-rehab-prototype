import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, UserRound } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { TherapistLogin } from './components/TherapistLogin';
import { TherapistSignup } from './components/TherapistSignup';
import { PasswordRecovery } from './components/PasswordRecovery';
import { VerificationStatus } from './components/VerificationStatus';
import { RequestDetails } from './components/RequestDetails';
import OpenRequestDetails from './components/OpenRequestDetails';
import TherapistDashboard from './components/TherapistDashboard';
import BonusMilestones from './components/BonusMilestones';
import PayoutHistory from './components/PayoutHistory';
import UpcomingSessions from './components/UpcomingSessions';
import SetAvailability from './components/SetAvailability';
import PatientTreatmentTracker from './components/PatientTreatmentTracker';
import SOAPForm from './components/SOAPForm';
import SessionWorkspace from './components/SessionWorkspace';
import PatientDashboard from './components/PatientDashboard';
import TherapistListing from './components/TherapistListing';
import { TherapistProfile, sampleTherapist } from './components/TherapistProfile';
import { TherapistBooking, sampleBookingData } from './components/TherapistBooking';
import RequestSessionDetails from './components/RequestSessionDetails';
import PatientMyBookings from './components/PatientMyBookings';
import PatientBookingDetails from './components/PatientBookingDetails';
import PatientRequestTracking from './components/PatientRequestTracking';
import PatientProfile from './components/PatientProfile';
import AdminDashboardFull from './components/AdminDashboardFull';
import TherapistSettings from './components/TherapistSettings';
import SevenRehabLogo from './components/SevenRehabLogo';
import { Toaster } from './components/ui/sonner';
import { Shield } from 'lucide-react';

type Language = 'EN' | 'AR';
type Screen = 'role-selection' | 'therapist-login' | 'password-recovery' | 'therapist-signup' | 'patient-dashboard' | 'therapist-listing' | 'therapist-profile' | 'therapist-booking' | 'request-session-details' | 'therapist-dashboard' | 'verification-status' | 'request-details' | 'open-request-details' | 'bonus-milestones' | 'payout-history' | 'upcoming-sessions' | 'set-availability' | 'patient-treatment-tracker' | 'soap-form' | 'session-workspace' | 'patient-my-bookings' | 'patient-booking-details' | 'patient-request-tracking' | 'patient-profile' | 'admin-dashboard' | 'therapist-settings';

interface Content {
  logo: string;
  subtitle: string;
  tagline: string;
  subtext: string;
  patientBtn: string;
  therapistBtn: string;
  languageToggle: string;
  flag: string;
}

const content: Record<Language, Content> = {
  EN: {
    logo: 'Powered by Seventic',
    subtitle: 'Physical Therapy. Made Personal.',
    tagline: 'Empower your recovery',
    subtext: 'Book a session or manage care in minutes',
    patientBtn: "Heal in comfort",
    therapistBtn: "I'm a Therapist",
    languageToggle: 'اللغه العربيه',
    flag: '🇸🇦'
  },
  AR: {
    logo: 'Powered by Seventic',
    subtitle: 'العلاج الطبيعي بأسلوب شخصي.',
    tagline: 'استعد عافيتك',
    subtext: 'احجز جلسة أو أدر رعايتك في دقائق',
    patientBtn: 'راحتك تبدأ من هنا',
    therapistBtn: 'أنا اخصائي',
    languageToggle: 'Continue in english',
    flag: '🇬🇧'
  }
};

export default function App() {
  const [language, setLanguage] = useState<Language>('EN');
  const [currentScreen, setCurrentScreen] = useState<Screen>('role-selection');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [selectedTherapistId, setSelectedTherapistId] = useState<string | null>(null);
  const [currentSessionType, setCurrentSessionType] = useState<'consultation-treatment' | 'treatment-only'>('consultation-treatment');
  const [soapFormData, setSoapFormData] = useState<any>(null);

  const currentContent = content[language];
  const isArabic = language === 'AR';

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'AR' : 'EN');
  };

  const handleRoleSelection = (role: 'patient' | 'therapist') => {
    if (role === 'therapist') {
      setCurrentScreen('therapist-login');
    } else {
      setCurrentScreen('patient-dashboard');
    }
  };

  const handleLoginSuccess = () => {
    // Check if therapist needs verification
    // In production, this would check actual user verification status
    setCurrentScreen('verification-status');
  };

  const handleSignUpClick = () => {
    setCurrentScreen('therapist-signup');
  };

  const handleSignupSuccess = () => {
    // After signup, show verification status
    setCurrentScreen('verification-status');
  };

  // Render different screens based on currentScreen state
  if (currentScreen === 'therapist-login') {
    return (
      <>
        <TherapistLogin
          onSignUpClick={handleSignUpClick}
          onLoginSuccess={handleLoginSuccess}
          onForgotPassword={() => setCurrentScreen('password-recovery')}
          onBackToHome={() => setCurrentScreen('role-selection')}
          language={language}
          onLanguageToggle={toggleLanguage}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'password-recovery') {
    return (
      <>
        <PasswordRecovery
          language={language}
          onBack={() => setCurrentScreen('therapist-login')}
          onLanguageToggle={toggleLanguage}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'therapist-signup') {
    return (
      <>
        <TherapistSignup
          language={language}
          onLanguageToggle={toggleLanguage}
          onBackToLogin={() => setCurrentScreen('therapist-login')}
          onSignupSuccess={handleSignupSuccess}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'verification-status') {
    return (
      <>
        <VerificationStatus
          language={language}
          onLanguageToggle={toggleLanguage}
          onGoToDashboard={() => setCurrentScreen('therapist-dashboard')}
          onBackToHome={() => setCurrentScreen('role-selection')}
          initialStatus="pending"
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'open-request-details') {
    // Convert request data to OpenRequestDetails format
    const openRequestData = selectedRequest ? {
      id: selectedRequest.id,
      patientName: selectedRequest.name,
      patientAvatar: selectedRequest.avatar,
      sessionType: selectedRequest.type,
      distance: '1.2',
      preferredTimes: ['12:00 PM', '03:00 PM', '07:00 PM'],
      caseDescription: language === 'AR' 
        ? 'ألم في أسفل الظهر لمدة 3 أيام. صعوبة في الانحناء.\nلا توجد حالات مزمنة مبلغ عنها.'
        : 'Lower back pain for 3 days. Difficulty bending.\nNo chronic conditions reported.',
      hoursRemaining: selectedRequest.hoursLeft
    } : undefined;

    return (
      <>
        <OpenRequestDetails
          language={language}
          onLanguageToggle={toggleLanguage}
          onBack={() => {
            setSelectedRequest(null);
            setCurrentScreen('therapist-dashboard');
          }}
          onAccept={(requestId, selectedTime) => {
            // Handle accept - in real app, update backend
            console.log('Accepted open request:', requestId, 'at time:', selectedTime);
            // Navigate back to dashboard after accepting
            setSelectedRequest(null);
            setCurrentScreen('therapist-dashboard');
          }}
          requestData={openRequestData}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'request-details') {
    // Convert request data to RequestDetails format (Direct Request)
    const requestDetailsData = selectedRequest ? {
      id: selectedRequest.id,
      patientName: selectedRequest.name,
      patientAvatar: selectedRequest.avatar,
      tag: selectedRequest.requestType === 'direct' ? 'Direct Request — within 5 km' : 'Open Request',
      sessionType: selectedRequest.type,
      scheduledTime: selectedRequest.time,
      district: language === 'AR' ? 'حي النهدة' : 'Al Nahda District',
      caseDescription: language === 'AR' 
        ? 'تصلب في الكتف بعد العملية الجراحية.\nألم خفيف عند رفع الذراع.\nلا توجد حالات مزمنة مبلغ عنها.'
        : 'Post-surgery shoulder stiffness.\nMild pain when lifting arm.\nNo chronic conditions reported.',
      duration: language === 'AR' ? '45 دقيقة — 60 دقيقة' : '45 min — 60 min',
      price: language === 'AR' ? '330 ريال / جلسة' : 'SAR 330 / Session',
      address: language === 'AR' ? 'منزل المريض — الرياض النهدة' : 'Patient Home — Riyadh Al Nahda',
      hoursRemaining: selectedRequest.hoursLeft
    } : undefined;

    return (
      <>
        <RequestDetails
          language={language}
          onLanguageToggle={toggleLanguage}
          onBack={() => {
            setSelectedRequest(null);
            setCurrentScreen('therapist-dashboard');
          }}
          onAccept={(requestId) => {
            // Handle accept - in real app, update backend
            console.log('Accepted request:', requestId);
            // Navigate back to dashboard after accepting
            setSelectedRequest(null);
            setCurrentScreen('therapist-dashboard');
          }}
          onViewPatientInfo={(patientId) => {
            // Handle view patient info - navigate to patient profile
            console.log('View patient:', patientId);
          }}
          requestData={requestDetailsData}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'patient-dashboard') {
    return (
      <>
        <PatientDashboard
          language={language}
          onLanguageToggle={toggleLanguage}
          onBackToHome={() => setCurrentScreen('role-selection')}
          onRequestSession={() => setCurrentScreen('therapist-listing')}
          onViewTherapistProfile={(therapistId) => {
            setSelectedTherapistId(therapistId);
            setCurrentScreen('therapist-profile');
          }}
          onBookTherapist={(therapistId) => {
            setSelectedTherapistId(therapistId);
            setCurrentScreen('therapist-booking');
          }}
          onViewMyBookings={() => setCurrentScreen('patient-my-bookings')}
          onViewBookingDetails={(bookingId) => {
            console.log('View booking:', bookingId);
            setCurrentScreen('patient-booking-details');
          }}
          onViewRequestTracking={(requestId) => {
            console.log('View request:', requestId);
            setCurrentScreen('patient-request-tracking');
          }}
          onViewProfile={() => setCurrentScreen('patient-profile')}
          currentTab="home"
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'therapist-listing') {
    return (
      <>
        <TherapistListing
          language={language}
          onLanguageToggle={toggleLanguage}
          onBack={() => setCurrentScreen('patient-dashboard')}
          onBookTherapist={(therapistId) => {
            setSelectedTherapistId(therapistId);
            setCurrentScreen('therapist-booking');
          }}
          onViewProfile={(therapistId) => {
            setSelectedTherapistId(therapistId);
            setCurrentScreen('therapist-profile');
          }}
          onRequestBroadcast={() => {
            setCurrentScreen('request-session-details');
          }}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'therapist-profile') {
    return (
      <>
        <TherapistProfile
          therapist={sampleTherapist}
          language={language === 'EN' ? 'en' : 'ar'}
          onBack={() => {
            setSelectedTherapistId(null);
            setCurrentScreen('patient-dashboard');
          }}
          onBook={(selectedSlot) => {
            // Navigate to booking screen
            setCurrentScreen('therapist-booking');
          }}
          onChat={() => {
            window.open('https://wa.me/966533867100', '_blank');
          }}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'request-session-details') {
    return (
      <>
        <RequestSessionDetails
          onBack={() => setCurrentScreen('therapist-listing')}
          isReturningPatient={false}
          language={language === 'EN' ? 'en' : 'ar'}
          onLanguageToggle={toggleLanguage}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'therapist-booking') {
    return (
      <>
        <TherapistBooking
          therapist={sampleBookingData.therapist}
          sessionType="consultation-treatment"
          availableDates={sampleBookingData.availableDates}
          language={language === 'EN' ? 'en' : 'ar'}
          onBack={() => {
            setCurrentScreen('therapist-profile');
          }}
          onConfirmBooking={(booking) => {
            console.log('Booking confirmed:', booking);
            toast.success(
              isArabic 
                ? `✅ تم تأكيد حجزك يوم ${booking.date} الساعة ${booking.time}` 
                : `✅ Booking confirmed for ${booking.date} at ${booking.time}`
            );
            // In real app, navigate to booking confirmation/payment screen
            setTimeout(() => {
              setCurrentScreen('patient-dashboard');
            }, 2000);
          }}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'bonus-milestones') {
    return (
      <>
        <BonusMilestones
          language={language}
          onLanguageToggle={toggleLanguage}
          onBack={() => setCurrentScreen('therapist-dashboard')}
          onPayoutHistory={() => setCurrentScreen('payout-history')}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'payout-history') {
    return (
      <>
        <PayoutHistory
          language={language}
          onBack={() => setCurrentScreen('bonus-milestones')}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'upcoming-sessions') {
    return (
      <>
        <UpcomingSessions
          language={language}
          onBack={() => setCurrentScreen('therapist-dashboard')}
          onSetAvailability={() => setCurrentScreen('set-availability')}
          onViewPatientTreatment={() => setCurrentScreen('patient-treatment-tracker')}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'set-availability') {
    return (
      <>
        <SetAvailability
          language={language === 'EN' ? 'en' : 'ar'}
          onBack={() => setCurrentScreen('upcoming-sessions')}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'patient-treatment-tracker') {
    return (
      <>
        <PatientTreatmentTracker
          language={language}
          onBack={() => setCurrentScreen('therapist-dashboard')}
          onStartSession={(sessionType) => {
            setCurrentSessionType(sessionType || 'consultation-treatment');
            // Only show SOAP form for consultation-treatment sessions
            if (sessionType === 'consultation-treatment') {
              setCurrentScreen('soap-form');
            } else {
              // For treatment-only sessions, skip SOAP and go directly to session
              const message = language === 'AR' ? 'بدء جلسة العلاج...' : 'Starting treatment session...';
              // TODO: Navigate to treatment session screen
              // For now, just show a toast
              setTimeout(() => {
                setCurrentScreen('patient-treatment-tracker');
              }, 1000);
            }
          }}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'soap-form') {
    return (
      <>
        <SOAPForm
          language={language}
          patientName={language === 'AR' ? 'سارة ك.' : 'Sara K.'}
          sessionType={currentSessionType}
          onBack={() => setCurrentScreen('patient-treatment-tracker')}
          onSubmit={(data) => {
            console.log('SOAP Form submitted:', data);
            setSoapFormData(data);
            // Navigate to Session Workspace after SOAP submission
            setTimeout(() => {
              setCurrentScreen('session-workspace');
            }, 2000);
          }}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'session-workspace') {
    return (
      <>
        <SessionWorkspace
          language={language}
          patientName={language === 'AR' ? 'سارة ك.' : 'Sara K.'}
          sessionType={currentSessionType}
          sessionNumber={1}
          totalSessions={12}
          soapData={soapFormData}
          onFinalize={() => {
            // Show success toast
            const message = language === 'AR' 
              ? 'تم حفظ الجلسة بنجاح! تم تحديث تقدم المريض.'
              : 'Session saved successfully! Patient progress updated.';
            toast.success(message);
            
            // Navigate back to patient treatment tracker after finalizing session
            setTimeout(() => {
              setCurrentScreen('patient-treatment-tracker');
            }, 1500);
          }}
          onBack={() => setCurrentScreen('patient-treatment-tracker')}
        />
        <Toaster />
      </>
    );
  }

  if (currentScreen === 'therapist-dashboard') {
    return (
      <TherapistDashboard
        language={language}
        onLanguageToggle={toggleLanguage}
        onBackToHome={() => setCurrentScreen('role-selection')}
        onViewRequest={(request) => {
          setSelectedRequest(request);
          // Route to correct detail screen based on request type
          if (request.requestType === 'open') {
            setCurrentScreen('open-request-details');
          } else {
            setCurrentScreen('request-details');
          }
        }}
        onViewBonusMilestones={() => setCurrentScreen('bonus-milestones')}
        onViewUpcomingSessions={() => setCurrentScreen('upcoming-sessions')}
        onViewPatientTreatment={() => setCurrentScreen('patient-treatment-tracker')}
        onViewSettings={() => setCurrentScreen('therapist-settings')}
      />
    );
  }

  if (currentScreen === 'patient-my-bookings') {
    return (
      <PatientMyBookings
        language={language}
        onLanguageToggle={toggleLanguage}
        onBack={() => setCurrentScreen('patient-dashboard')}
        onBackToHome={() => setCurrentScreen('role-selection')}
        onViewBookingDetails={(bookingId) => {
          // Navigate to booking details screen
          console.log('View booking:', bookingId);
          setCurrentScreen('patient-booking-details');
        }}
        onViewRequestTracking={() => {
          // Navigate to request tracking screen
          setCurrentScreen('patient-request-tracking');
        }}
        onViewProfile={() => {
          // Navigate to patient profile screen
          setCurrentScreen('patient-profile');
        }}
      />
    );
  }

  if (currentScreen === 'patient-booking-details') {
    return (
      <PatientBookingDetails
        language={language}
        onLanguageToggle={toggleLanguage}
        onBack={() => setCurrentScreen('patient-my-bookings')}
        onConfirmBooking={() => {
          // Handle confirm booking - in real app, update backend
          toast.success(
            isArabic 
              ? `✅ تم تأكيد حجزك` 
              : `✅ Booking confirmed`
          );
          // In real app, navigate to booking confirmation/payment screen
          setTimeout(() => {
            setCurrentScreen('patient-dashboard');
          }, 2000);
        }}
      />
    );
  }

  if (currentScreen === 'patient-request-tracking') {
    return (
      <PatientRequestTracking
        language={language}
        onLanguageToggle={toggleLanguage}
        onBack={() => setCurrentScreen('patient-dashboard')}
        onConfirmRequest={() => {
          // Handle confirm request - in real app, update backend
          toast.success(
            isArabic 
              ? `✅ تم تأكيد طلبك` 
              : `✅ Request confirmed successfully`
          );
          // In real app, navigate to request confirmation/payment screen
          setTimeout(() => {
            setCurrentScreen('patient-dashboard');
          }, 2000);
        }}
      />
    );
  }

  if (currentScreen === 'patient-profile') {
    return (
      <PatientProfile
        language={language}
        onLanguageToggle={toggleLanguage}
        onBack={() => setCurrentScreen('patient-dashboard')}
        onLogout={() => setCurrentScreen('role-selection')}
      />
    );
  }

  if (currentScreen === 'admin-dashboard') {
    return (
      <AdminDashboardFull
        language={language}
        onLanguageToggle={toggleLanguage}
        onBackToHome={() => setCurrentScreen('role-selection')}
      />
    );
  }

  if (currentScreen === 'therapist-settings') {
    return (
      <TherapistSettings
        language={language}
        onLanguageToggle={toggleLanguage}
        onBackToHome={() => setCurrentScreen('role-selection')}
      />
    );
  }

  // Default: Role Selection Screen (Frame 1)
  return (
    <div 
      className="min-h-screen bg-white flex items-center justify-center p-6"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{ fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif' }}
    >
      {/* Mobile Frame Container */}
      <div 
        className="w-full max-w-[390px] h-[844px] flex flex-col items-center justify-between py-12 px-6"
        style={{ maxHeight: '844px', backgroundColor: '#EAF3FF' }}
      >
        {/* Header / Branding Area */}
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
        >
          <p 
            className="text-[16px] text-center"
            style={{ 
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
              fontWeight: 400,
              color: '#757575'
            }}
          >
            {currentContent.subtitle}
          </p>
        </motion.div>

        {/* Middle Content Container */}
        <div className="flex flex-col items-center gap-8 flex-1 justify-center">
          {/* Illustration / Hero Visual */}
          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <SevenRehabLogo width={200} backgroundColor="#FFFFFF" />
          </motion.div>

          {/* Tagline Section */}
          <motion.div 
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 
              className="text-[20px] text-center"
              style={{
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                fontWeight: 600,
                color: '#111111'
              }}
            >
              {currentContent.tagline}
            </h2>
            <p 
              className="text-[15px] text-center px-4"
              style={{
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                fontWeight: 400,
                color: '#7E7E7E'
              }}
            >
              {currentContent.subtext}
            </p>
          </motion.div>

          {/* Role Selection Buttons */}
          <motion.div 
            className="w-full flex flex-col gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {/* Primary Button - Patient */}
            <motion.button
              id="btn_patient"
              onClick={() => handleRoleSelection('patient')}
              className="w-full h-[54px] rounded-xl text-white transition-all duration-200 flex items-center justify-center"
              style={{
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                backgroundColor: '#4D7CFF',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)'
              }}
              whileHover={{ scale: 1.02, backgroundColor: '#345EFF' }}
              whileTap={{ scale: 0.98 }}
            >
              {currentContent.patientBtn}
            </motion.button>

            {/* Secondary Button - Therapist */}
            <motion.button
              id="btn_therapist"
              onClick={() => handleRoleSelection('therapist')}
              className="w-full h-[54px] rounded-xl transition-all duration-200 flex items-center justify-center"
              style={{
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                backgroundColor: 'transparent',
                border: '1.5px solid #AFCBFF',
                color: '#4D7CFF'
              }}
              whileHover={{ 
                borderColor: '#2E63FF',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              {currentContent.therapistBtn}
            </motion.button>
          </motion.div>
        </div>

        {/* Language Toggle Footer */}
        <motion.div 
          className="flex flex-col items-center justify-center mt-8 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <button
            onClick={toggleLanguage}
            className="text-[16px] transition-colors duration-200 hover:text-[#2E63FF]"
            style={{
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
              fontWeight: 500,
              color: '#A8D8FF'
            }}
          >
            {currentContent.languageToggle}
          </button>
          
          {/* Admin Portal Link */}
          <button
            onClick={() => setCurrentScreen('admin-dashboard')}
            className="text-[13px] transition-colors duration-200 hover:text-[#2E63FF] flex items-center gap-2"
            style={{
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
              fontWeight: 500,
              color: '#94A3B8'
            }}
          >
            <Shield size={14} />
            {isArabic ? 'بوابة الإدارة' : 'Admin Portal'}
          </button>
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
}