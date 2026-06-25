'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ShoppingCart, MessageCircle, Star, Globe, Bot, Share2, ShieldCheck } from 'lucide-react';

const flowSteps = [
  { icon: ShoppingCart, label: 'Order Completes' },
  { icon: MessageCircle, label: 'WhatsApp Request' },
  { icon: Star, label: 'Customer Rates' },
  { icon: Globe, label: 'Google Review' },
  { icon: Bot, label: 'AI Reply' },
  { icon: Share2, label: 'Social Media Post' },
];

export default function SolutionSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="inline-block text-[12px] font-semibold tracking-[0.15em] uppercase text-slate-500 mb-4">
              The Solution
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-5 leading-tight">
              A Fully Automated
              <span className="bg-gradient-to-r from-[#14f0c8] to-[#14b8a6] bg-clip-text text-transparent"> Reputation Engine</span>
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              From order completion to social proof — everything happens automatically.
            </p>
          </div>
        </ScrollReveal>

        {/* Flow */}
        <div className="relative max-w-4xl mx-auto">
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4 relative z-10">
            {flowSteps.map((step, i) => (
              <ScrollReveal key={step.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative w-16 h-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center mb-4 group-hover:border-teal-500/30 group-hover:bg-teal-500/[0.04] transition-all duration-500">
                    <step.icon className="w-6 h-6 text-slate-400 group-hover:text-teal-400 transition-colors duration-500" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0f172a] border border-white/10 text-[10px] font-bold text-slate-400 flex items-center justify-center">
                      {i + 1}
                    </div>
                  </div>
                  <p className="text-[12px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors leading-tight">
                    {step.label}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Recovery banner */}
        <ScrollReveal delay={0.5}>
          <motion.div
            whileHover={{ y: -2 }}
            className="mt-20 max-w-3xl mx-auto p-6 rounded-2xl border border-amber-500/10 bg-amber-500/[0.03] flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-[15px] font-semibold text-white mb-1">Below 5 stars? No problem.</h4>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                Feedback captured privately → Support ticket created → Owner notified →{' '}
                <span className="text-amber-300/80">Customer recovered before going public</span>
              </p>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}