'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ArrowRight, CheckCircle } from 'lucide-react';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

const CALENDLY_URL = 'https://calendly.com/codexsolutionsintl/15min?back=1&month=2026-06';

const checklist = [
  'Every order → Google review → AI reply posted instantly',
  'Every review → Instagram Story + Facebook Post + LinkedIn Post',
  'Every post builds trust and brings new customers',
];

export default function CTASection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.05)_0%,transparent_60%)]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-6 sm:mb-8 leading-tight">
            Ready to build your
            <br />
            <span className="bg-gradient-to-r from-[#14f0c8] to-[#14b8a6] bg-clip-text text-transparent">reputation engine?</span>
          </h2>

          <div className="max-w-md mx-auto mb-8 sm:mb-10 space-y-3 text-left">
            {checklist.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="w-4 h-4 text-teal-400/70 shrink-0" />
                <span className="text-slate-400 text-[14px]">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-[#14b8a6] text-gray-950 font-semibold text-base transition-all duration-500 hover:bg-[#2dd4bf] hover:shadow-[0_0_50px_rgba(20,184,166,0.25)]"
            >
              Book a Free 15-Minute Demo
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <p className="mt-4 text-slate-600 text-[12px]">
              No commitment. We&apos;ll show you exactly how it works for your business.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}