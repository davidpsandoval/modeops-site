import React, { useState } from 'react'

/**
 * ModeOps — Full Landing Page
 * Focus: help small & mid-sized businesses (including gov/nonprofits)
 * do more with less, AND grow revenue using practical AI + workflow design.
 *
 * Notes:
 * - Contact form posts to Formspree (your ID has a safe fallback).
 * - No external CSS libs; styles are inline for simplicity.
 * - Zero runtime deps beyond React.
 */

const FORMSPREE_ID = import.meta?.env?.VITE_FORMSPREE_FORM_ID || 'xldwvnvg'

// ---- Shared, simple styling helpers (inline so no extra files) ----
const colors = {
  bg: '#0B1020',
  card: '#121832',
  accent: '#5EEAD4',   // teal-ish accent
  accent2: '#A78BFA',  // violet accent
  text: '#E6EAF5',
  subtext: '#B7C0D8',
  muted: '#8A93AB',
  border: '#1E294A',
  white: '#FFFFFF'
}

const wrap = {
  fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  background: colors.bg,
  color: colors.text,
  margin: 0,
}

const container = {
  maxWidth: '1150px',
  margin: '0 auto',
  padding: '0 20px',
}

const section = (padTop = 64, padBottom = 64) => ({
  paddingTop: padTop,
  paddingBottom: padBottom,
})

const h1Style = {
  fontSize: '48px',
  lineHeight: 1.1,
  margin: '0 0 16px 0',
}

const pLead = {
  fontSize: '20px',
  color: colors.subtext,
  margin: '0 0 28px 0',
}

const buttonPrimary = {
  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accent2} 100%)`,
  color: colors.bg,
  border: 'none',
  borderRadius: 12,
  fontWeight: 700,
  padding: '14px 18px',
  cursor: 'pointer',
}

const buttonGhost = {
  background: 'transparent',
  color: colors.text,
  border: `1px solid ${colors.border}`,
  borderRadius: 12,
  fontWeight: 600,
  padding: '14px 18px',
  cursor: 'pointer',
}

const card = {
  background: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: 16,
  padding: 20,
}

const cardRaised = {
  ...card,
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
}

const grid3 = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 20,
}

const grid2 = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 20,
}

const small = { color: colors.muted, fontSize: 13 }
const badge = {
  display: 'inline-block',
  borderRadius: 999,
  background: 'rgba(94,234,212,0.15)',
  border: `1px solid rgba(94,234,212,0.35)`,
  color: colors.accent,
  fontWeight: 700,
  padding: '6px 10px',
  fontSize: 12,
  letterSpacing: 0.3,
  textTransform: 'uppercase',
}

// ---- Simple Icon SVGs (inline, no assets needed) ----
const Sparkles = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={colors.accent} aria-hidden>
    <path d="M12 2l1.9 4.6L18 8l-4.1 1.4L12 14l-1.9-4.6L6 8l4.1-1.4L12 2zM4 18l1.2 2.8L8 22l-2.8.9L4 26l-1.2-3.1L0 22l2.8-1.2L4 18zm16 0l1.2 2.8L24 22l-2.8.9L20 26l-1.2-3.1L16 22l2.8-1.2L20 18z"/>
  </svg>
)

const Check = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={colors.accent} aria-hidden>
    <path d="M20.3 5.7L9 17l-5.3-5.3L2.3 13l6.7 6.7L21.7 7.3 20.3 5.7z"/>
  </svg>
)

const ArrowRight = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={colors.bg} aria-hidden>
    <path d="M13 5l7 7-7 7v-4H4v-6h9V5z"/>
  </svg>
)

// ---- Contact Form (Formspree) ----
function ContactForm() {
  const [state, setState] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState({ loading: false, success: null, error: null })

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ loading: true, success: null, error: null })
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(state),
      })
      if (res.ok) {
        setStatus({ loading: false, success: 'Thanks! We’ll be in touch within 1 business day.', error: null })
        setState({ name: '', email: '', company: '', message: '' })
      } else {
        const data = await res.json().catch(() => ({}))
        setStatus({ loading: false, success: null, error: data?.error || 'Something went wrong. Please try again.' })
      }
    } catch (err) {
      setStatus({ loading: false, success: null, error: 'Network error—please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ ...cardRaised, background: colors.white, color: colors.bg }}>
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>Get a free 30-minute consult</h3>
      <p style={{ marginTop: 0, marginBottom: 16, color: '#111827' }}>
        Tell us your biggest bottleneck or growth goal. We’ll outline quick wins you can apply immediately.
      </p>

      <div style={grid2}>
        <div>
          <label style={small}>Name</label>
          <input
            required
            value={state.name}
            onChange={e => setState({ ...state, name: e.target.value })}
            placeholder="Your name"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={small}>Email</label>
          <input
            required
            type="email"
            value={state.email}
            onChange={e => setState({ ...state, email: e.target.value })}
            placeholder="you@company.com"
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <label style={small}>Company</label>
        <input
          value={state.company}
          onChange={e => setState({ ...state, company: e.target.value })}
          placeholder="Company or org"
          style={inputStyle}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label style={small}>What do you want to improve?</label>
        <textarea
          rows={4}
          value={state.message}
          onChange={e => setState({ ...state, message: e.target.value })}
          placeholder="e.g., reduce admin time, faster customer response, improve win rate, automate intake…"
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="submit" disabled={status.loading} style={buttonPrimary}>
          {status.loading ? 'Sending…' : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <ArrowRight /> Request consult
          </span>}
        </button>
        <span style={{ ...small, color: '#374151' }}>No spam. No obligation.</span>
      </div>

      {status.success && (
        <div style={{ marginTop: 12, color: '#065F46', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 8, padding: 10 }}>
          {status.success}
        </div>
      )}
      {status.error && (
        <div style={{ marginTop: 12, color: '#7F1D1D', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: 10 }}>
          {status.error}
        </div>
      )}
    </form>
  )
}

const inputStyle = {
  marginTop: 6,
  width: '100%',
  padding: '12px 12px',
  borderRadius: 10,
  border: `1px solid #E5E7EB`,
  outline: 'none',
  fontSize: 15,
}

