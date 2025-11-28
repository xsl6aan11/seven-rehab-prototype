import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronDown,
  Camera,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Calendar,
  DollarSign,
  Bell,
  HelpCircle,
  Lock,
  LogOut,
  Trash2,
  Sun,
  Moon,
  Settings as SettingsIcon,
  Mail,
  Phone,
  User,
  FileText,
  CreditCard,
  AlertCircle
} from 'lucide-react';

interface TherapistSettingsProps {
  language: 'EN' | 'AR';
  onBack?: () => void;
  onLanguageToggle: () => void;
  onBackToHome: () => void;
}

type SectionKey = 'personal' | 'documents' | 'location' | 'availability' | 'earnings' | 'preferences' | 'support' | 'account';

const content = {
  EN: {
    title: 'Settings',
    subtitle: 'Manage your data, schedule, and documents',
    
    // Sections
    personal: 'Personal Information',
    documents: 'Professional Documents',
    location: 'Location & Service Radius',
    availability: 'Work Schedule',
    earnings: 'Earnings & Payments',
    preferences: 'App Preferences',
    support: 'Technical Support',
    account: 'Account & Security',
    
    // Personal Info
    uploadPhoto: 'Upload Profile Photo',
    fullName: 'Full Name',
    mobile: 'Mobile Number',
    email: 'Email Address',
    changeEmail: 'Change Email',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    yearsExp: 'Years of Experience',
    specialties: 'Specialties',
    bio: 'About You',
    save: 'Save Changes',
    
    // Documents
    license: 'Professional License',
    nationalId: 'National ID / Residence',
    certificates: 'Certificates',
    additionalDocs: 'Additional Documents',
    verified: 'Verified',
    pending: 'Pending',
    rejected: 'Rejected',
    uploadFile: 'Upload File',
    
    // Location
    yourAddress: 'Your Address',
    serviceRadius: 'Service Radius',
    km: 'km',
    saveLocation: 'Save Location',
    
    // Availability
    saturday: 'Saturday',
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    onlineStatus: 'Online Status',
    vacationMode: 'Vacation Mode',
    clearAll: 'Clear All',
    saveSchedule: 'Save Schedule',
    
    // Earnings
    totalEarnings: 'Total Earnings',
    totalBonuses: 'Total Bonuses',
    iban: 'IBAN Number',
    transactionHistory: 'Transaction History',
    
    // Preferences
    language: 'Language',
    notifications: 'Enable Notifications',
    notifyVia: 'Notifications via',
    sms: 'SMS',
    whatsapp: 'WhatsApp',
    emailNotif: 'Email',
    darkMode: 'Dark Mode',
    
    // Support
    contactUs: 'Contact Us',
    faq: 'Frequently Asked Questions',
    
    // Account
    changePassword: 'Change Password',
    logout: 'Logout',
    deleteAccount: 'Delete Account',
    deleteWarning: 'This action cannot be undone',
    
    // Specialties
    neuro: 'Neurological',
    ortho: 'Orthopedic',
    sports: 'Sports',
    cardio: 'Cardiopulmonary',
    pediatric: 'Pediatric',
    geriatric: 'Geriatric'
  },
  AR: {
    title: 'الإعدادات',
    subtitle: 'إدارة بياناتك، جدولك، ومستنداتك',
    
    // Sections
    personal: 'المعلومات الشخصية',
    documents: 'المستندات المهنية',
    location: 'الموقع ونطاق الخدمة',
    availability: 'جدول العمل',
    earnings: 'الأرباح والدفعات',
    preferences: 'تفضيلات التطبيق',
    support: 'الدعم الفني',
    account: 'الحساب والأمان',
    
    // Personal Info
    uploadPhoto: 'رفع صورة الملف الشخصي',
    fullName: 'الاسم الكامل',
    mobile: 'رقم الجوال',
    email: 'البريد الإلكتروني',
    changeEmail: 'تغيير البريد الإلكتروني',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    yearsExp: 'سنوات الخبرة',
    specialties: 'التخصصات',
    bio: 'نبذة عنك',
    save: 'حفظ التغييرات',
    
    // Documents
    license: 'رخصة مزاولة المهنة',
    nationalId: 'الهوية الوطنية / الإقامة',
    certificates: 'الشهادات',
    additionalDocs: 'مستندات إضافية',
    verified: 'موثق',
    pending: 'قيد المراجعة',
    rejected: 'مرفوض',
    uploadFile: 'رفع ملف',
    
    // Location
    yourAddress: 'عنوانك',
    serviceRadius: 'نطاق الخدمة',
    km: 'كم',
    saveLocation: 'حفظ الموقع',
    
    // Availability
    saturday: 'السبت',
    sunday: 'الأحد',
    monday: 'الإثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    onlineStatus: 'الحالة',
    vacationMode: 'وضع الإجازة',
    clearAll: 'مسح الكل',
    saveSchedule: 'حفظ الجدول',
    
    // Earnings
    totalEarnings: 'إجمالي الأرباح',
    totalBonuses: 'مجموع المكافآت',
    iban: 'رقم الآيبان',
    transactionHistory: 'سجل الحركات المالية',
    
    // Preferences
    language: 'اللغة',
    notifications: 'تفعيل الإشعارات',
    notifyVia: 'الإشعارات عبر',
    sms: 'رسائل نصية',
    whatsapp: 'واتساب',
    emailNotif: 'البريد الإلكتروني',
    darkMode: 'الوضع الليلي',
    
    // Support
    contactUs: 'تواصل معنا',
    faq: 'الأسئلة الشائعة',
    
    // Account
    changePassword: 'تغيير كلمة المرور',
    logout: 'تسجيل الخروج',
    deleteAccount: 'حذف الحساب',
    deleteWarning: 'هذا الإجراء لا يمكن التراجع عنه',
    
    // Specialties
    neuro: 'علاج عصبي',
    ortho: 'علاج عظام',
    sports: 'علاج رياضي',
    cardio: 'علاج قلبي تنفسي',
    pediatric: 'علاج أطفال',
    geriatric: 'علاج مسنين'
  }
};

