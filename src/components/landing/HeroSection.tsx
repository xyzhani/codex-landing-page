'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

const CALENDLY_URL = 'https://calendly.com/codexsolutionsintl/15min?back=1&month=2026-06';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Layered gradients for depth */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(20,184,166,0.06),transparent)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_30%_60%,rgba(251,191,36,0.03),transparent)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,#030712_70%)]" />

      {/* Subtle top/bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#030712] to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030712] to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 mb-10"
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-teal-500/50" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-teal-400/70">
            AI Reputation Management
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-teal-500/50" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-6"
        >
          <span className="text-white/90">Turn Every Order Into</span>
          <br />
          <span className="relative inline-block mt-1">
            <span className="bg-gradient-to-r from-[#14f0c8] via-[#14b8a6] to-[#0d9488] bg-clip-text text-transparent">
              a Google Review
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
          </span>
          <br />
          <span className="text-white/90">— and Every Review Into</span>
          <br />
          <span className="relative inline-block mt-1">
            <span className="bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#f97316] bg-clip-text text-transparent">
              Social Proof
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-[15px] sm:text-base text-slate-400/80 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Automated review collection via WhatsApp. AI-powered replies. 
          Instant social proof generation. For SMBs and eCommerce.
        </motion.p>

        {/* Stat */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-6 px-8 py-5 rounded-2xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-sm">
            <span className="text-[42px] sm:text-[52px] font-extrabold tracking-tight leading-none bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              60–80%
            </span>
            <div className="w-px h-10 bg-white/[0.06]" />
            <p className="text-[13px] text-slate-400/80 text-left leading-snug max-w-[160px]">
              of customer reviews are lost without automation
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white text-gray-950 font-semibold text-[14px] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:scale-[1.02]"
          >
            Book a Free 15-Min Demo
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/[0.08] bg-transparent text-slate-300 font-medium text-[14px] transition-all duration-300 hover:border-white/[0.15] hover:text-white"
          >
            See How It Works
            <Star className="w-3.5 h-3.5 text-teal-400/60" />
          </a>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-7 rounded-full border border-white/10 flex justify-center pt-1.5"
        >
          <div className="w-0.5 h-1 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}