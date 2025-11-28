import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Lock, Eye, EyeOff, Check } from 'lucide-react';
import SevenRehabLogo from './SevenRehabLogo';

interface PatientLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'EN' | 'AR';
  onLanguageToggle: () => void;
  onLoginSuccess?: () => void;
  onSignUp?: () => void;
  onForgotPassword?: () => void;
}

const content = {
  EN: {
    logo: 'Powered by Seventic',
    title: 'Welcome to Seventic',
    subtitle: 'Login or continue to start your recovery journey',
    phoneLabel: 'Phone Number',
    phonePlaceholder: 'Enter your Number',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    loginButton: 'Login',
    continueAsGuest: 'Continue as Guest',
    signUpPrompt: 'Create new account',
    forgotPassword: 'Forgot Password?',
    termsText: 'By continuing, you agree to our',
    termsLink: 'Terms & Privacy Policy',
    languageIcon: '🇸🇦',
    languageText: 'العربية'
  },
  AR: {
    logo: 'Powered by Seventic',
    title: 'مرحبًا بك في Seventic',
    subtitle: 'سجّل دخولك أو أكمل لتبدأ رحلة تعافيك',
    phoneLabel: 'رقم الهاتف',
    phonePlaceholder: 'أدخل رقمك',
    passwordLabel: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    loginButton: 'تسجيل الدخول',
    continueAsGuest: 'متابعة كزائر',
    signUpPrompt: 'إنشاء حساب جديد',
    forgotPassword: 'نسيت كلمة المرور؟',
    termsText: 'بالمتابعة، أنت توافق على',
    termsLink: 'الشروط وسياسة الخصوصية',
    languageIcon: '🇬🇧',
    languageText: 'English'
  }
};

