import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, MapPin, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PatientRequestTrackingProps {
  language: 'EN' | 'AR';
  requestId: string;
  onBack: () => void;
}

const content = {
  EN: {
    title: 'Request Tracking',
    requestStatus: 'Request Status',
    timeline: {
      sent: 'Request Sent',
      searching: 'Searching for Therapist',
      accepted: 'Therapist Accepted',
      expired: 'Request Expired'
    },
    preferredTimes: 'Preferred Times',
    location: 'Location',
    patientNotes: 'Patient Notes',
    cancelRequest: 'Cancel Request',
    cancelConfirmTitle: 'Cancel Request?',
    cancelConfirmMessage: 'Are you sure you want to cancel this request? You can create a new request anytime.',
    confirmCancel: 'Yes, Cancel',
    keepRequest: 'Keep Request',
    requestCancelled: 'Request cancelled successfully',
    timeRemaining: 'Time Remaining',
    hours: 'hours',
    minutes: 'min'
  },
  AR: {
    title: 'تتبع الطلب',
    requestStatus: 'حالة الطلب',
    timeline: {
      sent: 'تم إرسال الطلب',
      searching: 'البحث عن معالج',
      accepted: 'قبول المعالج',
      expired: 'انتهت صلاحية الطلب'
    },
    preferredTimes: 'الأوقات المفضلة',
    location: 'الموقع',
    patientNotes: 'ملاحظات المريض',
    cancelRequest: 'إلغاء الطلب',
    cancelConfirmTitle: 'إلغاء الطلب؟',
    cancelConfirmMessage: 'هل أنت متأكد من إلغاء هذا الطلب؟ يمكنك إنشاء طلب جديد في أي وقت.',
    confirmCancel: 'نعم، إلغاء',
    keepRequest: 'الاحتفاظ بالطلب',
    requestCancelled: 'تم إلغاء الطلب بنجاح',
    timeRemaining: 'الوقت المتبقي',
    hours: 'ساعة',
    minutes: 'دقيقة'
  }
};

// Mock request data
const mockRequestData = {
  id: '1',
  status: 'searching', // sent, searching, accepted, expired, cancelled
  preferredTimes: ['2:00 PM - 4:00 PM', '6:00 PM - 8:00 PM', '10:00 AM - 12:00 PM'],
  preferredTimesAr: ['٢:٠٠ مساءً - ٤:٠٠ مساءً', '٦:٠٠ مساءً - ٨:٠٠ مساءً', '١٠:٠٠ صباحًا - ١٢:٠٠ ظهرًا'],
  location: 'Al Nahda District, Building 45, Apt 12, Riyadh',
  locationAr: 'حي النهدة، مبنى ٤٥، شقة ١٢، الرياض',
  notes: 'Lower back pain for 3 days. Difficulty bending. No chronic conditions reported.',
  notesAr: 'ألم في أسفل الظهر لمدة 3 أيام. صعوبة في الانحناء. لا توجد حالات مزمنة مبلغ عنها.',
  timeRemaining: {
    hours: 4,
    minutes: 32
  },
  createdAt: 'Nov 22, 2024 at 2:30 PM',
  createdAtAr: '٢٢ نوفمبر ٢٠٢٤ الساعة ٢:٣٠ مساءً'
};

