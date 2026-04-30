'use client';

import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { challenges } from '@/lib/data';

export function ChallengesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalChallenge, setModalChallenge] = useState<{ image: string; title: string; description: string } | null>(null);
  const marqueeRef    = useRef<HTMLDivElement>(null);
  const subtitleRef   = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: subtitleProgress } = useScroll({ target: subtitleRef, offset: ['start 90%', 'end 60%'] });
  const subtitleFill  = useTransform(subtitleProgress, [0, 1], [0, 100]);
  const subtitleGradient = useMotionTemplate`linear-gradient(to right, #D88820 ${subtitleFill}%, #4B5563 ${subtitleFill}%)`;

  const pauseMarquee  = () => { if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'paused'; };
  const resumeMarquee = () => { if (marqueeRef.current) marqueeRef.current.style.animationPlayState = 'running'; };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-left">우리가 풀어야 할 과제</h2>
          <motion.p
            ref={subtitleRef}
            className="text-xl font-medium text-left mb-16 max-w-2xl"
            style={{ backgroundImage: subtitleGradient, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}
          >
            이미지에 마우스를 올리면 자세한 설명을 확인할 수 있습니다
          </motion.p>
        </div>

        <div
          className="overflow-hidden"
          onMouseEnter={pauseMarquee}
          onMouseLeave={resumeMarquee}
        >
          <div
            ref={marqueeRef}
            className="flex gap-6 pb-4 w-max"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            {[...challenges, ...challenges].map((challenge, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setModalChallenge(challenge)}
                className="flex-shrink-0 w-96 h-64 relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
              >
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)' }}
                />
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black via-black/50 to-transparent p-6">
                  <h3 className="text-white text-2xl font-bold">{challenge.title}</h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-gray-100 text-base leading-relaxed">{challenge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalChallenge && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setModalChallenge(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              className="relative z-10 bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img
                  src={modalChallenge.image}
                  alt={modalChallenge.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setModalChallenge(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-brand text-white rounded-full p-2 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8">
                <h3 className="text-3xl font-bold text-brand-400 mb-4">{modalChallenge.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{modalChallenge.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
