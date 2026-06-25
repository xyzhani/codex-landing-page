'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { Store, ShoppingBag, UserCog, Wrench, Scissors, Home, Heart, Laptop, Shirt, Sparkles, Coffee, Sofa, Stethoscope } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const localSMBs = [
  { icon: Stethoscope, name: 'Dentists & Clinics' },
  { icon: Wrench, name: 'Auto Repair Shops' },
  { icon: Home, name: 'HVAC & Plumbing' },
  { icon: Coffee, name: 'Restaurants & Cafes' },
  { icon: Scissors, name: 'Salons & Barbershops' },
  { icon: Heart, name: 'Gyms & Trainers' },
  { icon: Store, name: 'Real Estate Agents' },
  { icon: Sparkles, name: 'Cleaning Services' },
];

const ecommerce = [
  { icon: ShoppingBag, name: 'Shopify Stores' },
  { icon: Laptop, name: 'WooCommerce Stores' },
  { icon: Shirt, name: 'DTC Fashion Brands' },
  { icon: Sparkles, name: 'Beauty & Skincare' },
  { icon: Laptop, name: 'Electronics Stores' },
  { icon: Heart, name: 'Health & Wellness' },
  { icon: Coffee, name: 'Food & Beverage' },
  { icon: Sofa, name: 'Home Goods Stores' },
];

/* ------------------------------------------------------------------ */
/*  Category Card with 3D tilt & rotating border                       */
/* ------------------------------------------------------------------ */

function CategoryCard({
  group,
  index,
}: {
  group: { title: string; sub: string; items: typeof localSMBs; accent: 'teal' | 'purple' };
  index: number;
}) {
  const isTeal = group.accent === 'teal';
  const color = isTeal ? '#14f0c8' : '#A855F7';
  const colorFaded = isTeal ? 'rgba(20,240,200,' : 'rgba(168,85,247,';

  const conic = `conic-gradient(from var(--border-angle), transparent 0%, ${color}30 5%, transparent 15%, transparent 85%, ${color}30 95%, transparent 100%)`;

  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -40 : 40, rotateY: index === 0 ? -6 : 6 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        whileHover={{
          rotateX: 2,
          rotateY: -3,
          scale: 1.01,
          transition: { type: 'spring', stiffness: 250, damping: 20 },
        }}
        className="relative h-full rounded-2xl p-[1px]"
        style={{ background: conic, animation: 'rotateBorder 5s linear infinite' }}
      >
        <div
          className="relative h-full rounded-[15px] p-7 overflow-hidden"
          style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(20px)' }}
        >
          {/* Glow orb */}
          <div
            className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${colorFaded}0.06), transparent 70%)`, filter: 'blur(40px)' }}
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-7">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: `${colorFaded}0.1)`,
                  boxShadow: `0 0 24px ${colorFaded}0.15)`,
                }}
              >
                {isTeal ? (
                  <Store className="w-[18px] h-[18px]" style={{ color }} />
                ) : (
                  <ShoppingBag className="w-[18px] h-[18px]" style={{ color }} />
                )}
              </motion.div>
              <div>
                <h3 className="text-base font-semibold text-white">{group.title}</h3>
                <p className="text-[11px] text-white/35">{group.sub}</p>
              </div>
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {group.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 3, scale: 1.02, transition: { type: 'spring', stiffness: 500, damping: 30 } }}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300 cursor-default group"
                >
                  <item.icon
                    className="w-3.5 h-3.5 shrink-0 transition-all duration-300"
                    style={{ color: `${colorFaded}0.5)` }}
                  />
                  <span className="text-[12px] text-white/60 group-hover:text-white transition-colors duration-300">{item.name}</span>
                </motion.div>
              ))}
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

export default function WhoIsItForSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ['start end', 'end start'] });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-[15%] w-[400px] h-[300px] rounded-full bg-teal-500/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-[15%] w-[400px] h-[300px] rounded-full bg-purple-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div ref={headerRef} style={{ opacity: headerOpacity }} className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40 text-[11px] font-semibold tracking-[0.15em] uppercase mb-5">
            Who Is It For
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-5 leading-tight">
            Any business{' '}
            <span className="bg-gradient-to-r from-[#14f0c8] to-[#A855F7] bg-clip-text text-transparent">
              that serves customers
            </span>
          </h2>
        </motion.div>

        {/* Two column cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <CategoryCard
            group={{ title: 'Local SMBs', sub: 'Brick & mortar businesses', items: localSMBs, accent: 'teal' }}
            index={0}
          />
          <CategoryCard
            group={{ title: 'eCommerce', sub: 'Online stores & DTC brands', items: ecommerce, accent: 'purple' }}
            index={1}
          />
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