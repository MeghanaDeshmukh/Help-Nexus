/* ================================================================
   HELPNEXUS — SITE CONTENT
   Edit this file to update all text on the website.
   No coding knowledge needed — just change the text values.

   ✅ HOW VARIABLES WORK HERE:
      Update something once at the top and it flows everywhere.
      For example, change "email" in the CONTACT block and it
      automatically updates the quote box, contact sidebar,
      footer, AND the chatbot — all at once.

   SECTION TYPES (used in aboutPage.sections):
     "heading1"   — big page title (use once at the top)
     "heading2"   — section subheading
     "paragraph"  — a paragraph (HTML tags like <strong> work)
     "bulletList" — bullet points, each item in "items": [ ... ]
================================================================ */

/* ── ❶  CHANGE THESE — they flow everywhere automatically ─── */
const _name    = "HelpNexus";
const _slogan  = "Enhancing your business";
const _email   = "contact@help-nexus.com";
const _phone   = "+91 7676547429";
const _address = "Bengaluru, India";
const _hours   = "Mon – Fri: 9:00 AM – 6:00 PM IST";
const _copy    = "© 2025 HelpNexus. All rights reserved.";

/* ── ❷  CHATBOT — change the bot name and what it knows ─────
   OLLAMA_URL: where your Ollama server is running
     • Local dev  →  "http://localhost:11434"
     • Production →  "http://YOUR-VPS-IP:11434"
   OLLAMA_MODEL: which model to use (must be pulled first)
     • "llama3"  (recommended, ~4GB)
     • "mistral" (lighter alternative)
   BOT_NAME: what the chat widget calls itself
   SYSTEM_PROMPT: the bot's personality and knowledge.
     Add your real services, prices, FAQs etc. here.
*/
const _chatbot = {
  ollamaUrl:    "http://localhost:11434",
  ollamaModel:  "llama3",
  botName:      _name + " Assistant",
  greeting:     "Hey there 👋 I'm the " + _name + " assistant. How can I help you today?",
  systemPrompt: `You are a helpful AI assistant for ${_name}, a business outsourcing company based in ${_address}.
We offer: Call Center Services, Engineering Services, Healthcare BPO, Creative Services, Data Services, Photo Editing, and Research & Analysis.
Contact: ${_email} | Phone: ${_phone} | Hours: ${_hours}
Help visitors with: general questions, service inquiries, FAQs, and capturing leads (name, email, what they need).
Be concise, friendly, and professional. If someone seems interested, gently ask for their contact details.`
};

/* ================================================================
   ❸  EVERYTHING BELOW USES THE VARIABLES ABOVE.
      You generally don't need to edit anything below this line
      unless you want to restructure the page layout itself.
================================================================ */

