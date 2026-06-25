'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingCart, MessageCircle, Star, Globe, Bot, Share2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────────────── */

const flowSteps = [
  { icon: ShoppingCart, label: 'Order Completes', color: '#14b8a6' },
  { icon: MessageCircle, label: 'WhatsApp Request', color: '#22d3ee' },
  { icon: Star, label: 'Customer Rates', color: '#fbbf24' },
  { icon: Globe, label: 'Google Review', color: '#34d399' },
  { icon: Bot, label: 'AI Reply', color: '#a78bfa' },
  { icon: Share2, label: 'Social Post', color: '#f472b6' },
];

/* ─── Animated Beam (travels along the connection line) ─────────── */

function Beam({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 w-6 h-[2px] rounded-full"
      style={{
        background: 'linear-gradient(90deg, transparent, #14f0c8, transparent)',
        boxShadow: '0 0 12px 2px rgba(20,240,200,0.4)',
      }}
      initial={{ left: '0%', opacity: 0 }}
      animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 4,
        ease: 'linear',
      }}
    />
  );
}

/* ─── Step Node ─────────────────────────────────────────────────── */

function StepNode({ step, index, total }: { step: typeof flowSteps[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col items-center text-center group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Connector line to next (desktop) */}
      {index < total - 1 && (
        <div className="hidden lg:block absolute top-[26px] left-[calc(50%+32px)] right-[calc(-50%+32px)] h-px z-0">
          {/* Base line */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.04] to-white/[0.04]" />
          {/* Animated beam */}
          <Beam delay={index * 0.6 + 0.5} />
        </div>
      )}

      {/* Circle node */}
      <div className="relative z-10 mb-5">
        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `1px solid ${step.color}20` }}
          animate={
            hovered
              ? { scale: [1, 1.6, 1.8], opacity: [0.5, 0.15, 0] }
              : { scale: 1, opacity: 0 }
          }
          transition={{ duration: 1.5, repeat: hovered ? Infinity : 0, ease: 'easeOut' }}
        />

        <motion.div
          className="w-[64px] h-[64px] rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500"
          style={{
            backgroundColor: `${step.color}08`,
            border: `1px solid ${step.color}18`,
            boxShadow: hovered ? `0 0 30px ${step.color}15, 0 0 60px ${step.color}08` : 'none',
          }}
          whileHover={{ scale: 1.08, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Glow bg on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{ backgroundColor: step.color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 0.08 : 0 }}
            transition={{ duration: 0.4 }}
          />
          <step.icon
            className="w-6 h-6 relative z-10 transition-colors duration-500"
            style={{ color: hovered ? step.color : '#64748b' }}
          />
        </motion.div>

        {/* Step number */}
        <div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-20"
          style={{
            backgroundColor: `${step.color}15`,
            color: step.color,
            border: `1px solid ${step.color}30`,
          }}
        >
          {index + 1}
        </div>
      </div>

      {/* Label */}
      <motion.p
        className="text-[12px] font-medium text-slate-500 leading-tight max-w-[100px] transition-colors duration-500"
        animate={{ color: hovered ? '#e2e8f0' : '#64748b' }}
      >
        {step.label}
      </motion.p>
    </motion.div>
  );
}

/* ─── Recovery Banner ───────────────────────────────────────────── */

function RecoveryBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-20 max-w-3xl mx-auto group"
    >
      {/* Animated gradient border */}
      <div className="relative rounded-2xl p-px overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from 0deg, #fbbf2430, transparent 25%, transparent 75%, #fbbf2430)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative bg-[#0a0f1a]/95 backdrop-blur-xl rounded-2xl p-6 sm:p-7 overflow-hidden">
          {/* Glow */}
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-amber-500/[0.04] blur-[80px] group-hover:bg-amber-500/[0.07] transition-colors duration-700" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Shield icon with pulse */}
            <div className="relative shrink-0">
              <motion.div
                className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center"
                style={{ boxShadow: '0 0 0 1px rgba(251,191,36,0.15)' }}
                whileHover={{ scale: 1.1 }}
              >
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-xl border border-amber-400/20"
                animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h4 className="text-[16px] font-semibold text-white">Below 5 stars? No problem.</h4>
                <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
              </div>
              <p className="text-slate-400 text-[13px] leading-relaxed">
                Feedback captured privately
                <span className="inline-flex items-center mx-2 text-slate-500">
                  <ArrowRight className="w-3 h-3" />
                </span>
                Support ticket created
                <span className="inline-flex items-center mx-2 text-slate-500">
                  <ArrowRight className="w-3 h-3" />
                </span>
                Owner notified
                <span className="inline-flex items-center mx-2 text-slate-500">
                  <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-amber-300/90 font-medium">Customer recovered before going public</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────── */

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'end 0.5'],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const flowRef = useRef<HTMLDivElement>(null);
  const flowInView = useInView(flowRef, { once: true, margin: '-60px' });

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
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

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] rounded-full bg-teal-500/[0.02] blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] rounded-full bg-cyan-500/[0.02] blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header — parallax */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-teal-500/40" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-teal-400/60">
              The Solution
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-teal-500/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-[1.1] tracking-tight">
            A Fully Automated
            <br />
            <span className="bg-gradient-to-r from-[#14f0c8] via-[#14b8a6] to-[#0d9488] bg-clip-text text-transparent">
              Reputation Engine
            </span>
          </h2>
          <p className="text-slate-400 text-[15px] sm:text-base max-w-lg mx-auto leading-relaxed">
            From order completion to social proof — everything happens automatically.
          </p>
        </motion.div>

        {/* Flow Steps */}
        <div ref={flowRef} className="relative max-w-5xl mx-auto">
          {/* Connecting line bg (mobile hidden) */}
          <div className="hidden lg:block absolute top-[26px] left-[8%] right-[8%] h-px z-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/15 to-teal-500/0"
              initial={{ scaleX: 0 }}
              animate={flowInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-0 relative z-10">
            {flowSteps.map((step, i) => (
              <StepNode key={step.label} step={step} index={i} total={flowSteps.length} />
            ))}
          </div>
        </div>

        {/* Recovery Banner */}
        <RecoveryBanner />
      </div>
    </section>
  );
}