/*
  ModeOps — Production Landing Page (Visual + Mockups, Growth Focus)
  ------------------------------------------------------
  Updated messaging: emphasizes efficiency + growth (not just cost‑saving).
*/

import React, { useMemo, useState } from 'react'

const FORMSPREE_ID = import.meta?.env?.VITE_FORMSPREE_FORM_ID || 'xldwvnvg'

function text(value) {
  if (value == null) return ''
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value)
  try { return JSON.stringify(value) } catch { return String(value) }
}

function Section({ id, children, style }) {
  return (
    <section id={id} style={{ padding: '72px 0', ...style }}>
      {children}
    </section>
  )
}

function Container({ children, style }) {
  return <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', ...style }}>{children}</div>
}

function Card({ children, style }) {
  return <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, boxShadow: '0 6px 24px rgba(0,0,0,0.06)', ...style }}>{children}</div>
}

function PrimaryButton({ children, onClick, href }) {
  const base = { background: 'linear-gradient(90deg,#22c55e,#16a34a)', color: '#fff', padding: '14px 22px', borderRadius: 10, fontWeight: 600, textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }
  if (href) return <a href={href} style={base}>{text(children)}</a>
  return <button type="button" onClick={onClick} style={base}>{text(children)}</button>
}

const listReset = { listStyle: 'none', margin: 0, padding: 0 }

