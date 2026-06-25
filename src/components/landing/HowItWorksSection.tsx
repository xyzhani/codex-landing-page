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
    accent: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
  },
  {
    num: '02',
    icon: MessageCircle,
    title: 'WhatsApp Review Request',
    description: 'Customer receives: "Hi [Name], thank you for choosing us! Would you be willing to rate your experience?" with Yes / Not Now buttons.',
    accent: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    num: '03',
    icon: Star,
    title: 'Rating Capture',
    description: 'Customer taps their star rating (1–5) directly in WhatsApp — no links, no apps, frictionless.',
    accent: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    num: '04',
    icon: GitBranch,
    title: 'Smart Routing',
    description: '5★ → sent to Google Review link. 1–4★ → private feedback form, support ticket, owner alert. Negative reviews never go public.',
    accent: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    num: '05',
    icon: Bot,
    title: 'AI Replies to the Review',
    description: 'Once a Google review is posted, AI automatically writes a personalized, on-brand reply and publishes it — within minutes, not days.',
    accent: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    num: '06',
    icon: Share2,
    title: 'Social Media Auto-Post',
    description: '5★ review becomes a branded Instagram Story, a Facebook Post, and a LinkedIn Post — all generated and posted automatically.',
    accent: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Step-by-Step <span className="gradient-text">Automation Flow</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/50 via-teal-500/20 to-transparent md:-translate-x-px" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-teal-500 -translate-x-1/2 mt-2 z-10 animate-pulse-glow ring-4 ring-[#030712]" />
                  
                  {/* Content card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}
                  >
                    <div className={`p-6 rounded-2xl glass border ${step.border} ${step.bg} group hover:border-opacity-50 transition-all duration-300`}>
                      <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <span className="text-3xl font-black text-white/10">{step.num}</span>
                        <step.icon className={`w-6 h-6 ${step.accent}`} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}