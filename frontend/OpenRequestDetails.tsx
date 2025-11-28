import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type Language = 'EN' | 'AR';

interface OpenRequestDetailsProps {
  language: Language;
  onLanguageToggle: () => void;
  onBack: () => void;
  onAccept: (requestId: string, selectedTime: string) => void;
  requestData?: {
    id: string;
    patientName: string;
    patientAvatar: string;
    sessionType: string;
    distance: string;
    preferredTimes: string[];
    caseDescription: string;
    hoursRemaining: number;
  };
}

interface Content {
  title: string;
  openRequestTag: string;
  sessionType: string;
  distance: string;
  preferredTimesLabel: string;
  caseDescriptionLabel: string;
  acceptButton: string;
  dismissButton: string;
  footerNote: string;
  successToast: string;
  selectTimeError: string;
  alreadyTakenAlert: string;
  distanceLabel: string;
}

const content: Record<Language, Content> = {
  EN: {
    title: 'Request Detail',
    openRequestTag: 'Open Request — within 10 km',
    sessionType: 'Session Type',
    distance: 'km away',
    preferredTimesLabel: 'Preferred Times',
    caseDescriptionLabel: 'Case Description',
    acceptButton: 'Accept Request',
    dismissButton: 'Dismiss Request',
    footerNote: 'This is an open request. First therapist to accept gets the session. You have up to {hours} hours to accept before it expires.',
    successToast: 'Request Accepted – Added to Schedule',
    selectTimeError: 'Please select a preferred time',
    alreadyTakenAlert: 'This request has already been taken.',
    distanceLabel: 'Distance'
  },
  AR: {
    title: 'تفاصيل الطلب',
    openRequestTag: 'طلب مفتوح — ضمن 10 كم',
    sessionType: 'نوع الجلسة',
    distance: 'كم بعيد',
    preferredTimesLabel: 'الأوقات المفضلة',
    caseDescriptionLabel: 'وصف الحالة',
    acceptButton: 'قبول الطلب',
    dismissButton: 'رفض الطلب',
    footerNote: 'هذا طلب مفتوح. أول معالج يقبل يحصل على الجلسة. لديك حتى {hours} ساعات للقبول قبل انتهاء الصلاحية.',
    successToast: 'تم قبول الطلب — تمت الإضافة إلى الجدول',
    selectTimeError: 'يرجى اختيار وقت مفضل',
    alreadyTakenAlert: 'تم أخذ هذا الطلب بالفعل.',
    distanceLabel: 'المسافة'
  }
};

const defaultRequestData = {
  id: 'REQ001',
  patientName: 'Layla Ahmed',
  patientAvatar: '👩',
  sessionType: 'Consultation + Treatment',
  distance: '1.2',
  preferredTimes: ['12:00 PM', '03:00 PM', '07:00 PM'],
  caseDescription: 'Lower back pain for 3 days. Difficulty bending.\nNo chronic conditions reported.',
  hoursRemaining: 10
};

