'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MessageCircle, Star, ArrowRight, Smartphone, ShoppingBag, Store } from 'lucide-react';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

const CALENDLY_URL = 'https://calendly.com/codexsolutionsintl/15min?back=1&month=2026-06';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,#030712_70%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-teal mb-8"
        >
          <MessageCircle className="w-4 h-4 text-teal-400" />
          <span className="text-sm text-teal-300 font-medium">WhatsApp-First Reputation Engine</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white">AI Business</span>
          <br />
          <span className="gradient-text">Reputation Management</span>
          <br />
          <span className="text-white">System</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-4"
        >
          Turn Every Order Into a Google Review/Feedback —
          <br className="hidden sm:block" />
          <span className="text-teal-300 font-semibold"> and Every Review Into Social Proof</span>
        </motion.p>

        {/* Target badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {[{ icon: Store, label: 'SMBs' }, { icon: ShoppingBag, label: 'eCommerce' }, { icon: Smartphone, label: 'Local Business' }].map((item) => (
            <span key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-slate-300">
              <item.icon className="w-4 h-4 text-teal-400" />
              {item.label}
            </span>
          ))}
        </motion.div>

        {/* Stat highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl glass-teal">
            <div className="text-3xl sm:text-4xl font-bold text-white">60–80%</div>
            <div className="text-left">
              <p className="text-sm text-teal-300 font-medium">of reviews are lost</p>
              <p className="text-xs text-slate-400">without automation. This system fixes that.</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-teal-500 text-gray-950 font-bold text-lg transition-all duration-300 hover:bg-teal-400 hover:scale-105 animate-pulse-glow"
          >
            Book a Free 15-Min Demo
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-white font-medium text-lg transition-all duration-300 hover:border-teal-500/50 hover:bg-white/5"
          >
            <Star className="w-5 h-5 text-teal-400" />
            See How It Works
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-teal-500/50 flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}