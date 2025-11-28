import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  MessageCircle,
  Map as MapIcon,
  X,
  Calendar,
  Clock,
  Home,
  FileText,
  UserCircle,
  Menu
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import SevenRehabLogo from './SevenRehabLogo';
import PatientLoginModal from './PatientLoginModal';
import PatientRegistrationModal from './PatientRegistrationModal';
import PatientForgotPasswordModal from './PatientForgotPasswordModal';
import { Input } from './ui/input';

interface PatientDashboardProps {
  language: 'EN' | 'AR';
  onLanguageToggle: () => void;
  onBackToHome: () => void;
  onRequestSession?: () => void;
  onViewTherapistProfile?: (therapistId: string) => void;
  onBookTherapist?: (therapistId: string) => void;
  onViewMyBookings?: () => void;
  onViewBookingDetails?: (bookingId: string) => void;
  onViewRequestTracking?: (requestId: string) => void;
  onViewProfile?: () => void;
  currentTab?: 'home' | 'bookings' | 'requests' | 'profile';
}

interface Therapist {
  id: string;
  name: string;
  photo: string;
  rating: number;
  specialty: string;
  distance: number;
  available: boolean;
  reviews: number;
}

const content = {
  EN: {
    login: 'Log In',
    greeting: 'Hello 👋 Your recovery journey starts here',
    location: 'Al Nahda, Riyadh',
    heroSlides: [
      {
        title: 'Empower your recovery at home.',
        subtitle: 'Professional physical therapy in the comfort of your space'
      },
      {
        title: 'Expert therapists, trusted care.',
        subtitle: 'Verified specialists at your doorstep'
      },
      {
        title: 'Your wellness journey starts here.',
        subtitle: 'Personalized treatment plans tailored to you'
      }
    ],
    bookSession: 'Book a Home Session',
    categoriesTitle: 'Our services tailored for you',
    categories: [
      { icon: '🪴', label: 'Physical Therapy', key: 'physical' },
      { icon: '🦵', label: 'Sports Rehab', key: 'sports' },
      { icon: '👶', label: 'Pediatric Care', key: 'pediatric' },
      { icon: '🧠', label: 'Neurology', key: 'neurology' }
    ],
    featuredTitle: 'Choose a therapist near you!',
    viewProfile: 'View Profile',
    book: 'Book',
    available: 'Available Now',
    reviews: 'reviews',
    kmAway: 'km away',
    mapPreview: 'Therapists in your area',
    viewFullMap: 'View Full Map',
    myBookingsTitle: 'My Bookings',
    viewAllBookings: 'View All',
    homeCareRequestsTitle: 'Home Care Requests',
    viewAllRequests: 'View All',
    sessionTypes: {
      consultation: 'Consultation + Treatment',
      treatment: 'Treatment Only'
    },
    status: {
      confirmed: 'Confirmed',
      pending: 'Pending',
      waiting: 'Waiting',
      accepted: 'Accepted',
      expired: 'Expired'
    },
    viewDetails: 'View Details',
    trackRequest: 'Track Request',
    noBookings: 'No bookings yet',
    noRequests: 'No open requests',
    bottomNav: {
      home: 'Home',
      bookings: 'Bookings',
      requests: 'Requests',
      profile: 'Profile'
    },
    needHelp: 'Need help?',
    chatWithSaban: 'Chat with سبعان',
    footer: {
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
      copyright: '© Seventic 2025'
    },
    loginModal: {
      title: 'Welcome Back',
      description: 'Sign in to book sessions and track your recovery',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In',
      continueAsGuest: 'Continue as Guest',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up'
    },
    languageToggle: 'اللغه العربه'
  },
  AR: {
    login: 'تسجيل الدخول',
    greeting: 'مرحباً 👋 رحلة تعافيك تبدأ من هنا',
    location: 'حي النهدة، الرياض',
    heroSlides: [
      {
        title: 'استعد نشاطك براحة بيتك.',
        subtitle: 'علاج طبيعي احترافي في راحة منزلك'
      },
      {
        title: 'معالجون خبراء، رعاية موثوقة.',
        subtitle: 'أخصائيون معتمدون عند باب منزلك'
      },
      {
        title: 'رحلة عافيتك تبدأ من هنا.',
        subtitle: 'خطط علاجية مخصصة لك'
      }
    ],
    bookSession: 'حجز جلسة منزلية',
    categoriesTitle: 'خدماتنا مصممة لكم!',
    categories: [
      { icon: '🪴', label: 'العلاج الطبيعي', key: 'physical' },
      { icon: '🦵', label: 'علاج إصابات رياضية', key: 'sports' },
      { icon: '👶', label: 'علاج الأطفال', key: 'pediatric' },
      { icon: '🧠', label: 'علاج الأعصاب', key: 'neurology' }
    ],
    featuredTitle: 'اختر معالجك القريب منك!',
    viewProfile: 'عرض الملف',
    book: 'حجز',
    available: 'متاح الآن',
    reviews: 'تقييم',
    kmAway: 'كم',
    mapPreview: 'المعالجون في منطقتك',
    viewFullMap: 'عرض الخريطة الكاملة',
    myBookingsTitle: 'حجوزاتي',
    viewAllBookings: 'عرض الكل',
    homeCareRequestsTitle: 'طلبات الرعاية المنزلية',
    viewAllRequests: 'عرض الكل',
    sessionTypes: {
      consultation: 'استشارة + علاج',
      treatment: 'علاج فقط'
    },
    status: {
      confirmed: 'مؤكد',
      pending: 'قيد الانتظار',
      waiting: 'في الانتظار',
      accepted: 'مقبول',
      expired: 'منتهي'
    },
    viewDetails: 'عرض التفاصيل',
    trackRequest: 'تتبع الطلب',
    noBookings: 'لا توجد حجوزات بعد',
    noRequests: 'لا توجد طلبات مفتوحة',
    bottomNav: {
      home: 'الرئيسية',
      bookings: 'الحجوزات',
      requests: 'الطلبات',
      profile: 'الملف الشخصي'
    },
    needHelp: 'تحتاج مساعدة؟',
    chatWithSaban: 'تحدث مع سبعان',
    footer: {
      privacy: 'الخصوصية',
      terms: 'الشروط',
      contact: 'تواصل',
      copyright: '© Seventic 2025'
    },
    loginModal: {
      title: 'مرحبًا بعودتك',
      description: 'سجل الدخول لحجز الجلسات وتتبع تعافيك',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      signIn: 'تسجيل الدخول',
      continueAsGuest: 'متابعة كزائر',
      noAccount: 'ليس لديك حساب؟',
      signUp: 'إنشاء حساب'
    },
    languageToggle: 'Continue in English'
  }
};

const mockTherapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Ahmed Al-Rashid',
    photo: 'https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    rating: 4.9,
    specialty: 'Sports Rehabilitation',
    distance: 1.2,
    available: true,
    reviews: 127
  },
  {
    id: '2',
    name: 'Dr. Fatima Hassan',
    photo: 'https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    rating: 4.8,
    specialty: 'Neurology Physical Therapy',
    distance: 2.1,
    available: true,
    reviews: 94
  },
  {
    id: '3',
    name: 'Dr. Omar Khalid',
    photo: 'https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    rating: 4.7,
    specialty: 'General Physical Therapy',
    distance: 3.5,
    available: false,
    reviews: 156
  },
  {
    id: '4',
    name: 'Dr. Layla Abdullah',
    photo: 'https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    rating: 4.9,
    specialty: 'Pediatric Physical Therapy',
    distance: 1.8,
    available: true,
    reviews: 203
  }
];

const heroImages = [
  'https://static.wixstatic.com/media/f66985_e67bfa504d46471bb389870c395eb1bd~mv2.png',
  'https://static.wixstatic.com/media/f66985_365fd851b02a41659eae48f79f897c0c~mv2.png',
  'https://static.wixstatic.com/media/f66985_b9c75f60718246a981434ca48a59121a~mv2.png'
];

// Mock bookings data
const mockBookings = [
  {
    id: '1',
    therapistName: 'Dr. Ahmed Al-Rashid',
    therapistPhoto: 'https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    sessionType: 'consultation',
    date: 'Nov 25, 2024',
    time: '2:00 PM',
    status: 'confirmed'
  },
  {
    id: '2',
    therapistName: 'Dr. Fatima Hassan',
    therapistPhoto: 'https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    sessionType: 'treatment',
    date: 'Nov 28, 2024',
    time: '10:00 AM',
    status: 'pending'
  }
];

