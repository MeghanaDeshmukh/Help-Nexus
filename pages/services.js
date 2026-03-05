// ================================================================
// SERVICES PAGE
// Driven entirely by data/services.js — no edits needed here.
// ================================================================

function ServicesPage({ onGoContact, activeSection }) {
  var SERVICES = window.SERVICES_DATA;

  var ACCENT_COLORS = [
    "#1a6fa3",
    "#f5a100",
    "#2eaa6e",
    "#9b59b6",
    "#e74c3c",
    "#16a085",
    "#d35400",
    "#2980b9",
    "#8e44ad",
    "#27ae60",
  ];

  React.useEffect(function() {
    if (activeSection) {
      var el = document.getElementById("svc-" + activeSection);
      if (el) setTimeout(function() { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 80);
    }
  }, [activeSection]);

  return (
    React.createElement("div", { className: "page-enter" },
      React.createElement("div", { className: "section-heading-row" },
        React.createElement("h2", null, "OUR SERVICES")
      ),

      // Jump links
      React.createElement("div", { className: "svc-page-jumps" },
        SERVICES.map(function(svc, idx) {
          var color = ACCENT_COLORS[idx % ACCENT_COLORS.length];
          return React.createElement("a", {
            key: svc.id,
            href: "#svc-" + svc.id,
            className: "svc-jump-link",
            style: {
              background: color + "15",
              border: "1px solid " + color + "44",
              color: color,
            }
          }, "\u2726 " + svc.label.replace("\n", " "));
        })
      ),

      // Service sections
      React.createElement("div", { className: "svc-page-wrap" },
        SERVICES.map(function(svc, idx) {
          var parts = svc.label.split("\n");
          var line1 = parts[0];
          var line2 = parts[1] || "";
          var hasAnyDesc = svc.subServices.some(function(s) {
            return typeof s === "object" && s.description;
          });
          var color = ACCENT_COLORS[idx % ACCENT_COLORS.length];
          var colorLight = color + "18";
          var colorBorder = color + "44";

          return React.createElement("section", {
            key: svc.id,
            id: "svc-" + svc.id,
            className: "svc-section"
          },

            // Header
            React.createElement("div", { className: "svc-section-header" },
              React.createElement("h2", {
                className: "svc-section-title",
                style: { color: color }
              }, line1 + (line2 ? " " + line2 : "")),
              React.createElement("p", { className: "svc-section-sub" },
                "Professional outsourcing solutions tailored to your business needs."
              )
            ),

            // Sub-services
            React.createElement("div", {
              className: hasAnyDesc
                ? "svc-sub-list svc-sub-list--cards"
                : "svc-sub-list svc-sub-list--pills"
            },
              svc.subServices.map(function(sub, i) {
                var name = typeof sub === "object" ? sub.name : sub;
                var desc = typeof sub === "object" ? sub.description : "";

                return hasAnyDesc
                  ? React.createElement("div", {
                      key: i,
                      className: "svc-sub-item",
                      style: {
                        background: "#fff",
                        border: "1px solid " + colorBorder,
                        borderLeft: "4px solid " + color,
                        borderRadius: "10px",
                        padding: "18px 20px",
                        boxShadow: "0 2px 8px " + colorLight,
                      }
                    },
                    React.createElement("div", {
                      className: "svc-sub-name",
                      style: {
                        fontSize: 14,
                        fontWeight: 700,
                        color: color,
                        marginBottom: desc ? 8 : 0,
                      }
                    }, "\u2726 " + name),
                    desc
                      ? React.createElement("p", {
                          className: "svc-sub-desc",
                          style: { fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }
                        }, desc)
                      : null
                  )
                  : React.createElement("div", {
                      key: i,
                      style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#fff",
                        border: "1px solid " + colorBorder,
                        borderLeft: "4px solid " + color,
                        borderRadius: "8px",
                        padding: "12px 18px",
                        fontSize: 13,
                        fontWeight: 700,
                        color: color,
                        boxShadow: "0 2px 8px " + colorLight,
                        whiteSpace: "nowrap",
                      }
                    }, "\u2726 " + name);
              })
            ),

            // CTA
            React.createElement("div", { className: "svc-section-cta" },
              React.createElement("button", {
                className: "contact-btn-react",
                onClick: onGoContact
              }, "Enquire About This Service")
            )
          );
        })
      )
    )
  );
}