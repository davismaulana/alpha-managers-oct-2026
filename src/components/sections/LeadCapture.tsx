import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';
import { CTA_LABEL, EVENT_NAME, FORM_SECTION_ID } from '../../lib/constants';

type FormState = {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  role: string;
  city: string;
  participantCount: string;
  managerChallenge: string;
};

type SubmitState =
  | { status: 'idle'; message: string }
  | { status: 'submitting'; message: string }
  | { status: 'preview'; message: string; leadId: string }
  | { status: 'success'; message: string; leadId: string }
  | { status: 'error'; message: string };

const initialForm: FormState = {
  name: '',
  email: '',
  whatsapp: '',
  company: '',
  role: '',
  city: '',
  participantCount: '',
  managerChallenge: '',
};

const roleOptions = [
  'Business Owner / Founder',
  'HR Leader',
  'Learning & Development',
  'General Manager / COO',
  'Manager / Team Leader',
  'Lainnya',
];

const CAMPAIGN_PREFIX = 'cfr-oct-2026';
const DEFAULT_UTM_CAMPAIGN = 'alpha-managers-oct-2026';
const DEFAULT_UTM_SOURCE = 'alpha-managers-oct-2026-lp';

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
};

const createEventId = () => {
  if (window.crypto?.randomUUID) {
    return `${CAMPAIGN_PREFIX}-${window.crypto.randomUUID()}`;
  }
  return `${CAMPAIGN_PREFIX}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const LeadCapture: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: 'idle',
    message:
      'Isi profil perusahaan, peran Anda, dan tantangan manager terpenting. Tim Alpha Leaders akan menilai kesesuaian.',
  });

  const sourceMeta = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      pageUrl: window.location.href,
      utmCampaign: params.get('utm_campaign') || DEFAULT_UTM_CAMPAIGN,
      utmMedium: params.get('utm_medium') || '',
      utmSource: params.get('utm_source') || DEFAULT_UTM_SOURCE,
      utmContent: params.get('utm_content') || '',
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
    };
  }, []);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (submitState.status === 'error') {
      setSubmitState({ status: 'idle', message: 'Periksa lagi datanya, lalu kirim ulang.' });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState({ status: 'submitting', message: 'Mengirim profil perusahaan...' });

    try {
      const eventId = createEventId();
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          company: form.company,
          role: form.role,
          city: form.city,
          participant_count: form.participantCount,
          manager_challenge: form.managerChallenge,
          event_id: eventId,
          fbp: sourceMeta.fbp,
          fbc: sourceMeta.fbc,
          source: sourceMeta.utmSource,
          page_url: sourceMeta.pageUrl,
          utm_source: sourceMeta.utmSource,
          utm_medium: sourceMeta.utmMedium,
          utm_campaign: sourceMeta.utmCampaign,
          utm_content: sourceMeta.utmContent,
        }),
      });
      const body = await response.json();

      if (!response.ok || !body.ok) {
        throw new Error(body.error || 'Form belum berhasil dikirim.');
      }

      if (body.preview) {
        setSubmitState({
          status: 'preview',
          leadId: body.leadId,
          message:
            body.message ||
            'Preview aktif. Profil belum tersimpan ke sistem registrasi karena webhook Oktober belum dikonfigurasi.',
        });
        return;
      }

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: EVENT_NAME,
          content_category: 'Alpha Leaders Managers Event',
          lead_id: body.leadId,
          event_id: eventId,
        });
      }

      setForm(initialForm);
      setSubmitState({
        status: 'success',
        leadId: body.leadId,
        message:
          'Profil diterima. Tim Alpha Leaders akan meninjau kecocokan dan menghubungi Anda via WhatsApp.',
      });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Form belum berhasil dikirim.',
      });
    }
  };

  return (
    <section
      id={FORM_SECTION_ID}
      className="scroll-mt-24 bg-[var(--cf-cream)] text-zinc-950 py-20 md:py-28 overflow-hidden"
      aria-label="Application form — Alpha Leaders"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          <FadeIn direction="up">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] tracking-[0.22em] uppercase text-gold-700 font-black mb-4">
                Profil undangan
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight tracking-normal">
                Apply untuk Undangan Secara Selektif
              </h2>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-700 max-w-xl">
                Mulai dari profil perusahaan, peran Anda, dan tantangan manager paling krusial. Tim
                Alpha Leaders akan menilai kecocokan konteks bisnis Anda sebelum mengonfirmasi seat
                dan instruksi kehadiran.
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  'Data masuk sebagai calon peserta Alpha Managers 1 Oktober 2026.',
                  'Tim Alpha Leaders meninjau kesesuaian konteks organisasi dan prioritas manager Anda.',
                  'Follow-up dilakukan via WhatsApp untuk konfirmasi seat dan langkah berikutnya.',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm font-semibold text-zinc-800"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-black/10 rounded-xl p-5 md:p-8 shadow-[0_24px_70px_rgba(30,20,8,0.18)]"
            >
              <div className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-5 mb-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                    2 menit
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold tracking-normal">
                    Profil perusahaan Anda
                  </h3>
                </div>
                <ShieldCheck className="h-9 w-9 shrink-0 text-gold-700" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="grid gap-2 text-sm font-bold text-zinc-800">
                  Nama PIC / owner
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="min-h-12 rounded-lg border border-zinc-300 bg-white px-4 text-base font-medium outline-none focus:border-gold-600 focus:ring-4 focus:ring-gold-500/20"
                    placeholder="Nama Anda"
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold text-zinc-800">
                  WhatsApp aktif
                  <input
                    required
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.whatsapp}
                    onChange={(event) => updateField('whatsapp', event.target.value)}
                    className="min-h-12 rounded-lg border border-zinc-300 bg-white px-4 text-base font-medium outline-none focus:border-gold-600 focus:ring-4 focus:ring-gold-500/20"
                    placeholder="0812 3456 7890"
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold text-zinc-800">
                  Email
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="min-h-12 rounded-lg border border-zinc-300 bg-white px-4 text-base font-medium outline-none focus:border-gold-600 focus:ring-4 focus:ring-gold-500/20"
                    placeholder="nama@email.com"
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold text-zinc-800">
                  Nama perusahaan
                  <input
                    required
                    name="company"
                    value={form.company}
                    onChange={(event) => updateField('company', event.target.value)}
                    className="min-h-12 rounded-lg border border-zinc-300 bg-white px-4 text-base font-medium outline-none focus:border-gold-600 focus:ring-4 focus:ring-gold-500/20"
                    placeholder="Contoh: Sari Rasa Group"
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold text-zinc-800">
                  Peran Anda
                  <select
                    required
                    name="role"
                    value={form.role}
                    onChange={(event) => updateField('role', event.target.value)}
                    className="min-h-12 rounded-lg border border-zinc-300 bg-white px-4 text-base font-medium outline-none focus:border-gold-600 focus:ring-4 focus:ring-gold-500/20"
                  >
                    <option value="">Pilih peran</option>
                    {roleOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-bold text-zinc-800">
                  Kota / domisili bisnis
                  <input
                    required
                    name="city"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(event) => updateField('city', event.target.value)}
                    className="min-h-12 rounded-lg border border-zinc-300 bg-white px-4 text-base font-medium outline-none focus:border-gold-600 focus:ring-4 focus:ring-gold-500/20"
                    placeholder="Jakarta, Surabaya, Bandung"
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold text-zinc-800 md:col-span-2">
                  Jumlah manager / team leader yang ingin Anda siapkan
                  <input
                    required
                    name="participantCount"
                    value={form.participantCount}
                    onChange={(event) => updateField('participantCount', event.target.value)}
                    className="min-h-12 rounded-lg border border-zinc-300 bg-white px-4 text-base font-medium outline-none focus:border-gold-600 focus:ring-4 focus:ring-gold-500/20"
                    placeholder="Contoh: 3 manager inti"
                  />
                </label>
              </div>

              <label className="mt-4 grid gap-2 text-sm font-bold text-zinc-800">
                Tantangan manager yang paling ingin Anda ubah
                <textarea
                  required
                  name="managerChallenge"
                  value={form.managerChallenge}
                  onChange={(event) => updateField('managerChallenge', event.target.value)}
                  className="min-h-28 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base font-medium outline-none focus:border-gold-600 focus:ring-4 focus:ring-gold-500/20"
                  placeholder="Contoh: target tidak tercapai konsisten, delegasi tidak jalan, atau owner masih harus turun tangan tiap hari."
                />
              </label>

              <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4">
                <button
                  type="submit"
                  disabled={submitState.status === 'submitting'}
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-zinc-950 px-8 text-base font-black text-white transition hover:bg-gold-700 hover:text-black disabled:pointer-events-none disabled:opacity-60"
                >
                  {submitState.status === 'submitting' ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Mengirim
                    </>
                  ) : (
                    <>
                      {CTA_LABEL}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>

                <p
                  className={[
                    'text-sm leading-relaxed',
                    submitState.status === 'success'
                      ? 'text-emerald-700'
                      : submitState.status === 'preview'
                        ? 'text-amber-700'
                      : submitState.status === 'error'
                        ? 'text-rose-700'
                        : 'text-zinc-600',
                  ].join(' ')}
                >
                  {submitState.message}
                </p>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export { LeadCapture };
