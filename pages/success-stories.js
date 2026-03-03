// ================================================================
// SUCCESS STORIES PAGE  -  edit the stories array to update cases
// ================================================================
function StoriesPage({ onGoContact }) {
  const stories = [
    {
      title: "US Healthcare Billing - 40% Cost Reduction",
      body:  "A mid-sized medical billing firm struggling with backlogs handed their coding and eligibility verification to HelpNexus. Within 3 months, error rates dropped and throughput doubled.",
      stat:  "40% cost saving",
    },
    {
      title: "UK Engineering Firm - CAD Backlog Cleared in 2 Weeks",
      body:  "A structural engineering consultancy with 200 overdue CAD drawings deployed our 6-person drafting team. The backlog was cleared in 14 days with zero revision requests.",
      stat:  "200 drawings in 14 days",
    },
    {
      title: "Ecommerce Retailer - 5,000 Images in 48 Hours",
      body:  "An online fashion retailer needed background removal and colour correction on 5,000 product images before a major sale launch. Delivered on time and within budget.",
      stat:  "5,000 images in 48 hours",
    },
    {
      title: "SaaS Startup - Customer Support Scaled 3x",
      body:  "A fast-growing SaaS company needed to scale support without hiring in-house. Our virtual team handled 3x the ticket volume with a 94% customer satisfaction score.",
      stat:  "94% CSAT score",
    },
  ];
  return (
    <div className="page-enter">
      <div className="section-heading-row"><h2>SUCCESS STORIES</h2></div>
      <div className="simple-page-wrap">
        <h1>Real Results for Real Clients</h1>
        <p>A few examples of how HelpNexus has helped businesses reduce costs, hit deadlines, and scale operations.
          Details are anonymised to protect client confidentiality.</p>
        {stories.map((story, i) => (
          <div className="story-card" key={i}>
            <h3>{story.title}</h3>
            <p>{story.body}</p>
            <span className="story-stat">&#128200; {story.stat}</span>
          </div>
        ))}
        <div className="cta-wrap" style={{ marginTop: 36 }}>
          <button className="contact-btn-react" onClick={onGoContact}>Start Your Success Story</button>
        </div>
      </div>
    </div>
  );
}
