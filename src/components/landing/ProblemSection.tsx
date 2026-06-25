'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Users, TrendingDown, MapPin, AlertTriangle, Megaphone, EyeOff } from 'lucide-react';

const problems = [
  {
    icon: Users,
    title: 'Happy Customers Leave Silently',
    description: 'Most satisfied buyers never post a review — no one asks them at the right time.',
    accent: '#f87171',
  },
  {
    icon: TrendingDown,
    title: 'Competitors Pull Ahead',
    description: 'Businesses with 200+ reviews get chosen first, even if your service is better.',
    accent: '#fb923c',
  },
  {
    icon: MapPin,
    title: 'Invisible on Google Maps',
    description: 'Low review count = lower local SEO ranking = fewer calls and walk-ins.',
    accent: '#fbbf24',
  },
  {
    icon: AlertTriangle,
    title: 'Negative Reviews Go Public',
    description: 'Unhappy customers post online with no warning — and no chance to recover them.',
    accent: '#f472b6',
  },
  {
    icon: Megaphone,
    title: 'No Social Media Content',
    description: 'Small businesses struggle to post consistently without a content team.',
    accent: '#c084fc',
  },
  {
    icon: EyeOff,
    title: 'Reviews Sit Unseen',
    description: 'Great Google reviews are hidden — never repurposed into marketing material.',
    accent: '#94a3b8',
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#050a0f] to-[#030712]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <span className="inline-block text-[12px] font-semibold tracking-[0.15em] uppercase text-slate-500 mb-4">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-5 leading-tight">
              Businesses are losing customers
              <span className="text-slate-500"> every single day</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Without automation, your best customers vanish silently and your worst ones become your loudest critics.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem, i) => (
            <ScrollReveal key={problem.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="group relative p-6 rounded-2xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-500"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${problem.accent}15` }}
                >
                  <problem.icon className="w-5 h-5" style={{ color: problem.accent }} />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2 leading-snug">{problem.title}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed">{problem.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}