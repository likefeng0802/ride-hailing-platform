import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

// Load optional local SMTP overrides (hard-coded on your machine, not committed)
let localSMTP = null;
try {
  const mod = await import('./smtp.local.js');
  localSMTP = mod && mod.default ? mod.default : null;
} catch (e) {
  // ignore if file not present
}

// Optional local mailer module (CommonJS) using test.js style
let localMailer = null;
try {
  const mod = await import('./mailer.local.cjs');
  localMailer = (mod && (mod.default || mod)) || null;
} catch (e) {
  // ignore if not present
}

async function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  // Local hard-coded override (preferred)
  if (localSMTP && localSMTP.host && localSMTP.port && localSMTP.auth && localSMTP.auth.user && localSMTP.auth.pass) {
    return nodemailer.createTransport({ host: localSMTP.host, port: localSMTP.port, secure: !!localSMTP.secure, auth: { user: localSMTP.auth.user, pass: localSMTP.auth.pass }, pool: true, maxConnections: 2, maxMessages: 50, connectionTimeout: 20000 });
  }
  // If full SMTP credentials provided, use them directly
  if (host && port && user && pass) {
    return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass }, pool: true, maxConnections: 2, maxMessages: 50, connectionTimeout: 20000 });
  }
  // If 163 preset is desired (user+pass present but host/port omitted), default to smtp.163.com SSL 465
  if (!host && !port && user && pass && /@163\.com$/i.test(user)) {
    return nodemailer.createTransport({ host: 'smtp.163.com', port: 465, secure: true, auth: { user, pass }, pool: true, maxConnections: 2, maxMessages: 50, connectionTimeout: 20000 });
  }
  const test = await nodemailer.createTestAccount();
  return nodemailer.createTransport({ host: test.smtp.host, port: test.smtp.port, secure: test.smtp.secure, auth: { user: test.user, pass: test.pass }, pool: true, maxConnections: 2, maxMessages: 50, connectionTimeout: 20000 });
}

function renderHtml(payload) {
  const b = [
    ['Service', payload.serviceType || '-'],
    ['Passengers', payload.passengers || '-'],
    ['Time', payload.datetime || '-'],
    ['From', payload.from || '-'],
    ['To', payload.to || '-'],
    ['Model', payload.model || '-'],
    ['Phone', payload.phone || '-'],
    ['Distance', payload.distance || '-'],
    ['Rate', payload.rate ? `$${payload.rate}/mile` : '-'],
    ['Cost', payload.cost || '-']
  ];
  const rows = b.map(([k, v]) => `<tr><td style="padding:6px 10px;border:1px solid #eee;">${k}</td><td style="padding:6px 10px;border:1px solid #eee;">${v}</td></tr>`).join('');
  return `<div style="font-family:Arial,Helvetica,sans-serif;">
  <h3 style="margin:0 0 10px;">New Booking</h3>
  <table style="border-collapse:collapse;">${rows}</table>
</div>`;
}

app.post('/api/booking-email', async (req, res) => {
  try {
    const payload = req.body || {};
    const to = (localSMTP && localSMTP.to) || process.env.MAIL_TO || '18753235104@163.com';
    const from = (localSMTP && localSMTP.from) || process.env.MAIL_FROM || '正人君Bot <zhv0831@163.com>';
    const subject = process.env.MAIL_SUBJECT || 'New Booking';
    const html = renderHtml(payload);
    const text = Object.entries(payload).map(([k, v]) => `${k}: ${v}`).join('\n');
    if (localMailer && typeof localMailer.sendEmail === 'function') {
      await localMailer.sendEmail(to, subject, text);
      res.json({ ok: true, via: 'localMailer', to });
      return;
    }
    const transporter = await createTransporter();
    const info = await transporter.sendMail({ from, to, subject, text, html });
    let preview = undefined;
    if (nodemailer.getTestMessageUrl) {
      preview = nodemailer.getTestMessageUrl(info) || undefined;
    }
    res.json({ ok: true, id: info.messageId, accepted: info.accepted, rejected: info.rejected, response: info.response, preview });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message || 'send_failed' });
  }
});

app.post('/api/booking-email/test', async (req, res) => {
  try {
    const to = (req.body && req.body.to) || (localSMTP && localSMTP.to) || '18753235104@163.com';
    const from = (localSMTP && localSMTP.from) || '正人君Bot <zhv0831@163.com>';
    const subject = 'Test Mail';
    const text = 'Test booking mail connectivity';
    if (localMailer && typeof localMailer.sendEmail === 'function') {
      await localMailer.sendEmail(to, subject, text);
      res.json({ ok: true, via: 'localMailer', to });
      return;
    }
    const transporter = await createTransporter();
    const info = await transporter.sendMail({ from, to, subject, text, html: `<div>${text}</div>` });
    res.json({ ok: true, id: info.messageId, accepted: info.accepted, rejected: info.rejected, response: info.response });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message || 'send_failed' });
  }
});

app.post('/api/booking-email/test', async (req, res) => {
  try {
    const transporter = await createTransporter();
    const to = (req.body && req.body.to) || (localSMTP && localSMTP.to) || '18753235104@163.com';
    const from = (localSMTP && localSMTP.from) || '正人君Bot <zhv0831@163.com>';
    const subject = 'Test Mail';
    const text = 'Test booking mail connectivity';
    const html = '<div>Test booking mail connectivity</div>';
    const info = await transporter.sendMail({ from, to, subject, text, html });
    res.json({ ok: true, id: info.messageId, accepted: info.accepted, rejected: info.rejected, response: info.response });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message || 'send_failed' });
  }
});
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
app.listen(PORT, () => {
  console.log(`Mailer server on http://localhost:${PORT}`);
});
