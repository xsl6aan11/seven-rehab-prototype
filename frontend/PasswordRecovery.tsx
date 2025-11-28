import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import SevenRehabLogo from './SevenRehabLogo';

type Language = 'EN' | 'AR';

interface PasswordRecoveryProps {
  language: Language;
  onBack: () => void;
  onLanguageToggle: () => void;
}

interface RecoveryContent {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  sendButton: string;
  footerText: string;
  backLink: string;
  successMessage: string;
  errorMessage: string;
  languageToggle: string;
}

const recoveryContent: Record<Language, RecoveryContent> = {
  EN: {
    title: 'Password Recovery',
    subtitle: 'Enter your registered email to reset your password.',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Email Address',
    sendButton: 'Send Reset Link',
    footerText: 'Remembered your password?',
    backLink: 'Back to Login',
    successMessage: "We've sent a reset link to your email.",
    errorMessage: 'Please enter a valid email address',
    languageToggle: 'متابعة بالعربية'
  },
  AR: {
    title: 'استعادة كلمة المرور',
    subtitle: 'أدخل بريدك الإلكتروني المسجل لإعادة تعيين كلمة المرور.',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'البريد الإلكتروني',
    sendButton: 'إرسال رابط الاستعادة',
    footerText: 'تذكرت كلمة المرور؟',
    backLink: 'العودة لتسجيل الدخول',
    successMessage: 'تم إرسال رابط الاستعادة إلى بريدك الإلكتروني.',
    errorMessage: 'الرجاء إدخال بريد إلكتروني صحيح',
    languageToggle: 'Continue in English'
  }
};

export function PasswordRecovery({ language, onBack, onLanguageToggle }: PasswordRecoveryProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = recoveryContent[language];
  const isArabic = language === 'AR';

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendResetLink = () => {
    setEmailError('');

    if (!email || !validateEmail(email)) {
      setEmailError(content.errorMessage);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(content.successMessage, {
        duration: 3000,
        style: {
          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
        }
      });
      setIsSubmitting(false);
      setEmail('');
    }, 1000);
  };

  return (
    <div 
      className="w-full h-full min-h-[932px] flex flex-col items-center px-6 overflow-y-auto"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF3FF 100%)',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
      }}
    >
      {/* Container with max width */}
      <div className="w-full max-w-[430px] flex flex-col items-center pt-10">
        
        {/* Logo Area */}
        <motion.div 
          className="flex flex-col items-center"
          style={{ marginBottom: '40px' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="mb-2">
            <SevenRehabLogo width={140} backgroundColor="linear-gradient(180deg, #FFFFFF 0%, #EAF3FF 100%)" />
          </div>
        </motion.div>

        {/* Title & Subtitle */}
        <motion.div
          className="flex flex-col items-center text-center mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2
            className="text-[28px] mb-3"
            style={{
              fontFamily: 'SF Pro Display, Poppins, sans-serif',
              fontWeight: 700,
              color: '#2E63FF'
            }}
          >
            {content.title}
          </h2>
          <p
            className="text-[16px] px-8"
            style={{
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
              fontWeight: 400,
              color: '#6B7280',
              lineHeight: '1.5'
            }}
          >
            {content.subtitle}
          </p>
        </motion.div>

        {/* Email Input Field */}
        <motion.div 
          className="w-full mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Label 
            htmlFor="recovery-email"
            className="text-[14px] mb-2 block"
            style={{ 
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
              fontWeight: 500,
              color: '#374151'
            }}
          >
            {content.emailLabel}
          </Label>
          <div className="relative">
            <div 
              className="absolute top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
              style={{ 
                [isArabic ? 'right' : 'left']: '14px'
              }}
            >
              <Mail className="w-5 h-5" style={{ color: '#9CA3AF' }} />
            </div>
            <Input
              id="recovery-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              placeholder={content.emailPlaceholder}
              className="h-12 text-[16px]"
              style={{
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                paddingLeft: isArabic ? '16px' : '44px',
                paddingRight: isArabic ? '44px' : '16px',
                borderRadius: '12px',
                border: emailError ? '2px solid #E53E3E' : '1px solid #D1D5DB',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>
          {emailError && (
            <motion.p
              className="text-[14px] mt-2"
              style={{
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                color: '#E53E3E'
              }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {emailError}
            </motion.p>
          )}
        </motion.div>

        {/* Send Reset Link Button */}
        <motion.button
          onClick={handleSendResetLink}
          disabled={isSubmitting}
          className="w-full h-12 mb-6 transition-all duration-200 active:scale-[0.98]"
          style={{
            background: 'linear-gradient(90deg, #5596FF 0%, #2E63FF 100%)',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
            fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            color: '#FFFFFF',
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' }}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{isArabic ? 'جاري الإرسال...' : 'Sending...'}</span>
            </div>
          ) : (
            content.sendButton
          )}
        </motion.button>

        {/* Footer Section */}
        <motion.div
          className="flex items-center justify-center gap-2 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <span
            className="text-[14px]"
            style={{
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
              color: '#6B7280'
            }}
          >
            {content.footerText}
          </span>
          <button
            onClick={onBack}
            className="text-[14px] flex items-center gap-1 transition-all duration-200 hover:underline"
            style={{
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
              fontWeight: 600,
              color: '#2E63FF'
            }}
          >
            {!isArabic && <ArrowLeft className="w-4 h-4" />}
            {content.backLink}
            {isArabic && <ArrowLeft className="w-4 h-4 rotate-180" />}
          </button>
        </motion.div>

        {/* Language Toggle */}
        <motion.div
          className="flex items-center justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <button
            onClick={onLanguageToggle}
            className="text-[16px] transition-colors duration-200 hover:text-[#2E63FF]"
            style={{
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
              fontWeight: 500,
              color: '#A8D8FF'
            }}
          >
            {content.languageToggle}
          </button>
        </motion.div>

      </div>
    </div>
  );
}
