// ================================================================
// ABOUT US PAGE
// Two-column layout. Left: wide section cards. Right: sticky
// sidebar with two collapsible panels (Get in Touch + Schedule).
// ================================================================

// ⬇️  YOUR CLOUDFLARE WORKER URL  (e.g. https://helpnexus-proxy.yourname.workers.dev)
//     No API keys or Calendly URL here — everything lives in the Worker.
const WORKER_URL = "https://calm-shadow-32ce.help-nexus.workers.dev";

// ================================================================
// AccordionPanel — defined OUTSIDE AboutPage so React never
// recreates it on re-render (avoids losing focus on keystroke).
// ================================================================
function AccordionPanel({ title, isOpen, onToggle, children }) {
  return (
    <div className={"about-accordion" + (isOpen ? " open" : "")}>
      <button className="about-accordion-toggle" onClick={onToggle}>
        <span>{title}</span>
        <span className="toggle-arrow">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="about-accordion-body">
          {children}
        </div>
      )}
    </div>
  );
}

// ================================================================
// Fetch Calendly URL from Worker (keeps it out of frontend code)
// ================================================================
async function fetchCalendlyUrl() {
  try {
    const res  = await fetch(WORKER_URL + "/calendly-url");
    const data = await res.json();
    return data.url || null;
  } catch (err) {
    console.warn("Could not fetch Calendly URL:", err);
    return null;
  }
}

// ================================================================
// Email verification — calls Worker /verify-email
// ================================================================
async function verifyEmailWithWorker(email) {
  try {
    const res  = await fetch(WORKER_URL + "/verify-email", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email })
    });
    const data = await res.json();
    return { valid: data.valid, reason: data.reason };
  } catch (err) {
    console.warn("Worker verify-email error:", err);
    return { valid: true, reason: null };
  }
}

// ── Basic format check (instant, before hitting the Worker)
function isEmailFormatValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// ── Phone: must contain at least 7 digits
function validatePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7) return "Please enter a valid phone number.";
  return null;
}

