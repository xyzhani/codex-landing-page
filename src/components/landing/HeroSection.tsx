'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

const CALENDLY_URL = 'https://calendly.com/codexsolutionsintl/15min?back=1&month=2026-06';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background — positioned on the left half, hidden on mobile */}
      <div className="absolute inset-0 z-0 hidden sm:block">
        <div className="absolute left-0 top-0 w-[55%] h-full">
          <Suspense fallback={null}>
            <ParticleField />
          </Suspense>
        </div>
      </div>

      {/* Layered gradients */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_25%_50%,rgba(20,184,166,0.06),transparent)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_40%_40%_at_80%_30%,rgba(251,191,36,0.02),transparent)]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,#030712_75%)]" />

      {/* Fade edges */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030712] to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030712] to-transparent z-[2]" />

      {/* Content — split layout: 3D left (via bg), text right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center min-h-screen py-16 sm:py-20">
          {/* LEFT — empty on desktop (3D canvas fills this space) */}
          <div className="hidden lg:block" />

          {/* RIGHT — compact text content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:pl-8 text-center sm:text-left"
          >
            {/* Top label */}
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-6 bg-gradient-to-r from-transparent to-teal-500/50" />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-teal-400/70">
                AI Reputation Management
              </span>
            </motion.div>

            {/* Main headline — smaller, refined */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-5"
            >
              <span className="text-white/90">Turn Every Order Into </span>
              <span className="bg-gradient-to-r from-[#14f0c8] via-[#14b8a6] to-[#0d9488] bg-clip-text text-transparent">
                a Google Review
              </span>
              <span className="text-white/90"> — and Every Review Into </span>
              <span className="bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#f97316] bg-clip-text text-transparent">
                Social Proof
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-[13px] sm:text-sm text-slate-400/70 max-w-md mb-6 leading-relaxed"
            >
              Automated review collection via WhatsApp. AI-powered replies. 
              Instant social proof generation. For SMBs and eCommerce.
            </motion.p>

            {/* Stat — compact */}
            <motion.div variants={fadeUp} custom={3} className="mb-7">
              <div className="inline-flex items-center gap-4 px-5 py-3.5 rounded-xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-sm">
                <span className="text-[28px] sm:text-[32px] font-extrabold tracking-tight leading-none bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  60–80%
                </span>
                <div className="w-px h-7 bg-white/[0.06]" />
                <p className="text-[12px] text-slate-400/70 text-left leading-snug max-w-[130px]">
                  of customer reviews are lost without automation
                </p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-gray-950 font-semibold text-[13px] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:scale-[1.02]"
              >
                Book a Free 15-Min Demo
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.08] bg-transparent text-slate-300 font-medium text-[13px] transition-all duration-300 hover:border-white/[0.15] hover:text-white"
              >
                See How It Works
                <Star className="w-3 h-3 text-teal-400/60" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
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