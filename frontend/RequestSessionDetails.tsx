import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Upload, X, FileText, Clock, CheckCircle, Info, CreditCard, Smartphone } from 'lucide-react';

interface RequestSessionDetailsProps {
  onBack: () => void;
  isReturningPatient?: boolean;
  language?: 'en' | 'ar';
  onLanguageToggle?: () => void;
}

const translations = {
  en: {
    title: 'Request Session Details',
    subtitle: 'Your request will be sent to nearby therapists within 10 km.',
    sessionTypeLabel: 'Session Type',
    sessionTypeInfo: 'Session type auto-selected based on your visit history.',
    consultationTreatment: 'Consultation + Treatment',
    treatmentOnly: 'Treatment Only',
    selectDayLabel: 'Select Day',
    today: 'Today',
    tomorrow: 'Tomorrow',
    dayAfter: 'Day After',
    selectTimeSlotsLabel: 'Select 2–3 Preferred Time Slots',
    timeSlotsInfo: 'Selecting multiple times increases your chances of faster confirmation.',
    descriptionLabel: 'Describe your condition (optional)',
    descriptionPlaceholder: 'Briefly describe your symptoms or condition (e.g., back pain for 2 weeks).',
    attachmentLabel: 'Attach files (optional)',
    uploadButton: 'Upload Report',
    fileHint: 'PDF, Image or Doc up to 10 MB',
    confirmationNote: 'If no therapist confirms within 10 hours, the request will be cancelled automatically.',
    paymentTitle: 'Payment Method',
    paymentSubtitle: 'Secure your session now – you won\'t be charged until a therapist confirms your booking.',
    applePayButton: 'Pay with Apple Pay',
    cardPaymentTitle: 'Credit / Debit Card',
    cardNumber: 'Card Number',
    cardExpiry: 'MM/YY',
    cardCVV: 'CVV',
    saveCard: 'Save card for future bookings',
    sessionPrice: 'SAR 330',
    priceLabel: 'Session Price',
    confirmationTime: '≤ 1 hour',
    confirmationTimeLabel: 'Estimated Confirmation Time',
    noChargeNote: 'No charges if request is not confirmed.',
    sendButton: 'Send Request & Secure Session',
    cancelButton: 'Cancel',
    tipText: "You'll receive a notification once a therapist accepts your request.",
    successMessage: "Your request has been sent! You'll be notified when a therapist accepts.",
    poweredBy: 'Powered by Seventic'
  },
  ar: {
    title: 'تفاصيل طلب الجلسة',
    subtitle: 'سيتم إرسال طلبك للمعالجين القريبين ضمن ٠٠ كم.',
    sessionTypeLabel: 'نوع الجلسة',
    sessionTypeInfo: 'تم اختيار نوع الجلسة تلقائياً بناءً على سجل زياراتك.',
    consultationTreatment: 'استشارة + علاج',
    treatmentOnly: 'علاج فقط',
    selectDayLabel: 'اختر اليوم المناب',
    today: 'اليوم',
    tomorrow: 'غداً',
    dayAfter: 'بعد غد',
    selectTimeSlotsLabel: 'اختر من ٢ إلى ٣ مواعيد مفضلة',
    timeSlotsInfo: 'اختيار عدة أوقات يزيد من فرص التأكيد بشكل أسرع.',
    descriptionLabel: 'صف حالتك باختصار (اختياري)',
    descriptionPlaceholder: 'صف أعراضك أو حالتك بإيجاز (مثلاً: ألم في الظهر منذ أسبوعين).',
    attachmentLabel: 'أرفق ملفات (اختياري)',
    uploadButton: 'رفع تقرير طبي',
    fileHint: 'PDF أو صورة أو مستند حتى ٠٠ ميجا',
    confirmationNote: 'إذا لم يقم أي معالج بالتأكيد خلال ٠٠ ساعات، سيتم إلغاء الطلب تلقائياً.',
    paymentTitle: 'طريقة الدفع',
    paymentSubtitle: 'احجز جلستك الآن – لن يتم الخصم إلا بعد تأكيد المعالج للحجز.',
    applePayButton: 'الدفع بواسطة Apple Pay',
    cardPaymentTitle: 'بطاقة ائتمان / خصم',
    cardNumber: 'رقم البطاقة',
    cardExpiry: 'الشهر/السنة',
    cardCVV: 'CVV',
    saveCard: 'حفظ البطاقة للحجوزات المستقبلية',
    sessionPrice: '٣٣٠ ريال',
    priceLabel: 'سعر الجلسة',
    confirmationTime: '≤ ساعة',
    confirmationTimeLabel: 'الوقت المتوقع للتأكيد',
    noChargeNote: 'لن يتم الخصم إذا لم يتم تأكيد الطلب.',
    sendButton: 'إرسال الطلب وتأكيد الحجز',
    cancelButton: 'إلغاء',
    tipText: 'سوف تتلقى إشعاراً عندما يقبل معالج طلبك.',
    successMessage: 'تم إرسال طلبك! سيتم إخطارك عندما يقبل معالج طلبك.',
    poweredBy: 'مدعوم من سيفنتك'
  }
};

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
];