// ================================================================
// AboutPage
// ================================================================
function AboutPage({ onGoContact }) {
  const { aboutPage, quoteBox } = window.CONTENT_DATA;

  const [contactOpen,  setContactOpen]  = React.useState(false);
  const [scheduleOpen, setScheduleOpen] = React.useState(false);
  const [formData,     setFormData]     = React.useState({ name: "", email: "", phone: "", requirements: "" });
  const [errors,       setErrors]       = React.useState({});
  const [submitted,    setSubmitted]    = React.useState(false);
  const [validating,   setValidating]   = React.useState(false);

  function buildGroups(sections) {
    const groups = [];
    let current = null;
    sections.forEach(s => {
      if (s.type === "heading1") return;
      if (s.type === "heading2") {
        if (current) groups.push(current);
        current = { heading: s, blocks: [] };
      } else if (current) {
        current.blocks.push(s);
      }
    });
    if (current) groups.push(current);
    return groups;
  }

  const groups = buildGroups(aboutPage.sections);
  const h2ids  = aboutPage.sections.filter(s => s.type === "heading2" && s.id);

  function renderBlock(block, i) {
    switch (block.type) {
      case "paragraph":
        return block.text
          ? <p key={i} dangerouslySetInnerHTML={{ __html: block.text }} />
          : null;
      case "bulletList":
        return (
          <ul key={i} className="about-blist">
            {block.items.map((it, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: it }} />
            ))}
          </ul>
        );
      default: return null;
    }
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  }

  async function handleScheduleSubmit(e) {
    e.preventDefault();

    // ── Step 1: instant checks
    const newErrors = {};
    if (!formData.name.trim())               newErrors.name  = "Name is required.";
    if (!isEmailFormatValid(formData.email)) newErrors.email = "Please enter a valid email address.";
    const phoneErr = validatePhone(formData.phone);
    if (phoneErr)                            newErrors.phone = phoneErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ── Step 2: real email verification via Worker
    setValidating(true);
    const { valid, reason } = await verifyEmailWithWorker(formData.email);
    if (!valid) {
      setValidating(false);
      setErrors({ email: reason });
      return;
    }

    // ── Step 3: fetch Calendly URL from Worker
    const calendlyUrl = await fetchCalendlyUrl();
    setValidating(false);

    if (!calendlyUrl) {
      setErrors({ email: "Something went wrong. Please try again." });
      return;
    }

    setErrors({});

    // ── Step 4: open Calendly
    if (typeof Calendly !== "undefined") {
      Calendly.initPopupWidget({
        url: calendlyUrl,
        prefill: {
          name:  formData.name.trim(),
          email: formData.email.trim(),
          customAnswers: {
            a1: formData.phone.trim(),
            a2: formData.requirements.trim()
          }
        },
        utm: { utmSource: "website", utmMedium: "schedule_form", utmCampaign: "about_page" }
      });
    } else {
      window.open(calendlyUrl, "_blank");
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", requirements: "" });
    }, 6000);
  }

  const fieldStyle = hasErr => ({
    border:     "1px solid " + (hasErr ? "#e53935" : "#dde0ea"),
    background: hasErr ? "#fff8f8" : "#fff"
  });
  const errStyle = { fontSize: 11, color: "#e53935", marginTop: 2, marginBottom: 0 };

  return (
    <div className="page-enter">
      <div className="section-heading-row"><h2>ABOUT US</h2></div>

      <div className="svc-page-jumps">
        {h2ids.map(s => (
          <a key={s.id} href={"#about-" + s.id} className="svc-jump-link">{s.text}</a>
        ))}
      </div>

      <div className="about-layout">

        {/* LEFT — card grid */}
        <div className="about-sections">
          <div className="about-cards-grid">
            {groups.map((g, idx) => (
              <section
                key={g.heading.id || idx}
                id={"about-" + (g.heading.id || idx)}
                className="about-card"
              >
                <h2 className="about-card-heading">{g.heading.text}</h2>
                <div className="about-section-body">
                  {g.blocks.map((b, i) => renderBlock(b, i))}
                </div>
              </section>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <button className="contact-btn-react" onClick={onGoContact}>Contact Us</button>
          </div>
        </div>

        {/* RIGHT — sticky sidebar */}
        <aside className="about-sidebar">

          <AccordionPanel
            title="&#128222; Get in Touch"
            isOpen={contactOpen}
            onToggle={() => setContactOpen(o => !o)}
          >
            <div className="about-contact-rows">
              {quoteBox.contactRows.map((row, i) => (
                <div className="asi-row" key={i}>
                  <span className="asi-icon">{row.icon}</span>
                  {row.href
                    ? <a href={row.href}>{row.text}</a>
                    : <span>{row.text}</span>}
                </div>
              ))}
            </div>
          </AccordionPanel>

          <AccordionPanel
            title="&#128197; Schedule a Free Call"
            isOpen={scheduleOpen}
            onToggle={() => setScheduleOpen(o => !o)}
          >
            <p className="qsub">{quoteBox.subtext}</p>

            {submitted ? (
              <div style={{
                background: "#f0fff4", border: "1px solid #b2dfdb",
                borderRadius: 8, padding: "14px 12px", textAlign: "center"
              }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>📅</div>
                <p style={{ fontSize: 13, color: "#2e7d52", fontWeight: 700, margin: "0 0 4px" }}>
                  Calendly is open!
                </p>
                <p style={{ fontSize: 12, color: "#555", margin: 0 }}>
                  Pick a time — calendar invites will be sent to both of us automatically.
                </p>
              </div>
            ) : (
              <form onSubmit={handleScheduleSubmit} noValidate>

                <div>
                  <input type="text" name="name" placeholder="Name*"
                    value={formData.name} onChange={handleInput}
                    style={fieldStyle(errors.name)} />
                  {errors.name && <p style={errStyle}>{errors.name}</p>}
                </div>

                <div>
                  <input type="email" name="email" placeholder="Email*"
                    value={formData.email} onChange={handleInput}
                    style={fieldStyle(errors.email)} />
                  {errors.email && <p style={errStyle}>{errors.email}</p>}
                </div>

                <div>
                  <input type="tel" name="phone" placeholder="Phone*"
                    value={formData.phone} onChange={handleInput}
                    style={fieldStyle(errors.phone)} />
                  {errors.phone && <p style={errStyle}>{errors.phone}</p>}
                </div>

                <textarea name="requirements" placeholder="Your requirements (optional)"
                  rows="3" value={formData.requirements} onChange={handleInput} />

                <button type="submit" disabled={validating}>
                  {validating ? "Verifying…" : "Schedule Free Call"}
                </button>

              </form>
            )}

            {quoteBox.noteLines.map((n, i) => (
              <p key={i} className="qnote">{n}</p>
            ))}
          </AccordionPanel>

        </aside>
      </div>
    </div>
  );
}
