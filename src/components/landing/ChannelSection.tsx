'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { MessageCircle, Smartphone, Mail, Clock } from 'lucide-react';

const channels = [
  {
    icon: MessageCircle,
    name: 'WhatsApp',
    tag: 'DEFAULT CHANNEL',
    description: '80% open rate, instant reply buttons. The channel your customers actually use.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    stat: '80%',
    statLabel: 'Open Rate',
  },
  {
    icon: Smartphone,
    name: 'SMS',
    tag: 'FALLBACK',
    description: 'For customers without WhatsApp — universal reach ensures no one is missed.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    stat: '100%',
    statLabel: 'Reach',
  },
  {
    icon: Mail,
    name: 'Email',
    tag: 'RICH REQUEST',
    description: 'Rich, branded request with one-tap rating links for a premium experience.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    stat: 'Branded',
    statLabel: 'Template',
  },
];

export default function ChannelSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4">
              CHANNEL-AGNOSTIC
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Smart <span className="gradient-text">Follow-Up</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Start on WhatsApp — reach customers anywhere. Same logic, same routing.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {channels.map((channel, i) => (
            <ScrollReveal key={channel.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`relative h-full p-6 rounded-2xl glass border ${channel.border} ${channel.bg} group hover:border-opacity-60 transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center`}>
                    <channel.icon className={`w-6 h-6 ${channel.color}`} />
                  </div>
                  <span className={`text-xs font-bold ${channel.color} opacity-70`}>{channel.tag}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{channel.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{channel.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${channel.color}`}>{channel.stat}</span>
                  <span className="text-xs text-slate-500">{channel.statLabel}</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Follow-up info */}
        <ScrollReveal delay={0.4}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-6 rounded-2xl glass border border-teal-500/10 bg-teal-500/5 flex flex-col md:flex-row items-start md:items-center gap-4"
          >
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">No response? Automatic follow-up after 2 days.</h4>
              <p className="text-slate-400 text-sm">
                One gentle reminder sent on the same channel. Still no reply — the contact is closed out automatically, so no customer is ever pestered.
              </p>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}