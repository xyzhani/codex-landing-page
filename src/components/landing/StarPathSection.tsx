'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { ExternalLink, Bot, Instagram, Film, ShieldCheck, MessageSquare, Tag, Bell, ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const fiveStarSteps = [
  { icon: ExternalLink, title: 'Redirect to Review', desc: 'Sent to your Google review link — or an internal form / private WhatsApp instead.' },
  { icon: Bot, title: 'AI Auto-Response', desc: 'AI replies on-brand — tailored to your business and the words of their review.' },
  { icon: Instagram, title: 'Instagram Story', desc: 'Text reviews become a branded Story. Photo reviews turn into a video Story automatically.' },
  { icon: Film, title: 'Reel + LinkedIn', desc: 'Photo reviews post as an Instagram Reel — and to LinkedIn for B2B credibility.' },
];

const recoverySteps = [
  { icon: MessageSquare, title: 'Routed to AI', desc: '1-4\u2605 is kept off public platforms and handed to AI for handling.' },
  { icon: ShieldCheck, title: 'Tailored Reply', desc: 'AI captures what went wrong and replies with empathy \u2014 tied to service and team.' },
  { icon: Tag, title: 'Coupon Generated', desc: 'A win-back code or discount is issued for their next service or order.' },
  { icon: Bell, title: 'Team Notified', desc: 'Team alerted instantly with full context to follow up and fix the root cause.' },
];

/* ------------------------------------------------------------------ */
/*  Animated glow card with rotating border                            */
/* ------------------------------------------------------------------ */

