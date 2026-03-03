// ================================================================
// CONTACT PAGE
// Contact details come from data/content.js.
// EmailJS config is set at the top of pages/app.js.
// ================================================================
const CONTACT_BLANK = {
  fname:"", lname:"", email:"", phone:"", company:"",
  country:"", service:"", subject:"", message:"", howheard:""
};

function ContactPage() {
  const { contactPage } = window.CONTENT_DATA;
  const { contactInfo, offices } = contactPage.sidebar;
  const SERVICES = window.SERVICES_DATA;

  const [form,   setForm]   = React.useState(CONTACT_BLANK);
  const [status, setStatus] = React.useState("idle");
  const [errMsg, setErrMsg] = React.useState("");

  const handle = e => setForm(Object.assign({}, form, { [e.target.name]: e.target.value }));
  const reset  = () => { setForm(CONTACT_BLANK); setStatus("idle"); setErrMsg(""); };

  const submit = async e => {
    e.preventDefault();
    setStatus("sending"); setErrMsg("");
    try {
      await emailjs.send(
        window._EMAILJS_SVC, window._EMAILJS_TPL,
        {
          name: form.fname + " " + form.lname,
          to_email: form.email, phone: form.phone,
          company: form.company || "N/A", country: form.country,
          service: form.service || "N/A", subject: form.subject,
          message: form.message, howheard: form.howheard || "N/A"
        },
        window._EMAILJS_KEY
      );
      setStatus("success"); setForm(CONTACT_BLANK);
    } catch (err) {
      console.error(err); setErrMsg(contactPage.errorMessage); setStatus("error");
    }
  };

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
                {status === "error" && <div className="form-error-banner">&#9888; {errMsg}</div>}
                <div className="form-row">
                  <div><label>First Name <span className="required">*</span></label>
                    <input type="text" name="fname" value={form.fname} onChange={handle} placeholder="Your first name" required/></div>
                  <div><label>Last Name <span className="required">*</span></label>
                    <input type="text" name="lname" value={form.lname} onChange={handle} placeholder="Your last name" required/></div>
                </div>
                <div className="form-row">
                  <div><label>Email <span className="required">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={handle} placeholder="your@company.com" required/></div>
                  <div><label>Phone <span className="required">*</span></label>
                    <input type="tel" name="phone" value={form.phone} onChange={handle} placeholder="+91 00000 00000" required/></div>
                </div>
                <div className="form-row">
                  <div><label>Company</label>
                    <input type="text" name="company" value={form.company} onChange={handle} placeholder="Your company name"/></div>
                  <div><label>Country <span className="required">*</span></label>
                    <select name="country" value={form.country} onChange={handle} required>
                      <option value="">Select Country</option>
                      <option>India</option><option>United States</option><option>United Kingdom</option>
                      <option>Canada</option><option>Australia</option><option>Germany</option>
                      <option>France</option><option>Other</option>
                    </select></div>
                </div>
                <div className="form-row full"><div><label>Service Interested In</label>
                  <select name="service" value={form.service} onChange={handle}>
                    <option value="">Select a Service</option>
                    {SERVICES.map(svc => <option key={svc.id} value={svc.label.replace("\n"," ")}>{svc.label.replace("\n"," ")}</option>)}
                  </select></div></div>
                <div className="form-row full"><div><label>Subject <span className="required">*</span></label>
                  <input type="text" name="subject" value={form.subject} onChange={handle} placeholder="Brief subject of your inquiry" required/></div></div>
                <div className="form-row full"><div><label>Your Message <span className="required">*</span></label>
                  <textarea name="message" value={form.message} onChange={handle} placeholder="Please describe your requirements in detail..." required rows="6"/></div></div>
                <div className="form-row full"><div><label>How Did You Hear About Us?</label>
                  <select name="howheard" value={form.howheard} onChange={handle}>
                    <option value="">Select</option>
                    <option>Google / Search Engine</option><option>LinkedIn</option>
                    <option>Referral from a colleague</option><option>Social Media</option>
                    <option>Advertisement</option><option>Other</option>
                  </select></div></div>
                <div className="submit-row">
                  <button type="submit" className="submit-btn" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "SEND MESSAGE"}
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
                      {row.href ? <a href={row.href}>{row.text}</a> : <span>{row.text}</span>}
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
