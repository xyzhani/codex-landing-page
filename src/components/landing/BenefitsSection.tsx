'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal, { AnimatedCounter } from './ScrollReveal';
import { Star, TrendingUp, Shield, Clock, Users, Zap, ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const benefits = [
  { icon: Star, title: 'More Google Reviews', desc: 'Consistent review growth without manual effort or chasing customers.' },
  { icon: TrendingUp, title: 'Better Google Maps Ranking', desc: 'Fresh reviews strengthen local SEO signals and map pack visibility.' },
  { icon: Shield, title: 'Reputation Protection', desc: 'Unhappy customers caught privately before negative reviews go public.' },
  { icon: Zap, title: 'Auto Social Proof Content', desc: 'Every 5\u2605 review becomes a branded Instagram Story automatically.' },
  { icon: Clock, title: 'Saves Hours Every Week', desc: 'No manual follow-ups, no content creation, no chasing customers.' },
  { icon: Users, title: 'Higher Conversion Rate', desc: 'Customers trust businesses with many recent, positive reviews.' },
];

const stats = [
  { value: 3, suffix: 'x', label: 'Average review growth\nin first 90 days', color: '#14f0c8' },
  { value: 80, suffix: '%', label: 'Open rate on WhatsApp\nvs 22% email', color: '#25D366' },
  { value: 4.5, suffix: 'x', label: 'More trust from customers\nwith 50+ reviews', color: '#14b8a6' },
  { value: 100, suffix: '%', label: 'Automated \u2014 zero\nmanual work', color: '#2dd4bf' },
];

const chainSteps = [
  'Order Completed',
  'WhatsApp Request',
  '5\u2605 Review on Google',
  'Higher SEO Rank',
  'Story Posted',
  'New Customers Convert',
];

/* ------------------------------------------------------------------ */
/*  Benefit card with rotating border + 3D                             */
/* ------------------------------------------------------------------ */

function BenefitCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`animate-card-float animate-float-delay-${(index % 3) + 1}`}
    >
      <motion.div
        whileHover={{
          y: -6,
          rotateX: -2,
          rotateY: 3,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      >
        <div
          className="relative h-full rounded-2xl p-[1px] group cursor-default"
          style={{
            background: 'conic-gradient(from var(--border-angle), transparent 0%, #14f0c820 5%, transparent 15%, transparent 85%, #14b8a620 95%, transparent 100%)',
            animation: 'rotateBorder 4s linear infinite',
          }}
        >
          <div
            className="relative h-full rounded-[15px] p-6 overflow-hidden"
            style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(20px)' }}
          >
            {/* Hover glow */}
            <div
              className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: 'radial-gradient(circle, rgba(20,240,200,0.06), transparent 70%)', filter: 'blur(20px)' }}
            />

            <div className="relative z-10">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] group-hover:border-teal-400/20 group-hover:bg-teal-400/[0.06] flex items-center justify-center mb-4 transition-all duration-500"
              >
                <benefit.icon className="w-4 h-4 text-white/40 group-hover:text-teal-400 transition-colors duration-500" />
              </motion.div>
              <h3 className="text-[14px] font-semibold text-white mb-1.5">{benefit.title}</h3>
              <p className="text-white/45 text-[13px] leading-relaxed">{benefit.desc}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat card with glow + 3D                                          */
/* ------------------------------------------------------------------ */

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        whileHover={{
          y: -6,
          rotateX: -3,
          scale: 1.03,
          transition: { type: 'spring', stiffness: 250, damping: 18 },
        }}
        className="relative rounded-2xl p-[1px] text-center"
        style={{
          background: `conic-gradient(from var(--border-angle), transparent 0%, ${stat.color}30 5%, transparent 15%, transparent 85%, ${stat.color}30 95%, transparent 100%)`,
          animation: 'rotateBorder 4s linear infinite',
        }}
      >
        <div
          className="relative rounded-[15px] p-6 overflow-hidden"
          style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(20px)' }}
        >
          {/* Bottom glow */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${stat.color}10, transparent 70%)`, filter: 'blur(20px)' }}
          />

          <div className="relative z-10">
            <motion.div
              className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight"
              style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}30` }}
            >
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </motion.div>
            <p className="text-white/45 text-[12px] leading-relaxed whitespace-pre-line">{stat.label}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chain step pill with beam                                          */
