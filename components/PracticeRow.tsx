'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, animate, MotionValue } from 'framer-motion';

function PracticeItem({
  item,
  index,
  scrollYProgress,
}: {
  item: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = 0.28 + index * 0.06;
  const end   = start + 0.1;
  const fillPct      = useTransform(scrollYProgress, [start, end], [0, 100]);
  const textGradient = useMotionTemplate`linear-gradient(to right, #D88820 ${fillPct}%, #4B5563 ${fillPct}%)`;

  return (
    <li className="text-2xl font-semibold">
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
  );
}

type PracticeRowProps = {
  title: string;
  items: string[];
  icon?: React.ReactNode;
  checkColor: string;
};

export function PracticeRow({ title, items, icon }: PracticeRowProps) {
  const ref      = useRef<HTMLDivElement>(null);
  // 'below' | 'visible' | 'above'
  const stateRef = useRef<'below' | 'visible' | 'above'>('below');

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // 아래에서 올라올 때 entry (스크롤 기반)
  const titleXScroll     = useTransform(scrollYProgress, [0, 0.4, 1], ['-20vw', '0vw', '0vw']);
  const itemsXScroll     = useTransform(scrollYProgress, [0, 0.4, 1], ['-12vw', '0vw', '0vw']);
  const titleColorScroll = useTransform(scrollYProgress, [0, 0.35, 1], ['rgba(0,0,0,0)', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)']);
  const opacityScroll    = useTransform(scrollYProgress, [0, 0.35, 1], [0, 1, 1]);

  const titleXMV  = useMotionValue('-20vw');
  const itemsXMV  = useMotionValue('-12vw');
  const colorMV   = useMotionValue('rgba(0,0,0,0)');
  const opacityMV = useMotionValue(0);

  // scrollDriven: true면 스크롤 transform이 motion value를 구동
  const scrollDrivenRef = useRef(true);

  useEffect(() => {
    const unsubTitleX  = titleXScroll.on('change',     v => { if (scrollDrivenRef.current) titleXMV.set(v); });
    const unsubItemsX  = itemsXScroll.on('change',     v => { if (scrollDrivenRef.current) itemsXMV.set(v); });
    const unsubColor   = titleColorScroll.on('change', v => { if (scrollDrivenRef.current) colorMV.set(v); });
    const unsubOpacity = opacityScroll.on('change',    v => { if (scrollDrivenRef.current) opacityMV.set(v); });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (stateRef.current === 'above') {
          // 위에서 다시 내려옴 → 오른쪽에서 슬라이드인
          stateRef.current = 'visible';
          scrollDrivenRef.current = false;
          titleXMV.set('-20vw');
          itemsXMV.set('-12vw');
          animate(titleXMV,  '0vw', { duration: 0.7, ease: [0, 0, 0.2, 1] });
          animate(itemsXMV,  '0vw', { duration: 0.7, ease: [0, 0, 0.2, 1] });
          animate(colorMV,   'rgba(0,0,0,1)', { duration: 0.4 });
          animate(opacityMV, 1, { duration: 0.4 });
        } else {
          // 아래에서 올라옴 → 스크롤 기반 왼쪽 entry
          stateRef.current = 'visible';
          scrollDrivenRef.current = true;
        }
      } else {
        if (entry.boundingClientRect.top < 0) {
          // 위로 완전히 사라짐 → 왼쪽으로 exit
          stateRef.current = 'above';
          scrollDrivenRef.current = false;
          animate(titleXMV,  '-20vw', { duration: 0.9, ease: [0.4, 0, 1, 1] });
          animate(itemsXMV,  '-12vw', { duration: 0.9, ease: [0.4, 0, 1, 1] });
          animate(colorMV,   'rgba(0,0,0,0)', { duration: 0.5 });
          animate(opacityMV, 0, { duration: 0.5 });
        } else {
          // 아래로 다시 사라짐 → 다음 bottom-entry를 위해 초기화
          stateRef.current = 'below';
          scrollDrivenRef.current = true;
          titleXMV.set('-20vw');
          itemsXMV.set('-12vw');
          colorMV.set('rgba(0,0,0,0)');
          opacityMV.set(0);
        }
      }
    }, { threshold: 0 });

    if (ref.current) observer.observe(ref.current);

    return () => {
      unsubTitleX(); unsubItemsX(); unsubColor(); unsubOpacity();
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="border-t border-gray-200">
      <div className="px-8 md:px-20 py-14">
        <div className="flex items-center justify-between mb-8">
          <motion.h3
            className="text-7xl md:text-8xl font-bold font-sans"
            style={{ color: colorMV, WebkitTextStroke: '2px black', x: titleXMV }}
          >
            {title}
          </motion.h3>
          <motion.div
            style={{ opacity: opacityMV, x: titleXMV }}
            className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 ml-6"
          >
            {icon}
          </motion.div>
        </div>
        <motion.ul className="space-y-3 max-w-3xl" style={{ opacity: opacityMV, x: itemsXMV }}>
          {items.map((item, i) => (
            <PracticeItem
              key={i}
              item={item}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
