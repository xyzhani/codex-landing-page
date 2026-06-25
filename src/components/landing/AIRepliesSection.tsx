'use client';

import { motion } from 'framer-motion';
import { Bot, Globe, BarChart3, UserCheck, MessageCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: MessageCircle,
    title: 'Custom Brand Voice',
    desc: 'Set tone: professional, friendly, casual, luxury — the AI writes in your client\'s style every time.',
    color: 'text-teal-400',
  },
  {
    icon: Globe,
    title: 'Language & Market',
    desc: 'Configure replies in any language to match your client\'s customer base.',
    color: 'text-blue-400',
  },
  {
    icon: BarChart3,
    title: 'Smart Reply Rules',
    desc: 'Different response templates for 5★, 4★, and 3★ or below — each handled appropriately.',
    color: 'text-purple-400',
  },
  {
    icon: UserCheck,
    title: 'Owner Approval Mode',
    desc: 'Every reply can be sent for review before posting — full control, no surprises.',
    color: 'text-amber-400',
  },
  {
    icon: Bot,
    title: 'Business-Specific Info',
    desc: 'AI references the business name, services, team, location — never sounds generic.',
    color: 'text-pink-400',
  },
];

const flowItems = [
  { icon: '⭐', text: 'New Google review posted', sub: '5★ or less' },
  { icon: '🤖', text: 'AI reads the review', sub: 'content + star rating' },
  { icon: '🧠', text: 'Generates personalized reply', sub: 'on-brand, contextual' },
  { icon: '✅', text: 'Posted automatically', sub: 'or sent for approval' },
  { icon: '⏱', text: 'Within minutes', sub: 'not days' },
];

export default function AIRepliesSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a0f1a] to-[#030712]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
              AI-POWERED
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              AI Automatically Replies to <span className="gradient-text">Every Google Review</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* How it works flow */}
          <ScrollReveal direction="left">
            <div className="p-6 rounded-2xl glass border border-purple-500/15 bg-gradient-to-br from-purple-500/10 to-transparent">
              <h3 className="text-lg font-bold text-white mb-6">How It Works</h3>
              <div className="space-y-4">
                {flowItems.map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center shrink-0 text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.text}</p>
                      <p className="text-xs text-slate-500">{item.sub}</p>
                    </div>
                    {i < flowItems.length - 1 && (
                      <div className="absolute left-5 top-10 w-px h-6 bg-purple-500/20 ml-5 -mt-1" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Customizable features */}
          <ScrollReveal direction="right">
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Fully Customizable Per Client</h3>
              <div className="space-y-4">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="p-4 rounded-xl glass border border-white/5 hover:border-purple-500/20 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center shrink-0">
                      <feature.icon className={`w-4 h-4 ${feature.color}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{feature.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
                    </div>
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