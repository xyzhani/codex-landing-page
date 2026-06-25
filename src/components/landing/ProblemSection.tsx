'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Users, TrendingDown, MapPin, AlertTriangle, Megaphone, EyeOff } from 'lucide-react';

const problems = [
  {
    icon: Users,
    title: 'Happy Customers Leave Silently',
    description: 'Most satisfied buyers never post a review — no one asks them at the right time.',
    color: 'from-red-500/20 to-red-600/5',
    iconColor: 'text-red-400',
    borderColor: 'border-red-500/20',
  },
  {
    icon: TrendingDown,
    title: 'Competitors Pull Ahead',
    description: 'Businesses with 200+ reviews get chosen first, even if your service is better.',
    color: 'from-orange-500/20 to-orange-600/5',
    iconColor: 'text-orange-400',
    borderColor: 'border-orange-500/20',
  },
  {
    icon: MapPin,
    title: 'Invisible on Google Maps',
    description: 'Low review count = lower local SEO ranking = fewer calls and walk-ins.',
    color: 'from-amber-500/20 to-amber-600/5',
    iconColor: 'text-amber-400',
    borderColor: 'border-amber-500/20',
  },
  {
    icon: AlertTriangle,
    title: 'Negative Reviews Go Public',
    description: 'Unhappy customers post online with no warning — and no chance to recover them.',
    color: 'from-rose-500/20 to-rose-600/5',
    iconColor: 'text-rose-400',
    borderColor: 'border-rose-500/20',
  },
  {
    icon: Megaphone,
    title: 'No Social Media Content',
    description: 'Small businesses struggle to post consistently without a content team.',
    color: 'from-pink-500/20 to-pink-600/5',
    iconColor: 'text-pink-400',
    borderColor: 'border-pink-500/20',
  },
  {
    icon: EyeOff,
    title: 'Reviews Sit Unseen',
    description: 'Great Google reviews are hidden — never repurposed into marketing material.',
    color: 'from-slate-500/20 to-slate-600/5',
    iconColor: 'text-slate-400',
    borderColor: 'border-slate-500/20',
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
              THE PROBLEM
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Why Businesses Are <span className="gradient-text-gold">Losing Customers</span> Every Day
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Without automation, your best customers vanish silently and your worst ones become your loudest critics.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <ScrollReveal key={problem.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative h-full p-6 rounded-2xl bg-gradient-to-br ${problem.color} border ${problem.borderColor} backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20`}
              >
                <div className={`w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center mb-4`}>
                  <problem.icon className={`w-6 h-6 ${problem.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{problem.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{problem.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}