// ================================================================
// TESTIMONIALS PAGE  -  edit the testimonials array below
// ================================================================
function TestimonialsPage() {
  const testimonials = [
    /*{ stars: 5, author: "James R.",  role: "CEO, MedBill Solutions USA",
      quote: "HelpNexus took over our medical billing within days. The accuracy is outstanding and we have cut our overhead significantly." },
    { stars: 5, author: "Claire D.", role: "Project Manager, Becker Engineering UK",
      quote: "The CAD team is excellent. They understood our drawings from the first batch. Turnaround is fast and quality rivals our in-house staff." },
    { stars: 5, author: "Rohit S.",  role: "Operations Head, ShopNow India",
      quote: "We needed 3,000 product photos edited overnight. They delivered perfectly within budget. We now use them for all our image work." },
    { stars: 5, author: "Sarah M.",  role: "Founder, Nexly SaaS",
      quote: "Their virtual assistant team handles our queries better than expected. Warm, professional, and always on time." },
    { stars: 5, author: "Tom B.",    role: "Data Manager, FinTrack Ltd",
      quote: "Very responsive team. They flagged a data issue before we even noticed. That kind of ownership is rare in outsourcing." },
    { stars: 5, author: "Meera P.", role: "VP Operations, Globalink Corp",
      quote: "Working with HelpNexus for over a year. Consistent quality, zero surprises, and a team that genuinely cares about your success." },
  */];
  return (
    <div className="page-enter">
      <div className="section-heading-row"><h2>TESTIMONIALS</h2></div>
      <div className="simple-page-wrap">
        <h1>What Our Clients Say</h1>
        <p>Here is what businesses around the world say about working with HelpNexus.</p>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="stars">{"\u2605".repeat(t.stars)}</div>
              <div className="quote">"{t.quote}"</div>
              <div className="author">{t.author}</div>
              <div className="role">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
