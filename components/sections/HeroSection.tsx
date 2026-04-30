export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand">
      <div className="absolute inset-0 opacity-0" />

      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-7xl md:text-8xl font-bold text-black mb-6 leading-tight">
          목표 12
        </h1>
        <p className="text-3xl md:text-4xl font-light mb-8">
          <span className="text-white">책임감 있는 </span>
          <span className="text-black font-black">소비와 생산</span>
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