export default function PatientRequestTracking({
  language,
  requestId,
  onBack
}: PatientRequestTrackingProps) {
  const isArabic = language === 'AR';
  const t = content[language];
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [request] = useState(mockRequestData);

  const handleCancelRequest = () => {
    toast.success(t.requestCancelled);
    setShowCancelConfirm(false);
    setTimeout(() => onBack(), 1500);
  };

  // Determine which steps are completed
  const steps = [
    { key: 'sent', completed: true, active: request.status === 'sent' },
    { key: 'searching', completed: ['searching', 'accepted'].includes(request.status), active: request.status === 'searching' },
    { key: 'accepted', completed: request.status === 'accepted', active: request.status === 'accepted' }
  ];

  return (
    <div
      className="min-h-screen relative"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        background: 'linear-gradient(180deg, #EAF3FF 0%, #F9FBFF 50%, #FFFFFF 100%)',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif'
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md"
        style={{
          background: 'linear-gradient(180deg, rgba(234, 243, 255, 0.95) 0%, rgba(249, 251, 255, 0.8) 100%)',
          borderBottom: '1px solid rgba(168, 216, 255, 0.2)'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-xl transition-colors"
              style={{ background: '#F0F6FF' }}
            >
              <ArrowLeft size={20} style={{ color: '#2E63FF', transform: isArabic ? 'rotate(180deg)' : 'none' }} />
            </button>
            <h1 style={{ color: '#1F2937', fontWeight: 600, fontSize: '20px' }}>
              {t.title}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 pb-24">
        {/* Time Remaining Card */}
        {request.status === 'searching' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl flex items-center justify-between"
            style={{
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              border: '2px solid #FCD34D'
            }}
          >
            <div>
              <div className="text-sm mb-1" style={{ color: '#92400E', fontWeight: 500 }}>
                {t.timeRemaining}
              </div>
              <div style={{ color: '#78350F', fontWeight: 700, fontSize: '24px' }}>
                {request.timeRemaining.hours}h {request.timeRemaining.minutes}m
              </div>
            </div>
            <Clock size={32} style={{ color: '#D97706' }} />
          </motion.div>
        )}

        {/* Status Timeline */}
        <section className="mb-8">
          <h2 className="mb-6" style={{ color: '#1F2937', fontWeight: 600 }}>
            {t.requestStatus}
          </h2>
          <div
            className="p-6 rounded-[22px]"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #DDE9FF',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div className="relative">
              {steps.map((step, idx) => {
                const isLast = idx === steps.length - 1;
                return (
                  <div key={step.key} className="relative">
                    <div className="flex items-start gap-4">
                      {/* Icon Circle */}
                      <div className="relative z-10 flex-shrink-0">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.2 }}
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            background: step.completed
                              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                              : step.active
                              ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                              : '#E5E7EB',
                            boxShadow: step.completed || step.active
                              ? '0 4px 12px rgba(46, 99, 255, 0.3)'
                              : 'none'
                          }}
                        >
                          {step.completed ? (
                            <CheckCircle2 size={24} style={{ color: '#FFFFFF' }} />
                          ) : (
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ background: step.active ? '#FFFFFF' : '#9CA3AF' }}
                            />
                          )}
                        </motion.div>
                        {/* Connecting Line */}
                        {!isLast && (
                          <div
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{
                              top: '48px',
                              width: '2px',
                              height: '40px',
                              background: step.completed
                                ? 'linear-gradient(180deg, #10B981 0%, #A8D8FF 100%)'
                                : '#E5E7EB'
                            }}
                          />
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 pt-2" style={{ paddingBottom: isLast ? '0' : '40px' }}>
                        <h3
                          style={{
                            color: step.completed || step.active ? '#1F2937' : '#9CA3AF',
                            fontWeight: 600,
                            marginBottom: '4px'
                          }}
                        >
                          {t.timeline[step.key as keyof typeof t.timeline]}
                        </h3>
                        {step.active && request.status === 'searching' && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm"
                            style={{ color: '#64748B' }}
                          >
                            {isArabic
                              ? 'جارٍ البحث عن معالج متاح بالقرب منك...'
                              : 'Looking for an available therapist near you...'}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Preferred Times */}
        <section className="mb-6">
          <h3 className="mb-3" style={{ color: '#1F2937', fontWeight: 600 }}>
            {t.preferredTimes}
          </h3>
          <div className="flex flex-wrap gap-2">
            {(isArabic ? request.preferredTimesAr : request.preferredTimes).map((time, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-xl flex items-center gap-2"
                style={{
                  background: '#F0F6FF',
                  border: '1.5px solid #A8D8FF'
                }}
              >
                <Clock size={16} style={{ color: '#2E63FF' }} />
                <span style={{ color: '#2E63FF', fontWeight: 500 }}>{time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="mb-6">
          <h3 className="mb-3" style={{ color: '#1F2937', fontWeight: 600 }}>
            {t.location}
          </h3>
          <div
            className="p-4 rounded-xl flex items-start gap-3"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #DDE9FF'
            }}
          >
            <MapPin size={20} style={{ color: '#2E63FF', marginTop: '2px', flexShrink: 0 }} />
            <span style={{ color: '#1F2937' }}>
              {isArabic ? request.locationAr : request.location}
            </span>
          </div>
        </section>

        {/* Patient Notes */}
        <section className="mb-6">
          <h3 className="mb-3" style={{ color: '#1F2937', fontWeight: 600 }}>
            {t.patientNotes}
          </h3>
          <div
            className="p-4 rounded-xl"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #DDE9FF'
            }}
          >
            <div className="flex items-start gap-3">
              <FileText size={20} style={{ color: '#64748B', marginTop: '2px', flexShrink: 0 }} />
              <p style={{ color: '#1F2937', lineHeight: '1.6' }}>
                {isArabic ? request.notesAr : request.notes}
              </p>
            </div>
          </div>
        </section>

        {/* Map Preview (Static) */}
        <section className="mb-6">
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{
              height: '200px',
              background: 'linear-gradient(135deg, #E5F0FF 0%, #F0F6FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid #DDE9FF'
            }}
          >
            <div className="text-center">
              <MapPin size={48} style={{ color: '#5596FF', margin: '0 auto 12px' }} />
              <p style={{ color: '#64748B' }}>
                {isArabic ? 'معاينة الخريطة' : 'Map Preview'}
              </p>
            </div>
          </div>
        </section>

        {/* Cancel Button */}
        {request.status !== 'accepted' && request.status !== 'expired' && (
          <button
            onClick={() => setShowCancelConfirm(true)}
            className="w-full py-4 rounded-xl transition-all duration-200"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #FCA5A5',
              color: '#DC2626',
              fontWeight: 600
            }}
          >
            {t.cancelRequest}
          </button>
        )}
      </main>

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowCancelConfirm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 rounded-2xl"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: '#FEE2E2' }}
              >
                <AlertCircle size={24} style={{ color: '#DC2626' }} />
              </div>
              <div className="flex-1">
                <h3 style={{ color: '#1F2937', fontWeight: 600, marginBottom: '8px' }}>
                  {t.cancelConfirmTitle}
                </h3>
                <p style={{ color: '#64748B', fontSize: '14px' }}>
                  {t.cancelConfirmMessage}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-3 rounded-xl transition-all"
                style={{
                  background: '#F0F6FF',
                  color: '#2E63FF',
                  fontWeight: 600
                }}
              >
                {t.keepRequest}
              </button>
              <button
                onClick={handleCancelRequest}
                className="flex-1 py-3 rounded-xl transition-all"
                style={{
                  background: '#DC2626',
                  color: '#FFFFFF',
                  fontWeight: 600
                }}
              >
                {t.confirmCancel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
