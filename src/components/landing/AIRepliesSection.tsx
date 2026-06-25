'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { Bot, Globe, BarChart3, UserCheck, MessageCircle, Sparkles } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features = [
  { icon: MessageCircle, title: 'Custom Brand Voice', desc: "Set tone: professional, friendly, casual, luxury \u2014 AI writes in your client's style every time." },
  { icon: Globe, title: 'Language & Market', desc: "Configure replies in any language to match your client's customer base." },
  { icon: BarChart3, title: 'Smart Reply Rules', desc: 'Different response templates for 5\u2605, 4\u2605, and 3\u2605 or below \u2014 each handled appropriately.' },
  { icon: UserCheck, title: 'Owner Approval Mode', desc: 'Every reply sent for review before posting \u2014 full control, no surprises.' },
  { icon: Bot, title: 'Business-Specific Info', desc: 'AI references business name, services, team, location \u2014 never sounds generic.' },
];

const flowItems = [
  { icon: '\u2B50', text: 'New Google review posted', sub: '5\u2605 or less' },
  { icon: '\uD83E\uDD16', text: 'AI reads the review', sub: 'content + star rating' },
  { icon: '\uD83E\uDDE0', text: 'Generates personalized reply', sub: 'on-brand, contextual' },
  { icon: '\u2705', text: 'Posted automatically', sub: 'or sent for approval' },
  { icon: '\u23F1', text: 'Within minutes', sub: 'not days' },
];

/* ------------------------------------------------------------------ */
/*  Flow step with animated connection line                            */
/* ------------------------------------------------------------------ */

function FlowStep({ item, index }: { item: typeof flowItems[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-start gap-4"
    >
      {/* Connection line */}
      {index < flowItems.length - 1 && (
        <div className="absolute left-[18px] top-10 w-px h-[calc(100%+4px)] bg-gradient-to-b from-teal-400/30 to-teal-400/5" />
      )}

      {/* Step dot */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="relative z-10 w-9 h-9 rounded-xl bg-[#030712] border border-teal-400/20 flex items-center justify-center shrink-0 text-sm"
        style={{ boxShadow: '0 0 16px rgba(20,240,200,0.1)' }}
      >
        {item.icon}
        {/* Pulse ring */}
        {index === 2 && (
          <motion.div
            className="absolute inset-0 rounded-xl border border-teal-400/30"
            animate={{ scale: [1, 1.3], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.div>

      {/* Text */}
      <div className="pt-1 pb-5">
        <p className="text-[14px] font-semibold text-white">{item.text}</p>
        <p className="text-[11px] text-white/40 mt-0.5">{item.sub}</p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature card with rotating border                                  */
/* ------------------------------------------------------------------ */

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        whileHover={{ x: 4, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative h-full rounded-2xl p-[1px] group cursor-default"
        style={{
          background: 'conic-gradient(from var(--border-angle), transparent 0%, #14f0c825 5%, transparent 15%, transparent 85%, #14b8a625 95%, transparent 100%)',
          animation: 'rotateBorder 5s linear infinite',
        }}
      >
        <div
          className="relative h-full rounded-[15px] p-4 flex items-start gap-4 overflow-hidden"
          style={{ background: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(12px)' }}
        >
          {/* Hover glow */}
          <div className="absolute inset-0 rounded-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 200px 100px at 20% 50%, rgba(20,240,200,0.04), transparent)' }}
          />

          <div className="relative z-10 w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-teal-400/20 group-hover:bg-teal-400/[0.06] transition-all duration-500">
            <feature.icon className="w-4 h-4 text-white/40 group-hover:text-teal-400 transition-colors duration-500" />
          </div>
          <div className="relative z-10 min-w-0">
            <h4 className="text-[13px] font-semibold text-white mb-0.5">{feature.title}</h4>
            <p className="text-[12px] text-white/45 leading-relaxed">{feature.desc}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function AIRepliesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ['start end', 'end start'] });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section className="relative py-16 sm:py-24 md:py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-[30%] w-[500px] h-[300px] rounded-full bg-teal-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[20%] w-[400px] h-[250px] rounded-full bg-indigo-500/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div ref={headerRef} style={{ opacity: headerOpacity }} className="mb-10 sm:mb-16">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-teal-400/60" />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-teal-400/70">
              AI-Powered
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight">
            AI replies to{' '}
            <span className="bg-gradient-to-r from-[#14f0c8] to-[#14b8a6] bg-clip-text text-transparent">
              every Google review
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Flow Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-2xl p-[1px] overflow-hidden"
              style={{
                background: 'conic-gradient(from var(--border-angle), transparent 0%, #14f0c815 5%, transparent 15%, transparent 85%, #14b8a615 95%, transparent 100%)',
                animation: 'rotateBorder 6s linear infinite',
              }}
            >
              <div
                className="relative rounded-[15px] p-6"
                style={{ background: 'rgba(3,7,18,0.7)', backdropFilter: 'blur(20px)' }}
              >
                <h3 className="text-[12px] font-semibold tracking-wider uppercase text-teal-400/60 mb-8">How It Works</h3>
                <div>
                  {flowItems.map((item, i) => (
                    <FlowStep key={item.text} item={item} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-[12px] font-semibold tracking-wider uppercase text-teal-400/60 mb-6">Fully Customizable Per Client</h3>
            <div className="space-y-3">
              {features.map((f, i) => (
                <FeatureCard key={f.title} feature={f} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes rotateBorder {
          0% { --border-angle: 0deg; }
          100% { --border-angle: 360deg; }
        }
      `}</style>
    </section>
  );
}