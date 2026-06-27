'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import { Check } from 'lucide-react';

const VIDEO_URL = '/review-video.mp4';

const platforms = [
  {
    name: 'Instagram',
    format: 'STORY',
    desc: 'Text reviews become a branded Story. Photo reviews turn into a video Story automatically.',
    duration: '24h',
    headerGradient: 'linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)',
    accentColor: '#E1306C',
    appBg: '#000',
  },
  {
    name: 'Facebook',
    format: 'POST',
    desc: 'Stays on timeline permanently — not 24hr like Stories. Maximum visibility for social proof.',
    duration: 'PERMANENT',
    headerGradient: 'linear-gradient(135deg, #1877F2 0%, #0C5DC7 100%)',
    accentColor: '#1877F2',
    appBg: '#18191A',
  },
  {
    name: 'LinkedIn',
    format: 'POST',
    desc: 'Reaches B2B audience & builds professional credibility. Perfect for service-based businesses.',
    duration: 'PERMANENT',
    headerGradient: 'linear-gradient(135deg, #0A66C2 0%, #004182 100%)',
    accentColor: '#0A66C2',
    appBg: '#000000',
  },
];

/* ------------------------------------------------------------------ */
/*  iPhone 15 Pro Max Shell (same as WhatsApp one)                    */
/* ------------------------------------------------------------------ */
function IPhone15Pro({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-[155px] sm:w-[190px] md:w-[210px] lg:w-[230px] h-[325px] sm:h-[370px] md:h-[410px] lg:h-[450px] rounded-[30px] sm:rounded-[35px] md:rounded-[39px] lg:rounded-[43px] p-[2px] sm:p-[3px] md:p-[4px] origin-center shrink-0"
      style={{
        background:
          'linear-gradient(145deg, #8A8A8E 0%, #6E6E73 15%, #48484A 50%, #6E6E73 85%, #8A8A8E 100%)',
        boxShadow:
          '0 50px 100px -20px rgba(0,0,0,0.7), 0 30px 60px -30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.3)',
      }}
    >
      {/* Shine / reflection */}
      <div
        className="absolute inset-0 rounded-[30px] sm:rounded-[35px] md:rounded-[39px] lg:rounded-[43px] pointer-events-none z-30"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.04) 100%)',
        }}
      />
      {/* Inner bezel */}
      <div
        className="relative w-full h-full rounded-[27px] sm:rounded-[31px] md:rounded-[35px] lg:rounded-[39px] overflow-hidden z-10 flex flex-col"
        style={{ background: '#000' }}
      >
        {children}
      </div>
      {/* Left side buttons */}
      <div
        className="absolute left-[-2px] top-[105px] w-[2.5px] h-[26px] rounded-l-sm z-20"
        style={{
          background: 'linear-gradient(180deg, #8A8A8E 0%, #48484A 100%)',
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.3)',
        }}
      />
      <div
        className="absolute left-[-2px] top-[143px] w-[2.5px] h-[26px] rounded-l-sm z-20"
        style={{
          background: 'linear-gradient(180deg, #8A8A8E 0%, #48484A 100%)',
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.3)',
        }}
      />
      <div
        className="absolute left-[-2px] top-[88px] w-[2.5px] h-[14px] rounded-l-sm z-20"
        style={{
          background: 'linear-gradient(180deg, #8A8A8E 0%, #48484A 100%)',
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.3)',
        }}
      />
      {/* Right side — Power */}
      <div
        className="absolute right-[-2px] top-[125px] w-[2.5px] h-[40px] rounded-r-sm z-20"
        style={{
          background: 'linear-gradient(180deg, #8A8A8E 0%, #48484A 100%)',
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Status Bar (shared across all phones)                              */
/* ------------------------------------------------------------------ */
function StatusBar({ bg }: { bg?: string }) {
  return (
    <div
      className="relative flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-white shrink-0"
      style={{ background: bg || 'transparent' }}
    >
      <span>9:41</span>
      {/* Dynamic Island */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[6px] w-[36px] h-[10px] sm:w-[55px] sm:h-[14px] lg:w-[68px] lg:h-[18px] rounded-full bg-black" />
      <div className="flex items-center gap-1">
        <svg width="22" height="10" viewBox="0 0 25 12" fill="none">
          <rect x="0" y="1" width="21" height="10" rx="2" stroke="white" strokeWidth="1" />
          <rect x="1.5" y="2.5" width="15" height="7" rx="1" fill="white" />
          <path d="M22.5 4.5v3a2 2 0 000-3z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Instagram Phone Screen                                             */
/* ------------------------------------------------------------------ */
function InstagramScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <IPhone15Pro>
      <StatusBar bg="linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)" />

      {/* IG Story header bar */}
      <div
        className="flex items-center justify-between px-2 sm:px-3 py-1 sm:py-1.5 shrink-0"
        style={{
          background: 'linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)',
        }}
      >
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <img
            src="/codex-logo.jpg"
            alt="Codex Solutions"
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-white shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] font-semibold text-white leading-tight truncate">Codex Solutions</p>
            <p className="text-[7px] sm:text-[8px] text-white/60">Sponsored</p>
          </div>
        </div>
        {/* Story progress bars */}
        <div className="flex gap-[2px] sm:gap-[3px] items-center flex-1 justify-end">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-4 sm:w-7 h-[2px] rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white"
                style={{
                  width: i === 0 ? '100%' : i === 1 ? '60%' : '0%',
                  transition: 'width 1s ease',
                }}
              />
            </div>
          ))}
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="shrink-0">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </div>

      {/* Video area — full remaining space */}
      <div ref={sectionRef} className="flex-1 relative bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          loop
          muted
          playsInline
          webkit-playsinline="true"
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
        />
      </div>
    </IPhone15Pro>
  );
}

