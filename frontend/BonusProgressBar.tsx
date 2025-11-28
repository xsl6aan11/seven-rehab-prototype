import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface BonusProgressBarProps {
  currentSessions: number;
  maxSessions?: number;
  currentBonus: number;
  language: 'EN' | 'AR';
  size?: 'compact' | 'full';
  showMilestones?: boolean;
  showLabel?: boolean;
}

interface Milestone {
  sessions: number;
  bonus: number;
  icon: string;
  label?: string;
}

const milestones: Milestone[] = [
  { sessions: 10, bonus: 5, icon: '⭐' },
  { sessions: 25, bonus: 10, icon: '⚡' },
  { sessions: 50, bonus: 20, icon: '💪' },
  { sessions: 75, bonus: 30, icon: '🎯' },
  { sessions: 100, bonus: 40, icon: '🏆', label: '100+' }
];

export default function BonusProgressBar({
  currentSessions,
  maxSessions = 100,
  currentBonus,
  language,
  size = 'compact',
  showMilestones = false,
  showLabel = true
}: BonusProgressBarProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const isArabic = language === 'AR';
  const progressPercentage = Math.min((currentSessions / maxSessions) * 100, 100);

  const content = {
    EN: {
      youreAt: "You're at {sessions} sessions → {bonus}% Bonus",
      sessionsCompleted: '{current} sessions completed',
      sessionsLabel: 'Sessions',
      bonusLabel: 'Bonus',
      unlocked: "You've unlocked the {bonus}% Bonus milestone!"
    },
    AR: {
      youreAt: 'أنت عند {sessions} جلسة → {bonus}% مكافأة',
      sessionsCompleted: '{current} جلسة مكتملة',
      sessionsLabel: 'الجلسات',
      bonusLabel: 'المكافأة',
      unlocked: 'لقد فتحت معلم المكافأة {bonus}%!'
    }
  };

  const text = content[language];

  // Animate progress on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  // Find next milestone
  const nextMilestone = milestones.find(m => m.sessions > currentSessions);
  const lastAchievedMilestone = milestones.filter(m => m.sessions <= currentSessions).pop();

  return (
    <div className="w-full">
      {/* Floating Label Above Progress Bar */}
      {showLabel && (
        <motion.div
          className="mb-3 flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div
            className="rounded-xl px-4 py-2 inline-block"
            style={{
              background: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              fontSize: size === 'full' ? '14px' : '13px',
              fontWeight: 700,
              color: '#2E63FF',
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, sans-serif'
            }}
          >
            {text.youreAt
              .replace('{sessions}', currentSessions.toString())
              .replace('{bonus}', currentBonus.toString())}
          </div>
        </motion.div>
      )}

      {/* Progress Bar Container */}
      <div className="relative" style={{ paddingBottom: showMilestones ? '32px' : '8px' }}>
        {/* Background Track */}
        <div
          className="relative overflow-hidden"
          style={{
            width: '100%',
            height: size === 'full' ? '16px' : '14px',
            background: '#E0EFFF',
            borderRadius: '8px'
          }}
        >
          {/* Progress Fill */}
          <motion.div
            className="h-full rounded-lg relative"
            style={{
              background: 'linear-gradient(90deg, #5596FF 0%, #2E63FF 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3), 0 2px 4px rgba(46, 99, 255, 0.2)'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${animatedProgress}%` }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.1, 0.25, 1] // easeOutCubic
            }}
          >
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                animation: 'shimmer 2s infinite',
                borderRadius: '8px'
              }}
            />
          </motion.div>

          {/* Milestone Markers */}
          {milestones.map((milestone, index) => {
            // Position the last marker (100+) at 92% instead of 100%
            const markerPosition = index === milestones.length - 1 
              ? 92 
              : (milestone.sessions / maxSessions) * 100;
            const isAchieved = currentSessions >= milestone.sessions;

            return (
              <div
                key={index}
                className="absolute top-0 h-full flex items-center"
                style={{
                  left: `${markerPosition}%`,
                  transform: 'translateX(-50%)',
                  zIndex: 10
                }}
              >
                {/* Marker Dot */}
                <motion.div
                  className="rounded-full"
                  style={{
                    width: size === 'full' ? '8px' : '6px',
                    height: size === 'full' ? '8px' : '6px',
                    background: isAchieved ? '#FFFFFF' : '#94A3B8',
                    boxShadow: isAchieved
                      ? '0 0 0 2px #2E63FF, 0 2px 4px rgba(0, 0, 0, 0.2)'
                      : '0 0 0 1px #CBD5E1'
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                />
              </div>
            );
          })}
        </div>

        {/* Milestone Labels Below Bar */}
        {showMilestones && (
          <div className="absolute top-full w-full flex justify-between px-1" style={{ marginTop: '-2px' }}>
            {milestones.map((milestone, index) => {
              // Position the last marker (100+) at 92% instead of 100%
              const markerPosition = index === milestones.length - 1 
                ? 92 
                : (milestone.sessions / maxSessions) * 100;
              const isAchieved = currentSessions >= milestone.sessions;

              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  style={{
                    position: 'absolute',
                    left: `${markerPosition}%`,
                    transform: 'translateX(-50%)'
                  }}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                >
                  <span
                    className="text-[10px] mb-0.5"
                    style={{
                      color: isAchieved ? '#2E63FF' : '#94A3B8',
                      fontWeight: isAchieved ? 600 : 500,
                      fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, sans-serif'
                    }}
                  >
                    {milestone.icon}
                  </span>
                  <span
                    className="text-[9px] whitespace-nowrap"
                    style={{
                      color: isAchieved ? '#2E63FF' : '#94A3B8',
                      fontWeight: isAchieved ? 600 : 500,
                      fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, sans-serif'
                    }}
                  >
                    {milestone.label || milestone.sessions}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Milestone Details (Full Size Only) */}
      {size === 'full' && showMilestones && (
        <motion.div
          className="mt-6 space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          {milestones.map((milestone, index) => {
            const isAchieved = currentSessions >= milestone.sessions;
            const isCurrent = currentSessions >= milestone.sessions && (!nextMilestone || nextMilestone.sessions > milestone.sessions);

            return (
              <div
                key={index}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg"
                style={{
                  background: isCurrent ? 'linear-gradient(135deg, #EAF3FF 0%, #E0EFFF 100%)' : '#F8FAFC',
                  border: isCurrent ? '1px solid #BAE6FF' : '1px solid #E2E8F0'
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[18px]">{milestone.icon}</span>
                  <div>
                    <p
                      className="text-[13px]"
                      style={{
                        fontWeight: 600,
                        color: isAchieved ? '#1F2937' : '#64748B',
                        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, sans-serif'
                      }}
                    >
                      {milestone.sessions} {text.sessionsLabel}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[13px] px-2.5 py-1 rounded-md"
                    style={{
                      fontWeight: 700,
                      background: isAchieved ? 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)' : '#E0EFFF',
                      color: isAchieved ? '#FFFFFF' : '#2E63FF',
                      fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, sans-serif'
                    }}
                  >
                    {milestone.bonus}%
                  </span>
                  {isAchieved && (
                    <span className="text-[16px]">✅</span>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* Achievement Notification (if just unlocked) */}
      {lastAchievedMilestone && size === 'full' && (
        <motion.div
          className="mt-4 px-4 py-3 rounded-xl text-center"
          style={{
            background: 'linear-gradient(135deg, #E7F9ED 0%, #D1FAE5 100%)',
            border: '1px solid #86EFAC'
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.5 }}
        >
          <p
            className="text-[13px]"
            style={{
              fontWeight: 600,
              color: '#10B981',
              fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Text, sans-serif'
            }}
          >
            {lastAchievedMilestone.icon} {text.unlocked.replace('{bonus}', lastAchievedMilestone.bonus.toString())}
          </p>
        </motion.div>
      )}
    </div>
  );
}