/* ------------------------------------------------------------------ */

function ChainStep({ text, index, isLast }: { text: string; index: number; isLast: boolean }) {
  return (
    <div className="flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -3, scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
        className="relative px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-default"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 100px 50px at 50% 50%, rgba(20,240,200,0.04), transparent)', boxShadow: '0 0 20px rgba(20,240,200,0.05)' }}
        />
        <span className="relative z-10 text-[12px] font-medium text-white/80">{text}</span>
      </motion.div>

      {!isLast && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.05 }}
          className="relative w-6 h-px mx-1.5 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/[0.08]" />
          <motion.div
            className="absolute inset-y-0 w-3 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"
            animate={{ x: ['-12px', '24px'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
          />
        </motion.div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function BenefitsSection() {
  const benefitsHeaderRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bsp } = useScroll({ target: benefitsHeaderRef, offset: ['start end', 'end start'] });
  const benefitsOpacity = useTransform(bsp, [0, 0.15], [0, 1]);

  const roiHeaderRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rsp } = useScroll({ target: roiHeaderRef, offset: ['start end', 'end start'] });
  const roiOpacity = useTransform(rsp, [0, 0.15], [0, 1]);

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060d12] to-[#030712]" />
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Ambient glows */}
      <div className="absolute top-40 left-[10%] w-[400px] h-[300px] rounded-full bg-teal-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-[10%] w-[350px] h-[250px] rounded-full bg-emerald-500/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* ─── Benefits Header ─── */}
        <motion.div ref={benefitsHeaderRef} style={{ opacity: benefitsOpacity }} className="mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-teal-400/60 text-[11px] font-semibold tracking-[0.15em] uppercase mb-5">
            Business Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight">
            What your clients get{' '}
            <span className="bg-gradient-to-r from-[#14f0c8] to-[#14b8a6] bg-clip-text text-transparent">
              from day one
            </span>
          </h2>
        </motion.div>

        {/* ─── Benefits Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-28">
          {benefits.map((b, i) => (
            <BenefitCard key={b.title} benefit={b} index={i} />
          ))}
        </div>

        {/* ─── Animated Divider ─── */}
        <div className="relative flex items-center gap-4 mb-24">
          <div className="flex-1 h-px bg-white/[0.04] overflow-hidden">
            <motion.div
              className="h-full w-32 bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"
              initial={{ x: -200 }}
              whileInView={{ x: 'calc(100% + 200px)' }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }}
            />
          </div>
          <motion.div
            whileInView={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
            viewport={{ once: true }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-2 h-2 rounded-full bg-teal-400"
            style={{ boxShadow: '0 0 12px rgba(20,240,200,0.5)' }}
          />
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

        {/* ─── ROI Header ─── */}
        <motion.div ref={roiHeaderRef} style={{ opacity: roiOpacity }} className="mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-emerald-400/60 text-[11px] font-semibold tracking-[0.15em] uppercase mb-5">
            Return on Investment
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight">
            The value chain{' '}
            <span className="bg-gradient-to-r from-[#14f0c8] to-[#2dd4bf] bg-clip-text text-transparent">
              in action
            </span>
          </h2>
        </motion.div>

        {/* ─── Value Chain Flow ─── */}
        <div className="flex flex-wrap items-center justify-center gap-y-3 mb-16">
          {chainSteps.map((step, i) => (
            <ChainStep key={step} text={step} index={i} isLast={i === chainSteps.length - 1} />
          ))}
        </div>

        {/* ─── Stats Grid ─── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
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