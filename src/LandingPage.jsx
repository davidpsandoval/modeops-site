import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Sparkles, Wrench, Rocket, ArrowRight, Shield, Gauge, Workflow, Quote, Building2, Briefcase, ClipboardCheck, BarChart3 } from 'lucide-react'

const BRAND = 'ModeOps'
const CONTACT_EMAIL = 'hello@modeops.com'
const FORMSPREE_FORM_ID = import.meta.env?.VITE_FORMSPREE_FORM_ID || ''

function encodeFormData(data) {
  return new URLSearchParams(data).toString()
}

// ===== Theme =====
const COLOR = {
  bg: '#0b1020',          // deep navy
  bgSoft: '#0f172a',      // slate/ink
  text: '#e5e7eb',        // light text
  textMuted: '#9aa5b1',
  card: '#0f172a',
  border: '#1f2937',
  accent: '#f59e0b',      // amber
  accentSoft: '#fde68a',
  white: '#ffffff'
}

const styles = {
  page: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    color: COLOR.text,
    background: `radial-gradient(800px 400px at 10% -10%, #1f2937 0%, transparent 60%), radial-gradient(800px 400px at 110% 10%, #111827 0%, transparent 60%), ${COLOR.bg}`
  },
  container: { maxWidth: 1200, margin: '0 auto', padding: '0 24px' },
  header: {
    position: 'sticky', top: 0, zIndex: 20,
    backdropFilter: 'saturate(180%) blur(8px)', background: 'rgba(11,16,32,0.75)',
    borderBottom: `1px solid ${COLOR.border}`
  },
  headerInner: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' },
  nav: { display: 'flex', gap: 18 },
  navLink: { textDecoration: 'none', color: COLOR.textMuted, fontWeight: 500 },
  hero: { display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'center', gap: 28, padding: '64px 0 48px' },
  badge: { display: 'inline-flex', gap: 8, alignItems: 'center', borderRadius: 999, padding: '6px 10px', background: '#111827', color: COLOR.accentSoft, fontWeight: 700, fontSize: 12, letterSpacing: '.02em', border: `1px solid ${COLOR.border}` },
  h1: { fontSize: 46, lineHeight: 1.05, margin: '12px 0 10px', letterSpacing: '-.02em' },
  sub: { fontSize: 18, color: COLOR.textMuted, marginTop: 6 },
  ctaRow: { display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' },
  btnPrimary: { padding: '12px 16px', background: COLOR.accent, color: '#111827', borderRadius: 12, textDecoration: 'none', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 8, border: 'none' },
  btnGhost: { padding: '12px 16px', background: 'transparent', color: COLOR.text, borderRadius: 12, textDecoration: 'none', fontWeight: 700, border: `1px solid ${COLOR.border}` },
  heroCard: { background: 'linear-gradient(180deg,#0f172a,#111827)', color: COLOR.white, borderRadius: 16, padding: 20, border: `1px solid ${COLOR.border}` },
  pill: { border: `1px solid ${COLOR.border}`, borderRadius: 12, padding: 12, display: 'flex', alignItems: 'center', gap: 8, background: '#0b1220' },
  sectionMuted: { background: '#0b1220', padding: '32px 0', borderTop: `1px solid ${COLOR.border}`, borderBottom: `1px solid ${COLOR.border}` },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 },
  card: { background: COLOR.card, border: `1px solid ${COLOR.border}`, borderRadius: 14, padding: 16 },
  label: { fontSize: 13, color: COLOR.textMuted },
  contact: { background: '#0a0f1d', color: COLOR.white, padding: '44px 0', borderTop: `1px solid ${COLOR.border}` },
  input: { padding: 12, borderRadius: 10, border: `1px solid ${COLOR.border}`, background: '#0b1220', color: COLOR.white },
  textarea: { padding: 12, borderRadius: 10, border: `1px solid ${COLOR.border}`, background: '#0b1220', color: COLOR.white },
  footer: { borderTop: `1px solid ${COLOR.border}`, background: '#0b0f19' }
}

