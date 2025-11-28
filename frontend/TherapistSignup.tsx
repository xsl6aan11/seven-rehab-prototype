import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Phone, Lock, Eye, EyeOff, Upload, MapPin, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import SevenRehabLogo from './SevenRehabLogo';

type Language = 'EN' | 'AR';

interface TherapistSignupProps {
  language: Language;
  onLanguageToggle: () => void;
  onBackToLogin: () => void;
  onSignupSuccess: () => void;
}

interface SignupContent {
  title: string;
  step1: string;
  step2: string;
  personalInfo: string;
  professionalInfo: string;
  fullNameAr: string;
  fullNameArPlaceholder: string;
  fullNameEn: string;
  fullNameEnPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  profilePicture: string;
  uploadPhoto: string;
  idNumber: string;
  idNumberPlaceholder: string;
  licenseNumber: string;
  licenseNumberPlaceholder: string;
  issuingAuthority: string;
  issuingAuthorityPlaceholder: string;
  experience: string;
  experienceYears: string;
  uploadLicense: string;
  uploadCertificate: string;
  bio: string;
  bioPlaceholder: string;
  homeLocation: string;
  locationPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  confirmPassword: string;
  confirmPasswordPlaceholder: string;
  agreeToTerms: string;
  termsLink: string;
  privacyLink: string;
  submitButton: string;
  backToLogin: string;
  languageToggle: string;
  version: string;
  successMessage: string;
  errorRequired: string;
  errorPasswordMismatch: string;
  errorEmailInvalid: string;
}

const signupContent: Record<Language, SignupContent> = {
  EN: {
    title: 'Therapist Sign-Up',
    step1: 'Step 1 of 2',
    step2: 'Step 2 of 2',
    personalInfo: 'Personal Information',
    professionalInfo: 'Professional Information',
    fullNameAr: 'Full Name (Arabic)',
    fullNameArPlaceholder: 'الاسم الكامل',
    fullNameEn: 'Full Name (English)',
    fullNameEnPlaceholder: 'Full Name',
    email: 'Email Address',
    emailPlaceholder: 'therapist@example.com',
    phone: 'Phone Number',
    phonePlaceholder: '+966 XX XXX XXXX',
    profilePicture: 'Profile Picture',
    uploadPhoto: 'Upload Photo',
    idNumber: 'ID Number',
    idNumberPlaceholder: 'Enter your ID number',
    licenseNumber: 'License Number',
    licenseNumberPlaceholder: 'e.g., MED-2024-12345',
    issuingAuthority: 'Issuing Authority',
    issuingAuthorityPlaceholder: 'e.g., Saudi Health Council',
    experience: 'Years of Experience',
    experienceYears: 'years',
    uploadLicense: 'Upload License',
    uploadCertificate: 'Upload Certificates',
    bio: 'Professional Bio (Optional)',
    bioPlaceholder: 'Tell us about your experience and expertise...',
    homeLocation: 'Home Location',
    locationPlaceholder: 'Enter home address',
    password: 'Password',
    passwordPlaceholder: 'Minimum 8 characters',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Re-enter password',
    agreeToTerms: 'I agree to the',
    termsLink: 'Terms of Service',
    privacyLink: 'Privacy Policy',
    submitButton: 'Submit for Review',
    backToLogin: 'Back to Login',
    languageToggle: 'متابعة بالعربية',
    version: 'Version 1.0.0',
    successMessage: 'Your account is pending verification. We will contact you soon!',
    errorRequired: 'Please fill in all required fields',
    errorPasswordMismatch: 'Passwords do not match',
    errorEmailInvalid: 'Please enter a valid email address'
  },
  AR: {
    title: 'تسجيل المعالج الجديد',
    step1: 'الخطوة 1 من 2',
    step2: 'الخطوة 2 من 2',
    personalInfo: 'المعلومات الشخصية',
    professionalInfo: 'المعلومات المهنية',
    fullNameAr: 'الاسم الكامل (عربي)',
    fullNameArPlaceholder: 'الاسم الكامل',
    fullNameEn: 'الاسم الكامل (إنجليزي)',
    fullNameEnPlaceholder: 'Full Name',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'therapist@example.com',
    phone: 'رقم الهاتف',
    phonePlaceholder: '+966 XX XXX XXXX',
    profilePicture: 'الصورة الشخصية',
    uploadPhoto: 'رفع الصورة',
    idNumber: 'رقم الهوية',
    idNumberPlaceholder: 'أدخل رقم هويتك',
    licenseNumber: 'رقم الترخيص',
    licenseNumberPlaceholder: 'مثال: MED-2024-12345',
    issuingAuthority: 'جهة الإصدار',
    issuingAuthorityPlaceholder: 'مثال: الهيئة السعودية للصحة',
    experience: 'سنوات الخبرة',
    experienceYears: 'سنوات',
    uploadLicense: 'رفع الترخيص',
    uploadCertificate: 'رفع الشهادات',
    bio: 'السيرة المهنية (اختياري)',
    bioPlaceholder: 'أخبرنا عن خبرتك ومجال تخصصك...',
    homeLocation: 'موقع المنزل',
    locationPlaceholder: 'أدخل عنوان المنزل',
    password: 'كلمة المرور',
    passwordPlaceholder: 'الحد الأدنى 8 أحرف',
    confirmPassword: 'تأكيد كلمة المرور',
    confirmPasswordPlaceholder: 'أعد إدخال كلمة المرور',
    agreeToTerms: 'أوافق على',
    termsLink: 'شروط الخدمة',
    privacyLink: 'سياسة الخصوصية',
    submitButton: 'إرسال للمراجعة',
    backToLogin: 'العودة لتسجيل الدخول',
    languageToggle: 'Continue in English',
    version: 'الإصدار 1.0.0',
    successMessage: 'حسابك قيد المراجعة. سنتواصل معك قريباً!',
    errorRequired: 'يرجى ملء جميع الحقول المطلوبة',
    errorPasswordMismatch: 'كلمات المرور غير متطابقة',
    errorEmailInvalid: 'يرجى إدخال بريد إلكتروني صحيح'
  }
};

