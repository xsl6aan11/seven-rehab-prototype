import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import SevenRehabLogo from './SevenRehabLogo';

interface TherapistLoginProps {
  onSignUpClick: () => void;
  onLoginSuccess: () => void;
  onForgotPassword: () => void;
  onBackToHome: () => void;
  language: 'EN' | 'AR';
  onLanguageToggle: () => void;
}

interface LoginContent {
  subtitle1: string;
  subtitle2: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  forgotPassword: string;
  loginButton: string;
  signUp: string;
  backToHome: string;
  languageToggle: string;
}

const content: Record<'EN' | 'AR', LoginContent> = {
  EN: {
    subtitle1: 'Therapist Login',
    subtitle2: 'Access your sessions, patients, and bonuses.',
    emailLabel: 'Email Address',
    emailPlaceholder: 'therapist@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    forgotPassword: 'Forgot Password?',
    loginButton: 'Login',
    signUp: 'Sign Up',
    backToHome: 'Back to Home',
    languageToggle: 'اللغه العربيه'
  },
  AR: {
    subtitle1: 'تسجيل دخول المعالج',
    subtitle2: 'الوصول إلى جلساتك ومرضاك ومكافآتك.',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'therapist@example.com',
    passwordLabel: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    loginButton: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    backToHome: 'العودة للرئيسية',
    languageToggle: 'Continue in english'
  }
};

