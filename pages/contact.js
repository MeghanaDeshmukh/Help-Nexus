// ================================================================
// CONTACT PAGE
// Contact details come from data/content.js.
// EmailJS config is handled via the Cloudflare Worker.
// ================================================================

// ⬇️  YOUR CLOUDFLARE WORKER URL  (e.g. https://helpnexus-proxy.yourname.workers.dev)
//     No API keys here — they live safely inside the Worker.
const CONTACT_WORKER_URL = "https://calm-shadow-32ce.help-nexus.workers.dev";

const CONTACT_BLANK = {
  fname:"", lname:"", email:"", phone:"", company:"",
  country:"", service:"", subject:"", message:"", howheard:""
};

// ================================================================
// Email verification — calls Worker /verify-email
// ================================================================
async function contactVerifyEmail(email) {
  try {
    const res  = await fetch(CONTACT_WORKER_URL + "/verify-email", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email })
    });
    const data = await res.json();
    return data.reason || null; // null = valid
  } catch (err) {
    console.warn("Worker verify-email error:", err);
    return null; // don't block on network failure
  }
}

// ================================================================
// Send email — calls Worker /send-email (no EmailJS keys in frontend)
// ================================================================
async function contactSendEmail(fields) {
  const res = await fetch(CONTACT_WORKER_URL + "/send-email", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(fields)
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Failed to send.");
}

// ================================================================
// Instant field validators (no network call)
// ================================================================
function validateContactFields(form) {
  const errs = {};

  if (!form.fname.trim())
    errs.fname = "First name is required.";

  if (!form.lname.trim())
    errs.lname = "Last name is required.";

  if (!form.email.trim()) {
    errs.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errs.email = "Please enter a valid email address.";
  }

  const digits = form.phone.replace(/\D/g, "");
  if (!form.phone.trim()) {
    errs.phone = "Phone number is required.";
  } else if (digits.length < 7) {
    errs.phone = "Please enter a valid phone number.";
  }

  if (!form.country)
    errs.country = "Please select your country.";

  if (!form.subject.trim())
    errs.subject = "Subject is required.";

  if (!form.message.trim()) {
    errs.message = "Please enter your message.";
  } else if (form.message.trim().length < 20) {
    errs.message = "Message is too short — please describe your requirements.";
  }

  return errs;
}

// ================================================================
// ContactPage
// ================================================================
function ContactPage() {
  const { contactPage } = window.CONTENT_DATA;
  const { contactInfo, offices } = contactPage.sidebar;
  const SERVICES = window.SERVICES_DATA;

  const [form,       setForm]       = React.useState(CONTACT_BLANK);
  const [status,     setStatus]     = React.useState("idle");
  const [errMsg,     setErrMsg]     = React.useState("");
  const [fieldErrs,  setFieldErrs]  = React.useState({});
  const [validating, setValidating] = React.useState(false);

  const handle = e => {
    const { name, value } = e.target;
    setForm(prev => Object.assign({}, prev, { [name]: value }));
    if (fieldErrs[name]) setFieldErrs(prev => Object.assign({}, prev, { [name]: null }));
  };

  const reset = () => {
    setForm(CONTACT_BLANK);
    setStatus("idle");
    setErrMsg("");
    setFieldErrs({});
  };

  const submit = async e => {
    e.preventDefault();

    // ── Step 1: instant field checks
    const errs = validateContactFields(form);
    if (Object.keys(errs).length > 0) {
      setFieldErrs(errs);
      const firstErr = document.querySelector(".field-error-msg");
      if (firstErr) firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // ── Step 2: real email verification via Worker
    setValidating(true);
    const emailErr = await contactVerifyEmail(form.email);
    setValidating(false);

    if (emailErr) {
      setFieldErrs({ email: emailErr });
      return;
    }

    // ── Step 3: send via Worker (which calls EmailJS with hidden keys)
    setStatus("sending");
    setErrMsg("");
    try {
      await contactSendEmail({
        name:     form.fname + " " + form.lname,
        to_email: form.email,
        phone:    form.phone,
        company:  form.company  || "N/A",
        country:  form.country,
        service:  form.service  || "N/A",
        subject:  form.subject,
        message:  form.message,
        howheard: form.howheard || "N/A"
      });
      setStatus("success");
      setForm(CONTACT_BLANK);
    } catch (err) {
      console.error(err);
      setErrMsg(contactPage.errorMessage);
      setStatus("error");
    }
  };

  const inputStyle = name => ({
    border:     "1px solid " + (fieldErrs[name] ? "#e53935" : ""),
    background: fieldErrs[name] ? "#fff8f8" : ""
  });

  const ErrMsg = ({ name }) =>
    fieldErrs[name]
      ? <span className="field-error-msg" style={{ fontSize: 11, color: "#e53935", marginTop: 3, display: "block" }}>
          {fieldErrs[name]}
        </span>
      : null;

  return (
    <div className="page-enter">
      <div className="section-heading-row"><h2>CONTACT US</h2></div>
      <div className="contact-page-wrap">
        <div className="contact-page-inner">
          <section className="contact-form-section">
            <h1>{contactPage.heading}</h1>
            <p className="intro">{contactPage.intro}</p>

            {status === "success" ? (
              <div>
                <div className="success-msg">{contactPage.successMessage}</div>
                <br/>
                <button className="back-btn" onClick={reset}>Send Another Message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit} noValidate>

                {status === "error" && (
                  <div className="form-error-banner">&#9888; {errMsg}</div>
                )}

                <div className="form-row">
                  <div>
                    <label>First Name <span className="required">*</span></label>
                    <input type="text" name="fname" value={form.fname} onChange={handle}
                      placeholder="Your first name" style={inputStyle("fname")} />
                    <ErrMsg name="fname" />
                  </div>
                  <div>
                    <label>Last Name <span className="required">*</span></label>
                    <input type="text" name="lname" value={form.lname} onChange={handle}
                      placeholder="Your last name" style={inputStyle("lname")} />
                    <ErrMsg name="lname" />
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <label>Email <span className="required">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={handle}
                      placeholder="your@company.com" style={inputStyle("email")} />
                    <ErrMsg name="email" />
                  </div>
                  <div>
                    <label>Phone <span className="required">*</span></label>
                    <input type="tel" name="phone" value={form.phone} onChange={handle}
                      placeholder="+91 00000 00000" style={inputStyle("phone")} />
                    <ErrMsg name="phone" />
                  </div>
                </div>

                <div className="form-row">
                  <div>
                    <label>Company</label>
                    <input type="text" name="company" value={form.company} onChange={handle}
                      placeholder="Your company name" />
                  </div>
                  <div>
                    <label>Country <span className="required">*</span></label>
                    <select name="country" value={form.country} onChange={handle}
                      style={inputStyle("country")}>
                      <option value="">Select Country</option>
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>Germany</option>
                      <option>France</option>
                      <option>Other</option>
                    </select>
                    <ErrMsg name="country" />
                  </div>
                </div>

                <div className="form-row full">
                  <div>
                    <label>Service Interested In</label>
                    <select name="service" value={form.service} onChange={handle}>
                      <option value="">Select a Service</option>
                      {SERVICES.map(svc => (
                        <option key={svc.id} value={svc.label.replace("\n", " ")}>
                          {svc.label.replace("\n", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row full">
                  <div>
                    <label>Subject <span className="required">*</span></label>
                    <input type="text" name="subject" value={form.subject} onChange={handle}
                      placeholder="Brief subject of your inquiry" style={inputStyle("subject")} />
                    <ErrMsg name="subject" />
                  </div>
                </div>

                <div className="form-row full">
                  <div>
                    <label>Your Message <span className="required">*</span></label>
                    <textarea name="message" value={form.message} onChange={handle}
                      placeholder="Please describe your requirements in detail..."
                      rows="6" style={inputStyle("message")} />
                    <ErrMsg name="message" />
                  </div>
                </div>

                <div className="form-row full">
                  <div>
                    <label>How Did You Hear About Us?</label>
                    <select name="howheard" value={form.howheard} onChange={handle}>
                      <option value="">Select</option>
                      <option>Google / Search Engine</option>
                      <option>LinkedIn</option>
                      <option>Referral from a colleague</option>
                      <option>Social Media</option>
                      <option>Advertisement</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="submit-row">
                  <button type="submit" className="submit-btn"
                    disabled={status === "sending" || validating}>
                    {validating
                      ? "Verifying email…"
                      : status === "sending"
                        ? "Sending…"
                        : "SEND MESSAGE"}
                  </button>
                  <button type="button" className="reset-btn" onClick={reset}>Clear Form</button>
                </div>

                <p className="form-note-bottom">
                  By submitting this form, you agree to our Privacy Policy and Terms of Use.
                  We respect your privacy and will never share your information with third parties.
                </p>

              </form>
            )}
          </section>

          <aside className="contact-sidebar">
            <div className="contact-info-box">
              <div className="box-title">{contactInfo.title}</div>
              <div className="box-body">
                {contactInfo.rows.map((row, i) => (
                  <div className="ci-row" key={i}>
                    <span className="ci-icon">{row.icon}</span>
                    <div>
                      <span className="ci-label">{row.label}</span>
                      {row.href
                        ? <a href={row.href}>{row.text}</a>
                        : <span>{row.text}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="office-box">
              <div className="box-title">{offices.title}</div>
              {offices.cards.map((card, i) => (
                <div className="office-card" key={i}>
                  <strong>{card.flag} {card.name}</strong>
                  {card.lines.map((line, j) => <span key={j}>{line}<br/></span>)}
                  {card.email && <a href={"mailto:" + card.email}>{card.email}</a>}
                </div>
              ))}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