export default function TherapistSettings({ language, onBack, onLanguageToggle, onBackToHome }: TherapistSettingsProps) {
  const isArabic = language === 'AR';
  const t = content[language];
  
  const [expandedSections, setExpandedSections] = useState<SectionKey[]>(['personal']);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['neuro', 'ortho']);
  const [serviceRadius, setServiceRadius] = useState(10);
  const [isOnline, setIsOnline] = useState(true);
  const [vacationMode, setVacationMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedNotifyChannels, setSelectedNotifyChannels] = useState<string[]>(['whatsapp', 'sms']);
  const [selectedDays, setSelectedDays] = useState<string[]>(['saturday', 'sunday', 'monday', 'tuesday', 'wednesday']);

  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const toggleNotifyChannel = (channel: string) => {
    setSelectedNotifyChannels(prev =>
      prev.includes(channel)
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const sections = [
    { key: 'personal' as SectionKey, icon: User, title: t.personal },
    { key: 'documents' as SectionKey, icon: FileText, title: t.documents },
    { key: 'location' as SectionKey, icon: MapPin, title: t.location },
    { key: 'earnings' as SectionKey, icon: DollarSign, title: t.earnings },
    { key: 'preferences' as SectionKey, icon: SettingsIcon, title: t.preferences },
    { key: 'support' as SectionKey, icon: HelpCircle, title: t.support },
    { key: 'account' as SectionKey, icon: Lock, title: t.account }
  ];

  const specialties = ['neuro', 'ortho', 'sports', 'cardio', 'pediatric', 'geriatric'];
  const days = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  const documents = [
    { id: 'license', name: t.license, status: 'verified' as const },
    { id: 'nationalId', name: t.nationalId, status: 'verified' as const },
    { id: 'certificates', name: t.certificates, status: 'pending' as const },
    { id: 'additional', name: t.additionalDocs, status: 'rejected' as const, comment: 'Please upload a clearer image' }
  ];

  const statusConfig = {
    verified: { color: '#10B981', bg: '#D1FAE5', icon: CheckCircle },
    pending: { color: '#F59E0B', bg: '#FEF3C7', icon: Clock },
    rejected: { color: '#EF4444', bg: '#FEE2E2', icon: XCircle }
  };

  return (
    <div
      className="min-h-screen pb-8"
      style={{
        background: 'linear-gradient(180deg, #EAF3FF 0%, #CDE1FF 100%)',
        direction: isArabic ? 'rtl' : 'ltr',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
          padding: '48px 24px 32px 24px',
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          boxShadow: '0 8px 16px rgba(46, 99, 255, 0.2)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div className="flex items-center mb-4">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl transition-all active:scale-95"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <ChevronLeft 
              size={24} 
              color="#FFFFFF" 
              style={{
                transform: isArabic ? 'rotate(180deg)' : 'none'
              }}
            />
          </button>
        </div>

        <motion.h1
          className="text-[28px] mb-2"
          style={{
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '-0.5px'
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {t.title}
        </motion.h1>

        <motion.p
          className="text-[14px]"
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontWeight: 500
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {t.subtitle}
        </motion.p>
      </div>

      {/* Settings Sections */}
      <div className="px-6 py-6 space-y-4">
        {sections.map((section, index) => {
          const isExpanded = expandedSections.includes(section.key);
          const Icon = section.icon;

          return (
            <motion.div
              key={section.key}
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                border: '1px solid #E4EEFF'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full p-4 flex items-center justify-between transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #E0EFFF 0%, #CDE1FF 100%)'
                    }}
                  >
                    <Icon size={20} color="#2E63FF" />
                  </div>
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#1F2937'
                    }}
                  >
                    {section.title}
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} color="#64748B" />
                </motion.div>
              </button>

              {/* Section Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                      {/* Personal Information */}
                      {section.key === 'personal' && (
                        <div className="space-y-4">
                          {/* Upload Photo */}
                          <div className="flex flex-col items-center py-4">
                            <div
                              className="relative w-24 h-24 rounded-full mb-3"
                              style={{
                                background: 'linear-gradient(135deg, #E0EFFF 0%, #CDE1FF 100%)',
                                border: '3px solid #FFFFFF',
                                boxShadow: '0 4px 12px rgba(46, 99, 255, 0.15)'
                              }}
                            >
                              <User size={40} color="#2E63FF" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                              <button
                                className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
                                style={{
                                  background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                                  boxShadow: '0 2px 6px rgba(46, 99, 255, 0.3)'
                                }}
                              >
                                <Camera size={16} color="#FFFFFF" />
                              </button>
                            </div>
                            <span
                              style={{
                                fontSize: '13px',
                                color: '#64748B',
                                fontWeight: 500
                              }}
                            >
                              {t.uploadPhoto}
                            </span>
                          </div>

                          {/* Form Fields */}
                          <div className="space-y-3">
                            {/* Full Name */}
                            <div>
                              <label
                                style={{
                                  fontSize: '13px',
                                  color: '#64748B',
                                  fontWeight: 600,
                                  display: 'block',
                                  marginBottom: '8px'
                                }}
                              >
                                {t.fullName}
                              </label>
                              <input
                                type="text"
                                placeholder="Dr. Ahmed Al-Sayed"
                                className="w-full px-4 py-3 rounded-xl"
                                style={{
                                  border: '1px solid #E4EEFF',
                                  fontSize: '14px',
                                  color: '#1F2937',
                                  outline: 'none'
                                }}
                              />
                            </div>

                            {/* Mobile */}
                            <div>
                              <label
                                style={{
                                  fontSize: '13px',
                                  color: '#64748B',
                                  fontWeight: 600,
                                  display: 'block',
                                  marginBottom: '8px'
                                }}
                              >
                                {t.mobile}
                              </label>
                              <input
                                type="tel"
                                placeholder="+966 50 123 4567"
                                className="w-full px-4 py-3 rounded-xl"
                                style={{
                                  border: '1px solid #E4EEFF',
                                  fontSize: '14px',
                                  color: '#1F2937',
                                  outline: 'none'
                                }}
                              />
                            </div>

                            {/* Email */}
                            <div>
                              <label
                                style={{
                                  fontSize: '13px',
                                  color: '#64748B',
                                  fontWeight: 600,
                                  display: 'block',
                                  marginBottom: '8px'
                                }}
                              >
                                {t.email}
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="email"
                                  placeholder="ahmed@example.com"
                                  className="flex-1 px-4 py-3 rounded-xl"
                                  style={{
                                    border: '1px solid #E4EEFF',
                                    fontSize: '14px',
                                    color: '#1F2937',
                                    outline: 'none'
                                  }}
                                />
                                <button
                                  className="px-4 py-3 rounded-xl"
                                  style={{
                                    background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                                    color: '#FFFFFF',
                                    fontSize: '13px',
                                    fontWeight: 600
                                  }}
                                >
                                  {t.changeEmail}
                                </button>
                              </div>
                            </div>

                            {/* Gender */}
                            <div>
                              <label
                                style={{
                                  fontSize: '13px',
                                  color: '#64748B',
                                  fontWeight: 600,
                                  display: 'block',
                                  marginBottom: '8px'
                                }}
                              >
                                {t.gender}
                              </label>
                              <div className="flex gap-2">
                                {(['male', 'female'] as const).map(gender => (
                                  <button
                                    key={gender}
                                    onClick={() => setSelectedGender(gender)}
                                    className="flex-1 py-3 rounded-xl transition-all"
                                    style={{
                                      background: selectedGender === gender
                                        ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                                        : '#F8FAFC',
                                      color: selectedGender === gender ? '#FFFFFF' : '#64748B',
                                      fontSize: '14px',
                                      fontWeight: 600,
                                      border: selectedGender === gender ? 'none' : '1px solid #E4EEFF'
                                    }}
                                  >
                                    {gender === 'male' ? t.male : t.female}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Years of Experience */}
                            <div>
                              <label
                                style={{
                                  fontSize: '13px',
                                  color: '#64748B',
                                  fontWeight: 600,
                                  display: 'block',
                                  marginBottom: '8px'
                                }}
                              >
                                {t.yearsExp}
                              </label>
                              <input
                                type="number"
                                placeholder="5"
                                className="w-full px-4 py-3 rounded-xl"
                                style={{
                                  border: '1px solid #E4EEFF',
                                  fontSize: '14px',
                                  color: '#1F2937',
                                  outline: 'none'
                                }}
                              />
                            </div>

                            {/* Bio */}
                            <div>
                              <label
                                style={{
                                  fontSize: '13px',
                                  color: '#64748B',
                                  fontWeight: 600,
                                  display: 'block',
                                  marginBottom: '8px'
                                }}
                              >
                                {t.bio}
                              </label>
                              <textarea
                                rows={4}
                                placeholder={isArabic ? 'اكتب نبذة مختصرة عنك...' : 'Write a short bio about yourself...'}
                                className="w-full px-4 py-3 rounded-xl resize-none"
                                style={{
                                  border: '1px solid #E4EEFF',
                                  fontSize: '14px',
                                  color: '#1F2937',
                                  outline: 'none'
                                }}
                              />
                            </div>
                          </div>

                          {/* Save Button */}
                          <button
                            className="w-full py-3 rounded-xl mt-4"
                            style={{
                              background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                              color: '#FFFFFF',
                              fontSize: '15px',
                              fontWeight: 600,
                              boxShadow: '0 4px 12px rgba(46, 99, 255, 0.25)'
                            }}
                          >
                            {t.save}
                          </button>
                        </div>
                      )}

                      {/* Professional Documents */}
                      {section.key === 'documents' && (
                        <div className="space-y-3">
                          {documents.map(doc => {
                            const status = statusConfig[doc.status];
                            const StatusIcon = status.icon;

                            return (
                              <div
                                key={doc.id}
                                className="p-4 rounded-xl"
                                style={{
                                  background: '#F8FAFC',
                                  border: '1px solid #E4EEFF'
                                }}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span
                                    style={{
                                      fontSize: '14px',
                                      fontWeight: 600,
                                      color: '#1F2937'
                                    }}
                                  >
                                    {doc.name}
                                  </span>
                                  <div
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                                    style={{
                                      background: status.bg,
                                      color: status.color
                                    }}
                                  >
                                    <StatusIcon size={14} />
                                    <span
                                      style={{
                                        fontSize: '11px',
                                        fontWeight: 600
                                      }}
                                    >
                                      {t[doc.status as keyof typeof t]}
                                    </span>
                                  </div>
                                </div>

                                {doc.comment && (
                                  <p
                                    className="mb-3"
                                    style={{
                                      fontSize: '12px',
                                      color: '#EF4444',
                                      fontWeight: 500
                                    }}
                                  >
                                    ⚠️ {doc.comment}
                                  </p>
                                )}

                                <button
                                  className="w-full py-2.5 rounded-lg flex items-center justify-center gap-2"
                                  style={{
                                    background: '#FFFFFF',
                                    border: '1px solid #E4EEFF',
                                    color: '#2E63FF',
                                    fontSize: '13px',
                                    fontWeight: 600
                                  }}
                                >
                                  <Upload size={16} />
                                  {t.uploadFile}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Location & Service Radius */}
                      {section.key === 'location' && (
                        <div className="space-y-4">
                          {/* Map Placeholder */}
                          <div
                            className="rounded-xl overflow-hidden"
                            style={{
                              height: '180px',
                              background: 'linear-gradient(135deg, #E0EFFF 0%, #CDE1FF 100%)',
                              position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <MapPin size={40} color="#2E63FF" />
                            <span
                              style={{
                                position: 'absolute',
                                bottom: '12px',
                                fontSize: '12px',
                                color: '#64748B',
                                fontWeight: 600
                              }}
                            >
                              📍 Drag to set location
                            </span>
                          </div>

                          {/* Address */}
                          <div>
                            <label
                              style={{
                                fontSize: '13px',
                                color: '#64748B',
                                fontWeight: 600,
                                display: 'block',
                                marginBottom: '8px'
                              }}
                            >
                              {t.yourAddress}
                            </label>
                            <input
                              type="text"
                              placeholder={isArabic ? 'الرياض، حي النرجس' : 'Riyadh, Al Narjis District'}
                              className="w-full px-4 py-3 rounded-xl"
                              style={{
                                border: '1px solid #E4EEFF',
                                fontSize: '14px',
                                color: '#1F2937',
                                outline: 'none'
                              }}
                            />
                          </div>

                          {/* Service Radius Slider */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label
                                style={{
                                  fontSize: '13px',
                                  color: '#64748B',
                                  fontWeight: 600
                                }}
                              >
                                {t.serviceRadius}
                              </label>
                              <span
                                style={{
                                  fontSize: '14px',
                                  color: '#2E63FF',
                                  fontWeight: 700
                                }}
                              >
                                {serviceRadius} {t.km}
                              </span>
                            </div>
                            <input
                              type="range"
                              min="5"
                              max="50"
                              step="5"
                              value={serviceRadius}
                              onChange={(e) => setServiceRadius(Number(e.target.value))}
                              className="w-full"
                              style={{
                                accentColor: '#2E63FF'
                              }}
                            />
                            <div className="flex justify-between mt-1">
                              <span style={{ fontSize: '11px', color: '#94A3B8' }}>5 {t.km}</span>
                              <span style={{ fontSize: '11px', color: '#94A3B8' }}>50 {t.km}</span>
                            </div>
                          </div>

                          {/* Save Button */}
                          <button
                            className="w-full py-3 rounded-xl"
                            style={{
                              background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                              color: '#FFFFFF',
                              fontSize: '15px',
                              fontWeight: 600,
                              boxShadow: '0 4px 12px rgba(46, 99, 255, 0.25)'
                            }}
                          >
                            {t.saveLocation}
                          </button>
                        </div>
                      )}

                      {/* Earnings */}
                      {section.key === 'earnings' && (
                        <div className="space-y-4">
                          {/* Stats Cards */}
                          <div className="grid grid-cols-2 gap-3">
                            <div
                              className="p-4 rounded-xl"
                              style={{
                                background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
                                border: '1px solid #6EE7B7'
                              }}
                            >
                              <p style={{ fontSize: '12px', color: '#059669', fontWeight: 600, marginBottom: '4px' }}>
                                {t.totalEarnings}
                              </p>
                              <p style={{ fontSize: '24px', fontWeight: 700, color: '#047857' }}>
                                12,450 {isArabic ? 'ر.س' : 'SAR'}
                              </p>
                            </div>

                            <div
                              className="p-4 rounded-xl"
                              style={{
                                background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
                                border: '1px solid #FCD34D'
                              }}
                            >
                              <p style={{ fontSize: '12px', color: '#D97706', fontWeight: 600, marginBottom: '4px' }}>
                                {t.totalBonuses}
                              </p>
                              <p style={{ fontSize: '24px', fontWeight: 700, color: '#B45309' }}>
                                1,230 {isArabic ? 'ر.س' : 'SAR'}
                              </p>
                            </div>
                          </div>

                          {/* IBAN Input */}
                          <div>
                            <label
                              style={{
                                fontSize: '13px',
                                color: '#64748B',
                                fontWeight: 600,
                                display: 'block',
                                marginBottom: '8px'
                              }}
                            >
                              {t.iban}
                            </label>
                            <input
                              type="text"
                              placeholder="SA00 0000 0000 0000 0000 0000"
                              className="w-full px-4 py-3 rounded-xl"
                              style={{
                                border: '1px solid #E4EEFF',
                                fontSize: '14px',
                                color: '#1F2937',
                                outline: 'none',
                                fontFamily: 'monospace'
                              }}
                            />
                          </div>

                          {/* Transaction History Button */}
                          <button
                            className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
                            style={{
                              background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                              color: '#FFFFFF',
                              fontSize: '15px',
                              fontWeight: 600,
                              boxShadow: '0 4px 12px rgba(46, 99, 255, 0.25)'
                            }}
                          >
                            <CreditCard size={18} />
                            {t.transactionHistory}
                          </button>
                        </div>
                      )}

                      {/* Preferences */}
                      {section.key === 'preferences' && (
                        <div className="space-y-4">
                          {/* Language Toggle */}
                          <div>
                            <label
                              style={{
                                fontSize: '13px',
                                color: '#64748B',
                                fontWeight: 600,
                                display: 'block',
                                marginBottom: '8px'
                              }}
                            >
                              {t.language}
                            </label>
                            <div className="flex gap-2">
                              <button
                                className="flex-1 py-3 rounded-xl"
                                style={{
                                  background: isArabic
                                    ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                                    : '#F8FAFC',
                                  color: isArabic ? '#FFFFFF' : '#64748B',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  border: isArabic ? 'none' : '1px solid #E4EEFF'
                                }}
                              >
                                عربي
                              </button>
                              <button
                                className="flex-1 py-3 rounded-xl"
                                style={{
                                  background: !isArabic
                                    ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                                    : '#F8FAFC',
                                  color: !isArabic ? '#FFFFFF' : '#64748B',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  border: !isArabic ? 'none' : '1px solid #E4EEFF'
                                }}
                              >
                                English
                              </button>
                            </div>
                          </div>

                          {/* Notifications Toggle */}
                          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                              {t.notifications}
                            </span>
                            <button
                              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                              className="relative rounded-full"
                              style={{
                                width: '56px',
                                height: '32px',
                                background: notificationsEnabled 
                                  ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                                  : 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <motion.div 
                                className="absolute top-1 rounded-full"
                                style={{ 
                                  width: '24px',
                                  height: '24px',
                                  background: '#FFFFFF',
                                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                                }}
                                animate={{
                                  left: notificationsEnabled ? '28px' : '4px'
                                }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 500,
                                  damping: 30
                                }}
                              />
                            </button>
                          </div>

                          {/* Notification Channels */}
                          {notificationsEnabled && (
                            <div>
                              <label
                                style={{
                                  fontSize: '13px',
                                  color: '#64748B',
                                  fontWeight: 600,
                                  display: 'block',
                                  marginBottom: '8px'
                                }}
                              >
                                {t.notifyVia}
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {['sms', 'whatsapp', 'emailNotif'].map(channel => {
                                  const isSelected = selectedNotifyChannels.includes(channel);
                                  return (
                                    <button
                                      key={channel}
                                      onClick={() => toggleNotifyChannel(channel)}
                                      className="px-4 py-2 rounded-full transition-all"
                                      style={{
                                        background: isSelected
                                          ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                                          : '#F8FAFC',
                                        color: isSelected ? '#FFFFFF' : '#64748B',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        border: isSelected ? 'none' : '1px solid #E4EEFF'
                                      }}
                                    >
                                      {t[channel as keyof typeof t]}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Dark Mode */}
                          <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
                            <div className="flex items-center gap-2">
                              {darkMode ? <Moon size={18} color="#64748B" /> : <Sun size={18} color="#F59E0B" />}
                              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                                {t.darkMode}
                              </span>
                            </div>
                            <button
                              onClick={() => setDarkMode(!darkMode)}
                              className="relative rounded-full"
                              style={{
                                width: '56px',
                                height: '32px',
                                background: darkMode 
                                  ? 'linear-gradient(135deg, #1F2937 0%, #111827 100%)'
                                  : 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <motion.div 
                                className="absolute top-1 rounded-full"
                                style={{ 
                                  width: '24px',
                                  height: '24px',
                                  background: '#FFFFFF',
                                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                                }}
                                animate={{
                                  left: darkMode ? '28px' : '4px'
                                }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 500,
                                  damping: 30
                                }}
                              />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Support */}
                      {section.key === 'support' && (
                        <div className="space-y-3">
                          <button
                            className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
                            style={{
                              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                              color: '#FFFFFF',
                              fontSize: '15px',
                              fontWeight: 600,
                              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)'
                            }}
                          >
                            <Phone size={18} />
                            {t.contactUs}
                          </button>

                          <button
                            className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
                            style={{
                              background: '#FFFFFF',
                              color: '#2E63FF',
                              fontSize: '15px',
                              fontWeight: 600,
                              border: '2px solid #2E63FF'
                            }}
                          >
                            <HelpCircle size={18} />
                            {t.faq}
                          </button>
                        </div>
                      )}

                      {/* Account & Security */}
                      {section.key === 'account' && (
                        <div className="space-y-3">
                          <button
                            className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
                            style={{
                              background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                              color: '#FFFFFF',
                              fontSize: '15px',
                              fontWeight: 600,
                              boxShadow: '0 4px 12px rgba(46, 99, 255, 0.25)'
                            }}
                          >
                            <Lock size={18} />
                            {t.changePassword}
                          </button>

                          <button
                            className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
                            style={{
                              background: '#F8FAFC',
                              color: '#64748B',
                              fontSize: '15px',
                              fontWeight: 600,
                              border: '1px solid #E4EEFF'
                            }}
                          >
                            <LogOut size={18} />
                            {t.logout}
                          </button>

                          {/* Delete Account - Danger Zone */}
                          <div
                            className="p-4 rounded-xl mt-4"
                            style={{
                              background: '#FEF2F2',
                              border: '1px solid #FCA5A5'
                            }}
                          >
                            <div className="flex items-start gap-2 mb-3">
                              <AlertCircle size={18} color="#EF4444" />
                              <div>
                                <p style={{ fontSize: '13px', fontWeight: 600, color: '#DC2626', marginBottom: '4px' }}>
                                  {t.deleteAccount}
                                </p>
                                <p style={{ fontSize: '12px', color: '#B91C1C' }}>
                                  {t.deleteWarning}
                                </p>
                              </div>
                            </div>
                            <button
                              className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2"
                              style={{
                                background: '#EF4444',
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: 600
                              }}
                            >
                              <Trash2 size={16} />
                              {t.deleteAccount}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
