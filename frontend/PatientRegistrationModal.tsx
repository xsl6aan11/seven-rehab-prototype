import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, Mail, Lock, Eye, EyeOff, Check, ChevronDown } from 'lucide-react';
import SevenRehabLogo from './SevenRehabLogo';

interface PatientRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'EN' | 'AR';
  onLanguageToggle: () => void;
  onBackToLogin: () => void;
  onRegistrationSuccess?: () => void;
}

const content = {
  EN: {
    title: 'Create Your Account',
    subtitle: "Let's personalize your recovery experience",
    progress: 'Step 1 of 2',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'Enter your full name',
    phoneLabel: 'Phone Number',
    phonePlaceholder: 'Enter your phone number',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Create a password',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Re-enter your password',
    signUpButton: 'Sign Up',
    backToLogin: 'Back to Login',
    continueAsGuest: 'Continue as Guest',
    passwordStrength: {
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong'
    },
    verificationTitle: 'Verify Your Account',
    verificationSubtitle: 'We sent a 4-digit code to your email or phone.',
    verificationButton: 'Confirm & Continue',
    resendCode: 'Didn\'t get the code?',
    resend: 'Resend',
    verificationSuccess: 'Verified Successfully!'
  },
  AR: {
    title: 'أنشئ حسابك',
    subtitle: 'خلنا نخصص تجربتك العلاجية لك',
    progress: 'الخطوة 1 من 2',
    fullNameLabel: 'الاسم الكامل',
    fullNamePlaceholder: 'اكتب اسمك الكامل',
    phoneLabel: 'رقم الهاتف',
    phonePlaceholder: 'أدخل رقم هاتفك',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    passwordLabel: 'كلمة المرور',
    passwordPlaceholder: 'أنشئ كلمة مرور',
    confirmPasswordLabel: 'تأكيد كلمة المرور',
    confirmPasswordPlaceholder: 'أعد إدخال كلمة المرور',
    signUpButton: 'إنشاء حساب',
    backToLogin: 'العودة لتسجيل الدخول',
    continueAsGuest: 'متابعة كزائر',
    passwordStrength: {
      weak: 'ضعيفة',
      medium: 'متوسطة',
      strong: 'قوية'
    },
    verificationTitle: 'تحقق من حسابك',
    verificationSubtitle: 'أرسلنا رمز مكون من 4 أرقام إلى بريدك أو هاتفك.',
    verificationButton: 'تأكيد والمتابعة',
    resendCode: 'لم تستلم الرمز؟',
    resend: 'إعادة الإرسال',
    verificationSuccess: 'تم التحقق بنجاح!'
  }
};

const countryCodes = [
  { code: '+966', flag: '🇸🇦', country: 'Saudi Arabia' },
  { code: '+971', flag: '🇦🇪', country: 'UAE' },
  { code: '+965', flag: '🇰🇼', country: 'Kuwait' },
  { code: '+973', flag: '🇧🇭', country: 'Bahrain' },
  { code: '+974', flag: '🇶🇦', country: 'Qatar' }
];

