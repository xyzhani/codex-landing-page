'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { ShoppingCart, MessageCircle, Star, Globe, Bot, Share2, ShieldCheck, Tag } from 'lucide-react';

const flowSteps = [
  { icon: ShoppingCart, label: 'Order Completes', color: 'bg-teal-500' },
  { icon: MessageCircle, label: 'WhatsApp Request Sent', color: 'bg-green-500' },
  { icon: Star, label: 'Customer Rates', color: 'bg-yellow-500' },
  { icon: Globe, label: 'Google Review Posted', color: 'bg-blue-500' },
  { icon: Bot, label: 'AI Replies to Review', color: 'bg-purple-500' },
  { icon: Share2, label: 'Posted on Social Media', color: 'bg-pink-500' },
];

export default function SolutionSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#071a18] to-[#030712]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4">
              THE SOLUTION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              A Fully Automated <span className="gradient-text">Reputation Engine</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From order completion to social proof — everything happens automatically.
            </p>
          </div>
        </ScrollReveal>

        {/* Flow visualization */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {flowSteps.map((step, i) => (
              <ScrollReveal key={step.label} delay={i * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.08, y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Glow ring */}
                  <div className="absolute -inset-3 rounded-2xl bg-teal-500/0 group-hover:bg-teal-500/10 transition-all duration-500 blur-xl" />
                  
                  <div className="relative w-20 h-20 rounded-2xl glass flex items-center justify-center mb-4 group-hover:animate-border-glow border border-white/10 transition-all duration-300">
                    <step.icon className="w-8 h-8 text-teal-400 group-hover:text-teal-300 transition-colors" />
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-teal-500 text-gray-950 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                  </div>
                  
                  <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors leading-tight">
                    {step.label}
                  </p>
                  
                  {i < flowSteps.length - 1 && (
                    <div className="lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 text-teal-500/50">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Negative review recovery banner */}
        <ScrollReveal delay={0.6}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-6 rounded-2xl glass border border-orange-500/20 bg-gradient-to-r from-orange-500/10 to-amber-500/5"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-3 shrink-0">
                <ShieldCheck className="w-8 h-8 text-orange-400" />
                <Tag className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Rating below 5 stars? No problem.</h4>
                <p className="text-slate-400 text-sm">
                  Feedback captured privately → Support ticket created → Owner notified →{' '}
                  <span className="text-orange-300 font-medium">Customer recovered before going public</span>
                </p>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}