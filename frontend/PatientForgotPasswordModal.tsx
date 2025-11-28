import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Eye, EyeOff, Check, ArrowLeft, AlertCircle } from 'lucide-react';
import SevenRehabLogo from './SevenRehabLogo';

interface PatientForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'EN' | 'AR';
  onBackToLogin?: () => void;
}

const content = {
  EN: {
    // Step 1 - Email
    title: 'Forgot Password?',
    subtitle: "We'll send a 4-digit code to your email to reset your password.",
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your registered email',
    sendCodeButton: 'Send Code',
    backToLogin: 'Back to Login',
    
    // Step 2 - Verify
    verifyTitle: 'Check Your Email',
    verifySubtitle: 'Enter the 4-digit code we sent to',
    verifyButton: 'Verify Code',
    resendText: "Didn't get it?",
    resendLink: 'Resend',
    resendTimer: 'Resend in',
    
    // Step 3 - Reset
    resetTitle: 'Reset Password',
    resetSubtitle: 'Create a strong new password for your account',
    newPasswordLabel: 'New Password',
    newPasswordPlaceholder: 'Enter new password',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Re-enter new password',
    saveButton: 'Save New Password',
    
    // Success
    successTitle: 'Password Updated!',
    successMessage: 'Your password has been successfully reset.',
    
    // Validation
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email',
    codeIncorrect: 'Incorrect code. Please try again.',
    passwordWeak: 'Password must be at least 8 characters',
    passwordMismatch: 'Passwords do not match',
    
    // Security note
    securityNote: 'Passwords are encrypted and secured.',
    
    // Password strength
    strengthWeak: 'Weak',
    strengthMedium: 'Medium',
    strengthStrong: 'Strong'
  },
  AR: {
    // Step 1 - Email
    title: 'هل نسيت كلمة المرور؟',
    subtitle: 'سنرسل رمزًا مكونًا من 4 أرقام إلى بريدك الإلكتروني لإعادة تعيين كلمة المرور.',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'أدخل بريدك الإلكتروني المسجل',
    sendCodeButton: 'إرسال الرمز',
    backToLogin: 'العودة إلى تسجيل الدخول',
    
    // Step 2 - Verify
    verifyTitle: 'تحقق من بريدك الإلكتروني',
    verifySubtitle: 'أدخل الرمز المكون من 4 أرقام المُرسل إلى',
    verifyButton: 'التحقق من الرمز',
    resendText: 'لم تستلمه؟',
    resendLink: 'إعادة الإرسال',
    resendTimer: 'إعادة الإرسال خلال',
    
    // Step 3 - Reset
    resetTitle: 'إعادة تعيين كلمة المرور',
    resetSubtitle: 'أنشئ كلمة مرور قوية جديدة لحسابك',
    newPasswordLabel: 'كلمة المرور الجديدة',
    newPasswordPlaceholder: 'أدخل كلمة المرور الجديدة',
    confirmPasswordLabel: 'تأكيد كلمة المرور',
    confirmPasswordPlaceholder: 'أعد إدخال كلمة المرور الجديدة',
    saveButton: 'حفظ كلمة المرور الجديدة',
    
    // Success
    successTitle: 'تم تحديث كلمة المرور!',
    successMessage: 'تم إعادة تعيين كلمة المرور بنجاح.',
    
    // Validation
    emailRequired: 'البريد الإلكتروني مطلوب',
    emailInvalid: 'يرجى إدخال بريد إلكتروني صالح',
    codeIncorrect: 'رمز غير صحيح. يرجى المحاولة مرة أخرى.',
    passwordWeak: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
    passwordMismatch: 'كلمات المرور غير متطابقة',
    
    // Security note
    securityNote: 'كلمات المرور مشفرة ومؤمنة.',
    
    // Password strength
    strengthWeak: 'ضعيفة',
    strengthMedium: 'متوسطة',
    strengthStrong: 'قوية'
  }
};

