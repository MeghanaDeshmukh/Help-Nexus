// ================================================================
// HOW WE WORK PAGE  -  edit steps and commitments arrays below
// ================================================================
function HowWeWorkPage({ onGoContact }) {
  const steps = [
    { title: "Tell Us What You Need",
      desc:  "Fill out our contact form or call us. Describe your project, volume, and timeline." },
    { title: "Free Consultation and Quote",
      desc:  "We schedule a no-obligation call and provide a transparent quote within 24 hours." },
    { title: "Trial Project",
      desc:  "Start with a small pilot to validate quality and process fit. No commitment required." },
    { title: "Onboarding and Setup",
      desc:  "We assign a dedicated team and align on SOPs. Most projects go live within 48-72 hours." },
    { title: "Execution and Quality Control",
      desc:  "Every task passes through our multi-layer QA process before delivery, with regular updates." },
    { title: "Review and Scale",
      desc:  "We gather feedback, fine-tune the process, then scale up seamlessly." },
  ];
  const commitments = [
    { label: "SLA-backed delivery",        detail: "agreed turnaround times in writing" },
    { label: "Dedicated point of contact", detail: "one person who knows your account" },
    { label: "Regular reporting",          detail: "daily or weekly updates, your choice" },
    { label: "Revision rounds included",   detail: "we do not close a project until you are satisfied" },
    { label: "NDA available",              detail: "we sign confidentiality agreements on request" },
  ];
  return (
    <div className="page-enter">
      <div className="section-heading-row"><h2>HOW WE WORK</h2></div>
      <div className="simple-page-wrap">
        <h1>Our Process</h1>
        <p>Our engagement model is simple, low-risk, and fast from first contact to full-scale delivery.</p>
        <ol className="steps-list">
          {steps.map((step, i) => (
            <li key={i}>
              <div className="step-num">{i + 1}</div>
              <div className="step-body"><h3>{step.title}</h3><p>{step.desc}</p></div>
            </li>
          ))}
        </ol>
        <h2>Our Commitments</h2>
        <ul>{commitments.map((c, i) => <li key={i}><strong>{c.label}</strong> - {c.detail}</li>)}</ul>
        <div className="cta-wrap" style={{ marginTop: 36 }}>
          <button className="contact-btn-react" onClick={onGoContact}>Get Started Today</button>
        </div>
      </div>
    </div>
  );
}
