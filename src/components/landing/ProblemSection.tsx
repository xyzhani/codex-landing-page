'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Users, TrendingDown, MapPin, AlertTriangle, Megaphone, EyeOff } from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────────────── */

const problems = [
  {
    icon: Users,
    title: 'Happy Customers Leave Silently',
    description: 'Most satisfied buyers never post a review — no one asks them at the right time.',
    accent: '#f87171',
    stat: '73%',
    statLabel: 'never leave a review',
  },
  {
    icon: TrendingDown,
    title: 'Competitors Pull Ahead',
    description: 'Businesses with 200+ reviews get chosen first, even if your service is better.',
    accent: '#fb923c',
    stat: '4.8★',
    statLabel: 'avg. of top-ranked',
  },
  {
    icon: MapPin,
    title: 'Invisible on Google Maps',
    description: 'Low review count = lower local SEO ranking = fewer calls and walk-ins.',
    accent: '#fbbf24',
    stat: '#4',
    statLabel: 'spot lost per star',
  },
  {
    icon: AlertTriangle,
    title: 'Negative Reviews Go Public',
    description: 'Unhappy customers post online with no warning — and no chance to recover them.',
    accent: '#f472b6',
    stat: '94%',
    statLabel: 'influenced by bad reviews',
  },
  {
    icon: Megaphone,
    title: 'No Social Media Content',
    description: 'Small businesses struggle to post consistently without a content team.',
    accent: '#c084fc',
    stat: '2-3',
    statLabel: 'posts/week for SMBs',
  },
  {
    icon: EyeOff,
    title: 'Reviews Sit Unseen',
    description: 'Great Google reviews are hidden — never repurposed into marketing material.',
    accent: '#38bdf8',
    stat: '91%',
    statLabel: 'of 5★ reviews unused',
  },
];

const floatClasses = [
  'animate-float-delay-1',
  'animate-float-delay-2',
  'animate-float-delay-3',
  'animate-float-delay-4',
  'animate-float-delay-5',
  'animate-float-delay-6',
];

/* ─── Animated Counter ──────────────────────────────────────────── */

function MiniCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    const el = ref.current;
    if (!el) return;
    const dur = 1800;
    const start = performance.now();
    const isFloat = value % 1 !== 0;
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = `${isFloat ? (e * value).toFixed(1) : Math.round(e * value)}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Animated Border Card ──────────────────────────────────────── */

function AnimatedBorderCard({
  problem,
  index,
  children,
}: {
  problem: typeof problems[0];
  index: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`animate-card-float ${floatClasses[index]}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative rounded-2xl p-[1px] overflow-hidden">
        {/* Rotating light border */}
        <div
          className="border-glow-rotate absolute inset-[-200%] rounded-full"
          style={{
            background: `conic-gradient(from var(--border-angle), transparent 60%, ${problem.accent} 78%, ${problem.accent}88 82%, transparent 100%)`,
            transition: 'opacity 0.5s',
            opacity: hovered ? 1 : 0.3,
          }}
        />

        {/* Card inner */}
        <div className="relative bg-[#0a0f1a] rounded-2xl p-3.5 sm:p-5 md:p-6 lg:p-7 overflow-hidden backdrop-blur-sm">
          {/* Inner glow on hover */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[50px] transition-opacity duration-700"
            style={{
              backgroundColor: problem.accent,
              opacity: hovered ? 0.08 : 0,
            }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full blur-[40px] transition-opacity duration-700"
            style={{
              backgroundColor: problem.accent,
              opacity: hovered ? 0.04 : 0,
            }}
          />

          {/* Top: icon + stat */}
          <div className="relative flex items-start justify-between mb-3 sm:mb-5">
            <motion.div
              className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${problem.accent}15`,
                boxShadow: `0 0 20px ${problem.accent}10`,
              }}
              animate={hovered ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <problem.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: problem.accent }} />
            </motion.div>

            <div className="text-right">
              <span
                className="block text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-none"
                style={{ color: problem.accent }}
              >
                {problem.stat.startsWith('#') ? (
                  problem.stat
                ) : (
                  <MiniCounter
                    value={parseFloat(problem.stat.replace(/[^0-9.]/g, ''))}
                    suffix={problem.stat.replace(/[0-9.]/g, '')}
                  />
                )}
              </span>
              <span className="block text-[9px] sm:text-[10px] text-white/50 mt-1 sm:mt-1.5 leading-tight max-w-[80px] sm:max-w-[100px] ml-auto">
                {problem.statLabel}
              </span>
            </div>
          </div>

          {/* Text */}
          <h3 className="relative text-[12px] sm:text-[15px] font-bold text-white mb-1.5 sm:mb-2.5 leading-snug">
            {problem.title}
          </h3>
          <p className="relative text-white text-[11px] sm:text-[12px] lg:text-[13px] leading-relaxed">
            {problem.description}
          </p>

          {/* Bottom accent bar */}
          <motion.div
            className="relative mt-3 sm:mt-5 h-[2px] rounded-full"
            style={{ backgroundColor: problem.accent }}
            initial={{ width: '0%' }}
            animate={hovered ? { width: '100%' } : { width: '20%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────── */

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.9', 'end 0.6'],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#060a10] to-[#030712]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-red-500/[0.03] blur-[120px]" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-amber-500/[0.03] blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header — parallax */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-8 sm:mb-14 lg:mb-20">
          <div className="flex items-center gap-3 mb-3 sm:mb-5">
            <motion.div
              className="h-px w-10"
              style={{ background: 'linear-gradient(to right, #f87171, transparent)' }}
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-red-400">
              The Problem
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-5 leading-[1.1] tracking-tight">
            Businesses are losing customers
            <br className="hidden sm:inline" />
            <span className="text-white">
              every single day
            </span>
          </h2>
          <p className="text-white text-[15px] sm:text-base max-w-lg leading-relaxed">
            Without automation, your best customers vanish silently and your worst ones
            become your loudest critics.
          </p>
        </motion.div>

        {/* Cards grid — 2-col on phone, 3-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {problems.map((problem, i) => (
            <AnimatedBorderCard key={problem.title} problem={problem} index={i}>
              <div />
            </AnimatedBorderCard>
          ))}
        </div>
      </div>
    </section>
  );
}