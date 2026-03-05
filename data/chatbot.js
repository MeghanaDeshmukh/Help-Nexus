/* ================================================================
   HELPNEXUS — CHATBOT DATA FILE
   Edit this file to control everything the chatbot says and does.
   No coding knowledge needed.

   HOW IT WORKS:
   • The bot matches what the visitor types against "keywords" in
     each FAQ entry and shows the best matching "response".
   • "quickReplies" are clickable shortcut buttons shown with
     that response so visitors don't have to type.
   • Special "action" entries trigger the contact form or email.

   STRUCTURE OF EACH FAQ ENTRY:
   {
     "id":          unique name (no spaces),
     "keywords":    words/phrases that trigger this response,
     "response":    what the bot replies (HTML supported),
     "quickReplies": clickable buttons shown after this reply,
     "action":      optional — "open_contact" opens the contact form
   }
================================================================ */

window.CHATBOT_DATA = {

  /* ── Bot personality ─────────────────────────────────────── */
  "botName":    "HelpNexus Assistant",
  "greeting":   "👋 Hi there! I'm the HelpNexus assistant. How can I help you today?",
  "fallback":   "I'm not sure about that — but I'd love to connect you with our team. You can <button class='cw-inline-btn' data-action='open_contact'>send us a message</button> or browse the quick options below.",
  "thankYou":   "Thanks! We've received your details. Our team will reach out within 24 hours. 🎉",

  /* ── Opening quick reply buttons (shown with greeting) ───── */
  "openingReplies": [
    "What services do you offer?",
    "How does it work?",
    "What's the pricing?",
    "I want to get in touch"
  ],

  /* ── FAQ entries ─────────────────────────────────────────── */
  "faqs": [

    /* ── Services ── */
    {
      "id": "services_overview",
      "keywords": ["services", "offer", "what do you do", "offerings", "capabilities", "provide", "help with"],
      "response": "We offer a wide range of outsourcing services:<br/><br/>📞 <strong>Call Center</strong> — inbound, outbound, customer support<br/>⚙️ <strong>Engineering</strong> — CAD, BIM, civil, structural<br/>🏥 <strong>Healthcare BPO</strong> — billing, coding, transcription<br/>🎨 <strong>Creative Services</strong> — design, video, animation<br/>📊 <strong>Data Services</strong> — entry, processing, conversion<br/>📸 <strong>Photo Editing</strong> — retouching, clipping paths<br/>🔬 <strong>Research & Analysis</strong> — market, financial, scientific<br/><br/>Which area interests you most?",
      "quickReplies": ["Call Center", "Engineering", "Healthcare BPO", "Creative Services", "Data Services", "Photo Editing", "Research & Analysis"]
    },

    {
      "id": "call_center",
      "keywords": ["call center", "call centre", "inbound", "outbound", "telemarketing", "customer support", "answering", "lead generation", "virtual assistant"],
      "response": "Our <strong>Call Center Services</strong> include:<br/><br/>• Inbound & Outbound Call Center<br/>• Telemarketing & Lead Generation<br/>• Customer Support (24/7 available)<br/>• Virtual Assistant Services<br/>• Call Center Monitoring & Consulting<br/>• Answering Services<br/><br/>We handle everything from small teams to large-scale operations.",
      "quickReplies": ["What's the pricing?", "How do I get started?", "Talk to the team"]
    },

    {
      "id": "engineering",
      "keywords": ["engineering", "cad", "bim", "mechanical", "civil", "structural", "electrical", "architectural", "infrastructure", "drawing", "design"],
      "response": "Our <strong>Engineering Services</strong> cover:<br/><br/>• Mechanical & Electrical Engineering<br/>• Architectural & Civil Engineering<br/>• Structural Engineering<br/>• BIM (Building Information Modeling)<br/>• CAD Drafting & Conversion<br/>• Infrastructure Engineering<br/><br/>Our engineers are experienced with AutoCAD, Revit, SolidWorks, and more.",
      "quickReplies": ["What's the pricing?", "How do I get started?", "Talk to the team"]
    },

    {
      "id": "healthcare",
      "keywords": ["healthcare", "medical", "billing", "coding", "transcription", "insurance", "revenue cycle", "rcm", "teleradiology", "hipaa"],
      "response": "Our <strong>Healthcare BPO Services</strong> include:<br/><br/>• Medical Billing & Coding<br/>• Medical Transcription<br/>• Insurance Eligibility Verification<br/>• Revenue Cycle Management (RCM)<br/>• Teleradiology Services<br/>• Healthcare Call Center<br/><br/>All processes are HIPAA-compliant. We work with clinics, hospitals, and billing companies.",
      "quickReplies": ["What's the pricing?", "Are you HIPAA compliant?", "Talk to the team"]
    },

    {
      "id": "hipaa",
      "keywords": ["hipaa", "compliant", "compliance", "secure", "privacy", "data protection", "confidential"],
      "response": "✅ Yes, we are <strong>fully HIPAA-compliant</strong>. We take data security seriously:<br/><br/>• All staff trained on HIPAA regulations<br/>• Encrypted data transfer and storage<br/>• Strict NDAs with all team members<br/>• Regular security audits<br/>• No data shared with third parties<br/><br/>Your patient and business data is always safe with us.",
      "quickReplies": ["Tell me about Healthcare BPO", "Talk to the team"]
    },

    {
      "id": "creative",
      "keywords": ["creative", "graphic", "design", "video", "animation", "illustration", "3d", "storyboard", "audio", "writing", "prepress"],
      "response": "Our <strong>Creative Services</strong> include:<br/><br/>• Graphic Design & Branding<br/>• Video Editing & Production<br/>• Animation (2D & 3D)<br/>• Illustration & Storyboarding<br/>• 3D Modeling & Rendering<br/>• Audio Editing<br/>• Writing & Content Services<br/>• Prepress & Print-ready Files",
      "quickReplies": ["What's the pricing?", "How do I get started?", "Talk to the team"]
    },

    {
      "id": "data_services",
      "keywords": ["data entry", "data conversion", "data processing", "ocr", "ebook", "catalog", "property management", "digitization"],
      "response": "Our <strong>Data Services</strong> include:<br/><br/>• Data Entry & Validation<br/>• Data Conversion (any format)<br/>• eBook Conversion & Formatting<br/>• OCR (Optical Character Recognition)<br/>• Online Catalog Management<br/>• Property Data Management<br/><br/>We handle high-volume data projects with accuracy guarantees.",
      "quickReplies": ["What's the pricing?", "How do I get started?", "Talk to the team"]
    },

    {
      "id": "photo_editing",
      "keywords": ["photo", "editing", "retouching", "clipping path", "real estate", "wedding", "ecommerce", "portrait", "photoshop", "background removal"],
      "response": "Our <strong>Photo Editing Services</strong> cover:<br/><br/>• Photo Retouching & Enhancement<br/>• Clipping Path & Background Removal<br/>• Real Estate Photo Editing<br/>• Wedding & Portrait Retouching<br/>• Ecommerce Product Photo Editing<br/>• Photoshop & Lightroom Services<br/><br/>We handle bulk orders with fast turnaround.",
      "quickReplies": ["What's the pricing?", "How do I get started?", "Talk to the team"]
    },

    {
      "id": "research",
      "keywords": ["research", "analysis", "market research", "financial research", "investment", "business research", "social media monitoring", "pharma", "scientific", "benchmarking"],
      "response": "Our <strong>Research & Analysis Services</strong> include:<br/><br/>• Market & Business Research<br/>• Financial & Investment Research<br/>• Social Media Monitoring<br/>• Pharmaceutical Research<br/>• Scientific Research Support<br/>• Benchmarking Services<br/><br/>We deliver structured reports, data sets, and actionable insights.",
      "quickReplies": ["What's the pricing?", "How do I get started?", "Talk to the team"]
    },

    /* ── Pricing ── */
    {
      "id": "pricing",
      "keywords": ["price", "pricing", "cost", "how much", "rates", "quote", "fee", "charge", "affordable", "cheap", "expensive"],
      "response": "Our pricing depends on the <strong>scope and volume</strong> of work — we don't do one-size-fits-all. Most clients find us <strong>40–60% more cost-effective</strong> than hiring in-house.<br/><br/>To get an accurate quote, just share a few details about your project. It's free, no obligation.",
      "quickReplies": ["Get a free quote", "Talk to the team"],
      "action": null
    },

    /* ── How it works ── */
    {
      "id": "how_it_works",
      "keywords": ["how does it work", "how it works", "process", "workflow", "steps", "get started", "start", "begin", "onboarding"],
      "response": "Getting started is simple — here's how it works:<br/><br/><strong>1. Tell us what you need</strong> — fill out our contact form or call us<br/><strong>2. Free consultation</strong> — we scope the work and provide a quote<br/><strong>3. Trial project</strong> — start small to validate quality<br/><strong>4. Scale up</strong> — expand the team as you're satisfied<br/><br/>Most projects kick off within <strong>48–72 hours</strong> of the initial call.",
      "quickReplies": ["Get a free quote", "What services do you offer?", "Talk to the team"]
    },

    /* ── About the company ── */
    {
      "id": "about",
      "keywords": ["about", "who are you", "company", "background", "experience", "years", "history", "founded", "bengaluru", "india", "location", "where are you"],
      "response": "HelpNexus is a business outsourcing company based in <strong>Bengaluru, India</strong>. We help businesses worldwide reduce costs and scale operations by providing high-quality outsourced services across multiple domains.<br/><br/>Our team consists of trained professionals across engineering, healthcare, creative, and data disciplines.",
      "quickReplies": ["What services do you offer?", "Talk to the team"]
    },

    /* ── Quality ── */
    {
      "id": "quality",
      "keywords": ["quality", "accuracy", "reliable", "guarantee", "standard", "iso", "certification", "sla", "turnaround", "deadline", "delivery"],
      "response": "Quality is at the core of everything we do:<br/><br/>✅ Dedicated QA reviewers on every project<br/>✅ Multi-layer review process<br/>✅ SLA-backed delivery timelines<br/>✅ Revision rounds included<br/>✅ 99%+ accuracy guarantee on data projects<br/><br/>We provide regular progress updates and are always reachable during your business hours.",
      "quickReplies": ["How do I get started?", "Talk to the team"]
    },

    /* ── Contact / talk to team ── */
    {
      "id": "contact",
      "keywords": ["contact", "talk", "speak", "reach", "email", "call", "phone", "get in touch", "connect", "team", "sales", "human", "person", "representative"],
      "response": "I'd love to connect you with our team! You can reach us via:<br/><br/>📧 <strong>Email:</strong> contact@help-nexus.com<br/>📞 <strong>Phone:</strong> +91 7676547429<br/>⏰ <strong>Hours:</strong> Mon–Fri, 9am–6pm IST<br/><br/>Or fill out our contact form and we'll get back to you within 24 hours:",
      "quickReplies": ["Open contact form"],
      "action": "show_contact_cta"
    },

    /* ── Free quote / lead capture ── */
    {
      "id": "get_quote",
      "keywords": ["free quote", "get quote", "request quote", "quote me", "send details", "interested", "inquiry"],
      "response": "Great! Let me open the contact form for you — our team will send a custom quote within 24 hours. 💬",
      "quickReplies": ["Open contact form"],
      "action": "open_contact"
    }

  ],

  /* ── Lead capture flow ───────────────────────────────────────
     When a visitor says they want to get in touch via chat,
     the bot walks through these steps to collect their info
     and then sends the same EmailJS email as the contact form.
  ─────────────────────────────────────────────────────────────*/
  "leadCapture": {
    "triggerPhrases": ["talk to the team", "speak to someone", "contact sales", "get in touch via chat", "leave my details"],
    "steps": [
      { "field": "name",    "prompt": "Sure! Let's get you connected. 😊 What's your <strong>name</strong>?" },
      { "field": "email",   "prompt": "Nice to meet you, {name}! What's the best <strong>email address</strong> to reach you?" },
      { "field": "service", "prompt": "And which <strong>service</strong> are you interested in? (or just type 'not sure')" },
      { "field": "message", "prompt": "Last one — briefly describe what you need or any questions you have:" }
    ],
    "confirmationMessage": "Perfect, {name}! I've sent your details to our team. Expect a reply at <strong>{email}</strong> within 24 hours. 🎉",
    "emailSubject": "New Chat Lead: {name}"
  }

};
