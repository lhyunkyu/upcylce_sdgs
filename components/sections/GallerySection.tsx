'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { galleryItems } from '@/lib/data';

export function GallerySection() {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-right">실행 현장</h2>
        <p className="text-xl text-gray-600 text-right mb-16 max-w-2xl ml-auto">
          전 세계에서 진행되는 지속가능한 소비와 생산 프로젝트들
        </p>

        <div className="flex overflow-hidden rounded-xl" style={{ height: '480px' }}>
          {galleryItems.map((item, index) => {
            const isSelected = selectedGalleryIndex === index;
            const isOther = selectedGalleryIndex !== null && !isSelected;

            return (
              <motion.div
                key={index}
                animate={{
                  width: isSelected ? '100%' : isOther ? '0%' : '33.333%',
                }}
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                className="relative overflow-hidden h-full flex-shrink-0 cursor-pointer"
                style={{ minWidth: 0 }}
                onClick={() => setSelectedGalleryIndex(isSelected ? null : index)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.5s ease' }}
                />

                {!isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5">
                    <h3 className="text-white text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.title}
                    </h3>
                  </div>
                )}

                {isSelected && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedGalleryIndex(null); }}
                      className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-brand text-white rounded-full p-2 transition-colors duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.4 }}
                      className="absolute bottom-0 left-0 right-0 bg-white/88 backdrop-blur-sm px-8 py-6"
                    >
                      <h3 className="text-2xl font-bold text-brand-400">{item.title}</h3>
                      <p className="text-black mt-2 text-base leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
