'use client';

import { useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

type PracticeRowProps = {
  title: string;
  items: string[];
  icon: React.ReactNode;
  checkColor: string;
};

export function PracticeRow({ title, items, icon, checkColor }: PracticeRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const titleColor   = useTransform(scrollYProgress, [0, 0.35, 0.6, 1], ['rgba(0,0,0,0)', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)', 'rgba(0,0,0,0)']);
  const titleX       = useTransform(scrollYProgress, [0, 0.35, 0.45, 1],   ['-20vw', '0vw', '0vw', '-20vw']);
  const itemsOpacity = useTransform(scrollYProgress, [0, 0.35, 0.6, 1], [0, 1, 1, 0]);
  const itemsX       = useTransform(scrollYProgress, [0, 0.35, 0.45, 1],   ['-12vw', '0vw', '0vw', '-12vw']);

  const fillPct      = useTransform(scrollYProgress, [0.3, 0.58], [0, 100]);
  const textGradient = useMotionTemplate`linear-gradient(to right, #D88820 ${fillPct}%, #4B5563 ${fillPct}%)`;

  return (
    <div ref={ref} className="border-t border-gray-200">
      <div className="px-8 md:px-20 py-14">
        <div className="flex items-center justify-between mb-8">
          <motion.h3
            className="text-7xl md:text-8xl font-bold font-sans"
            style={{ color: titleColor, WebkitTextStroke: '2px black', x: titleX }}
          >
            {title}
          </motion.h3>
          <motion.div style={{ opacity: itemsOpacity, x: titleX }} className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 ml-6">
            {icon}
          </motion.div>
        </div>
        <motion.ul className="space-y-3 max-w-3xl" style={{ opacity: itemsOpacity, x: itemsX }}>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-xl">
              <CheckCircle className={`w-5 h-5 flex-shrink-0 ${checkColor}`} />
              <motion.span
                style={{
                  backgroundImage: textGradient,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {item}
              </motion.span>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
