'use client';

import { useState } from 'react';
import { Globe, Users, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PracticeRow } from '@/components/PracticeRow';

export function PracticesSection() {
  const [showPractices, setShowPractices] = useState(false);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-right">우리가 할 수 있는 일</h2>
        <p className="text-xl text-gray-600 text-right mb-10 max-w-2xl ml-auto">
          개인, 기업, 정부가 함께 만드는 지속가능한 미래
        </p>

        {!showPractices && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowPractices(true)}
              className="bg-brand text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-brand-400 transition-colors"
            >
              알아보기
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showPractices && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            <PracticeRow
              title="개인의 실천"
              items={['일회용 제품 대신 재사용 제품 선택', '음식물 쓰레기 최소화하기', '환경 친화적 제품 구매 우선', '에너지 절감 생활습관 실천', '재활용 분류 철저히 하기']}
              icon={<div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center"><Users className="w-10 h-10 text-green-600" /></div>}
              checkColor="text-green-500"
            />
            <PracticeRow
              title="기업의 책임"
              items={['순환 경제 모델 도입', '포장재 최소화 및 친환경 소재 사용', '공급망 투명성 확보', '사원 교육 및 인식 개선', '저탄소 생산 공정 전환']}
              icon={<div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center"><Globe className="w-10 h-10 text-blue-600" /></div>}
              checkColor="text-blue-500"
            />
            <PracticeRow
              title="정부의 정책"
              items={['순환 경제 법제 정비', '플라스틱 규제 강화', '재활용 인프라 투자', '친환경 기업 세제 혜택', '국제 협력 강화']}
              icon={<div className="w-full h-full rounded-full bg-brand-light flex items-center justify-center"><Target className="w-10 h-10 text-brand" /></div>}
              checkColor="text-brand"
            />
            <div className="border-t border-gray-200" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
