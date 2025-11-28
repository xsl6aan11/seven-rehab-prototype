import React, { useState, useEffect, useRef } from 'react';
import { Clock, Pause, StopCircle, MapPin, MessageCircle, Mic, Check, X, AlertCircle } from 'lucide-react';
import SevenRehabLogo from './SevenRehabLogo';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';

interface SessionWorkspaceProps {
  language: 'EN' | 'AR';
  patientName: string;
  sessionType: 'consultation-treatment' | 'treatment-only';
  sessionNumber: number;
  totalSessions: number;
  soapData: any;
  onFinalize: () => void;
  onBack: () => void;
}

interface TreatmentItem {
  id: string;
  name: string;
  duration: number;
  completed: boolean;
}

const content = {
  EN: {
    title: 'Session Workspace',
    sessionInfo: 'Consultation + Treatment • Session',
    of: 'of',
    timerLabel: 'Session in progress',
    pauseTimer: 'Pause Timer',
    endSession: 'End Session',
    patientLabel: 'Patient:',
    planLabel: 'Consultation + Treatment',
    sessionsPlanned: 'Sessions Planned',
    completed: 'Completed',
    viewLocation: 'View Location',
    chatPatient: 'Chat with Patient',
    suggestedPlan: 'Suggested Plan (Auto-Generated)',
    planProgress: 'Plan Progress',
    notesLabel: 'Session Notes',
    notesPlaceholder: 'Document patient tolerance, progress, or modifications here...',
    voiceInput: 'Voice Input',
    saved: 'Saved',
    ago: 'ago',
    pauseReason: 'Why are you pausing?',
    pauseReasons: ['Patient Break', 'Equipment Adjustment', 'Emergency', 'Other'],
    confirmPause: 'Confirm Pause',
    cancel: 'Cancel',
    confirmEnd: 'End session and submit?',
    confirmEndDesc: 'This will save your session notes and update patient progress.',
    yesEnd: 'Yes, End Session',
    summaryTitle: 'Session Summary Preview',
    duration: 'Duration',
    completedItems: 'Completed Plan Elements',
    autoSummary: 'Auto-Generated Summary',
    finalize: 'Finalize & Save Session',
    footer: 'Encourages real-time documentation and smooth transition to patient progress tracking.',
    treatmentItems: [
      { name: 'Manual Therapy', duration: 15 },
      { name: 'Stretching', duration: 10 },
      { name: 'Core Activation', duration: 20 },
      { name: 'Mobility Exercises', duration: 15 }
    ]
  },
  AR: {
    title: 'مساحة العمل للجلسة',
    sessionInfo: 'استشارة + علاج • الجلسة',
    of: 'من',
    timerLabel: 'الجلسة قيد التقدم',
    pauseTimer: 'إيقاف مؤقت',
    endSession: 'إنهاء الجلسة',
    patientLabel: 'المريض:',
    planLabel: 'استشارة + علاج',
    sessionsPlanned: 'جلسات مخططة',
    completed: 'مكتملة',
    viewLocation: 'عرض الموقع',
    chatPatient: 'الدردشة مع المريض',
    suggestedPlan: 'الخطة المقترحة (تم إنشاؤها تلقائيًا)',
    planProgress: 'تقدم الخطة',
    notesLabel: 'ملاحظات الجلسة',
    notesPlaceholder: 'وثق تحمل المريض والتقدم أو التعديلات هنا...',
    voiceInput: 'إدخال صوتي',
    saved: 'تم الحفظ',
    ago: 'منذ',
    pauseReason: 'لماذا تقوم بالإيقاف المؤقت؟',
    pauseReasons: ['استراحة المريض', 'تعديل المعدات', 'طوارئ', 'أخرى'],
    confirmPause: 'تأكيد الإيقاف',
    cancel: 'إلغاء',
    confirmEnd: 'إنهاء الجلسة والإرسال؟',
    confirmEndDesc: 'سيؤدي هذا إلى حفظ ملاحظات الجلسة وتحديث تقدم المريض.',
    yesEnd: 'نعم، أنهِ الجلسة',
    summaryTitle: 'معاينة ملخص الجلسة',
    duration: 'المدة',
    completedItems: 'عناصر الخطة المكتملة',
    autoSummary: 'ملخص تلقائي',
    finalize: 'إنهاء وحفظ الجلسة',
    footer: 'يشجع على التوثيق في الوقت الفعلي والانتقال السلس لتتبع تقدم المريض.',
    treatmentItems: [
      { name: 'العلاج اليدوي', duration: 15 },
      { name: 'التمدد', duration: 10 },
      { name: 'تنشيط الجذع', duration: 20 },
      { name: 'تمارين الحركة', duration: 15 }
    ]
  }
};

