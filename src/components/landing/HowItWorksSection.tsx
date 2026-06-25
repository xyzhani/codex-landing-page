'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Zap, MessageCircle, Star, GitBranch, Bot, Share2 } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Zap,
    title: 'Trigger',
    description: 'Order or service completed. The system picks it up automatically — works with any CRM, booking system, or store platform.',
  },
  {
    num: '02',
    icon: MessageCircle,
    title: 'WhatsApp Review Request',
    description: 'Customer receives a personalized message with Yes / Not Now buttons — no app download needed.',
  },
  {
    num: '03',
    icon: Star,
    title: 'Rating Capture',
    description: 'Customer taps their star rating (1–5) directly in WhatsApp — no links, no apps, frictionless.',
  },
  {
    num: '04',
    icon: GitBranch,
    title: 'Smart Routing',
    description: '5★ → Google Review link. 1–4★ → private feedback form, support ticket, owner alert. Negative reviews never go public.',
  },
  {
    num: '05',
    icon: Bot,
    title: 'AI Replies to the Review',
    description: 'AI writes a personalized, on-brand reply and publishes within minutes — not days.',
  },
  {
    num: '06',
    icon: Share2,
    title: 'Social Media Auto-Post',
    description: '5★ review becomes a branded Instagram Story, Facebook Post, and LinkedIn Post — all automatically.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d12] to-[#030712]" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="inline-block text-[12px] font-semibold tracking-[0.15em] uppercase text-slate-500 mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight">
              Six steps. <span className="text-slate-500">Zero manual work.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.06}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="group flex items-start gap-6 p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-500"
              >
                <div className="shrink-0 flex items-center gap-4">
                  <span className="text-2xl font-black text-white/[0.04] tabular-nums">{step.num}</span>
                  <div className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] group-hover:border-teal-500/20 group-hover:bg-teal-500/[0.04] flex items-center justify-center transition-all duration-500">
                    <step.icon className="w-5 h-5 text-slate-500 group-hover:text-teal-400 transition-colors duration-500" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-white mb-1.5">{step.title}</h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}