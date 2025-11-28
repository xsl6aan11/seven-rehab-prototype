import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface PayoutHistoryProps {
  language: 'EN' | 'AR';
  onBack: () => void;
}

interface Transaction {
  date: string;
  type: string;
  amount: number;
  status: 'credited' | 'pending';
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
}

interface Content {
  title: string;
  subtitle: string;
  totalCredited: string;
  date: string;
  type: string;
  amount: string;
  status: string;
  credited: string;
  pending: string;
  sar: string;
  noTransactions: string;
  // Transaction types
  specialRequest: string;
  generalRequest: string;
  ratingBonus: string;
  sessionBonus: string;
}

const content: Record<'EN' | 'AR', Content> = {
  EN: {
    title: 'Payout History',
    subtitle: 'All your bonus transactions and earnings',
    totalCredited: 'Total Payouts per Week',
    date: 'Date',
    type: 'Type',
    amount: 'Amount',
    status: 'Status',
    credited: 'Credited ✅',
    pending: 'Pending ⏳',
    sar: 'SAR',
    noTransactions: 'No transactions yet',
    specialRequest: 'Special Request Bonus',
    generalRequest: 'General Request Bonus',
    ratingBonus: 'Rating Maintenance Bonus',
    sessionBonus: 'Session Completion Bonus'
  },
  AR: {
    title: 'سجل المدفوعات',
    subtitle: 'جميع معاملات المكافآت والأرباح',
    totalCredited: 'إجمالي المدفوعات أسبوعياً',
    date: 'التاريخ',
    type: 'النوع',
    amount: 'المبلغ',
    status: 'الحالة',
    credited: 'محول ✅',
    pending: 'قيد الانتظار ⏳',
    sar: 'ريال',
    noTransactions: 'لا توجد معاملات بعد',
    specialRequest: 'مكافأة طلب خاص',
    generalRequest: 'مكافأة طلب عام',
    ratingBonus: 'مكافأة الحفاظ على التقييم',
    sessionBonus: 'مكافأة إكمال الجلسات'
  }
};

const transactions: Transaction[] = [
  {
    date: 'Nov 1, 2025',
    type: 'specialRequest',
    amount: 10,
    status: 'credited',
    icon: <CheckCircle size={18} />,
    iconColor: '#10B981',
    iconBg: '#D1FAE5'
  },
  {
    date: 'Oct 30, 2025',
    type: 'generalRequest',
    amount: 10,
    status: 'credited',
    icon: <Clock size={18} />,
    iconColor: '#3B82F6',
    iconBg: '#DBEAFE'
  },
  {
    date: 'Oct 28, 2025',
    type: 'ratingBonus',
    amount: 15,
    status: 'credited',
    icon: <TrendingUp size={18} />,
    iconColor: '#F59E0B',
    iconBg: '#FEF3C7'
  },
  {
    date: 'Oct 25, 2025',
    type: 'sessionBonus',
    amount: 10,
    status: 'credited',
    icon: <CheckCircle size={18} />,
    iconColor: '#8B5CF6',
    iconBg: '#EDE9FE'
  },
  {
    date: 'Oct 22, 2025',
    type: 'specialRequest',
    amount: 10,
    status: 'credited',
    icon: <CheckCircle size={18} />,
    iconColor: '#10B981',
    iconBg: '#D1FAE5'
  },
  {
    date: 'Oct 20, 2025',
    type: 'generalRequest',
    amount: 10,
    status: 'credited',
    icon: <Clock size={18} />,
    iconColor: '#3B82F6',
    iconBg: '#DBEAFE'
  },
  {
    date: 'Oct 18, 2025',
    type: 'sessionBonus',
    amount: 10,
    status: 'credited',
    icon: <CheckCircle size={18} />,
    iconColor: '#8B5CF6',
    iconBg: '#EDE9FE'
  },
  {
    date: 'Oct 15, 2025',
    type: 'ratingBonus',
    amount: 15,
    status: 'credited',
    icon: <TrendingUp size={18} />,
    iconColor: '#F59E0B',
    iconBg: '#FEF3C7'
  }
];

const totalCredited = 320;

export default function PayoutHistory({ language, onBack }: PayoutHistoryProps) {
  const isArabic = language === 'AR';
  const historyContent = content[language];

  const getTransactionTypeName = (type: string): string => {
    switch (type) {
      case 'specialRequest':
        return historyContent.specialRequest;
      case 'generalRequest':
        return historyContent.generalRequest;
      case 'ratingBonus':
        return historyContent.ratingBonus;
      case 'sessionBonus':
        return historyContent.sessionBonus;
      default:
        return type;
    }
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
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-105"
              style={{ color: '#2E63FF' }}
            >
              <ArrowLeft size={20} style={{ transform: isArabic ? 'rotate(180deg)' : 'none' }} />
            </button>

            <div className="flex-1">
              <h1
                className="text-[20px]"
                style={{
                  fontWeight: 700,
                  color: '#2E63FF'
                }}
              >
                {historyContent.title}
              </h1>
              <p
                className="text-[12px]"
                style={{
                  color: '#64748B'
                }}
              >
                {historyContent.subtitle}
              </p>
            </div>
          </div>

          <div
            className="h-px"
            style={{
              background: 'linear-gradient(to right, transparent, #CBD5E1, transparent)'
            }}
          />
        </motion.div>

        {/* Total Summary Card */}
        <motion.div
          className="rounded-2xl p-5 mb-6"
          style={{
            background: 'linear-gradient(135deg, #5596FF 0%, #2E63FF 100%)',
            boxShadow: '0 8px 24px rgba(46, 99, 255, 0.3)'
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div
            className="text-[13px] mb-2"
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500
            }}
          >
            {historyContent.totalCredited}
          </div>
          <div
            className="text-[32px]"
            style={{
              fontWeight: 700,
              color: '#FFFFFF'
            }}
          >
            {historyContent.sar} {totalCredited.toLocaleString()}
          </div>
        </motion.div>

        {/* Transactions List */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {transactions.map((transaction, index) => (
            <motion.div
              key={index}
              className="rounded-xl p-4 flex items-center gap-3"
              style={{
                background: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            >
              {/* Icon */}
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: '40px',
                  height: '40px',
                  background: transaction.iconBg,
                  color: transaction.iconColor
                }}
              >
                {transaction.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4
                  className="text-[13px] mb-0.5 truncate"
                  style={{
                    fontWeight: 600,
                    color: '#1F2937'
                  }}
                >
                  {getTransactionTypeName(transaction.type)}
                </h4>
                <p
                  className="text-[11px]"
                  style={{
                    color: '#64748B'
                  }}
                >
                  {transaction.date}
                </p>
              </div>

              {/* Amount & Status */}
              <div className="text-right">
                <div
                  className="text-[15px] mb-0.5"
                  style={{
                    fontWeight: 700,
                    color: '#10B981'
                  }}
                >
                  +{transaction.amount} {historyContent.sar}
                </div>
                <div
                  className="text-[10px]"
                  style={{
                    color: transaction.status === 'credited' ? '#10B981' : '#F59E0B',
                    fontWeight: 600
                  }}
                >
                  {transaction.status === 'credited' ? historyContent.credited : historyContent.pending}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Spacer */}
        <div className="h-6" />
      </div>
    </div>
  );
}