export function TherapistSignup({ language, onLanguageToggle, onBackToLogin, onSignupSuccess }: TherapistSignupProps) {
  const [currentStep, setCurrentStep] = useState<'personal' | 'professional'>('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form fields
  const [fullNameAr, setFullNameAr] = useState('');
  const [fullNameEn, setFullNameEn] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [idNumber, setIdNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [issuingAuthority, setIssuingAuthority] = useState('');
  const [experience, setExperience] = useState([3]);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [bio, setBio] = useState('');
  const [homeLocation, setHomeLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const content = signupContent[language];
  const isArabic = language === 'AR';

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    // Validation
    if (!fullNameAr || !fullNameEn || !email || !phone || !idNumber || 
        !licenseNumber || !issuingAuthority || !password || !confirmPassword) {
      toast.error(content.errorRequired, {
        duration: 3000,
        style: {
          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
        }
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error(content.errorEmailInvalid, {
        duration: 3000,
        style: {
          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
        }
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error(content.errorPasswordMismatch, {
        duration: 3000,
        style: {
          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
        }
      });
      return;
    }

    if (!agreedToTerms) {
      toast.error(isArabic ? 'يرجى الموافقة على الشروط والأحكام' : 'Please agree to Terms and Privacy Policy', {
        duration: 3000,
        style: {
          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
        }
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(content.successMessage, {
        duration: 4000,
        style: {
          fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
        }
      });
      setIsSubmitting(false);
      setTimeout(() => {
        onSignupSuccess();
      }, 1000);
    }, 1500);
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #EAF3FF 100%)',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif'
      }}
    >
      {/* Sticky Header */}
      <div 
        className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100"
        style={{ boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)' }}
      >
        <div className="w-full max-w-[430px] mx-auto px-6 py-4">
          {/* Logo + Title */}
          <motion.div 
            className="flex flex-col items-center mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-1">
              <SevenRehabLogo width={120} backgroundColor="linear-gradient(180deg, #FFFFFF 0%, #EAF3FF 100%)" />
            </div>
            <h2
              className="text-[18px]"
              style={{
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Poppins, sans-serif',
                fontWeight: 600,
                color: '#4D7CFF'
              }}
            >
              {content.title}
            </h2>
          </motion.div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: '#EAF3FF' }}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: currentStep === 'personal' ? '#2E63FF' : '#A8D8FF',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                {currentStep === 'personal' ? '1' : <CheckCircle2 className="w-4 h-4" />}
              </div>
              <div 
                className="w-8 h-0.5"
                style={{ backgroundColor: currentStep === 'professional' ? '#2E63FF' : '#D1D5DB' }}
              />
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: currentStep === 'professional' ? '#2E63FF' : '#D1D5DB',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                2
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="w-full max-w-[430px] mx-auto px-6 pt-6">
          
          <Tabs value={currentStep} onValueChange={(v) => setCurrentStep(v as 'personal' | 'professional')}>
            <TabsList className="w-full grid grid-cols-2 mb-6 h-auto p-1" style={{ backgroundColor: '#F3F4F6', borderRadius: '12px' }}>
              <TabsTrigger 
                value="personal" 
                className="rounded-lg py-2.5"
                style={{
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                {content.personalInfo}
              </TabsTrigger>
              <TabsTrigger 
                value="professional"
                className="rounded-lg py-2.5"
                style={{
                  fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                {content.professionalInfo}
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-5 mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Full Name Arabic */}
                  <div>
                    <Label htmlFor="fullNameAr" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.fullNameAr}
                    </Label>
                    <div className="relative">
                      <User className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" style={{ [isArabic ? 'right' : 'left']: '14px' }} />
                      <Input
                        id="fullNameAr"
                        value={fullNameAr}
                        onChange={(e) => setFullNameAr(e.target.value)}
                        placeholder={content.fullNameArPlaceholder}
                        className="h-12"
                        style={{
                          paddingLeft: isArabic ? '16px' : '44px',
                          paddingRight: isArabic ? '44px' : '16px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontFamily: 'Tajawal, sans-serif',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Full Name English */}
                  <div>
                    <Label htmlFor="fullNameEn" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.fullNameEn}
                    </Label>
                    <div className="relative">
                      <User className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" style={{ [isArabic ? 'right' : 'left']: '14px' }} />
                      <Input
                        id="fullNameEn"
                        value={fullNameEn}
                        onChange={(e) => setFullNameEn(e.target.value)}
                        placeholder={content.fullNameEnPlaceholder}
                        className="h-12"
                        style={{
                          paddingLeft: isArabic ? '16px' : '44px',
                          paddingRight: isArabic ? '44px' : '16px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontFamily: 'Inter, sans-serif',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.email}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" style={{ [isArabic ? 'right' : 'left']: '14px' }} />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={content.emailPlaceholder}
                        className="h-12"
                        style={{
                          paddingLeft: isArabic ? '16px' : '44px',
                          paddingRight: isArabic ? '44px' : '16px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.phone}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" style={{ [isArabic ? 'right' : 'left']: '14px' }} />
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={content.phonePlaceholder}
                        className="h-12"
                        style={{
                          paddingLeft: isArabic ? '16px' : '44px',
                          paddingRight: isArabic ? '44px' : '16px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Profile Picture Upload */}
                  <div>
                    <Label htmlFor="profilePic" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.profilePicture}
                    </Label>
                    <div 
                      className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-[#2E63FF] transition-colors"
                      style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)' }}
                      onClick={() => document.getElementById('profilePic')?.click()}
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#9CA3AF' }} />
                      <p className="text-[14px]" style={{ color: '#6B7280' }}>
                        {profilePicture ? profilePicture.name : content.uploadPhoto}
                      </p>
                      <input
                        id="profilePic"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setProfilePicture(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>

                  {/* Next Button */}
                  <motion.button
                    onClick={() => setCurrentStep('professional')}
                    className="w-full h-12 mt-6 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(90deg, #5596FF 0%, #2E63FF 100%)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                      fontWeight: 600,
                      fontSize: '16px',
                      color: '#FFFFFF'
                    }}
                    whileHover={{ boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isArabic ? 'التالي' : 'Next'}
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* Professional Information Tab */}
            <TabsContent value="professional" className="space-y-5 mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* ID Number */}
                  <div>
                    <Label htmlFor="idNumber" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.idNumber}
                    </Label>
                    <div className="relative">
                      <FileText className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" style={{ [isArabic ? 'right' : 'left']: '14px' }} />
                      <Input
                        id="idNumber"
                        type="number"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        placeholder={content.idNumberPlaceholder}
                        className="h-12"
                        style={{
                          paddingLeft: isArabic ? '16px' : '44px',
                          paddingRight: isArabic ? '44px' : '16px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                        }}
                      />
                    </div>
                  </div>

                  {/* License Number */}
                  <div>
                    <Label htmlFor="license" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.licenseNumber}
                    </Label>
                    <div className="relative">
                      <FileText className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" style={{ [isArabic ? 'right' : 'left']: '14px' }} />
                      <Input
                        id="license"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        placeholder={content.licenseNumberPlaceholder}
                        className="h-12"
                        style={{
                          paddingLeft: isArabic ? '16px' : '44px',
                          paddingRight: isArabic ? '44px' : '16px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Issuing Authority */}
                  <div>
                    <Label htmlFor="authority" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.issuingAuthority}
                    </Label>
                    <Input
                      id="authority"
                      value={issuingAuthority}
                      onChange={(e) => setIssuingAuthority(e.target.value)}
                      placeholder={content.issuingAuthorityPlaceholder}
                      className="h-12"
                      style={{
                        borderRadius: '12px',
                        fontSize: '16px',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                      }}
                    />
                  </div>

                  {/* Years of Experience Slider */}
                  <div>
                    <Label htmlFor="experience" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.experience}: {experience[0]} {content.experienceYears}
                    </Label>
                    <div className="pt-2">
                      <Slider
                        value={experience}
                        onValueChange={setExperience}
                        max={30}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Upload License */}
                  <div>
                    <Label htmlFor="licenseFile" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.uploadLicense}
                    </Label>
                    <div 
                      className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-[#2E63FF] transition-colors"
                      style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)' }}
                      onClick={() => document.getElementById('licenseFile')?.click()}
                    >
                      <Upload className="w-6 h-6 mx-auto mb-1" style={{ color: '#9CA3AF' }} />
                      <p className="text-[13px]" style={{ color: '#6B7280' }}>
                        {licenseFile ? licenseFile.name : content.uploadLicense}
                      </p>
                      <input
                        id="licenseFile"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>

                  {/* Upload Certificates */}
                  <div>
                    <Label htmlFor="certificateFile" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.uploadCertificate}
                    </Label>
                    <div 
                      className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-[#2E63FF] transition-colors"
                      style={{ borderColor: '#D1D5DB', backgroundColor: '#FFFFFF', boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)' }}
                      onClick={() => document.getElementById('certificateFile')?.click()}
                    >
                      <Upload className="w-6 h-6 mx-auto mb-1" style={{ color: '#9CA3AF' }} />
                      <p className="text-[13px]" style={{ color: '#6B7280' }}>
                        {certificateFile ? certificateFile.name : content.uploadCertificate}
                      </p>
                      <input
                        id="certificateFile"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => setCertificateFile(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <Label htmlFor="bio" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.bio}
                    </Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder={content.bioPlaceholder}
                      rows={4}
                      style={{
                        borderRadius: '12px',
                        fontSize: '16px',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                      }}
                    />
                  </div>

                  {/* Home Location */}
                  <div>
                    <Label htmlFor="location" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.homeLocation}
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" style={{ [isArabic ? 'right' : 'left']: '14px' }} />
                      <Input
                        id="location"
                        value={homeLocation}
                        onChange={(e) => setHomeLocation(e.target.value)}
                        placeholder={content.locationPlaceholder}
                        className="h-12"
                        style={{
                          paddingLeft: isArabic ? '16px' : '44px',
                          paddingRight: isArabic ? '44px' : '16px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.password}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" style={{ [isArabic ? 'right' : 'left']: '14px' }} />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={content.passwordPlaceholder}
                        className="h-12"
                        style={{
                          paddingLeft: isArabic ? '44px' : '44px',
                          paddingRight: isArabic ? '44px' : '44px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        style={{ [isArabic ? 'left' : 'right']: '14px' }}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label htmlFor="confirmPassword" className="text-[14px] mb-2 block" style={{ fontWeight: 500, color: '#374151' }}>
                      {content.confirmPassword}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" style={{ [isArabic ? 'right' : 'left']: '14px' }} />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={content.confirmPasswordPlaceholder}
                        className="h-12"
                        style={{
                          paddingLeft: isArabic ? '44px' : '44px',
                          paddingRight: isArabic ? '44px' : '44px',
                          borderRadius: '12px',
                          fontSize: '16px',
                          backgroundColor: '#FFFFFF',
                          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        style={{ [isArabic ? 'left' : 'right']: '14px' }}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Privacy */}
                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      className="mt-0.5"
                    />
                    <label htmlFor="terms" className="text-[14px] cursor-pointer" style={{ color: '#6B7280' }}>
                      {content.agreeToTerms}{' '}
                      <button className="underline" style={{ color: '#2E63FF' }}>
                        {content.termsLink}
                      </button>
                      {' '}{isArabic ? 'و' : 'and'}{' '}
                      <button className="underline" style={{ color: '#2E63FF' }}>
                        {content.privacyLink}
                      </button>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-12 mt-6 flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(90deg, #5596FF 0%, #2E63FF 100%)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                      fontWeight: 600,
                      fontSize: '16px',
                      color: '#FFFFFF',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                    whileHover={!isSubmitting ? { boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{isArabic ? 'جاري الإرسال...' : 'Submitting...'}</span>
                      </div>
                    ) : (
                      content.submitButton
                    )}
                  </motion.button>

                  {/* Back Button */}
                  <motion.button
                    onClick={() => setCurrentStep('personal')}
                    className="w-full h-12 mt-3 flex items-center justify-center"
                    style={{
                      backgroundColor: 'transparent',
                      border: '1.5px solid #AFCBFF',
                      borderRadius: '12px',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#4D7CFF'
                    }}
                    whileHover={{ borderColor: '#2E63FF', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isArabic ? 'السابق' : 'Previous'}
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>

          {/* Back to Login Link */}
          <div className="flex items-center justify-center mt-6 mb-4">
            <button
              onClick={onBackToLogin}
              className="text-[14px] flex items-center gap-1 transition-all duration-200 hover:underline"
              style={{
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, Inter, sans-serif',
                fontWeight: 600,
                color: '#2E63FF'
              }}
            >
              {!isArabic && <ArrowLeft className="w-4 h-4" />}
              {content.backToLogin}
              {isArabic && <ArrowLeft className="w-4 h-4 rotate-180" />}
            </button>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="w-full border-t border-gray-100 bg-white/80 backdrop-blur-sm py-4">
        <div className="w-full max-w-[430px] mx-auto px-6 flex items-center justify-between">
          <button
            onClick={onLanguageToggle}
            className="text-[14px] transition-colors duration-200 hover:text-[#2E63FF]"
            style={{
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'Inter, sans-serif',
              fontWeight: 500,
              color: '#A8D8FF'
            }}
          >
            {content.languageToggle}
          </button>
          <span className="text-[12px]" style={{ color: '#9CA3AF' }}>
            {content.version}
          </span>
        </div>
      </div>
    </div>
  );
}
