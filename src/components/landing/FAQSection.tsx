'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────────────── */

const faqs = [
  {
    q: 'On which social channels can I post?',
    a: 'All major social platforms — Instagram, Facebook, LinkedIn, Pinterest, TikTok, X (Twitter), and more. Every channel covered.',
  },
  {
    q: 'Which channels can I connect with?',
    a: 'WhatsApp, SMS, and Email for review collection. Your customers get reached on whatever channel they actually use — no setup headaches, no missed opportunities.',
  },
  {
    q: 'How long does setup take? Do I need technical skills?',
    a: 'We handle the integrations, templates, and routing logic — you just connect your channels and go.',
  },
  {
    q: 'What happens when a customer leaves a bad rating — does that go public?',
    a: 'No. Ratings of 1–4 stars are routed privately to you first, so you can resolve the issue before it ever hits a public review site. Only 5-star reviews get published. Your reputation stays protected.',
  },
  {
    q: 'How is this different from just asking customers for reviews manually?',
    a: "You could text every customer yourself. But you'd miss 60–80% of them, have no smart routing for bad reviews, spend hours writing replies, and still need to screenshot and post them to social media. We automate the entire pipeline — collection, AI replies, and social proof generation — while you run your business.",
  },
  {
    q: 'Will Google flag or remove my reviews? Is this compliant?',
    a: '100% compliant. Every review comes from a real customer with a verified transaction. No fake accounts, no incentivized ratings, no review gating tricks. Google sees genuine feedback from genuine buyers — which is exactly what their algorithm rewards.',
  },
];

/* ─── FAQ Item ──────────────────────────────────────────────────── */

function FAQItem({ faq, index, isOpen, onToggle }: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-white/[0.06] last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-3 sm:gap-6 py-4 sm:py-5 text-left group cursor-pointer"
      >
        <span className="text-[13px] sm:text-[15px] md:text-base font-medium text-white/90 group-hover:text-white leading-snug transition-colors duration-300">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 mt-0.5"
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 group-hover:text-teal-400 transition-colors duration-300" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-[12px] sm:text-sm text-white/50 leading-relaxed pb-4 sm:pb-5 pr-8 sm:pr-12">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────── */

export default function FAQSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ['start end', 'end start'] });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setOpenIndex(prev => (prev === i ? null : i));
  };

  return (
    <section className="relative py-12 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />

      {/* Ambient glows */}
      <div className="absolute top-1/3 left-[10%] w-[400px] h-[300px] rounded-full bg-teal-500/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[10%] w-[350px] h-[250px] rounded-full bg-purple-500/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div ref={headerRef} style={{ opacity: headerOpacity }} className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/40 text-[11px] font-semibold tracking-[0.15em] uppercase mb-5">
            FAQ
          </span>
          <h2 className="text-[16px] sm:text-3xl md:text-[2.75rem] font-bold text-white mb-4 leading-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#14f0c8] to-[#14b8a6] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-[12px] sm:text-sm text-white/40 max-w-lg mx-auto leading-relaxed">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm px-5 sm:px-8 py-3 sm:py-4">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}