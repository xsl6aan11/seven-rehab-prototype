import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type Language = 'EN' | 'AR';

interface RequestDetailsProps {
  language: Language;
  onLanguageToggle: () => void;
  onBack: () => void;
  onAccept: (requestId: string) => void;
  onViewPatientInfo?: (patientId: string) => void;
  requestData?: {
    id: string;
    patientName: string;
    patientAvatar?: string;
    tag: string;
    sessionType: string;
    scheduledTime: string;
    district: string;
    caseDescription: string;
    duration: string;
    price: string;
    address: string;
    hoursRemaining: number;
  };
}

interface Content {
  title: string;
  directRequestTag: string;
  sessionType: string;
  scheduledTime: string;
  caseDescriptionLabel: string;
  sessionSummaryLabel: string;
  duration: string;
  price: string;
  address: string;
  acceptButton: string;
  rejectButton: string;
  footerNote: string;
  confirmationTitle: string;
  confirmationMessage: string;
  rejectTitle: string;
  rejectMessage: string;
  rejectReasonLabel: string;
  rejectReasonPlaceholder: string;
  cancelButton: string;
  confirmButton: string;
  successToast: string;
  rejectToast: string;
}

const content: Record<Language, Content> = {
  EN: {
    title: 'Request Detail',
    directRequestTag: 'Direct Request — within 5 km',
    sessionType: 'Session Type',
    scheduledTime: 'Scheduled Time',
    caseDescriptionLabel: 'Case Description',
    sessionSummaryLabel: 'Session Summary',
    duration: 'Duration',
    price: 'Price',
    address: 'Address',
    acceptButton: 'Accept Request',
    rejectButton: 'Reject Request',
    footerNote: 'You have {hours} hours to confirm before this session is automatically canceled.',
    confirmationTitle: 'Confirm Acceptance',
    confirmationMessage: 'Are you sure you want to accept this session request?',
    rejectTitle: 'Reject Request',
    rejectMessage: 'Please provide a reason for rejecting this request.',
    rejectReasonLabel: 'Reason for rejection',
    rejectReasonPlaceholder: 'e.g., Schedule conflict, too far, etc.',
    cancelButton: 'Cancel',
    confirmButton: 'Confirm',
    successToast: 'Session Added to Schedule',
    rejectToast: 'Request rejected successfully'
  },
  AR: {
    title: 'تفاصيل الطلب',
    directRequestTag: 'طلب مباشر — ضمن 5 كم',
    sessionType: 'نوع الجلسة',
    scheduledTime: 'الوقت المحدد',
    caseDescriptionLabel: 'وصف الحالة',
    sessionSummaryLabel: 'ملخص الجلسة',
    duration: 'المدة',
    price: 'السعر',
    address: 'العنوان',
    acceptButton: 'قبول الطلب',
    rejectButton: 'رفض الطلب',
    footerNote: 'لديك {hours} ساعات للتأكيد قبل إلغاء الجلسة تلقائيًا.',
    confirmationTitle: 'تأكيد القبول',
    confirmationMessage: 'هل أنت متأكد من قبول طلب الجلسة هذا؟',
    rejectTitle: 'رفض الطلب',
    rejectMessage: 'يرجى تقديم سبب لرفض هذا الطلب.',
    rejectReasonLabel: 'سبب الرفض',
    rejectReasonPlaceholder: 'مثال: تعارض في الجدول، المسافة بعيدة، إلخ.',
    cancelButton: 'إلغاء',
    confirmButton: 'تأكيد',
    successToast: 'تمت إضافة الجلسة إلى الجدول',
    rejectToast: 'تم رفض الطلب بنجاح'
  }
};

