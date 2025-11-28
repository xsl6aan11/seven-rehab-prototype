import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ClipboardCheck, Clock, MessageCircle, Home } from 'lucide-react';
import { Badge } from './ui/badge';
import SevenRehabLogo from './SevenRehabLogo';

type Language = 'EN' | 'AR';
type VerificationStatus = 'pending' | 'approved';

interface VerificationStatusProps {
  language: Language;
  onLanguageToggle: () => void;
  onGoToDashboard: () => void;
  onBackToHome: () => void;
  initialStatus?: VerificationStatus;
}

interface StatusContent {
  title: string;
  subtitle: string;
  pendingTitle: string;
  pendingSubtitle: string;
  pendingBadge: string;
  pendingFooter: string;
  backToHomeBtn: string;
  contactSupportBtn: string;
  approvedTitle: string;
  approvedSubtitle: string;
  approvedBadge: string;
  approvedFooter: string;
  goToDashboardBtn: string;
  languageToggle: string;
}

const content: Record<Language, StatusContent> = {
  EN: {
    title: 'Verification Status',
    subtitle: 'Manage your onboarding progress.',
    pendingTitle: 'Your account is under review.',
    pendingSubtitle: "Our team is verifying your information. You'll receive a notification once approved.",
    pendingBadge: 'Pending',
    pendingFooter: 'Usually takes up to 48 hours.',
    backToHomeBtn: 'Back to Home',
    contactSupportBtn: 'Contact Support',
    approvedTitle: 'Your account has been approved!',
    approvedSubtitle: 'You can now start accepting sessions and managing patients.',
    approvedBadge: 'Approved',
    approvedFooter: 'Powered by Seventic',
    goToDashboardBtn: 'Go to Dashboard',
    languageToggle: 'اللغه العربيه'
  },
  AR: {
    title: 'حالة التحقق',
    subtitle: 'إدارة تقدم عملية التسجيل.',
    pendingTitle: 'حسابك قيد المراجعة.',
    pendingSubtitle: 'فريقنا يتحقق من معلوماتك. ستتلقى إشعارًا بمجرد الموافقة.',
    pendingBadge: 'قيد الانتظار',
    pendingFooter: 'عادة ما يستغرق حتى 48 ساعة.',
    backToHomeBtn: 'العودة للرئيسية',
    contactSupportBtn: 'اتصل بالدعم',
    approvedTitle: 'تمت الموافقة على حسابك!',
    approvedSubtitle: 'يمكنك الآن البدء في قبول الجلسات وإدارة المرضى.',
    approvedBadge: 'تمت الموافقة',
    approvedFooter: 'مدعوم من سيفنتك',
    goToDashboardBtn: 'الذهاب إلى لوحة التحكم',
    languageToggle: 'Continue in english'
  }
};

