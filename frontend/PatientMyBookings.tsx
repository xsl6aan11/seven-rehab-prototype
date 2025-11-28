import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Calendar, Clock, MapPin, Star, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Input } from './ui/input';

interface PatientMyBookingsProps {
  language: 'EN' | 'AR';
  onBack: () => void;
  onViewBookingDetails: (bookingId: string) => void;
}

const content = {
  EN: {
    title: 'My Bookings',
    searchPlaceholder: 'Search bookings...',
    tabs: {
      upcoming: 'Upcoming',
      past: 'Past'
    },
    sessionTypes: {
      consultation: 'Consultation + Treatment',
      treatment: 'Treatment Only'
    },
    status: {
      confirmed: 'Confirmed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      completed: 'Completed'
    },
    viewDetails: 'View Details',
    noBookings: 'No bookings found',
    noBookingsDesc: 'You haven\'t booked any sessions yet'
  },
  AR: {
    title: 'حجوزاتي',
    searchPlaceholder: 'بحث عن الحجوزات...',
    tabs: {
      upcoming: 'القادمة',
      past: 'السابقة'
    },
    sessionTypes: {
      consultation: 'استشارة + علاج',
      treatment: 'علاج فقط'
    },
    status: {
      confirmed: 'مؤكد',
      pending: 'قيد الانتظار',
      cancelled: 'ملغي',
      completed: 'مكتمل'
    },
    viewDetails: 'عرض التفاصيل',
    noBookings: 'لا توجد حجوزات',
    noBookingsDesc: 'لم تقم بحجز أي جلسات بعد'
  }
};

const mockBookings = [
  {
    id: '1',
    therapistName: 'Dr. Ahmed Al-Rashid',
    therapistPhoto: 'https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    therapistRating: 4.9,
    sessionType: 'consultation',
    date: 'Nov 25, 2024',
    time: '2:00 PM',
    status: 'confirmed',
    address: 'Al Nahda, Riyadh',
    isUpcoming: true
  },
  {
    id: '2',
    therapistName: 'Dr. Fatima Hassan',
    therapistPhoto: 'https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    therapistRating: 4.8,
    sessionType: 'treatment',
    date: 'Nov 28, 2024',
    time: '10:00 AM',
    status: 'pending',
    address: 'Al Nahda, Riyadh',
    isUpcoming: true
  },
  {
    id: '3',
    therapistName: 'Dr. Omar Khalid',
    therapistPhoto: 'https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    therapistRating: 4.7,
    sessionType: 'consultation',
    date: 'Nov 10, 2024',
    time: '3:00 PM',
    status: 'completed',
    address: 'Al Nahda, Riyadh',
    isUpcoming: false
  },
  {
    id: '4',
    therapistName: 'Dr. Layla Abdullah',
    therapistPhoto: 'https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    therapistRating: 4.9,
    sessionType: 'treatment',
    date: 'Nov 15, 2024',
    time: '4:30 PM',
    status: 'completed',
    address: 'Al Nahda, Riyadh',
    isUpcoming: false
  }
];

export default function PatientMyBookings({
  language,
  onBack,
  onViewBookingDetails
}: PatientMyBookingsProps) {
  const isArabic = language === 'AR';
  const t = content[language];
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = mockBookings.filter(booking => {
    const matchesTab = activeTab === 'upcoming' ? booking.isUpcoming : !booking.isUpcoming;
    const matchesSearch = booking.therapistName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

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

  return (
    <div
      className="min-h-screen"
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
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              size={20}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ color: '#94A3B8', [isArabic ? 'right' : 'left']: '12px' }}
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl"
              style={{
                [isArabic ? 'paddingRight' : 'paddingLeft']: '44px',
                background: '#FFFFFF',
                border: '1.5px solid #DDE9FF'
              }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'upcoming' | 'past')}
              className="flex-1 py-3 rounded-xl transition-all duration-200"
              style={{
                background: activeTab === tab
                  ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                  : '#F0F6FF',
                color: activeTab === tab ? '#FFFFFF' : '#2E63FF',
                fontWeight: activeTab === tab ? 600 : 500,
                boxShadow: activeTab === tab ? '0 4px 12px rgba(46, 99, 255, 0.3)' : 'none'
              }}
            >
              {t.tabs[tab as keyof typeof t.tabs]}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-20">
            <Calendar size={64} style={{ color: '#A8D8FF', margin: '0 auto 16px' }} />
            <h3 style={{ color: '#1F2937', fontWeight: 600, marginBottom: '8px' }}>
              {t.noBookings}
            </h3>
            <p style={{ color: '#64748B' }}>{t.noBookingsDesc}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking, idx) => {
              const statusColors = getStatusColor(booking.status);
              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-5 rounded-[22px] cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 100%)',
                    border: '1.5px solid #DDE9FF',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
                  }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  onClick={() => onViewBookingDetails(booking.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Therapist Photo */}
                    <div
                      className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0"
                      style={{
                        border: '2px solid #5596FF',
                        boxShadow: '0 2px 8px rgba(46, 99, 255, 0.2)'
                      }}
                    >
                      <ImageWithFallback
                        src={booking.therapistPhoto}
                        alt={booking.therapistName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Booking Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="truncate" style={{ color: '#1F2937', fontWeight: 600 }}>
                            {booking.therapistName}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={14} fill="#FFA75F" style={{ color: '#FFA75F' }} />
                            <span className="text-sm" style={{ color: '#64748B', fontWeight: 500 }}>
                              {booking.therapistRating}
                            </span>
                          </div>
                        </div>
                        {/* Status Badge */}
                        <div
                          className="px-3 py-1 rounded-full text-xs flex-shrink-0"
                          style={{
                            background: statusColors.bg,
                            color: statusColors.text,
                            border: `1px solid ${statusColors.border}`,
                            fontWeight: 600
                          }}
                        >
                          {t.status[booking.status as keyof typeof t.status]}
                        </div>
                      </div>

                      {/* Session Type */}
                      <div className="text-sm mb-2" style={{ color: '#4F46E5', fontWeight: 500 }}>
                        {t.sessionTypes[booking.sessionType as keyof typeof t.sessionTypes]}
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-center gap-4 mb-2 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} style={{ color: '#64748B' }} />
                          <span style={{ color: '#64748B' }}>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} style={{ color: '#64748B' }} />
                          <span style={{ color: '#64748B' }}>{booking.time}</span>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-center gap-1.5 text-sm">
                        <MapPin size={14} style={{ color: '#64748B' }} />
                        <span style={{ color: '#64748B' }}>{booking.address}</span>
                      </div>

                      {/* View Details Button */}
                      <button
                        className="mt-3 flex items-center gap-1 text-sm transition-all"
                        style={{ color: '#2E63FF', fontWeight: 500 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewBookingDetails(booking.id);
                        }}
                      >
                        {t.viewDetails}
                        <ChevronRight size={16} style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