export function RequestDetails({ 
  language, 
  onLanguageToggle, 
  onBack, 
  onAccept,
  onViewPatientInfo,
  requestData = {
    id: 'req-1',
    patientName: 'Sarah Khaled',
    patientAvatar: '👩',
    tag: 'Direct Request — within 5 km',
    sessionType: 'Consultation + Treatment',
    scheduledTime: '3:00 PM — Today',
    district: 'Al Nahda District',
    caseDescription: 'Post-surgery shoulder stiffness.\nMild pain when lifting arm.\nNo chronic conditions reported.',
    duration: '45 min — 60 min',
    price: 'SAR 330 / Session',
    address: 'Patient Home — Riyadh Al Nahda',
    hoursRemaining: 4
  }
}: RequestDetailsProps) {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const isArabic = language === 'AR';
  const requestContent = content[language];

  const handleAccept = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(requestContent.successToast, {
        duration: 3000,
        style: {
          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
        }
      });
      setIsProcessing(false);
      // Call onAccept which will handle navigation
      setTimeout(() => onAccept(requestData.id), 500);
    }, 1000);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error(isArabic ? 'يرجى تقديم سبب للرفض' : 'Please provide a reason', {
        duration: 3000,
        style: {
          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
        }
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      toast.success(requestContent.rejectToast, {
        duration: 3000,
        style: {
          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
        }
      });
      setShowRejectDialog(false);
      setRejectReason('');
      setIsProcessing(false);
      setTimeout(() => onBack(), 1000);
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
                  background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#1E40AF'
                }}
              >
                {isArabic ? 'طلب مباشر — ضمن 5 كم' : requestData.tag}
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

            {/* Scheduled Time */}
            <div className="mb-3">
              <p 
                className="text-[13px] mb-1"
                style={{ 
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  color: '#808B9A' 
                }}
              >
                {requestContent.scheduledTime}
              </p>
              <p 
                className="text-[15px]"
                style={{ 
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  fontWeight: 600,
                  color: '#2E63FF' 
                }}
              >
                {requestData.scheduledTime}
              </p>
            </div>

            {/* Location */}
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
                {requestData.district}
              </p>
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

          {/* Session Summary Mini Card */}
          <motion.div
            className="rounded-2xl p-5"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 3px 12px rgba(0, 0, 0, 0.06)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h4 
              className="text-[14px] mb-4"
              style={{ 
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, sans-serif',
                fontWeight: 600,
                color: '#1F2937' 
              }}
            >
              {requestContent.sessionSummaryLabel}
            </h4>

            {/* Duration */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: '#EAF3FF' }}
              >
                <Clock size={20} color="#2E63FF" />
              </div>
              <div>
                <p 
                  className="text-[12px]"
                  style={{ 
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                    color: '#808B9A' 
                  }}
                >
                  {requestContent.duration}
                </p>
                <p 
                  className="text-[15px]"
                  style={{ 
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                    fontWeight: 600,
                    color: '#1F2937' 
                  }}
                >
                  {requestData.duration}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: '#EAF3FF' }}
              >
                <MapPin size={20} color="#2E63FF" />
              </div>
              <div>
                <p 
                  className="text-[12px]"
                  style={{ 
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                    color: '#808B9A' 
                  }}
                >
                  {requestContent.address}
                </p>
                <p 
                  className="text-[14px]"
                  style={{ 
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                    fontWeight: 500,
                    color: '#475569' 
                  }}
                >
                  {requestData.address}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {/* Accept Button */}
            <button
              onClick={handleAccept}
              disabled={isProcessing}
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

            {/* Reject Button */}
            <button
              onClick={() => setShowRejectDialog(true)}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: '#FFFFFF',
                border: '2px solid #E53E3E',
                color: '#E53E3E',
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                fontWeight: 600,
                fontSize: '16px'
              }}
            >
              <XCircle size={20} />
              {requestContent.rejectButton}
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
            transition={{ duration: 0.3, delay: 0.5 }}
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

      {/* Reject Dialog */}
      {showRejectDialog && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowRejectDialog(false)}
        >
          <motion.div
            className="w-[90%] max-w-[340px] rounded-2xl p-6"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-[18px] mb-2"
              style={{
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, sans-serif',
                fontWeight: 700,
                color: '#1F2937',
                textAlign: isArabic ? 'right' : 'left'
              }}
            >
              {requestContent.rejectTitle}
            </h3>
            <p
              className="text-[14px] mb-4"
              style={{
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                color: '#6B7280',
                textAlign: isArabic ? 'right' : 'left'
              }}
            >
              {requestContent.rejectMessage}
            </p>

            <div className="mb-5" dir={isArabic ? 'rtl' : 'ltr'}>
              <label
                className="text-[13px] mb-2 block"
                style={{
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  fontWeight: 600,
                  color: '#374151'
                }}
              >
                {requestContent.rejectReasonLabel}
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder={requestContent.rejectReasonPlaceholder}
                className="w-full min-h-[100px] resize-none rounded-xl p-3"
                style={{
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  fontSize: '14px',
                  border: '1px solid #D1D5DB',
                  outline: 'none'
                }}
                dir={isArabic ? 'rtl' : 'ltr'}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectDialog(false);
                  setRejectReason('');
                }}
                disabled={isProcessing}
                className="flex-1 py-2.5 px-4 rounded-xl transition-all duration-200"
                style={{
                  background: '#F3F4F6',
                  color: '#6B7280',
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                {requestContent.cancelButton}
              </button>
              <button
                onClick={handleReject}
                disabled={isProcessing}
                className="flex-1 py-2.5 px-4 rounded-xl transition-all duration-200"
                style={{
                  background: '#E53E3E',
                  color: '#FFFFFF',
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                {requestContent.confirmButton}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}