export default function OpenRequestDetails({
  language,
  onLanguageToggle,
  onBack,
  onAccept,
  requestData = defaultRequestData
}: OpenRequestDetailsProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isArabic = language === 'AR';
  const requestContent = content[language];

  const handleAccept = () => {
    if (!selectedTime) {
      toast.error(requestContent.selectTimeError, {
        duration: 3000,
        style: {
          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
        }
      });
      return;
    }

    setIsProcessing(true);

    // Simulate network delay
    setTimeout(() => {
      // Simulate 10% chance that request was already taken
      const alreadyTaken = Math.random() < 0.1;

      if (alreadyTaken) {
        toast.error(requestContent.alreadyTakenAlert, {
          duration: 3000,
          style: {
            fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
          }
        });
        setIsProcessing(false);
        setTimeout(() => onBack(), 2000);
      } else {
        toast.success(requestContent.successToast, {
          duration: 3000,
          style: {
            fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
          }
        });
        setIsProcessing(false);
        setTimeout(() => onAccept(requestData.id, selectedTime), 1000);
      }
    }, 1000);
  };

  const footerText = requestContent.footerNote.replace(
    '{hours}',
    requestData.hoursRemaining.toString()
  );

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        background: 'linear-gradient(180deg, #EAF3FF 0%, #CDE1FF 100%)',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif'
      }}
    >
      {/* Mobile Container */}
      <motion.div
        className="w-full max-w-[390px] flex flex-col"
        style={{ minHeight: '844px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <motion.div
          className="flex items-center justify-between px-6 pt-12 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={onBack}
            className="p-2 rounded-full transition-all duration-200 hover:bg-white/50"
            style={{ color: '#2E63FF' }}
          >
            <ArrowLeft size={24} style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }} />
          </button>

          <h1
            className="text-[20px]"
            style={{
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, sans-serif',
              fontWeight: 700,
              color: '#2E63FF'
            }}
          >
            {requestContent.title}
          </h1>

          <div style={{ width: '40px' }} /> {/* Spacer for centering */}
        </motion.div>

        {/* Divider */}
        <div 
          style={{ 
            height: '1px', 
            background: 'rgba(46, 99, 255, 0.1)', 
            margin: '0 24px 20px 24px' 
          }} 
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
          {/* Request Card */}
          <motion.div
            className="rounded-2xl p-5"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 3px 12px rgba(0, 0, 0, 0.06)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Request Type Tag */}
            <div className="mb-4">
              <div 
                className="px-3 py-1.5 rounded-full inline-block"
                style={{
                  background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#92400E'
                }}
              >
                {requestContent.openRequestTag}
              </div>
            </div>

            {/* Session Type */}
            <div className="mb-3">
              <p 
                className="text-[13px] mb-1"
                style={{ 
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  color: '#808B9A' 
                }}
              >
                {requestContent.sessionType}
              </p>
              <p 
                className="text-[15px]"
                style={{ 
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  fontWeight: 600,
                  color: '#1F2937' 
                }}
              >
                {requestData.sessionType}
              </p>
            </div>

            {/* Distance */}
            <div className="flex items-center gap-2">
              <MapPin size={20} color="#7B8794" />
              <p 
                className="text-[15px]"
                style={{ 
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  fontWeight: 500,
                  color: '#475569' 
                }}
              >
                {requestData.distance} {requestContent.distance}
              </p>
            </div>
          </motion.div>

          {/* Preferred Times Selector */}
          <motion.div
            className="rounded-2xl p-5"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 3px 12px rgba(0, 0, 0, 0.06)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <h4 
              className="text-[14px] mb-4"
              style={{ 
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, sans-serif',
                fontWeight: 600,
                color: '#1F2937' 
              }}
            >
              {requestContent.preferredTimesLabel}
            </h4>

            <div className="grid grid-cols-3 gap-2">
              {requestData.preferredTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className="py-3 px-2 rounded-xl transition-all duration-200"
                  style={{
                    background: selectedTime === time
                      ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                      : '#EAF3FF',
                    color: selectedTime === time ? '#FFFFFF' : '#2E63FF',
                    fontWeight: 600,
                    fontSize: '13px',
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                    boxShadow: selectedTime === time
                      ? '0 4px 8px rgba(46, 99, 255, 0.3)'
                      : 'none',
                    transform: selectedTime === time ? 'scale(1.02)' : 'scale(1)',
                    border: selectedTime === time ? 'none' : '1px solid #CDE1FF'
                  }}
                >
                  <Clock size={14} style={{ 
                    display: 'inline-block', 
                    marginRight: isArabic ? '0' : '4px',
                    marginLeft: isArabic ? '4px' : '0',
                    verticalAlign: 'middle'
                  }} />
                  {time}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Case Description Box */}
          <motion.div
            className="rounded-2xl p-5"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 3px 12px rgba(0, 0, 0, 0.06)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h4 
              className="text-[14px] mb-3"
              style={{ 
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, sans-serif',
                fontWeight: 600,
                color: '#1F2937' 
              }}
            >
              {requestContent.caseDescriptionLabel}
            </h4>
            <div 
              className="rounded-xl p-3"
              style={{
                background: '#F9FAFB',
                border: '1px solid #E5E7EB'
              }}
            >
              <p 
                className="text-[14px] whitespace-pre-line"
                style={{ 
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  fontWeight: 400,
                  color: '#4B5563',
                  lineHeight: '1.6'
                }}
              >
                {requestData.caseDescription}
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            {/* Accept Button */}
            <button
              onClick={handleAccept}
              disabled={isProcessing || !selectedTime}
              className="w-full py-3.5 rounded-xl text-white flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(46, 99, 255, 0.3)'
              }}
            >
              <CheckCircle2 size={20} />
              {requestContent.acceptButton}
            </button>

            {/* Dismiss Button */}
            <button
              onClick={onBack}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: '#FFFFFF',
                border: '2px solid #E5E7EB',
                color: '#6B7280',
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px'
              }}
            >
              <XCircle size={20} />
              {requestContent.dismissButton}
            </button>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            className="rounded-xl p-4 flex items-start gap-3"
            style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <AlertCircle size={20} color="#D97706" className="flex-shrink-0 mt-0.5" />
            <p 
              className="text-[13px]"
              style={{ 
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                fontWeight: 500,
                color: '#92400E',
                lineHeight: '1.5'
              }}
            >
              {footerText}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