export default function LandingPage() {
  const nav = useMemo(() => ([
    { label: 'How', href: '#how' },
    { label: 'Use cases', href: '#use-cases' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]), [])

  const valueProps = useMemo(() => ([
    { t: 'Do more with less', d: 'Streamline operations so your team achieves more without extra hires.' },
    { t: 'Grow your business', d: 'Free up capacity to launch new services, win more clients, and scale impact.' },
    { t: 'Prove the ROI', d: 'Clear metrics so you see cost savings and revenue gains from automation.' },
  ]), [])

  const faq = useMemo(() => ([
    ['How soon can we start?', 'Within a week after the assessment.'],
    ['Do you work with nonprofits?', 'Yes — many of our clients are mission‑driven orgs.'],
    ['What about government teams?', 'We adapt to public sector compliance and procurement needs.'],
    ['Do we need technical staff?', 'No. We handle the setup and training so your team can focus on delivery.'],
  ]), [])

  return (
    <div style={{ background: '#f8fafc', color: '#0f172a', minHeight: '100vh' }}>
      <style>{`
        .grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        .grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
        @media (max-width: 900px) { .grid-3 { grid-template-columns: 1fr; } .grid-2 { grid-template-columns: 1fr; } }
        a { color: inherit }
        .divider { height: 2px; background: linear-gradient(90deg,#22c55e33,transparent); margin: 48px 0; }
        .mockup { background: #e2e8f0; border: 1px dashed #94a3b8; border-radius: 12px; height: 240px; display: flex; align-items: center; justify-content: center; color: #475569; font-size: 14px; }
      `}</style>

      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
        <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ fontWeight: 800 }}>ModeOps</div>
          <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {nav.map((item) => (<a key={item.href} href={item.href}>{text(item.label)}</a>))}
          </nav>
        </Container>
      </header>

      <Section id="hero" style={{ padding: '120px 0 80px', background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' }}>
        <Container>
          <div style={{ display: 'grid', gap: 24, textAlign: 'center' }}>
            <h1 style={{ fontSize: 48, lineHeight: 1.1, margin: 0 }}>{text('Work smarter. Save money. Grow faster.')}</h1>
            <p style={{ fontSize: 20, maxWidth: 760, margin: '0 auto' }}>{text('ModeOps helps small businesses, nonprofits, and government teams run more efficiently — and use those gains to grow revenue, serve more people, and stay competitive.')}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <PrimaryButton href="#contact">Book a free consultation</PrimaryButton>
              <a href="#how" style={{ padding: '14px 22px' }}>How it works</a>
            </div>
            <div className="mockup">[ Screenshot / Dashboard preview ]</div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid-3">
            {valueProps.map((vp, i) => (
              <Card key={vp.t}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✨</div>
                <h3 style={{ marginTop: 0 }}>{text(vp.t)}</h3>
                <p style={{ marginBottom: 0 }}>{text(vp.d)}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <div className="divider" />

      <Section id="how">
        <Container>
          <h2 style={{ marginTop: 0, textAlign: 'center' }}>How we work</h2>
          <div className="grid-3">
            {[
              ['Assess', 'Quick session to understand your workflow and growth goals.'],
              ['Prototype', 'We build a simple automation or copilot in 1–2 weeks.'],
              ['Measure impact', 'We check both efficiency gains and new growth capacity.'],
            ].map(([t, d], i) => (
              <Card key={t}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🔹</div>
                <h3 style={{ marginTop: 0 }}>{text(t)}</h3>
                <p style={{ marginBottom: 0 }}>{text(d)}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <div className="divider" />

      <Section id="use-cases">
        <Container>
          <h2 style={{ textAlign: 'center' }}>Use cases</h2>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <ul style={listReset}>
              {[
                '📥 Intake forms that auto‑sort and route',
                '📝 Document review & error checks',
                '🤝 Volunteer / client onboarding workflows',
                '📊 Dashboards & alerts for program metrics',
                '🚀 Freeing up staff to focus on business growth and community impact',
              ].map((x) => (<li key={x} style={{ padding: '12px 0', borderBottom: '1px dashed #e5e7eb', fontSize: 18 }}>{text(x)}</li>))}
            </ul>
            <div className="mockup">[ Example Workflow Mockup ]</div>
          </div>
        </Container>
      </Section>

      <div className="divider" />

      <Section id="pricing">
        <Container>
          <h2 style={{ textAlign: 'center' }}>Pricing</h2>
          <div className="grid-3">
            <Card>
              <h3 style={{ marginTop: 0 }}>Free Consultation</h3>
              <p>30–60 minutes. We learn your needs and suggest first steps.</p>
              <PrimaryButton href="#contact">Book now</PrimaryButton>
            </Card>
            <Card>
              <h3 style={{ marginTop: 0 }}>Pilot — $3,500 flat</h3>
              <p>2–3 weeks. One workflow automated, clear success metric, weekly check‑ins.</p>
              <PrimaryButton href="#contact">Start pilot</PrimaryButton>
            </Card>
            <Card>
              <h3 style={{ marginTop: 0 }}>Ongoing — from $2,000/mo</h3>
              <p>Continuous improvements, monitoring, and support for new use cases.</p>
              <PrimaryButton href="#contact">Talk to us</PrimaryButton>
            </Card>
          </div>
        </Container>
      </Section>

      <div className="divider" />

      <Section id="faq">
        <Container>
          <h2 style={{ textAlign: 'center' }}>FAQ</h2>
          <div className="grid-2">
            {faq.map(([q, a]) => (
              <Card key={q}>
                <strong>{text(q)}</strong>
                <p style={{ marginBottom: 0 }}>{text(a)}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="contact" style={{ background: '#fff' }}>
        <Container>
          <h2 style={{ marginTop: 0, textAlign: 'center' }}>Let’s talk</h2>
          <Card><ContactForm /></Card>
        </Container>
      </Section>

      <footer style={{ borderTop: '1px solid #e5e7eb', padding: '24px 0', background: '#f8fafc' }}>
        <Container style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, flexWrap: 'wrap', gap: 12 }}>
          <div>© {new Date().getFullYear()} ModeOps</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </Container>
      </footer>
    </div>
  )
}

function ContactForm() {
  const [state, setState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: text(state.name), email: text(state.email), message: text(state.message) }),
      })
      if (!res.ok) throw new Error('Form submission failed')
      setSent(true)
    } catch (err) {
      setError(err?.message ? text(err.message) : 'Something went wrong')
    }
  }

  if (sent) return <p>Thanks! We’ll be in touch within 1 business day.</p>

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
      <label>
        <div style={{ marginBottom: 6 }}>Name</div>
        <input required value={state.name} onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e5e7eb' }} />
      </label>
      <label>
        <div style={{ marginBottom: 6 }}>Email</div>
        <input type="email" required value={state.email} onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e5e7eb' }} />
      </label>
      <label>
        <div style={{ marginBottom: 6 }}>What would you like to improve?</div>
        <textarea required rows={5} value={state.message} onChange={(e) => setState((s) => ({ ...s, message: e.target.value }))} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #e5e7eb' }} />
      </label>
      {error && <div role="alert" style={{ color: 'crimson' }}>{text(error)}</div>}
      <div><PrimaryButton>Send</PrimaryButton></div>
    </form>
  )
}

