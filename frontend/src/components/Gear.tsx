export default function Gear() {
  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh" }}>
      <section id="gear" className="section fade-in visible">
        <h2>My Gear</h2>
        <p style={{ textAlign: "center", color: "var(--color-text-secondary)", marginBottom: "3rem" }}>
          The hardware and tools I use daily for work, gaming, and productivity.
        </p>
        <div className="gear-grid">
          <div className="glass-card gear-card">
            <img src="/victus_laptop_1783963035618.png" alt="Victus Laptop" className="gear-img" />
            <div className="gear-info">
              <h3>Victus by HP 15</h3>
              <p>Gaming Laptop (15-fa1xxx) powered by an RTX 4050. My primary machine for coding and design.</p>
              <span className="gear-tag">Computer</span>
            </div>
          </div>

          <div className="glass-card gear-card">
            <img src="/odyssey_monitor_1783963045142.png" alt="Samsung Odyssey G4" className="gear-img" />
            <div className="gear-info">
              <h3>Samsung Odyssey G4</h3>
              <p>High refresh rate gaming monitor for a seamless and responsive workflow.</p>
              <span className="gear-tag">Display</span>
            </div>
          </div>

          <div className="glass-card gear-card">
            <img src="/rk_keyboard_1783963053964.png" alt="Royal Kludge RKM75" className="gear-img" />
            <div className="gear-info">
              <h3>Royal Kludge RKM75</h3>
              <p>Custom mechanical keyboard offering satisfying tactile feedback and compact layout.</p>
              <span className="gear-tag">Peripheral</span>
            </div>
          </div>

          <div className="glass-card gear-card">
            <img src="/xve_mouse_1783963061696.png" alt="XVE R1 Mouse" className="gear-img" />
            <div className="gear-info">
              <h3>XVE R1</h3>
              <p>Precision wireless mouse built for comfort, perfect for navigating UI interfaces.</p>
              <span className="gear-tag">Peripheral</span>
            </div>
          </div>

          <div className="glass-card gear-card">
            <img src="/angled_white_desk_1783963339019.png" alt="Minimalist Setup" className="gear-img" />
            <div className="gear-info">
              <h3>Minimalist Setup</h3>
              <p>Aesthetic clean white desk paired with a transparent acrylic chair for a bright, modern vibe.</p>
              <span className="gear-tag">Environment</span>
            </div>
          </div>

          <div className="glass-card gear-card">
            <img src="/iphone_15_1783963079563.png" alt="iPhone 15 Pro Max" className="gear-img" />
            <div className="gear-info">
              <h3>iPhone 15 Pro Max</h3>
              <p>Daily driver for on-the-go management, communication, and testing mobile responsiveness.</p>
              <span className="gear-tag">Mobile</span>
            </div>
          </div>

          <div className="glass-card gear-card">
            <img src="/huawei_band_1783963088768.png" alt="Huawei Band 11 Pro" className="gear-img" />
            <div className="gear-info">
              <h3>Huawei Band 11 Pro</h3>
              <p>Fitness tracking, notifications, and productivity management on the wrist.</p>
              <span className="gear-tag">Wearable</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
