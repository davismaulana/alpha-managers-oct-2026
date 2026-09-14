import React from 'react';
import { Button } from '../ui/Button';
import { FadeIn } from '../animations/FadeIn';
import { openRegistrationCTA } from '../../lib/constants';
import { EventSchedule } from './VenueGallery';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full bg-black pt-16 pb-10 md:pt-24 md:pb-12 overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-6">
        <FadeIn direction="up" duration={0.9}>
          <div className="mx-auto max-w-4xl text-center mb-8 md:mb-12">
            <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight tracking-[-0.03em]">
              Manager Anda Belum Kerja Seperti Yang Anda Harapkan? Semua Masih Anda Yang Harus Kerjakan Sendiri?
            </h1>
            <p className="mt-5 text-lg md:text-2xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              Saatnya perusahaan Anda memiliki manager yang benar-benar bisa diandalkan untuk mencapai hasil nyata di lapangan.
            </p>
          </div>
        </FadeIn>

        <FadeIn duration={1.2}>
          <div className="rounded-[28px] border border-white/10 bg-zinc-950/80 shadow-[0_30px_120px_rgba(0,0,0,0.45)] overflow-hidden">
            <img
              src="/october-event-poster.png"
              alt="Poster event Alpha Managers 1 Oktober 2026"
              className="w-full h-auto object-contain"
            />
          </div>
        </FadeIn>

        <EventSchedule className="mx-auto mt-6 max-w-4xl" />

        <div className="mt-6 flex justify-center">
          <Button
            className="min-w-[220px] h-[52px] md:min-w-[320px] md:h-[60px] cursor-pointer"
            onClick={openRegistrationCTA}
          >
            Daftar via WA
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Hero };
