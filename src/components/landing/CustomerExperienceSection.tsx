'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ChannelType = 'select' | 'whatsapp' | 'email' | 'sms';

type ChatStep =
  | 'init'
  | 'waiting_rating'
  | 'showing_stars'
  | 'showing_review_input'
  | 'showing_google_btn'
  | 'completed'
  | 'transition_1'
  | 'transition_stars'
  | 'transition_review';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

/* ------------------------------------------------------------------ */
/*  Theme Configs                                                      */
/* ------------------------------------------------------------------ */

interface ChannelTheme {
  primary: string;
  primaryHover: string;
  headerBg: string;
  headerText: string;
  chatBg: string;
  chatBgImage: string | null;
  chatBgSize: string;
  botBubbleBg: string;
  botBubbleText: string;
  botBubbleBorder: string;
  userBubbleBg: string;
  userBubbleText: string;
  userBubbleBorder: string;
  botTimestampColor: string;
  userTimestampColor: string;
  actionBg: string;
  actionBorder: string;
  botBubbleRadius: string;
  userBubbleRadius: string;
  showTails: boolean;
  showEncrypted: boolean;
  encryptedText: string;
  footerText: string;
  botTailColor: string;
  userTailColor: string;
  inputBorderFocus: string;
  inputBorderFocusShadow: string;
  sendBtnColor: string;
  sendBtnHover: string;
  idleSendColor: string;
  placeholderColor: string;
  starBtnBg5: string;
  starBtnBorder5: string;
  starBtnText5: string;
  starBtnBg4: string;
  starBtnBorder4: string;
  starBtnText4: string;
  starBtnBg3: string;
  starBtnBorder3: string;
  starBtnText3: string;
  starBtnBg2: string;
  starBtnBorder2: string;
  starBtnText2: string;
  starBtnBg1: string;
  starBtnBorder1: string;
  starBtnText1: string;
  reviewHintColor: string;
  inputTextColor: string;
  notNowBorder: string;
  notNowText: string;
  secondaryBtnBg: string;
}

const whatsappTheme: ChannelTheme = {
  primary: '#00A884',
  primaryHover: '#00956F',
  headerBg: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)',
  headerText: 'white',
  chatBg: '#ECE5DD',
  chatBgImage:
    'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h200v200H0z\' fill=\'%23ECE5DD\'/%3E%3Cpath d=\'M0 0l200 200M200 0L0 200\' stroke=\'%23DBD3CA\' stroke-width=\'.5\'/%3E%3C/svg%3E")',
  chatBgSize: '200px 200px',
  botBubbleBg: '#ECE5DD',
  botBubbleText: '#111b21',
  botBubbleBorder: 'rounded-tr-[8px] rounded-br-[8px] rounded-bl-[4px]',
  userBubbleBg: '#005C4B',
  userBubbleText: 'white',
  userBubbleBorder: 'rounded-tl-[8px] rounded-bl-[8px] rounded-br-[4px]',
  botTimestampColor: 'text-[#667781]',
  userTimestampColor: 'text-emerald-100/70',
  actionBg: '#F0F2F5',
  actionBorder: 'border-[#E9EDEF]',
  botBubbleRadius: 'rounded-2xl rounded-tl-[4px]',
  userBubbleRadius: 'rounded-2xl rounded-tr-[4px]',
  showTails: true,
  showEncrypted: true,
  encryptedText: '🔒 Messages are end-to-end encrypted. No one outside of this chat can read them.',
  footerText: '',
  botTailColor: '#ECE5DD',
  userTailColor: '#005C4B',
  inputBorderFocus: '#00A884',
  inputBorderFocusShadow: 'rgba(0,168,132,0.15)',
  sendBtnColor: '#00A884',
  sendBtnHover: '#00956F',
  idleSendColor: '#00A884',
  placeholderColor: '#8696a0',
  starBtnBg5: 'bg-amber-50',
  starBtnBorder5: 'border-amber-300',
  starBtnText5: 'text-amber-800',
  starBtnBg4: 'bg-emerald-50',
  starBtnBorder4: 'border-emerald-300',
  starBtnText4: 'text-emerald-800',
  starBtnBg3: 'bg-yellow-50',
  starBtnBorder3: 'border-yellow-300',
  starBtnText3: 'text-yellow-800',
  starBtnBg2: 'bg-orange-50',
  starBtnBorder2: 'border-orange-300',
  starBtnText2: 'text-orange-800',
  starBtnBg1: 'bg-red-50',
  starBtnBorder1: 'border-red-300',
  starBtnText1: 'text-red-800',
  reviewHintColor: 'text-[#667781]',
  inputTextColor: 'text-[#111b21]',
  notNowBorder: 'border-[#00A884]/30',
  notNowText: 'text-[#00A884]',
  secondaryBtnBg: 'bg-white',
};

