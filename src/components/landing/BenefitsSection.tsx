'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { AnimatedCounter } from './ScrollReveal';
import { Star, TrendingUp, Shield, Clock, Users, Zap } from 'lucide-react';

const benefits = [
  { icon: Star, title: 'More Google Reviews', desc: 'Consistent review growth without manual effort or chasing customers.' },
  { icon: TrendingUp, title: 'Better Google Maps Ranking', desc: 'Fresh reviews strengthen local SEO signals and map pack visibility.' },
  { icon: Shield, title: 'Reputation Protection', desc: 'Unhappy customers caught privately before negative reviews go public.' },
  { icon: Zap, title: 'Auto Social Proof Content', desc: 'Every 5★ review becomes a branded Instagram Story automatically.' },
  { icon: Clock, title: 'Saves Hours Every Week', desc: 'No manual follow-ups, no content creation, no chasing customers.' },
  { icon: Users, title: 'Higher Conversion Rate', desc: 'Customers trust businesses with many recent, positive reviews.' },
];

const stats = [
  { value: 3, suffix: 'x', label: 'Average review growth\nin first 90 days' },
  { value: 80, suffix: '%', label: 'Open rate on WhatsApp\nvs 22% email' },
  { value: 4.5, suffix: 'x', label: 'More trust from customers\nwith 50+ reviews' },
  { value: 100, suffix: '%', label: 'Automated — zero\nmanual work' },
];

export default function BenefitsSection() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d12] to-[#030712]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Benefits */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="inline-block text-[12px] font-semibold tracking-[0.15em] uppercase text-slate-500 mb-4">
              Business Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight">
              What your clients get
              <span className="text-slate-500"> from day one</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="group h-full p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-500"
              >
                <div className="w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.02] group-hover:border-teal-500/20 group-hover:bg-teal-500/[0.04] flex items-center justify-center mb-4 transition-all duration-500">
                  <b.icon className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors duration-500" />
                </div>
                <h3 className="text-[14px] font-semibold text-white mb-1.5">{b.title}</h3>
                <p className="text-slate-500 text-[13px] leading-relaxed">{b.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* ROI */}
        <ScrollReveal>
          <div className="mb-12">
            <span className="inline-block text-[12px] font-semibold tracking-[0.15em] uppercase text-slate-500 mb-4">
              Return on Investment
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight">
              The value chain
              <span className="text-slate-500"> in action</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
            {['Order Completed', '→', 'WhatsApp Request', '→', '5★ Review on Google', '→', 'Higher SEO Rank', '→', 'Story Posted', '→', 'New Customers Convert'].map((item, i) => (
              <span
                key={i}
                className={`text-[12px] font-medium px-3 py-1.5 rounded-lg ${
                  item === '→'
                    ? 'text-slate-600'
                    : 'border border-white/[0.05] bg-white/[0.02] text-slate-300'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] text-center group hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-500">
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-500 text-[12px] leading-relaxed whitespace-pre-line">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}