import React from 'react';
import { FadeIn } from '../animations/FadeIn';

const IndustryTrust: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[var(--cf-ink)] to-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-10 md:mb-12">
          <FadeIn direction="up">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight">
              Dipercaya Berbagai Industri
            </h2>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.3}>
          <div className="relative overflow-hidden border border-gold-500/30 bg-[var(--cf-cream)] p-4 md:p-6">
            <img
              src="/industry-trust-october.png"
              alt="Logo collage of industries Coach Ferly has served"
              className="relative w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export { IndustryTrust };
