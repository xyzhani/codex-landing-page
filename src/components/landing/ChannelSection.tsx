'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { MessageCircle, Smartphone, Mail, Clock, ArrowRight, Zap } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const channels = [
  {
    icon: MessageCircle,
    name: 'WhatsApp',
    tag: 'Primary',
    description: '80% open rate, instant reply buttons. The channel your customers actually use.',
    stat: '80%',
    statLabel: 'Open Rate',
    color: '#25D366',
  },
  {
    icon: Smartphone,
    name: 'SMS',
    tag: 'Fallback',
    description: 'For customers without WhatsApp \u2014 universal reach ensures no one is missed.',
    stat: '100%',
    statLabel: 'Reach',
    color: '#3B82F6',
  },
  {
    icon: Mail,
    name: 'Email',
    tag: 'Rich',
    description: 'Branded request with one-tap rating links for a premium experience.',
    stat: 'Branded',
    statLabel: 'Template',
    color: '#A855F7',
  },
];

/* ------------------------------------------------------------------ */
/*  3D Channel Card                                                    */
/* ------------------------------------------------------------------ */

function ChannelCard({ channel, index }: { channel: typeof channels[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);

  const conic = `conic-gradient(from var(--border-angle), transparent 0%, ${channel.color}40 5%, transparent 15%, transparent 85%, ${channel.color}40 95%, transparent 100%)`;

  return (
    <motion.div
      ref={ref}
      style={{ perspective: 1200, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        whileHover={{
          scale: 1.03,
          rotateX: -3,
          rotateY: 3,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        className="relative h-full rounded-2xl p-[1px] cursor-default"
        style={{ background: conic, animation: 'rotateBorder 4s linear infinite' }}
      >
        <div
          className="relative h-full rounded-[15px] p-6 overflow-hidden"
          style={{
            background: 'rgba(3,7,18,0.9)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Glow orb */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${channel.color}15, transparent 70%)`,
              filter: 'blur(30px)',
            }}
          />

          <div className="relative z-10">
            {/* Top row */}
            <div className="flex items-start justify-between mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: `${channel.color}12`,
                  boxShadow: `0 0 24px ${channel.color}15`,
                }}
              >
                <channel.icon className="w-5 h-5" style={{ color: channel.color }} />
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border" style={{ borderColor: `${channel.color}25`, color: `${channel.color}99` }}>
                {channel.tag}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">{channel.name}</h3>
            <p className="text-white/50 text-[13px] leading-relaxed mb-6">{channel.description}</p>

            {/* Stat */}
            <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
              <motion.span
                className="text-2xl font-bold"
                style={{ color: channel.color }}
                whileHover={{ scale: 1.1 }}
              >
                {channel.stat}
              </motion.span>
              <span className="text-[11px] text-white/30">{channel.statLabel}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function ChannelSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ['start end', 'end start'] });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-[20%] w-[500px] h-[300px] rounded-full bg-emerald-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[15%] w-[400px] h-[250px] rounded-full bg-purple-500/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div ref={headerRef} style={{ opacity: headerOpacity }} className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-emerald-400/70 text-[11px] font-semibold tracking-[0.15em] uppercase mb-5">
            Channel-Agnostic
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-5 leading-tight">
            Smart Follow-Up{' '}
            <span className="bg-gradient-to-r from-[#14f0c8] to-[#14b8a6] bg-clip-text text-transparent">
              on any channel
            </span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
            Start on WhatsApp \u2014 reach customers everywhere. Same logic, same routing.
          </p>
        </motion.div>

        {/* Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {channels.map((channel, i) => (
            <ChannelCard key={channel.name} channel={channel} index={i} />
          ))}
        </div>

        {/* Follow-up notice with rotating border */}
        <ScrollReveal delay={0.3}>
          <motion.div
            whileHover={{ scale: 1.01, y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative max-w-3xl mx-auto rounded-2xl p-[1px]"
            style={{
              background: 'conic-gradient(from var(--border-angle), transparent 0%, #14f0c830 5%, transparent 15%, transparent 85%, #14b8a630 95%, transparent 100%)',
              animation: 'rotateBorder 5s linear infinite',
            }}
          >
            <div
              className="relative rounded-[15px] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 overflow-hidden"
              style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(20px)' }}
            >
              {/* Inner glow */}
              <div
                className="absolute -left-10 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(20,240,200,0.06), transparent 70%)' }}
              />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative z-10"
                style={{ background: 'rgba(20,240,200,0.08)', boxShadow: '0 0 24px rgba(20,240,200,0.1)' }}
              >
                <Clock className="w-5 h-5 text-teal-400" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <h4 className="text-[14px] font-semibold text-white">No response? Automatic follow-up after 2 days.</h4>
                </div>
                <p className="text-white/50 text-[13px] leading-relaxed">
                  One gentle reminder on the same channel. Still no reply \u2014 closed out automatically. No customer is ever pestered.
                </p>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
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