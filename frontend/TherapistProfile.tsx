import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  MapPin, 
  ChevronDown, 
  ChevronUp,
  MessageCircle,
  Calendar,
  Clock
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySchedule {
  day: string;
  dayAr: string;
  slots: TimeSlot[];
}

interface Review {
  id: string;
  author: string;
  authorAr: string;
  rating: number;
  comment: string;
  commentAr: string;
  date: string;
}

interface TherapistData {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  specialtyAr: string;
  status: 'available' | 'busy' | 'offline';
  distance: number;
  bio: string;
  bioAr: string;
  schedule: DaySchedule[];
  reviews: Review[];
}

interface TherapistProfileProps {
  therapist: TherapistData;
  language?: 'en' | 'ar';
  onBack: () => void;
  onBook: (selectedSlot: { day: string; time: string }) => void;
  onChat: () => void;
}

const content = {
  en: {
    backButton: 'Back to Therapists',
    addFavorite: 'Add to favorites',
    removeFavorite: 'Remove from favorites',
    available: 'Available Now',
    busy: 'Busy',
    offline: 'Offline',
    kmAway: 'km away',
    aboutHeading: 'About Therapist',
    readMore: 'Read More',
    readLess: 'Show Less',
    workingHours: 'Working Hours',
    reviewsHeading: 'Patient Reviews',
    basedOn: 'Based on',
    sessions: 'sessions',
    viewAllReviews: 'View All Reviews',
    ctaTitle: 'Ready to Begin?',
    selectedSlot: 'Selected Time',
    homeVisit: 'Home Visit',
    bookNow: 'Book Session',
    chatNow: 'Chat Now',
    motivational: 'Every session contributes to your recovery 💪',
    selectTimeSlot: 'Select a time slot to continue',
    days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  ar: {
    backButton: 'العودة للمعالجين',
    addFavorite: 'إضافة للمفضلة',
    removeFavorite: 'إزالة من المفضلة',
    available: 'متاح الآن',
    busy: 'مشغول',
    offline: 'غير متصل',
    kmAway: 'كم',
    aboutHeading: 'نبذة عن المعالج',
    readMore: 'عرض المزيد',
    readLess: 'عرض أقل',
    workingHours: 'الأوقات المتاحة',
    reviewsHeading: 'تقييمات المرضى',
    basedOn: 'بناءً على',
    sessions: 'جلسة',
    viewAllReviews: 'عرض كل التقييمات',
    ctaTitle: 'جاهز تبدأ جلستك؟',
    selectedSlot: 'الموعد المحدد',
    homeVisit: 'زيارة منزلية',
    bookNow: 'احجز الآن',
    chatNow: 'تواصل مع المعالج',
    motivational: 'كل جلسة تساهم في استرجاع قوتك 💪',
    selectTimeSlot: 'اختر موعد للمتابعة',
    days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
  }
};

export function TherapistProfile({ 
  therapist, 
  language = 'en', 
  onBack, 
  onBook,
  onChat 
}: TherapistProfileProps) {
  const t = content[language];
  const isRTL = language === 'ar';
  const [isFavorite, setIsFavorite] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; dayAr: string; time: string } | null>(null);
  const [showStickyBooking, setShowStickyBooking] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);

  // Auto-select first available slot
  useEffect(() => {
    for (const day of therapist.schedule) {
      const availableSlot = day.slots.find(slot => slot.available);
      if (availableSlot) {
        setSelectedSlot({ day: day.day, dayAr: day.dayAr, time: availableSlot.time });
        break;
      }
    }
  }, [therapist.schedule]);

  // Sticky booking button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBooking(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pulse animation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShouldPulse(true);
      setTimeout(() => setShouldPulse(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    available: { text: t.available, color: '#10B981', bg: '#D1FAE5' },
    busy: { text: t.busy, color: '#F59E0B', bg: '#FEF3C7' },
    offline: { text: t.offline, color: '#6B7280', bg: '#F3F4F6' }
  };

  const handleBookNow = () => {
    if (selectedSlot) {
      onBook({ day: isRTL ? selectedSlot.dayAr : selectedSlot.day, time: selectedSlot.time });
    }
  };

  const featuredReview = therapist.reviews[0];

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: '#F9FBFF',
        direction: isRTL ? 'rtl' : 'ltr',
        fontFamily: isRTL ? 'Tajawal, sans-serif' : 'Inter, sans-serif'
      }}
    >
      {/* Header */}
      <header 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #EAF3FF 0%, #FFFFFF 100%)',
          paddingTop: '48px',
          paddingBottom: '24px'
        }}
      >
        {/* Blurred background image for depth */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(${therapist.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px)',
            transform: 'scale(1.2)'
          }}
        />

        <div className="relative px-6">
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-8">
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

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full transition-all duration-200"
              style={{
                background: isFavorite ? '#FFE5E5' : 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
              }}
            >
              <Heart 
                size={20} 
                style={{ 
                  color: isFavorite ? '#EF4444' : '#9CA3AF',
                  fill: isFavorite ? '#EF4444' : 'none'
                }} 
              />
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div style={{ color: '#2E63FF', fontSize: '13px', fontWeight: 600, opacity: 0.7 }}>
              Powered by Seventic
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-32">
        {/* Therapist Info Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative -mt-16"
        >
          <div 
            className="rounded-3xl p-6"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(168, 216, 255, 0.3)'
            }}
          >
            {/* Profile Image */}
            <div className="flex justify-center -mt-20 mb-4">
              <div 
                className="rounded-full p-1.5"
                style={{
                  background: 'linear-gradient(135deg, #6AA6FF 0%, #2E63FF 100%)',
                  boxShadow: '0 12px 32px rgba(46, 99, 255, 0.25)'
                }}
              >
                <ImageWithFallback
                  src={therapist.image}
                  alt={isRTL ? therapist.nameAr : therapist.name}
                  className="rounded-full object-cover"
                  style={{ width: '120px', height: '120px', background: '#F3F4F6' }}
                />
              </div>
            </div>

            {/* Name */}
            <h1 
              className="text-center mb-2"
              style={{ 
                color: '#1F2937',
                fontSize: '24px',
                fontWeight: 700
              }}
            >
              {isRTL ? therapist.nameAr : therapist.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    style={{
                      color: star <= Math.floor(therapist.rating) ? '#FBBF24' : '#D1D5DB',
                      fill: star <= Math.floor(therapist.rating) ? '#FBBF24' : '#D1D5DB'
                    }}
                  />
                ))}
              </div>
              <span style={{ color: '#1F2937', fontSize: '15px', fontWeight: 600 }}>
                {therapist.rating}
              </span>
              <span style={{ color: '#6B7280', fontSize: '13px' }}>
                ({therapist.reviewCount} {isRTL ? 'تقييم' : 'reviews'})
              </span>
            </div>

            {/* Specialty */}
            <p 
              className="text-center mb-4"
              style={{ 
                color: '#4B5563',
                fontSize: '15px',
                lineHeight: '1.6'
              }}
            >
              {isRTL ? therapist.specialtyAr : therapist.specialty}
            </p>

            {/* Status & Distance */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  background: statusConfig[therapist.status].bg,
                  border: `1px solid ${statusConfig[therapist.status].color}30`
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: statusConfig[therapist.status].color }}
                />
                <span 
                  style={{ 
                    color: statusConfig[therapist.status].color,
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  {statusConfig[therapist.status].text}
                </span>
              </div>

              <div className="flex items-center gap-1.5" style={{ color: '#6B7280', fontSize: '14px' }}>
                <MapPin size={14} />
                <span>
                  {isRTL 
                    ? `${therapist.distance} ${t.kmAway}` 
                    : `${therapist.distance} ${t.kmAway}`
                  }
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Bio Section */}
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
            {t.aboutHeading}
          </h2>
          <div 
            className="rounded-2xl p-5"
            style={{
              background: '#FFFFFF',
              border: '1px solid #DDE9FF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
          >
            <p 
              style={{ 
                color: '#4B5563',
                fontSize: '14px',
                lineHeight: '1.7',
                maxHeight: bioExpanded ? 'none' : '4.2em',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease'
              }}
            >
              {isRTL ? therapist.bioAr : therapist.bio}
            </p>
            <button
              onClick={() => setBioExpanded(!bioExpanded)}
              className="flex items-center gap-1 mt-3 transition-opacity duration-200 hover:opacity-70"
              style={{ color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}
            >
              {bioExpanded ? t.readLess : t.readMore}
              {bioExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </motion.section>

        {/* Working Hours & Availability */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
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
            {t.workingHours}
          </h2>
          <div 
            className="rounded-2xl p-5 overflow-x-auto"
            style={{
              background: '#FFFFFF',
              border: '1px solid #DDE9FF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div className="space-y-4">
              {therapist.schedule.map((daySchedule, idx) => (
                <div key={idx}>
                  <div 
                    className="mb-2"
                    style={{ 
                      color: '#374151',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  >
                    {isRTL ? daySchedule.dayAr : daySchedule.day}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {daySchedule.slots.map((slot, slotIdx) => (
                      <button
                        key={slotIdx}
                        onClick={() => {
                          if (slot.available) {
                            setSelectedSlot({ 
                              day: daySchedule.day, 
                              dayAr: daySchedule.dayAr,
                              time: slot.time 
                            });
                          }
                        }}
                        disabled={!slot.available}
                        className="px-4 py-2 rounded-xl transition-all duration-200"
                        style={{
                          background: selectedSlot?.day === daySchedule.day && selectedSlot?.time === slot.time
                            ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                            : slot.available 
                              ? '#F9FBFF' 
                              : '#F3F4F6',
                          border: selectedSlot?.day === daySchedule.day && selectedSlot?.time === slot.time
                            ? '1.5px solid #2E63FF'
                            : slot.available 
                              ? '1.5px solid #C7DDFF' 
                              : '1.5px solid #E5E7EB',
                          color: selectedSlot?.day === daySchedule.day && selectedSlot?.time === slot.time
                            ? '#FFFFFF'
                            : slot.available 
                              ? '#2E63FF' 
                              : '#9CA3AF',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: slot.available ? 'pointer' : 'not-allowed',
                          opacity: slot.available ? 1 : 0.5
                        }}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Reviews Summary */}
        {featuredReview && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 
                style={{ 
                  color: '#1F2937',
                  fontSize: '18px',
                  fontWeight: 600
                }}
              >
                {t.reviewsHeading}
              </h2>
              <div className="flex items-center gap-1" style={{ color: '#6B7280', fontSize: '13px' }}>
                <Star size={14} style={{ color: '#FBBF24', fill: '#FBBF24' }} />
                <span>
                  {therapist.rating}/5 · {t.basedOn} {therapist.reviewCount} {t.sessions}
                </span>
              </div>
            </div>
            <div 
              className="rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, #F9FBFF 0%, #FFFFFF 100%)',
                border: '1px solid #DDE9FF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #6AA6FF 0%, #2E63FF 100%)' }}
                >
                  <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                    {(isRTL ? featuredReview.authorAr : featuredReview.author).charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div 
                    className="mb-1"
                    style={{ color: '#1F2937', fontSize: '14px', fontWeight: 600 }}
                  >
                    {isRTL ? featuredReview.authorAr : featuredReview.author}
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        style={{
                          color: star <= featuredReview.rating ? '#FBBF24' : '#D1D5DB',
                          fill: star <= featuredReview.rating ? '#FBBF24' : '#D1D5DB'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p 
                style={{ 
                  color: '#4B5563',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  fontStyle: 'italic'
                }}
              >
                "{isRTL ? featuredReview.commentAr : featuredReview.comment}"
              </p>
              <button
                className="mt-4 transition-opacity duration-200 hover:opacity-70"
                style={{ color: '#2E63FF', fontSize: '14px', fontWeight: 500 }}
              >
                {t.viewAllReviews} →
              </button>
            </div>
          </motion.section>
        )}

        {/* Call-to-Action Block */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-6"
        >
          <div 
            className="rounded-3xl p-6"
            style={{
              background: 'linear-gradient(135deg, #EAF3FF 0%, #FFFFFF 100%)',
              border: '1.5px solid #C7DDFF',
              boxShadow: '0 8px 24px rgba(46, 99, 255, 0.12)'
            }}
          >
            <h3 
              className="text-center mb-4"
              style={{ 
                color: '#1F2937',
                fontSize: '20px',
                fontWeight: 700
              }}
            >
              {t.ctaTitle}
            </h3>

            {selectedSlot ? (
              <div 
                className="rounded-2xl p-4 mb-5"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #C7DDFF'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-xl"
                    style={{ background: '#EAF3FF' }}
                  >
                    <Calendar size={20} style={{ color: '#2E63FF' }} />
                  </div>
                  <div className="flex-1">
                    <div style={{ color: '#6B7280', fontSize: '12px' }}>
                      {t.selectedSlot}
                    </div>
                    <div style={{ color: '#1F2937', fontSize: '15px', fontWeight: 600 }}>
                      {isRTL ? selectedSlot.dayAr : selectedSlot.day}, {selectedSlot.time}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '12px' }}>
                      {t.homeVisit}
                    </div>
                  </div>
                  <Clock size={20} style={{ color: '#2E63FF' }} />
                </div>
              </div>
            ) : (
              <div 
                className="text-center mb-5 p-4 rounded-2xl"
                style={{
                  background: '#FEF3C7',
                  border: '1px solid #F59E0B20',
                  color: '#92400E',
                  fontSize: '14px'
                }}
              >
                {t.selectTimeSlot}
              </div>
            )}

            <div className="space-y-3">
              <motion.button
                disabled={!selectedSlot}
                onClick={onBook}
                whileHover={selectedSlot ? { scale: 1.02 } : {}}
                whileTap={selectedSlot ? { scale: 0.98 } : {}}
                className="w-full py-4 rounded-2xl text-white transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  background: selectedSlot 
                    ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                    : '#E2E8F0',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: selectedSlot ? 'pointer' : 'not-allowed',
                  opacity: selectedSlot ? 1 : 0.5
                }}
              >
                <Calendar size={20} />
                {t.bookNow}
              </motion.button>

              <button
                onClick={onChat}
                className="w-full py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #2E63FF',
                  color: '#2E63FF',
                  fontSize: '15px',
                  fontWeight: 600
                }}
              >
                <MessageCircle size={20} />
                {t.chatNow}
              </button>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p 
            style={{ 
              color: '#6B7280',
              fontSize: '14px',
              marginBottom: '8px'
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
            Powered by Seventic
          </div>
        </footer>
      </main>

      {/* Sticky Booking Button */}
      <AnimatePresence>
        {showStickyBooking && selectedSlot && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed bottom-0 left-0 right-0 p-6"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(249, 251, 255, 0.98) 20%, rgba(249, 251, 255, 0.98) 100%)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.08)'
            }}
          >
            <motion.button
              onClick={handleBookNow}
              animate={shouldPulse ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="w-full py-4 rounded-2xl text-white transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                boxShadow: '0 8px 24px rgba(46, 99, 255, 0.3)',
                fontSize: '17px',
                fontWeight: 600
              }}
            >
              <Calendar size={20} />
              {t.bookNow} · {isRTL ? selectedSlot.dayAr : selectedSlot.day}, {selectedSlot.time}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sample therapist data for demonstration
export const sampleTherapist: TherapistData = {
  id: '1',
  name: 'Dr. Faisal Al-Otaibi',
  nameAr: 'د. فيصل العتيبي',
  image: 'https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIxNTU3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  rating: 4.9,
  reviewCount: 220,
  specialty: 'Specialist in Sports Rehabilitation & Physical Therapy',
  specialtyAr: 'أخصائي علاج طبيعي – الإصابات الرياضية',
  status: 'available',
  distance: 2.1,
  bio: 'Over 7 years of experience in physical therapy and sports injury rehabilitation. Certified specialist in muscle performance enhancement programs. I focus on creating personalized treatment plans that combine evidence-based techniques with compassionate care to help my patients achieve their recovery goals.',
  bioAr: 'خبرة أكثر من 7 سنوات في العلاج الطبيعي وإعادة التأهيل بعد الإصابات الرياضية. أخصائي معتمد في برامج تحسين الأداء العضلي. أركز على إنشاء خطط علاجية مخصصة تجمع بين التقنيات المبنية على الأدلة والرعاية الرحيمة لمساعدة مرضاي على تحقيق أهداف التعافي.',
  schedule: [
    {
      day: 'Saturday',
      dayAr: 'السبت',
      slots: [
        { time: '10:00 AM', available: true },
        { time: '12:00 PM', available: true },
        { time: '3:00 PM', available: false },
        { time: '5:00 PM', available: true }
      ]
    },
    {
      day: 'Sunday',
      dayAr: 'الأحد',
      slots: [
        { time: '9:00 AM', available: true },
        { time: '11:00 AM', available: false },
        { time: '2:00 PM', available: true },
        { time: '4:00 PM', available: true }
      ]
    },
    {
      day: 'Monday',
      dayAr: 'الاثنين',
      slots: [
        { time: '10:00 AM', available: false },
        { time: '1:00 PM', available: true },
        { time: '3:00 PM', available: true },
        { time: '6:00 PM', available: true }
      ]
    },
    {
      day: 'Tuesday',
      dayAr: 'الثلاثاء',
      slots: [
        { time: '8:00 AM', available: true },
        { time: '12:00 PM', available: true },
        { time: '3:00 PM', available: true },
        { time: '5:00 PM', available: false }
      ]
    }
  ],
  reviews: [
    {
      id: '1',
      author: 'Ahmed M.',
      authorAr: 'أحمد م.',
      rating: 5,
      comment: 'Dr. Faisal was extremely helpful and professional. I regained my mobility in just two weeks!',
      commentAr: 'الدكتور فيصل جداً متعاون واحترافي. ساعدني أستعيد حركتي بعد أسبوعين فقط 👏',
      date: '2025-10-28'
    }
  ]
};