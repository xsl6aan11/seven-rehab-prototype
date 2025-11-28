import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface Achievement {
  icon: React.ReactNode;
  title: string;
  bonusPercent: number;
  reward: number;
  type: 'instant' | 'auto-weekly';
  status: 'achieved' | 'in-progress';
  iconColor: string;
  iconBg: string;
  description: string;
  currentProgress: string;
  nextEvaluation: string;
}

interface BonusDetailModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
  language: 'EN' | 'AR';
}

interface Content {
  ruleDescription: string;
  currentProgress: string;
  nextEvaluation: string;
  gotIt: string;
  bonusRate: string;
  reward: string;
  sar: string;
}

const content: Record<'EN' | 'AR', Content> = {
  EN: {
    ruleDescription: 'Rule Description',
    currentProgress: 'Current Progress',
    nextEvaluation: 'Next Evaluation',
    gotIt: 'Got it',
    bonusRate: 'Bonus Rate',
    reward: 'Reward',
    sar: 'SAR'
  },
  AR: {
    ruleDescription: 'وصف القاعدة',
    currentProgress: 'التقدم الحالي',
    nextEvaluation: 'التقييم القادم',
    gotIt: 'فهمت',
    bonusRate: 'معدل المكافأة',
    reward: 'المكافأة',
    sar: 'ريال'
  }
};

export default function BonusDetailModal({
  achievement,
  isOpen,
  onClose,
  language
}: BonusDetailModalProps) {
  const isArabic = language === 'AR';
  const modalContent = content[language];

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              className="w-full max-w-[390px] rounded-3xl overflow-hidden"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, -apple-system, sans-serif',
                direction: isArabic ? 'rtl' : 'ltr'
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="p-6 pb-4 relative"
                style={{
                  background: 'linear-gradient(135deg, #EAF3FF 0%, #DBEAFE 100%)'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                  style={{
                    right: isArabic ? 'auto' : '16px',
                    left: isArabic ? '16px' : 'auto',
                    width: '32px',
                    height: '32px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    color: '#64748B'
                  }}
                >
                  <X size={18} />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: '64px',
                      height: '64px',
                      background: achievement.iconBg,
                      color: achievement.iconColor,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div style={{ transform: 'scale(1.4)' }}>
                      {achievement.icon}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-center text-[17px] mb-2"
                  style={{
                    fontWeight: 700,
                    color: '#1F2937'
                  }}
                >
                  {achievement.title}
                </h2>

                {/* Bonus Rate and Reward */}
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="px-3 py-1.5 rounded-lg"
                    style={{
                      background: '#E0EFFF'
                    }}
                  >
                    <span
                      className="text-[13px]"
                      style={{
                        color: '#2E63FF',
                        fontWeight: 700
                      }}
                    >
                      {achievement.bonusPercent}% {modalContent.bonusRate}
                    </span>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)'
                    }}
                  >
                    <span
                      className="text-[13px]"
                      style={{
                        color: '#FFFFFF',
                        fontWeight: 700
                      }}
                    >
                      +{achievement.reward} {modalContent.sar}
                    </span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Rule Description */}
                <div>
                  <h3
                    className="text-[13px] mb-2"
                    style={{
                      fontWeight: 700,
                      color: '#64748B'
                    }}
                  >
                    {modalContent.ruleDescription}
                  </h3>
                  <p
                    className="text-[14px]"
                    style={{
                      color: '#1F2937',
                      lineHeight: '1.6'
                    }}
                  >
                    {achievement.description}
                  </p>
                </div>

                <div
                  className="h-px"
                  style={{
                    background: '#E0EFFF'
                  }}
                />

                {/* Current Progress */}
                <div>
                  <h3
                    className="text-[13px] mb-2"
                    style={{
                      fontWeight: 700,
                      color: '#64748B'
                    }}
                  >
                    {modalContent.currentProgress}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p
                      className="text-[14px]"
                      style={{
                        color: '#1F2937',
                        fontWeight: 600
                      }}
                    >
                      {achievement.currentProgress}
                    </p>
                    <span
                      className="text-[11px] px-2 py-0.5 rounded"
                      style={{
                        background: achievement.status === 'achieved' ? '#D1FAE5' : '#FEF3C7',
                        color: achievement.status === 'achieved' ? '#10B981' : '#D97706',
                        fontWeight: 600
                      }}
                    >
                      {achievement.status === 'achieved' ? '✅ Achieved' : '⏳ In Progress'}
                    </span>
                  </div>
                </div>

                <div
                  className="h-px"
                  style={{
                    background: '#E0EFFF'
                  }}
                />

                {/* Next Evaluation */}
                <div>
                  <h3
                    className="text-[13px] mb-1"
                    style={{
                      fontWeight: 700,
                      color: '#64748B'
                    }}
                  >
                    {modalContent.nextEvaluation}
                  </h3>
                  <p
                    className="text-[14px]"
                    style={{
                      color: '#1F2937'
                    }}
                  >
                    {achievement.nextEvaluation}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={onClose}
                  className="w-full rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                    color: '#FFFFFF',
                    padding: '14px',
                    fontWeight: 700,
                    fontSize: '15px',
                    boxShadow: '0 4px 12px rgba(46, 99, 255, 0.3)'
                  }}
                >
                  {modalContent.gotIt}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