// Mock home care requests data
const mockRequests = [
  {
    id: '1',
    preferredTime: '2:00 PM - 4:00 PM',
    location: 'Al Nahda, Riyadh',
    status: 'waiting',
    createdAt: 'Nov 22, 2024'
  },
  {
    id: '2',
    preferredTime: '6:00 PM - 8:00 PM',
    location: 'Al Nahda, Riyadh',
    status: 'accepted',
    createdAt: 'Nov 20, 2024'
  }
];

export default function PatientDashboard({ 
  language, 
  onLanguageToggle, 
  onBackToHome,
  onRequestSession,
  onViewTherapistProfile,
  onBookTherapist,
  onViewMyBookings,
  onViewBookingDetails,
  onViewRequestTracking,
  onViewProfile,
  currentTab
}: PatientDashboardProps) {
  const isArabic = language === 'AR';
  const t = content[language];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showFullMap, setShowFullMap] = useState(false);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

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
          <div className="flex items-center justify-between">
            {/* Logo & Menu Button */}
            <div className="flex items-center gap-3">
              {/* Menu Toggle Button */}
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 rounded-xl transition-all duration-200"
                style={{ 
                  background: '#2E63FF',
                  color: '#F0F6FF'
                }}
              >
                <Menu size={24} />
              </button>
              <SevenRehabLogo width={40} onClick={onBackToHome} />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Location */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: '#F0F6FF' }}>
                <MapPin size={16} style={{ color: '#2E63FF' }} />
                <span className="text-sm" style={{ color: '#1F2937' }}>{t.location}</span>
              </div>

              {/* Login Button */}
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(46, 99, 255, 0.25)'
                }}
              >
                <User size={18} />
                <span className="text-sm">{t.login}</span>
              </button>
            </div>
          </div>

          {/* Greeting */}
          <div className="mt-4">
            <h1 className="text-xl" style={{ color: '#1F2937' }}>
              {t.greeting}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        {/* Hero Carousel */}
        <section className="mt-6 relative">
          <div 
            className="relative rounded-3xl overflow-hidden"
            style={{ 
              height: '200px',
              boxShadow: '0 8px 32px rgba(46, 99, 255, 0.15)'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={heroImages[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-full h-full object-contain"
                />
                {/* Overlay */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(46, 99, 255, 0.3) 100%)'
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm transition-all duration-200"
              style={{ background: 'rgba(255, 255, 255, 0.3)' }}
            >
              <ChevronLeft size={24} style={{ color: '#FFFFFF' }} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm transition-all duration-200"
              style={{ background: 'rgba(255, 255, 255, 0.3)' }}
            >
              <ChevronRight size={24} style={{ color: '#FFFFFF' }} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: idx === currentSlide ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                    width: idx === currentSlide ? '24px' : '8px'
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Request Session Button */}
        <section className="mt-8">
          <motion.button
            onClick={onRequestSession}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full py-4 rounded-2xl text-white transition-all duration-200 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
              boxShadow: '0 8px 24px rgba(46, 99, 255, 0.3)',
              fontWeight: 600,
              fontSize: '17px'
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(46, 99, 255, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            {t.bookSession}
          </motion.button>
        </section>

        {/* Service Categories */}
        <section className="mt-8">
          <h2 className="text-2xl mb-6" style={{ color: '#1F2937', fontWeight: 600 }}>
            {t.categoriesTitle}
          </h2>
          <div className="flex justify-between gap-2">
            {t.categories.map((category, idx) => (
              <motion.button
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex-1 aspect-square rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-1 p-2"
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #DDE9FF',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  maxWidth: '85px'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 24px rgba(46, 99, 255, 0.15)',
                  borderColor: '#5596FF'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-2xl">{category.icon}</div>
                <div className="text-xs text-center leading-tight" style={{ color: '#1F2937', fontWeight: 500 }}>
                  {category.label}
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Featured Therapists */}
        <section className="mt-12">
          <h2 className="text-2xl mb-6" style={{ color: '#1F2937', fontWeight: 600 }}>
            {t.featuredTitle}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {mockTherapists.map((therapist, idx) => (
              <motion.div
                key={therapist.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex-shrink-0 w-72 p-5 rounded-2xl transition-all duration-200"
                style={{
                  background: '#FFFFFF',
                  border: therapist.available ? '2px solid #5596FF' : '1.5px solid #DDE9FF',
                  boxShadow: therapist.available 
                    ? '0 0 24px rgba(85, 150, 255, 0.3)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.04)',
                  position: 'relative'
                }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                {/* Available Badge */}
                {therapist.available && (
                  <div 
                    className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs"
                    style={{ background: '#10B981', color: '#FFFFFF' }}
                  >
                    {t.available}
                  </div>
                )}

                {/* Photo */}
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-24 h-24 rounded-full overflow-hidden"
                    style={{
                      border: '3px solid #5596FF',
                      boxShadow: '0 4px 12px rgba(46, 99, 255, 0.2)'
                    }}
                  >
                    <ImageWithFallback
                      src={therapist.photo}
                      alt={therapist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="mb-1" style={{ color: '#1F2937', fontWeight: 600 }}>
                    {therapist.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: '#64748B' }}>
                    {therapist.specialty}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star size={16} fill="#FFA75F" style={{ color: '#FFA75F' }} />
                    <span style={{ color: '#1F2937', fontWeight: 600 }}>{therapist.rating}</span>
                    <span className="text-sm" style={{ color: '#94A3B8' }}>
                      ({therapist.reviews} {t.reviews})
                    </span>
                  </div>

                  {/* Distance */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <MapPin size={14} style={{ color: '#64748B' }} />
                    <span className="text-sm" style={{ color: '#64748B' }}>
                      {therapist.distance} {t.kmAway}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewTherapistProfile?.(therapist.id)}
                      className="flex-1 py-2 rounded-lg text-sm transition-all flex items-center justify-center"
                      style={{
                        background: '#F0F6FF',
                        color: '#2E63FF',
                        fontWeight: 500
                      }}
                    >
                      {t.viewProfile}
                    </button>
                    <button
                      onClick={() => onBookTherapist?.(therapist.id)}
                      className="flex-1 py-2 rounded-lg text-sm text-white transition-all flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                        fontWeight: 600
                      }}
                    >
                      {t.book}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* My Bookings Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 style={{ color: '#1F2937', fontWeight: 600, fontSize: '24px' }}>
              {t.myBookingsTitle}
            </h2>
            <button
              onClick={onViewMyBookings}
              className="text-sm transition-all"
              style={{ color: '#2E63FF', fontWeight: 500 }}
            >
              {t.viewAllBookings} <ChevronRight className="inline" size={16} style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }} />
            </button>
          </div>
          
          {mockBookings.length === 0 ? (
            <div
              className="p-8 rounded-[22px] text-center"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #DDE9FF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <Calendar size={48} style={{ color: '#A8D8FF', margin: '0 auto 12px' }} />
              <p style={{ color: '#64748B' }}>{t.noBookings}</p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {mockBookings.map((booking, idx) => {
                const statusColors = booking.status === 'confirmed'
                  ? { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' }
                  : { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' };
                
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => onViewBookingDetails?.(booking.id)}
                    className="flex-shrink-0 w-80 p-5 rounded-[22px] cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 100%)',
                      border: '1.5px solid #DDE9FF',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    {/* Status Badge */}
                    <div className="flex justify-end mb-3">
                      <div
                        className="px-3 py-1 rounded-full text-xs"
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

                    {/* Therapist Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
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
                      <div className="flex-1 min-w-0">
                        <h3 className="truncate" style={{ color: '#1F2937', fontWeight: 600 }}>
                          {booking.therapistName}
                        </h3>
                        <p className="text-sm" style={{ color: '#4F46E5', fontWeight: 500 }}>
                          {t.sessionTypes[booking.sessionType as keyof typeof t.sessionTypes]}
                        </p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={16} style={{ color: '#64748B' }} />
                        <span style={{ color: '#64748B' }}>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} style={{ color: '#64748B' }} />
                        <span style={{ color: '#64748B' }}>{booking.time}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      className="w-full mt-4 py-2 rounded-lg text-sm transition-all"
                      style={{
                        background: '#F0F6FF',
                        color: '#2E63FF',
                        fontWeight: 500
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewBookingDetails?.(booking.id);
                      }}
                    >
                      {t.viewDetails}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* Home Care Requests Section */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 style={{ color: '#1F2937', fontWeight: 600, fontSize: '24px' }}>
              {t.homeCareRequestsTitle}
            </h2>
            <button
              onClick={() => onViewRequestTracking?.(mockRequests[0]?.id)}
              className="text-sm transition-all"
              style={{ color: '#2E63FF', fontWeight: 500 }}
            >
              {t.viewAllRequests} <ChevronRight className="inline" size={16} style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }} />
            </button>
          </div>
          
          {mockRequests.length === 0 ? (
            <div
              className="p-8 rounded-[22px] text-center"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #DDE9FF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <FileText size={48} style={{ color: '#A8D8FF', margin: '0 auto 12px' }} />
              <p style={{ color: '#64748B' }}>{t.noRequests}</p>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {mockRequests.map((request, idx) => {
                const statusColors = request.status === 'accepted'
                  ? { bg: '#DCFCE7', text: '#16A34A', border: '#86EFAC' }
                  : { bg: '#FEF3C7', text: '#D97706', border: '#FCD34D' };
                
                return (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => onViewRequestTracking?.(request.id)}
                    className="flex-shrink-0 w-80 p-5 rounded-[22px] cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 100%)',
                      border: '1.5px solid #DDE9FF',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
                    }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    {/* Status Badge */}
                    <div className="flex justify-end mb-3">
                      <div
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          background: statusColors.bg,
                          color: statusColors.text,
                          border: `1px solid ${statusColors.border}`,
                          fontWeight: 600
                        }}
                      >
                        {t.status[request.status as keyof typeof t.status]}
                      </div>
                    </div>

                    {/* Request Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock size={18} style={{ color: '#2E63FF' }} />
                        <span style={{ color: '#1F2937', fontWeight: 500 }}>
                          {request.preferredTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} style={{ color: '#64748B' }} />
                        <span className="text-sm" style={{ color: '#64748B' }}>
                          {request.location}
                        </span>
                      </div>
                      <div className="text-xs" style={{ color: '#94A3B8' }}>
                        {request.createdAt}
                      </div>
                    </div>

                    {/* Track Request Button */}
                    <button
                      className="w-full py-2 rounded-lg text-sm transition-all"
                      style={{
                        background: '#F0F6FF',
                        color: '#2E63FF',
                        fontWeight: 500
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewRequestTracking?.(request.id);
                      }}
                    >
                      {t.trackRequest}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* Map Preview */}
        <section className="mt-12">
          <div 
            className="p-6 rounded-2xl"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #DDE9FF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#1F2937', fontWeight: 600 }}>{t.mapPreview}</h3>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                style={{
                  background: '#F0F6FF',
                  color: '#2E63FF',
                  fontWeight: 500
                }}
                onClick={() => setShowFullMap(true)}
              >
                <MapIcon size={16} />
                {t.viewFullMap}
              </button>
            </div>
            
            {/* Map Preview */}
            <div 
              className="w-full rounded-xl overflow-hidden relative"
              style={{ 
                height: '300px',
                background: 'linear-gradient(135deg, #E5F0FF 0%, #F0F6FF 100%)',
                backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(85, 150, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(46, 99, 255, 0.1) 0%, transparent 50%)',
                position: 'relative'
              }}
            >
              {/* Simulated Map Grid */}
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'linear-gradient(rgba(168, 216, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 216, 255, 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
              
              {/* Therapist Markers */}
              {mockTherapists.map((therapist, idx) => {
                const positions = [
                  { top: '35%', left: '25%' },
                  { top: '45%', left: '55%' },
                  { top: '60%', left: '35%' },
                  { top: '25%', left: '70%' }
                ];
                const pos = positions[idx];
                
                return (
                  <motion.div
                    key={therapist.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.2, type: 'spring' }}
                    className="absolute group cursor-pointer"
                    style={pos}
                    onClick={() => onViewTherapistProfile?.(therapist.id)}
                  >
                    {/* Marker Pin */}
                    <div className="relative flex flex-col items-center">
                      {/* Availability Pulse */}
                      {therapist.available && (
                        <motion.div
                          className="absolute w-8 h-8 rounded-full"
                          style={{ background: '#10B981', opacity: 0.3, top: -4 }}
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      
                      {/* Pin Icon */}
                      <div className="relative">
                        <MapPin 
                          size={32} 
                          fill={therapist.available ? '#10B981' : '#5596FF'}
                          style={{ 
                            color: '#FFFFFF',
                            filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))'
                          }} 
                        />
                        {/* Mini Photo */}
                        <div 
                          className="absolute rounded-full overflow-hidden"
                          style={{
                            width: '14px',
                            height: '14px',
                            top: '6px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            border: '1px solid white'
                          }}
                        >
                          <ImageWithFallback
                            src={therapist.photo}
                            alt={therapist.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Hover Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        whileHover={{ opacity: 1, y: 0, scale: 1 }}
                        className="absolute top-full mt-2 p-3 rounded-xl whitespace-nowrap pointer-events-none group-hover:pointer-events-auto z-10"
                        style={{
                          background: '#FFFFFF',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                          border: '1px solid #DDE9FF',
                          opacity: 0
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
                            style={{ border: '1.5px solid #5596FF' }}
                          >
                            <ImageWithFallback
                              src={therapist.photo}
                              alt={therapist.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs" style={{ fontWeight: 600, color: '#1F2937' }}>
                              {therapist.name}
                            </h4>
                            <div className="flex items-center gap-1">
                              <Star size={10} fill="#FFA75F" style={{ color: '#FFA75F' }} />
                              <span className="text-xs" style={{ color: '#64748B' }}>
                                {therapist.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs" style={{ color: '#64748B' }}>
                          {therapist.distance} {t.kmAway}
                        </p>
                        {therapist.available && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#10B981' }} />
                            <span className="text-xs" style={{ color: '#10B981' }}>{t.available}</span>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Center Location Marker (Your Location) */}
              <div 
                className="absolute"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: '#2E63FF',
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 0 0 4px rgba(46, 99, 255, 0.2)'
                  }}
                />
              </div>
              
              {/* Map Legend */}
              <div 
                className="absolute bottom-3 left-3 px-3 py-2 rounded-lg backdrop-blur-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(168, 216, 255, 0.3)'
                }}
              >
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#2E63FF' }} />
                    <span style={{ color: '#64748B' }}>{isArabic ? 'موقعك' : 'You'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} fill="#10B981" style={{ color: '#FFFFFF' }} />
                    <span style={{ color: '#64748B' }}>{isArabic ? 'متاح' : 'Available'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer 
        className="mt-20 py-8"
        style={{
          background: 'linear-gradient(180deg, #F9FBFF 0%, #EAF3FF 100%)',
          borderTop: '1px solid #DDE9FF'
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Help Section */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span style={{ color: '#64748B' }}>{t.needHelp}</span>
            <button
              onClick={() => window.open('https://wa.me/966533867100', '_blank')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
              style={{
                background: 'linear-gradient(135deg, #86EFAC 0%, #22C55E 100%)',
                color: '#FFFFFF',
                fontWeight: 500
              }}
            >
              <MessageCircle size={16} />
              {t.chatWithSaban}
            </button>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-6 mb-4 text-sm">
            <button style={{ color: '#64748B' }}>{t.footer.privacy}</button>
            <span style={{ color: '#DDE9FF' }}>•</span>
            <button style={{ color: '#64748B' }}>{t.footer.terms}</button>
            <span style={{ color: '#DDE9FF' }}>•</span>
            <button style={{ color: '#64748B' }}>{t.footer.contact}</button>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm" style={{ color: '#94A3B8' }}>
            {t.footer.copyright}
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={onLanguageToggle}
              className="text-sm transition-colors duration-200"
              style={{ color: '#5596FF', fontWeight: 500 }}
            >
              {t.languageToggle}
            </button>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <PatientLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        language={language}
        onLanguageToggle={onLanguageToggle}
        onLoginSuccess={() => {
          // Handle successful login - could navigate to booking flow
          console.log('Login successful');
        }}
        onSignUp={() => {
          setShowLoginModal(false);
          setShowRegistrationModal(true);
        }}
        onForgotPassword={() => {
          setShowLoginModal(false);
          setShowForgotPasswordModal(true);
        }}
      />

      {/* Registration Modal */}
      <PatientRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        language={language}
        onLanguageToggle={onLanguageToggle}
        onBackToLogin={() => {
          setShowRegistrationModal(false);
          setShowLoginModal(true);
        }}
        onRegistrationSuccess={() => {
          // Handle successful registration - redirect to dashboard
          console.log('Registration successful');
        }}
      />

      {/* Forgot Password Modal */}
      <PatientForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        language={language}
        onBackToLogin={() => {
          setShowForgotPasswordModal(false);
          setShowLoginModal(true);
        }}
      />

      {/* Chatbot Floating Button */}
      {!showChatbot && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => window.open('https://wa.me/966533867100', '_blank')}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50"
          style={{
            background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
            boxShadow: '0 8px 24px rgba(46, 99, 255, 0.4)'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle size={24} style={{ color: '#FFFFFF' }} />
        </motion.button>
      )}

      {/* Chatbot Modal */}
      {showChatbot && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 w-96 rounded-2xl shadow-2xl z-50 overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '1px solid #DDE9FF',
            maxHeight: '600px'
          }}
        >
          {/* Chat Header */}
          <div 
            className="p-4 flex items-center justify-between"
            style={{
              background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 600 }}>سبعان</div>
                <div className="text-xs" style={{ color: '#A8D8FF' }}>
                  {isArabic ? 'مساعدك الشخصي' : 'Your Assistant'}
                </div>
              </div>
            </div>
            <button onClick={() => setShowChatbot(false)}>
              <X size={20} style={{ color: '#FFFFFF' }} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 h-96 overflow-y-auto">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <span>🤖</span>
              </div>
              <div 
                className="p-3 rounded-2xl rounded-tl-none max-w-xs"
                style={{ background: '#F0F6FF', color: '#1F2937' }}
              >
                {isArabic 
                  ? 'مرحبًا! أنا سبعان. كيف يمكنني مساعدتك اليوم؟'
                  : 'Hello! I\'m سبعان. How can I help you today?'}
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t" style={{ borderColor: '#DDE9FF' }}>
            <Input 
              placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
              className="w-full"
            />
          </div>
        </motion.div>
      )}

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSidebar(false)}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0, 0, 0, 0.4)' }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {showSidebar && (
          <motion.nav
            initial={{ x: isArabic ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isArabic ? 300 : -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 z-50"
            style={{
              [isArabic ? 'right' : 'left']: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent'
            }}
          >
            <div
              className="rounded-[28px] px-4 py-6 backdrop-blur-xl"
              style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(168, 216, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(46, 99, 255, 0.2)'
              }}
            >
              <div className="flex flex-col items-center gap-4">
                {[{
                  icon: Home,
                  label: t.bottomNav.home,
                  key: 'home',
                  onClick: () => { setShowSidebar(false); }
                },
                {
                  icon: Calendar,
                  label: t.bottomNav.bookings,
                  key: 'bookings',
                  onClick: () => { setShowSidebar(false); onViewMyBookings?.(); }
                },
                {
                  icon: FileText,
                  label: t.bottomNav.requests,
                  key: 'requests',
                  onClick: () => { setShowSidebar(false); onViewRequestTracking?.(mockRequests[0]?.id); }
                },
                {
                  icon: UserCircle,
                  label: t.bottomNav.profile,
                  key: 'profile',
                  onClick: () => { setShowSidebar(false); onViewProfile?.(); }
                }].map((item) => {
                  const Icon = item.icon;
                  const isActive = (currentTab || 'home') === item.key;
                  
                  return (
                    <button
                      key={item.key}
                      onClick={item.onClick}
                      className="flex flex-col items-center gap-1 py-3 px-3 rounded-xl transition-all duration-200 w-full"
                      style={{
                        background: isActive ? 'linear-gradient(135deg, #EAF3FF 0%, #D0E7FF 100%)' : 'transparent'
                      }}
                    >
                      <Icon
                        size={24}
                        style={{ 
                          color: isActive ? '#2E63FF' : '#94A3B8',
                          strokeWidth: isActive ? 2.5 : 2
                        }}
                      />
                      <span
                        className="text-xs"
                        style={{ 
                          color: isActive ? '#2E63FF' : '#94A3B8',
                          fontWeight: isActive ? 600 : 500
                        }}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Full Map Modal */}
      <AnimatePresence>
        {showFullMap && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFullMap(false)}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0, 0, 0, 0.7)' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 z-50 rounded-3xl overflow-hidden"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Map Header */}
              <div
                className="absolute top-0 left-0 right-0 z-10 p-6 flex items-center justify-between"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%)',
                  borderBottom: '1px solid #DDE9FF'
                }}
              >
                <h2 style={{ color: '#1F2937', fontWeight: 600, fontSize: '24px' }}>
                  {t.mapPreview}
                </h2>
                <button
                  onClick={() => setShowFullMap(false)}
                  className="p-2 rounded-xl transition-all duration-200"
                  style={{
                    background: '#F0F6FF',
                    color: '#2E63FF'
                  }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Full Screen Map */}
              <div className="w-full h-full pt-20 relative" style={{
                background: 'linear-gradient(135deg, #E5F0FF 0%, #F0F6FF 100%)',
                backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(85, 150, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(46, 99, 255, 0.1) 0%, transparent 50%)'
              }}>
                {/* Simulated Map Grid */}
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'linear-gradient(rgba(168, 216, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 216, 255, 0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }} />
                
                {/* Your Location */}
                <div 
                  className="absolute"
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-6 h-6 rounded-full"
                    style={{
                      background: '#2E63FF',
                      border: '4px solid #FFFFFF',
                      boxShadow: '0 0 0 6px rgba(46, 99, 255, 0.3)'
                    }}
                  />
                </div>
                
                {/* Therapist Cards in Full Map */}
                {mockTherapists.map((therapist, idx) => {
                  const positions = [
                    { top: '25%', left: '20%' },
                    { top: '35%', left: '60%' },
                    { top: '65%', left: '30%' },
                    { top: '20%', left: '75%' }
                  ];
                  const pos = positions[idx];
                  
                  return (
                    <motion.div
                      key={therapist.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.15 }}
                      className="absolute"
                      style={pos}
                    >
                      <div
                        className="bg-white rounded-2xl p-4 shadow-lg"
                        style={{
                          width: '240px',
                          border: '2px solid #5596FF',
                          boxShadow: '0 8px 24px rgba(46, 99, 255, 0.2)'
                        }}
                      >
                        {/* Available Badge */}
                        {therapist.available && (
                          <div 
                            className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs"
                            style={{ background: '#10B981', color: '#FFFFFF', fontWeight: 600 }}
                          >
                            {t.available}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                            style={{ border: '2px solid #5596FF' }}
                          >
                            <ImageWithFallback
                              src={therapist.photo}
                              alt={therapist.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm" style={{ fontWeight: 600, color: '#1F2937' }}>
                              {therapist.name}
                            </h4>
                            <div className="flex items-center gap-1 mt-1">
                              <Star size={12} fill="#FFA75F" style={{ color: '#FFA75F' }} />
                              <span className="text-xs" style={{ color: '#64748B' }}>
                                {therapist.rating} ({therapist.reviews})
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-xs mb-2" style={{ color: '#64748B' }}>
                          {therapist.specialty}
                        </p>
                        
                        <div className="flex items-center gap-1 mb-3">
                          <MapPin size={12} style={{ color: '#64748B' }} />
                          <span className="text-xs" style={{ color: '#64748B' }}>
                            {therapist.distance} {t.kmAway}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setShowFullMap(false);
                              onViewTherapistProfile?.(therapist.id);
                            }}
                            className="flex-1 py-2 rounded-lg text-xs transition-all"
                            style={{
                              background: '#F0F6FF',
                              color: '#2E63FF',
                              fontWeight: 500
                            }}
                          >
                            {t.viewProfile}
                          </button>
                          <button
                            onClick={() => {
                              setShowFullMap(false);
                              onBookTherapist?.(therapist.id);
                            }}
                            className="flex-1 py-2 rounded-lg text-xs text-white transition-all"
                            style={{
                              background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                              fontWeight: 600
                            }}
                          >
                            {t.book}
                          </button>
                        </div>
                      </div>
                      
                      {/* Connection Line to Location */}
                      <svg
                        className="absolute top-full left-1/2"
                        style={{
                          width: '2px',
                          height: '40px',
                          transform: 'translateX(-50%)'
                        }}
                      >
                        <line
                          x1="1"
                          y1="0"
                          x2="1"
                          y2="40"
                          stroke="#5596FF"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                      </svg>
                      
                      {/* Pin Marker */}
                      <div className="absolute top-full left-1/2 mt-8" style={{ transform: 'translateX(-50%)' }}>
                        <MapPin 
                          size={28} 
                          fill={therapist.available ? '#10B981' : '#5596FF'}
                          style={{ 
                            color: '#FFFFFF',
                            filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15))'
                          }} 
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}