window.CONTENT_DATA = {

  /* ── Chatbot config (read by the chat widget) */
  "chatbot": _chatbot,

  /* ── Site-wide identity */
  "site": {
    "name":    _name,
    "slogan":  _slogan,
    "email":   _email,
    "phone":   _phone,
    "address": _address
  },

  /* ── Top header nav links */
  "header": {
    "navLinks": [
      { "label": "⚙ Services",  "href": "#" },
      { "label": "About Us",    "href": "#" },
      { "label": "How We Work", "href": "#" }
    ]
  },

  /* ── About page ─────────────────────────────────────────── */
  "aboutPage": {

    "tabNav": [
      { "label": "About Us",        "anchor": "about"     },
      { "label": "How We Work",     "anchor": "s1"        },
      { "label": "Success Stories", "anchor": "strengths" },
      { "label": "Testimonials",    "anchor": "team"      }
    ],

    "tocLinks": [
      { "label": "Our Goal",                    "anchor": "vision"    },
      { "label": "What Can You Expect From Us?","anchor": "expect"    },
      /*{ "label": "Our Strengths",               "anchor": "strengths" },
      { "label": "Quality",                     "anchor": "quality"   }*/
    ],

    /* Main article — add/remove/reorder blocks freely */
    "sections": [
      { "id": "about",           "type": "heading1",  "text": "About Us" },
      { "id": null,              "type": "paragraph", "text": "HelpNexus is a results-driven Business Process Outsourcing (BPO) company dedicated to helping businesses streamline operations and scale efficiently. We specialize in data entry, data annotation, back-office support, customer support, and process management solutions tailored to modern business needs. \n At HelpNexus, we don’t just handle processes — we optimize them. \n Our team is trained to deliver accuracy, speed, and consistency while maintaining strict quality control standards. At HelpNexus, we focus on reducing operational burdens so our clients can concentrate on growth and innovation. \n We believe in long-term partnerships built on transparency, performance, and trust. Your growth is our priority." },
      { "id": "vision",          "type": "heading2",  "text": "Our Vision & Mission" },
      { "id": null,              "type": "paragraph", "text": "<strong>Vision:</strong> To become a globally recognized and trusted outsourcing partner, delivering excellence in business process management through innovation, operational discipline, and unwavering commitment to quality. \n We envision HelpNexus as a strategic extension of our clients’ organizations — enabling businesses across industries to scale faster, operate smarter, and compete confidently in an increasingly digital and data-driven world. \n Our long-term vision is to build a sustainable, technology-enabled BPO ecosystem that combines skilled human expertise with intelligent process systems to create measurable impact for every client we serve. \n " },
      { "id": null,              "type": "paragraph", "text": "<strong>Mission:</strong> At HelpNexus, our mission is to deliver reliable, accurate, and scalable outsourcing solutions that reduce operational burdens and improve overall business efficiency. \n We are committed to maintaining the highest standards of data security, quality assurance, and process transparency across every project. Through continuous training, structured workflows, and performance monitoring, we ensure consistency and precision in every task we undertake. \n Our mission is also to build strong, long-term partnerships by understanding our clients’ unique needs and delivering customized solutions that drive growth, cost optimization, and operational stability. \n At the same time, we strive to create a professional work environment that nurtures skill development, accountability, and leadership — empowering our team to consistently exceed client expectations." },
      { "id": "expect",          "type": "heading2",  "text": "What Can You Expect From Us?" },
      { "id": null,              "type": "paragraph", "text": "List what clients can expect when working with you:" },
      { "id": null,              "type": "bulletList","items": [
          "<b>Accuracy & Attention to Detail</b> - We understand that even small errors can create big problems. Our team follows structured workflows and strict quality checks to ensure every task is completed with precision and consistency.",
          "<strong>Timely Delivery</strong> - Deadlines matter. We plan, track, and execute projects with disciplined turnaround schedules so you receive your deliverables on time — every time.",
          "<strong>Data Security & Confidentiality</strong> - Your business information is handled with the highest level of confidentiality. We implement controlled access systems and secure handling processes to protect sensitive data.",
          "<strong>Scalable Support</strong> - Whether you need support for a short-term project or long-term operations, HelpNexus can scale resources efficiently without compromising quality.",
          "<strong>Transparent Communication</strong> - Clear communication is the foundation of strong partnerships. You can expect regular updates, responsive support, and complete visibility into project progress.",
          "<strong>Continuous Improvement</strong> - We don’t just complete tasks — we refine processes. Through ongoing training and performance monitoring, we constantly improve efficiency and output quality. \n At HelpNexus, we operate as an extension of your team — focused on performance, accountability, and long-term value creation."
      ]},
      { "id": "strengths",       "type": "heading2",  "text": "Our Strengths" },
      { "id": null,              "type": "bulletList","items": [
          "<strong>Skilled & Trained Workforce:</strong> Our team consists of well-trained professionals who understand the importance of accuracy, consistency, and process discipline. Continuous training ensures that we stay aligned with industry standards and evolving client requirements.",
          "<strong>Strong Quality Control System:</strong> We follow structured workflows and multi-level quality checks to maintain high accuracy levels. Every project is monitored to ensure output meets defined performance benchmarks.",
          "<strong>Process-Driven Approach:</strong> At HelpNexus, we rely on clearly defined processes rather than guesswork. This ensures smooth execution, reduced errors, and predictable outcomes for our clients.",
          "<strong>Scalability & Flexibility:</strong> We are capable of scaling operations based on project size and urgency. Whether it’s a small assignment or a high-volume project, we adapt without compromising quality.",
          "<strong>Data Security & Confidentiality:</strong> We prioritize the protection of client information through controlled access systems and disciplined handling procedures, ensuring sensitive data remains secure at all times.",
          "<strong>Commitment to Deadlines:</strong> We understand that delays affect business operations. Our structured planning and execution model ensures projects are delivered within agreed timelines.",
          "<strong>Client-Centric Mindset:</strong> We treat every client partnership as long-term. Understanding your goals and challenges allows us to provide customized solutions that add real value."
      ]},
      /*{ "id": "expertise",       "type": "heading2",  "text": "Our Expertise" },
      { "id": null,              "type": "paragraph", "text": "At HelpNexus, we specialize in delivering reliable and process-driven outsourcing solutions that help businesses operate efficiently and scale with confidence. Our expertise spans multiple operational domains, supported by structured workflows and strict quality control systems." },
      { "id": "quality",         "type": "heading2",  "text": "Quality" },
      { "id": null,              "type": "paragraph", "text": "At HelpNexus, quality is not an afterthought — it is the foundation of our operations. Every project we undertake is executed through structured workflows, defined performance benchmarks, and multi-level quality checks to ensure accuracy and consistency. \nWe follow a systematic approach that includes task validation, cross-verification, and continuous monitoring to minimize errors and maintain high precision levels. Our team is trained to adhere strictly to client guidelines, ensuring outputs align perfectly with expectations.\n" },
      { "id": null,              "type": "paragraph", "text": "Quality control is embedded at every stage of the process — from initial task execution to final delivery. We analyze performance metrics, identify improvement areas, and implement corrective measures to maintain consistent standards across all projects. \nWe believe that reliable outsourcing is built on discipline, accountability, and measurable results. That is why we focus on continuous training, process refinement, and performance tracking to deliver dependable outcomes every time.\nAt HelpNexus, quality is not a promise — it is a standard.\n" },
      { "id": "confidentiality", "type": "heading2",  "text": "Confidentiality and Privacy" },
      { "id": null,              "type": "paragraph", "text": "At HelpNexus, we understand that client data is highly sensitive and must be handled with the utmost responsibility. Protecting confidentiality and maintaining privacy are core principles embedded into our operational framework. \nWe implement strict access control measures to ensure that information is only accessible to authorized personnel directly assigned to a project. All data is handled through secure systems and structured protocols designed to prevent unauthorized access, misuse, or data leakage. \n Our team members are trained to follow confidentiality guidelines and adhere to disciplined data-handling procedures at all times. We emphasize accountability, ethical conduct, and secure workflow practices across every level of the organization. \n We are committed to maintaining transparency, compliance, and data integrity while delivering outsourcing services. Safeguarding client information is not just a requirement — it is a responsibility we take seriously in every engagement." },
      */{ "id": "closing",         "type": "heading2",  "text": "Ready to Get Started?" },
      { "id": null,              "type": "paragraph", "text": "Partner with HelpNexus and experience reliable, structured, and scalable outsourcing solutions designed to support your business growth. \nWhether you need precise data processing, professional back-office support, or dedicated project handling, our team is ready to deliver accuracy, efficiency, and measurable results.\nLet us simplify your operations so you can focus on strategy, expansion, and innovation.\nContact us today to discuss your requirements and discover how HelpNexus can become your trusted outsourcing partner." }
    ]
  },

  /* ── Right-side quick quote box (About page) */
  "quoteBox": {
    "heading": "Schedule a FREE CALL!",
    "subtext": "Gather information to help you decide if our services will work for you.",
    "noteLines": [
      "Use your business email for priority, faster, and tailored response!",
      "Have specific requirements? Email us at:"
    ],
    "contactRows": [
      { "icon": "📞", "text": _phone,   "href": "tel:"    + _phone },
      { "icon": "✉",  "text": _email,   "href": "mailto:" + _email },
      { "icon": "WHATSAPP", "text": "+91 7676547429", "href": "https://wa.me/917676547429" },
      { "icon": "📍", "text": _address, "href": null }
    ]
  },

  /* ── Contact page */
  "contactPage": {
    "heading":        "Get in Touch With Us",
    "intro":          "Have a question or ready to outsource? Fill in the form below and one of our experts will get back to you within 24 hours. We're here to help you make the right decision.",
    "successMessage": "✅ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
    "errorMessage":   "Something went wrong — please try again or email us directly.",

    "sidebar": {
      "contactInfo": {
        "title": "📬 Contact Information",
        "rows": [
          { "icon": "📞", "label": "Phone",         "text": _phone,   "href": "tel:"    + _phone },
          { "icon": "✉",  "label": "Email Us",      "text": _email,   "href": "mailto:" + _email },
          { "icon": "WHATSAPP", "label": "WhatsApp",       "text": "+91 7676547429", "href": "https://wa.me/917676547429" },
          { "icon": "⏰", "label": "Business Hours","text": _hours,   "href": null }
        ]
      },
      "offices": {
        "title": "🌍 Our Global Offices",
        "cards": [
          {
            "flag":  "🇮🇳",
            "name":  "India",
            "lines": [_address],
            "email": _email
          }
        ]
      }
    }
  },

  /* ── Footer */
  "footer": {
    "tagline": "Enhancing your business",
    "quickLinks": [
      { "label": "About Us",     "href": "#" },
      { "label": "How We Work",  "href": "#" },
      { "label": "Case Studies", "href": "#" },
      { "label": "Testimonials", "href": "#" },
      { "label": "Careers",      "href": "#" }
    ],
    "bottomText": _copy
  }

};
