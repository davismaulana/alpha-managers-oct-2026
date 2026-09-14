import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const port = Number(process.env.PORT || 80);
const leadWebhookUrl = String(process.env.LEAD_WEBHOOK_URL || '').trim();
const previewLeadMessage =
  'Preview aktif. Profil undangan belum tersimpan karena webhook Event Ini belum dikonfigurasi.';

const CAMPAIGN_ID = 'cfr-oct-2026';
const EVENT_NAME = 'Alpha Managers 3.0 Exclusive Workshop - 1 Oktober 2026';
const DEFAULT_UTM_CAMPAIGN = 'alpha-managers-oct-2026';
const DEFAULT_UTM_SOURCE = 'alpha-managers-oct-2026-lp';
const DEFAULT_SOURCE = 'alpha-managers-oct-2026-lp';

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
};

const requiredFields = [
  'business_type',
  'monthly_revenue',
  'team_size',
  'team_challenges',
  'business_impact',
  'owner_dependence',
  'desired_outcome',
  'workshop_focus',
];

const sendJson = (response, status, payload) => {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(payload));
};

const readBody = async (request) => {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 100_000) {
      throw new Error('Payload terlalu besar.');
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
};

const cleanText = (value, maxLength = 240) => String(value || '').trim().slice(0, maxLength);

const cleanSelections = (value, maxItems = 3) => {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanText(item, 180)).filter(Boolean).slice(0, maxItems);
};

const hasValue = (value) =>
  Array.isArray(value) ? value.some((item) => Boolean(cleanText(item))) : Boolean(cleanText(value));

const normalizeWhatsapp = (value) => {
  let raw = cleanText(value, 40).replace(/\D/g, '');
  if (raw.startsWith('0')) raw = `62${raw.slice(1)}`;
  if (!raw.startsWith('62')) raw = `62${raw}`;
  return raw;
};

const validateLead = (payload) => {
  const missing = requiredFields.filter((field) => !hasValue(payload[field]));
  if (missing.length > 0) {
    return `Lengkapi field: ${missing.join(', ')}.`;
  }

  if (!cleanText(payload.whatsapp)) {
    return '';
  }

  const whatsapp = normalizeWhatsapp(payload.whatsapp);
  if (whatsapp.length < 10 || whatsapp.length > 16) {
    return 'Nomor WhatsApp belum valid.';
  }

  return '';
};

const normalizeLeadPayload = (payload, request) => {
  const whatsapp = cleanText(payload.whatsapp) ? normalizeWhatsapp(payload.whatsapp) : '';
  const eventId = cleanText(payload.event_id || `${CAMPAIGN_ID}-${randomUUID()}`, 120);
  const metadata = typeof payload.metadata === 'object' && payload.metadata ? payload.metadata : {};
  const teamChallenges = cleanSelections(payload.team_challenges);

  return {
    name: cleanText(payload.name, 120),
    whatsapp,
    email: cleanText(payload.email, 160),
    company: cleanText(payload.company || payload.business, 160),
    business: cleanText(payload.company || payload.business, 160),
    business_type: cleanText(payload.business_type || metadata.businessType, 120),
    role: cleanText(payload.role, 80),
    city: cleanText(payload.city || metadata.city, 120),
    team_size: cleanText(payload.team_size || payload.participant_count, 120),
    participant_count: cleanText(payload.team_size || payload.participant_count, 120),
    social_url: cleanText(payload.social_url, 240),
    instagram_or_website: cleanText(payload.social_url, 240),
    monthly_revenue: cleanText(payload.monthly_revenue || metadata.monthlyRevenue, 120),
    route_type: cleanText(payload.route_type, 40),
    qualification_path: cleanText(payload.route_type, 40),
    team_challenges: teamChallenges,
    manager_challenge: cleanText(payload.manager_challenge || teamChallenges.join('; ') || payload.challenge, 1000),
    challenge: cleanText(payload.manager_challenge || teamChallenges.join('; ') || payload.challenge, 1000),
    business_impact: cleanText(payload.business_impact, 240),
    owner_dependence: cleanText(payload.owner_dependence, 240),
    desired_outcome: cleanText(payload.desired_outcome, 240),
    workshop_focus: cleanText(payload.workshop_focus, 240),
    event_id: eventId,
    fbp: cleanText(payload.fbp, 180),
    fbc: cleanText(payload.fbc, 180),
    source: cleanText(payload.source || DEFAULT_SOURCE, 120),
    page_url: cleanText(payload.page_url, 500),
    utm_source: cleanText(payload.utm_source || DEFAULT_UTM_SOURCE, 120),
    utm_medium: cleanText(payload.utm_medium, 120),
    utm_campaign: cleanText(payload.utm_campaign || DEFAULT_UTM_CAMPAIGN, 120),
    utm_content: cleanText(payload.utm_content, 120),
    user_agent: cleanText(request.headers['user-agent'], 300),
    campaign: CAMPAIGN_ID,
    business_category: cleanText(payload.business_type || metadata.businessCategory, 120),
    page_title: 'Alpha Managers 3.0 Event Ini 2026',
    event_name: EVENT_NAME,
    metadata: {
      event_date: '2026-10-01',
      event_name: EVENT_NAME,
      form_style: 'abm-stepper',
    },
  };
};

