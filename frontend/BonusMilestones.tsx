import { motion } from 'motion/react';
import { ArrowLeft, Wallet, Zap, Clock, Star, Award, TrendingUp } from 'lucide-react';
import BonusProgressBar from './BonusProgressBar';
import BonusDetailModal from './BonusDetailModal';
import { useState } from 'react';

interface BonusMilestonesProps {
  language: 'EN' | 'AR';
  onLanguageToggle: () => void;
  onBack: () => void;
  onPayoutHistory: () => void;
}

interface Content {
  title: string;
  subtitle: string;
  thisMonthEarnings: string;
  bonusesThisMonth: string;
  vsLastMonth: string;
  milestoneProgressTitle: string;
  milestoneProgressSubtitle: string;
  sessions: string;
  bonusLabel: string;
  youAreAt: string;
  achievementsTitle: string;
  instantLabel: string;
  autoWeeklyLabel: string;
  achievedLabel: string;
  inProgressLabel: string;
  lifetimeSummaryTitle: string;
  totalBonusesEarned: string;
  lifetimeSessions: string;
  averageRating: string;
  footerNote: string;
  sar: string;
  achievement1Title: string;
  achievement2Title: string;
  achievement3Title: string;
  achievement4Title: string;
}

const content: Record<'EN' | 'AR', Content> = {
  EN: {
    title: 'Bonus Milestones & Earnings',
    subtitle: 'Track your earned rewards and completed milestones.',
    thisMonthEarnings: "This Month's Earnings",
    bonusesThisMonth: '+320 SAR bonuses this month',
    vsLastMonth: '+12% vs. last month',
    milestoneProgressTitle: 'Milestone Progress',
    milestoneProgressSubtitle: 'Track how close you are to your next bonus tier.',
    sessions: 'Sessions',
    bonusLabel: 'Bonus %',
    youAreAt: "You're at {count} sessions → {bonus}% Bonus",
    achievementsTitle: 'Active Bonus Achievements',
    instantLabel: 'Instant',
    autoWeeklyLabel: 'Auto-weekly',
    achievedLabel: 'Achieved ✅',
    inProgressLabel: 'In Progress ⏳',
    lifetimeSummaryTitle: 'Lifetime Summary',
    totalBonusesEarned: 'Total Bonuses Earned',
    lifetimeSessions: 'Lifetime Sessions',
    averageRating: 'Average Rating',
    footerNote: 'Bonuses are recalculated every Sunday at 11:59 PM.',
    sar: 'SAR',
    achievement1Title: 'Accept Special Request within 1 hr',
    achievement2Title: 'Accept General Request within 1 hr',
    achievement3Title: 'Maintain 4.5+ rating (monthly avg)',
    achievement4Title: 'Complete 4+ sessions in a day'
  },
  AR: {
    title: 'معالم المكافآت والأرباح',
    subtitle: 'تتبع المكافآت المكتسبة والمعالم المكتملة.',
    thisMonthEarnings: 'أرباح هذا الشهر',
    bonusesThisMonth: '+320 ريال مكافآت هذا الشهر',
    vsLastMonth: '+12% مقارنة بالشهر الماضي',
    milestoneProgressTitle: 'تقدم المعالم',
    milestoneProgressSubtitle: 'تتبع مدى قربك من المستوى التالي للمكافأة.',
    sessions: 'الجلسات',
    bonusLabel: 'المكافأة %',
    youAreAt: 'أنت عند {count} جلسة → {bonus}% مكافأة',
    achievementsTitle: 'الإنجازات النشطة للمكافآت',
    instantLabel: 'فوري',
    autoWeeklyLabel: 'أسبوعي تلقائي',
    achievedLabel: 'تم الإنجاز ✅',
    inProgressLabel: 'قيد التقدم ⏳',
    lifetimeSummaryTitle: 'ملخص مدى الحياة',
    totalBonusesEarned: 'إجمالي المكافآت المكتسبة',
    lifetimeSessions: 'جلسات مدى الحياة',
    averageRating: 'متوسط التقييم',
    footerNote: 'يتم إعادة حساب المكافآت كل يوم أحد في الساعة 11:59 مساءً.',
    sar: 'ريال',
    achievement1Title: 'قبول طلب خاص خلال ساعة واحدة',
    achievement2Title: 'قبول طلب عام خلال ساعة واحدة',
    achievement3Title: 'الحفاظ على تقييم 4.5+ (متوسط شهري)',
    achievement4Title: 'إكمال 4+ جلسات في يوم واحد'
  }
};

const currentSessions = 25;
const currentBonus = 10;

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

