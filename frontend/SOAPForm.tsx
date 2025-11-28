import React, { useState, useRef } from 'react';
import { ArrowLeft, CheckCircle, Activity, Hand, Gauge, Zap, Dumbbell, FootprintsIcon } from 'lucide-react';

interface SOAPFormProps {
  language: 'EN' | 'AR';
  patientName: string;
  sessionType: 'consultation-treatment' | 'treatment-only';
  onBack: () => void;
  onSubmit: (data: any) => void;
}

const content = {
  EN: {
    title: 'SOAP Form – First Session',
    subtitle: 'Required before starting patient session',
    subjectiveLabel: 'S – Subjective',
    subjectivePlaceholder: 'Patient complaints, symptoms...',
    objectiveLabel: 'O – Objective', 
    objectivePlaceholder: 'Add notes or measurements (e.g., ROM flexion: 80°)',
    assessmentLabel: 'A – Assessment',
    assessmentPlaceholder: 'Your diagnosis...',
    planLabel: 'P – Plan',
    planPlaceholder: 'Treatment recommendations...',
    submitButton: 'Submit SOAP Form',
    submitting: 'Submitting...'
  },
  AR: {
    title: 'نموذج SOAP – الجلسة الأولى',
    subtitle: 'مطلوب قبل بدء الجلسة',
    subjectiveLabel: 'S – ذاتي',
    subjectivePlaceholder: 'شكاوى المريض والأعراض...',
    objectiveLabel: 'O – موضوعي',
    objectivePlaceholder: 'أضف ملاحظات أو قياسات (مثال: ROM flexion: 80°)',
    assessmentLabel: 'A – تقييم',
    assessmentPlaceholder: 'تشخيصك...',
    planLabel: 'P – خطة',
    planPlaceholder: 'التوصيات العلاجية...',
    submitButton: 'إرسال النموذج',
    submitting: 'جاري الإرسال...'
  }
};