export default function PatientLoginModal({
  isOpen,
  onClose,
  language,
  onLanguageToggle,
  onLoginSuccess,
  onSignUp,
  onForgotPassword
}: PatientLoginModalProps) {
  const isArabic = language === 'AR';
  const t = content[language];

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      
      // Show success animation then redirect
      setTimeout(() => {
        onLoginSuccess?.();
        onClose();
        setLoginSuccess(false);
        setPhoneNumber('');
        setPassword('');
      }, 800);
    }, 1000);
  };

  const handleClose = () => {
    if (!isLoading && !loginSuccess) {
      onClose();
      // Reset form after animation
      setTimeout(() => {
        setPhoneNumber('');
        setPassword('');
        setShowPassword(false);
        setFocusedField(null);
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeIn' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: 'rgba(46, 99, 255, 0.3)',
              backdropFilter: 'blur(8px)'
            }}
            onClick={handleClose}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl overflow-hidden"
              dir={isArabic ? 'rtl' : 'ltr'}
              style={{
                background: 'linear-gradient(180deg, #F9FBFF 0%, #EAF3FF 100%)',
                boxShadow: '0 0 60px rgba(200, 217, 255, 0.5), 0 20px 60px rgba(46, 99, 255, 0.2)',
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif'
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 z-10 p-2 rounded-full transition-all duration-200"
                style={{
                  [isArabic ? 'left' : 'right']: '24px',
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <X size={20} style={{ color: '#64748B' }} />
              </button>

              <div className="p-8">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <SevenRehabLogo width={56} />
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                  <h2 
                    className="mb-2"
                    style={{ 
                      color: '#1A3D7C',
                      fontSize: '24px',
                      fontWeight: 600
                    }}
                  >
                    {t.title}
                  </h2>
                  <p 
                    className="text-sm"
                    style={{ color: '#64748B' }}
                  >
                    {t.subtitle}
                  </p>
                </div>

                {/* Input Fields */}
                <div className="space-y-4 mb-6">
                  {/* Phone Number Field */}
                  <div>
                    <label 
                      className="block text-sm mb-2"
                      style={{ color: '#1F2937', fontWeight: 500 }}
                    >
                      {t.phoneLabel}
                    </label>
                    <div className="relative">
                      <div 
                        className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-4' : 'left-4'}`}
                        style={{ 
                          color: focusedField === 'phone' ? '#5596FF' : '#94A3B8',
                          transition: 'color 0.2s'
                        }}
                      >
                        <Phone size={20} />
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t.phonePlaceholder}
                        className="w-full py-3 rounded-xl transition-all duration-200"
                        style={{
                          [isArabic ? 'paddingRight' : 'paddingLeft']: '48px',
                          [isArabic ? 'paddingLeft' : 'paddingRight']: '16px',
                          border: focusedField === 'phone' 
                            ? '2px solid #5596FF' 
                            : '1.5px solid #C8D9FF',
                          background: '#FFFFFF',
                          color: '#1F2937',
                          outline: 'none',
                          boxShadow: focusedField === 'phone' 
                            ? '0 0 0 4px rgba(85, 150, 255, 0.1)' 
                            : 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label 
                      className="block text-sm mb-2"
                      style={{ color: '#1F2937', fontWeight: 500 }}
                    >
                      {t.passwordLabel}
                    </label>
                    <div className="relative">
                      <div 
                        className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-4' : 'left-4'}`}
                        style={{ 
                          color: focusedField === 'password' ? '#5596FF' : '#94A3B8',
                          transition: 'color 0.2s'
                        }}
                      >
                        <Lock size={20} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        placeholder={t.passwordPlaceholder}
                        className="w-full py-3 rounded-xl transition-all duration-200"
                        style={{
                          [isArabic ? 'paddingRight' : 'paddingLeft']: '48px',
                          [isArabic ? 'paddingLeft' : 'paddingRight']: '48px',
                          border: focusedField === 'password' 
                            ? '2px solid #5596FF' 
                            : '1.5px solid #C8D9FF',
                          background: '#FFFFFF',
                          color: '#1F2937',
                          outline: 'none',
                          boxShadow: focusedField === 'password' 
                            ? '0 0 0 4px rgba(85, 150, 255, 0.1)' 
                            : 'none'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'left-4' : 'right-4'} transition-colors`}
                        style={{ color: '#94A3B8' }}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className={`flex ${isArabic ? 'justify-start' : 'justify-end'}`}>
                    <button
                      onClick={() => {
                        onClose();
                        onForgotPassword?.();
                      }}
                      className="text-sm transition-colors"
                      style={{ 
                        color: '#5596FF',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      {t.forgotPassword}
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 mb-6">
                  {/* Login Button */}
                  <motion.button
                    onClick={handleLogin}
                    disabled={isLoading || loginSuccess}
                    className="w-full py-3 rounded-2xl text-white transition-all duration-200 flex items-center justify-center gap-2"
                    style={{
                      background: loginSuccess 
                        ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                      fontWeight: 600,
                      boxShadow: '0 4px 16px rgba(46, 99, 255, 0.3)',
                      opacity: isLoading ? 0.7 : 1
                    }}
                    whileHover={!isLoading && !loginSuccess ? { scale: 1.02 } : {}}
                    whileTap={!isLoading && !loginSuccess ? { scale: 0.98 } : {}}
                  >
                    {loginSuccess ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          <Check size={20} />
                        </motion.div>
                        <span>Success!</span>
                      </>
                    ) : isLoading ? (
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-white"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full bg-white"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full bg-white"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    ) : (
                      t.loginButton
                    )}
                  </motion.button>

                  {/* Sign Up Button */}
                  <motion.button
                    onClick={onSignUp}
                    disabled={isLoading || loginSuccess}
                    className="w-full py-3 rounded-2xl transition-all duration-200 flex items-center justify-center"
                    style={{
                      background: 'transparent',
                      border: '1.5px solid #C8D9FF',
                      color: '#5596FF',
                      fontWeight: 500,
                      opacity: isLoading || loginSuccess ? 0.5 : 1
                    }}
                    whileHover={!isLoading && !loginSuccess ? { 
                      background: '#F0F6FF',
                      borderColor: '#5596FF',
                      scale: 1.01
                    } : {}}
                    whileTap={!isLoading && !loginSuccess ? { scale: 0.98 } : {}}
                  >
                    {t.signUpPrompt}
                  </motion.button>
                </div>

                {/* Continue as Guest Link */}
                <div className="text-center mb-6">
                  <button
                    onClick={handleClose}
                    className="text-sm transition-all inline-block relative"
                    style={{ 
                      color: '#2E63FF',
                      fontWeight: 500
                    }}
                  >
                    <span className="relative">
                      {t.continueAsGuest}
                      <span 
                        className="absolute bottom-0 left-0 w-full h-px"
                        style={{ 
                          background: '#2E63FF',
                          transform: 'scaleX(1)',
                          transformOrigin: isArabic ? 'right' : 'left'
                        }}
                      />
                    </span>
                  </button>
                </div>

                {/* Terms & Privacy */}
                <div className="text-center text-xs" style={{ color: '#94A3B8' }}>
                  {t.termsText}{' '}
                  <button 
                    className="transition-colors"
                    style={{ color: '#5596FF', textDecoration: 'underline' }}
                  >
                    {t.termsLink}
                  </button>
                </div>

                {/* Language Toggle */}
                <div className="flex justify-center mt-6">
                  <motion.button
                    onClick={onLanguageToggle}
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(200, 217, 255, 0.5)'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      background: 'rgba(255, 255, 255, 0.8)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">{t.languageIcon}</span>
                    <span className="text-xs" style={{ color: '#5596FF', fontWeight: 500 }}>
                      {t.languageText}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
