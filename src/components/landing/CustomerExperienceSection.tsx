'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface ChatMessage {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  buttons?: string[];
  stars?: boolean;
  delay: number;
}

const chatFlow: ChatMessage[] = [
  {
    id: 1,
    sender: 'bot',
    text: "Hi Sarah 👋\nThank you for choosing us!\nWe'd love to hear how your experience was.\nWould you be willing to leave a quick rating?",
    buttons: ['Yes, definitely!', 'Not now'],
    delay: 800,
  },
  {
    id: 2,
    sender: 'user',
    text: 'Yes, definitely! ✅',
    delay: 2800,
  },
  {
    id: 3,
    sender: 'bot',
    text: "Amazing! ⭐\nHow would you rate your experience?",
    stars: true,
    delay: 3800,
  },
  {
    id: 4,
    sender: 'user',
    text: '⭐⭐⭐⭐⭐ 5 stars!',
    delay: 5800,
  },
  {
    id: 5,
    sender: 'bot',
    text: "Thank you so much for the 5★ rating! 🎉\nWould you mind sharing your experience on Google?\nIt only takes 30 seconds and helps us a lot.",
    buttons: ['Leave Google Review'],
    delay: 6800,
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-sm bg-[#1a2737] w-fit">
      <div className="w-2 h-2 rounded-full bg-teal-400 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-teal-400 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-teal-400 typing-dot" />
    </div>
  );
}

export default function CustomerExperienceSection() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    chatFlow.forEach((msg, i) => {
      // Show typing before bot messages
      setTimeout(() => {
        if (msg.sender === 'bot') {
          setShowTyping(true);
        }
      }, msg.delay - 600 > 0 ? msg.delay - 600 : 0);

      // Show message
      setTimeout(() => {
        setShowTyping(false);
        setVisibleMessages((prev) => [...prev, msg.id]);
      }, msg.delay);
    });
  }, [hasStarted]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a1f1a] to-[#030712]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
              CUSTOMER EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              What Your Customers <span className="gradient-text">See on WhatsApp</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A real-time simulation of the frictionless review collection experience.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="max-w-md mx-auto">
            {/* Phone mockup */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[2.5rem] border-2 border-slate-700/50 bg-[#0b141a] overflow-hidden shadow-2xl shadow-teal-500/10"
            >
              {/* Phone notch */}
              <div className="flex justify-center pt-3 pb-1 bg-[#0b141a]">
                <div className="w-32 h-6 rounded-full bg-[#1a2737]" />
              </div>

              {/* WhatsApp header */}
              <div className="px-4 py-3 bg-[#1a2737] border-b border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">BR</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">YourBrand</p>
                  <p className="text-xs text-teal-400">online</p>
                </div>
              </div>

              {/* Chat area */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-3 bg-[#0b1a15]">
                <AnimatePresence>
                  {visibleMessages.map((id) => {
                    const msg = chatFlow.find((m) => m.id === id)!;
                    const isBot = msg.sender === 'bot';

                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                            isBot
                              ? 'bg-[#1a2737] text-white rounded-tl-sm'
                              : 'bg-[#005c4b] text-white rounded-tr-sm'
                          }`}
                        >
                          <p>{msg.text}</p>

                          {/* Buttons */}
                          {msg.buttons && (
                            <div className="mt-3 space-y-2">
                              {msg.buttons.map((btn) => (
                                <button
                                  key={btn}
                                  className="w-full px-4 py-2 rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-300 text-sm font-medium hover:bg-teal-500/30 transition-colors cursor-pointer"
                                >
                                  {btn}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Star rating */}
                          {msg.stars && (
                            <div className="mt-3 flex gap-1">
                              {[5, 4, 3, 2, 1].map((n) => (
                                <button
                                  key={n}
                                  className="w-10 h-10 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/30 transition-all cursor-pointer"
                                >
                                  {n}★
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}

                  {showTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <TypingIndicator />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}