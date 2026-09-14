import React from 'react';
import { FadeIn } from '../animations/FadeIn';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4 text-center">
        <FadeIn direction="up">
          <p className="text-gold-500 font-bold tracking-wider mb-2">ALPHA LEADERS COMMUNITY</p>
          <p className="text-gray-600 text-sm">Alpha Managers Event · 1 Oktober 2026 · Jakarta</p>
        </FadeIn>
      </div>
    </footer>
  );
};

export { Footer };
