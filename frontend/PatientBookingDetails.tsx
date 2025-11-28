import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  CreditCard,
  MessageCircle,
  X,
  AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface PatientBookingDetailsProps {
  language: 'EN' | 'AR';
  bookingId: string;
  onBack: () => void;
  onMessageTherapist?: () => void;
}

const content = {
  EN: {
    title: 'Booking Details',
    therapistInfo: 'Therapist Information',
    sessionInfo: 'Session Information',
    sessionType: 'Session Type',
    date: 'Date',
    time: 'Time',
    duration: 'Duration',
    address: 'Address',
    paymentMethod: 'Payment Method',
    totalAmount: 'Total Amount',
    status: 'Status',
    sessionTypes: {
      consultation: 'Consultation + Treatment',
      treatment: 'Treatment Only'
    },
    statusLabels: {
      confirmed: 'Confirmed',
      pending: 'Pending Confirmation',
      cancelled: 'Cancelled',
      completed: 'Completed'
    },
    messageTherapist: 'Message Therapist',
    cancelBooking: 'Cancel Booking',
    cancelConfirmTitle: 'Cancel Booking?',
    cancelConfirmMessage: 'Are you sure you want to cancel this booking? This action cannot be undone.',
    confirmCancel: 'Yes, Cancel',
    keepBooking: 'Keep Booking',
    bookingCancelled: 'Booking cancelled successfully',
    minutes: 'min',
    sar: 'SAR'
  },
  AR: {
    title: 'تفاصيل الحجز',
    therapistInfo: 'معلومات المعالج',
    sessionInfo: 'معلومات الجلسة',
    sessionType: 'نوع الجلسة',
    date: 'التاريخ',
    time: 'الوقت',
    duration: 'المدة',
    address: 'العنوان',
    paymentMethod: 'طريقة الدفع',
    totalAmount: 'المبلغ الإجمالي',
    status: 'الحالة',
    sessionTypes: {
      consultation: 'استشارة + علاج',
      treatment: 'علاج فقط'
    },
    statusLabels: {
      confirmed: 'مؤكد',
      pending: 'في انتظار التأكيد',
      cancelled: 'ملغي',
      completed: 'مكتمل'
    },
    messageTherapist: 'مراسلة المعالج',
    cancelBooking: 'إلغاء الحجز',
    cancelConfirmTitle: 'إلغاء الحجز؟',
    cancelConfirmMessage: 'هل أنت متأكد من إلغاء هذا الحجز؟ لا يمكن التراجع عن هذا الإجراء.',
    confirmCancel: 'نعم، إلغاء',
    keepBooking: 'الاحتفاظ بالحجز',
    bookingCancelled: 'تم إلغاء الحجز بنجاح',
    minutes: 'دقيقة',
    sar: 'ريال'
  }
};

// Mock booking data - in real app, this would come from props or API
const mockBookingData = {
  id: '1',
  therapist: {
    name: 'Dr. Ahmed Al-Rashid',
    photo: 'https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    rating: 4.9,
    reviews: 127,
    specialty: 'Sports Rehabilitation'
  },
  sessionType: 'consultation',
  date: 'November 25, 2024',
  dateAr: '٢٥ نوفمبر ٢٠٢٤',
  time: '2:00 PM',
  timeAr: '٢:٠٠ مساءً',
  duration: '45-60',
  address: 'Al Nahda District, Building 45, Apt 12, Riyadh',
  addressAr: 'حي النهدة، مبنى ٤٥، شقة ١٢، الرياض',
  paymentMethod: 'Credit Card (**** 1234)',
  paymentMethodAr: 'بطاقة ائتمان (**** ٢٣٤)',
  amount: '330',
  status: 'confirmed'
};

