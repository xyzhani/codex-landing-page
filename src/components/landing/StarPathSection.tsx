'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ExternalLink, Bot, Instagram, Film, Linkedin, ShieldCheck, MessageSquare, Tag, Bell } from 'lucide-react';

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
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#071a18] to-[#030712]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* 5 Star Path */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4">
              THE 5★ PATH
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Public <span className="gradient-text">Proof Engine</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every 5★ becomes public proof — end to end. One rating turns into a public reply and 3 pieces of branded content.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {fiveStarSteps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ scale: 1.04, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative h-full p-5 rounded-2xl glass border border-teal-500/15 bg-gradient-to-b from-teal-500/10 to-transparent group hover:border-teal-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center mb-3 group-hover:bg-teal-500/30 transition-colors">
                  <step.icon className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                {i < fiveStarSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-teal-500/40 z-10">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-20">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
          <span className="text-slate-500 text-sm font-medium">VS</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
        </div>

        {/* 1-4 Star Recovery Path */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4">
              THE 1-4★ PATH
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Private <span className="gradient-text-gold">Recovery</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Low ratings become recovered customers. Anything under 5★ stays private and routes to AI.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recoverySteps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ scale: 1.04, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative h-full p-5 rounded-2xl glass border border-orange-500/15 bg-gradient-to-b from-orange-500/10 to-transparent group hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center mb-3 group-hover:bg-orange-500/30 transition-colors">
                  <step.icon className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}