const emailTheme: ChannelTheme = {
  primary: '#3B82F6',
  primaryHover: '#2563EB',
  headerBg: '#F9FAFB',
  headerText: '#111827',
  chatBg: '#FFFFFF',
  chatBgImage: null,
  chatBgSize: '0',
  botBubbleBg: '#F3F4F6',
  botBubbleText: '#111827',
  botBubbleBorder: 'rounded-lg',
  userBubbleBg: '#FFFFFF',
  userBubbleText: '#111827',
  userBubbleBorder: 'rounded-lg',
  botTimestampColor: 'text-[#9CA3AF]',
  userTimestampColor: 'text-[#9CA3AF]',
  actionBg: '#F9FAFB',
  actionBorder: 'border-[#E5E7EB]',
  botBubbleRadius: 'rounded-lg',
  userBubbleRadius: 'rounded-lg',
  showTails: false,
  showEncrypted: false,
  encryptedText: '',
  footerText: 'via aisocialreputation.com',
  botTailColor: 'transparent',
  userTailColor: 'transparent',
  inputBorderFocus: '#3B82F6',
  inputBorderFocusShadow: 'rgba(59,130,246,0.15)',
  sendBtnColor: '#3B82F6',
  sendBtnHover: '#2563EB',
  idleSendColor: '#3B82F6',
  placeholderColor: '#9CA3AF',
  starBtnBg5: 'bg-blue-50',
  starBtnBorder5: 'border-blue-300',
  starBtnText5: 'text-blue-800',
  starBtnBg4: 'bg-blue-50',
  starBtnBorder4: 'border-blue-200',
  starBtnText4: 'text-blue-700',
  starBtnBg3: 'bg-yellow-50',
  starBtnBorder3: 'border-yellow-300',
  starBtnText3: 'text-yellow-800',
  starBtnBg2: 'bg-orange-50',
  starBtnBorder2: 'border-orange-300',
  starBtnText2: 'text-orange-800',
  starBtnBg1: 'bg-red-50',
  starBtnBorder1: 'border-red-300',
  starBtnText1: 'text-red-800',
  reviewHintColor: 'text-[#6B7280]',
  inputTextColor: 'text-[#111827]',
  notNowBorder: 'border-[#9CA3AF]/40',
  notNowText: 'text-[#6B7280]',
  secondaryBtnBg: 'bg-white',
};

