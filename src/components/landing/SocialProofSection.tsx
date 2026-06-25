'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
      className="relative w-[260px] h-[530px] rounded-[45px] p-[4px] origin-center shrink-0"
      style={{
        background:
          'linear-gradient(145deg, #8A8A8E 0%, #6E6E73 15%, #48484A 50%, #6E6E73 85%, #8A8A8E 100%)',
        boxShadow:
          '0 50px 100px -20px rgba(0,0,0,0.7), 0 30px 60px -30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.3)',
      }}
    >
      {/* Shine / reflection */}
      <div
        className="absolute inset-0 rounded-[45px] pointer-events-none z-30"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.04) 100%)',
        }}
      />
      {/* Inner bezel */}
      <div
        className="relative w-full h-full rounded-[41px] overflow-hidden z-10 flex flex-col"
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
      <div className="absolute left-1/2 -translate-x-1/2 top-[7px] w-[100px] h-[30px] rounded-full bg-black" />
      <div className="flex items-center gap-1">
        <svg width="13" height="10" viewBox="0 0 15 12" fill="none">
          <path
            d="M7.5 3.6c1.6 0 3 .6 4.1 1.7l.9-.9A8.3 8.3 0 007.5 2.1a8.3 8.3 0 00-5 1.7l.9.9A5.5 5.5 0 017.5 3.6z"
            fill="white"
          />
          <path
            d="M7.5 6.2c.9 0 1.8.4 2.5 1l.9-.9A4.2 4.2 0 007.5 4.6a4.2 4.2 0 00-3.4 1.7l.9.9c.7-.6 1.6-1 2.5-1z"
            fill="white"
          />
          <circle cx="7.5" cy="8.8" r="1.3" fill="white" />
        </svg>
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
  const ref = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <IPhone15Pro>
      <StatusBar bg="linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)" />

      {/* IG Story header bar */}
      <div
        className="flex items-center justify-between px-3 py-1.5 shrink-0"
        style={{
          background: 'linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 100%)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">CSI</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white leading-tight">Codex Solutions</p>
            <p className="text-[8px] text-white/60">Sponsored</p>
          </div>
        </div>
        {/* Story progress bars */}
        <div className="flex gap-[3px] items-center">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-8 h-[2px] rounded-full bg-white/20 overflow-hidden">
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </div>

      {/* Video area */}
      <div ref={sectionRef} className="flex-1 relative bg-black">
        <video
          ref={ref}
          src={VIDEO_URL}
          autoPlay={isInView}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ display: 'block' }}
        />

        {/* Bottom overlay — engagement */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-8">
          {/* Stars overlay */}
          <div className="flex gap-0.5 mb-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-[13px] text-yellow-400">★</span>
            ))}
          </div>
          <p className="text-[10px] text-white font-medium leading-snug mb-0.5">
            &ldquo;Great experience working with Codex team. They quickly fixed a costly automation issue&hellip;&rdquo;
          </p>
          <p className="text-[9px] text-white/50">— Bruno Pedro via Google Review</p>

          {/* Engagement row */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="text-[9px] text-white/70">2.4k</span>
              </div>
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                <span className="text-[9px] text-white/70">186</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom input bar */}
      <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-t border-white/10 bg-[#0a0a0a]">
        <input
          readOnly
          placeholder="Send message"
          className="flex-1 bg-transparent text-[10px] text-white/30 outline-none"
        />
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="text-white/40">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
    </IPhone15Pro>
  );
}

/* ------------------------------------------------------------------ */
/*  Facebook Phone Screen                                              */
/* ------------------------------------------------------------------ */
function FacebookScreen() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <IPhone15Pro>
      <StatusBar bg="#1877F2" />

      {/* FB header */}
      <div className="flex items-center justify-between px-3 py-2 shrink-0 bg-[#1877F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">CSI</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white leading-tight">Codex Solutions International</p>
            <p className="text-[8px] text-white/60 flex items-center gap-1">
              <span className="inline-block w-[4px] h-[4px] rounded-full bg-blue-300" />
              Just now
            </p>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="text-white/60">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-[#18191A] overflow-hidden">
        {/* Video */}
        <div ref={sectionRef} className="relative w-full aspect-[9/10] bg-black">
          <video
            src={VIDEO_URL}
            autoPlay={isInView}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
        </div>

        {/* Post info below video */}
        <div className="px-3 py-2">
          {/* Stars */}
          <div className="flex gap-0.5 mb-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-[12px] text-yellow-400">★</span>
            ))}
          </div>
          <p className="text-[10px] text-white/90 leading-snug mb-0.5">
            &ldquo;Great experience working with Codex team. They quickly fixed a costly automation issue&hellip;&rdquo;
          </p>
          <p className="text-[9px] text-white/40 mb-1.5">— Bruno Pedro via Google Review</p>

          {/* Engagement */}
          <div className="flex items-center justify-between pb-1 border-b border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-white/50">👍 342  ❤️ 89  😲 12</span>
            </div>
            <span className="text-[9px] text-white/40">18 comments</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-around pt-1.5">
            <button className="flex items-center gap-1 text-white/50 hover:text-white/80 transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 4h-1H6.57C5.5 4 4.59 4.67 4.38 5.61l-1.34 6C2.77 12.85 3.82 14 5.23 14H9.6l-.74 3.04a1.84 1.84 0 00.35 1.56 1.84 1.84 0 001.42.66H12l5.17-5.34A2.25 2.25 0 0018 11.83V6a2 2 0 00-2-2z" />
              </svg>
              <span className="text-[9px] font-medium">Like</span>
            </button>
            <button className="flex items-center gap-1 text-white/50 hover:text-white/80 transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <span className="text-[9px] font-medium">Comment</span>
            </button>
            <button className="flex items-center gap-1 text-white/50 hover:text-white/80 transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              <span className="text-[9px] font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>
    </IPhone15Pro>
  );
}