export function VerificationStatus({ 
  language, 
  onLanguageToggle, 
  onGoToDashboard, 
  onBackToHome,
  initialStatus = 'pending'
}: VerificationStatusProps) {
  const [status, setStatus] = useState<VerificationStatus>(initialStatus);
  const [refreshing, setRefreshing] = useState(false);
  
  const isArabic = language === 'AR';
  const statusContent = content[language];

  // Auto-refresh simulation (optional)
  useEffect(() => {
    if (status === 'pending') {
      const interval = setInterval(() => {
        setRefreshing(true);
        // Simulate status check - in real app, this would be an API call
        setTimeout(() => {
          setRefreshing(false);
          // For demo purposes, auto-approve after 10 seconds
          // Remove this in production
        }, 500);
      }, 30000); // Check every 30 seconds

      return () => clearInterval(interval);
    }
  }, [status]);

  const handleContactSupport = () => {
    // Open WhatsApp support
    window.open('https://api.whatsapp.com/send/?phone=966533867100&text&type=phone_number&app_absent=0', '_blank');
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center p-6"
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
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center pt-12 pb-8 px-6">
          {/* Logo */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SevenRehabLogo width={100} backgroundColor="linear-gradient(180deg, #EAF3FF 0%, #CDE1FF 100%)" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-[20px] text-center mb-2"
            style={{
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Poppins, sans-serif',
              fontWeight: 700,
              color: '#2E63FF'
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {statusContent.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-[15px] text-center"
            style={{
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
              color: '#6B7280'
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {statusContent.subtitle}
          </motion.p>
        </div>

        {/* Status Card Section */}
        <div className="flex-1 px-6 pb-6">
          <AnimatePresence mode="wait">
            {status === 'pending' ? (
              <motion.div
                key="pending"
                className="bg-white rounded-[20px] p-8 flex flex-col items-center"
                style={{
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                {/* Pending Icon */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                >
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #FFE4B5 0%, #FFB84D 100%)',
                      boxShadow: '0 8px 20px rgba(255, 184, 77, 0.3)'
                    }}
                  >
                    <ClipboardCheck size={48} color="#FFFFFF" strokeWidth={2} />
                  </div>
                </motion.div>

                {/* Status Badge */}
                <Badge
                  className="mb-4 px-4 py-1 rounded-full"
                  style={{
                    background: '#FFB84D',
                    color: '#FFFFFF',
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600
                  }}
                >
                  <Clock size={14} className={isArabic ? 'ml-1' : 'mr-1'} />
                  {statusContent.pendingBadge}
                </Badge>

                {/* Pending Title */}
                <h2
                  className="text-[22px] text-center mb-3"
                  style={{
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Poppins, sans-serif',
                    fontWeight: 700,
                    color: '#1F2937'
                  }}
                >
                  {statusContent.pendingTitle}
                </h2>

                {/* Pending Subtitle */}
                <p
                  className="text-[15px] text-center mb-6 px-2"
                  style={{
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                    color: '#6B7280',
                    lineHeight: '1.6'
                  }}
                >
                  {statusContent.pendingSubtitle}
                </p>

                {/* Buttons */}
                <div className="w-full space-y-3 mb-4">
                  {/* Back to Home Button */}
                  <button
                    onClick={onBackToHome}
                    className="w-full py-3 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                      color: '#FFFFFF',
                      fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '16px',
                      boxShadow: '0 4px 12px rgba(46, 99, 255, 0.3)'
                    }}
                  >
                    <Home size={18} className={isArabic ? 'ml-2' : 'mr-2'} />
                    {statusContent.backToHomeBtn}
                  </button>

                  {/* Contact Support Button */}
                  <button
                    onClick={handleContactSupport}
                    className="w-full py-3 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'transparent',
                      border: '2px solid #A8D8FF',
                      color: '#2E63FF',
                      fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '16px'
                    }}
                  >
                    <MessageCircle size={18} className={isArabic ? 'ml-2' : 'mr-2'} />
                    {statusContent.contactSupportBtn}
                  </button>
                </div>

                {/* Footer Text */}
                <p
                  className="text-[13px] text-center"
                  style={{
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                    color: '#9CA3AF'
                  }}
                >
                  {statusContent.pendingFooter}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="approved"
                className="bg-white rounded-[20px] p-8 flex flex-col items-center"
                style={{
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                {/* Approved Icon */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
                >
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center relative"
                    style={{
                      background: 'linear-gradient(135deg, #68D391 0%, #38A169 100%)',
                      boxShadow: '0 8px 20px rgba(56, 161, 105, 0.4)'
                    }}
                  >
                    <CheckCircle2 size={48} color="#FFFFFF" strokeWidth={2.5} />
                    
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(56, 161, 105, 0.4) 0%, transparent 70%)'
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  </div>
                </motion.div>

                {/* Status Badge */}
                <Badge
                  className="mb-4 px-4 py-1 rounded-full"
                  style={{
                    background: '#38A169',
                    color: '#FFFFFF',
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600
                  }}
                >
                  <CheckCircle2 size={14} className={isArabic ? 'ml-1' : 'mr-1'} />
                  {statusContent.approvedBadge}
                </Badge>

                {/* Approved Title */}
                <h2
                  className="text-[22px] text-center mb-3"
                  style={{
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Poppins, sans-serif',
                    fontWeight: 700,
                    color: '#1F2937'
                  }}
                >
                  {statusContent.approvedTitle}
                </h2>

                {/* Approved Subtitle */}
                <p
                  className="text-[15px] text-center mb-6 px-2"
                  style={{
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                    color: '#6B7280',
                    lineHeight: '1.6'
                  }}
                >
                  {statusContent.approvedSubtitle}
                </p>

                {/* Go to Dashboard Button */}
                <div className="w-full mb-4">
                  <button
                    onClick={onGoToDashboard}
                    className="w-full py-3 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                      color: '#FFFFFF',
                      fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '16px',
                      boxShadow: '0 4px 12px rgba(46, 99, 255, 0.3)'
                    }}
                  >
                    {statusContent.goToDashboardBtn}
                  </button>
                </div>

                {/* Footer Text */}
                <p
                  className="text-[13px] text-center"
                  style={{
                    fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                    color: '#9CA3AF'
                  }}
                >
                  {statusContent.approvedFooter}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Demo Toggle Button (for testing - remove in production) */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setStatus(status === 'pending' ? 'approved' : 'pending')}
              className="px-4 py-2 rounded-full text-[12px]"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(46, 99, 255, 0.2)',
                color: '#2E63FF',
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
              }}
            >
              {isArabic ? 'تبديل الحالة (للتجربة)' : 'Toggle Status (Demo)'}
            </button>
          </motion.div>
        </div>

        {/* Language Toggle */}
        <div className="pb-8 text-center">
          <button
            onClick={onLanguageToggle}
            className="text-[14px] transition-opacity duration-200 hover:opacity-80"
            style={{
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
              fontWeight: 500,
              color: '#5596FF'
            }}
          >
            {statusContent.languageToggle}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