/* ------------------------------------------------------------------ */
/*  Facebook Phone Screen                                              */
/* ------------------------------------------------------------------ */
function FacebookScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <IPhone15Pro>
      <StatusBar bg="#1877F2" />

      {/* FB header */}
      <div className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 shrink-0 bg-[#1877F2]">
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <img
            src="/codex-logo.jpg"
            alt="Codex Solutions"
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] font-semibold text-white leading-tight truncate">Codex Solutions</p>
            <p className="text-[7px] sm:text-[8px] text-white/60 flex items-center gap-1">
              <span className="inline-block w-[3px] h-[3px] sm:w-[4px] sm:h-[4px] rounded-full bg-blue-300" />
              Just now
            </p>
          </div>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="text-white/60 shrink-0">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </div>

      {/* Video area — full remaining space */}
      <div ref={sectionRef} className="flex-1 relative bg-[#18191A] overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          loop
          muted
          playsInline
          webkit-playsinline="true"
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
        />
      </div>
    </IPhone15Pro>
  );
}

/* ------------------------------------------------------------------ */
/*  LinkedIn Phone Screen                                              */
/* ------------------------------------------------------------------ */
function LinkedInScreen() {
  return (
    <IPhone15Pro>
      <StatusBar bg="#0A66C2" />

      {/* LinkedIn header */}
      <div className="flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 shrink-0 bg-[#0A66C2]">
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <img
            src="/codex-logo.jpg"
            alt="Codex Solutions"
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[9px] sm:text-[10px] font-semibold text-white leading-tight truncate">Codex Solutions</p>
            <p className="text-[7px] sm:text-[8px] text-white/60">1st degree connection</p>
          </div>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="text-white/60 shrink-0">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </div>

      {/* Review image — full remaining space */}
      <div className="flex-1 relative bg-black overflow-hidden">
        <img
          src="/review-image.jpeg"
          alt="Client review"
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
        />
      </div>
    </IPhone15Pro>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */
export default function SocialProofSection() {
  return (
    <section className="relative py-8 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d12] to-[#030712]" />
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 800px 300px at 50% 50%, rgba(20,240,200,0.08), transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-6 sm:mb-12 lg:mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] sm:text-[12px] font-semibold tracking-[0.15em] uppercase mb-3 sm:mb-5">
              Social Proof Automation
            </span>
            <h2 className="text-[18px] sm:text-3xl md:text-[2.75rem] font-bold text-white mb-3 sm:mb-5 leading-tight">
              One review.{' '}
              <span className="bg-gradient-to-r from-[#14f0c8] to-[#14b8a6] bg-clip-text text-transparent">
                Three platforms.
              </span>{' '}
              Zero effort.
            </h2>
            <p className="text-white/60 text-[12px] sm:text-base max-w-2xl mx-auto leading-relaxed">
              A single customer review auto-publishes to Instagram, Facebook &amp; LinkedIn
              — each formatted for maximum engagement on that platform.
            </p>
          </div>
        </ScrollReveal>

        {/* Three Phone Mockups */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 sm:gap-8 lg:gap-6 xl:gap-10">
          {platforms.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.15}>
              <div className="flex flex-col items-center gap-5">
                {/* Phone — fixed wrapper to prevent layout shift */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="h-[325px] sm:h-[370px] md:h-[410px] lg:h-[450px] flex items-start max-w-full"
                >
                  {i === 0 && <InstagramScreen />}
                  {i === 1 && <FacebookScreen />}
                  {i === 2 && <LinkedInScreen />}
                </motion.div>

                {/* Platform label + description below phone */}
                <div className="text-center w-full max-w-[160px] sm:max-w-[220px]">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                    <div
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                      style={{ background: p.accentColor }}
                    />
                    <span className="text-[11px] sm:text-sm font-semibold text-white">{p.name}</span>
                    <span className="text-[8px] sm:text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                      {p.format}
                    </span>
                    <span className="text-[8px] sm:text-[10px] text-slate-600 ml-auto">{p.duration}</span>
                  </div>
                  <p className="text-slate-400 text-[10px] sm:text-[12px] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer tagline */}
        <ScrollReveal delay={0.5}>
          <div className="mt-12 flex items-center justify-center gap-2 text-slate-500 text-[12px]">
            <Check className="w-3.5 h-3.5 text-teal-500/60" />
            <span>Fully branded, zero manual design work</span>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes socialFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}