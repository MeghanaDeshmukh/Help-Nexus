function ManagementPage() {
  const team = [
    //{ initials: "MD", name: "Meghana D.",  role: "Director"              },
    //{ initials: "PR", name: "PusphaLatha R.", role: "Director"           },
  ];

  const leaders = [
    {
      initials: "PJ",
      role: "Co-founder & Operations Lead",
      accentColor: "#1a6fa3",
      bgColor: "#e8f4fd",          // bright, airy light blue
borderColor: "#7ab8e8",      // clear, vivid blue border
tagBg: "#c8e6f7",            // fresh, bright tag fill
      tagColor: "#0d4f7a",         // was #1a6fa3 — deeper tag text
      avatarBg: "linear-gradient(135deg, #1a6fa3, #2196c9)",
      icon: "⚙️",
      tags: ["Business Development", "BPO Operations", "Market Research", "Strategy"],
      bio: "15+ years across business development, R&D, and BPO service management. Combines analytical thinking with a Computer Science foundation to drive operational excellence at HelpNexus.",
    },
    {
      initials: "MD",
      role: "Co-founder & Technology Lead",
      accentColor: "#f5a100",
      bgColor: "#fff8ec",
      borderColor: "#f5d48a",
      tagBg: "#fdebc8",
      tagColor: "#b37400",
      avatarBg: "linear-gradient(135deg, #f5a100, #ffbc3b)",
      icon: "💻",
      tags: ["Software Engineering", "AI/ML", "Automation", "Data Science & Engineering", "Design & Analytics"],
      bio: "10+ years across Cisco, Amazon, Cognex & Utimaco. Specializes in secure system design, microservices, and data technologies — ensuring HelpNexus solutions are modern and scalable.",
    },
  ];

  return (
    <div className="page-enter">
      <div className="section-heading-row"><h2>OUR TEAM</h2></div>
      <div className="simple-page-wrap">
        <h1>What makes us different</h1>
        <p>HelpNexus is built on the combined strength of two seasoned professionals whose diverse
          backgrounds and complementary expertise form the backbone of everything we do. Together,
          we bring a well-rounded perspective to every client engagement — merging years of hands-on
          experience in managing and delivering BPO services with a deep command of modern technology.
          This powerful combination allows us to offer solutions that are not only operationally sound
          but also forward-thinking and tech-driven. At HelpNexus, our leadership doesn't just
          oversee — we are actively involved, ensuring that every project benefits from both our operational
          know-how and our ability to leverage the right technology to deliver results.</p>

        <p>Our team reflects that same commitment to excellence. Composed of dedicated, detail-oriented,
          and professionally trained individuals, every member of the HelpNexus team understands the
          responsibility that comes with handling critical business processes — and has the technical
          knowledge to execute them with precision. Each team member undergoes structured training that
          covers not only defined workflows and operational best practices, but also the tools and technologies
          that power modern business solutions. We foster a culture of discipline, accountability, and
          continuous learning — ensuring our team stays sharp, current, and ready to deliver at the highest level.
          Clear communication, collaboration, and tech-informed problem-solving are at the heart of how we work.
          We invest heavily in skill development, performance evaluation, and quality improvement so that our
          clients always receive support that is dependable, scalable, and built for the demands of today's
          fast-moving business environment. At HelpNexus, we don't just complete tasks — we take full ownership of results.</p>

        <div className="team-grid">
          {team.map((member, i) => (
            <div className="team-card" key={i}>
              <div className="team-avatar">{member.initials}</div>
              <div className="t-name">{member.name}</div>
              <div className="t-role">{member.role}</div>
            </div>
          ))}
        </div>

        {/* ── Leader Cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "28px",
          marginTop: 48,
        }}>
          {leaders.map((l, i) => (
            <div
              key={i}
              style={{
                background: l.bgColor,
                border: `1px solid ${l.borderColor}`,
                borderRadius: "16px",
                padding: "32px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Decorative top strip */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "5px",
                background: `linear-gradient(90deg, ${l.accentColor}, ${l.accentColor}88)`,
                borderRadius: "16px 16px 0 0",
              }} />

              {/* Avatar + Title Row */}
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: l.avatarBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#fff",
                  flexShrink: 0,
                  letterSpacing: 1,
                  boxShadow: `0 6px 18px ${l.accentColor}55`,
                }}>
                  {l.initials}
                </div>
                <div>
                  <div style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: l.accentColor,
                    fontWeight: 700,
                    marginBottom: 6,
                  }}>
                    {l.icon} Leadership
                  </div>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#1c2a3a",
                    lineHeight: 1.35,
                  }}>
                    {l.role}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{
                height: "1px",
                background: `linear-gradient(90deg, ${l.borderColor}, transparent)`,
                marginBottom: 18,
              }} />

              {/* Bio */}
              <p style={{
                fontSize: 14,
                lineHeight: 1.85,
                color: "#555",
                margin: "0 0 22px 0",
              }}>
                {l.bio}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {l.tags.map((tag, j) => (
                  <span key={j} style={{
                    fontSize: 12,
                    padding: "6px 14px",
                    borderRadius: "999px",
                    background: l.tagBg,
                    border: `1px solid ${l.borderColor}`,
                    color: l.tagColor,
                    fontWeight: 600,
                    letterSpacing: 0.2,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: "center",
          marginTop: 24,
          fontSize: 12.5,
          color: "#888",
          letterSpacing: "0.03em",
        }}>
          {/*Full profiles &amp; photos coming soon.{" "}*/}
          <a href="/contact" style={{ color: "#1a6fa3", fontWeight: 600 }}>
            Contact us
          </a>{" "}
          to learn more about our team.
        </p>

      </div>
    </div>
  );
}