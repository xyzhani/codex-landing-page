'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Instagram, Facebook, Linkedin, Check } from 'lucide-react';

const platforms = [
  {
    icon: Instagram,
    name: 'Instagram',
    format: 'STORY',
    desc: 'Text reviews become a branded Story. Photo reviews turn into a video Story automatically.',
    accentBg: 'bg-gradient-to-br from-purple-600 to-pink-500',
    duration: '24h',
  },
  {
    icon: Facebook,
    name: 'Facebook',
    format: 'POST',
    desc: 'Stays on timeline permanently — not 24hr like Stories. Maximum visibility for social proof.',
    accentBg: 'bg-blue-600',
    duration: 'PERMANENT',
  },
  {
    icon: Linkedin,
    name: 'LinkedIn',
    format: 'POST',
    desc: 'Reaches B2B audience & builds professional credibility. Perfect for service-based businesses.',
    accentBg: 'bg-sky-700',
    duration: 'PERMANENT',
  },
];

export default function SocialProofSection() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d12] to-[#030712]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[12px] font-semibold tracking-[0.15em] uppercase text-slate-500 mb-4">
              Social Proof Automation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-5 leading-tight">
              One review. <span className="bg-gradient-to-r from-[#14f0c8] to-[#14b8a6] bg-clip-text text-transparent">Three platforms.</span> Zero effort.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="h-full p-6 rounded-2xl border border-white/[0.05] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${p.accentBg} flex items-center justify-center`}>
                      <p.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{p.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{p.format}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-600 font-medium">{p.duration}</span>
                </div>

                {/* Mock card */}
                <div className="bg-black/30 rounded-xl p-4 mb-4 border border-white/[0.03]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <span className="text-[9px] font-bold text-teal-300">CSI</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-white">Codex Solutions Int.</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} className="text-yellow-400 text-xs animate-star" style={{ animationDelay: `${s * 0.15}s` }}>★</span>
                    ))}
                  </div>
                  <p className="text-[12px] text-white/70 italic">&ldquo;Amazing service! Highly recommended.&rdquo;</p>
                  <p className="text-[11px] text-slate-500 mt-1">— Sarah M.</p>
                </div>

                <p className="text-slate-500 text-[12px] leading-relaxed">{p.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-[12px]">
            <Check className="w-3.5 h-3.5 text-teal-500/60" />
            <span>Fully branded, zero manual design work</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}