/* ------------------------------------------------------------------ */
/*  LinkedIn Phone Screen                                              */
/* ------------------------------------------------------------------ */
function LinkedInScreen() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <IPhone15Pro>
      <StatusBar bg="#0A66C2" />

      {/* LinkedIn header */}
      <div className="flex items-center justify-between px-3 py-2 shrink-0 bg-[#0A66C2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">CSI</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white leading-tight">Codex Solutions International</p>
            <p className="text-[8px] text-white/60">1st degree connection</p>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="text-white/60">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-[#000000] overflow-hidden">
        {/* Video */}
        <div ref={sectionRef} className="relative w-full aspect-[9/10] bg-black">
          <video
            src={VIDEO_URL}
            autoPlay={isInView}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
        </div>

        {/* Post info */}
        <div className="px-3 py-2">
          {/* Stars */}
          <div className="flex gap-0.5 mb-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="text-[12px] text-yellow-400">★</span>
            ))}
          </div>
          <p className="text-[10px] text-white/90 leading-snug mb-0.5">
            &ldquo;Great experience working with Codex team. They quickly fixed a costly automation issue&hellip;&rdquo;
          </p>
          <p className="text-[9px] text-white/40 mb-1.5">— Bruno Pedro via Google Review</p>

          {/* LinkedIn engagement */}
          <div className="flex items-center justify-between pb-1 border-b border-white/10">
            <div className="flex items-center -space-x-1">
              <div className="w-4 h-4 rounded-full bg-blue-500 border border-[#000] flex items-center justify-center">
                <span className="text-[6px]">👍</span>
              </div>
              <div className="w-4 h-4 rounded-full bg-red-500 border border-[#000] flex items-center justify-center">
                <span className="text-[6px]">❤️</span>
              </div>
            </div>
            <span className="text-[9px] text-white/40">528 reactions</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-around pt-1.5">
            <button className="flex items-center gap-1 text-white/50 hover:text-white/80 transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 4h-1H6.57C5.5 4 4.59 4.67 4.38 5.61l-1.34 6C2.77 12.85 3.82 14 5.23 14H9.6l-.74 3.04a1.84 1.84 0 00.35 1.56 1.84 1.84 0 001.42.66H12l5.17-5.34A2.25 2.25 0 0018 11.83V6a2 2 0 00-2-2z" />
              </svg>
              <span className="text-[9px] font-medium">Like</span>
            </button>
            <button className="flex items-center gap-1 text-white/50 hover:text-white/80 transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <span className="text-[9px] font-medium">Comment</span>
            </button>
            <button className="flex items-center gap-1 text-white/50 hover:text-white/80 transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
              </svg>
              <span className="text-[9px] font-medium">Repost</span>
            </button>
            <button className="flex items-center gap-1 text-white/50 hover:text-white/80 transition">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span className="text-[9px] font-medium">Send</span>
            </button>
          </div>
        </div>
      </div>
    </IPhone15Pro>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */
export default function SocialProofSection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
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
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[12px] font-semibold tracking-[0.15em] uppercase mb-5">
              Social Proof Automation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-5 leading-tight">
              One review.{' '}
              <span className="bg-gradient-to-r from-[#14f0c8] to-[#14b8a6] bg-clip-text text-transparent">
                Three platforms.
              </span>{' '}
              Zero effort.
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              A single customer review auto-publishes to Instagram, Facebook &amp; LinkedIn
              — each formatted for maximum engagement on that platform.
            </p>
          </div>
        </ScrollReveal>

        {/* Three Phone Mockups */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-6 lg:gap-10">
          {platforms.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.15}>
              <div className="flex flex-col items-center gap-5">
                {/* Phone — fixed wrapper to prevent layout shift */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="h-[530px] flex items-start"
                >
                  {i === 0 && <InstagramScreen />}
                  {i === 1 && <FacebookScreen />}
                  {i === 2 && <LinkedInScreen />}
                </motion.div>

                {/* Platform label + description below phone */}
                <div className="text-center max-w-[240px]">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: p.accentColor }}
                    />
                    <span className="text-sm font-semibold text-white">{p.name}</span>
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                      {p.format}
                    </span>
                    <span className="text-[10px] text-slate-600 ml-auto">{p.duration}</span>
                  </div>
                  <p className="text-slate-400 text-[12px] leading-relaxed">{p.desc}</p>
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