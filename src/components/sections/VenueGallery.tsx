import React, { useEffect, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin, X } from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';

export const EVENT_DETAILS = {
  date: 'Kamis, 1 Oktober 2026',
  time: '09.00–17.00 WIB',
  venue: 'Aloft by Marriott Jakarta Kebon Jeruk, Jakarta Barat',
};

const venueImages = [
  {
    src: '/oct-2026/venue/venue-ballroom.jpg',
    title: 'Grand ballroom',
    alt: 'Grand ballroom at Aloft by Marriott Jakarta Kebon Jeruk',
  },
  {
    src: '/oct-2026/venue/venue-prefunction.jpg',
    title: 'Pre-function area',
    alt: 'Pre-function area outside the event rooms at Aloft by Marriott Jakarta Kebon Jeruk',
  },
  {
    src: '/oct-2026/venue/venue-sky-lobby.jpg',
    title: 'Sky lobby',
    alt: 'Sky lobby lounge at Aloft by Marriott Jakarta Kebon Jeruk',
  },
  {
    src: '/oct-2026/venue/venue-reception.jpg',
    title: 'Lobby and reception',
    alt: 'Colorful lobby and reception area at Aloft by Marriott Jakarta Kebon Jeruk',
  },
  {
    src: '/oct-2026/venue/venue-lounge.jpg',
    title: 'W XYZ lounge',
    alt: 'W XYZ lounge at Aloft by Marriott Jakarta Kebon Jeruk',
  },
];

type EventScheduleProps = {
  compact?: boolean;
  className?: string;
};

const EventSchedule: React.FC<EventScheduleProps> = ({ compact = false, className = '' }) => {
  if (compact) {
    return (
      <div className={`flex flex-col gap-3 text-left sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2 ${className}`}>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-200">
          <CalendarDays className="h-4 w-4 text-gold-400" /> {EVENT_DETAILS.date}
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-200">
          <Clock3 className="h-4 w-4 text-gold-400" /> {EVENT_DETAILS.time}
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-200">
          <MapPin className="h-4 w-4 text-gold-400" /> {EVENT_DETAILS.venue}
        </span>
      </div>
    );
  }

  return (
    <div className={`grid gap-3 border border-gold-500/25 bg-zinc-950/70 p-4 text-left sm:grid-cols-3 sm:p-5 ${className}`}>
      <div className="flex items-start gap-3">
        <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Tanggal</p>
          <p className="mt-1 text-sm font-bold text-white">{EVENT_DETAILS.date}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Waktu</p>
          <p className="mt-1 text-sm font-bold text-white">{EVENT_DETAILS.time}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Lokasi</p>
          <p className="mt-1 text-sm font-bold leading-snug text-white">{EVENT_DETAILS.venue}</p>
        </div>
      </div>
    </div>
  );
};

const VenueGallery: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenIndex(null);
      if (event.key === 'ArrowRight') setOpenIndex((current) => current === null ? 0 : (current + 1) % venueImages.length);
      if (event.key === 'ArrowLeft') setOpenIndex((current) => current === null ? venueImages.length - 1 : (current - 1 + venueImages.length) % venueImages.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openIndex]);

  const activeImage = openIndex === null ? null : venueImages[openIndex];

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20 md:py-28" aria-labelledby="venue-gallery-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,106,0.12),transparent_34%)]" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <FadeIn direction="up">
          <div className="mx-auto mb-10 max-w-4xl md:mb-12">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-gold-400">Venue experience</p>
            <h2 id="venue-gallery-title" className="font-serif text-3xl font-bold leading-tight text-white md:text-5xl">
              Satu Hari untuk Memimpin di Tempat yang Dirancang untuk Berpikir Besar
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-lg">
              Alpha Managers berlangsung dalam suasana premium yang membantu peserta fokus, terlibat, dan siap menerjemahkan pembelajaran ke performa tim.
            </p>
            <EventSchedule className="mt-7" />
          </div>
        </FadeIn>

        <div className="grid gap-4 lg:grid-cols-[1.16fr_1fr]">
          <FadeIn direction="up" delay={0.1}>
            <button
              type="button"
              className="group relative block aspect-[4/3] w-full overflow-hidden border border-gold-500/30 bg-zinc-900 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              onClick={() => setOpenIndex(0)}
              aria-label={`Buka foto ${venueImages[0].title}`}
            >
              <img src={venueImages[0].src} alt={venueImages[0].alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-5 pb-5 pt-14 text-sm font-bold text-white">{venueImages[0].title}</span>
            </button>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4">
            {venueImages.slice(1).map((image, index) => (
              <FadeIn key={image.src} direction="up" delay={0.12 + index * 0.05}>
                <button
                  type="button"
                  className="group relative block aspect-[4/3] w-full overflow-hidden border border-white/10 bg-zinc-900 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                  onClick={() => setOpenIndex(index + 1)}
                  aria-label={`Buka foto ${image.title}`}
                >
                  <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-10 text-xs font-bold text-white">{image.title}</span>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {activeImage && openIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8" role="dialog" aria-modal="true" aria-label={`Venue photo: ${activeImage.title}`} onClick={() => setOpenIndex(null)}>
          <button type="button" className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400" onClick={() => setOpenIndex(null)} aria-label="Close venue gallery">
            <X className="h-5 w-5" />
          </button>
          <button type="button" className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 md:left-8" onClick={(event) => { event.stopPropagation(); setOpenIndex((openIndex - 1 + venueImages.length) % venueImages.length); }} aria-label="Previous venue photo">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex max-h-full max-w-6xl flex-col items-center gap-4" onClick={(event) => event.stopPropagation()}>
            <img src={activeImage.src} alt={activeImage.alt} className="max-h-[78vh] max-w-full object-contain" />
            <p className="text-center text-sm font-bold text-white">{activeImage.title} <span className="ml-2 font-normal text-zinc-400">{openIndex + 1} / {venueImages.length}</span></p>
          </div>
          <button type="button" className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 md:right-8" onClick={(event) => { event.stopPropagation(); setOpenIndex((openIndex + 1) % venueImages.length); }} aria-label="Next venue photo">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
};

export { EventSchedule, VenueGallery };
