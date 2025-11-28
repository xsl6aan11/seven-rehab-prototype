import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Clock, Calendar, CheckCircle, Upload, X, FileText, CreditCard, Smartphone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TimeSlot {
  time: string;
  available: boolean;
  spotsLeft?: number;
}

interface DateOption {
  date: string;
  dateAr: string;
  day: string;
  dayAr: string;
  month: string;
  monthAr: string;
  slots: TimeSlot[];
}

interface TherapistBookingProps {
  therapist: {
    id: string;
    name: string;
    nameAr: string;
    image: string;
    status: 'online' | 'offline';
    specialty: string;
    specialtyAr: string;
  };
  sessionType: 'consultation-treatment' | 'treatment-only';
  availableDates: DateOption[];
  language?: 'en' | 'ar';
  onBack: () => void;
  onConfirmBooking: (booking: { date: string; time: string }) => void;
}

const content = {
  en: {
    backButton: 'Back',
    logo: 'Powered by Seventic',
    online: 'Online Now',
    offline: 'Offline',
    consultationTreatment: 'Consultation + Treatment',
    treatmentOnly: 'Treatment Session',
    title: 'Choose your preferred time',
    subtitle: 'Booking will be confirmed within an hour',
    sessionTypeLabel: 'Session Type',
    datePickerTitle: 'Select Date',
    timePickerTitle: 'Choose the right time',
    sessionDuration: 'All sessions are 45-60 minutes',
    caseDescriptionLabel: 'Describe your condition (optional)',
    caseDescriptionPlaceholder: 'Briefly describe your symptoms or condition (e.g., back pain for 2 weeks).',
    attachmentLabel: 'Attach files (optional)',
    uploadButton: 'Upload Medical Report',
    fileHint: 'PDF, Image or Doc up to 10 MB',
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
    summaryTitle: 'Booking Summary',
    selectedDate: 'Selected Date & Time',
    sessionType: 'Session Type',
    confirmButton: 'Send Request & Secure Session',
    chooseAnother: 'Choose Another Time',
    successMessage: '✅ Request sent! Confirmation within an hour',
    motivational: 'Your healing journey begins with one step 💙',
    selectDateFirst: 'Please select a date',
    selectTimeFirst: 'Please select a time slot',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  ar: {
    backButton: 'رجوع',
    logo: 'Powered by Seventic',
    online: 'متصل الآن',
    offline: 'غير متصل',
    consultationTreatment: 'استشارة + جلسة علاجية',
    treatmentOnly: 'جلسة علاجية',
    title: 'اختر الوقت المناسب',
    subtitle: 'سيتم تأكيد الحجز خلال ساعة',
    sessionTypeLabel: 'نوع الجلسة',
    datePickerTitle: 'اختر التاريخ',
    timePickerTitle: 'اختر الوقت المناسب',
    sessionDuration: 'كل الجلسات مدتها ٤٥ إلى ٦٠ دقيقة',
    caseDescriptionLabel: 'صف حالتك باختصار (اختياري)',
    caseDescriptionPlaceholder: 'صف أعراضك أو حالتك بإيجاز (مثلاً: ألم في الظهر منذ أسبوعين).',
    attachmentLabel: 'أرفق ملفات (اختياري)',
    uploadButton: 'رفع تقرير طبي',
    fileHint: 'PDF أو صورة أو مستند حتى ٠ ميجا',
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
    summaryTitle: 'ملخص الحجز',
    selectedDate: 'التاريخ والوقت المحدد',
    sessionType: 'نوع الجلسة',
    confirmButton: 'إرسال الطلب وتأكيد الحجز',
    chooseAnother: 'اختر وقت آخر',
    successMessage: '✅ تم إرسال طلبك، سيتم التأكيد خلال ساعة',
    motivational: 'تبدأ رحلة العلاج بخطوة واحدة 💙',
    selectDateFirst: 'الرجاء اختيار التاريخ',
    selectTimeFirst: 'الرجاء اختيار الوقت',
    days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
  }
};

export function TherapistBooking({
  therapist,
  sessionType,
  availableDates,
  language = 'en',
  onBack,
  onConfirmBooking
}: TherapistBookingProps) {
  const t = content[language];
  const isRTL = language === 'ar';
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'apple-pay' | 'card'>('apple-pay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dateScrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to first available date on mount
  useEffect(() => {
    const firstAvailableIndex = availableDates.findIndex(date => 
      date.slots.some(slot => slot.available)
    );
    if (firstAvailableIndex !== -1) {
      setSelectedDateIndex(firstAvailableIndex);
      // Auto-scroll to this date
      setTimeout(() => {
        const element = dateScrollRef.current?.children[firstAvailableIndex] as HTMLElement;
        element?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }, 100);
    }
  }, [availableDates]);

  const selectedDate = selectedDateIndex !== null ? availableDates[selectedDateIndex] : null;
  const sessionTypeText = sessionType === 'consultation-treatment' 
    ? t.consultationTreatment 
    : t.treatmentOnly;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setUploadedFile(file);
    }
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      return;
    }

    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Call parent callback after showing success
      setTimeout(() => {
        onConfirmBooking({
          date: isRTL ? selectedDate.dateAr : selectedDate.date,
          time: selectedTime
        });
      }, 2000);
    }, 1000);
  };

  const handleDateSelect = (index: number) => {
    setSelectedDateIndex(index);
    setSelectedTime(null); // Reset time selection when date changes
    
    // Scroll selected date to center
    const element = dateScrollRef.current?.children[index] as HTMLElement;
    element?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #EAF3FF 0%, #F9FBFF 100%)',
        direction: isRTL ? 'rtl' : 'ltr',
        fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          borderBottom: '1px solid rgba(168, 216, 255, 0.2)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
            style={{ color: '#2E63FF' }}
          >
            {isRTL ? (
              <>
                <span style={{ fontSize: '15px', fontWeight: 500 }}>{t.backButton}</span>
                <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} />
              </>
            ) : (
              <>
                <ArrowLeft size={20} />
                <span style={{ fontSize: '15px', fontWeight: 500 }}>{t.backButton}</span>
              </>
            )}
          </button>

          <div style={{ color: '#2E63FF', fontSize: '13px', fontWeight: 600 }}>
            {t.logo}
          </div>
        </div>

        {/* Compact Therapist Card */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: '#FFFFFF',
            border: '1px solid #DDE9FF',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ImageWithFallback
                src={therapist.image}
                alt={isRTL ? therapist.nameAr : therapist.name}
                className="rounded-full object-cover"
                style={{ width: '56px', height: '56px' }}
              />
              {therapist.status === 'online' && (
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 rounded-full"
                  style={{
                    background: '#10B981',
                    border: '2px solid #FFFFFF'
                  }}
                />
              )}
            </div>
            <div className="flex-1">
              <div
                className="mb-1"
                style={{ color: '#1F2937', fontSize: '16px', fontWeight: 600 }}
              >
                {isRTL ? therapist.nameAr : therapist.name}
              </div>
              <div
                className="mb-1"
                style={{ color: '#6B7280', fontSize: '13px' }}
              >
                {isRTL ? therapist.specialtyAr : therapist.specialty}
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: therapist.status === 'online' ? '#10B981' : '#9CA3AF' }}
                />
                <span
                  style={{
                    color: therapist.status === 'online' ? '#10B981' : '#9CA3AF',
                    fontSize: '12px',
                    fontWeight: 500
                  }}
                >
                  {therapist.status === 'online' ? t.online : t.offline}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-8">
        {/* Booking Details Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <h1
            className="mb-2"
            style={{
              color: '#1F2937',
              fontSize: '24px',
              fontWeight: 700
            }}
          >
            {t.title}
          </h1>
          <p
            className="mb-4"
            style={{
              color: '#6B7280',
              fontSize: '14px'
            }}
          >
            {t.subtitle}
          </p>

          <div
            className="h-px mb-4"
            style={{ background: 'rgba(0, 0, 0, 0.1)' }}
          />

          {/* Session Type Tag */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(85, 150, 255, 0.1) 0%, rgba(46, 99, 255, 0.1) 100%)',
              border: '1.5px solid #5596FF'
            }}
          >
            <Clock size={16} style={{ color: '#2E63FF' }} />
            <span
              style={{
                color: '#2E63FF',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              {sessionTypeText}
            </span>
          </div>
        </motion.section>

        {/* Date Picker */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6"
        >
          <h2
            className="mb-3"
            style={{
              color: '#1F2937',
              fontSize: '18px',
              fontWeight: 600
            }}
          >
            {t.datePickerTitle}
          </h2>

          <div
            ref={dateScrollRef}
            className="flex gap-3 overflow-x-auto pb-3"
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {availableDates.map((date, index) => {
              const isSelected = selectedDateIndex === index;
              const hasAvailableSlots = date.slots.some(slot => slot.available);

              return (
                <motion.button
                  key={index}
                  onClick={() => hasAvailableSlots && handleDateSelect(index)}
                  disabled={!hasAvailableSlots}
                  whileTap={hasAvailableSlots ? { scale: 0.95 } : {}}
                  className="flex-shrink-0 rounded-2xl p-4 transition-all duration-200"
                  style={{
                    scrollSnapAlign: 'center',
                    minWidth: '110px',
                    background: isSelected
                      ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                      : '#FFFFFF',
                    border: isSelected ? 'none' : '1.5px solid #DDE9FF',
                    boxShadow: isSelected
                      ? '0 8px 24px rgba(46, 99, 255, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.04)',
                    opacity: hasAvailableSlots ? 1 : 0.5,
                    cursor: hasAvailableSlots ? 'pointer' : 'not-allowed'
                  }}
                >
                  <div
                    className="text-center mb-1"
                    style={{
                      color: isSelected ? '#FFFFFF' : '#6B7280',
                      fontSize: '13px',
                      fontWeight: 500
                    }}
                  >
                    {isRTL ? date.dayAr : date.day}
                  </div>
                  <div
                    className="text-center mb-1"
                    style={{
                      color: isSelected ? '#FFFFFF' : '#1F2937',
                      fontSize: '20px',
                      fontWeight: 700
                    }}
                  >
                    {date.date}
                  </div>
                  <div
                    className="text-center"
                    style={{
                      color: isSelected ? 'rgba(255, 255, 255, 0.9)' : '#9CA3AF',
                      fontSize: '12px'
                    }}
                  >
                    {isRTL ? date.monthAr : date.month}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* Time Slot Selector */}
        <AnimatePresence mode="wait">
          {selectedDate && (
            <motion.section
              key={selectedDateIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <h2
                className="mb-3"
                style={{
                  color: '#1F2937',
                  fontSize: '18px',
                  fontWeight: 600
                }}
              >
                {t.timePickerTitle}
              </h2>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {selectedDate.slots.map((slot, index) => {
                  const isSelected = selectedTime === slot.time;
                  const almostFull = slot.spotsLeft && slot.spotsLeft <= 2;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      whileTap={slot.available ? { scale: 0.95 } : {}}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="rounded-xl py-3 px-2 transition-all duration-200"
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                          : slot.available
                            ? almostFull
                              ? 'rgba(251, 191, 36, 0.1)'
                              : '#F9FBFF'
                            : '#F3F4F6',
                        border: isSelected
                          ? 'none'
                          : slot.available
                            ? almostFull
                              ? '1.5px solid #F59E0B'
                              : '1.5px solid #C7DDFF'
                            : '1.5px solid #E5E7EB',
                        color: isSelected
                          ? '#FFFFFF'
                          : slot.available
                            ? almostFull
                              ? '#F59E0B'
                              : '#2E63FF'
                            : '#9CA3AF',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                        opacity: slot.available ? 1 : 0.5,
                        boxShadow: isSelected ? '0 4px 12px rgba(46, 99, 255, 0.3)' : 'none'
                      }}
                    >
                      {slot.time}
                      {almostFull && slot.available && !isSelected && (
                        <div style={{ fontSize: '10px', marginTop: '2px', opacity: 0.8 }}>
                          {slot.spotsLeft} spots
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <p
                className="text-center"
                style={{
                  color: '#6B7280',
                  fontSize: '12px',
                  fontStyle: 'italic'
                }}
              >
                {t.sessionDuration}
              </p>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Case Description Section */}
        {selectedDate && selectedTime && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6"
          >
            <label
              className="block mb-3"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#374151'
              }}
            >
              {t.caseDescriptionLabel}
            </label>
            
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.caseDescriptionPlaceholder}
              rows={4}
              className="w-full p-4 rounded-xl resize-none"
              style={{
                background: 'white',
                border: '1.5px solid #E5E7EB',
                fontSize: '14px',
                color: '#1F2937',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)'
              }}
            />
          </motion.section>
        )}

        {/* Attachment Section */}
        {selectedDate && selectedTime && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-6"
          >
            <label
              className="block mb-3"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#374151'
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
                <span style={{ fontSize: '14px', fontWeight: 500 }}>
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
                  <span style={{ fontSize: '14px', color: '#1F2937' }}>
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
                color: '#9CA3AF'
              }}
            >
              {t.fileHint}
            </p>
          </motion.section>
        )}

        {/* Pricing Card */}
        {selectedDate && selectedTime && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8"
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
                className={`absolute top-4 px-3 py-1 rounded-full ${language === 'ar' ? 'left-4' : 'right-4'}`}
                style={{
                  background: '#10B981',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}
              >
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 700
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
                  fontWeight: 600
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
                      fontSize: '14px'
                    }}
                  >
                    {language === 'ar' ? 'استشارة' : 'Consultation'}
                  </span>
                  <span
                    style={{
                      color: '#64748B',
                      fontSize: '14px',
                      textDecoration: 'line-through'
                    }}
                  >
                    {language === 'ar' ? 'ريال ٠٠' : 'SAR 100'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      color: '#64748B',
                      fontSize: '14px'
                    }}
                  >
                    {language === 'ar' ? 'جلسة علاج' : 'Treatment Session'}
                  </span>
                  <span
                    style={{
                      color: '#64748B',
                      fontSize: '14px',
                      textDecoration: 'line-through'
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
                      fontSize: '14px'
                    }}
                  >
                    {language === 'ar' ? 'السعر الأصلي' : 'Original Price'}
                  </span>
                  <span
                    style={{
                      color: '#64748B',
                      fontSize: '14px',
                      textDecoration: 'line-through'
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
                    marginBottom: '4px'
                  }}
                >
                  {language === 'ar' ? 'السعر بعد الخصم' : 'Discounted Price'}
                </div>
                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: '36px',
                    fontWeight: 700
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
                  fontStyle: 'italic'
                }}
              >
                {language === 'ar' 
                  ? 'سيتم الدفع عند تأكيد الحجز' 
                  : 'Payment upon booking confirmation'}
              </p>
            </div>
          </motion.section>
        )}

        {/* Booking Summary */}
        {selectedDate && selectedTime && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-6"
          >
            <div
              className="rounded-3xl p-6 mb-6"
              style={{
                background: 'linear-gradient(135deg, #EAF3FF 0%, #FFFFFF 100%)',
                border: '1.5px solid #C7DDFF',
                boxShadow: '0 8px 24px rgba(46, 99, 255, 0.12)'
              }}
            >
              <h3
                className="mb-4"
                style={{
                  color: '#1F2937',
                  fontSize: '18px',
                  fontWeight: 600
                }}
              >
                {t.summaryTitle}
              </h3>

              <div className="space-y-3">
                {/* Date & Time */}
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-xl"
                    style={{ background: '#EAF3FF' }}
                  >
                    <Calendar size={20} style={{ color: '#2E63FF' }} />
                  </div>
                  <div className="flex-1">
                    <div style={{ color: '#6B7280', fontSize: '12px' }}>
                      {t.selectedDate}
                    </div>
                    <div style={{ color: '#1F2937', fontSize: '16px', fontWeight: 600 }}>
                      {isRTL ? selectedDate.dayAr : selectedDate.day}, {selectedDate.date} {isRTL ? selectedDate.monthAr : selectedDate.month}
                    </div>
                    <div style={{ color: '#2E63FF', fontSize: '15px', fontWeight: 600 }}>
                      {selectedTime}
                    </div>
                  </div>
                </div>

                <div
                  className="h-px"
                  style={{ background: 'rgba(0, 0, 0, 0.05)' }}
                />

                {/* Session Type */}
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-xl"
                    style={{ background: '#EAF3FF' }}
                  >
                    <Clock size={20} style={{ color: '#2E63FF' }} />
                  </div>
                  <div className="flex-1">
                    <div style={{ color: '#6B7280', fontSize: '12px' }}>
                      {t.sessionType}
                    </div>
                    <div style={{ color: '#1F2937', fontSize: '15px', fontWeight: 600 }}>
                      {sessionTypeText}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl p-4 mb-4 flex items-center gap-3"
                  style={{
                    background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
                    border: '1px solid #10B981'
                  }}
                >
                  <CheckCircle size={24} style={{ color: '#059669' }} />
                  <p style={{ color: '#065F46', fontSize: '14px', fontWeight: 500 }}>
                    {t.successMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={handleConfirm}
                disabled={isLoading || showSuccess}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl text-white transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  background: isLoading || showSuccess
                    ? '#9CA3AF'
                    : 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                  boxShadow: isLoading || showSuccess
                    ? 'none'
                    : '0 8px 24px rgba(46, 99, 255, 0.3)',
                  fontSize: '17px',
                  fontWeight: 600,
                  cursor: isLoading || showSuccess ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTopColor: '#FFFFFF',
                        borderRadius: '50%'
                      }}
                    />
                    {isRTL ? 'جاري التأكيد...' : 'Confirming...'}
                  </>
                ) : showSuccess ? (
                  <>
                    <Check size={20} />
                    {isRTL ? 'تم التأكيد' : 'Confirmed'}
                  </>
                ) : (
                  <>
                    <Calendar size={20} />
                    {t.confirmButton}
                  </>
                )}
              </motion.button>

              {!showSuccess && (
                <button
                  onClick={() => {
                    setSelectedTime(null);
                    setSelectedDateIndex(null);
                  }}
                  className="w-full py-3 transition-opacity duration-200 hover:opacity-70"
                  style={{
                    color: '#6B7280',
                    fontSize: '14px',
                    fontWeight: 500,
                    background: 'transparent'
                  }}
                >
                  {t.chooseAnother}
                </button>
              )}
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p
            className="mb-2"
            style={{
              color: '#6B7280',
              fontSize: '14px'
            }}
          >
            {t.motivational}
          </p>
          <div
            style={{
              color: '#2E63FF',
              fontSize: '11px',
              fontWeight: 600,
              opacity: 0.5
            }}
          >
            {t.logo}
          </div>
        </footer>
      </main>
    </div>
  );
}

