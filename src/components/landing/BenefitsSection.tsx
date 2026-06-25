'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { AnimatedCounter } from './ScrollReveal';
import { TrendingUp, Eye, Shield, Clock, Users, Zap, Globe, Star } from 'lucide-react';

const benefits = [
  { icon: Star, title: 'More Google Reviews', desc: 'Consistent review growth without any manual effort or chasing customers.', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { icon: TrendingUp, title: 'Better Google Maps Ranking', desc: 'Fresh reviews strengthen local SEO signals and map pack visibility.', color: 'text-teal-400', bg: 'bg-teal-500/10' },
  { icon: Shield, title: 'Reputation Protection', desc: 'Unhappy customers are caught privately before posting negative reviews.', color: 'text-green-400', bg: 'bg-green-500/10' },
  { icon: Zap, title: 'Auto Social Proof Content', desc: 'Every 5★ review becomes a branded Instagram Story automatically.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { icon: Clock, title: 'Saves Hours Every Week', desc: 'No manual follow-ups, no content creation, no chasing customers.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Users, title: 'Higher Conversion Rate', desc: 'New customers trust businesses with many recent, positive reviews.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
];

const stats = [
  { value: 3, suffix: 'x', label: 'Average review growth in first 90 days' },
  { value: 80, suffix: '%', label: 'Open rate on WhatsApp vs 22% email' },
  { value: 4.5, suffix: 'x', label: 'More trust from customers with 50+ reviews' },
  { value: 100, suffix: '%', label: 'Automated — zero manual work required' },
];

export default function BenefitsSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#071a18] to-[#030712]" />

      {/* Benefits Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4">
              BUSINESS BENEFITS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              What Your Client Gets <span className="gradient-text">From Day One</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative h-full p-6 rounded-2xl glass border border-white/5 hover:border-teal-500/20 transition-all duration-300 group"
              >
                <div className={`w-11 h-11 rounded-xl ${b.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <b.icon className={`w-5 h-5 ${b.color}`} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* ROI Stats */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4">
              RETURN ON INVESTMENT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              The Value Chain <span className="gradient-text">in Action</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Flow chain */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14 text-xs sm:text-sm">
            {['Order Completed', 'WhatsApp Request', '5★ Review', 'Higher SEO Rank', 'Story Posted', 'New Customers'].map((item, i, arr) => (
              <div key={item} className="flex items-center gap-2 sm:gap-3">
                <span className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-300 font-medium whitespace-nowrap">
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-teal-500/40">→</span>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.12}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="p-6 rounded-2xl glass border border-teal-500/15 bg-gradient-to-b from-teal-500/10 to-transparent text-center group hover:border-teal-500/30 transition-all duration-300"
              >
                <div className="text-4xl sm:text-5xl font-black text-white mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{stat.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}