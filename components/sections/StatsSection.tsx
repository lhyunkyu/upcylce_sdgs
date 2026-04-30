import { TrendingDown, Droplet, Leaf, Target } from 'lucide-react';
import { StatCard } from '@/components/StatCard';

const stats = [
  { value: 17,  suffix: '억 톤',   label: '연간 고형폐기물 발생량',            icon: <TrendingDown className="w-6 h-6" />, severity: 72 },
  { value: 60,  suffix: '%',       label: '전체 쓰레기 중 음식물 폐기물 비율', icon: <Droplet className="w-6 h-6" />,     severity: 60 },
  { value: 90,  suffix: '%',       label: '생물 다양성 감소의 주요 원인',       icon: <Leaf className="w-6 h-6" />,       severity: 90 },
  { value: 2,   suffix: '조 달러', label: '연간 폐기물 처리 비용',             icon: <Target className="w-6 h-6" />,     severity: 80 },
];

export function StatsSection() {
  return (
    <section className="py-20 px-6 bg-brand-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-left">글로벌 현황</h2>
        <div className="flex flex-col gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