const smsTheme: ChannelTheme = {
  primary: '#007AFF',
  primaryHover: '#0066D6',
  headerBg: '#F2F2F7',
  headerText: '#000000',
  chatBg: '#FFFFFF',
  chatBgImage: null,
  chatBgSize: '0',
  botBubbleBg: '#E9E9EB',
  botBubbleText: '#000000',
  botBubbleBorder: 'rounded-[18px]',
  userBubbleBg: '#34C759',
  userBubbleText: '#FFFFFF',
  userBubbleBorder: 'rounded-[18px]',
  botTimestampColor: 'text-[#8E8E93]',
  userTimestampColor: 'text-white/60',
  actionBg: '#F2F2F7',
  actionBorder: 'border-[#E5E5EA]',
  botBubbleRadius: 'rounded-[18px]',
  userBubbleRadius: 'rounded-[18px]',
  showTails: false,
  showEncrypted: false,
  encryptedText: '',
  footerText: 'Text Message',
  botTailColor: 'transparent',
  userTailColor: 'transparent',
  inputBorderFocus: '#007AFF',
  inputBorderFocusShadow: 'rgba(0,122,255,0.15)',
  sendBtnColor: '#007AFF',
  sendBtnHover: '#0066D6',
  idleSendColor: '#007AFF',
  placeholderColor: '#8E8E93',
  starBtnBg5: 'bg-blue-50',
  starBtnBorder5: 'border-blue-300',
  starBtnText5: 'text-blue-800',
  starBtnBg4: 'bg-blue-50',
  starBtnBorder4: 'border-blue-200',
  starBtnText4: 'text-blue-700',
  starBtnBg3: 'bg-yellow-50',
  starBtnBorder3: 'border-yellow-300',
  starBtnText3: 'text-yellow-800',
  starBtnBg2: 'bg-orange-50',
  starBtnBorder2: 'border-orange-300',
  starBtnText2: 'text-orange-800',
  starBtnBg1: 'bg-red-50',
  starBtnBorder1: 'border-red-300',
  starBtnText1: 'text-red-800',
  reviewHintColor: 'text-[#8E8E93]',
  inputTextColor: 'text-[#000000]',
  notNowBorder: 'border-[#8E8E93]/40',
  notNowText: 'text-[#007AFF]',
  secondaryBtnBg: 'bg-white',
};

