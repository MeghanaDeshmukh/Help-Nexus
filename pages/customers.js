// ================================================================
// CUSTOMERS PAGE
// Add filenames to LOGO_FILES and drop images into logos/ folder.
// ================================================================

const LOGO_FILES = [
  "Nuvolos.jpg",
  "uni_Exeter.jpg",
  "uni_HongKong.jpg",
  "uni_london_economics.jpg",
  "uni_stanford.jpg",
];

const LOGO_FOLDER = "logos/";

function LogoStrip() {
  const [logos, setLogos] = React.useState(
    LOGO_FILES.map(f => ({ file: f, ok: true }))
  );
  const visible = logos.filter(l => l.ok);

  if (visible.length === 0) {
    return (
      <div className="placeholder-card">
        <div className="ph-icon">&#127970;</div>
        <p>Add filenames to <strong>LOGO_FILES</strong> in <code>pages/customers.js</code> and drop images into <strong>logos/</strong>.</p>
      </div>
    );
  }

  return (
    <div className="logo-strip-wrap">
      <div className="logo-strip">
        {[...visible, ...visible].map((l, i) => (
          <div className="logo-chip" key={i}>
            <img
              src={LOGO_FOLDER + l.file}
              alt={l.file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}
              onError={() =>
                setLogos(prev =>
                  prev.map((x, j) => j === (i % visible.length) ? { ...x, ok: false } : x)
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomersPage() {
  const industries = [
    { icon: "\u{1F3E5}", name: "Healthcare",       desc: "Clinics, hospitals and billing companies across the US, UK and India." },
    { icon: "\u{1F3D7}", name: "Engineering",       desc: "Architecture and infrastructure firms needing CAD and BIM support." },
    { icon: "\u{1F6D2}", name: "Ecommerce",         desc: "Online retailers requiring bulk photo editing and catalog management." },
    { icon: "\u{1F4CA}", name: "Finance",            desc: "Investment firms and fintech companies needing research and analysis." },
    { icon: "\u{1F4DE}", name: "Telecoms and SaaS", desc: "Companies outsourcing customer support and virtual assistant services." },
    { icon: "\u{1F3A8}", name: "Creative Agencies", desc: "Design studios and marketing agencies handling overflow work." },
  ];

  return (
    <div className="page-enter">
      <div className="section-heading-row"><h2>OUR CUSTOMERS</h2></div>
      <div className="simple-page-wrap">

        <h1>Who We Work With</h1>
        <p>HelpNexus partners with businesses of all sizes across multiple industries and geographies. Our clients trust us to handle critical back-office and operational processes with precision, confidentiality, and consistency.</p>

        <h2>Industries We Serve</h2>
        <div className="industry-grid">
          {industries.map((ind, i) => (
            <div className="industry-card" key={i}>
              <div className="ind-icon">{ind.icon}</div>
              <div className="ind-name">{ind.name}</div>
              <div className="ind-desc">{ind.desc}</div>
            </div>
          ))}
        </div>

        <h2>Where Our Clients Are Based</h2>
        <p>We serve clients across <strong>North America, Europe, Australia, and Asia</strong>. Our Bengaluru operations allow competitive pricing with round-the-clock support across multiple time zones.</p>

        <h2>Our Clients</h2>
        <LogoStrip />

      </div>
    </div>
  );
}