export default function SOAPForm({ language, patientName, sessionType, onBack, onSubmit }: SOAPFormProps) {
  const isArabic = language === 'AR';
  const t = content[language];
  
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Objective section enhancements
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionType, setSuggestionType] = useState<'pain' | 'rom' | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const quickTags = [
    { id: 'pain', label: isArabic ? 'ألم' : 'Pain', icon: Activity },
    { id: 'palpation', label: isArabic ? 'جس' : 'Palpation', icon: Hand },
    { id: 'rom', label: isArabic ? 'نطاق الحركة' : 'ROM', icon: Gauge },
    { id: 'sensation', label: isArabic ? 'إحساس' : 'Sensation', icon: Zap },
    { id: 'strength', label: isArabic ? 'قوة' : 'Strength', icon: Dumbbell },
    { id: 'gait', label: isArabic ? 'تحليل المشي' : 'Gait Analysis', icon: FootprintsIcon }
  ];
  
  const painLevels = ['1/10', '2/10', '3/10', '4/10', '5/10', '6/10', '7/10', '8/10', '9/10', '10/10'];
  const romTypes = [
    'Flexion: 80°',
    'Extension: 20°',
    'Abduction: 90°',
    'Adduction: 45°',
    'Internal Rotation: 70°',
    'External Rotation: 90°'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit({
      subjective,
      objective,
      assessment,
      plan
    });
  };
  
  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };
  
  const handleObjectiveChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setObjective(value);
    
    // Check for trigger words
    const lowerValue = value.toLowerCase();
    const lastWord = lowerValue.split(/\s+/).pop() || '';
    
    if (lastWord.includes('rom') || lowerValue.endsWith('rom')) {
      setSuggestionType('rom');
      setShowSuggestions(true);
    } else if (lastWord.includes('pain') || lowerValue.endsWith('pain')) {
      setSuggestionType('pain');
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestionType(null);
    }
  };
  
  const insertSuggestion = (suggestion: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const cursorPos = textarea.selectionStart;
    const textBefore = objective.substring(0, cursorPos);
    const textAfter = objective.substring(cursorPos);
    
    // Remove the trigger word and add suggestion
    const words = textBefore.split(/\s+/);
    words.pop(); // Remove last word (trigger)
    const newText = words.join(' ') + (words.length > 0 ? ' ' : '') + suggestion + textAfter;
    
    setObjective(newText);
    setShowSuggestions(false);
    setSuggestionType(null);
    
    // Refocus textarea
    setTimeout(() => textarea.focus(), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
            <ArrowLeft className={isArabic ? 'rotate-180' : ''} size={24} style={{ color: '#2E63FF' }} />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl" style={{ color: '#2E63FF' }}>{t.title}</h1>
            <p className="text-sm text-gray-600">{t.subtitle}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block mb-2" style={{ color: '#1F2937' }}>{t.subjectiveLabel}</label>
            <textarea
              value={subjective}
              onChange={(e) => setSubjective(e.target.value)}
              placeholder={t.subjectivePlaceholder}
              rows={4}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
              required
            />
          </div>

          <div 
            className="rounded-2xl p-6 shadow-sm relative"
            style={{
              background: 'linear-gradient(135deg, #F9FBFF 0%, #EAF3FF 100%)',
              border: '1px solid #DDE9FF'
            }}
          >
            <label className="block mb-3" style={{ color: '#1F2937', fontWeight: 600 }}>
              {t.objectiveLabel} <span style={{ color: '#64748B', fontSize: '13px', fontWeight: 500 }}>(Your findings)</span>
            </label>
            
            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {quickTags.map(tag => {
                const Icon = tag.icon;
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200"
                    style={{
                      background: isSelected 
                        ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                        : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#2E63FF',
                      border: isSelected ? 'none' : '1.5px solid #CDE1FF',
                      boxShadow: isSelected 
                        ? '0 4px 12px rgba(46, 99, 255, 0.25), 0 0 0 3px rgba(46, 99, 255, 0.1)'
                        : '0 2px 4px rgba(0, 0, 0, 0.05)',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    <Icon size={14} />
                    {tag.label}
                  </button>
                );
              })}
            </div>
            
            {/* Input Field */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={objective}
                onChange={handleObjectiveChange}
                placeholder={t.objectivePlaceholder}
                rows={4}
                className="w-full p-3 border-2 rounded-xl focus:outline-none resize-none transition-all"
                style={{
                  borderColor: showSuggestions ? '#5596FF' : '#DDE9FF',
                  background: '#FFFFFF',
                  boxShadow: showSuggestions ? '0 0 0 3px rgba(85, 150, 255, 0.1)' : 'none'
                }}
                required
              />
              
              {/* Dynamic Suggestions Dropdown */}
              {showSuggestions && (
                <div 
                  className="absolute z-10 mt-2 w-full rounded-xl overflow-hidden shadow-lg"
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #CDE1FF',
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}
                >
                  <div 
                    className="px-3 py-2 text-xs"
                    style={{
                      background: '#F0F6FF',
                      color: '#2E63FF',
                      fontWeight: 600
                    }}
                  >
                    {suggestionType === 'pain' 
                      ? (isArabic ? 'اختر مستوى الألم' : 'Select Pain Level')
                      : (isArabic ? 'اختر نوع ROM' : 'Select ROM Type')
                    }
                  </div>
                  {(suggestionType === 'pain' ? painLevels : romTypes).map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => insertSuggestion(
                        suggestionType === 'pain' 
                          ? `Pain Level ${item}`
                          : `ROM ${item}`
                      )}
                      className="w-full px-3 py-2.5 text-left transition-all duration-150"
                      style={{
                        background: '#FFFFFF',
                        color: '#1F2937',
                        fontSize: '14px',
                        fontWeight: 500,
                        borderBottom: '1px solid #F0F6FF'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#F0F6FF';
                        e.currentTarget.style.color = '#2E63FF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#FFFFFF';
                        e.currentTarget.style.color = '#1F2937';
                      }}
                    >
                      {suggestionType === 'pain' ? `Pain Level ${item}` : `ROM ${item}`}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Selected Tags Display */}
            {selectedTags.length > 0 && (
              <div className="mt-3 text-xs" style={{ color: '#64748B' }}>
                <span style={{ fontWeight: 600 }}>
                  {isArabic ? 'العلامات المحددة:' : 'Selected tags:'}
                </span>{' '}
                {selectedTags.map(id => quickTags.find(t => t.id === id)?.label).join(', ')}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block mb-2" style={{ color: '#1F2937' }}>{t.assessmentLabel}</label>
            <textarea
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder={t.assessmentPlaceholder}
              rows={4}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
              required
            />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block mb-2" style={{ color: '#1F2937' }}>{t.planLabel}</label>
            <textarea
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder={t.planPlaceholder}
              rows={4}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl text-white transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)', boxShadow: '0 4px 16px rgba(77, 124, 255, 0.3)' }}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t.submitting}
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                {t.submitButton}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
