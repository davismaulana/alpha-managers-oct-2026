import React from 'react';
import { FadeIn } from '../animations/FadeIn';

const VideoProof: React.FC = () => {
  return (
    <section id="video" className="py-20 bg-[#F5F0E8] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4 text-gray-900">
              Apa Kata Mereka Tentang Coach Ferly & Alpha Leaders
            </h2>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.15}>
          <div className="max-w-4xl mx-auto rounded-[28px] overflow-hidden border border-gold-500/25 bg-black shadow-[0_22px_80px_-35px_rgba(0,0,0,0.55)]">
            <video
              controls
              preload="metadata"
              playsInline
              className="w-full aspect-video bg-black object-cover"
              poster="/october-event-poster.png"
            >
              <source src="/august-client-session.mp4" type="video/mp4" />
              Browser Anda tidak mendukung pemutaran video.
            </video>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export { VideoProof };
