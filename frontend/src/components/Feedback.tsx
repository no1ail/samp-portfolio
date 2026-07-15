export default function Feedback() {
  return (
    <section id="feedback" className="section fade-in visible">
      <h2>Feedback</h2>
      <div className="feedback-grid">
        <div className="glass-card feedback-item">
          <i className="fas fa-quote-left quote-icon"></i>
          <p>
            "Islam is a highly dedicated professional. His attention to detail and ability to quickly grasp complex front-end concepts made him an invaluable asset to our team."
          </p>
          <div className="feedback-author">
            <h4>Wilmar A.</h4>
            <span>Head of Operation, Savvy Pet</span>
          </div>
        </div>
        <div className="glass-card feedback-item">
          <i className="fas fa-quote-left quote-icon"></i>
          <p>
            "Working with Islam was a great experience. He provided excellent customer support and always went the extra mile to ensure our clients were satisfied. His technical skills and problem-solving abilities are top-notch."
          </p>
          <div className="feedback-author">
            <h4>Justin P.</h4>
            <span>Support, Dish Network</span>
          </div>
        </div>
      </div>
    </section>
  );
}
