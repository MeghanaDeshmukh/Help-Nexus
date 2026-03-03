// ================================================================
// SERVICES PAGE
// Driven entirely by data/services.js — no edits needed here.
// Add/edit services in data/services.js and this page updates.
//
// To add a description for each sub-service, change the
// subServices entries in services.js from plain strings to objects:
//   { "name": "Medical Billing", "description": "We handle..." }
// ================================================================

function ServicesPage({ onGoContact, activeSection }) {
  const SERVICES = window.SERVICES_DATA;

  React.useEffect(() => {
    if (activeSection) {
      const el = document.getElementById("svc-" + activeSection);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, [activeSection]);

  return (
    <div className="page-enter">
      <div className="section-heading-row"><h2>OUR SERVICES</h2></div>

      <div className="svc-page-jumps">
        {SERVICES.map(svc => (
          <a key={svc.id} href={"#svc-" + svc.id} className="svc-jump-link">
            {svc.label.replace("\n", " ")}
          </a>
        ))}
      </div>

      <div className="svc-page-wrap">
        {SERVICES.map((svc, idx) => {
          const [line1, line2] = svc.label.split("\n");
          return (
            <section key={svc.id} id={"svc-" + svc.id} className="svc-section">
              <div className="svc-section-header">
                <div>
                  <h2 className="svc-section-title">{line1} {line2}</h2>
                  <p className="svc-section-sub">
                    Professional outsourcing solutions tailored to your business needs.
                  </p>
                </div>
              </div>

              <div className="svc-sub-list">
                {svc.subServices.map((sub, i) => {
                  const name = typeof sub === "object" ? sub.name : sub;
                  const desc = typeof sub === "object" ? sub.description : "";
                  return (
                    <div className="svc-sub-item" key={i}>
                      <div className="svc-sub-name">{name}</div>
                      <p className="svc-sub-desc">{desc || "Add a description for this service in data/services.js"}</p>
                    </div>
                  );
                })}
              </div>

              <div className="svc-section-cta">
                <button className="contact-btn-react" onClick={onGoContact}>
                  Enquire About This Service
                </button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
