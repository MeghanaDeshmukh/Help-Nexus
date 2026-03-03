// ================================================================
// APP SHELL  -  Router, TabNav, ServiceBar, Header, Footer, Chat
//
// To add a new page:
//   1. Add an entry to TAB_DEFS
//   2. Create pages/yourpage.js
//   3. Add a script tag in index.html
//   4. Add a case in renderPage() below
//
// EmailJS config: update the three window._EMAILJS_* variables.
// ================================================================

window._EMAILJS_SVC = "service_mdwcfg7";
window._EMAILJS_TPL = "template_tpsbrfb";
window._EMAILJS_KEY = "21WwJA7ArdS1VEsTs";

const { useState, useEffect, useRef } = React;
const SERVICES = window.SERVICES_DATA;
const CONTENT  = window.CONTENT_DATA;
const BOT      = window.CHATBOT_DATA;
let _setPage      = null;
let _setActiveSvc = null;

const TAB_DEFS = [
  { id: "about",         label: "About Us"         },
  { id: "customers",     label: "Customers"        },
  { id: "howwework",     label: "How We Work"      },
  { id: "management",    label: "Management Team"  },
  { id: "stories",       label: "Success Stories"  },
  { id: "testimonials",  label: "Testimonials"     },
  { id: "services",      label: "Services"         },
  { id: "contact",       label: "Contact Us"       },
];

function findBestFaq(text) {
  const lower = text.toLowerCase();
  let best = null, bestScore = 0;
  for (const faq of BOT.faqs) {
    let score = 0;
    for (const kw of faq.keywords) { if (lower.includes(kw.toLowerCase())) score++; }
    if (score > bestScore) { bestScore = score; best = faq; }
  }
  return bestScore > 0 ? best : null;
}

