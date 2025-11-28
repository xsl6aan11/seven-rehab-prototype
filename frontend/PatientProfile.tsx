import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Camera, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  Edit2,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface PatientProfileProps {
  language: 'EN' | 'AR';
  onBack: () => void;
  onLanguageToggle: () => void;
  onLogout: () => void;
}

const content = {
  EN: {
    title: 'Profile & Settings',
    profile: 'Profile Information',
    name: 'Full Name',
    phone: 'Phone Number',
    email: 'Email Address',
    location: 'Location',
    editProfile: 'Edit Profile',
    settings: 'Settings',
    language: 'Language',
    notifications: 'Notifications',
    privacy: 'Privacy & Security',
    help: 'Help & Support',
    logout: 'Logout',
    changePhoto: 'Change Photo',
    arabic: 'العربية',
    english: 'English',
    logoutConfirm: 'Are you sure you want to logout?',
    cancel: 'Cancel',
    confirmLogout: 'Yes, Logout'
  },
  AR: {
    title: 'الملف الشخصي والإعدادات',
    profile: 'معلومات الملف الشخصي',
    name: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    location: 'الموقع',
    editProfile: 'تعديل الملف الشخصي',
    settings: 'الإعدادات',
    language: 'اللغة',
    notifications: 'الإشعارات',
    privacy: 'الخصوصية والأمان',
    help: 'المساعدة والدعم',
    logout: 'تسجيل الخروج',
    changePhoto: 'تغيير الصورة',
    arabic: 'العربية',
    english: 'English',
    logoutConfirm: 'هل أنت متأكد من تسجيل الخروج؟',
    cancel: 'إلغاء',
    confirmLogout: 'نعم، تسجيل الخروج'
  }
};

// Mock user data
const mockUserData = {
  name: 'Sara Ahmed',
  nameAr: 'سارة أحمد',
  phone: '+966 50 123 4567',
  phoneAr: '٠٥٠ ١٢٣ ٤٥٦٧+٩٦٦',
  email: 'sara.ahmed@email.com',
  location: 'Al Nahda, Riyadh',
  locationAr: 'حي النهدة، الرياض',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400'
};