export default function PatientForgotPasswordModal({
  isOpen,
  onClose,
  language,
  onBackToLogin
}: PatientForgotPasswordModalProps) {
  const t = content[language];
  const isArabic = language === 'AR';
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 4 = success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState('');
  const [shakeError, setShakeError] = useState(false);
  
  const [resendTimer, setResendTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  // Countdown timer for resend
  useEffect(() => {
    if (step === 2 && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [step, resendTimer]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setEmail('');
        setOtp(['', '', '', '']);
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        setCodeSent(false);
        setResendTimer(45);
        setCanResend(false);
      }, 300);
    }
  }, [isOpen]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 1, label: t.strengthWeak, color: '#FF6B6B' };
    if (password.length < 10) return { strength: 2, label: t.strengthMedium, color: '#FFA726' };
    return { strength: 3, label: t.strengthStrong, color: '#66BB6A' };
  };

  const handleSendCode = async () => {
    setError('');
    
    if (!email) {
      setError(t.emailRequired);
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      return;
    }
    
    if (!validateEmail(email)) {
      setError(t.emailInvalid);
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      return;
    }
    
    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCodeSent(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSending(false);
    setStep(2);
    setResendTimer(45);
    setCanResend(false);
    
    // Auto-focus first OTP input
    setTimeout(() => otpRefs[0].current?.focus(), 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    
    // Auto-focus next input
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    
    const code = otp.join('');
    if (code.length !== 4) return;
    
    setIsVerifying(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation - in real app, verify with backend
    if (code !== '1234') {
      setError(t.codeIncorrect);
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      setIsVerifying(false);
      return;
    }
    
    setIsVerifying(false);
    setStep(3);
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setResendTimer(45);
    setOtp(['', '', '', '']);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    otpRefs[0].current?.focus();
  };

  const handleSavePassword = async () => {
    setError('');
    
    if (newPassword.length < 8) {
      setError(t.passwordWeak);
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError(t.passwordMismatch);
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setStep(4);
    
    // Auto redirect to login after 2 seconds
    setTimeout(() => {
      onClose();
      onBackToLogin?.();
    }, 2000);
  };

  const passwordStrength = getPasswordStrength(newPassword);
  const passwordsMatch = confirmPassword && newPassword === confirmPassword;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(77, 124, 255, 0.3)',
              backdropFilter: 'blur(8px)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '380px',
                background: 'linear-gradient(135deg, #F9FBFF 0%, #EAF3FF 100%)',
                borderRadius: '24px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.06)',
                position: 'relative',
                padding: '32px 24px',
                direction: isArabic ? 'rtl' : 'ltr'
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '24px',
                  [isArabic ? 'left' : 'right']: '24px',
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(8px)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
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
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s}
                    className="w-8 h-1 rounded-full transition-all duration-300"
                    style={{ 
                      background: step >= s ? '#5596FF' : '#D1E3FF'
                    }}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Email Input */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h2 
                        className="mb-2"
                        style={{ 
                          color: '#1E293B',
                          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, -apple-system, sans-serif'
                        }}
                      >
                        {t.title}
                      </h2>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: '#64748B',
                          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                        }}
                      >
                        {t.subtitle}
                      </p>
                    </div>

                    {/* Email Input */}
                    <div className="mb-6">
                      <label 
                        className="block mb-2 text-sm"
                        style={{ 
                          color: '#334155',
                          fontWeight: 500,
                          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                        }}
                      >
                        {t.emailLabel}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <div 
                          style={{
                            position: 'absolute',
                            [isArabic ? 'right' : 'left']: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#94A3B8',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Mail size={20} />
                        </div>
                        <motion.input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                          }}
                          placeholder={t.emailPlaceholder}
                          animate={shakeError ? { x: [-10, 10, -10, 10, 0] } : {}}
                          transition={{ duration: 0.4 }}
                          className="w-full py-3 rounded-2xl transition-all duration-200"
                          style={{
                            paddingLeft: isArabic ? '16px' : '48px',
                            paddingRight: isArabic ? '48px' : '16px',
                            border: error ? '2px solid #FF6B6B' : '2px solid #E2E8F0',
                            background: 'white',
                            color: '#1E293B',
                            fontSize: '15px',
                            outline: 'none',
                            fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                          }}
                          onFocus={(e) => e.target.style.border = '2px solid #5596FF'}
                          onBlur={(e) => e.target.style.border = error ? '2px solid #FF6B6B' : '2px solid #E2E8F0'}
                        />
                      </div>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 mt-2 text-sm"
                          style={{ color: '#FF6B6B' }}
                        >
                          <AlertCircle size={14} />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Send Code Button */}
                    <motion.button
                      onClick={handleSendCode}
                      disabled={isSending || codeSent}
                      className="w-full py-3 rounded-2xl text-white transition-all duration-200 mb-4 flex items-center justify-center"
                      style={{
                        background: isSending || codeSent 
                          ? 'linear-gradient(135deg, #66BB6A 0%, #43A047 100%)'
                          : 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                        fontWeight: 600,
                        boxShadow: '0 4px 16px rgba(46, 99, 255, 0.3)',
                        opacity: isSending ? 0.8 : 1
                      }}
                      whileHover={!isSending && !codeSent ? { scale: 1.02 } : {}}
                      whileTap={!isSending && !codeSent ? { scale: 0.98 } : {}}
                    >
                      {isSending ? (
                        <div className="flex items-center justify-center gap-2">
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
                      ) : codeSent ? (
                        <div className="flex items-center justify-center gap-2">
                          <Check size={20} />
                          <span>Code Sent</span>
                        </div>
                      ) : (
                        t.sendCodeButton
                      )}
                    </motion.button>

                    {/* Back to Login */}
                    <button
                      onClick={() => {
                        onClose();
                        onBackToLogin?.();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 text-sm transition-all duration-200"
                      style={{
                        color: '#5596FF',
                        fontWeight: 500,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <ArrowLeft size={16} style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }} />
                      {t.backToLogin}
                    </button>

                    {/* Security Note */}
                    <p 
                      className="text-center text-xs mt-4"
                      style={{ 
                        color: '#94A3B8',
                        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                      }}
                    >
                      {t.securityNote}
                    </p>
                  </motion.div>
                )}

                {/* Step 2: Verify Code */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h2 
                        className="mb-2"
                        style={{ 
                          color: '#1E293B',
                          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, -apple-system, sans-serif'
                        }}
                      >
                        {t.verifyTitle}
                      </h2>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: '#64748B',
                          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                        }}
                      >
                        {t.verifySubtitle}
                      </p>
                      <p 
                        className="text-sm mt-1"
                        style={{ 
                          color: '#5596FF',
                          fontWeight: 600,
                          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                        }}
                      >
                        {email}
                      </p>
                    </div>

                    {/* OTP Input */}
                    <div className="mb-6">
                      <motion.div 
                        className="flex gap-3 justify-center mb-4"
                        animate={shakeError ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={otpRefs[index]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-14 h-14 text-center rounded-2xl transition-all duration-200"
                            style={{
                              border: error ? '2px solid #FF6B6B' : digit ? '2px solid #5596FF' : '2px solid #E2E8F0',
                              background: 'white',
                              color: '#1E293B',
                              fontSize: '24px',
                              outline: 'none',
                              fontWeight: 600,
                              boxShadow: digit ? '0 0 0 4px rgba(85, 150, 255, 0.1)' : 'none'
                            }}
                          />
                        ))}
                      </motion.div>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-center gap-1 mt-2 text-sm"
                          style={{ color: '#FF6B6B' }}
                        >
                          <AlertCircle size={14} />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Resend Code */}
                    <div className="text-center mb-6">
                      <span 
                        className="text-sm"
                        style={{ 
                          color: '#64748B',
                          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                        }}
                      >
                        {t.resendText}{' '}
                      </span>
                      {canResend ? (
                        <button
                          onClick={handleResendCode}
                          className="text-sm"
                          style={{
                            color: '#5596FF',
                            fontWeight: 600,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                        >
                          {t.resendLink}
                        </button>
                      ) : (
                        <span 
                          className="text-sm"
                          style={{ 
                            color: '#94A3B8',
                            fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                          }}
                        >
                          {t.resendTimer} {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
                        </span>
                      )}
                    </div>

                    {/* Verify Button */}
                    <motion.button
                      onClick={handleVerifyCode}
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
                        <div className="flex items-center justify-center gap-2">
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
                        t.verifyButton
                      )}
                    </motion.button>

                    {/* Back to Login */}
                    <button
                      onClick={() => {
                        onClose();
                        onBackToLogin?.();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 text-sm transition-all duration-200"
                      style={{
                        color: '#5596FF',
                        fontWeight: 500,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <ArrowLeft size={16} style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }} />
                      {t.backToLogin}
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Reset Password */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h2 
                        className="mb-2"
                        style={{ 
                          color: '#1E293B',
                          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, -apple-system, sans-serif'
                        }}
                      >
                        {t.resetTitle}
                      </h2>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: '#64748B',
                          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                        }}
                      >
                        {t.resetSubtitle}
                      </p>
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                      <label 
                        className="block mb-2 text-sm"
                        style={{ 
                          color: '#334155',
                          fontWeight: 500,
                          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                        }}
                      >
                        {t.newPasswordLabel}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <div 
                          style={{
                            position: 'absolute',
                            [isArabic ? 'right' : 'left']: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#94A3B8',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Lock size={20} />
                        </div>
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            setError('');
                          }}
                          placeholder={t.newPasswordPlaceholder}
                          className="w-full py-3 rounded-2xl transition-all duration-200"
                          style={{
                            paddingLeft: isArabic ? '48px' : '48px',
                            paddingRight: isArabic ? '48px' : '48px',
                            border: '2px solid #E2E8F0',
                            background: 'white',
                            color: '#1E293B',
                            fontSize: '15px',
                            outline: 'none',
                            fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                          }}
                          onFocus={(e) => e.target.style.border = '2px solid #5596FF'}
                          onBlur={(e) => e.target.style.border = '2px solid #E2E8F0'}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          style={{
                            position: 'absolute',
                            [isArabic ? 'left' : 'right']: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: '#94A3B8',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {newPassword && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-2"
                        >
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3].map((level) => (
                              <div
                                key={level}
                                className="h-1 flex-1 rounded-full transition-all duration-300"
                                style={{
                                  background: passwordStrength.strength >= level 
                                    ? passwordStrength.color 
                                    : '#E2E8F0'
                                }}
                              />
                            ))}
                          </div>
                          <p 
                            className="text-xs"
                            style={{ 
                              color: passwordStrength.color,
                              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                            }}
                          >
                            {passwordStrength.label}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                      <label 
                        className="block mb-2 text-sm"
                        style={{ 
                          color: '#334155',
                          fontWeight: 500,
                          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                        }}
                      >
                        {t.confirmPasswordLabel}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <div 
                          style={{
                            position: 'absolute',
                            [isArabic ? 'right' : 'left']: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#94A3B8',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Lock size={20} />
                        </div>
                        <motion.input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setError('');
                          }}
                          placeholder={t.confirmPasswordPlaceholder}
                          animate={shakeError ? { x: [-10, 10, -10, 10, 0] } : {}}
                          transition={{ duration: 0.4 }}
                          className="w-full py-3 rounded-2xl transition-all duration-200"
                          style={{
                            paddingLeft: isArabic ? '48px' : '48px',
                            paddingRight: isArabic ? '48px' : '48px',
                            border: error ? '2px solid #FF6B6B' : passwordsMatch ? '2px solid #66BB6A' : '2px solid #E2E8F0',
                            background: 'white',
                            color: '#1E293B',
                            fontSize: '15px',
                            outline: 'none',
                            fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                          }}
                          onFocus={(e) => e.target.style.border = error ? '2px solid #FF6B6B' : passwordsMatch ? '2px solid #66BB6A' : '2px solid #5596FF'}
                          onBlur={(e) => e.target.style.border = error ? '2px solid #FF6B6B' : passwordsMatch ? '2px solid #66BB6A' : '2px solid #E2E8F0'}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          style={{
                            position: 'absolute',
                            [isArabic ? 'left' : 'right']: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: passwordsMatch ? '#66BB6A' : '#94A3B8',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {passwordsMatch ? <Check size={20} /> : showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1 mt-2 text-sm"
                          style={{ color: '#FF6B6B' }}
                        >
                          <AlertCircle size={14} />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Save Password Button */}
                    <motion.button
                      onClick={handleSavePassword}
                      disabled={isSaving}
                      className="w-full py-3 rounded-2xl text-white transition-all duration-200 mb-4 flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                        fontWeight: 600,
                        boxShadow: '0 4px 16px rgba(46, 99, 255, 0.3)',
                        opacity: isSaving ? 0.8 : 1
                      }}
                      whileHover={!isSaving ? { scale: 1.02 } : {}}
                      whileTap={!isSaving ? { scale: 0.98 } : {}}
                    >
                      {isSaving ? (
                        <div className="flex items-center justify-center gap-2">
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
                        t.saveButton
                      )}
                    </motion.button>

                    {/* Security Note */}
                    <p 
                      className="text-center text-xs"
                      style={{ 
                        color: '#94A3B8',
                        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                      }}
                    >
                      {t.securityNote}
                    </p>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8"
                  >
                    {/* Success Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.6, delay: 0.1 }}
                      className="flex justify-center mb-6"
                    >
                      <div
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #66BB6A 0%, #43A047 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 24px rgba(67, 160, 71, 0.3)'
                        }}
                      >
                        <Check size={40} color="white" strokeWidth={3} />
                      </div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-2"
                      style={{ 
                        color: '#1E293B',
                        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, -apple-system, sans-serif'
                      }}
                    >
                      {t.successTitle}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-sm"
                      style={{ 
                        color: '#64748B',
                        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, -apple-system, sans-serif'
                      }}
                    >
                      {t.successMessage}
                    </motion.p>

                    {/* Auto-redirect indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 flex justify-center gap-1"
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ background: '#5596FF' }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ background: '#5596FF' }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ background: '#5596FF' }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
