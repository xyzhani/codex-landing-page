'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Instagram, Facebook, Linkedin, Check } from 'lucide-react';

const platforms = [
  {
    icon: Instagram,
    name: 'Instagram',
    format: 'STORY',
    description: 'Text reviews become a branded Story. Reviews with a photo are turned into a video Story automatically.',
    color: 'from-pink-500/20 via-purple-500/10 to-transparent',
    border: 'border-pink-500/20',
    iconColor: 'text-pink-400',
    accentBg: 'bg-gradient-to-br from-purple-600 to-pink-500',
    review: 'Amazing service! Highly recommended.',
    author: 'Sarah M.',
  },
  {
    icon: Facebook,
    name: 'Facebook',
    format: 'POST',
    description: 'Stays on timeline permanently — not 24hr like Stories. Maximum visibility for social proof.',
    color: 'from-blue-500/20 to-transparent',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    accentBg: 'bg-blue-600',
    review: 'Amazing service! Highly recommended.',
    author: 'Sarah M.',
  },
  {
    icon: Linkedin,
    name: 'LinkedIn',
    format: 'POST',
    description: 'Reaches B2B audience & builds professional credibility. Perfect for service-based businesses.',
    color: 'from-sky-500/20 to-transparent',
    border: 'border-sky-500/20',
    iconColor: 'text-sky-400',
    accentBg: 'bg-sky-700',
    review: 'Amazing service! Highly recommended.',
    author: 'Sarah M.',
  },
];

export default function SocialProofSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4">
              SOCIAL PROOF AUTOMATION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              One Review. <span className="gradient-text">Three Platforms.</span> Zero Effort.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Totally customized templates. All three formats generated from the same review automatically.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((platform, i) => (
            <ScrollReveal key={platform.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ scale: 1.04, y: -8, rotateY: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group"
                style={{ perspective: '1000px' }}
              >
                <div className={`relative h-full p-6 rounded-2xl glass border ${platform.border} bg-gradient-to-br ${platform.color} transition-all duration-500 hover:shadow-lg hover:shadow-black/20`}>
                  {/* Platform header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${platform.accentBg} flex items-center justify-center`}>
                        <platform.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold">{platform.name}</p>
                        <p className="text-xs text-slate-400">{platform.format}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-500">{platform.format === 'STORY' ? '24h' : 'PERMANENT'}</span>
                  </div>

                  {/* Mock social card */}
                  <div className="bg-black/30 rounded-xl p-4 mb-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-teal-500/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-teal-300">BR</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white">YourBrand</p>
                        <p className="text-xs text-slate-500">Sponsored</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className="text-yellow-400 text-sm animate-star" style={{ animationDelay: `${s * 0.2}s` }}>★</span>
                      ))}
                    </div>
                    <p className="text-sm text-white/80 italic mb-2">&ldquo;{platform.review}&rdquo;</p>
                    <p className="text-xs text-slate-400">— {platform.author}</p>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">{platform.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom badge */}
        <ScrollReveal delay={0.5}>
          <div className="mt-10 flex items-center justify-center gap-2 text-teal-400">
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">Fully branded, zero manual design work</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}