export function TherapistLogin({ onSignUpClick, onLoginSuccess, onForgotPassword, onBackToHome, language, onLanguageToggle }: TherapistLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isArabic = language === 'AR';
  const loginContent = content[language];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    console.log('Logging in with:', email, password);
    onLoginSuccess();
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        background: 'linear-gradient(180deg, #f8fbff 0%, #eaf3ff 100%)',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, -apple-system, BlinkMacSystemFont, Inter, sans-serif'
      }}
    >
      {/* Mobile Frame Container */}
      <motion.div 
        className="w-full max-w-[430px] bg-white rounded-3xl shadow-xl flex flex-col"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{ 
          minHeight: '932px',
          background: 'linear-gradient(180deg, #f8fbff 0%, #eaf3ff 100%)',
          paddingTop: '40px',
          paddingBottom: '24px',
          paddingLeft: '24px',
          paddingRight: '24px'
        }}
      >
        {/* Logo Area */}
        <motion.div 
          className="flex flex-col items-center"
          style={{ marginBottom: '32px' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="mb-2">
            <SevenRehabLogo width={140} backgroundColor="linear-gradient(180deg, #f8fbff 0%, #eaf3ff 100%)" />
          </div>
          <p 
            className="text-[16px] mb-1"
            style={{ 
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
              fontWeight: 400,
              color: '#6B7280'
            }}
          >
            {loginContent.subtitle1}
          </p>
          <p 
            className="text-[14px] text-center px-4"
            style={{ 
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
              fontWeight: 400,
              color: '#6B7280'
            }}
          >
            {loginContent.subtitle2}
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.form 
          onSubmit={handleLogin}
          className="flex flex-col flex-1"
          style={{ gap: '32px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Email Field */}
          <div className="space-y-2">
            <Label 
              htmlFor="email"
              style={{ 
                color: '#374151', 
                fontWeight: 500,
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
              }}
            >
              {loginContent.emailLabel}
            </Label>
            <div className="relative">
              <Mail 
                className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isArabic ? 'right-3' : 'left-3'}`}
                size={20}
              />
              <Input
                id="email"
                type="email"
                placeholder={loginContent.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-[48px] rounded-xl border-gray-300 focus:border-[#2E63FF] focus:ring-[#2E63FF] ${isArabic ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                style={{
                  fontSize: '16px',
                  backgroundColor: 'white',
                  direction: isArabic ? 'rtl' : 'ltr'
                }}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label 
              htmlFor="password"
              style={{ 
                color: '#374151', 
                fontWeight: 500,
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
              }}
            >
              {loginContent.passwordLabel}
            </Label>
            <div className="relative">
              <Lock 
                className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isArabic ? 'right-3' : 'left-3'}`}
                size={20}
              />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={loginContent.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`h-[48px] rounded-xl border-gray-300 focus:border-[#2E63FF] focus:ring-[#2E63FF] ${isArabic ? 'pr-10 pl-12' : 'pl-10 pr-12'}`}
                style={{
                  fontSize: '16px',
                  backgroundColor: 'white',
                  direction: isArabic ? 'rtl' : 'ltr'
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors ${isArabic ? 'left-3' : 'right-3'}`}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Forgot Password Link */}
            <div className={isArabic ? 'text-left' : 'text-right'}>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-[14px] hover:underline"
                style={{ 
                  color: '#2E63FF',
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
                }}
              >
                {loginContent.forgotPassword}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            className="h-[52px] rounded-xl text-white transition-all duration-200 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
              boxShadow: '0 4px 12px rgba(46, 99, 255, 0.3), 0 0 0 0 rgba(46, 99, 255, 0.4)',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif'
            }}
            whileHover={{ 
              boxShadow: '0 6px 20px rgba(46, 99, 255, 0.5), 0 0 30px rgba(46, 99, 255, 0.3)',
              y: -2,
              scale: 1.02
            }}
            whileTap={{ 
              scale: 0.98,
              y: 0
            }}
            animate={{
              boxShadow: [
                '0 4px 12px rgba(46, 99, 255, 0.3), 0 0 0 0 rgba(46, 99, 255, 0.4)',
                '0 4px 12px rgba(46, 99, 255, 0.3), 0 0 20px rgba(46, 99, 255, 0.2)',
                '0 4px 12px rgba(46, 99, 255, 0.3), 0 0 0 0 rgba(46, 99, 255, 0.4)'
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {loginContent.loginButton}
          </motion.button>

          {/* Sign Up Button */}
          <motion.button
            type="button"
            onClick={onSignUpClick}
            className="h-[52px] rounded-xl text-white transition-all duration-200 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
              boxShadow: '0 4px 12px rgba(46, 99, 255, 0.3), 0 0 0 0 rgba(46, 99, 255, 0.4)',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif'
            }}
            whileHover={{ 
              boxShadow: '0 6px 20px rgba(46, 99, 255, 0.5), 0 0 30px rgba(46, 99, 255, 0.3)',
              y: -2,
              scale: 1.02
            }}
            whileTap={{ 
              scale: 0.98,
              y: 0
            }}
            animate={{
              boxShadow: [
                '0 4px 12px rgba(46, 99, 255, 0.3), 0 0 0 0 rgba(46, 99, 255, 0.4)',
                '0 4px 12px rgba(46, 99, 255, 0.3), 0 0 20px rgba(46, 99, 255, 0.2)',
                '0 4px 12px rgba(46, 99, 255, 0.3), 0 0 0 0 rgba(46, 99, 255, 0.4)'
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {loginContent.signUp}
          </motion.button>

          {/* Back to Home Button */}
          <motion.button
            type="button"
            onClick={onBackToHome}
            className="h-[52px] rounded-xl transition-all duration-200 flex items-center justify-center"
            style={{
              background: 'transparent',
              border: '2px solid #AFCBFF',
              boxShadow: '0 4px 12px rgba(168, 216, 255, 0.2), 0 0 0 0 rgba(168, 216, 255, 0.3)',
              fontSize: '16px',
              fontWeight: 600,
              color: '#2E63FF',
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif'
            }}
            whileHover={{ 
              boxShadow: '0 6px 20px rgba(168, 216, 255, 0.4), 0 0 25px rgba(168, 216, 255, 0.25)',
              y: -2,
              scale: 1.02,
              borderColor: '#5596FF'
            }}
            whileTap={{ 
              scale: 0.98,
              y: 0
            }}
            animate={{
              boxShadow: [
                '0 4px 12px rgba(168, 216, 255, 0.2), 0 0 0 0 rgba(168, 216, 255, 0.3)',
                '0 4px 12px rgba(168, 216, 255, 0.2), 0 0 15px rgba(168, 216, 255, 0.15)',
                '0 4px 12px rgba(168, 216, 255, 0.2), 0 0 0 0 rgba(168, 216, 255, 0.3)'
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {loginContent.backToHome}
          </motion.button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer Section */}
          <div className="space-y-4">
            {/* Language Toggle */}
            <div className="text-center">
              <button
                type="button"
                onClick={onLanguageToggle}
                className="text-[16px] transition-colors duration-200 hover:text-[#2E63FF]"
                style={{
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
                  fontWeight: 500,
                  color: '#A8D8FF'
                }}
              >
                {loginContent.languageToggle}
              </button>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}