const timeSlotsAr = [
  '٨:٠٠ ص', '٩:٠٠ ص', '٠٠:٠٠ ص', '١١:٠٠ ص',
  '٠٢:٠٠ م', '١:٠٠ م', '٢:٠٠ م', '٣:٠٠ م',
  '٤:٠٠ م', '٥:٠٠ م', '٦:٠٠ م', '٧:٠٠ م', '٨:٠٠ م'
];

export default function RequestSessionDetails({
  onBack,
  isReturningPatient = false,
  language = 'en',
  onLanguageToggle
}: RequestSessionDetailsProps) {
  const [selectedDay, setSelectedDay] = useState<'today' | 'tomorrow' | 'dayAfter'>('today');
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [description, setDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'apple-pay' | 'card'>('apple-pay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];
  const isRTL = language === 'ar';
  const slots = language === 'ar' ? timeSlotsAr : timeSlots;

  const handleSlotToggle = (index: number) => {
    if (selectedSlots.includes(index)) {
      setSelectedSlots(selectedSlots.filter(i => i !== index));
    } else if (selectedSlots.length < 3) {
      setSelectedSlots([...selectedSlots, index]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setUploadedFile(file);
    }
  };

  const handleSendRequest = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onBack();
    }, 2500);
  };

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: 'linear-gradient(180deg, #EAF3FF 0%, #F9FBFF 100%)',
        direction: isRTL ? 'rtl' : 'ltr'
      }}
    >
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="mx-6 p-8 rounded-3xl text-center"
              style={{
                background: 'white',
                maxWidth: '340px',
                boxShadow: '0 20px 60px rgba(85, 150, 255, 0.3)'
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle 
                  size={64} 
                  style={{ 
                    color: '#5596FF',
                    margin: '0 auto 16px'
                  }}
                />
              </motion.div>
              <p
                style={{
                  color: '#1F2937',
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                {t.successMessage}
              </p>
              <p style={{ color: '#6B7280', fontSize: '14px' }}>
                💙
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div 
        className="relative"
        style={{
          background: 'linear-gradient(135deg, #EAF3FF 0%, #F9FBFF 100%)',
          padding: '24px 24px 32px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)'
        }}
      >
        <button
          onClick={onBack}
          className="mb-6 p-2 rounded-xl transition-all"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            color: '#5596FF',
            position: 'absolute',
            top: '24px',
            [isRTL ? 'right' : 'left']: '24px'
          }}
        >
          <ArrowLeft 
            size={20} 
            style={{ 
              transform: isRTL ? 'rotate(180deg)' : 'none'
            }}
          />
        </button>

        <div className="text-center" style={{ marginTop: '40px' }}>
          {/* Subtle Icon */}
          <div 
            className="inline-flex items-center justify-center mb-3"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
              boxShadow: '0 4px 16px rgba(85, 150, 255, 0.3)'
            }}
          >
            <Clock size={24} style={{ color: 'white' }} />
          </div>

          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#1F2937',
              marginBottom: '8px',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.title}
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#6B7280',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px' }}>
        {/* Session Type Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <label
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#374151',
                fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
              }}
            >
              {t.sessionTypeLabel}
            </label>
            <div className="relative group">
              <Info size={16} style={{ color: '#9CA3AF' }} />
              <div
                className="absolute bottom-full mb-2 hidden group-hover:block"
                style={{
                  [isRTL ? 'right' : 'left']: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  background: '#1F2937',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  zIndex: 10
                }}
              >
                {t.sessionTypeInfo}
              </div>
            </div>
          </div>
          
          <div
            className="p-4 rounded-xl"
            style={{
              background: '#F3F4F6',
              border: '1px solid #E5E7EB'
            }}
          >
            <p
              style={{
                fontSize: '14px',
                color: '#6B7280',
                fontWeight: 500,
                fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
              }}
            >
              {isReturningPatient ? t.treatmentOnly : t.consultationTreatment}
            </p>
          </div>
          <p
            className="mt-2"
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              fontStyle: 'italic',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.sessionTypeInfo}
          </p>
        </div>

        {/* Day Selection */}
        <div className="mb-6">
          <label
            className="block mb-3"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.selectDayLabel}
          </label>
          
          <div className="flex gap-3">
            {(['today', 'tomorrow', 'dayAfter'] as const).map((day) => (
              <motion.button
                key={day}
                onClick={() => setSelectedDay(day)}
                className="flex-1 py-3 rounded-xl transition-all"
                style={{
                  background: selectedDay === day
                    ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                    : 'white',
                  color: selectedDay === day ? 'white' : '#6B7280',
                  fontWeight: 600,
                  fontSize: '14px',
                  border: selectedDay === day ? 'none' : '1.5px solid #E5E7EB',
                  boxShadow: selectedDay === day ? '0 4px 12px rgba(85, 150, 255, 0.3)' : 'none',
                  fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {t[day]}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Time Slots Selection */}
        <div className="mb-6">
          <label
            className="block mb-2"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.selectTimeSlotsLabel}
          </label>
          <p
            className="mb-3"
            style={{
              fontSize: '12px',
              color: '#6B7280',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.timeSlotsInfo}
          </p>

          <div className="grid grid-cols-3 gap-2">
            {slots.map((slot, index) => {
              const isSelected = selectedSlots.includes(index);
              return (
                <motion.button
                  key={index}
                  onClick={() => handleSlotToggle(index)}
                  className="py-2.5 px-3 rounded-xl transition-all"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                      : 'white',
                    color: isSelected ? 'white' : '#6B7280',
                    fontSize: '12px',
                    fontWeight: 500,
                    border: isSelected ? 'none' : '1.5px solid #E5E7EB',
                    boxShadow: isSelected ? '0 2px 8px rgba(85, 150, 255, 0.3)' : 'none',
                    opacity: !isSelected && selectedSlots.length >= 3 ? 0.5 : 1,
                    fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                  }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!isSelected && selectedSlots.length >= 3}
                >
                  {slot}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Case Description */}
        <div className="mb-6">
          <label
            className="block mb-3"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.descriptionLabel}
          </label>
          
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.descriptionPlaceholder}
            rows={4}
            className="w-full p-4 rounded-xl resize-none"
            style={{
              background: 'white',
              border: '1.5px solid #E5E7EB',
              fontSize: '14px',
              color: '#1F2937',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)'
            }}
          />
        </div>

        {/* Attachment Section */}
        <div className="mb-6">
          <label
            className="block mb-3"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.attachmentLabel}
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {!uploadedFile ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 rounded-xl flex items-center justify-center gap-2 transition-all"
              style={{
                background: 'white',
                border: '1.5px dashed #CBD5E1',
                color: '#5596FF'
              }}
            >
              <Upload size={20} />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                }}
              >
                {t.uploadButton}
              </span>
            </button>
          ) : (
            <div
              className="p-4 rounded-xl flex items-center justify-between"
              style={{
                background: '#F0F6FF',
                border: '1.5px solid #5596FF'
              }}
            >
              <div className="flex items-center gap-3">
                <FileText size={20} style={{ color: '#5596FF' }} />
                <span
                  style={{
                    fontSize: '14px',
                    color: '#1F2937',
                    fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                  }}
                >
                  {uploadedFile.name}
                </span>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="p-1"
                style={{ color: '#6B7280' }}
              >
                <X size={18} />
              </button>
            </div>
          )}

          <p
            className="mt-2"
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.fileHint}
          </p>
        </div>

        {/* Pricing Card */}
        {selectedSlots.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div
              className="p-6 rounded-3xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #EAF3FF 0%, #D0E7FF 100%)',
                border: '2px solid #A8D8FF',
                boxShadow: '0 8px 32px rgba(77, 124, 255, 0.12)'
              }}
            >
              {/* Discount Badge */}
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full"
                style={{
                  background: '#10B981',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}
              >
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 700,
                    fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                  }}
                >
                  {language === 'ar' ? '٪٣٣ خصم' : '33% OFF'}
                </span>
              </div>

              <h3
                className="mb-4"
                style={{
                  color: '#1A2A42',
                  fontSize: '16px',
                  fontWeight: 600,
                  fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                }}
              >
                {language === 'ar' ? 'سعر الجلسة الأولى' : 'First Session Price'}
              </h3>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      color: '#64748B',
                      fontSize: '14px',
                      fontWeight: 600,
                      fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                    }}
                  >
                    {language === 'ar' ? 'استشارة' : 'Consultation'}
                  </span>
                  <span
                    style={{
                      color: '#64748B',
                      fontSize: '14px',
                      fontWeight: 600,
                      textDecoration: 'line-through',
                      fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                    }}
                  >
                    {language === 'ar' ? 'ريال ٠٠٠' : 'SAR 100'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      color: '#64748B',
                      fontSize: '14px',
                      fontWeight: 600,
                      fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                    }}
                  >
                    {language === 'ar' ? 'جلسة علاج' : 'Treatment Session'}
                  </span>
                  <span
                    style={{
                      color: '#64748B',
                      fontSize: '14px',
                      fontWeight: 600,
                      textDecoration: 'line-through',
                      fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                    }}
                  >
                    {language === 'ar' ? 'ريال ٣٥٠' : 'SAR 350'}
                  </span>
                </div>
                <div
                  style={{
                    height: '1px',
                    background: '#A8D8FF',
                    margin: '12px 0'
                  }}
                />
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      color: '#64748B',
                      fontSize: '14px',
                      fontWeight: 600,
                      fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                    }}
                  >
                    {language === 'ar' ? 'السعر الأصلي' : 'Original Price'}
                  </span>
                  <span
                    style={{
                      color: '#64748B',
                      fontSize: '14px',
                      fontWeight: 600,
                      textDecoration: 'line-through',
                      fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                    }}
                  >
                    {language === 'ar' ? 'ريال ٤٥٠' : 'SAR 450'}
                  </span>
                </div>
              </div>

              {/* Final Price */}
              <div
                className="p-4 rounded-2xl text-center"
                style={{
                  background: 'linear-gradient(135deg, #4D7CFF 0%, #2E63FF 100%)',
                  boxShadow: '0 8px 24px rgba(77, 124, 255, 0.25)'
                }}
              >
                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: '14px',
                    opacity: 0.9,
                    marginBottom: '4px',
                    fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                  }}
                >
                  {language === 'ar' ? 'السعر بعد الخصم' : 'Discounted Price'}
                </div>
                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: '36px',
                    fontWeight: 700,
                    fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                  }}
                >
                  {language === 'ar' ? 'ريال ٣٠٠' : 'SAR 300'}
                </div>
              </div>

              {/* Note */}
              <p
                className="mt-4 text-center"
                style={{
                  fontSize: '12px',
                  color: '#64748B',
                  fontStyle: 'italic',
                  fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
                }}
              >
                {language === 'ar' 
                  ? 'لن يتم الخصم حتى يؤكد المعالج حجزك' 
                  : 'No charge until therapist confirms your booking'}
              </p>
            </div>
          </motion.div>
        )}

        {/* Confirmation Note */}
        <div
          className="mb-6 p-4 rounded-xl flex items-start gap-3"
          style={{
            background: '#FEF3C7',
            border: '1px solid #FDE68A'
          }}
        >
          <Clock size={16} style={{ color: '#D97706', marginTop: '2px', flexShrink: 0 }} />
          <p
            style={{
              fontSize: '12px',
              color: '#92400E',
              lineHeight: '1.5',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.confirmationNote}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mb-6">
          <motion.button
            onClick={handleSendRequest}
            disabled={selectedSlots.length < 2}
            className="w-full py-4 rounded-xl text-white mb-3"
            style={{
              background: selectedSlots.length >= 2
                ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                : '#E5E7EB',
              fontWeight: 700,
              fontSize: '16px',
              boxShadow: selectedSlots.length >= 2 ? '0 4px 16px rgba(85, 150, 255, 0.3)' : 'none',
              cursor: selectedSlots.length >= 2 ? 'pointer' : 'not-allowed',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
            whileTap={selectedSlots.length >= 2 ? { scale: 0.98 } : {}}
          >
            {t.sendButton}
          </motion.button>

          <button
            onClick={onBack}
            className="w-full py-2"
            style={{
              color: '#6B7280',
              fontSize: '14px',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.cancelButton}
          </button>
        </div>

        {/* Footer Tip */}
        <div className="text-center mb-6">
          <p
            style={{
              fontSize: '12px',
              color: '#9CA3AF',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.tipText}
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={onLanguageToggle}
            className="px-4 py-2 rounded-lg transition-all"
            style={{
              background: language === 'en' ? '#5596FF' : '#F3F4F6',
              color: language === 'en' ? 'white' : '#6B7280',
              fontSize: '12px',
              fontWeight: 600
            }}
          >
            EN
          </button>
          <button
            onClick={onLanguageToggle}
            className="px-4 py-2 rounded-lg transition-all"
            style={{
              background: language === 'ar' ? '#5596FF' : '#F3F4F6',
              color: language === 'ar' ? 'white' : '#6B7280',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'Tajawal, sans-serif'
            }}
          >
            عربي
          </button>
        </div>

        {/* Powered by Seventic */}
        <div className="text-center">
          <p
            style={{
              fontSize: '11px',
              color: '#9CA3AF',
              fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
            }}
          >
            {t.poweredBy}
          </p>
        </div>
      </div>
    </div>
  );
}