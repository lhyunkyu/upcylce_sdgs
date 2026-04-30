'use client';

import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/use-count-up';

type StatCardProps = {
  stat: {
    value: number;
    suffix: string;
    label: string;
    icon: React.ReactNode;
    severity: number;
  };
  index: number;
};

export function StatCard({ stat, index }: StatCardProps) {
  const { count, ref } = useCountUp(stat.value, 1200 + index * 100);

  return (
    <div className="bg-white rounded-2xl px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-brand">{stat.icon}</div>
          <span className="text-gray-700 text-lg">{stat.label}</span>
        </div>
        <span ref={ref} className="text-3xl font-bold text-gray-900 ml-4 shrink-0">
          {count}{stat.suffix}
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: 'var(--brand)' }}
          initial={{ width: 0 }}
          whileInView={{ width: `${stat.severity}%` }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: index * 0.08 }}
        />
      </div>
      <p className="text-right text-sm text-brand mt-1 font-semibold">심각도 {stat.severity}%</p>
    </div>
  );
}
