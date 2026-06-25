'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CustomerExperienceSection from '@/components/landing/CustomerExperienceSection';
import ChannelSection from '@/components/landing/ChannelSection';
import StarPathSection from '@/components/landing/StarPathSection';
import AIRepliesSection from '@/components/landing/AIRepliesSection';
import SocialProofSection from '@/components/landing/SocialProofSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import WhoIsItForSection from '@/components/landing/WhoIsItForSection';
import CTASection from '@/components/landing/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <CustomerExperienceSection />
      <ChannelSection />
      <StarPathSection />
      <AIRepliesSection />
      <SocialProofSection />
      <BenefitsSection />
      <WhoIsItForSection />
      <CTASection />
    </main>
  );
}