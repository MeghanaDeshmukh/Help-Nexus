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
const _slogan  = "Striving to enhance your business";
const _email   = "contact@help-nexus.com";
const _phone   = "0000000000";
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
      { "label": "Customers",       "anchor": "customers" },
      { "label": "How We Work",     "anchor": "s1"        },
      { "label": "Management Team", "anchor": "s2"        },
      { "label": "Success Stories", "anchor": "strengths" },
      { "label": "Testimonials",    "anchor": "team"      }
    ],

    "tocLinks": [
      { "label": "Our Goal",                    "anchor": "vision"    },
      { "label": "What Can You Expect From Us?","anchor": "expect"    },
      { "label": "Our Strengths",               "anchor": "strengths" },
      { "label": "Our Team",                    "anchor": "team"      },
      { "label": "Quality",                     "anchor": "quality"   }
    ],

    /* Main article — add/remove/reorder blocks freely */
    "sections": [
      { "id": "about",           "type": "heading1",  "text": "About Your Company" },
      { "id": null,              "type": "paragraph", "text": "Your company introduction goes here. Replace this placeholder text with your own content describing your company, its history, mission, and values." },
      { "id": "customers",       "type": "paragraph", "text": "Add more paragraphs here as needed. This area is for your main descriptive content about who you are and what you do." },
      { "id": "s1",              "type": "heading2",  "text": "Section Heading One" },
      { "id": null,              "type": "paragraph", "text": "Write your section content here. Describe the origins of your company, key milestones, or any relevant history." },
      { "id": null,              "type": "paragraph", "text": "Continue with more details in this paragraph. Add as much content as you need to explain this section fully." },
      { "id": "s2",              "type": "heading2",  "text": "Section Heading Two" },
      { "id": null,              "type": "paragraph", "text": "Your content for this section goes here. Describe your growth, expansion, or any key developments relevant to your audience." },
      { "id": "vision",          "type": "heading2",  "text": "Our Vision & Mission" },
      { "id": null,              "type": "paragraph", "text": "<strong>Vision:</strong> Write your company vision statement here." },
      { "id": null,              "type": "paragraph", "text": "<strong>Mission:</strong> Write your company mission statement here. Describe the core purpose of your organization and what you aim to deliver to your clients." },
      { "id": "expect",          "type": "heading2",  "text": "What Can You Expect From Us?" },
      { "id": null,              "type": "paragraph", "text": "List what clients can expect when working with you:" },
      { "id": null,              "type": "bulletList","items": [
          "Benefit or service point one",
          "Benefit or service point two",
          "Benefit or service point three",
          "Benefit or service point four",
          "Benefit or service point five",
          "Benefit or service point six"
      ]},
      { "id": "strengths",       "type": "heading2",  "text": "Our Strengths" },
      { "id": null,              "type": "bulletList","items": [
          "Strength or differentiator one",
          "Strength or differentiator two",
          "Strength or differentiator three",
          "Strength or differentiator four",
          "Strength or differentiator five"
      ]},
      { "id": "team",            "type": "heading2",  "text": "Our Team" },
      { "id": null,              "type": "paragraph", "text": "Describe your team here. Mention the types of professionals, their expertise, and what makes your team exceptional." },
      { "id": "expertise",       "type": "heading2",  "text": "Our Expertise" },
      { "id": null,              "type": "paragraph", "text": "Detail your areas of expertise and your unique approach or methodology." },
      { "id": "quality",         "type": "heading2",  "text": "Quality" },
      { "id": null,              "type": "paragraph", "text": "Describe your quality standards and certifications here." },
      { "id": "security",        "type": "heading2",  "text": "Infrastructure and Security" },
      { "id": null,              "type": "paragraph", "text": "Describe your infrastructure capabilities and security measures." },
      { "id": "confidentiality", "type": "heading2",  "text": "Confidentiality and Privacy" },
      { "id": null,              "type": "paragraph", "text": "Explain how you protect client data and maintain confidentiality." },
      { "id": "closing",         "type": "heading2",  "text": "Your Key Message" },
      { "id": null,              "type": "paragraph", "text": "End with a strong closing message that reinforces your value proposition and invites the reader to get in touch." }
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
      { "icon": "💬", "text": "Live chat with us", "href": "#" },
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
          { "icon": "💬", "label": "Live Chat",     "text": "Start a live chat", "href": "#" },
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
    "tagline": _address,
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