export default function SessionWorkspace({
  language,
  patientName,
  sessionType,
  sessionNumber,
  totalSessions,
  soapData,
  onFinalize,
  onBack
}: SessionWorkspaceProps) {
  const isArabic = language === 'AR';
  const t = content[language];
  
  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  
  // Treatment plan state
  const [treatments, setTreatments] = useState<TreatmentItem[]>(
    t.treatmentItems.map((item, idx) => ({
      id: `treatment-${idx}`,
      name: item.name,
      duration: item.duration,
      completed: false
    }))
  );
  
  // Notes state
  const [notes, setNotes] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused && !sessionEnded) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused, sessionEnded]);
  
  // Auto-save effect
  useEffect(() => {
    if (notes.length > 0) {
      const timeout = setTimeout(() => {
        setLastSaved(new Date());
      }, 15000); // Auto-save every 15 seconds
      return () => clearTimeout(timeout);
    }
  }, [notes]);
  
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const getTimeSince = (date: Date | null) => {
    if (!date) return '';
    const secondsAgo = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (secondsAgo < 60) return `${secondsAgo}s ${t.ago}`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo}m ${t.ago}`;
  };
  
  const toggleTreatment = (id: string) => {
    setTreatments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  const completedCount = treatments.filter(t => t.completed).length;
  const progressPercentage = (completedCount / treatments.length) * 100;
  
  const handlePauseConfirm = () => {
    setIsPaused(true);
    setShowPauseModal(false);
  };
  
  const handleEndSession = () => {
    setSessionEnded(true);
    setIsPaused(true);
    setShowEndModal(false);
  };
  
  const generateSummary = () => {
    const completedItems = treatments.filter(t => t.completed).map(t => t.name).join(', ');
    return `Patient tolerated session well. Completed treatments: ${completedItems || 'None'}. ${notes.substring(0, 100)}${notes.length > 100 ? '...' : ''}`;
  };

  return (
    <div 
      className="min-h-screen p-6 relative overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        background: 'linear-gradient(135deg, #EAF3FF 0%, #F9FBFF 100%)'
      }}
    >
      {/* Circuit pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E63FF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl" style={{ color: '#2E63FF', fontWeight: 600 }}>{t.title}</h1>
            <SevenRehabLogo width={40} />
          </div>
          <p className="text-sm" style={{ color: '#64748B' }}>
            {t.sessionInfo} {sessionNumber} {t.of} {totalSessions}
          </p>
        </div>

        {!sessionEnded ? (
          <>
            {/* Session Timer Card */}
            <div 
              className="rounded-2xl p-6 mb-6 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FBFF 100%)',
                border: '1px solid #DDE9FF'
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="p-3 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                    boxShadow: '0 4px 12px rgba(46, 99, 255, 0.25)'
                  }}
                >
                  <Clock size={24} style={{ color: '#FFFFFF' }} />
                </div>
                <div className="flex-1">
                  <div 
                    className="text-4xl tracking-wider mb-1"
                    style={{ 
                      color: '#2E63FF',
                      fontWeight: 600,
                      fontVariantNumeric: 'tabular-nums'
                    }}
                  >
                    {formatTime(seconds)}
                  </div>
                  <p className="text-sm" style={{ color: '#64748B' }}>
                    {isPaused ? (isArabic ? 'متوقف مؤقتًا' : 'Paused') : t.timerLabel}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => isPaused ? setIsPaused(false) : setShowPauseModal(true)}
                  className="flex-1 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    background: '#FFFFFF',
                    border: '2px solid transparent',
                    borderImage: 'linear-gradient(135deg, #5596FF, #2E63FF) 1',
                    color: '#2E63FF',
                    fontWeight: 600
                  }}
                >
                  <Pause size={18} />
                  {isPaused ? (isArabic ? 'استئناف' : 'Resume') : t.pauseTimer}
                </button>
                <button
                  onClick={() => setShowEndModal(true)}
                  className="flex-1 py-3 rounded-xl text-white transition-all duration-200 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                    boxShadow: '0 4px 16px rgba(77, 124, 255, 0.3)',
                    fontWeight: 600
                  }}
                >
                  <StopCircle size={18} />
                  {t.endSession}
                </button>
              </div>
            </div>

            {/* Patient Info Card */}
            <div 
              className="rounded-2xl p-5 mb-6"
              style={{
                background: '#FFFFFF',
                border: '1px solid #DDE9FF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className="mb-3">
                <span style={{ color: '#64748B', fontSize: '13px' }}>{t.patientLabel}</span>
                <span className="ml-2" style={{ color: '#1F2937', fontWeight: 600 }}>{patientName}</span>
              </div>
              <div className="mb-3">
                <span style={{ color: '#2E63FF', fontWeight: 600, fontSize: '14px' }}>{t.planLabel}</span>
              </div>
              <p className="text-sm mb-3" style={{ color: '#64748B' }}>
                {totalSessions} {t.sessionsPlanned} • {sessionNumber}/{totalSessions} {t.completed}
              </p>
              <div className="flex gap-3">
                <button 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
                  style={{ background: '#F0F6FF', color: '#2E63FF' }}
                >
                  <MapPin size={14} />
                  {t.viewLocation}
                </button>
                <button 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors"
                  style={{ background: '#F0F6FF', color: '#2E63FF' }}
                >
                  <MessageCircle size={14} />
                  {t.chatPatient}
                </button>
              </div>
            </div>

            {/* Recommended Treatment Plan */}
            <div 
              className="rounded-2xl p-6 mb-6"
              style={{
                background: '#FFFFFF',
                border: '1px solid #DDE9FF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <h3 className="mb-4" style={{ color: '#1F2937', fontWeight: 600 }}>
                {t.suggestedPlan}
              </h3>
              
              <div className="space-y-3 mb-4">
                {treatments.map((treatment) => (
                  <div
                    key={treatment.id}
                    onClick={() => toggleTreatment(treatment.id)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200"
                    style={{
                      background: treatment.completed ? '#F0F6FF' : '#F9FBFF',
                      border: `1.5px solid ${treatment.completed ? '#5596FF' : '#E5E7EB'}`
                    }}
                  >
                    <div
                      className="flex items-center justify-center rounded-lg transition-all duration-200"
                      style={{
                        width: '24px',
                        height: '24px',
                        background: treatment.completed 
                          ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                          : '#FFFFFF',
                        border: treatment.completed ? 'none' : '2px solid #CDE1FF'
                      }}
                    >
                      {treatment.completed && <Check size={16} style={{ color: '#FFFFFF' }} />}
                    </div>
                    <div className="flex-1">
                      <div style={{ color: '#1F2937', fontWeight: 500 }}>{treatment.name}</div>
                      <div className="text-xs" style={{ color: '#64748B' }}>{treatment.duration} min</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm" style={{ color: '#64748B' }}>{t.planProgress}</span>
                  <span className="text-sm" style={{ color: '#2E63FF', fontWeight: 600 }}>
                    {completedCount}/{treatments.length}
                  </span>
                </div>
                <div 
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ background: '#E5E7EB' }}
                >
                  <div 
                    className="h-full transition-all duration-500 ease-out rounded-full"
                    style={{ 
                      width: `${progressPercentage}%`,
                      background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                      boxShadow: progressPercentage > 0 ? '0 2px 8px rgba(46, 99, 255, 0.3)' : 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Live Notes Section */}
            <div 
              className="rounded-2xl p-6 mb-6"
              style={{
                background: '#FFFFFF',
                border: '1px solid #DDE9FF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <label style={{ color: '#1F2937', fontWeight: 600 }}>{t.notesLabel}</label>
                <button
                  onClick={() => setIsVoiceActive(!isVoiceActive)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200"
                  style={{
                    background: isVoiceActive ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)' : '#F0F6FF',
                    color: isVoiceActive ? '#FFFFFF' : '#2E63FF'
                  }}
                >
                  <Mic size={14} />
                  {t.voiceInput}
                </button>
              </div>
              
              <textarea
                ref={notesRef}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                rows={6}
                className="w-full p-3 border-2 rounded-xl focus:outline-none resize-none transition-all mb-2"
                style={{
                  borderColor: '#DDE9FF',
                  background: '#F9FBFF'
                }}
              />
              
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: '#94A3B8' }}>
                  {notes.length} characters
                </span>
                {lastSaved && (
                  <span className="text-xs" style={{ color: '#10B981' }}>
                    ✓ {t.saved} {getTimeSince(lastSaved)}
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Session Summary */
          <div 
            className="rounded-2xl p-6 mb-6"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F6FF 100%)',
              border: '1.5px solid #5596FF',
              boxShadow: '0 8px 24px rgba(46, 99, 255, 0.15)'
            }}
          >
            <h2 className="mb-6 flex items-center gap-2" style={{ color: '#2E63FF', fontWeight: 600 }}>
              <Check size={24} />
              {t.summaryTitle}
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm mb-1" style={{ color: '#64748B' }}>{t.duration}</div>
                <div style={{ color: '#1F2937', fontWeight: 600, fontSize: '20px' }}>
                  {formatTime(seconds)}
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1" style={{ color: '#64748B' }}>{t.completedItems}</div>
                <div style={{ color: '#1F2937' }}>
                  {treatments.filter(t => t.completed).map(t => t.name).join(', ') || 'None'}
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1" style={{ color: '#64748B' }}>{t.autoSummary}</div>
                <div 
                  className="p-3 rounded-xl text-sm"
                  style={{ background: '#F9FBFF', color: '#1F2937', lineHeight: '1.6' }}
                >
                  {generateSummary()}
                </div>
              </div>
            </div>
            
            <button
              onClick={onFinalize}
              className="w-full mt-6 py-4 rounded-xl text-white transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                boxShadow: '0 4px 16px rgba(77, 124, 255, 0.3)',
                fontWeight: 600
              }}
            >
              <Check size={20} />
              {t.finalize}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs mt-8" style={{ color: '#94A3B8' }}>
          {t.footer}
        </div>
      </div>

      {/* Pause Confirmation Modal */}
      <Dialog open={showPauseModal} onOpenChange={setShowPauseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.pauseReason}</DialogTitle>
            <DialogDescription>
              {isArabic ? 'اختر سببًا لإيقاف الجلسة مؤقتًا' : 'Select a reason for pausing the session'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {t.pauseReasons.map((reason, idx) => (
              <button
                key={idx}
                onClick={handlePauseConfirm}
                className="w-full p-3 rounded-xl text-left transition-all duration-200"
                style={{
                  background: '#F9FBFF',
                  border: '1px solid #DDE9FF',
                  color: '#1F2937'
                }}
              >
                {reason}
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPauseModal(false)}>
              {t.cancel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* End Session Confirmation Modal */}
      <Dialog open={showEndModal} onOpenChange={setShowEndModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle size={24} style={{ color: '#EF4444' }} />
              {t.confirmEnd}
            </DialogTitle>
            <DialogDescription>
              {t.confirmEndDesc}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEndModal(false)}>
              {t.cancel}
            </Button>
            <Button 
              onClick={handleEndSession}
              style={{
                background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                color: '#FFFFFF'
              }}
            >
              {t.yesEnd}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
