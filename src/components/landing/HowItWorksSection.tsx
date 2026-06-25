'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Zap, MessageCircle, Star, GitBranch, Bot, Share2 } from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────────────── */

const steps = [
  {
    num: '01',
    icon: Zap,
    title: 'Trigger',
    description: 'Order or service completed. The system picks it up automatically — works with any CRM, booking system, or store platform.',
    color: '#14f0c8',
  },
  {
    num: '02',
    icon: MessageCircle,
    title: 'WhatsApp Review Request',
    description: 'Customer receives a personalized message with Yes / Not Now buttons — no app download needed.',
    color: '#22d3ee',
  },
  {
    num: '03',
    icon: Star,
    title: 'Rating Capture',
    description: 'Customer taps their star rating (1–5) directly in WhatsApp — no links, no apps, frictionless.',
    color: '#fbbf24',
  },
  {
    num: '04',
    icon: GitBranch,
    title: 'Smart Routing',
    description: '5★ → Google Review link. 1–4★ → private feedback form, support ticket, owner alert. Negative reviews never go public.',
    color: '#34d399',
  },
  {
    num: '05',
    icon: Bot,
    title: 'AI Replies to the Review',
    description: 'AI writes a personalized, on-brand reply and publishes within minutes — not days.',
    color: '#a78bfa',
  },
  {
    num: '06',
    icon: Share2,
    title: 'Social Media Auto-Post',
    description: '5★ review becomes a branded Instagram Story, Facebook Post, and LinkedIn Post — all automatically.',
    color: '#f472b6',
  },
];

/* ─── Step Card ──────────────────────────────────────────────────── */

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isRight = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
      {/* Left content (visible when step is RIGHT) */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isRight ? -60 : 60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={`${isRight ? 'lg:order-1 lg:text-right' : 'lg:order-2 lg:text-left'} ${!isRight ? 'lg:col-start-2' : ''}`}
      >
        {isRight ? null : (
          <div className="hidden lg:block" />
        )}
        <div className={`inline-flex items-center gap-3 mb-4 ${isRight ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${step.color}12`,
              boxShadow: `0 0 20px ${step.color}10, 0 0 0 1px ${step.color}20`,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <step.icon className="w-6 h-6" style={{ color: step.color }} />
          </motion.div>
          <span className="text-sm font-bold tracking-wider" style={{ color: step.color }}>
            STEP {step.num}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
          {step.title}
        </h3>
        <p className="text-white text-[14px] sm:text-[15px] leading-relaxed max-w-md mx-0 lg:max-w-none">
          {step.description}
        </p>
      </motion.div>

      {/* Center dot + neon ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 hidden lg:block"
      >
        {/* Outer pulse */}
        <motion.div
          className="absolute inset-[-6px] rounded-full"
          style={{ border: `2px solid ${step.color}30` }}
          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute inset-[-3px] rounded-full"
          style={{ border: `1px solid ${step.color}50` }}
          animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
        />
        {/* Core dot */}
        <div
          className="w-4 h-4 rounded-full relative"
          style={{
            backgroundColor: step.color,
            boxShadow: `0 0 12px ${step.color}80, 0 0 24px ${step.color}40, 0 0 48px ${step.color}20`,
          }}
        />
      </motion.div>

      {/* Right content (visible when step is LEFT) */}
      <div className={`${isRight ? 'lg:order-2' : 'lg:order-1'} ${isRight ? 'lg:col-start-2' : ''}`} />
    </div>
  );
}

/* ─── Neon Curved SVG Path ──────────────────────────────────────── */

function NeonPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  /* Progress of the traveling light along the path */
  const pathLength = 1200;
  const lightOffset = useTransform(scrollYProgress, [0.1, 0.85], [pathLength, 0]);

  return (
    <div ref={sectionRef} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[200px] hidden lg:block z-10 pointer-events-none">
      <svg
        viewBox="0 0 200 1200"
        fill="none"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Curved zigzag path */}
        <path
          ref={pathRef}
          d="M100 0 
             C 100 40, 30 60, 30 100
             C 30 140, 100 160, 100 200
             C 100 240, 170 260, 170 300
             C 170 340, 100 360, 100 400
             C 100 440, 30 460, 30 500
             C 30 540, 100 560, 100 600
             C 100 640, 170 660, 170 700
             C 170 740, 100 760, 100 800
             C 100 840, 30 860, 30 900
             C 30 940, 100 960, 100 1000
             C 100 1040, 170 1060, 170 1100
             C 170 1140, 100 1160, 100 1200"
          stroke="url(#neonGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-30"
        />

        {/* Animated traveling light (glowing dot) */}
        <motion.circle
          r="5"
          fill="#14f0c8"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M100 0 
             C 100 40, 30 60, 30 100
             C 30 140, 100 160, 100 200
             C 100 240, 170 260, 170 300
             C 170 340, 100 360, 100 400
             C 100 440, 30 460, 30 500
             C 30 540, 100 560, 100 600
             C 100 640, 170 660, 170 700
             C 170 740, 100 760, 100 800
             C 100 840, 30 860, 30 900
             C 30 940, 100 960, 100 1000
             C 100 1040, 170 1060, 170 1100
             C 170 1140, 100 1160, 100 1200"
          />
        </motion.circle>

        {/* Second traveling light (offset timing) */}
        <motion.circle
          r="3"
          fill="#a78bfa"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.animateMotion
            dur="6s"
            repeatCount="indefinite"
            begin="3s"
            path="M100 0 
             C 100 40, 30 60, 30 100
             C 30 140, 100 160, 100 200
             C 100 240, 170 260, 170 300
             C 170 340, 100 360, 100 400
             C 100 440, 30 460, 30 500
             C 30 540, 100 560, 100 600
             C 100 640, 170 660, 170 700
             C 170 740, 100 760, 100 800
             C 100 840, 30 860, 30 900
             C 30 940, 100 960, 100 1000
             C 100 1040, 170 1060, 170 1100
             C 170 1140, 100 1160, 100 1200"
          />
        </motion.circle>

        <defs>
          <linearGradient id="neonGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14f0c8" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────── */

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'end 0.5'],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#050a10] to-[#030712]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-teal-500/[0.02] blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-violet-500/[0.02] blur-[120px]" />

      {/* Neon curved path (behind content) */}
      <NeonPath />

      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div style={{ opacity: headerOpacity }} className="text-center mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-teal-500/50" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-teal-400">
              How It Works
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-teal-500/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
            Six steps.{' '}
            <span className="bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">
              Zero manual work.
            </span>
          </h2>
        </motion.div>

        {/* Steps timeline */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}