export default function PatientBookingDetails({
  language,
  bookingId,
  onBack,
  onMessageTherapist
}: PatientBookingDetailsProps) {
  const isArabic = language === 'AR';
  const t = content[language];
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [booking] = useState(mockBookingData);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' };
      case 'pending':
        return { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' };
      case 'cancelled':
        return { bg: '#FEE2E2', text: '#DC2626', border: '#FCA5A5' };
      case 'completed':
        return { bg: '#E0E7FF', text: '#4F46E5', border: '#A5B4FC' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' };
    }
  };

  const handleCancelBooking = () => {
    // In real app, call API to cancel booking
    toast.success(t.bookingCancelled);
    setShowCancelConfirm(false);
    setTimeout(() => onBack(), 1500);
  };

  const statusColors = getStatusColor(booking.status);

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
        {/* Status Badge */}
        <div className="mb-6 flex justify-center">
          <div
            className="px-6 py-2 rounded-full inline-flex items-center gap-2"
            style={{
              background: statusColors.bg,
              border: `2px solid ${statusColors.border}`
            }}
          >
            <span style={{ color: statusColors.text, fontWeight: 600 }}>
              {t.statusLabels[booking.status as keyof typeof t.statusLabels]}
            </span>
          </div>
        </div>

        {/* Therapist Info Card */}
        <section className="mb-6">
          <h2 className="mb-4" style={{ color: '#1F2937', fontWeight: 600 }}>
            {t.therapistInfo}
          </h2>
          <div
            className="p-6 rounded-[22px]"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 100%)',
              border: '2px solid #5596FF',
              boxShadow: '0 8px 24px rgba(46, 99, 255, 0.15)'
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
                style={{
                  border: '3px solid #5596FF',
                  boxShadow: '0 4px 12px rgba(46, 99, 255, 0.2)'
                }}
              >
                <ImageWithFallback
                  src={booking.therapist.photo}
                  alt={booking.therapist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 style={{ color: '#1F2937', fontWeight: 600, marginBottom: '4px' }}>
                  {booking.therapist.name}
                </h3>
                <p className="text-sm mb-2" style={{ color: '#64748B' }}>
                  {booking.therapist.specialty}
                </p>
                <div className="flex items-center gap-1">
                  <Star size={16} fill="#FFA75F" style={{ color: '#FFA75F' }} />
                  <span style={{ color: '#1F2937', fontWeight: 600 }}>
                    {booking.therapist.rating}
                  </span>
                  <span className="text-sm" style={{ color: '#94A3B8' }}>
                    ({booking.therapist.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Session Info Card */}
        <section className="mb-6">
          <h2 className="mb-4" style={{ color: '#1F2937', fontWeight: 600 }}>
            {t.sessionInfo}
          </h2>
          <div
            className="p-6 rounded-[22px] space-y-4"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #DDE9FF',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
            }}
          >
            {/* Session Type */}
            <div className="flex justify-between items-start">
              <span style={{ color: '#64748B' }}>{t.sessionType}</span>
              <span style={{ color: '#4F46E5', fontWeight: 600 }}>
                {t.sessionTypes[booking.sessionType as keyof typeof t.sessionTypes]}
              </span>
            </div>

            <div style={{ height: '1px', background: '#DDE9FF' }} />

            {/* Date */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar size={18} style={{ color: '#64748B' }} />
                <span style={{ color: '#64748B' }}>{t.date}</span>
              </div>
              <span style={{ color: '#1F2937', fontWeight: 600 }}>
                {isArabic ? booking.dateAr : booking.date}
              </span>
            </div>

            {/* Time */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock size={18} style={{ color: '#64748B' }} />
                <span style={{ color: '#64748B' }}>{t.time}</span>
              </div>
              <span style={{ color: '#1F2937', fontWeight: 600 }}>
                {isArabic ? booking.timeAr : booking.time}
              </span>
            </div>

            {/* Duration */}
            <div className="flex justify-between items-center">
              <span style={{ color: '#64748B' }}>{t.duration}</span>
              <span style={{ color: '#1F2937', fontWeight: 600 }}>
                {booking.duration} {t.minutes}
              </span>
            </div>

            <div style={{ height: '1px', background: '#DDE9FF' }} />

            {/* Address */}
            <div>
              <div className="flex items-start gap-2 mb-2">
                <MapPin size={18} style={{ color: '#64748B', marginTop: '2px' }} />
                <span style={{ color: '#64748B' }}>{t.address}</span>
              </div>
              <p className="text-sm" style={{ color: '#1F2937', [isArabic ? 'marginRight' : 'marginLeft']: '26px' }}>
                {isArabic ? booking.addressAr : booking.address}
              </p>
            </div>

            <div style={{ height: '1px', background: '#DDE9FF' }} />

            {/* Total Amount */}
            <div
              className="flex justify-between items-center p-4 rounded-xl"
              style={{ background: '#F0F6FF' }}
            >
              <span style={{ color: '#1F2937', fontWeight: 600 }}>{t.totalAmount}</span>
              <span style={{ color: '#2E63FF', fontWeight: 700, fontSize: '20px' }}>
                {t.sar} {booking.amount}
              </span>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="space-y-3">
          {booking.status === 'confirmed' && (
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
              {t.cancelBooking}
            </button>
          )}
        </div>
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
                {t.keepBooking}
              </button>
              <button
                onClick={handleCancelBooking}
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