function GlowCard({
  children,
  accent = 'teal',
  delay = 0,
  index = 0,
}: {
  children: React.ReactNode;
  accent?: 'teal' | 'amber';
  delay?: number;
  index?: number;
}) {
  const color = accent === 'teal'
    ? { border: 'rgba(20,240,200,0.15)', glow: 'rgba(20,240,200,0.06)', iconBg: 'rgba(20,240,200,0.1)', iconColor: '#14f0c8' }
    : { border: 'rgba(251,191,36,0.15)', glow: 'rgba(251,191,36,0.06)', iconBg: 'rgba(251,191,36,0.1)', iconColor: '#fbbf24' };

  const conic = accent === 'teal'
    ? 'conic-gradient(from var(--border-angle), transparent 0%, #14f0c8 5%, transparent 15%, transparent 85%, #14b8a6 95%, transparent 100%)'
    : 'conic-gradient(from var(--border-angle), transparent 0%, #fbbf24 5%, transparent 15%, transparent 85%, #f97316 95%, transparent 100%)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: delay + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -8,
        rotateX: -2,
        rotateY: 4,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className={`animate-card-float animate-float-delay-${(index % 3) + 1}`}
    >
      <div
        className="relative h-full rounded-xl sm:rounded-2xl p-[1px]"
        style={{
          background: conic,
          animation: 'rotateBorder 4s linear infinite',
        }}
      >
        <div
          className="relative h-full rounded-[8px] sm:rounded-[15px] p-2.5 sm:p-5 overflow-hidden"
          style={{
            background: 'rgba(3,7,18,0.85)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 rounded-[15px] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 200px 120px at 30% 20%, ${color.glow}, transparent)`,
            }}
          />
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated divider with traveling light                              */
/* ------------------------------------------------------------------ */

function AnimatedDivider() {
  return (
    <div className="relative flex items-center gap-3 sm:gap-4 my-5 sm:my-10 lg:my-16">
      <div className="flex-1 h-px bg-white/[0.04] overflow-hidden">
        <motion.div
          className="h-full w-32 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"
          initial={{ x: -200 }}
          whileInView={{ x: 'calc(100% + 200px)' }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }}
        />
      </div>
      <div className="relative w-8 h-8 rounded-full border border-white/[0.08] bg-[#030712] flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-teal-400/60" style={{ boxShadow: '0 0 12px rgba(20,240,200,0.5)' }} />
      </div>
      <div className="flex-1 h-px bg-white/[0.04] overflow-hidden">
        <motion.div
          className="h-full w-32 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"
          initial={{ x: 'calc(100% + 200px)' }}
          whileInView={{ x: -200 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Header with parallax                                       */
/* ------------------------------------------------------------------ */

function SectionHeader({
  badge,
  badgeColor = 'text-teal-400/70',
  title,
  titleAccent,
  desc,
  align = 'left',
}: {
  badge: string;
  badgeColor?: string;
  title: string;
  titleAccent?: string;
  desc: string;
  align?: 'left' | 'center';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <motion.div ref={ref} style={{ opacity }} className={`mb-4 sm:mb-8 lg:mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      <span className={`inline-block px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[9px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase ${badgeColor} mb-3 sm:mb-5`}>
        {badge}
      </span>
      <h2 className="text-[18px] sm:text-3xl md:text-[2.75rem] font-bold text-white mb-3 sm:mb-4 leading-tight">
        {titleAccent ? (
          <>
            {title} <span className="bg-gradient-to-r from-[#14f0c8] to-[#14b8a6] bg-clip-text text-transparent">{titleAccent}</span>
          </>
        ) : (
          title
        )}
      </h2>
      <p className="text-white/60 text-[11px] sm:text-sm max-w-lg leading-relaxed" style={align === 'center' ? { margin: '0 auto' } : {}}>
        {desc}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function StarPathSection() {
  return (
    <section className="relative py-8 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />

      {/* Ambient glow orbs */}
      <div className="absolute top-20 left-[10%] w-[400px] h-[400px] rounded-full bg-teal-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-[350px] h-[350px] rounded-full bg-amber-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* 5 Star Path */}
        <SectionHeader
          badge="The 5\u2605 Path"
          badgeColor="text-teal-400/70"
          title="Public Proof Engine"
          desc="Every 5\u2605 becomes public proof \u2014 end to end. One rating turns into a public reply and 3 pieces of branded content."
        />

        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
          {fiveStarSteps.map((step, i) => (
            <GlowCard key={step.title} accent="teal" index={i}>
              <div className="flex items-center gap-1.5 sm:gap-3 mb-2 sm:mb-3">
                <div
                  className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(20,240,200,0.08)', boxShadow: '0 0 20px rgba(20,240,200,0.1)' }}
                >
                  <step.icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#14f0c8' }} />
                </div>
                <span className="text-[8px] sm:text-[10px] font-bold text-white/20 tracking-wider">0{i + 1}</span>
              </div>
              <h3 className="text-[11px] sm:text-[14px] font-semibold text-white mb-1 sm:mb-1.5">{step.title}</h3>
              <p className="text-white/50 text-[9px] sm:text-[12px] leading-relaxed">{step.desc}</p>
            </GlowCard>
          ))}
        </div>

        {/* Animated divider */}
        <AnimatedDivider />

        {/* Recovery Path */}
        <SectionHeader
          badge="The 1-4\u2605 Path"
          badgeColor="text-amber-400/70"
          title="Private Recovery"
          desc="Low ratings become recovered customers. Anything under 5\u2605 stays private and routes to AI."
        />

        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
          {recoverySteps.map((step, i) => (
            <GlowCard key={step.title} accent="amber" index={i}>
              <div className="flex items-center gap-1.5 sm:gap-3 mb-2 sm:mb-3">
                <div
                  className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(251,191,36,0.08)', boxShadow: '0 0 20px rgba(251,191,36,0.1)' }}
                >
                  <step.icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#fbbf24' }} />
                </div>
                <span className="text-[8px] sm:text-[10px] font-bold text-white/20 tracking-wider">0{i + 1}</span>
              </div>
              <h3 className="text-[11px] sm:text-[14px] font-semibold text-white mb-1 sm:mb-1.5">{step.title}</h3>
              <p className="text-white/50 text-[9px] sm:text-[12px] leading-relaxed">{step.desc}</p>
            </GlowCard>
          ))}
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