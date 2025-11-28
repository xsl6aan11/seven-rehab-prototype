import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Star, 
  ChevronDown,
  Map as MapIcon,
  ArrowLeft,
  Clock,
  Award,
  Users,
  Bell
} from 'lucide-react';
import SevenRehabLogo from './SevenRehabLogo';

interface TherapistListingProps {
  language: 'EN' | 'AR';
  onLanguageToggle: () => void;
  onBack: () => void;
  onBookTherapist?: (therapistId: string) => void;
  onViewProfile?: (therapistId: string) => void;
  onRequestBroadcast?: () => void;
}

interface Therapist {
  id: string;
  name: string;
  nameAr: string;
  photo: string;
  specialty: string;
  specialtyAr: string;
  rating: number;
  reviews: number;
  distance: number;
  available: boolean;
  gender: 'male' | 'female';
  experience: number;
  sessionsCompleted: number;
}

const content = {
  EN: {
    greeting: 'Hello 👋, how are you?',
    subheading: 'Choose your preferred therapist',
    requestSession: 'Request a Home Session',
    notifyTherapists: 'Notify all therapists around you!',
    searchPlaceholder: 'Search by name or specialty...',
    filterButton: 'Filter',
    sortBy: 'Sort by',
    sortOptions: {
      nearest: 'Nearest',
      rating: 'Highest Rated',
      mostBooked: 'Most Booked'
    },
    available: 'Available Now',
    busy: 'Busy',
    kmAway: 'km away',
    bookButton: 'Book',
    profileButton: 'View Profile',
    yearsExp: 'years exp',
    sessions: 'sessions',
    bottomSheetText: 'therapists available near you',
    viewOnMap: 'View on Map',
    footerText: 'We work to match you with the best therapists in your area.',
    noResults: 'No therapists found',
    tryAdjusting: 'Try adjusting your filters',
    filters: {
      title: 'Filters',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      all: 'All',
      distance: 'Distance',
      rating: 'Minimum Rating',
      availability: 'Availability',
      availableOnly: 'Available Now Only',
      apply: 'Apply Filters',
      reset: 'Reset'
    }
  },
  AR: {
    greeting: 'مرحباً 👋، كيف حالك؟',
    subheading: 'اختر الأخصائي المناسب لك',
    requestSession: 'حجز جلسة منزلية',
    notifyTherapists: 'إشعار جميع المعالجين حولك!',
    searchPlaceholder: 'البحث بالاسم أو التخصص...',
    filterButton: 'تصفية',
    sortBy: 'ترتيب حسب',
    sortOptions: {
      nearest: 'الأقرب',
      rating: 'الأعلى تقييماً',
      mostBooked: 'الأكثر حجزاً'
    },
    available: 'متاح الآن',
    busy: 'مشغول',
    kmAway: 'كم',
    bookButton: 'احجز',
    profileButton: 'الملف الشخصي',
    yearsExp: 'سنة خبرة',
    sessions: 'جلسة',
    bottomSheetText: 'أخصائي متاح بالقرب منك',
    viewOnMap: 'عرض على الخريطة',
    footerText: 'نعمل على مطابقتك مع أفضل المعالجين في منطقتك.',
    noResults: 'لم يتم العثور على أخصائيين',
    tryAdjusting: 'حاول تعديل الفلاتر الخاصة بك',
    filters: {
      title: 'الفلاتر',
      gender: 'الجنس',
      male: 'ذكر',
      female: 'أنثى',
      all: 'الكل',
      distance: 'المسافة',
      rating: 'الحد الأدنى للتقييم',
      availability: 'التوفر',
      availableOnly: 'المتاحون الآن فقط',
      apply: 'تطبيق الفلاتر',
      reset: 'إعادة تعيين'
    }
  }
};

const mockTherapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Faisal Al-Harbi',
    nameAr: 'د. فيصل الحربي',
    photo: 'https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    specialty: 'Sports Rehabilitation',
    specialtyAr: 'تأهيل رياضي',
    rating: 4.9,
    reviews: 127,
    distance: 1.2,
    available: true,
    gender: 'male',
    experience: 8,
    sessionsCompleted: 456
  },
  {
    id: '2',
    name: 'Dr. Layla Al-Mutairi',
    nameAr: 'د. ليلى المطيري',
    photo: 'https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    specialty: 'General Physical Therapy',
    specialtyAr: 'علاج طبيعي عام',
    rating: 4.8,
    reviews: 203,
    distance: 2.1,
    available: true,
    gender: 'female',
    experience: 6,
    sessionsCompleted: 512
  },
  {
    id: '3',
    name: 'Dr. Ahmed Al-Rashid',
    nameAr: 'د. أحمد الراشد',
    photo: 'https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    specialty: 'Neurology Physical Therapy',
    specialtyAr: 'علاج طبيعي عصبي',
    rating: 4.7,
    reviews: 156,
    distance: 3.5,
    available: false,
    gender: 'male',
    experience: 12,
    sessionsCompleted: 892
  },
  {
    id: '4',
    name: 'Dr. Noura Al-Dosari',
    nameAr: 'د. نورة الدوسري',
    photo: 'https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    specialty: 'Pediatric Physical Therapy',
    specialtyAr: 'علاج طبيعي أطفال',
    rating: 4.9,
    reviews: 189,
    distance: 1.8,
    available: true,
    gender: 'female',
    experience: 7,
    sessionsCompleted: 623
  },
  {
    id: '5',
    name: 'Dr. Omar Al-Zahrani',
    nameAr: 'د. عمر الزهراني',
    photo: 'https://images.unsplash.com/photo-1733685318562-c726472bc1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    specialty: 'Orthopedic Therapy',
    specialtyAr: 'علاج العظام',
    rating: 4.6,
    reviews: 98,
    distance: 4.2,
    available: true,
    gender: 'male',
    experience: 5,
    sessionsCompleted: 234
  },
  {
    id: '6',
    name: 'Dr. Huda Al-Qahtani',
    nameAr: 'د. هدى القحطاني',
    photo: 'https://images.unsplash.com/photo-1758691463393-a2aa9900af8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    specialty: 'Geriatric Physical Therapy',
    specialtyAr: 'علاج طبيعي لكبار السن',
    rating: 4.8,
    reviews: 142,
    distance: 2.9,
    available: false,
    gender: 'female',
    experience: 10,
    sessionsCompleted: 567
  }
];