export default function LandingPage() {
  const [status, setStatus] = useState('idle')
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    document.title = `${BRAND} — AI Business Optimization`
    const favicon = document.createElement('link')
    favicon.rel = 'icon'
    favicon.href = '/favicon.ico'
    document.head.appendChild(favicon)

    const smoke = [
      ['has root', !!document.getElementById('root')],
      ['has nav', !!document.querySelector('nav')],
      ['has contact form', !!document.querySelector('form[name="contact"]')],
      ['shows current year', document.body.textContent?.includes(String(new Date().getFullYear()))]
    ]
    console.groupCollapsed('ModeOps smoke tests')
    smoke.forEach(([name, pass]) => console.log(`${pass ? '✅' : '❌'} ${name}`))
    console.groupEnd()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget

    if (form.elements.namedItem('company_website')?.value) return

    const name = form.elements.namedItem('name')?.value || ''
    const email = form.elements.namedItem('email')?.value || ''
    const company = form.elements.namedItem('company')?.value || ''
    const message = form.elements.namedItem('message')?.value || ''

    if (FORMSPREE_FORM_ID) {
      try {
        setStatus('sending')
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, company, message })
        })
        if (res.ok) { setStatus('success'); form.reset(); return }
        throw new Error(`Formspree error ${res.status}`)
      } catch (err) {
        console.error(err); setStatus('error'); return
      }
    }

    const subject = encodeURIComponent(`[${BRAND}] New inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}
Work email: ${email}
Company / website: ${company}

Workflow to improve:
${message}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={{...styles.container, ...styles.headerInner}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <img src="/modeops-logo.png" alt="ModeOps" onError={(e)=>{e.currentTarget.src='/modeops-logo.svg'}} style={{height:28}} />
            <strong style={{letterSpacing:'-.02em'}}>ModeOps</strong>
          </div>
          <nav style={styles.nav}>
            <a href="#services" style={styles.navLink}>Services</a>
            <a href="#who" style={styles.navLink}>Who we help</a>
            <a href="#results" style={styles.navLink}>Results</a>
            <a href="#pricing" style={styles.navLink}>Pricing</a>
            <a href="#faq" style={styles.navLink}>FAQ</a>
            <a href="#contact" style={{...styles.navLink, color: COLOR.accentSoft}}>Contact</a>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section style={{...styles.container, ...styles.hero}}>
        <div>
          <span style={styles.badge}><Sparkles size={14}/> AI business optimization</span>
          <h1 style={styles.h1}>Streamline messy workflows. Ship automation that sticks.</h1>
          <p style={styles.sub}>We turn high‑friction processes into elegant, measurable systems — fast wins in 2–4 weeks, then scale with confidence.</p>
          <div style={styles.ctaRow}>
            <a href="#contact" style={styles.btnPrimary}>Book a free consult <ArrowRight size={18}/></a>
            <a href="#services" style={styles.btnGhost}>See services</a>
          </div>
          <ul style={{marginTop: 16, color: COLOR.textMuted, display:'grid', gap:6}}>
            <li style={{display:'flex', alignItems:'center', gap:8}}><CheckCircle2 size={18}/> Measurable ROI in weeks</li>
            <li style={{display:'flex', alignItems:'center', gap:8}}><CheckCircle2 size={18}/> Your tools, your data, your control</li>
            <li style={{display:'flex', alignItems:'center', gap:8}}><CheckCircle2 size={18}/> Clear documentation & handover</li>
          </ul>
        </div>

        <motion.div style={styles.heroCard} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration: .4}}>
          <h3 style={{marginTop:0}}>Quick wins we implement</h3>
          <div style={{display:'grid', gap:10}}>
            <div style={styles.pill}><Sparkles size={18}/> Email triage & response drafting</div>
            <div style={styles.pill}><Wrench size={18}/> SOP extraction & guided checklists</div>
            <div style={styles.pill}><Rocket size={18}/> Rebate/claims workflow automation</div>
          </div>
        </motion.div>
      </section>

      {/* ===== SERVICES ===== */}
      <section style={styles.sectionMuted} id="services">
        <div style={{...styles.container}}>
          <div style={styles.grid3}>
            {[{icon: <Gauge size={18}/>, title: 'Discovery & pilot', text: 'Pick a target workflow and ship a 2–4 week pilot with baseline metrics.'},
              {icon: <Workflow size={18}/>, title: 'Automation build', text: 'Integrate email, Sheets, CRMs and remove repetitive handoffs.'},
              {icon: <Shield size={18}/>, title: 'Scale & handover', text: 'Train your team, provide docs, and you own the system.'}
            ].map((c,i)=> (
              <div key={i} style={styles.card}>
                <div style={{display:'flex', alignItems:'center', gap:8, fontWeight:700}}>{c.icon} {c.title}</div>
                <p style={{color: COLOR.textMuted, marginTop:8}}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHO WE HELP ===== */}
      <section id="who">
        <div style={{...styles.container, padding: '28px 0'}}>
          <h2 style={{margin:'0 0 12px'}}>Who we help</h2>
          <div style={styles.grid3}>
            {[{icon:<Building2 size={18}/>, title:'Ops-led SMBs', text:'20–300 employees with manual, email-driven workflows.'},
              {icon:<Briefcase size={18}/>, title:'Professional services', text:'Consulting, energy, rebates, legal ops, finance ops.'},
              {icon:<ClipboardCheck size={18}/>, title:'Compliance-heavy teams', text:'Document review, approvals, evidence capture.'}
            ].map((c, i) => (
              <div key={i} style={styles.card}>
                <div style={{display:'flex', alignItems:'center', gap:8, fontWeight:700}}>{c.icon} {c.title}</div>
                <p style={{color: COLOR.textMuted, marginTop:8}}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESULTS / CASE STUDY ===== */}
      <section id="results" style={styles.sectionMuted}>
        <div style={{...styles.container, padding: '28px 0'}}>
          <h2 style={{margin:'0 0 12px'}}>Results you can measure</h2>
          <div style={styles.grid2}>
            <div style={styles.card}>
              <h3 style={{marginTop:0}}>Case study: Rebate ops</h3>
              <p style={{color: COLOR.textMuted}}>Custom PFS flow redesigned. We automated intake, document QA, and reviewer checklists.</p>
              <ul style={{display:'grid', gap:8, marginTop:12}}>
                <li style={{display:'flex', gap:8, alignItems:'center'}}><BarChart3 size={18}/> 46% faster cycle time (pilot, 6 weeks)</li>
                <li style={{display:'flex', gap:8, alignItems:'center'}}><BarChart3 size={18}/> 0→1 reviewer errors caught by checklist prompts</li>
                <li style={{display:'flex', gap:8, alignItems:'center'}}><BarChart3 size={18}/> ~8 hrs/week saved on status updates</li>
              </ul>
            </div>
            <div style={styles.card}>
              <blockquote style={{margin:0, color: COLOR.textMuted}}>
                <Quote size={20}/>
                “ModeOps took a messy, multi‑team process and made it click. The team finally trusts the workflow.”
                <div style={{marginTop:8, color: COLOR.text}}><strong>Director of Operations</strong> — Energy Services</div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section id="process">
        <div style={{...styles.container, padding: '28px 0'}}>
          <h2 style={{margin:'0 0 12px'}}>Our process</h2>
          <ol style={{display:'grid', gap:10, listStyle:'none', padding:0}}>
            {[ 'Stakeholder interview & quick-win mapping', 'Pilot build with weekly checkpoints', 'Launch, train, document, handover' ].map((step, i) => (
              <li key={i} style={{...styles.card, display:'flex', gap:12, alignItems:'center'}}>
                <span style={{display:'inline-grid', placeItems:'center', height:28, width:28, borderRadius:999, background: COLOR.accent, color:'#111827', fontWeight:800}}>{i+1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" style={styles.sectionMuted}>
        <div style={{...styles.container, padding: '28px 0'}}>
          <h2 style={{margin:'0 0 12px'}}>Pricing</h2>
          <div style={styles.grid3}>
            {[
              {name:'Pilot', price:'$3,500', desc:'2–4 week sprint, 1 workflow', bullets:['Discovery workshop','Pilot build & metrics','Team training & doc']},
              {name:'Build', price:'$8,500', desc:'4–6 weeks, 2–3 workflows', bullets:['Integrations & automations','Analytics & QA prompts','Playbooks & enablement']},
              {name:'Scale', price:'Custom', desc:'Roadmap & ownership', bullets:['Roadmap & governance','Shadow‑IT hardening','Handover & support']}
            ].map((tier, i) => (
              <div key={i} style={{...styles.card, display:'grid', gap:10}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                  <h3 style={{margin:0}}>{tier.name}</h3>
                  <div style={{fontWeight:800, color: COLOR.accent}}>{tier.price}</div>
                </div>
                <p style={{color: COLOR.textMuted, marginTop:-4}}>{tier.desc}</p>
                <ul style={{display:'grid', gap:6, margin:0, paddingLeft:18}}>
                  {tier.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <a href="#contact" style={{...styles.btnPrimary, justifyContent:'center'}}>Get started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq">
        <div style={{...styles.container, padding: '28px 0'}}>
          <h2 style={{margin:'0 0 12px'}}>FAQ</h2>
          <div style={{display:'grid', gap:12}}>
            {[
              ['How fast can we start?', 'We typically begin within a week. Pilots ship in 2–4 weeks with clear metrics.'],
              ['Do you use our tools or bring new ones?', 'We prefer your stack first (email, Google/Microsoft, CRM). Where helpful, we add lightweight glue.'],
              ['Security & data handling?', 'We work inside your tenant where possible, follow least‑privilege access, and document data flows.'],
              ['What does success look like?', 'Cycle time down, error rates down, and fewer handoffs. You own the final system and documentation.']
            ].map(([q,a], i) => (
              <div key={i} style={styles.card}>
                <strong>{q}</strong>
                <p style={{color: COLOR.textMuted, marginTop:8}}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={styles.contact}>
        <div style={{...styles.container, maxWidth: 900}}>
          <h2 style={{marginTop:0}}>Book a free consultation</h2>
          <p style={{color: COLOR.textMuted}}>Tell us about the workflow you want to improve. We’ll reply within one business day.</p>
          <form onSubmit={handleSubmit} name="contact" method="POST" style={{display:'grid', gap:14, marginTop: 14}}>
            <div style={{display:'grid', gap:6}}>
              <span style={styles.label}>Name</span>
              <input name="name" placeholder="Your name" required style={styles.input}/>
            </div>
            <div style={{display:'grid', gap:6}}>
              <span style={styles.label}>Work email</span>
              <input name="email" type="email" placeholder="name@company.com" required style={styles.input}/>
            </div>
            <div style={{display:'grid', gap:6}}>
              <span style={styles.label}>Company / website</span>
              <input name="company" placeholder="Acme Co or acme.com" style={styles.input}/>
            </div>
            <input name="company_website" tabIndex={-1} autoComplete="off" style={{display:'none'}}/>
            <div style={{display:'grid', gap:6}}>
              <span style={styles.label}>What’s the workflow to improve?</span>
              <textarea name="message" rows={4} placeholder="e.g., rebate application review has 6 handoffs..." style={styles.textarea}/>
            </div>
            <button type="submit" disabled={status === 'sending'} style={{...styles.btnPrimary}}>
              {status === 'sending' ? 'Sending…' : 'Submit inquiry'}
            </button>
            {status === 'success' && <div role="status" style={{color:'#86efac'}}>Thanks! We received your message and will reply shortly.</div>}
            {status === 'error' && <div role="alert" style={{color:'#fda4af'}}>Something went wrong. Email us at <a href={`mailto:${CONTACT_EMAIL}`} style={{color: COLOR.white, textDecoration:'underline'}}>{CONTACT_EMAIL}</a>.</div>}
          </form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={styles.footer}>
        <div style={{...styles.container, padding:'22px 0', display:'flex', justifyContent:'space-between', color: COLOR.textMuted}}>
          <div>© {currentYear} {BRAND}</div>
          <div style={{display:'flex', gap:12}}>
            <a href="#privacy" style={{color: COLOR.textMuted, textDecoration:'none'}}>Privacy</a>
            <a href="#terms" style={{color: COLOR.textMuted, textDecoration:'none'}}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
