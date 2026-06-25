'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Store, ShoppingBag, UserCog, Wrench, Scissors, Home, Heart, Laptop, Shirt, Sparkles, Coffee, Sofa, Stethoscope } from 'lucide-react';

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

export default function WhoIsItForSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-[12px] font-semibold tracking-[0.15em] uppercase text-slate-500 mb-4">
              Who Is It For
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white mb-5 leading-tight">
              Any business
              <span className="text-slate-500"> that serves customers</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[
            { title: 'Local SMBs', sub: 'Brick & mortar businesses', items: localSMBs, accent: 'teal' },
            { title: 'eCommerce', sub: 'Online stores & DTC brands', items: ecommerce, accent: 'purple' },
          ].map((group, gi) => (
            <ScrollReveal key={group.title} delay={gi * 0.1} direction={gi === 0 ? 'left' : 'right'}>
              <div className="h-full p-7 rounded-2xl border border-white/[0.05] bg-white/[0.015]">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${gi === 0 ? 'bg-teal-500/[0.08]' : 'bg-purple-500/[0.08]'}`}>
                    {gi === 0 ? <Store className="w-4 h-4 text-teal-400/70" /> : <ShoppingBag className="w-4 h-4 text-purple-400/70" />}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">{group.title}</h3>
                    <p className="text-[11px] text-slate-600">{group.sub}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.03] hover:border-white/[0.06] transition-all duration-300 cursor-default"
                    >
                      <item.icon className={`w-3.5 h-3.5 shrink-0 ${gi === 0 ? 'text-teal-400/50' : 'text-purple-400/50'}`} />
                      <span className="text-[12px] text-slate-400">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}