export default function PatientRegistrationModal({
  isOpen,
  onClose,
  language,
  onLanguageToggle,
  onBackToLogin,
  onRegistrationSuccess
}: PatientRegistrationModalProps) {
  const isArabic = language === 'AR';
  const t = content[language];

  // Form state
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+966');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Verification state
  const [showVerification, setShowVerification] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return null;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    
    if (strength <= 1) return { level: 'weak', label: t.passwordStrength.weak, color: '#EF4444', width: '33%' };
    if (strength <= 3) return { level: 'medium', label: t.passwordStrength.medium, color: '#F59E0B', width: '66%' };
    return { level: 'strong', label: t.passwordStrength.strong, color: '#10B981', width: '100%' };
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = confirmPassword && password === confirmPassword;

  // OTP Timer
  useEffect(() => {
    if (showVerification && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showVerification, resendTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next field
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleSignUp = () => {
    // Validate form (email is optional)
    if (!fullName || !phoneNumber || !password || !confirmPassword) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }

    // Show verification modal
    setShowVerification(true);
    setResendTimer(45);
  };

  const handleVerification = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 4) return;

    setIsVerifying(true);

    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);

      // Success animation then redirect
      setTimeout(() => {
        onRegistrationSuccess?.();
        handleClose();
      }, 1500);
    }, 1000);
  };

  const handleResendCode = () => {
    if (resendTimer === 0) {
      setResendTimer(45);
      setOtp(['', '', '', '']);
      otpRefs[0].current?.focus();
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form after animation
    setTimeout(() => {
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setShowConfirmPassword(false);
      setFocusedField(null);
      setShowVerification(false);
      setOtp(['', '', '', '']);
      setVerificationSuccess(false);
    }, 300);
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
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              {!showVerification ? (
                <>
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
                    <div className="flex justify-center mb-4">
                      <SevenRehabLogo width={56} />
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex justify-center gap-2 mb-6">
                      <div 
                        className="w-8 h-1 rounded-full"
                        style={{ background: '#5596FF' }}
                      />
                      <div 
                        className="w-8 h-1 rounded-full"
                        style={{ background: '#C8D9FF' }}
                      />
                    </div>

                    {/* Header */}
                    <div className="text-center mb-6">
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
                      {/* Full Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.02 }}
                      >
                        <label 
                          className="block text-sm mb-2"
                          style={{ color: '#1F2937', fontWeight: 500 }}
                        >
                          {t.fullNameLabel}
                        </label>
                        <div className="relative">
                          <div 
                            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-4' : 'left-4'}`}
                            style={{ 
                              color: focusedField === 'name' ? '#5596FF' : '#94A3B8',
                              transition: 'color 0.2s'
                            }}
                          >
                            <User size={20} />
                          </div>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            placeholder={t.fullNamePlaceholder}
                            className="w-full py-3 rounded-xl transition-all duration-200"
                            style={{
                              [isArabic ? 'paddingRight' : 'paddingLeft']: '48px',
                              [isArabic ? 'paddingLeft' : 'paddingRight']: '16px',
                              border: focusedField === 'name' 
                                ? '2px solid #5596FF' 
                                : '1.5px solid #C8D9FF',
                              background: '#FFFFFF',
                              color: '#1F2937',
                              outline: 'none',
                              boxShadow: focusedField === 'name' 
                                ? '0 0 0 4px rgba(85, 150, 255, 0.1)' 
                                : 'none'
                            }}
                          />
                        </div>
                      </motion.div>

                      {/* Phone Number */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 }}
                      >
                        <label 
                          className="block text-sm mb-2"
                          style={{ color: '#1F2937', fontWeight: 500 }}
                        >
                          {t.phoneLabel}
                        </label>
                        <div className="flex gap-2">
                          {/* Country Code Dropdown */}
                          <div className="relative">
                            <button
                              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                              className="flex items-center gap-2 px-3 py-3 rounded-xl transition-all duration-200"
                              style={{
                                border: '1.5px solid #C8D9FF',
                                background: '#FFFFFF',
                                color: '#1F2937'
                              }}
                            >
                              <span className="text-lg">
                                {countryCodes.find(c => c.code === countryCode)?.flag}
                              </span>
                              <span className="text-sm">{countryCode}</span>
                              <ChevronDown size={16} style={{ color: '#94A3B8' }} />
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                              {showCountryDropdown && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute top-full mt-2 z-10 rounded-xl overflow-hidden"
                                  style={{
                                    background: '#FFFFFF',
                                    border: '1.5px solid #C8D9FF',
                                    boxShadow: '0 8px 24px rgba(46, 99, 255, 0.15)',
                                    minWidth: '180px',
                                    [isArabic ? 'right' : 'left']: 0
                                  }}
                                >
                                  {countryCodes.map((country) => (
                                    <button
                                      key={country.code}
                                      onClick={() => {
                                        setCountryCode(country.code);
                                        setShowCountryDropdown(false);
                                      }}
                                      className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-sm"
                                      style={{
                                        background: countryCode === country.code ? '#F0F6FF' : 'transparent',
                                        color: '#1F2937',
                                        borderBottom: '1px solid #F0F6FF'
                                      }}
                                    >
                                      <span className="text-lg">{country.flag}</span>
                                      <span>{country.code}</span>
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Phone Input */}
                          <div className="relative flex-1">
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
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 }}
                      >
                        <label 
                          className="block text-sm mb-2"
                          style={{ color: '#1F2937', fontWeight: 500 }}
                        >
                          {t.emailLabel} <span style={{ color: '#94A3B8' }}>(Optional)</span>
                        </label>
                        <div className="relative">
                          <div 
                            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-4' : 'left-4'}`}
                            style={{ 
                              color: focusedField === 'email' ? '#5596FF' : '#94A3B8',
                              transition: 'color 0.2s'
                            }}
                          >
                            <Mail size={20} />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            placeholder={t.emailPlaceholder}
                            className="w-full py-3 rounded-xl transition-all duration-200"
                            style={{
                              [isArabic ? 'paddingRight' : 'paddingLeft']: '48px',
                              [isArabic ? 'paddingLeft' : 'paddingRight']: '16px',
                              border: focusedField === 'email' 
                                ? '2px solid #5596FF' 
                                : '1.5px solid #C8D9FF',
                              background: '#FFFFFF',
                              color: '#1F2937',
                              outline: 'none',
                              boxShadow: focusedField === 'email' 
                                ? '0 0 0 4px rgba(85, 150, 255, 0.1)' 
                                : 'none'
                            }}
                          />
                        </div>
                      </motion.div>

                      {/* Password */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                      >
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
                        
                        {/* Password Strength Bar */}
                        {passwordStrength && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs" style={{ color: '#64748B' }}>
                                {t.passwordStrength.weak.split(' ')[0]}
                              </span>
                              <span 
                                className="text-xs"
                                style={{ color: passwordStrength.color, fontWeight: 500 }}
                              >
                                {passwordStrength.label}
                              </span>
                            </div>
                            <div 
                              className="h-1.5 rounded-full overflow-hidden"
                              style={{ background: '#E5F0FF' }}
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: passwordStrength.width }}
                                transition={{ duration: 0.3 }}
                                className="h-full rounded-full"
                                style={{ background: passwordStrength.color }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Confirm Password */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <label 
                          className="block text-sm mb-2"
                          style={{ color: '#1F2937', fontWeight: 500 }}
                        >
                          {t.confirmPasswordLabel}
                        </label>
                        <div className="relative">
                          <div 
                            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-4' : 'left-4'}`}
                            style={{ 
                              color: focusedField === 'confirmPassword' ? '#5596FF' : '#94A3B8',
                              transition: 'color 0.2s'
                            }}
                          >
                            <Lock size={20} />
                          </div>
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={() => setFocusedField('confirmPassword')}
                            onBlur={() => setFocusedField(null)}
                            placeholder={t.confirmPasswordPlaceholder}
                            className="w-full py-3 rounded-xl transition-all duration-200"
                            style={{
                              [isArabic ? 'paddingRight' : 'paddingLeft']: '48px',
                              [isArabic ? 'paddingLeft' : 'paddingRight']: '48px',
                              border: focusedField === 'confirmPassword' 
                                ? '2px solid #5596FF' 
                                : '1.5px solid #C8D9FF',
                              background: '#FFFFFF',
                              color: '#1F2937',
                              outline: 'none',
                              boxShadow: focusedField === 'confirmPassword' 
                                ? '0 0 0 4px rgba(85, 150, 255, 0.1)' 
                                : 'none'
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'left-4' : 'right-4'} transition-colors`}
                            style={{ color: '#94A3B8' }}
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                          
                          {/* Match Indicator */}
                          {passwordsMatch && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'left-12' : 'right-12'}`}
                            >
                              <div 
                                className="w-6 h-6 rounded-full flex items-center justify-center"
                                style={{ background: '#10B981' }}
                              >
                                <Check size={14} style={{ color: '#FFFFFF' }} />
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {/* Sign Up Button */}
                      <motion.button
                        onClick={handleSignUp}
                        className="w-full py-3 rounded-2xl text-white transition-all duration-200 flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                          fontWeight: 600,
                          boxShadow: '0 4px 16px rgba(46, 99, 255, 0.3)'
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {t.signUpButton}
                      </motion.button>

                      {/* Back to Login Button */}
                      <motion.button
                        onClick={onBackToLogin}
                        className="w-full py-3 rounded-2xl transition-all duration-200 flex items-center justify-center"
                        style={{
                          background: 'transparent',
                          border: '1.5px solid #C8D9FF',
                          color: '#5596FF',
                          fontWeight: 500
                        }}
                        whileHover={{ 
                          background: '#F0F6FF',
                          borderColor: '#5596FF',
                          scale: 1.01
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {t.backToLogin}
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                /* Verification Step */
                <div className="p-8">
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

                  {/* Logo */}
                  <div className="flex justify-center mb-4">
                    <SevenRehabLogo width={56} />
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex justify-center gap-2 mb-6">
                    <div 
                      className="w-8 h-1 rounded-full"
                      style={{ background: '#5596FF' }}
                    />
                    <div 
                      className="w-8 h-1 rounded-full"
                      style={{ background: '#5596FF' }}
                    />
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
                      {verificationSuccess ? t.verificationSuccess : t.verificationTitle}
                    </h2>
                    {!verificationSuccess && (
                      <p 
                        className="text-sm"
                        style={{ color: '#64748B' }}
                      >
                        {t.verificationSubtitle}
                      </p>
                    )}
                  </div>

                  {!verificationSuccess ? (
                    <>
                      {/* OTP Input Fields */}
                      <div className="flex justify-center gap-3 mb-8" dir="ltr">
                        {otp.map((digit, index) => (
                          <motion.input
                            key={index}
                            ref={otpRefs[index]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="w-16 h-16 text-center text-2xl rounded-xl transition-all duration-200"
                            style={{
                              border: digit ? '2px solid #5596FF' : '1.5px solid #C8D9FF',
                              background: '#FFFFFF',
                              color: '#1F2937',
                              outline: 'none',
                              boxShadow: digit ? '0 0 0 4px rgba(85, 150, 255, 0.1)' : 'none',
                              fontWeight: 600
                            }}
                          />
                        ))}
                      </div>

                      {/* Verify Button */}
                      <motion.button
                        onClick={handleVerification}
                        disabled={otp.join('').length !== 4 || isVerifying}
                        className="w-full py-3 rounded-2xl text-white transition-all duration-200 mb-4 flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                          fontWeight: 600,
                          boxShadow: '0 4px 16px rgba(46, 99, 255, 0.3)',
                          opacity: otp.join('').length !== 4 || isVerifying ? 0.5 : 1
                        }}
                        whileHover={otp.join('').length === 4 && !isVerifying ? { scale: 1.02 } : {}}
                        whileTap={otp.join('').length === 4 && !isVerifying ? { scale: 0.98 } : {}}
                      >
                        {isVerifying ? (
                          <div className="flex justify-center gap-1">
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
                          t.verificationButton
                        )}
                      </motion.button>

                      {/* Resend Code */}
                      <div className="text-center text-sm" style={{ color: '#64748B' }}>
                        {t.resendCode}{' '}
                        <button
                          onClick={handleResendCode}
                          disabled={resendTimer > 0}
                          className="transition-colors"
                          style={{ 
                            color: resendTimer > 0 ? '#94A3B8' : '#5596FF',
                            fontWeight: 500,
                            cursor: resendTimer > 0 ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {t.resend}
                          {resendTimer > 0 && ` (00:${resendTimer.toString().padStart(2, '0')})`}
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Success Animation */
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="flex justify-center mb-8"
                    >
                      <div 
                        className="w-24 h-24 rounded-full flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
                      >
                        <Check size={48} style={{ color: '#FFFFFF' }} />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
