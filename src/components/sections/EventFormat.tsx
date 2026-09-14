import React from 'react';
import { ArrowRight, CircleCheck, Gift, MessageCircle, Ticket } from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';
import {
  CTA_URL,
  TICKET_URL,
  trackTicketCTA,
  trackWhatsAppCTA,
} from '../../lib/constants';
import { EventSchedule } from './VenueGallery';

const packageItems = [
  'Breakfast, lunch, dan coffee break',
  'Handbook materi',
  'Sertifikat kehadiran',
  'Q&A dengan mentor',
  'Pre-test dan post-test',
  'Networking eksklusif manager',
  'Potongan untuk kelas berikutnya',
];

const OCTOBER_TICKET_PRICE = '5.999.999';

const EventFormat: React.FC = () => (
  <section className="relative overflow-hidden bg-zinc-950 py-24 md:py-32">
    <div className="container relative z-10 mx-auto px-4 md:px-6">
      <FadeIn direction="up">
        <div className="mx-auto max-w-6xl overflow-hidden border border-gold-500/25 bg-[linear-gradient(145deg,rgba(10,10,10,0.96),rgba(20,17,11,0.94))] backdrop-blur-md md:grid md:grid-cols-[0.92fr_1.08fr]">
          <div className="relative border-b border-gold-500/20 p-6 md:border-b-0 md:border-r md:p-8">
            <div className="relative mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold-500/30 bg-gold-500/10 text-gold-300">
                <Gift className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-gold-300">Termasuk</p>
                <h2 className="mt-1 text-2xl font-black text-white">Workshop package</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {packageItems.map((item) => (
                <div key={item} className="flex items-start gap-3 border border-white/10 bg-black/28 px-4 py-3">
                  <CircleCheck className="mt-1 h-4 w-4 shrink-0 text-gold-400" />
                  <p className="text-sm leading-relaxed text-zinc-200">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col justify-between p-6 md:min-h-[360px] md:p-9">
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,transparent_0%,transparent_52%,rgba(212,175,106,0.08)_52%,rgba(212,175,106,0.08)_54%,transparent_54%)]" />
            <div className="relative">
              <EventSchedule compact className="mb-7 border-b border-white/10 pb-6" />
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md border border-gold-500/30 bg-gold-500/10 text-gold-300">
                  <Ticket className="h-5 w-5" />
                </span>
                <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400">Premium Offline Jakarta</p>
              </div>
              <h2 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
                Investasi untuk manager yang harus mulai memimpin hasil.
              </h2>
              <div className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-2">
                <span className="font-serif text-5xl font-bold leading-none text-gold-200 md:text-6xl">{OCTOBER_TICKET_PRICE}</span>
                <span className="pb-2 text-lg font-semibold text-zinc-500 line-through md:text-xl">9.999.000</span>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
                Amankan kursi lewat link tiket, atau tanya dulu dengan Julia di WhatsApp bila ada yang ingin dikonfirmasi.
              </p>
            </div>

            <div className="relative mt-8 flex flex-col items-stretch gap-3 sm:items-start">
              <a
                href={TICKET_URL}
                target="_blank"
                rel="noreferrer"
                onClick={trackTicketCTA}
                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-10 text-lg font-bold text-black shadow-lg shadow-gold-900/20 transition-all hover:-translate-y-0.5 hover:from-gold-400 hover:to-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 sm:w-auto"
              >
                Bayar Tiket Sekarang <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href={CTA_URL}
                target="_blank"
                rel="noreferrer"
                onClick={trackWhatsAppCTA}
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-green-400/50 bg-green-500/10 px-8 text-base font-bold text-green-300 transition-colors hover:bg-green-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 sm:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" /> Tanya Dulu via WhatsApp
              </a>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-gold-300/70">
                By invitation only · Full day workshop
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

export { EventFormat };
