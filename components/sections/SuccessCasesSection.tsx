'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { successCases } from '@/lib/data';

export function SuccessCasesSection() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-left">해외의 성공 사례</h2>
        <p className="text-xl text-gray-600 text-left mb-12 max-w-2xl">
          전 세계 각국의 지속가능한 소비와 생산 혁신 사례
        </p>

        <div className="relative h-[500px] md:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative h-full">
            {successCases.map((caseItem, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentCaseIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={caseItem.image}
                  alt={caseItem.country}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                <div className="absolute top-8 left-8 md:top-12 md:left-12 z-10 max-w-lg">
                  <p className="text-6xl mb-4">{caseItem.countryCode}</p>
                  <h3 className="text-white text-4xl font-bold mb-2">{caseItem.country}</h3>
                  <h4 className="text-brand text-2xl font-semibold mb-6">{caseItem.title}</h4>
                  <p className="text-gray-100 text-lg leading-relaxed">{caseItem.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentCaseIndex((prev) => (prev - 1 + successCases.length) % successCases.length)}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={() => setCurrentCaseIndex((prev) => (prev + 1) % successCases.length)}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {successCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCaseIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentCaseIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
