'use client';

import { useRef, useEffect } from 'react';
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
    statLabel: 'avg. of top-ranked businesses',
  },
  {
    icon: MapPin,
    title: 'Invisible on Google Maps',
    description: 'Low review count = lower local SEO ranking = fewer calls and walk-ins.',
    accent: '#fbbf24',
    stat: '#4',
    statLabel: 'position lost per missing star',
  },
  {
    icon: AlertTriangle,
    title: 'Negative Reviews Go Public',
    description: 'Unhappy customers post online with no warning — and no chance to recover them.',
    accent: '#f472b6',
    stat: '94%',
    statLabel: 'say a bad review influenced them',
  },
  {
    icon: Megaphone,
    title: 'No Social Media Content',
    description: 'Small businesses struggle to post consistently without a content team.',
    accent: '#c084fc',
    stat: '0–2',
    statLabel: 'posts/week for most SMBs',
  },
  {
    icon: EyeOff,
    title: 'Reviews Sit Unseen',
    description: 'Great Google reviews are hidden — never repurposed into marketing material.',
    accent: '#38bdf8',
    stat: '91%',
    statLabel: 'of 5★ reviews go unused',
  },
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

/* ─── Problem Card ──────────────────────────────────────────────── */

function ProblemCard({ problem, index }: { problem: typeof problems[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      {/* Animated gradient border wrapper */}
      <div className="relative rounded-2xl p-px overflow-hidden">
        {/* Gradient border — animates on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `conic-gradient(from 180deg, ${problem.accent}40, transparent 30%, transparent 70%, ${problem.accent}40)`,
          }}
        />
        {/* Static subtle border */}
        <div className="absolute inset-0 rounded-2xl border border-white/[0.06]" />

        {/* Card inner */}
        <div className="relative bg-[#0a0f1a]/90 backdrop-blur-xl rounded-2xl p-6 sm:p-7 overflow-hidden">
          {/* Glow orb on hover */}
          <div
            className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-[40px]"
            style={{ backgroundColor: `${problem.accent}15` }}
          />

          {/* Top: icon + stat */}
          <div className="flex items-start justify-between mb-5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
              style={{
                backgroundColor: `${problem.accent}12`,
                boxShadow: `0 0 0 1px ${problem.accent}20`,
              }}
            >
              <problem.icon className="w-5 h-5" style={{ color: problem.accent }} />
            </div>

            <div className="text-right">
              <span
                className="block text-xl sm:text-2xl font-extrabold tracking-tight leading-none"
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
              <span className="block text-[10px] text-slate-500 mt-1 leading-tight max-w-[100px] ml-auto">
                {problem.statLabel}
              </span>
            </div>
          </div>

          {/* Text */}
          <h3 className="text-[15px] font-semibold text-white mb-2.5 leading-snug group-hover:text-white transition-colors">
            {problem.title}
          </h3>
          <p className="text-slate-500 text-[13px] leading-relaxed group-hover:text-slate-400 transition-colors duration-500">
            {problem.description}
          </p>

          {/* Bottom accent line — animates width on hover */}
          <div className="mt-5 h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
            style={{ backgroundColor: `${problem.accent}30` }}
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
  const headerY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background layers */}
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
      <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-red-500/[0.03] blur-[100px]" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-amber-500/[0.03] blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header — parallax */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-red-500/50 to-transparent" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-red-400/60">
              The Problem
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-[1.1] tracking-tight">
            Businesses are losing customers
            <br />
            <span className="text-slate-500">every single day</span>
          </h2>
          <p className="text-slate-400 text-[15px] sm:text-base max-w-lg leading-relaxed">
            Without automation, your best customers vanish silently and your worst ones
            become your loudest critics.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {problems.map((problem, i) => (
            <ProblemCard key={problem.title} problem={problem} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}