function getTheme(channel: 'whatsapp' | 'email' | 'sms'): ChannelTheme {
  if (channel === 'email') return emailTheme;
  if (channel === 'sms') return smsTheme;
  return whatsappTheme;
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

const GOOGLE_REVIEW_URL = 'https://share.google/GwppDhVAtD2vBG2vz';

/* ------------------------------------------------------------------ */
/*  Typing Indicator                                                    */
/* ------------------------------------------------------------------ */

function TypingIndicator({ theme }: { theme: ChannelTheme }) {
  return (
    <div className="flex justify-start">
      <div
        className={`relative max-w-[85%] px-4 py-3 text-sm leading-relaxed ${theme.botBubbleRadius}`}
        style={{
          backgroundColor: theme.botBubbleBg,
          boxShadow: '0 1px 1px rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center gap-[3px] py-[2px]">
          <span
            className="block w-[7px] h-[7px] rounded-full animate-[typingBounce_1.4s_infinite_0ms]"
            style={{ backgroundColor: theme === whatsappTheme ? '#8696a0' : '#9CA3AF' }}
          />
          <span
            className="block w-[7px] h-[7px] rounded-full animate-[typingBounce_1.4s_infinite_200ms]"
            style={{ backgroundColor: theme === whatsappTheme ? '#8696a0' : '#9CA3AF' }}
          />
          <span
            className="block w-[7px] h-[7px] rounded-full animate-[typingBounce_1.4s_infinite_400ms]"
            style={{ backgroundColor: theme === whatsappTheme ? '#8696a0' : '#9CA3AF' }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Channel Selector Screen                                            */
/* ------------------------------------------------------------------ */

function ChannelSelector({ onSelect }: { onSelect: (ch: 'whatsapp' | 'email' | 'sms') => void }) {
  const channels: {
    id: 'whatsapp' | 'email' | 'sms';
    name: string;
    desc: string;
    color: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      desc: 'Most popular · 80% open rate',
      color: '#00A884',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#00A884"/>
        </svg>
      ),
    },
    {
      id: 'email',
      name: 'Email',
      desc: 'Professional · Works everywhere',
      color: '#3B82F6',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="3" stroke="#3B82F6" strokeWidth="2" fill="none"/>
          <path d="M2 7l10 7 10-7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      ),
    },
    {
      id: 'sms',
      name: 'SMS',
      desc: 'Direct · No app needed',
      color: '#34C759',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="3" stroke="#34C759" strokeWidth="2" fill="none"/>
          <path d="M4 6h16" stroke="#34C759" strokeWidth="2"/>
          <circle cx="12" cy="17" r="1.5" fill="#34C759"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-5 relative" style={{ background: '#030712' }}>
      {/* Subtle glow effects */}
      <div
        className="absolute top-[20%] left-[10%] w-[80px] h-[80px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,168,132,0.15), transparent 70%)' }}
      />
      <div
        className="absolute bottom-[25%] right-[5%] w-[60px] h-[60px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)' }}
      />
      <div
        className="absolute top-[55%] left-[50%] -translate-x-1/2 w-[100px] h-[50px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(52,199,89,0.1), transparent 70%)' }}
      />

      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-6">
        SELECT CHANNEL
      </p>

      <h3 className="text-[17px] font-bold text-white mb-1 text-center">Choose a channel</h3>
      <p className="text-[11px] text-white/40 mb-6 text-center">
        See how the review flow works on each platform
      </p>

      <div className="w-full max-w-[180px] flex flex-col gap-2.5">
        {channels.map((ch) => (
          <motion.button
            key={ch.id}
            whileHover={{ scale: 1.03, x: 2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(ch.id)}
            className="flex items-center gap-3 w-full p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200 cursor-pointer text-left"
            style={{
              boxShadow: `0 0 20px ${ch.color}08, inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${ch.color}18` }}
            >
              {ch.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-white leading-tight">{ch.name}</p>
              <p className="text-[9.5px] text-white/40 leading-tight mt-0.5">{ch.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function CustomerExperienceSection() {
  /* ---- state ---- */
  const [channel, setChannel] = useState<ChannelType>('select');
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

  const theme = channel !== 'select' ? getTheme(channel) : whatsappTheme;

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
    if (!sectionVisible || channel === 'select') return;
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
  }, [channel, sectionVisible, addMessage]);

  /* ---- scroll on new messages (only when section is visible) ---- */
  useEffect(() => {
    if (sectionVisible && channel !== 'select') scrollToBottom();
  }, [messages, showTyping, scrollToBottom, sectionVisible, channel]);

  /* ---- focus input when it appears ---- */
  useEffect(() => {
    if (step === 'showing_review_input') {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [step]);

  /* ---- channel selection handler ---- */
  const handleChannelSelect = useCallback(
    (ch: 'whatsapp' | 'email' | 'sms') => {
      setChannel(ch);
      setStep('init');
      setMessages([]);
      setShowTyping(false);
      setReviewInput('');
      setInputFocused(false);
      msgIdRef.current = 0;
    },
    [],
  );

  /* ---- back to selector ---- */
  const handleBackToSelector = useCallback(() => {
    setChannel('select');
    setStep('init');
    setMessages([]);
    setShowTyping(false);
    setReviewInput('');
    setInputFocused(false);
    msgIdRef.current = 0;
  }, []);

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
    addMessage('user', 'Yes, I\'ll leave a review! 🌟');
    setStep('completed');
  };

  const handleReviewSubmit = () => {
    if (step !== 'showing_review_input' || !reviewInput.trim()) return;
    addMessage('user', reviewInput.trim());
    setReviewInput('');
    setInputFocused(false);
    setStep('transition_review');

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
                <AnimatePresence mode="wait">
                  {channel === 'select' ? (
                    <motion.div
                      key="channel-select"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      {/* Status bar for selector */}
                      <div
                        className="relative flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-white shrink-0"
                        style={{ background: '#030712' }}
                      >
                        <span>9:41</span>
                        <div className="absolute left-1/2 -translate-x-1/2 top-[10px] w-[72px] h-[20px] sm:w-[76px] sm:h-[22px] rounded-full bg-black" />
                        <div className="flex items-center gap-1.5">
                          <svg width="15" height="12" viewBox="0 0 15 12" fill="none"><path d="M7.5 3.6c1.6 0 3 .6 4.1 1.7l.9-.9A8.3 8.3 0 007.5 2.1a8.3 8.3 0 00-5 1.7l.9.9A5.5 5.5 0 017.5 3.6z" fill="white"/><path d="M7.5 6.2c.9 0 1.8.4 2.5 1l.9-.9A4.2 4.2 0 007.5 4.6a4.2 4.2 0 00-3.4 1.7l.9.9c.7-.6 1.6-1 2.5-1z" fill="white"/><circle cx="7.5" cy="8.8" r="1.3" fill="white"/></svg>
                          <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0" y="1" width="21" height="10" rx="2" stroke="white" strokeWidth="1"/><rect x="1.5" y="2.5" width="15" height="7" rx="1" fill="white"/><path d="M22.5 4.5v3a2 2 0 000-3z" fill="white"/></svg>
                        </div>
                      </div>
                      <ChannelSelector onSelect={handleChannelSelect} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`chat-${channel}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col h-full"
                    >
                      {/* ---------- Status Bar ---------- */}
                      <StatusBar theme={theme} channel={channel} />

                      {/* ---------- Channel Header ---------- */}
                      <ChannelHeader
                        theme={theme}
                        channel={channel}
                        onBack={handleBackToSelector}
                      />

                      {/* ---------- Chat Area ---------- */}
                      <div
                        className="flex-1 overflow-y-auto pl-4 pr-3 py-3 space-y-[3px] chat-scroll"
                        style={{
                          backgroundColor: theme.chatBg,
                          backgroundImage: theme.chatBgImage || 'none',
                          backgroundSize: theme.chatBgImage ? theme.chatBgSize : '0',
                        }}
                      >
                        {/* encrypted notice / footer text */}
                        {messages.length === 0 && !showTyping && (
                          <div className="flex justify-center py-3">
                            {theme.showEncrypted ? (
                              <span
                                className="text-[11px] text-[#8696a0] bg-[#fff3c4] px-2 py-[3px] rounded-sm text-center leading-tight"
                              >
                                {theme.encryptedText}
                              </span>
                            ) : theme.footerText ? (
                              <span className="text-[10px] text-[#8E8E93] text-center leading-tight">
                                {theme.footerText}
                              </span>
                            ) : null}
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
                                    isBot ? theme.botBubbleBorder : theme.userBubbleBorder
                                  }`}
                                  style={{
                                    backgroundColor: isBot ? theme.botBubbleBg : theme.userBubbleBg,
                                    color: isBot ? theme.botBubbleText : theme.userBubbleText,
                                    boxShadow: '0 1px 0.5px rgba(11,20,26,0.13)',
                                    ...(channel === 'email'
                                      ? { borderLeft: `3px solid ${isBot ? '#3B82F6' : '#3B82F6'}` }
                                      : {}),
                                  }}
                                >
                                  {/* tail */}
                                  {theme.showTails && isBot && (
                                    <div
                                      className="absolute top-0 left-[-8px] w-0 h-0"
                                      style={{
                                        borderRight: `8px solid ${theme.botTailColor}`,
                                        borderTop: `8px solid ${theme.botTailColor}`,
                                        borderLeft: '8px solid transparent',
                                        borderBottom: '8px solid transparent',
                                        borderTopLeftRadius: '6px',
                                      }}
                                    />
                                  )}
                                  {theme.showTails && !isBot && (
                                    <div
                                      className="absolute top-0 right-[-8px] w-0 h-0"
                                      style={{
                                        borderLeft: `8px solid ${theme.userTailColor}`,
                                        borderTop: `8px solid ${theme.userTailColor}`,
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
                                      isBot ? theme.botTimestampColor : theme.userTimestampColor
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
                              <TypingIndicator theme={theme} />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div ref={chatEndRef} />
                      </div>

                      {/* ---------- Action Area ---------- */}
                      <div
                        className={`shrink-0 border-t ${theme.actionBorder}`}
                        style={{ backgroundColor: theme.actionBg }}
                      >
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
                                className="flex-1 py-2 rounded-full hover:opacity-90 active:scale-[0.97] text-white text-[11.5px] font-semibold transition-all duration-150 cursor-pointer shadow-sm"
                                style={{ backgroundColor: theme.primary }}
                              >
                                {channel === 'email' ? 'Yes, I\'d love to!' : 'Yes, definitely!'}
                              </button>
                              <button
                                onClick={handleNotNow}
                                className={`flex-1 py-2 rounded-full ${theme.secondaryBtnBg} hover:opacity-80 active:scale-[0.97] text-[11.5px] font-semibold border ${theme.notNowBorder} ${theme.notNowText} transition-all duration-150 cursor-pointer`}
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
                              {[5, 4, 3, 2, 1].map((n) => {
                                const bgMap: Record<number, { bg: string; border: string; text: string }> = {
                                  5: { bg: theme.starBtnBg5, border: theme.starBtnBorder5, text: theme.starBtnText5 },
                                  4: { bg: theme.starBtnBg4, border: theme.starBtnBorder4, text: theme.starBtnText4 },
                                  3: { bg: theme.starBtnBg3, border: theme.starBtnBorder3, text: theme.starBtnText3 },
                                  2: { bg: theme.starBtnBg2, border: theme.starBtnBorder2, text: theme.starBtnText2 },
                                  1: { bg: theme.starBtnBg1, border: theme.starBtnBorder1, text: theme.starBtnText1 },
                                };
                                const s = bgMap[n];
                                return (
                                  <motion.button
                                    key={n}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleStarSelect(n)}
                                    className={`w-full py-2 px-3.5 rounded-xl text-left text-[12px] font-medium transition-all duration-150 cursor-pointer border flex items-center gap-1.5 ${s.bg} ${s.border} ${s.text} hover:opacity-90`}
                                  >
                                    <span className="text-base">{'⭐'.repeat(n)}</span>
                                    <span>{n} star{n > 1 ? 's' : ''}</span>
                                  </motion.button>
                                );
                              })}
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
                              <p className={`text-[10px] ${theme.reviewHintColor} mb-1.5 px-1`}>
                                Tell us how we can improve (optional):
                              </p>
                              <div className="flex items-center gap-1.5">
                                <div
                                  className={`flex-1 flex items-center rounded-full bg-white border-2 transition-all duration-200 ${
                                    inputFocused
                                      ? 'border-[var(--input-focus)]'
                                      : 'border-[#E9EDEF]'
                                  }`}
                                  style={{
                                    '--input-focus': theme.inputBorderFocus,
                                    boxShadow: inputFocused
                                      ? `0 0 0 2px ${theme.inputBorderFocusShadow}`
                                      : 'none',
                                  } as React.CSSProperties}
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
                                    className={`flex-1 bg-transparent px-3 py-2 text-[12px] ${theme.inputTextColor} outline-none`}
                                    style={{ color: undefined }}
                                  />
                                  <button
                                    onClick={handleReviewSubmit}
                                    disabled={!reviewInput.trim()}
                                    className={`mr-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 ${
                                      reviewInput.trim()
                                        ? 'text-white shadow-sm active:scale-95'
                                        : 'cursor-not-allowed'
                                    }`}
                                    style={{
                                      backgroundColor: reviewInput.trim()
                                        ? theme.sendBtnColor
                                        : `${theme.sendBtnColor}30`,
                                      color: reviewInput.trim() ? 'white' : theme.sendBtnColor,
                                    }}
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
                                className="w-full py-2.5 rounded-full hover:opacity-90 active:scale-[0.97] text-white text-[12px] font-semibold transition-all duration-150 cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                                style={{ backgroundColor: theme.primary }}
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

                          {/* Completed / idle / transition */}
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
                              <div
                                className="flex-1 flex items-center rounded-full px-3 py-2"
                                style={{
                                  backgroundColor: channel === 'whatsapp' ? 'white' : (channel === 'email' ? '#F3F4F6' : '#E5E5EA'),
                                }}
                              >
                                <span
                                  className="text-[11px]"
                                  style={{ color: theme.placeholderColor }}
                                >
                                  {step === 'completed'
                                    ? 'Chat completed'
                                    : step.startsWith('transition')
                                      ? 'Typing…'
                                      : 'Type a message'}
                                </span>
                              </div>
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
                                style={{ backgroundColor: theme.idleSendColor }}
                              >
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
                    </motion.div>
                  )}
                </AnimatePresence>
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
/*  Status Bar Sub-component                                           */
/* ------------------------------------------------------------------ */

function StatusBar({ theme, channel }: { theme: ChannelTheme; channel: 'whatsapp' | 'email' | 'sms' }) {
  const isWhatsApp = channel === 'whatsapp';
  return (
    <div
      className="relative flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-semibold text-white shrink-0"
      style={{ background: isWhatsApp ? theme.headerBg : (channel === 'sms' ? '#F2F2F7' : '#F9FAFB') }}
    >
      <span style={{ color: isWhatsApp ? 'white' : '#000' }}>9:41</span>
      <div className="absolute left-1/2 -translate-x-1/2 top-[10px] w-[72px] h-[20px] sm:w-[76px] sm:h-[22px] rounded-full bg-black" />
      <div className="flex items-center gap-1.5" style={{ color: isWhatsApp ? 'white' : '#000' }}>
        <svg width="15" height="12" viewBox="0 0 15 12" fill="none"><path d="M7.5 3.6c1.6 0 3 .6 4.1 1.7l.9-.9A8.3 8.3 0 007.5 2.1a8.3 8.3 0 00-5 1.7l.9.9A5.5 5.5 0 017.5 3.6z" fill="currentColor"/><path d="M7.5 6.2c.9 0 1.8.4 2.5 1l.9-.9A4.2 4.2 0 007.5 4.6a4.2 4.2 0 00-3.4 1.7l.9.9c.7-.6 1.6-1 2.5-1z" fill="currentColor"/><circle cx="7.5" cy="8.8" r="1.3" fill="currentColor"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0" y="1" width="21" height="10" rx="2" stroke="currentColor" strokeWidth="1"/><rect x="1.5" y="2.5" width="15" height="7" rx="1" fill="currentColor"/><path d="M22.5 4.5v3a2 2 0 000-3z" fill="currentColor"/></svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Channel Header Sub-component                                       */
/* ------------------------------------------------------------------ */

function ChannelHeader({
  theme,
  channel,
  onBack,
}: {
  theme: ChannelTheme;
  channel: 'whatsapp' | 'email' | 'sms';
  onBack: () => void;
}) {
  if (channel === 'whatsapp') {
    return (
      <div
        className="flex items-center gap-2 px-3 py-1.5 shrink-0 border-b border-white/10"
        style={{ background: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)' }}
      >
        {/* back arrow to channel selector */}
        <button
          onClick={onBack}
          className="shrink-0 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <svg
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
        </button>

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
    );
  }

  if (channel === 'email') {
    return (
      <div
        className="flex flex-col shrink-0 border-b border-[#E5E7EB]"
        style={{ background: '#F9FAFB' }}
      >
        <div className="flex items-center gap-2 px-3 py-1.5">
          <button
            onClick={onBack}
            className="shrink-0 text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
          >
            <svg
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
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-[#111827] truncate leading-tight">
              AI Social Reputation
            </p>
            <p className="text-[10px] text-[#6B7280] truncate leading-tight">
              Subject: How was your experience?
            </p>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </div>
      </div>
    );
  }

  /* SMS / iMessage header */
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 shrink-0 border-b border-[#E5E5EA]"
      style={{ background: '#F2F2F7' }}
    >
      <button
        onClick={onBack}
        className="shrink-0 text-[#007AFF] hover:text-[#0056CC] transition-colors cursor-pointer"
      >
        <svg
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
      </button>

      {/* back chevron + Messages label */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#007AFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-[#000000] leading-tight text-center">
          Messages
        </p>
      </div>
      <div className="w-[36px]" />
    </div>
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
