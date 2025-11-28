import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Clock, AlertCircle, Trash2 } from 'lucide-react';

interface SetAvailabilityProps {
  language?: 'en' | 'ar';
  onBack?: () => void;
}

interface DayAvailability {
  day: string;
  dayAr: string;
  enabled: boolean;
  hours: number[]; // Array of selected hours (0-23)
  isToday?: boolean;
}

export default function SetAvailability({ language = 'en', onBack }: SetAvailabilityProps) {
  const isArabic = language === 'ar';
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  
  const [schedule, setSchedule] = useState<DayAvailability[]>([
    { day: 'Saturday', dayAr: 'السبت', enabled: true, hours: [9, 10, 11, 12, 13, 14, 15, 16, 17], isToday: true },
    { day: 'Sunday', dayAr: 'الأحد', enabled: true, hours: [9, 10, 11, 12, 13, 14, 15, 16, 17] },
    { day: 'Monday', dayAr: 'الإثنين', enabled: false, hours: [9, 10, 11, 12, 13, 14, 15, 16, 17] },
    { day: 'Tuesday', dayAr: 'الثلاثاء', enabled: true, hours: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
    { day: 'Wednesday', dayAr: 'الأربعاء', enabled: true, hours: [10, 11, 12, 13, 14, 15, 16, 17] },
    { day: 'Thursday', dayAr: 'الخميس', enabled: true, hours: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
    { day: 'Friday', dayAr: 'الجمعة', enabled: false, hours: [9, 10, 11, 12, 13, 14, 15, 16, 17] },
  ]);

  const content = {
    en: {
      title: 'Set Availability',
      subtitle: 'Manage your working hours and status',
      save: 'Save',
      saving: 'Saving...',
      saved: 'Saved!',
      on: 'ON',
      off: 'OFF',
      editAvailability: 'Edit Availability',
      startTime: 'Start Time',
      endTime: 'End Time',
      addBreak: 'Add Break',
      cancel: 'Cancel',
      saveChanges: 'Save',
      currentStatus: 'Current Status',
      online: 'Online',
      offline: 'Offline',
      vacationMode: 'Vacation Mode',
      activate: 'Activate',
      clearAll: 'Clear All',
      saveSchedule: 'Save Schedule',
      footerHint: 'Adjusting your availability helps match you with more patients.',
      noSchedule: "You're currently unavailable. Set your schedule to start receiving requests.",
      unavailable: 'Unavailable'
    },
    ar: {
      title: 'تعيين التوفر',
      subtitle: 'إدارة ساعات العمل والحالة',
      save: 'حفظ',
      saving: 'جاري الحفظ...',
      saved: 'تم الحفظ!',
      on: 'مفعّل',
      off: 'متوقف',
      editAvailability: 'تعديل التوفر',
      startTime: 'وقت البدء',
      endTime: 'وقت الانتهاء',
      addBreak: 'إضافة استراحة',
      cancel: 'إلغاء',
      saveChanges: 'حفظ',
      currentStatus: 'الحالة الحالية',
      online: 'متصل',
      offline: 'غير متصل',
      vacationMode: 'وضع الإجازة',
      activate: 'تفعيل',
      clearAll: 'مسح الكل',
      saveSchedule: 'حفظ الجدول',
      footerHint: 'تعديل توافرك يساعد في مطابقتك مع المزيد من المرضى.',
      noSchedule: 'أنت غير متاح حالياً. حدد جدولك لبدء تلقي الطلبات.',
      unavailable: 'غير متاح'
    }
  };

  const text = content[language];

  // Helper function to format hour (0-23) to 12-hour format
  const formatHour = (hour: number): string => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  // Helper function to get time range from hours array
  const getTimeRange = (hours: number[]): string => {
    if (hours.length === 0) return text.unavailable;
    const sortedHours = [...hours].sort((a, b) => a - b);
    const startHour = sortedHours[0];
    const endHour = sortedHours[sortedHours.length - 1] + 1; // +1 because end is exclusive
    return `${formatHour(startHour)} – ${formatHour(endHour)}`;
  };

  const toggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].enabled = !newSchedule[index].enabled;
    setSchedule(newSchedule);
  };

  const openTimeModal = (index: number) => {
    if (schedule[index].enabled) {
      setSelectedDay(index);
    }
  };

  const closeTimeModal = () => {
    setSelectedDay(null);
  };

  const toggleHour = (dayIndex: number, hour: number) => {
    const newSchedule = [...schedule];
    const hours = newSchedule[dayIndex].hours;
    const hourIndex = hours.indexOf(hour);
    
    if (hourIndex > -1) {
      // Remove hour
      newSchedule[dayIndex].hours = hours.filter(h => h !== hour);
    } else {
      // Add hour and sort
      newSchedule[dayIndex].hours = [...hours, hour].sort((a, b) => a - b);
    }
    
    setSchedule(newSchedule);
  };

  const selectAllHours = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].hours = Array.from({ length: 24 }, (_, i) => i);
    setSchedule(newSchedule);
  };

  const clearAllHours = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].hours = [];
    setSchedule(newSchedule);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 2000);
    }, 800);
  };

  const clearAll = () => {
    const newSchedule = schedule.map(day => ({ ...day, enabled: false }));
    setSchedule(newSchedule);
  };

  const activateVacationMode = () => {
    const newSchedule = schedule.map(day => ({ ...day, enabled: false }));
    setSchedule(newSchedule);
    setIsOnline(false);
  };

  const hasAnyAvailability = schedule.some(day => day.enabled);

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #F9FBFF 0%, #EAF3FF 100%)',
        direction: isArabic ? 'rtl' : 'ltr',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, Inter, sans-serif'
      }}
    >
      {/* Fixed Header */}
      <div
        className="sticky top-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E4EEFF',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl transition-all active:scale-95"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E4EEFF',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
            }}
          >
            <ArrowLeft 
              size={20} 
              color="#2E63FF"
              style={{
                transform: isArabic ? 'rotate(180deg)' : 'none'
              }}
            />
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="p-2 rounded-xl transition-all active:scale-95"
            style={{
              background: isSaving 
                ? 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)'
                : 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
              boxShadow: '0 2px 8px rgba(46, 99, 255, 0.25)',
              opacity: isSaving ? 0.7 : 1
            }}
          >
            {isSaving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Clock size={20} color="#FFFFFF" />
              </motion.div>
            ) : (
              <Check size={20} color="#FFFFFF" />
            )}
          </button>
        </div>

        <h1
          className="text-[22px] mb-1"
          style={{
            fontWeight: 700,
            color: '#1F2937'
          }}
        >
          {text.title}
        </h1>
        <p
          className="text-[13px]"
          style={{
            color: '#64748B',
            fontWeight: 500
          }}
        >
          {text.subtitle}
        </p>

        {/* Saving Progress Bar */}
        <AnimatePresence>
          {isSaving && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0 }}
              className="h-1 rounded-full mt-3"
              style={{
                background: 'linear-gradient(90deg, #5596FF 0%, #2E63FF 100%)',
                transformOrigin: isArabic ? 'right' : 'left'
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Save Success Toast */}
      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 z-[60] px-6 py-3 rounded-xl"
            style={{
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            <div className="flex items-center gap-2">
              <Check size={18} color="#FFFFFF" />
              <span
                className="text-[14px]"
                style={{
                  color: '#FFFFFF',
                  fontWeight: 600
                }}
              >
                {text.saved}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="px-6 py-6 pb-40">
        {/* No Schedule Warning */}
        {!hasAnyAvailability && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl flex items-start gap-3"
            style={{
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              border: '1px solid #FCD34D',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}
          >
            <AlertCircle size={20} color="#92400E" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p
              className="text-[13px]"
              style={{
                color: '#92400E',
                fontWeight: 500,
                lineHeight: '1.5'
              }}
            >
              {text.noSchedule}
            </p>
          </motion.div>
        )}

        {/* Availability Overview */}
        <div className="mb-6">
          <h2
            className="text-[16px] mb-3"
            style={{
              fontWeight: 600,
              color: '#1F2937'
            }}
          >
            {isArabic ? 'نظرة عامة على التوفر' : 'Availability Overview'}
          </h2>

          <div className="space-y-3">
            {schedule.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl p-4 transition-all"
                style={{
                  background: day.isToday && day.enabled
                    ? 'linear-gradient(135deg, #E0F2FF 0%, #BAE6FF 100%)'
                    : '#FFFFFF',
                  border: day.enabled 
                    ? '1px solid #CDE1FF'
                    : '1px solid #E2E8F0',
                  boxShadow: day.enabled
                    ? '0 3px 10px rgba(0, 0, 0, 0.05)'
                    : '0 2px 6px rgba(0, 0, 0, 0.03)',
                  opacity: day.enabled ? 1 : 0.6
                }}
              >
                <div className="flex items-center justify-between">
                  {/* Day Name */}
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="flex items-center justify-center rounded-xl"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: day.enabled 
                          ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                          : '#E2E8F0',
                        boxShadow: day.enabled 
                          ? '0 2px 6px rgba(46, 99, 255, 0.3)'
                          : 'none'
                      }}
                    >
                      <span
                        className="text-[13px]"
                        style={{
                          color: '#FFFFFF',
                          fontWeight: 700
                        }}
                      >
                        {isArabic ? day.dayAr.substring(0, 3) : day.day.substring(0, 3)}
                      </span>
                    </div>

                    {/* Time Range */}
                    <button
                      onClick={() => openTimeModal(index)}
                      disabled={!day.enabled}
                      className="flex-1 text-left transition-all"
                      style={{
                        cursor: day.enabled ? 'pointer' : 'default'
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Clock size={16} color={day.enabled ? '#6B7280' : '#94A3B8'} />
                        <span
                          className="text-[14px]"
                          style={{
                            color: day.enabled ? '#1F2937' : '#94A3B8',
                            fontWeight: 600
                          }}
                        >
                          {day.enabled ? getTimeRange(day.hours) : text.unavailable}
                        </span>
                      </div>
                      {day.isToday && day.enabled && (
                        <span
                          className="text-[11px] mt-1 inline-block"
                          style={{
                            color: '#2E63FF',
                            fontWeight: 600
                          }}
                        >
                          {isArabic ? 'اليوم' : 'Today'}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => toggleDay(index)}
                    className="relative rounded-full transition-all"
                    style={{
                      width: '52px',
                      height: '30px',
                      background: day.enabled 
                        ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                        : '#E2E8F0',
                      boxShadow: day.enabled 
                        ? '0 2px 8px rgba(46, 99, 255, 0.3)'
                        : 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <motion.div
                      animate={{
                        x: day.enabled ? (isArabic ? -24 : 24) : 0
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute top-1 rounded-full"
                      style={{
                        width: '22px',
                        height: '22px',
                        background: '#FFFFFF',
                        left: isArabic ? 'auto' : '4px',
                        right: isArabic ? '4px' : 'auto',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Status & Shortcuts */}
        <div className="mb-6">
          <h2
            className="text-[16px] mb-3"
            style={{
              fontWeight: 600,
              color: '#1F2937'
            }}
          >
            {isArabic ? 'الحالة والاختصارات' : 'Status & Shortcuts'}
          </h2>

          <div
            className="p-4 rounded-2xl"
            style={{
              background: '#FFFFFF',
              border: '1px solid #D8E7FF',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* Current Status */}
            <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: '1px solid #F0F4FF' }}>
              <div>
                <label
                  className="text-[13px] block mb-1"
                  style={{
                    color: '#64748B',
                    fontWeight: 600
                  }}
                >
                  {text.currentStatus}
                </label>
                <span
                  className="text-[14px]"
                  style={{
                    color: isOnline ? '#10B981' : '#94A3B8',
                    fontWeight: 600
                  }}
                >
                  {isOnline ? text.online : text.offline}
                </span>
              </div>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className="relative rounded-full transition-all"
                style={{
                  width: '52px',
                  height: '30px',
                  background: isOnline 
                    ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                    : '#E2E8F0',
                  boxShadow: isOnline 
                    ? '0 2px 8px rgba(16, 185, 129, 0.3)'
                    : 'inset 0 2px 4px rgba(0, 0, 0, 0.06)'
                }}
              >
                <motion.div
                  animate={{
                    x: isOnline ? (isArabic ? -24 : 24) : 0
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 rounded-full"
                  style={{
                    width: '22px',
                    height: '22px',
                    background: '#FFFFFF',
                    left: isArabic ? 'auto' : '4px',
                    right: isArabic ? '4px' : 'auto',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
                  }}
                />
              </button>
            </div>

            {/* Vacation Mode */}
            <div className="flex items-center justify-between">
              <div>
                <label
                  className="text-[13px] block mb-1"
                  style={{
                    color: '#64748B',
                    fontWeight: 600
                  }}
                >
                  {text.vacationMode}
                </label>
                <span
                  className="text-[11px]"
                  style={{
                    color: '#94A3B8',
                    fontWeight: 500
                  }}
                >
                  {isArabic ? 'تعطيل جميع الأيام مؤقتاً' : 'Disables all days temporarily'}
                </span>
              </div>
              <button
                onClick={activateVacationMode}
                className="px-4 py-2 rounded-xl transition-all active:scale-95"
                style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#DC2626',
                  fontWeight: 600,
                  fontSize: '13px'
                }}
              >
                {text.activate}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div
        className="fixed bottom-0 left-0 right-0 px-6 py-4"
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid #E4EEFF',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.06)'
        }}
      >
        {/* Hint Text */}
        <p
          className="text-[12px] text-center mb-3"
          style={{
            color: '#64748B',
            fontWeight: 500,
            lineHeight: '1.4'
          }}
        >
          {text.footerHint}
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={clearAll}
            className="flex-1 py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            style={{
              background: '#FFFFFF',
              border: '1px solid #FCA5A5',
              color: '#DC2626',
              fontWeight: 600,
              fontSize: '14px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
            }}
          >
            <Trash2 size={16} />
            {text.clearAll}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-2 py-3 rounded-xl transition-all active:scale-95 text-center"
            style={{
              flex: 2,
              background: isSaving 
                ? 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)'
                : 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(46, 99, 255, 0.3)',
              opacity: isSaving ? 0.7 : 1,
              textAlign: 'center'
            }}
          >
            {isSaving ? text.saving : text.saveSchedule}
          </button>
        </div>
      </div>

      {/* Time Picker Modal */}
      <AnimatePresence>
        {selectedDay !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTimeModal}
              className="fixed inset-0 z-50"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)'
              }}
            />

            {/* Modal - Bottom Sheet Style */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.2)',
                maxHeight: '80vh'
              }}
            >
              {/* Handle Bar */}
              <div className="flex justify-center pt-3 pb-2">
                <div
                  className="rounded-full"
                  style={{
                    width: '40px',
                    height: '4px',
                    background: '#D1D5DB'
                  }}
                />
              </div>

              {/* Modal Header */}
              <div
                className="px-6 py-4"
                style={{
                  borderBottom: '1px solid #F0F4FF'
                }}
              >
                <h3
                  className="text-[18px] text-center"
                  style={{
                    fontWeight: 700,
                    color: '#1F2937'
                  }}
                >
                  {text.editAvailability} — {isArabic ? schedule[selectedDay].dayAr : schedule[selectedDay].day}
                </h3>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 180px)' }}>
                {/* Quick Actions */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => selectAllHours(selectedDay)}
                    className="flex-1 py-2 rounded-lg transition-all active:scale-95"
                    style={{
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      color: '#2E63FF',
                      fontWeight: 600,
                      fontSize: '12px'
                    }}
                  >
                    {isArabic ? 'تحديد الكل' : 'Select All'}
                  </button>
                  <button
                    onClick={() => clearAllHours(selectedDay)}
                    className="flex-1 py-2 rounded-lg transition-all active:scale-95"
                    style={{
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      color: '#DC2626',
                      fontWeight: 600,
                      fontSize: '12px'
                    }}
                  >
                    {isArabic ? 'مسح الكل' : 'Clear All'}
                  </button>
                </div>

                {/* 24-Hour Grid */}
                <div className="mb-4">
                  <label
                    className="block text-[13px] mb-3"
                    style={{
                      color: '#64748B',
                      fontWeight: 600
                    }}
                  >
                    {isArabic ? 'اختر الساعات المتاحة' : 'Select Available Hours'}
                  </label>
                  
                  <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 24 }, (_, i) => i).map(hour => {
                      const isSelected = schedule[selectedDay].hours.includes(hour);
                      return (
                        <motion.button
                          key={hour}
                          onClick={() => toggleHour(selectedDay, hour)}
                          whileTap={{ scale: 0.9 }}
                          className="aspect-square rounded-xl transition-all"
                          style={{
                            background: isSelected 
                              ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                              : '#F8FAFC',
                            border: isSelected 
                              ? 'none'
                              : '1px solid #E2E8F0',
                            boxShadow: isSelected 
                              ? '0 2px 8px rgba(46, 99, 255, 0.3)'
                              : 'none'
                          }}
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <span
                              className="text-[13px]"
                              style={{
                                color: isSelected ? '#FFFFFF' : '#1F2937',
                                fontWeight: 700
                              }}
                            >
                              {hour === 0 ? '12' : hour > 12 ? hour - 12 : hour}
                            </span>
                            <span
                              className="text-[9px]"
                              style={{
                                color: isSelected ? 'rgba(255, 255, 255, 0.8)' : '#94A3B8',
                                fontWeight: 600
                              }}
                            >
                              {hour < 12 ? 'AM' : 'PM'}
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Hours Summary */}
                {schedule[selectedDay].hours.length > 0 && (
                  <div
                    className="p-3 rounded-xl mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #E0F2FF 0%, #BAE6FF 100%)',
                      border: '1px solid #BFDBFE'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock size={16} color="#2E63FF" />
                      <span
                        className="text-[13px]"
                        style={{
                          color: '#1F2937',
                          fontWeight: 600
                        }}
                      >
                        {isArabic ? 'الوقت المحدد: ' : 'Selected: '}
                        {getTimeRange(schedule[selectedDay].hours)}
                      </span>
                    </div>
                    <span
                      className="text-[11px] block mt-1"
                      style={{
                        color: '#64748B',
                        fontWeight: 500
                      }}
                    >
                      {schedule[selectedDay].hours.length} {isArabic ? 'ساعة' : 'hours'}
                    </span>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div
                className="px-6 py-4 flex gap-3"
                style={{
                  borderTop: '1px solid #F0F4FF'
                }}
              >
                <button
                  onClick={closeTimeModal}
                  className="flex-1 py-3 rounded-xl transition-all active:scale-95"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    color: '#64748B',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}
                >
                  {text.cancel}
                </button>
                <button
                  onClick={closeTimeModal}
                  className="flex-1 py-3 rounded-xl transition-all active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '14px',
                    boxShadow: '0 4px 8px rgba(46, 99, 255, 0.25)'
                  }}
                >
                  {text.saveChanges}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
