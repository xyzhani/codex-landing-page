'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { MessageCircle, Smartphone, Mail, Clock } from 'lucide-react';

const channels = [
  {
    icon: MessageCircle,
    name: 'WhatsApp',
    tag: 'Primary',
    description: '80% open rate, instant reply buttons. The channel your customers actually use.',
    stat: '80%',
    statLabel: 'Open Rate',
  },
  {
    icon: Smartphone,
    name: 'SMS',
    tag: 'Fallback',
    description: 'For customers without WhatsApp — universal reach ensures no one is missed.',
    stat: '100%',
    statLabel: 'Reach',
  },
  {
    icon: Mail,
    name: 'Email',
    tag: 'Rich',
    description: 'Branded request with one-tap rating links for a premium experience.',
    stat: 'Branded',
    statLabel: 'Template',
  },
];

export default function ChannelSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[12px] font-semibold tracking-[0.15em] uppercase text-slate-500 mb-4">
              Channel-Agnostic
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-5 leading-tight">
              Smart Follow-Up
              <span className="text-slate-500"> on any channel</span>
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              Start on WhatsApp — reach customers everywhere. Same logic, same routing.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {channels.map((channel, i) => (
            <ScrollReveal key={channel.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="group h-full p-6 rounded-2xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] group-hover:border-teal-500/20 group-hover:bg-teal-500/[0.04] flex items-center justify-center transition-all duration-500">
                    <channel.icon className="w-5 h-5 text-slate-400 group-hover:text-teal-400 transition-colors duration-500" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-600">{channel.tag}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{channel.name}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed mb-5">{channel.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-teal-400">{channel.stat}</span>
                  <span className="text-[11px] text-slate-600">{channel.statLabel}</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="max-w-3xl mx-auto p-5 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/[0.06] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-teal-400/70" />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-white mb-1">No response? Automatic follow-up after 2 days.</h4>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                One gentle reminder on the same channel. Still no reply — closed out automatically. No customer is ever pestered.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}