export default function TherapistListing({
  language,
  onLanguageToggle,
  onBack,
  onBookTherapist,
  onViewProfile,
  onRequestBroadcast
}: TherapistListingProps) {
  const isArabic = language === 'AR';
  const t = content[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'nearest' | 'rating' | 'mostBooked'>('nearest');
  const [showFilters, setShowFilters] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter states
  const [filterGender, setFilterGender] = useState<'all' | 'male' | 'female'>('all');
  const [filterDistance, setFilterDistance] = useState(10);
  const [filterRating, setFilterRating] = useState(0);
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showSortDropdown) setShowSortDropdown(false);
    };
    
    if (showSortDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSortDropdown]);

  // Filter and sort therapists
  const filteredTherapists = mockTherapists
    .filter(therapist => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const nameMatch = therapist.name.toLowerCase().includes(searchLower) || 
                       therapist.nameAr.includes(searchQuery);
      const specialtyMatch = therapist.specialty.toLowerCase().includes(searchLower) ||
                            therapist.specialtyAr.includes(searchQuery);
      if (searchQuery && !nameMatch && !specialtyMatch) return false;

      // Gender filter
      if (filterGender !== 'all' && therapist.gender !== filterGender) return false;

      // Distance filter
      if (therapist.distance > filterDistance) return false;

      // Rating filter
      if (therapist.rating < filterRating) return false;

      // Availability filter
      if (filterAvailableOnly && !therapist.available) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'nearest') return a.distance - b.distance;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'mostBooked') return b.sessionsCompleted - a.sessionsCompleted;
      return 0;
    });

  const availableCount = filteredTherapists.filter(t => t.available).length;

  const resetFilters = () => {
    setFilterGender('all');
    setFilterDistance(10);
    setFilterRating(0);
    setFilterAvailableOnly(false);
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
          background: 'linear-gradient(180deg, rgba(234, 243, 255, 0.95) 0%, rgba(207, 230, 255, 0.8) 100%)',
          boxShadow: '0 2px 16px rgba(85, 150, 255, 0.08)'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          {/* Top Row - Logo & Back */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 transition-colors"
              style={{ color: '#5596FF' }}
            >
              <ArrowLeft 
                size={20} 
                style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }}
              />
            </button>

            <SevenRehabLogo width={48} />

            <button
              onClick={onLanguageToggle}
              className="text-sm transition-colors"
              style={{ color: '#5596FF', fontWeight: 500 }}
            >
              {isArabic ? 'EN' : 'عربي'}
            </button>
          </div>

          {/* Greeting & Subheading */}
          <div className="text-center mb-4">
            <h1
              className="mb-1"
              style={{
                color: '#1E293B',
                fontSize: '24px',
                fontWeight: 600
              }}
            >
              {t.greeting}
            </h1>
            <p
              className="text-sm"
              style={{ color: '#64748B' }}
            >
              {t.subheading}
            </p>
          </div>

          {/* Request Session Button */}
          <motion.button
            onClick={onRequestBroadcast}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full py-3.5 rounded-2xl text-white transition-all duration-200 flex items-center justify-center gap-3 mb-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
              boxShadow: '0 8px 24px rgba(46, 99, 255, 0.3)',
              fontWeight: 600
            }}
            whileHover={{ scale: 1.01, boxShadow: '0 12px 32px rgba(46, 99, 255, 0.4)' }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Animated Ring Effect */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)'
              }}
            />
            
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <Bell size={20} style={{ color: 'white' }} />
            </motion.div>
            
            <div className="flex flex-col items-center gap-0.5">
              <span style={{ fontSize: '16px' }}>{t.requestSession}</span>
              <span className="text-xs" style={{ fontWeight: 400, opacity: 0.9 }}>
                {t.notifyTherapists}
              </span>
            </div>
          </motion.button>

          {/* Search & Filter Row */}
          <div className="flex gap-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  [isArabic ? 'right' : 'left']: '14px',
                  color: '#94A3B8'
                }}
              />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 rounded-2xl transition-all duration-200"
                style={{
                  [isArabic ? 'paddingRight' : 'paddingLeft']: '44px',
                  [isArabic ? 'paddingLeft' : 'paddingRight']: '16px',
                  border: '2px solid #E2E8F0',
                  background: 'white',
                  color: '#1E293B',
                  fontSize: '15px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.border = '2px solid #5596FF'}
                onBlur={(e) => e.target.style.border = '2px solid #E2E8F0'}
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 rounded-2xl transition-all flex items-center gap-2"
              style={{
                border: '2px solid #5596FF',
                background: showFilters ? '#5596FF' : 'white',
                color: showFilters ? 'white' : '#5596FF',
                fontWeight: 500
              }}
            >
              <SlidersHorizontal size={20} />
              <span className="hidden sm:inline">{t.filterButton}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSortDropdown(!showSortDropdown);
                }}
                className="px-4 py-3 rounded-2xl transition-all flex items-center gap-2 whitespace-nowrap"
                style={{
                  border: '2px solid #E2E8F0',
                  background: 'white',
                  color: '#1E293B',
                  fontWeight: 500
                }}
              >
                <span className="text-sm">{t.sortOptions[sortBy]}</span>
                <ChevronDown size={16} />
              </button>

              {/* Sort Dropdown Menu */}
              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 rounded-2xl overflow-hidden shadow-lg"
                    style={{
                      [isArabic ? 'left' : 'right']: 0,
                      background: 'white',
                      border: '1px solid #E2E8F0',
                      minWidth: '200px',
                      zIndex: 50
                    }}
                  >
                    {(['nearest', 'rating', 'mostBooked'] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setShowSortDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-sm transition-colors text-left"
                        style={{
                          background: sortBy === option ? '#F0F6FF' : 'transparent',
                          color: sortBy === option ? '#5596FF' : '#1E293B',
                          textAlign: isArabic ? 'right' : 'left'
                        }}
                      >
                        {t.sortOptions[option]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            style={{
              background: 'white',
              borderBottom: '1px solid #E2E8F0'
            }}
          >
            <div className="max-w-6xl mx-auto px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gender Filter */}
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#334155', fontWeight: 500 }}>
                    {t.filters.gender}
                  </label>
                  <div className="flex gap-2">
                    {(['all', 'male', 'female'] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => setFilterGender(option)}
                        className="flex-1 py-2 px-4 rounded-xl transition-all text-sm"
                        style={{
                          background: filterGender === option ? '#5596FF' : '#F0F6FF',
                          color: filterGender === option ? 'white' : '#5596FF',
                          fontWeight: 500
                        }}
                      >
                        {t.filters[option]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#334155', fontWeight: 500 }}>
                    {t.filters.availability}
                  </label>
                  <button
                    onClick={() => setFilterAvailableOnly(!filterAvailableOnly)}
                    className="w-full py-2 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                    style={{
                      background: filterAvailableOnly ? '#5596FF' : '#F0F6FF',
                      color: filterAvailableOnly ? 'white' : '#5596FF',
                      fontWeight: 500
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center"
                      style={{
                        border: filterAvailableOnly ? '2px solid white' : '2px solid #5596FF',
                        background: filterAvailableOnly ? 'white' : 'transparent'
                      }}
                    >
                      {filterAvailableOnly && (
                        <div className="w-3 h-3 rounded" style={{ background: '#5596FF' }} />
                      )}
                    </div>
                    {t.filters.availableOnly}
                  </button>
                </div>

                {/* Distance Filter */}
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#334155', fontWeight: 500 }}>
                    {t.filters.distance}: {filterDistance} {t.kmAway}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={filterDistance}
                    onChange={(e) => setFilterDistance(Number(e.target.value))}
                    className="w-full"
                    style={{
                      accentColor: '#5596FF'
                    }}
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#334155', fontWeight: 500 }}>
                    {t.filters.rating}: {filterRating > 0 ? `${filterRating}+` : t.filters.all}
                  </label>
                  <div className="flex gap-2">
                    {[0, 4.5, 4.7, 4.9].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilterRating(rating)}
                        className="flex-1 py-2 px-3 rounded-xl transition-all text-sm"
                        style={{
                          background: filterRating === rating ? '#5596FF' : '#F0F6FF',
                          color: filterRating === rating ? 'white' : '#5596FF',
                          fontWeight: 500
                        }}
                      >
                        {rating > 0 ? `${rating}+` : t.filters.all}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-3 rounded-2xl transition-all"
                  style={{
                    background: '#F0F6FF',
                    color: '#5596FF',
                    fontWeight: 500
                  }}
                >
                  {t.filters.reset}
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-3 rounded-2xl transition-all text-white"
                  style={{
                    background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                    fontWeight: 600
                  }}
                >
                  {t.filters.apply}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 pb-32">
        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-sm" style={{ color: '#64748B' }}>
            {filteredTherapists.length} {t.bottomSheetText}
          </p>
        </div>

        {/* Therapist Cards */}
        {filteredTherapists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTherapists.map((therapist, index) => (
              <motion.div
                key={therapist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: 'white',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
                whileHover={{ 
                  boxShadow: '0 8px 24px rgba(85, 150, 255, 0.15)',
                  y: -4
                }}
              >
                <div className="p-5">
                  <div className="flex gap-4">
                    {/* Profile Photo */}
                    <div
                      className="rounded-full overflow-hidden flex-shrink-0"
                      style={{
                        width: '72px',
                        height: '72px',
                        border: '3px solid #E2E8F0'
                      }}
                    >
                      <img
                        src={therapist.photo}
                        alt={isArabic ? therapist.nameAr : therapist.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      {/* Name */}
                      <h3
                        className="mb-1 truncate"
                        style={{
                          color: '#1E293B',
                          fontSize: '18px',
                          fontWeight: 600
                        }}
                      >
                        {isArabic ? therapist.nameAr : therapist.name}
                      </h3>

                      {/* Specialty */}
                      <p
                        className="text-sm mb-2 truncate"
                        style={{ color: '#64748B' }}
                      >
                        {isArabic ? therapist.specialtyAr : therapist.specialty}
                      </p>

                      {/* Availability */}
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: therapist.available ? '#27AE60' : '#94A3B8'
                          }}
                        />
                        <span
                          className="text-sm"
                          style={{
                            color: therapist.available ? '#27AE60' : '#94A3B8',
                            fontWeight: 500
                          }}
                        >
                          {therapist.available ? t.available : t.busy}
                        </span>
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center gap-4 text-xs mb-3">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          <Star size={14} style={{ color: '#FFA726', fill: '#FFA726' }} />
                          <span style={{ color: '#1E293B', fontWeight: 600 }}>
                            {therapist.rating}
                          </span>
                          <span style={{ color: '#94A3B8' }}>
                            ({therapist.reviews})
                          </span>
                        </div>

                        {/* Distance */}
                        <div className="flex items-center gap-1">
                          <MapPin size={14} style={{ color: '#5596FF' }} />
                          <span style={{ color: '#64748B' }}>
                            {therapist.distance} {t.kmAway}
                          </span>
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="flex items-center gap-4 text-xs mb-4">
                        <div className="flex items-center gap-1">
                          <Award size={14} style={{ color: '#8CB7FF' }} />
                          <span style={{ color: '#64748B' }}>
                            {therapist.experience} {t.yearsExp}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} style={{ color: '#8CB7FF' }} />
                          <span style={{ color: '#64748B' }}>
                            {therapist.sessionsCompleted} {t.sessions}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewProfile?.(therapist.id)}
                          className="flex-1 py-2 rounded-xl text-sm transition-all flex items-center justify-center"
                          style={{
                            background: '#F0F6FF',
                            color: '#5596FF',
                            fontWeight: 500
                          }}
                        >
                          {t.profileButton}
                        </button>
                        <motion.button
                          onClick={() => onBookTherapist?.(therapist.id)}
                          disabled={!therapist.available}
                          className="flex-1 py-2 rounded-xl text-sm text-white transition-all flex items-center justify-center"
                          style={{
                            background: therapist.available 
                              ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                              : '#E2E8F0',
                            fontWeight: 600,
                            opacity: therapist.available ? 1 : 0.6,
                            cursor: therapist.available ? 'pointer' : 'not-allowed'
                          }}
                          whileHover={therapist.available ? { scale: 1.02 } : {}}
                          whileTap={therapist.available ? { scale: 0.98 } : {}}
                        >
                          {t.bookButton}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* No Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div
              className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: '#F0F6FF' }}
            >
              <Search size={48} style={{ color: '#8CB7FF' }} />
            </div>
            <h3
              className="mb-2"
              style={{
                color: '#1E293B',
                fontSize: '20px',
                fontWeight: 600
              }}
            >
              {t.noResults}
            </h3>
            <p className="text-sm" style={{ color: '#64748B' }}>
              {t.tryAdjusting}
            </p>
          </motion.div>
        )}
      </main>

      {/* Floating Bottom Sheet */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: 'linear-gradient(135deg, rgba(85, 150, 255, 0.95) 0%, rgba(46, 99, 255, 0.95) 100%)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Summary */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <Users size={20} style={{ color: 'white' }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {availableCount} {t.bottomSheetText}
                </p>
              </div>
            </div>

            {/* View on Map Button */}
            <button
              onClick={() => setShowMapView(!showMapView)}
              className="px-5 py-2.5 rounded-2xl transition-all flex items-center gap-2"
              style={{
                background: 'white',
                color: '#2E63FF',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            >
              <MapIcon size={18} />
              <span>{t.viewOnMap}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Footer Message */}
      <div
        className="fixed bottom-20 left-0 right-0 pointer-events-none"
        style={{ zIndex: 40 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <p
            className="text-center text-xs"
            style={{
              color: '#94A3B8',
              background: 'rgba(249, 251, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              padding: '8px 16px',
              borderRadius: '12px',
              display: 'inline-block',
              margin: '0 auto',
              width: 'fit-content',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
              textAlign: 'center'
            }}
          >
            {t.footerText}
          </p>
        </div>
      </div>
    </div>
  );
}