// Sample data for demonstration
export const sampleBookingData = {
  therapist: {
    id: '1',
    name: 'Dr. Faisal Al-Otaibi',
    nameAr: 'د. فيصل العتيبي',
    image: 'https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIxNTU3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'online' as const,
    specialty: 'Sports Rehabilitation Specialist',
    specialtyAr: 'أخصائي علاج طبيعي – الإصابات الرياضية'
  },
  availableDates: [
    {
      date: '20',
      dateAr: '٢٠',
      day: 'Saturday',
      dayAr: 'السبت',
      month: 'January',
      monthAr: 'يناير',
      slots: [
        { time: '10:00 AM', available: true, spotsLeft: 3 },
        { time: '12:00 PM', available: true, spotsLeft: 5 },
        { time: '2:00 PM', available: false },
        { time: '4:00 PM', available: true, spotsLeft: 2 },
        { time: '6:00 PM', available: true, spotsLeft: 4 },
        { time: '8:00 PM', available: false }
      ]
    },
    {
      date: '21',
      dateAr: '٢١',
      day: 'Sunday',
      dayAr: 'الأحد',
      month: 'January',
      monthAr: 'يناير',
      slots: [
        { time: '10:00 AM', available: true, spotsLeft: 1 },
        { time: '12:00 PM', available: false },
        { time: '2:00 PM', available: true, spotsLeft: 3 },
        { time: '4:00 PM', available: true, spotsLeft: 5 },
        { time: '6:00 PM', available: false },
        { time: '8:00 PM', available: true, spotsLeft: 2 }
      ]
    },
    {
      date: '22',
      dateAr: '٢٢',
      day: 'Monday',
      dayAr: 'الاثنين',
      month: 'January',
      monthAr: 'يناير',
      slots: [
        { time: '10:00 AM', available: false },
        { time: '12:00 PM', available: true, spotsLeft: 4 },
        { time: '2:00 PM', available: true, spotsLeft: 3 },
        { time: '4:00 PM', available: false },
        { time: '6:00 PM', available: true, spotsLeft: 5 },
        { time: '8:00 PM', available: true, spotsLeft: 1 }
      ]
    },
    {
      date: '23',
      dateAr: '٢٣',
      day: 'Tuesday',
      dayAr: 'الثلاثاء',
      month: 'January',
      monthAr: 'يناير',
      slots: [
        { time: '10:00 AM', available: true, spotsLeft: 5 },
        { time: '12:00 PM', available: true, spotsLeft: 4 },
        { time: '2:00 PM', available: true, spotsLeft: 3 },
        { time: '4:00 PM', available: true, spotsLeft: 2 },
        { time: '6:00 PM', available: false },
        { time: '8:00 PM', available: true, spotsLeft: 4 }
      ]
    },
    {
      date: '24',
      dateAr: '٢٤',
      day: 'Wednesday',
      dayAr: 'الأربعاء',
      month: 'January',
      monthAr: 'يناير',
      slots: [
        { time: '10:00 AM', available: true, spotsLeft: 3 },
        { time: '12:00 PM', available: false },
        { time: '2:00 PM', available: true, spotsLeft: 5 },
        { time: '4:00 PM', available: true, spotsLeft: 1 },
        { time: '6:00 PM', available: true, spotsLeft: 4 },
        { time: '8:00 PM', available: false }
      ]
    }
  ]
};