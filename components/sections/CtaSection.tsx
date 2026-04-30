'use client';

import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function CtaSection() {
  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end end'],
  });

  const ctaBg         = useTransform(ctaProgress, [0, 0.65, 1], ['#FFFFFF', '#FFFFFF', '#D88820']);
  const ctaTitleColor = useTransform(ctaProgress, [0, 0.65, 1], ['#FFFFFF', '#FFFFFF', '#000000']);
  const ctaTextColor  = useTransform(ctaProgress, [0, 0.65, 1], ['#000000', '#000000', '#FFFFFF']);
  const ctaBtnBg      = useTransform(ctaProgress, [0, 0.65, 1], ['#D88820', '#D88820', '#FFFFFF']);
  const ctaBtnColor   = useTransform(ctaProgress, [0, 0.65, 1], ['#FFFFFF', '#FFFFFF', '#D88820']);

  return (
    <motion.section
      ref={ctaRef}
      className="py-40 px-6"
      style={{ backgroundColor: ctaBg }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ color: ctaTitleColor }}
        >
          함께 만들어요
        </motion.h2>
        <motion.p
          className="text-xl mb-8 leading-relaxed"
          style={{ color: ctaTextColor }}
        >
          책임감 있는 소비와 생산은 단순한 환경 문제가 아닙니다.
          <br />
          이는 우리의 미래 세대를 위한 투자이며, 모든 사람의 삶의 질 향상으로 이어지는 길입니다.
        </motion.p>
        <motion.p
          className="text-lg mb-8"
          style={{ color: ctaTextColor, opacity: 0.9 }}
        >
          오늘 당신의 선택이 내일의 지구를 결정합니다.
        </motion.p>
        <motion.button
          className="font-bold py-4 px-10 rounded-lg text-lg inline-flex items-center justify-center gap-2"
          style={{ backgroundColor: ctaBtnBg, color: ctaBtnColor }}
        >
          더 알아보기
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.section>
  );
}
