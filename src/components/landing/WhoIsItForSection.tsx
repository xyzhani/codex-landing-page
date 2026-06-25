'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Store, ShoppingBag, UserCog, Wrench, Scissors, Home, Heart, Laptop, Shirt, Sparkles, Coffee, Sofa } from 'lucide-react';

const localSMBs = [
  { icon: UserCog, name: 'Dentists & Clinics' },
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
  { icon: Coffee, name: 'Food & Beverage Brands' },
  { icon: Sofa, name: 'Home Goods Stores' },
];

export default function WhoIsItForSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4">
              WHO IS IT FOR
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Works for Any Business <span className="gradient-text">That Serves Customers</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Local SMBs */}
          <ScrollReveal direction="left">
            <div className="p-6 rounded-2xl glass border border-teal-500/15 bg-gradient-to-br from-teal-500/10 to-transparent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                  <Store className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Local SMBs</h3>
                  <p className="text-xs text-slate-400">Brick & mortar businesses</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {localSMBs.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.03, x: 4 }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-black/20 border border-white/5 hover:border-teal-500/20 transition-colors cursor-default"
                  >
                    <item.icon className="w-4 h-4 text-teal-400/70 shrink-0" />
                    <span className="text-sm text-slate-300">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* eCommerce */}
          <ScrollReveal direction="right">
            <div className="p-6 rounded-2xl glass border border-purple-500/15 bg-gradient-to-br from-purple-500/10 to-transparent">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">eCommerce</h3>
                  <p className="text-xs text-slate-400">Online stores & DTC brands</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ecommerce.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.03, x: 4 }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-black/20 border border-white/5 hover:border-purple-500/20 transition-colors cursor-default"
                  >
                    <item.icon className="w-4 h-4 text-purple-400/70 shrink-0" />
                    <span className="text-sm text-slate-300">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}