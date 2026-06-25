'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

const CALENDLY_URL = 'https://calendly.com/codexsolutionsintl/15min?back=1&month=2026-06';

const checklist = [
  'Every order → Google review → AI reply posted instantly',
  'Every review → Instagram Story + Facebook Post + LinkedIn Post',
  'Every post builds trust and brings new customers',
];

export default function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden min-h-[80vh] flex items-center">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Build Your
              <br />
              <span className="gradient-text">Reputation Engine?</span>
            </h2>

            <div className="max-w-xl mx-auto mb-8 space-y-3">
              {checklist.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-3 text-left"
                >
                  <CheckCircle className="w-5 h-5 text-teal-400 shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-teal-500 text-gray-950 font-bold text-xl transition-all duration-300 hover:bg-teal-400 hover:scale-105 animate-pulse-glow"
              >
                Book a Free 15-Minute Demo
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="mt-4 text-slate-500 text-sm">
                No commitment. We&apos;ll show you exactly how it works for your business.
              </p>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}