'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ChatStep =
  | 'init'
  | 'waiting_rating'
  | 'showing_stars'
  | 'showing_review_input'
  | 'showing_google_btn'
  | 'completed';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function nowTime(): string {
  const d = new Date();
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

function generateCoupon(): string {
  return 'Codex' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

const GOOGLE_REVIEW_URL =
  'https://www.google.com/search?sca_esv=46f97408aca9b3a8&sxsrf=APpeQnsB6XXALTGZQQ8bapNK7fWx4UFaDQ:1782417029641&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_8BvlyQDkMXjv7ULtRNbkdb0_iaNGSHZv2tB5cqPx31hfaAmoQuBK-NNfWb6da79Zx-mddRtYIV18nfydL6KLVwHZb6TtXJZrwzeJSUE2ehDdv9y4Q%3D%3D&q=Codex+Solutions+International+Reviews&sa=X&ved=2ahUKEwjGupLvlKOVAxVnBfsDHavEC9oQ0bkNegQIPBAH&biw=1369&bih=619&dpr=1.4';

/* ------------------------------------------------------------------ */
/*  Typing Indicator                                                    */
/* ------------------------------------------------------------------ */

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="relative max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-[4px] text-sm leading-relaxed bg-[#ECE5DD]"
        style={{ boxShadow: '0 1px 1px rgba(0,0,0,0.06)' }}
      >
        <div className="flex items-center gap-[3px] py-[2px]">
          <span
            className="block w-[7px] h-[7px] rounded-full bg-[#8696a0] animate-[typingBounce_1.4s_infinite_0ms]"
          />
          <span
            className="block w-[7px] h-[7px] rounded-full bg-[#8696a0] animate-[typingBounce_1.4s_infinite_200ms]"
          />
          <span
            className="block w-[7px] h-[7px] rounded-full bg-[#8696a0] animate-[typingBounce_1.4s_infinite_400ms]"
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function CustomerExperienceSection() {
  /* ---- state ---- */
  const [step, setStep] = useState<ChatStep>('init');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [reviewInput, setReviewInput] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ---- scroll to bottom (within chat container only) ---- */
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    });
  }, []);

  /* ---- add message helper ---- */
  const addMessage = useCallback(
    (sender: 'bot' | 'user', text: string) => {
      const id = ++msgIdRef.current;
      setMessages((prev) => [...prev, { id, sender, text, time: nowTime() }]);
      return id;
    },
    [],
  );

  /* ---- auto-start on scroll into view ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sectionVisible) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.25 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [sectionVisible]);

  /* ---- Step 1: initial bot message ---- */
  useEffect(() => {
    if (!sectionVisible) return;
    const t1 = setTimeout(() => setShowTyping(true), 300);
    const t2 = setTimeout(() => {
      setShowTyping(false);
      addMessage(
        'bot',
        'Hi Sarah 👋\nThank you for choosing us!\nWe\'d love to hear how your experience was.\nWould you be willing to leave a quick rating?',
      );
      setStep('waiting_rating');
    }, 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [sectionVisible, addMessage]);

  /* ---- scroll on new messages (only when section is visible) ---- */
  useEffect(() => {
    if (sectionVisible) scrollToBottom();
  }, [messages, showTyping, scrollToBottom, sectionVisible]);

  /* ---- focus input when it appears ---- */
  useEffect(() => {
    if (step === 'showing_review_input') {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [step]);

  /* ---- handlers ---- */
  const handleYesDefinitely = () => {
    if (step !== 'waiting_rating') return;
    addMessage('user', 'Yes, definitely! ✅');
    setStep('transition_1');
    setTimeout(() => setShowTyping(true), 500);
    setTimeout(() => {
      setShowTyping(false);
      addMessage('bot', 'Amazing! ⭐\nHow would you rate your experience?');
      setStep('showing_stars');
    }, 2000);
  };

  const handleNotNow = () => {
    if (step !== 'waiting_rating') return;
    addMessage('user', 'Not now');
    setStep('transition_1');
    setTimeout(() => setShowTyping(true), 500);
    setTimeout(() => {
      setShowTyping(false);
      addMessage(
        'bot',
        'No problem at all! 😊\nWhenever you\'re ready, we\'re here.\nHave a wonderful day!',
      );
      setStep('completed');
    }, 2000);
  };

  const handleStarSelect = (stars: number) => {
    if (step !== 'showing_stars') return;
    const starStr = '⭐'.repeat(stars);
    addMessage('user', starStr);
    setStep('transition_stars');

    if (stars === 5) {
      setTimeout(() => setShowTyping(true), 500);
      setTimeout(() => {
        setShowTyping(false);
        addMessage(
          'bot',
          'Thank you so much for the 5★ rating! 🎉\nWould you mind sharing your experience on Google?\nIt only takes 30 seconds and helps us a lot.',
        );
        setStep('showing_google_btn');
      }, 2000);
    } else {
      setStep('showing_review_input');
    }
  };

  const handleGoogleReview = () => {
    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    setStep('completed');
  };

  const handleReviewSubmit = () => {
    if (step !== 'showing_review_input' || !reviewInput.trim()) return;
    addMessage('user', reviewInput.trim());
    setReviewInput('');
    setInputFocused(false);
    setStep('transition_review');

    // Determine rating from the last user star message
    const lastStarMsg = [...messages]
      .reverse()
      .find((m) => m.sender === 'user' && /^⭐+$/.test(m.text));
    const rating = lastStarMsg ? lastStarMsg.text.length : 3;
    const discountMap: Record<number, number> = { 1: 30, 2: 20, 3: 15, 4: 10 };
    const discount = discountMap[rating] || 10;
    const coupon = generateCoupon();

    const empathyMessages: Record<number, string> = {
      4: `Thank you for your ${rating}★ rating and for taking the time to share your thoughts, Sarah! 💙\n\nWe really appreciate your honest feedback. We're always looking to improve and your input helps us get there.\n\nAs a token of our gratitude, here's ${discount}% off your next order with code ${coupon}\n\nWe'd love the chance to earn that 5th star next time! 🚀`,
      3: `Thank you for your ${rating}★ feedback, Sarah! We hear you. 💛\n\nWe're sorry we didn't fully meet your expectations this time. Your honest feedback is exactly what helps us improve.\n\nWe'd love to make it right — please accept ${discount}% off your next order with code ${coupon}\n\nGive us another chance to exceed your expectations! 🌟`,
      2: `Thank you for your honest feedback, Sarah. We truly appreciate you taking the time. 🙏\n\nWe're sorry your experience didn't meet expectations — that's not the standard we hold ourselves to. We take your feedback seriously and are already working on improvements.\n\nAs a gesture of goodwill, please enjoy ${discount}% off your next order with code ${coupon}\n\nWe'd love the opportunity to turn things around! 💪`,
      1: `Sarah, thank you for being candid with us. We don't take this lightly. ❤️\n\nWe sincerely apologize that your experience fell short. Your feedback is invaluable and we're committed to making real changes based on what you've shared.\n\nPlease accept ${discount}% off your next order with code ${coupon}\n\nWe genuinely want another chance to show you the experience you deserve. 🙏`,
    };

    const reply = empathyMessages[rating] || empathyMessages[3];

    setTimeout(() => setShowTyping(true), 600);
    setTimeout(() => {
      setShowTyping(false);
      addMessage('bot', reply);
      setStep('completed');
    }, 2800);
  };

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <section ref={sectionRef} className="relative py-10 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* bg */}
      <div className="absolute inset-0 bg-[#030712]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 50% 60%, rgba(0,184,148,0.12), transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12 lg:mb-20">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold mb-5 tracking-[0.15em] uppercase">
              CUSTOMER EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Real Conversations,{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Real Results
              </span>
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              See exactly how customers interact with the review collection flow
              — live, interactive, and beautifully simple.
            </p>
          </div>
        </ScrollReveal>

        {/* Phone */}
        <ScrollReveal delay={0.25}>
          <div className="flex justify-center">
            <div className="phone-scale-wrapper">
              <IPhone15Pro>
                {/* ---------- Status Bar ---------- */}
                <div className="relative flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)' }}
                >
                  <span>9:41</span>
                  <div className="absolute left-1/2 -translate-x-1/2 top-[10px] w-[72px] h-[20px] sm:w-[76px] sm:h-[22px] rounded-full bg-black" />
                  <div className="flex items-center gap-1.5">
                    <svg width="15" height="12" viewBox="0 0 15 12" fill="none"><path d="M7.5 3.6c1.6 0 3 .6 4.1 1.7l.9-.9A8.3 8.3 0 007.5 2.1a8.3 8.3 0 00-5 1.7l.9.9A5.5 5.5 0 017.5 3.6z" fill="white"/><path d="M7.5 6.2c.9 0 1.8.4 2.5 1l.9-.9A4.2 4.2 0 007.5 4.6a4.2 4.2 0 00-3.4 1.7l.9.9c.7-.6 1.6-1 2.5-1z" fill="white"/><circle cx="7.5" cy="8.8" r="1.3" fill="white"/></svg>
                    <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0" y="1" width="21" height="10" rx="2" stroke="white" strokeWidth="1"/><rect x="1.5" y="2.5" width="15" height="7" rx="1" fill="white"/><path d="M22.5 4.5v3a2 2 0 000-3z" fill="white"/></svg>
                  </div>
                </div>

                {/* ---------- WA Header ---------- */}
                <div
                  className="flex items-center gap-2 px-3 py-1.5 shrink-0 border-b border-white/10"
                  style={{ background: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)' }}
                >
                  {/* back arrow */}
                  <svg
                    className="shrink-0 text-white/80"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>

                  {/* avatar */}
                  <img
                    src="/codex-logo.jpg"
                    alt="Codex Solutions International"
                    className="w-8 h-8 rounded-full object-cover shrink-0 shadow-lg"
                  />

                  {/* name + status */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-white truncate leading-tight">
                      Codex Solutions International
                    </p>
                    <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                      <span className="inline-block w-[7px] h-[7px] rounded-full bg-green-300 shadow-[0_0_4px_rgba(134,239,172,0.6)]" />
                      online
                    </p>
                  </div>

                  {/* header icons */}
                  <div className="flex items-center gap-3 text-white/80 shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  </div>
                </div>

                {/* ---------- Chat Area ---------- */}
                <div
                  className="flex-1 overflow-y-auto pl-4 pr-3 py-3 space-y-[3px] chat-scroll"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h200v200H0z\' fill=\'%23ECE5DD\'/%3E%3Cpath d=\'M0 0l200 200M200 0L0 200\' stroke=\'%23DBD3CA\' stroke-width=\'.5\'/%3E%3C/svg%3E")',
                    backgroundSize: '200px 200px',
                  }}
                >
                  {/* encrypted notice */}
                  {messages.length === 0 && !showTyping && (
                    <div className="flex justify-center py-3">
                      <span
                        className="text-[11px] text-[#8696a0] bg-[#fff3c4] px-2 py-[3px] rounded-sm text-center leading-tight"
                      >
                        🔒 Messages are end-to-end encrypted. No one outside of this chat can read them.
                      </span>
                    </div>
                  )}

                  <AnimatePresence initial={false}>
                    {messages.map((msg) => {
                      const isBot = msg.sender === 'bot';
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 24, scale: 0.92 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                          }}
                          className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`relative max-w-[85%] pl-[10px] pr-[6px] pt-[4px] pb-[5px] text-[11px] leading-[15px] whitespace-pre-line ${
                              isBot
                                ? 'bg-[#ECE5DD] text-[#111b21] rounded-tr-[8px] rounded-br-[8px] rounded-bl-[4px]'
                                : 'bg-[#005C4B] text-white rounded-tl-[8px] rounded-bl-[8px] rounded-br-[4px]'
                            }`}
                            style={{
                              boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
                            }}
                          >
                            {/* tail */}
                            {isBot && (
                              <div
                                className="absolute top-0 left-[-8px] w-0 h-0"
                                style={{
                                  borderRight: '8px solid #ECE5DD',
                                  borderTop: '8px solid #ECE5DD',
                                  borderLeft: '8px solid transparent',
                                  borderBottom: '8px solid transparent',
                                  borderTopLeftRadius: '6px',
                                }}
                              />
                            )}
                            {!isBot && (
                              <div
                                className="absolute top-0 right-[-8px] w-0 h-0"
                                style={{
                                  borderLeft: '8px solid #005C4B',
                                  borderTop: '8px solid #005C4B',
                                  borderRight: '8px solid transparent',
                                  borderBottom: '8px solid transparent',
                                  borderTopRightRadius: '6px',
                                }}
                              />
                            )}

                            <p className="pr-12">{msg.text}</p>

                            {/* timestamp */}
                            <div
                              className={`absolute bottom-[4px] right-[6px] flex items-center gap-[2px] text-[9.5px] ${
                                isBot
                                  ? 'text-[#667781]'
                                  : 'text-emerald-100/70'
                              }`}
                            >
                              <span>{msg.time}</span>
                              {!isBot && (
                                <svg
                                  width="16"
                                  height="11"
                                  viewBox="0 0 16 11"
                                  fill="none"
                                >
                                  <path
                                    d="M11.07 0.53L4.53 7.07l-2.6-2.6L0 6.4l4.53 4.53 8-8-1.46-1.4z"
                                    fill="currentColor"
                                  />
                                </svg>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {showTyping && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 16, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        <TypingIndicator />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={chatEndRef} />
                </div>

                {/* ---------- Action Area (buttons / input) ---------- */}
                <div className="shrink-0 bg-[#F0F2F5] border-t border-[#E9EDEF]">
                  <AnimatePresence mode="wait">
                    {/* Step: waiting for rating */}
                    {step === 'waiting_rating' && (
                      <motion.div
                        key="rating-btns"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-2 p-3"
                      >
                        <button
                          onClick={handleYesDefinitely}
                          className="flex-1 py-2 rounded-full bg-[#00A884] hover:bg-[#00956F] active:scale-[0.97] text-white text-[11.5px] font-semibold transition-all duration-150 cursor-pointer shadow-sm"
                        >
                          Yes, definitely!
                        </button>
                        <button
                          onClick={handleNotNow}
                          className="flex-1 py-2 rounded-full bg-white hover:bg-gray-50 active:scale-[0.97] text-[#00A884] text-[11.5px] font-semibold border border-[#00A884]/30 transition-all duration-150 cursor-pointer"
                        >
                          Not now
                        </button>
                      </motion.div>
                    )}

                    {/* Step: star selection */}
                    {step === 'showing_stars' && (
                      <motion.div
                        key="star-btns"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="p-2.5 space-y-1.5"
                      >
                        {[5, 4, 3, 2, 1].map((n) => (
                          <motion.button
                            key={n}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleStarSelect(n)}
                            className={`w-full py-2 px-3.5 rounded-xl text-left text-[12px] font-medium transition-all duration-150 cursor-pointer border flex items-center gap-1.5 ${
                              n === 5
                                ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
                                : n === 4
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                                  : n === 3
                                    ? 'bg-yellow-50 border-yellow-300 text-yellow-800 hover:bg-yellow-100'
                                    : n === 2
                                      ? 'bg-orange-50 border-orange-300 text-orange-800 hover:bg-orange-100'
                                      : 'bg-red-50 border-red-300 text-red-800 hover:bg-red-100'
                            }`}
                          >
                            <span className="text-base">{('⭐').repeat(n)}</span>
                            <span>{n} star{n > 1 ? 's' : ''}</span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {/* Step: review text input */}
                    {step === 'showing_review_input' && (
                      <motion.div
                        key="review-input"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="p-3"
                      >
                        <p className="text-[10px] text-[#667781] mb-1.5 px-1">
                          Tell us how we can improve (optional):
                        </p>
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`flex-1 flex items-center rounded-full bg-white border-2 transition-all duration-200 ${
                              inputFocused
                                ? 'border-[#00A884] shadow-[0_0_0_2px_rgba(0,168,132,0.15)]'
                                : 'border-[#E9EDEF]'
                            }`}
                          >
                            <input
                              ref={inputRef}
                              type="text"
                              value={reviewInput}
                              onChange={(e) => setReviewInput(e.target.value)}
                              onFocus={() => setInputFocused(true)}
                              onBlur={() => setInputFocused(false)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleReviewSubmit();
                              }}
                              placeholder="Share your feedback…"
                              className="flex-1 bg-transparent px-3 py-2 text-[12px] text-[#111b21] placeholder-[#8696a0] outline-none"
                            />
                            <button
                              onClick={handleReviewSubmit}
                              disabled={!reviewInput.trim()}
                              className={`mr-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 ${
                                reviewInput.trim()
                                  ? 'bg-[#00A884] hover:bg-[#00956F] text-white shadow-sm active:scale-95'
                                  : 'bg-[#00A884]/30 text-[#00A884] cursor-not-allowed'
                              }`}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step: Google review button */}
                    {step === 'showing_google_btn' && (
                      <motion.div
                        key="google-btn"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="p-3"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleGoogleReview}
                          className="w-full py-2.5 rounded-full bg-[#00A884] hover:bg-[#00956F] active:scale-[0.97] text-white text-[12px] font-semibold transition-all duration-150 cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          Leave Google Review
                        </motion.button>
                      </motion.div>
                    )}

                    {/* Completed / idle */}
                    {(step === 'completed' ||
                      step === 'init' ||
                      step.startsWith('transition')) && (
                      <motion.div
                        key="idle-bar"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 px-3 py-3"
                      >
                        <div className="flex-1 flex items-center bg-white rounded-full px-3 py-2">
                          <span className="text-[#8696a0] text-[11px]">
                            {step === 'completed'
                              ? 'Chat completed'
                              : step.startsWith('transition')
                                ? 'Typing…'
                                : 'Type a message'}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#00A884] flex items-center justify-center text-white shrink-0">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </IPhone15Pro>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Global keyframes for typing dots */}
      <style jsx global>{`
        @keyframes typingBounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
        .phone-scale-wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .chat-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  iPhone 15 Pro Frame                                                */
/* ------------------------------------------------------------------ */

function IPhone15Pro({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-[230px] sm:w-[240px] md:w-[240px] lg:w-[240px] h-[480px] sm:h-[500px] md:h-[500px] lg:h-[500px] rounded-[42px] sm:rounded-[43px] p-[5px] origin-center"
      style={{
        background:
          'linear-gradient(145deg, #8A8A8E 0%, #6E6E73 15%, #48484A 50%, #6E6E73 85%, #8A8A8E 100%)',
        boxShadow:
          '0 50px 100px -20px rgba(0,0,0,0.7), 0 30px 60px -30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.3)',
      }}
    >
      {/* Shine / reflection effect */}
      <div
        className="absolute inset-0 rounded-[42px] pointer-events-none z-30"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.04) 100%)',
        }}
      />

      {/* Inner bezel */}
      <div
        className="relative w-full h-full rounded-[38px] sm:rounded-[39px] overflow-hidden z-10 flex flex-col"
        style={{ background: '#000' }}
      >
        {children}
      </div>

      {/* ---- Side Buttons (CSS-only) ---- */}

      {/* Left side — Volume Up */}
      <div
        className="absolute left-[-2.5px] top-[100px] w-[3px] h-[24px] rounded-l-sm z-20"
        style={{
          background:
            'linear-gradient(180deg, #8A8A8E 0%, #6E6E73 50%, #48484A 100%)',
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.3)',
        }}
      />
      {/* Left side — Volume Down */}
      <div
        className="absolute left-[-2.5px] top-[135px] w-[3px] h-[24px] rounded-l-sm z-20"
        style={{
          background:
            'linear-gradient(180deg, #8A8A8E 0%, #6E6E73 50%, #48484A 100%)',
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.3)',
        }}
      />
      {/* Left side — Action button */}
      <div
        className="absolute left-[-2.5px] top-[82px] w-[3px] h-[14px] rounded-l-sm z-20"
        style={{
          background:
            'linear-gradient(180deg, #8A8A8E 0%, #6E6E73 50%, #48484A 100%)',
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.3)',
        }}
      />

      {/* Right side — Power button */}
      <div
        className="absolute right-[-2.5px] top-[115px] w-[3px] h-[38px] rounded-r-sm z-20"
        style={{
          background:
            'linear-gradient(180deg, #8A8A8E 0%, #6E6E73 50%, #48484A 100%)',
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  );
}