const postLeadToWebhook = async (lead) => {
  if (!leadWebhookUrl || !leadWebhookUrl.includes('cfr-oct')) {
    return {
      ok: true,
      preview: true,
      persisted: false,
      status: 202,
      id: lead.event_id,
      campaign: null,
      message: previewLeadMessage,
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(leadWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: controller.signal,
    });
    const text = await response.text();
    let body = {};

    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      body = { raw: text.slice(0, 500) };
    }

    if (!response.ok || body.ok === false) {
      return {
        ok: false,
        status: response.status,
        error: cleanText(body.error || body.message || 'Lead belum berhasil tersimpan.', 240),
      };
    }

    return {
      ok: true,
      preview: false,
      persisted: true,
      status: response.status,
      id: body.id || body.leadId || lead.event_id,
      campaign: body.campaign || lead.campaign,
      message:
        'Profil undangan diterima. Tim Coach Ferly akan meninjau kecocokan dan menghubungi Anda untuk validasi slot.',
    };
  } catch (error) {
    const aborted = error instanceof Error && error.name === 'AbortError';
    return {
      ok: false,
      status: 502,
      error: aborted ? 'Lead capture timeout. Coba kirim ulang.' : 'Lead capture belum tersedia. Coba beberapa saat lagi.',
    };
  } finally {
    clearTimeout(timeout);
  }
};

const serveStatic = async (request, response) => {
  const url = new URL(request.url || '/', 'http://localhost');
  const decodedPath = decodeURIComponent(url.pathname);
  const safePath = decodedPath === '/' ? '/index.html' : decodedPath;
  const filePath = path.normalize(path.join(distDir, safePath));

  if (!filePath.startsWith(distDir)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  let target = filePath;
  try {
    const stat = await fs.stat(target);
    if (stat.isDirectory()) target = path.join(target, 'index.html');
  } catch {
    target = path.join(distDir, 'index.html');
  }

  const extension = path.extname(target);
  const content = await fs.readFile(target);
  response.writeHead(200, {
    'Content-Type': contentTypes[extension] || 'application/octet-stream',
    'Cache-Control': target.endsWith('index.html') ? 'no-cache' : 'public, max-age=31536000, immutable',
  });
  response.end(content);
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', 'http://localhost');

    if ((request.method === 'GET' || request.method === 'HEAD') && url.pathname === '/healthz') {
      if (request.method === 'HEAD') {
        response.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
        });
        response.end();
        return;
      }

      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === 'POST' && url.pathname === '/api/leads') {
      const body = await readBody(request);
      const rawPayload = JSON.parse(body || '{}');
      const payload = normalizeLeadPayload(rawPayload, request);
      const validationError = validateLead(payload);
      if (validationError) {
        sendJson(response, 400, { ok: false, error: validationError });
        return;
      }

      const result = await postLeadToWebhook(payload);
      if (!result.ok) {
        sendJson(response, result.status || 502, { ok: false, error: result.error });
        return;
      }

      sendJson(response, result.preview ? 202 : 200, {
        ok: true,
        leadId: String(result.id),
        eventId: payload.event_id,
        campaign: result.campaign,
        persisted: result.persisted,
        preview: result.preview,
        message: result.message,
      });
      return;
    }

    if (url.pathname.startsWith('/api/')) {
      sendJson(response, 404, { ok: false, error: 'Endpoint tidak ditemukan.' });
      return;
    }

    await serveStatic(request, response);
  } catch (error) {
    const message = error instanceof SyntaxError ? 'JSON tidak valid.' : 'Server belum bisa memproses request.';
    sendJson(response, error instanceof SyntaxError ? 400 : 500, { ok: false, error: message });
  }
});

server.listen(port, () => {
  console.log(`October 2026 Alpha Managers LP server listening on :${port}`);
});
