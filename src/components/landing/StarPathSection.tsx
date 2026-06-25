'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ExternalLink, Bot, Instagram, Film, ShieldCheck, MessageSquare, Tag, Bell } from 'lucide-react';

const fiveStarSteps = [
  { icon: ExternalLink, title: 'Redirect to Review', desc: 'Sent to your Google review link — or an internal form / private WhatsApp instead.' },
  { icon: Bot, title: 'AI Auto-Response', desc: 'AI replies on-brand — tailored to your business and the words of their review.' },
  { icon: Instagram, title: 'Instagram Story', desc: 'Text reviews become a branded Story. Photo reviews turn into a video Story automatically.' },
  { icon: Film, title: 'Reel + LinkedIn', desc: 'Photo reviews post as an Instagram Reel — and to LinkedIn for B2B credibility.' },
];

const recoverySteps = [
  { icon: MessageSquare, title: 'Routed to AI', desc: '1-4★ is kept off public platforms and handed to AI for handling.' },
  { icon: ShieldCheck, title: 'Tailored Reply', desc: 'AI captures what went wrong and replies with empathy — tied to service and team.' },
  { icon: Tag, title: 'Coupon Generated', desc: 'A win-back code or discount is issued for their next service or order.' },
  { icon: Bell, title: 'Team Notified', desc: 'Team alerted instantly with full context to follow up and fix the root cause.' },
];

export default function StarPathSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* 5 Star */}
        <ScrollReveal>
          <div className="mb-12">
            <span className="inline-block text-[12px] font-semibold tracking-[0.15em] uppercase text-teal-500/60 mb-4">
              The 5★ Path
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-3 leading-tight">
              Public Proof Engine
            </h2>
            <p className="text-slate-500 text-sm max-w-lg">
              Every 5★ becomes public proof — end to end. One rating turns into a public reply and 3 pieces of branded content.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-24">
          {fiveStarSteps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="h-full p-5 rounded-2xl border border-teal-500/[0.08] bg-teal-500/[0.02] hover:bg-teal-500/[0.04] hover:border-teal-500/15 transition-all duration-500"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center mb-3">
                  <step.icon className="w-4 h-4 text-teal-400/80" />
                </div>
                <h3 className="text-[13px] font-semibold text-white mb-1.5">{step.title}</h3>
                <p className="text-slate-500 text-[12px] leading-relaxed">{step.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-24">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* Recovery */}
        <ScrollReveal>
          <div className="mb-12">
            <span className="inline-block text-[12px] font-semibold tracking-[0.15em] uppercase text-amber-500/60 mb-4">
              The 1-4★ Path
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-3 leading-tight">
              Private Recovery
            </h2>
            <p className="text-slate-500 text-sm max-w-lg">
              Low ratings become recovered customers. Anything under 5★ stays private and routes to AI.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {recoverySteps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="h-full p-5 rounded-2xl border border-amber-500/[0.08] bg-amber-500/[0.02] hover:bg-amber-500/[0.04] hover:border-amber-500/15 transition-all duration-500"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
                  <step.icon className="w-4 h-4 text-amber-400/80" />
                </div>
                <h3 className="text-[13px] font-semibold text-white mb-1.5">{step.title}</h3>
                <p className="text-slate-500 text-[12px] leading-relaxed">{step.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}