export default function PatientProfile({
  language,
  onBack,
  onLanguageToggle,
  onLogout
}: PatientProfileProps) {
  const isArabic = language === 'AR';
  const t = content[language];
  const [user] = useState(mockUserData);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    toast.success(isArabic ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully');
    setShowLogoutConfirm(false);
    setTimeout(() => onLogout(), 1000);
  };

  const profileItems = [
    { icon: User, label: t.name, value: isArabic ? user.nameAr : user.name },
    { icon: Phone, label: t.phone, value: isArabic ? user.phoneAr : user.phone },
    { icon: Mail, label: t.email, value: user.email },
    { icon: MapPin, label: t.location, value: isArabic ? user.locationAr : user.location }
  ];

  const settingsItems = [
    { 
      icon: Globe, 
      label: t.language, 
      value: isArabic ? t.arabic : t.english,
      onClick: onLanguageToggle 
    },
    { 
      icon: Bell, 
      label: t.notifications,
      toggle: true,
      value: notificationsEnabled,
      onToggle: () => {
        setNotificationsEnabled(!notificationsEnabled);
        toast.success(isArabic ? 'تم تحديث الإشعارات' : 'Notifications updated');
      }
    },
    { 
      icon: Lock, 
      label: t.privacy,
      onClick: () => toast.info(isArabic ? 'قريبًا...' : 'Coming soon...')
    },
    { 
      icon: HelpCircle, 
      label: t.help,
      onClick: () => toast.info(isArabic ? 'قريبًا...' : 'Coming soon...')
    }
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
        {/* Profile Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative mb-4">
            <div
              className="w-32 h-32 rounded-full overflow-hidden"
              style={{
                border: '4px solid #5596FF',
                boxShadow: '0 8px 24px rgba(46, 99, 255, 0.3)'
              }}
            >
              <ImageWithFallback
                src={user.photo}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                boxShadow: '0 4px 12px rgba(46, 99, 255, 0.4)',
                border: '3px solid #FFFFFF'
              }}
              onClick={() => toast.info(isArabic ? 'قريبًا...' : 'Coming soon...')}
            >
              <Camera size={18} style={{ color: '#FFFFFF' }} />
            </button>
          </div>
          <h2 style={{ color: '#1F2937', fontWeight: 600, fontSize: '24px', marginBottom: '8px' }}>
            {isArabic ? user.nameAr : user.name}
          </h2>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
            style={{
              background: '#F0F6FF',
              color: '#2E63FF',
              fontWeight: 500
            }}
            onClick={() => toast.info(isArabic ? 'قريبًا...' : 'Coming soon...')}
          >
            <Edit2 size={16} />
            {t.editProfile}
          </button>
        </motion.div>

        {/* Profile Information */}
        <section className="mb-8">
          <h3 className="mb-4" style={{ color: '#1F2937', fontWeight: 600 }}>
            {t.profile}
          </h3>
          <div
            className="rounded-[22px] overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #DDE9FF',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
            }}
          >
            {profileItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4"
                  style={{
                    borderBottom: idx < profileItems.length - 1 ? '1px solid #DDE9FF' : 'none'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: '#F0F6FF' }}
                    >
                      <Icon size={20} style={{ color: '#2E63FF' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm mb-1" style={{ color: '#64748B' }}>
                        {item.label}
                      </div>
                      <div className="truncate" style={{ color: '#1F2937', fontWeight: 500 }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Settings */}
        <section className="mb-8">
          <h3 className="mb-4" style={{ color: '#1F2937', fontWeight: 600 }}>
            {t.settings}
          </h3>
          <div
            className="rounded-[22px] overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1.5px solid #DDE9FF',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
            }}
          >
            {settingsItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="w-full p-4"
                  style={{
                    borderBottom: idx < settingsItems.length - 1 ? '1px solid #DDE9FF' : 'none'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: '#F0F6FF' }}
                    >
                      <Icon size={20} style={{ color: '#2E63FF' }} />
                    </div>
                    <div className="flex-1 text-left" style={{ [isArabic ? 'textAlign' : '']: isArabic ? 'right' : 'left' }}>
                      <div style={{ color: '#1F2937', fontWeight: 500 }}>
                        {item.label}
                      </div>
                      {item.value && !item.toggle && (
                        <div className="text-sm" style={{ color: '#64748B' }}>
                          {item.value}
                        </div>
                      )}
                    </div>
                    {item.toggle ? (
                      <button
                        className="relative w-12 h-6 rounded-full transition-all"
                        style={{
                          background: item.value ? '#10B981' : '#D1D5DB'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          item.onToggle?.();
                        }}
                      >
                        <div
                          className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                          style={{
                            [isArabic ? 'right' : 'left']: item.value ? (isArabic ? '2px' : '26px') : (isArabic ? '26px' : '2px')
                          }}
                        />
                      </button>
                    ) : (
                      <button
                        className="flex items-center transition-colors"
                        onClick={item.onClick}
                        style={{ background: 'transparent', border: 'none', padding: 0 }}
                      >
                        <ChevronRight 
                          size={20} 
                          style={{ 
                            color: '#94A3B8',
                            transform: isArabic ? 'rotate(180deg)' : 'none'
                          }} 
                        />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          style={{
            background: '#FFFFFF',
            border: '1.5px solid #FCA5A5',
            color: '#DC2626',
            fontWeight: 600
          }}
        >
          <LogOut size={20} />
          {t.logout}
        </button>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowLogoutConfirm(false)}
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
            <div className="text-center mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: '#FEF3C7' }}
              >
                <LogOut size={32} style={{ color: '#D97706' }} />
              </div>
              <h3 style={{ color: '#1F2937', fontWeight: 600, marginBottom: '8px' }}>
                {t.logoutConfirm}
              </h3>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl transition-all"
                style={{
                  background: '#F0F6FF',
                  color: '#2E63FF',
                  fontWeight: 600
                }}
              >
                {t.cancel}
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-xl transition-all"
                style={{
                  background: '#DC2626',
                  color: '#FFFFFF',
                  fontWeight: 600
                }}
              >
                {t.confirmLogout}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}