function ChatWidget({ onOpenContact }) {
  const [open, setOpen]         = useState(false);
  const [msgs, setMsgs]         = useState([]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [leadMode, setLeadMode] = useState(false);
  const [leadStep, setLeadStep] = useState(0);
  const [leadData, setLeadData] = useState({ name:"", email:"", service:"", message:"" });
  const bottomRef               = useRef(null);

  useEffect(() => { if (open && msgs.length === 0) addBot(BOT.greeting, BOT.openingReplies); }, [open]);
  useEffect(() => { bottomRef.current && bottomRef.current.scrollIntoView({ behavior:"smooth" }); }, [msgs, typing]);

  const addBot  = (text, chips, extra) => setMsgs(p => [...p, { role:"bot",  text, chips: chips||[], extra: extra||null }]);
  const addUser = text                 => setMsgs(p => [...p, { role:"user", text }]);
  const botReply = (text, chips, extra, delay) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); addBot(text, chips, extra); }, delay || 600);
  };

  function send(text) {
    const t = text.trim(); if (!t) return;
    addUser(t); setInput("");
    if (leadMode) { handleLead(t); return; }
    const lower = t.toLowerCase();
    if (BOT.leadCapture.triggerPhrases.some(p => lower.includes(p.toLowerCase()))) {
      setLeadMode(true); setLeadStep(0); botReply(BOT.leadCapture.steps[0].prompt); return;
    }
    if (lower.includes("contact form") || lower.includes("get a free quote")) {
      botReply("Opening the contact form for you!", [], { type:"open_contact" }); return;
    }
    const faq = findBestFaq(t);
    if (faq) {
      if      (faq.action === "open_contact")     botReply(faq.response, faq.quickReplies||[], { type:"open_contact" });
      else if (faq.action === "show_contact_cta") botReply(faq.response, faq.quickReplies||[], { type:"contact_cta"  });
      else                                         botReply(faq.response, faq.quickReplies||[]);
    } else { botReply(BOT.fallback, BOT.openingReplies); }
  }

  async function handleLead(value) {
    const steps = BOT.leadCapture.steps;
    const field = steps[leadStep].field;
    const nd = Object.assign({}, leadData, { [field]: value }); setLeadData(nd);
    if (leadStep < steps.length - 1) {
      setLeadStep(leadStep + 1);
      botReply(steps[leadStep + 1].prompt.replace("{name}", nd.name || ""));
    } else {
      setLeadMode(false); setLeadStep(0);
      botReply(
        BOT.leadCapture.confirmationMessage.replace("{name}", nd.name).replace("{email}", nd.email),
        ["What services do you offer?", "How does it work?"]
      );
      try {
        await emailjs.send(window._EMAILJS_SVC, window._EMAILJS_TPL, {
          to_email: nd.email, from_name: nd.name, name: nd.name,
          service: nd.service || "Not specified", message: nd.message || "Chat lead",
          subject: BOT.leadCapture.emailSubject.replace("{name}", nd.name),
          phone: "Via chat", company: "Via chat", country: "Unknown", howheard: "Chatbot"
        }, window._EMAILJS_KEY);
      } catch(e) { console.warn("EmailJS:", e); }
      setLeadData({ name:"", email:"", service:"", message:"" });
    }
  }

  const onKey = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } };

  function Msg({ msg }) {
    if (msg.role === "user") return <div className="cw-msg user"><div className="cw-bubble">{msg.text}</div></div>;
    return (
      <div className="cw-msg bot">
        <div className="cw-bubble" dangerouslySetInnerHTML={{ __html: msg.text }} />
        {msg.extra && msg.extra.type === "open_contact" &&
          <button className="cw-contact-cta-btn" style={{marginTop:8,borderRadius:10,padding:"9px 14px"}}
            onClick={() => { onOpenContact(); setOpen(false); }}>Open Contact Form</button>}
        {msg.extra && msg.extra.type === "contact_cta" &&
          <div className="cw-contact-cta">
            <div>{CONTENT.site.email}</div><div>{CONTENT.site.phone}</div>
            <button className="cw-contact-cta-btn" onClick={() => { onOpenContact(); setOpen(false); }}>Open Contact Form</button>
          </div>}
        {msg.chips && msg.chips.length > 0 &&
          <div className="cw-chips">
            {msg.chips.map((c, i) => <button key={i} className="cw-chip" onClick={() => send(c)}>{c}</button>)}
          </div>}
      </div>
    );
  }

  return (
    <div className="cw-root">
      {open && (
        <div className="cw-window">
          <div className="cw-header">
            <div className="cw-header-top">
              <div className="cw-title">{BOT.botName}</div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div className="cw-status"><div className="cw-status-dot"/>Online</div>
                <button className="cw-close" onClick={() => setOpen(false)}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="cw-accent-bar"/>
          </div>
          <div className="cw-messages">
            {msgs.map((m, i) => <Msg key={i} msg={m}/>)}
            {typing && <div className="cw-msg bot"><div className="cw-typing"><span/><span/><span/></div></div>}
            <div ref={bottomRef}/>
          </div>
          <div className="cw-input-area">
            <textarea className="cw-input" rows={1}
              placeholder={leadMode ? "Type your answer..." : "Ask me anything..."}
              value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}/>
            <button className="cw-send" onClick={() => send(input)} disabled={!input.trim()}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="#0a0a0a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      <button className="cw-fab" onClick={() => setOpen(o => !o)}>
        {!open && <div className="cw-dot"/>}
        {open
          ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" color="white"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" color="white"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </button>
    </div>
  );
}

function ServiceBar() {
  return (
    <nav className="service-bar"><div className="service-bar-inner">
      {SERVICES.map(svc => {
        const parts = svc.label.split("\n");
        return (
          <div className="svc-item" key={svc.id}>
            <a href="#" onClick={e=>{e.preventDefault();if(_setActiveSvc)_setActiveSvc(svc.id);if(_setPage)_setPage("services");window.scrollTo({top:0,behavior:"smooth"});}}>{parts[0]}<br/>{parts[1]} &#9660;</a>
            {svc.subServices && svc.subServices.length > 0 &&
              <div className="svc-dropdown">{svc.subServices.map((sub,i)=>{const nm=typeof sub==="object"?sub.name:sub;return(<a key={i} href="#" onClick={e=>{e.preventDefault();if(_setActiveSvc)_setActiveSvc(svc.id);if(_setPage)_setPage("services");window.scrollTo({top:0,behavior:"smooth"});}}>{nm}</a>);})}</div>}
          </div>
        );
      })}
    </div></nav>
  );
}

function TabNav({ activePage, onNavigate }) {
  return (
    <nav className="tab-nav"><div className="tab-nav-inner">
      {TAB_DEFS.map(tab => (
        <a key={tab.id} href="#"
          className={activePage === tab.id ? "active" : ""}
          onClick={e => { e.preventDefault(); onNavigate(tab.id); window.scrollTo({ top:0, behavior:"smooth" }); }}>
          {tab.label}
        </a>
      ))}
    </div></nav>
  );
}

function Footer() {
  const { site, footer } = CONTENT;
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div>
          <span className="footer-brand-name">{site.name}</span>
          <p>{footer.tagline}</p>
          <p><a href={"mailto:" + site.email}>{site.email}</a></p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>{SERVICES.map(svc => (
            <li key={svc.id}>
              <a href="#" onClick={e => {
                e.preventDefault();
                if (_setActiveSvc) _setActiveSvc(svc.id);
                if (_setPage) _setPage("services");
                window.scrollTo({ top:0, behavior:"smooth" });
              }}>{svc.label.replace("\n"," ")}</a>
            </li>
          ))}</ul>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>{footer.quickLinks.map((l, i) => {
            const FOOTER_MAP = {
              "about us":    "about",
              "how we work": "howwework",
              "case studies":"stories",
              "testimonials":"testimonials",
              "careers":     "contact",
            };
            const pageId = FOOTER_MAP[l.label.toLowerCase()];
            return (
              <li key={i}>
                <a href="#" onClick={e => {
                  e.preventDefault();
                  if (pageId && _setPage) { _setPage(pageId); window.scrollTo({ top:0, behavior:"smooth" }); }
                }}>{l.label}</a>
              </li>
            );
          })}</ul>
        </div>
      </div>
      <div className="footer-bottom"><div className="footer-bottom-inner"><p>{footer.bottomText}</p></div></div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={"back-to-top" + (visible ? " visible" : "")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      title="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function AppRoot() {
  const [page, setPage]           = useState("about");
  const [activeSvc, setActiveSvc] = useState(null);
  useEffect(() => { _setPage = setPage; _setActiveSvc = setActiveSvc; }, []);
  const navigate  = p => { setPage(p); if(p!=="services") setActiveSvc(null); };
  const goContact = () => navigate("contact");
  const renderPage = () => {
    switch (page) {
      case "about":        return <AboutPage       onGoContact={goContact}/>;
      case "customers":    return <CustomersPage/>;
      case "howwework":    return <HowWeWorkPage    onGoContact={goContact}/>;
      case "management":   return <ManagementPage/>;
      case "stories":      return <StoriesPage      onGoContact={goContact}/>;
      case "testimonials": return <TestimonialsPage/>;
      case "services":     return <ServicesPage onGoContact={goContact} activeSection={activeSvc}/>;
      case "contact":      return <ContactPage/>;
      default:             return <AboutPage        onGoContact={goContact}/>;
    }
  };
  return (
    <>
      <BackToTop />
      <TabNav activePage={page} onNavigate={navigate}/>
      <div id="page-content">{renderPage()}</div>
    </>
  );
}

const goToContact = () => {
  if (_setPage) { _setPage("contact"); window.scrollTo({ top:0, behavior:"smooth" }); }
};

ReactDOM.createRoot(document.getElementById("logo-root")).render(
  <><span className="logo-name">{CONTENT.site.name}</span><span className="logo-slogan">{CONTENT.site.slogan}</span></>
);
const NAV_PAGE_MAP = {
  "services":   "services",
  "about us":   "about",
  "how we work":"howwework",
};
function HeaderNav() {
  return (
    <>
      {CONTENT.header.navLinks.map((l, i) => {
        const pageId = NAV_PAGE_MAP[l.label.replace(/[^a-z ]/gi,"").trim().toLowerCase()];
        if (pageId) {
          return (
            <a key={i} href="#" onClick={e => {
              e.preventDefault();
              if (_setPage) { _setPage(pageId); window.scrollTo({ top:0, behavior:"smooth" }); }
            }}>{l.label}</a>
          );
        }
        return <a key={i} href={l.href}>{l.label}</a>;
      })}
    </>
  );
}
ReactDOM.createRoot(document.getElementById("header-nav-root")).render(<HeaderNav/>);
ReactDOM.createRoot(document.getElementById("contact-btn-root")).render(
  <button className="contact-btn-react" onClick={goToContact}>CONTACT US</button>
);
ReactDOM.createRoot(document.getElementById("service-bar-root")).render(<ServiceBar/>);
ReactDOM.createRoot(document.getElementById("app-root")).render(<AppRoot/>);
ReactDOM.createRoot(document.getElementById("footer-root")).render(<Footer/>);
ReactDOM.createRoot(document.getElementById("chat-root")).render(
  <ChatWidget onOpenContact={goToContact}/>
);
