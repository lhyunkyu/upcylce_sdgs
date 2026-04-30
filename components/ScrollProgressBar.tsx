'use client';

import { useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX   = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const barColor = useMotionValue('#FFFFFF');

  useEffect(() => {
    const unsub = scrollY.on('change', (y) => {
      // 500px 스크롤 시 흰색 → brand-400 전환
      const t = Math.max(0, Math.min(1, y / 2000));
      // white(255,255,255) → brand-400(216,136,32)
      const r = Math.round(255 + (216 - 255) * t);
      const g = Math.round(255 + (136 - 255) * t);
      const b = Math.round(255 + ( 32 - 255) * t);
      barColor.set(`rgb(${r},${g},${b})`);
    });
    return unsub;
  }, [scrollY, barColor]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-50"
      style={{ scaleX, backgroundColor: barColor }}
    />
  );
}
