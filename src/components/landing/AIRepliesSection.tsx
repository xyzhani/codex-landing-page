'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Bot, Globe, BarChart3, UserCheck, MessageCircle } from 'lucide-react';

const features = [
  { icon: MessageCircle, title: 'Custom Brand Voice', desc: 'Set tone: professional, friendly, casual, luxury — AI writes in your client\'s style every time.' },
  { icon: Globe, title: 'Language & Market', desc: 'Configure replies in any language to match your client\'s customer base.' },
  { icon: BarChart3, title: 'Smart Reply Rules', desc: 'Different response templates for 5★, 4★, and 3★ or below — each handled appropriately.' },
  { icon: UserCheck, title: 'Owner Approval Mode', desc: 'Every reply sent for review before posting — full control, no surprises.' },
  { icon: Bot, title: 'Business-Specific Info', desc: 'AI references business name, services, team, location — never sounds generic.' },
];

const flowItems = [
  { icon: '⭐', text: 'New Google review posted', sub: '5★ or less' },
  { icon: '🤖', text: 'AI reads the review', sub: 'content + star rating' },
  { icon: '🧠', text: 'Generates personalized reply', sub: 'on-brand, contextual' },
  { icon: '✅', text: 'Posted automatically', sub: 'or sent for approval' },
  { icon: '⏱', text: 'Within minutes', sub: 'not days' },
];

export default function AIRepliesSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <div className="mb-16">
            <span className="inline-block text-[12px] font-semibold tracking-[0.15em] uppercase text-slate-500 mb-4">
              AI-Powered
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight">
              AI replies to
              <span className="text-slate-500"> every Google review</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Flow */}
          <ScrollReveal direction="left">
            <div className="p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
              <h3 className="text-[12px] font-semibold tracking-wider uppercase text-slate-500 mb-6">How It Works</h3>
              <div className="space-y-5">
                {flowItems.map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center shrink-0 text-sm">
                      {item.icon}
                    </div>
                    <div className="pt-1">
                      <p className="text-[13px] font-medium text-white">{item.text}</p>
                      <p className="text-[11px] text-slate-600">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Features */}
          <ScrollReveal direction="right">
            <div>
              <h3 className="text-[12px] font-semibold tracking-wider uppercase text-slate-500 mb-6">Fully Customizable Per Client</h3>
              <div className="space-y-3">
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-center shrink-0 mt-0.5">
                      <f.icon className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-semibold text-white mb-0.5">{f.title}</h4>
                      <p className="text-[12px] text-slate-500 leading-relaxed">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}