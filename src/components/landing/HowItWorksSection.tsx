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

const CURVE_PATH = [
  'M100 0',
  'C 100 50, 25 75, 25 100',
  'C 25 125, 100 150, 100 200',
  'C 100 250, 175 275, 175 300',
  'C 175 325, 100 350, 100 400',
  'C 100 450, 25 475, 25 500',
  'C 25 525, 100 550, 100 600',
  'C 100 650, 175 675, 175 700',
  'C 175 725, 100 750, 100 800',
  'C 100 850, 25 875, 25 900',
  'C 25 925, 100 950, 100 1000',
  'C 100 1050, 175 1075, 175 1100',
  'C 175 1125, 100 1150, 100 1200',
].join(' ');

/* ─── Step Card ──────────────────────────────────────────────────── */

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const isRight = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRight ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_140px_1fr] items-center"
    >
      {/* LEFT column */}
      <div
        className={`${
          isRight
            ? 'flex flex-col items-center text-center'
            : 'hidden lg:flex lg:flex-col lg:items-center lg:text-center'
        }`}
      >
        {isRight && (
          <>
            <div className="inline-flex items-center gap-3 mb-3">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${step.color}12`,
                  boxShadow: `0 0 20px ${step.color}10, 0 0 0 1px ${step.color}20`,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <step.icon className="w-5 h-5" style={{ color: step.color }} />
              </motion.div>
              <span className="text-xs font-bold tracking-wider" style={{ color: step.color }}>
                STEP {step.num}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">
              {step.title}
            </h3>
            <p className="text-white/90 text-[13px] sm:text-[14px] leading-relaxed max-w-sm">
              {step.description}
            </p>
          </>
        )}
      </div>

      {/* CENTER — empty reserved space for the neon line */}
      <div className="hidden lg:block" />

      {/* RIGHT column */}
      <div
        className={`${
          !isRight
            ? 'flex flex-col items-center text-center'
            : 'hidden lg:flex lg:flex-col lg:items-center lg:text-center'
        }`}
      >
        {!isRight && (
          <>
            <div className="inline-flex items-center gap-3 mb-3">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${step.color}12`,
                  boxShadow: `0 0 20px ${step.color}10, 0 0 0 1px ${step.color}20`,
                }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <step.icon className="w-5 h-5" style={{ color: step.color }} />
              </motion.div>
              <span className="text-xs font-bold tracking-wider" style={{ color: step.color }}>
                STEP {step.num}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-tight">
              {step.title}
            </h3>
            <p className="text-white/90 text-[13px] sm:text-[14px] leading-relaxed max-w-sm">
              {step.description}
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Neon Curved SVG Path ──────────────────────────────────────── */

function NeonPath() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <div ref={sectionRef} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[120px] hidden lg:block z-10 pointer-events-none">
      <svg
        viewBox="0 0 200 1200"
        fill="none"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Curved zigzag path */}
        <path
          d={CURVE_PATH}
          stroke="url(#neonGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-25"
        />

        {/* Traveling light 1 */}
        <motion.circle
          r="8"
          fill="#14f0c8"
          filter="url(#glowBig)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.animateMotion dur="6s" repeatCount="indefinite" path={CURVE_PATH} />
        </motion.circle>

        {/* Traveling light 2 */}
        <motion.circle
          r="5"
          fill="#a78bfa"
          filter="url(#glowBig)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.7 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.animateMotion dur="6s" repeatCount="indefinite" begin="3s" path={CURVE_PATH} />
        </motion.circle>

        <defs>
          <linearGradient id="neonGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14f0c8" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glowBig" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
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
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-teal-500/[0.02] blur-[120px]" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-violet-500/[0.02] blur-[120px]" />

      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div style={{ opacity: headerOpacity }} className="text-center mb-16 sm:mb-20">
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

        {/* Steps + Neon Path */}
        <div className="relative">
          <NeonPath />

          <div className="relative z-20 space-y-14 sm:space-y-16 lg:space-y-[100px]">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}