// ---- Sections ----
function Hero() {
  return (
    <section style={{ ...section(64, 40), borderBottom: `1px solid ${colors.border}`, background: 'linear-gradient(180deg, #0B1020 0%, #0E1430 100%)' }}>
      <div style={{ ...container }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 520px' }}>
            <div style={{ ...badge, marginBottom: 14 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Sparkles /> AI that saves & grows</span>
            </div>
            <h1 style={h1Style}>Work smarter. Save money. Grow faster.</h1>
            <p style={pLead}>
              ModeOps helps small & mid-sized teams automate busywork and unlock new revenue—without big-company complexity.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#contact"><button style={buttonPrimary}>Book a free consult</button></a>
              <a href="#how-it-works"><button style={buttonGhost}>How it works</button></a>
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 18, color: colors.subtext }}>
              <div>✓ 2–6 week projects</div>
              <div>✓ Fixed-price options</div>
              <div>✓ Government & nonprofits welcome</div>
            </div>
          </div>

          <div style={{ flex: '1 1 420px' }}>
            <div style={{ ...cardRaised, padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: 16, borderBottom: `1px solid ${colors.border}`, background: '#0D1328' }}>
                <span style={{ ...small, color: colors.subtext }}>Example: Lead intake → instant summary → CRM</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr 40px 1fr', alignItems: 'center', padding: 16, gap: 10 }}>
                <MiniCard title="Email intake" items={['Parse contact', 'Detect intent', 'Extract fields']} />
                <Connector />
                <MiniCard title="Auto-summary" items={['Key facts', 'Urgency', 'Next step']} />
                <Connector />
                <MiniCard title="CRM update" items={['Create record', 'Assign owner', 'Notify Slack']} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniCard({ title, items }) {
  return (
    <div style={{ ...card, borderRadius: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <ul style={{ margin: 0, paddingLeft: 18, color: colors.subtext }}>
        {items.map((it, idx) => <li key={idx}>{it}</li>)}
      </ul>
    </div>
  )
}

function Connector() {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent }}>→</div>
}

function ValueProps() {
  const items = [
    {
      title: 'Cut busywork',
      desc: 'Automate repetitive tasks across email, spreadsheets, CRMs, and project tools so your team stays focused on real work.',
    },
    {
      title: 'Win more deals',
      desc: 'Faster intake, better follow-ups, and sharper proposals powered by AI drafting and enrichment.',
    },
    {
      title: 'Do more with less',
      desc: 'Streamline processes to run lean during hiring freezes—or grow without adding headcount.',
    },
  ]
  return (
    <section style={section()}>
      <div style={container}>
        <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 28 }}>Why ModeOps</h2>
        <p style={{ ...small, marginTop: 0, marginBottom: 22 }}>Practical automation that pays for itself.</p>
        <div style={grid3}>
          {items.map((it, i) => (
            <div key={i} style={card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Sparkles />
                <div style={{ fontWeight: 700 }}>{it.title}</div>
              </div>
              <div style={{ color: colors.subtext }}>{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function UseCases() {
  const items = [
    { title: 'Lead > qualify > CRM', pts: ['Parse emails/forms', 'Auto-qualify & score', 'Create/assign in CRM', 'Slack notify'] },
    { title: 'Support triage', pts: ['Summarize threads', 'Detect sentiment', 'Draft replies', 'Escalate issues'] },
    { title: 'Proposal assist', pts: ['Draft first pass', 'Insert facts & pricing', 'Route for review', 'Export to PDF/Doc'] },
    { title: 'Ops reporting', pts: ['Pull data on schedule', 'Create summaries', 'Flag anomalies', 'Email weekly digest'] },
    { title: 'Grant intake', pts: ['Check completeness', 'Extract required fields', 'Assemble packet', 'Track deadlines'] },
    { title: 'HR onboarding', pts: ['Generate checklists', 'Collect docs', 'Create accounts', 'Notify manager'] },
  ]
  return (
    <section id="use-cases" style={{ ...section(), background: '#0D1430' }}>
      <div style={container}>
        <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 28 }}>High-leverage use cases</h2>
        <p style={{ ...small, marginTop: 0, marginBottom: 22 }}>Start with one workflow. Expand once it’s paying for itself.</p>
        <div style={grid3}>
          {items.map((it, i) => (
            <div key={i} style={card}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>{it.title}</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: colors.subtext }}>
                {it.pts.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Outcomes() {
  const items = [
    { title: '30–60% less admin time', desc: 'Reduce manual copy/paste and status chasing.' },
    { title: 'Faster response', desc: 'Qualify & route leads or requests in minutes, not days.' },
    { title: 'Higher win rates', desc: 'Follow-ups never slip. Proposals go out faster.' },
    { title: 'Fewer errors', desc: 'Standardized steps reduce costly mistakes.' },
  ]
  return (
    <section style={section()}>
      <div style={container}>
        <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 28 }}>Outcomes you can measure</h2>
        <p style={{ ...small, marginTop: 0, marginBottom: 22 }}>Efficiency is great. Growth is better. We deliver both.</p>
        <div style={grid4responsive}>
          {items.map((it, i) => (
            <div key={i} style={card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Check />
                <div style={{ fontWeight: 700 }}>{it.title}</div>
              </div>
              <div style={{ color: colors.subtext }}>{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const grid4responsive = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: 20,
}

function HowItWorks() {
  const steps = [
    { title: 'Discovery', desc: 'We map your process and define “success” in 1–2 calls.' },
    { title: 'Prototype', desc: 'A working demo in your stack—fast.' },
    { title: 'Pilot', desc: 'We test with your team, tune prompts, add guardrails.' },
    { title: 'Launch', desc: 'Enable logging, training, handoff, and support.' },
  ]
  return (
    <section id="how-it-works" style={section()}>
      <div style={container}>
        <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 28 }}>How it works</h2>
        <p style={{ ...small, marginTop: 0, marginBottom: 22 }}>Low-risk. High-impact. Clear milestones.</p>
        <div style={grid4responsive}>
          {steps.map((s, i) => (
            <div key={i} style={card}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{i + 1}. {s.title}</div>
              <div style={{ color: colors.subtext }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" style={{ ...section(), background: '#0D1430' }}>
      <div style={container}>
        <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 28 }}>Simple pricing</h2>
        <p style={{ ...small, marginTop: 0, marginBottom: 22 }}>Fixed-price options for small & mid-sized teams.</p>
        <div style={grid3}>
          <div style={card}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Quick Win</div>
            <div style={{ color: colors.subtext, marginBottom: 12 }}>2–3 weeks • 1 workflow</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: colors.subtext }}>
              <li>Discovery + prototype</li>
              <li>Basic automation</li>
              <li>Email or CRM integration</li>
            </ul>
          </div>
          <div style={{ ...cardRaised, border: `1px solid ${colors.accent}` }}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Core Ops</div>
            <div style={{ color: colors.subtext, marginBottom: 12 }}>4–6 weeks • 2–3 workflows</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: colors.subtext }}>
              <li>Multi-step automation</li>
              <li>Dashboards + alerts</li>
              <li>Training & handoff</li>
            </ul>
          </div>
          <div style={card}>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Growth Kit</div>
            <div style={{ color: colors.subtext, marginBottom: 12 }}>Custom • scope together</div>
            <ul style={{ margin: 0, paddingLeft: 18, color: colors.subtext }}>
              <li>Lead gen & follow-up</li>
              <li>Proposal assist & insights</li>
              <li>Data enrichment</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <a href="#contact"><button style={buttonPrimary}>Request pricing</button></a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" style={section()}>
      <div style={{ ...container, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24 }}>
        <div>
          <div style={{ ...badge, marginBottom: 14 }}>Free consult</div>
          <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 28 }}>Let’s find your fastest ROI</h2>
          <p style={{ ...small, marginTop: 0, marginBottom: 18 }}>
            We’ll identify 1–2 high-impact opportunities in your workflow and propose a low-risk pilot.
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, color: colors.subtext }}>
            <li>Small & mid-sized businesses</li>
            <li>Government & nonprofits welcome</li>
            <li>We work in your tools (Google/Microsoft, CRMs, email, Slack, etc.)</li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ ...section(24, 24), borderTop: `1px solid ${colors.border}`, color: colors.muted }}>
      <div style={{ ...container, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>© {year} ModeOps</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="#how-it-works" style={{ color: colors.muted, textDecoration: 'none' }}>How it works</a>
          <a href="#pricing" style={{ color: colors.muted, textDecoration: 'none' }}>Pricing</a>
          <a href="#contact" style={{ color: colors.muted, textDecoration: 'none' }}>Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <div style={wrap}>
      <Hero />
      <ValueProps />
      <UseCases />
      <Outcomes />
      <HowItWorks />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  )
}
