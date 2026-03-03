// ================================================================
// ABOUT US PAGE
// Two-column layout. Left: wide section cards. Right: sticky
// sidebar with two collapsible panels (Get in Touch + Schedule).
// ================================================================

function AboutPage({ onGoContact }) {
  const { aboutPage, quoteBox } = window.CONTENT_DATA;
  const [contactOpen,  setContactOpen]  = React.useState(false);
  const [scheduleOpen, setScheduleOpen] = React.useState(false);

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

  return (
    <div className="page-enter">
      <div className="section-heading-row"><h2>ABOUT US</h2></div>

      {/* Quick-jump pills */}
      <div className="svc-page-jumps">
        {h2ids.map(s => (
          <a key={s.id} href={"#about-" + s.id} className="svc-jump-link">{s.text}</a>
        ))}
      </div>

      {/* Outer wrapper: card grid on left, sidebar on right */}
      <div className="about-layout">

        {/* LEFT — 2-per-row card grid */}
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
            <form onSubmit={e => { e.preventDefault(); onGoContact(); }}>
              <input type="text"  placeholder="Name*"  required />
              <input type="email" placeholder="Email*" required />
              <input type="tel"   placeholder="Phone*" required />
              <textarea placeholder="Your requirements*" rows="3"></textarea>
              <button type="submit">Schedule Free Call</button>
            </form>
            {quoteBox.noteLines.map((n, i) => (
              <p key={i} className="qnote">{n}</p>
            ))}
          </AccordionPanel>

        </aside>
      </div>
    </div>
  );
}
