// ================================================================
// OUR TEAM PAGE  -  edit the team array to update members
// ================================================================
function ManagementPage() {
  const team = [
    //{ initials: "MD", name: "Meghana D.",  role: "Director"              },
    //{ initials: "PR", name: "PusphaLatha R.", role: "Director"           },
  ];
  return (
    <div className="page-enter">
      <div className="section-heading-row"><h2>OUR TEAM</h2></div>
      <div className="simple-page-wrap">
        <h1>Meet Our Leadership</h1>
        <p>HelpNexus is led by an experienced team with deep expertise across BPO, engineering, healthcare, and
          creative services. Our leadership is hands-on, directly involved in quality oversight and client
          partnerships.</p>
        <p>At HelpNexus, our strength lies in our people. Our team is composed of dedicated, detail-oriented, and
           professionally trained individuals who understand the responsibility that comes with handling 
           critical business processes. \nEach team member undergoes structured training to ensure accuracy, 
           efficiency, and adherence to defined workflows. We emphasize discipline, accountability, and continuous 
           learning to maintain consistent performance across all projects. \n Our leadership team brings operational insight 
           and hands-on management experience, ensuring that every project is supervised, monitored, and executed with precision. 
           Clear communication, collaboration, and problem-solving are core principles within our team culture.\n 
           We believe that a strong, motivated workforce is the foundation of reliable outsourcing. 
           That’s why we invest in skill development, performance evaluation, and quality improvement initiatives to 
           ensure our clients receive dependable and scalable support.\n At HelpNexus, we don’t just complete tasks — we take ownership of results.</p>
        <div className="team-grid">
          {team.map((member, i) => (
            <div className="team-card" key={i}>
              <div className="team-avatar">{member.initials}</div>
              <div className="t-name">{member.name}</div>
              <div className="t-role">{member.role}</div>
            </div>
          ))}
        </div>
        <div className="placeholder-card" style={{ marginTop: 40 }}>
          <div className="ph-icon">&#128247;</div>
          <p>Full bios and photos coming soon. Contact us to learn more about our team.</p>
        </div>
      </div>
    </div>
  );
}
