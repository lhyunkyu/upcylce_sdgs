const TEXT = '책임감 있는 소비와 생산';
// 공백 제외 글자 수 기준으로 딜레이 계산
const CHAR_DELAY = 0.18; // 글자 간격 (초)
const DURATION   = 2.8;  // 한 사이클 (초) — 느릴수록 물처럼 흐름

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand">
      <div className="absolute inset-0 opacity-0" />

      <div className="relative z-10 text-center max-w-4xl px-6">
        <div className="mb-6 inline-block bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full">
          <span className="text-black text-lg font-semibold">지속가능한 발전목표</span>
        </div>
        <h1 className="text-7xl md:text-8xl font-bold text-black mb-6 leading-tight">
          목표 12
        </h1>

        <p
          className="text-3xl md:text-4xl text-white mb-8 leading-tight"
          style={{ fontFamily: "'Pretendard Variable', Pretendard, sans-serif" }}
        >
          {TEXT.split('').map((ch, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                whiteSpace: 'pre',
                animation: ch === ' ' ? undefined : `wave-weight ${DURATION}s ease-in-out infinite`,
                animationDelay: `${-DURATION + i * CHAR_DELAY}s`,
                fontVariationSettings: "'wght' 100",
              }}
            >
              {ch}
            </span>
          ))}
        </p>

        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          지속가능한 패턴으로 전환하여 자원 활용을 효율화하고 폐기물을 최소화하는 것
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