export default function BonusMilestones({
  language,
  onLanguageToggle,
  onBack,
  onPayoutHistory
}: BonusMilestonesProps) {
  const isArabic = language === 'AR';
  const bonusContent = content[language];
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const achievements: Achievement[] = [
    {
      icon: <Zap size={20} />,
      title: bonusContent.achievement1Title,
      bonusPercent: 10,
      reward: 10,
      type: 'instant',
      status: 'achieved',
      iconColor: '#10B981',
      iconBg: '#D1FAE5',
      description: language === 'EN' 
        ? 'Accept a special request from a patient within 1 hour of it being posted to receive an instant 10% bonus on that session.'
        : 'قبول طلب خاص من مريض خلال ساعة واحدة من نشره للحصول على مكافأة فورية 10% على تلك الجلسة.',
      currentProgress: language === 'EN' ? '3 special requests accepted this week' : '3 طلبات خاصة مقبولة هذا الأسبوع',
      nextEvaluation: language === 'EN' ? 'Ongoing' : 'مستمر'
    },
    {
      icon: <Clock size={20} />,
      title: bonusContent.achievement2Title,
      bonusPercent: 10,
      reward: 10,
      type: 'instant',
      status: 'in-progress',
      iconColor: '#3B82F6',
      iconBg: '#DBEAFE',
      description: language === 'EN'
        ? 'Accept a general request within 1 hour of it being posted to receive an instant 10% bonus on that session.'
        : 'قبول طلب عام خلال ساعة واحدة من نشره للحصول على مكافأة فورية 10% على تلك الجلسة.',
      currentProgress: language === 'EN' ? '2 general requests accepted this week' : '2 طلبات عامة مقبولة هذا الأسبوع',
      nextEvaluation: language === 'EN' ? 'Ongoing' : 'مستمر'
    },
    {
      icon: <Star size={20} />,
      title: bonusContent.achievement3Title,
      bonusPercent: 15,
      reward: 15,
      type: 'auto-weekly',
      status: 'achieved',
      iconColor: '#F59E0B',
      iconBg: '#FEF3C7',
      description: language === 'EN'
        ? 'Maintain a monthly average rating of 4.5 stars or higher to receive an automatic 15% bonus on all sessions that week.'
        : 'حافظ على متوسط تقييم شهري 4.5 نجوم أو أعلى للحصول على مكافأة تلقائية 15% على جميع الجلسات في ذلك الأسبوع.',
      currentProgress: language === 'EN' ? 'Current rating: 4.7 ⭐' : 'التقييم الحالي: 4.7 ⭐',
      nextEvaluation: language === 'EN' ? 'Sunday, Nov 3 at 11:59 PM' : 'الأحد، 3 نوفمبر الساعة 11:59 مساءً'
    },
    {
      icon: <Award size={20} />,
      title: bonusContent.achievement4Title,
      bonusPercent: 10,
      reward: 10,
      type: 'instant',
      status: 'in-progress',
      iconColor: '#8B5CF6',
      iconBg: '#EDE9FE',
      description: language === 'EN'
        ? 'Complete 4 or more sessions in a single day to receive an instant 10% bonus on all sessions that day.'
        : 'أكمل 4 جلسات أو أكثر في يوم واحد للحصول على مكافأة فورية 10% على جميع الجلسات في ذلك اليوم.',
      currentProgress: language === 'EN' ? '2 sessions completed today' : '2 جلسات مكتملة اليوم',
      nextEvaluation: language === 'EN' ? 'Ongoing' : 'مستمر'
    }
  ];

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAchievement(null), 300);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: 'linear-gradient(to bottom, #EAF3FF 0%, #CDE1FF 100%)',
        fontFamily: isArabic ? 'Tajawal, sans-serif' : 'SF Pro Display, -apple-system, sans-serif',
        direction: isArabic ? 'rtl' : 'ltr'
      }}
    >
      <div className="w-full max-w-[390px]">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-105"
              style={{ color: '#2E63FF' }}
            >
              <ArrowLeft size={20} style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }} />
            </button>

            <h1
              className="text-[20px] flex-1 text-center"
              style={{
                fontWeight: 700,
                color: '#2E63FF'
              }}
            >
              {bonusContent.title}
            </h1>

            <button
              onClick={onPayoutHistory}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-105"
              style={{ color: '#F59E0B' }}
            >
              <Wallet size={20} />
            </button>
          </div>

          <p
            className="text-center text-[13px] mb-3"
            style={{
              color: '#64748B'
            }}
          >
            {bonusContent.subtitle}
          </p>

          <div
            className="h-px"
            style={{
              background: 'linear-gradient(to right, transparent, #CBD5E1, transparent)'
            }}
          />
        </div>

        {/* Earnings Summary Card */}
        <motion.div
          className="rounded-2xl p-6 mb-6 relative overflow-hidden"
          style={{
            background: '#FFFFFF',
            boxShadow: '0 3px 12px rgba(0, 0, 0, 0.05)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Coin icon stack */}
          <div
            className="absolute opacity-10"
            style={{
              top: '10px',
              right: isArabic ? 'auto' : '10px',
              left: isArabic ? '10px' : 'auto',
              fontSize: '48px'
            }}
          >
            💰
          </div>

          <div className="relative z-10">
            <div
              className="text-[14px] mb-2"
              style={{
                color: '#64748B',
                fontWeight: 500
              }}
            >
              {bonusContent.thisMonthEarnings}
            </div>

            <div
              className="text-[28px] mb-2"
              style={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {bonusContent.sar} 1,540
            </div>

            <div
              className="text-[13px] mb-3"
              style={{
                color: '#64748B'
              }}
            >
              {bonusContent.bonusesThisMonth}
            </div>

            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: '#E7F9ED',
                color: '#38A169'
              }}
            >
              <TrendingUp size={14} />
              <span
                className="text-[12px]"
                style={{
                  fontWeight: 600
                }}
              >
                {bonusContent.vsLastMonth}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bonus Progress Graph */}
        <motion.div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: '#FFFFFF',
            boxShadow: '0 3px 12px rgba(0, 0, 0, 0.05)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3
            className="text-[16px] mb-1"
            style={{
              fontWeight: 700,
              color: '#1F2937'
            }}
          >
            {bonusContent.milestoneProgressTitle}
          </h3>

          <p
            className="text-[12px] mb-6"
            style={{
              color: '#64748B'
            }}
          >
            {bonusContent.milestoneProgressSubtitle}
          </p>

          <BonusProgressBar
            currentSessions={currentSessions}
            currentBonus={currentBonus}
            language={language}
            size="full"
            showMilestones={true}
            showLabel={true}
          />
        </motion.div>

        {/* Achievements List */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3
            className="text-[16px] mb-4"
            style={{
              fontWeight: 700,
              color: '#1F2937'
            }}
          >
            {bonusContent.achievementsTitle}
          </h3>

          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.button
                key={index}
                onClick={() => handleAchievementClick(achievement)}
                className="w-full rounded-xl p-4 flex items-center gap-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer'
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: achievement.iconBg,
                    color: achievement.iconColor
                  }}
                >
                  {achievement.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-[13px] mb-1 truncate"
                    style={{
                      fontWeight: 600,
                      color: '#1F2937'
                    }}
                  >
                    {achievement.title}
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[11px] px-2 py-0.5 rounded"
                      style={{
                        background: '#E0EFFF',
                        color: '#2E63FF',
                        fontWeight: 600
                      }}
                    >
                      {achievement.bonusPercent}%
                    </span>
                    <span
                      className="text-[11px]"
                      style={{
                        color: '#64748B'
                      }}
                    >
                      +{achievement.reward} {bonusContent.sar}
                    </span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded"
                      style={{
                        background: achievement.type === 'instant' ? '#FEF3C7' : '#DBEAFE',
                        color: achievement.type === 'instant' ? '#D97706' : '#1D4ED8',
                        fontWeight: 600
                      }}
                    >
                      {achievement.type === 'instant' ? bonusContent.instantLabel : bonusContent.autoWeeklyLabel}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div
                  className="text-[11px] whitespace-nowrap"
                  style={{
                    color: achievement.status === 'achieved' ? '#10B981' : '#64748B',
                    fontWeight: 600
                  }}
                >
                  {achievement.status === 'achieved' ? bonusContent.achievedLabel : bonusContent.inProgressLabel}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Lifetime Summary Footer */}
        <motion.div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: '#FFFFFF',
            boxShadow: '0 3px 12px rgba(0, 0, 0, 0.05)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3
            className="text-[16px] mb-4"
            style={{
              fontWeight: 700,
              color: '#1F2937'
            }}
          >
            {bonusContent.lifetimeSummaryTitle}
          </h3>

          <div className="space-y-3">
            {/* Total Bonuses */}
            <div className="flex items-center justify-between">
              <span
                className="text-[13px]"
                style={{
                  color: '#64748B'
                }}
              >
                {bonusContent.totalBonusesEarned}
              </span>
              <span
                className="text-[15px]"
                style={{
                  fontWeight: 700,
                  color: '#1F2937'
                }}
              >
                {bonusContent.sar} 4,980
              </span>
            </div>

            <div
              className="h-px"
              style={{
                background: '#E0EFFF'
              }}
            />

            {/* Lifetime Sessions */}
            <div className="flex items-center justify-between">
              <span
                className="text-[13px]"
                style={{
                  color: '#64748B'
                }}
              >
                {bonusContent.lifetimeSessions}
              </span>
              <span
                className="text-[15px]"
                style={{
                  fontWeight: 700,
                  color: '#1F2937'
                }}
              >
                215
              </span>
            </div>

            <div
              className="h-px"
              style={{
                background: '#E0EFFF'
              }}
            />

            {/* Average Rating */}
            <div className="flex items-center justify-between">
              <span
                className="text-[13px]"
                style={{
                  color: '#64748B'
                }}
              >
                {bonusContent.averageRating}
              </span>
              <span
                className="text-[15px]"
                style={{
                  fontWeight: 700,
                  color: '#F59E0B'
                }}
              >
                4.7 ⭐
              </span>
            </div>
          </div>

          <p
            className="text-center text-[11px] mt-4"
            style={{
              color: '#94A3B8'
            }}
          >
            {bonusContent.footerNote}
          </p>
        </motion.div>

        {/* Bonus Detail Modal */}
        <BonusDetailModal
          achievement={selectedAchievement}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          language={language}
        />
      </div>
    </div>
  );
}
