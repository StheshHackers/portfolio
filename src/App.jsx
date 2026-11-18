import { useEffect, useState } from "react";

const projects = [
  {
    title: "StheshHackers",
    type: "Security platform",
    description: "A web-based penetration testing utility for infrastructure auditing, vulnerability discovery, and security workflow automation.",
    link: "https://stheshhackers.github.io/soossnsn/",
    icon: "shield",
  },
  {
    title: "StheshBot AI",
    type: "AI assistant",
    description: "An intelligent conversational interface designed around fast responses, practical workflows, and real-time assistance.",
    link: "https://stheshbot.vercel.app",
    icon: "cpu",
  },
  {
    title: "Sthesh Weather",
    type: "Data platform",
    description: "A responsive weather dashboard delivering local forecasts and clear visual insights through live API data.",
    link: "https://stheshweather.netlify.app",
    icon: "cloud",
  },
  {
    title: "Sthesh Countdown",
    type: "Utility",
    description: "A focused deadline and event countdown utility for tracking important dates and security milestones.",
    link: "https://stheshcountdown.netlify.app",
    icon: "timer",
  },
];

const certificates = [
  { title: "Ethical Hacker", issuer: "Cisco Networking Academy", icon: "crosshair", accent: "cyan" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", icon: "lock", accent: "blue" },
  { title: "C++ Essentials 1", issuer: "Cisco Networking Academy", icon: "code", accent: "purple" },
  { title: "Python Essentials 2", issuer: "Cisco Networking Academy", icon: "python", accent: "yellow" },
  { title: "Python Essentials 1", issuer: "Cisco Networking Academy", icon: "terminal", accent: "green" },
  { title: "Python Developer", issuer: "freeCodeCamp", icon: "rocket", accent: "orange" },
];

const skills = [
  "JavaScript", "React", "Python", "FastAPI", "Django", "HTML & CSS",
  "Cybersecurity", "Kali Linux", "Penetration Testing", "OWASP", "Bash", "Metasploit",
];

function Icon({ name, size = 20 }) {
  const paths = {
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-4",
    cpu: "M9 3h6v3H9zM9 18h6v3H9zM3 9h3v6H3zM18 9h3v6h-3zM8 8h8v8H8zM12 11v2",
    cloud: "M17.5 19H6a4 4 0 1 1 1-7.9A6 6 0 0 1 18.7 13 3 3 0 0 1 17.5 19Z",
    timer: "M10 2h4M12 6v6l4 2 M6 3l2 2 M18 3l-2 2M20 13a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
    crosshair: "M12 2v3M12 19v3M2 12h3M19 12h3M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM12 9v6M9 12h6",
    lock: "M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5zM12 14v3",
    code: "m8 9-4 3 4 3M16 9l4 3-4 3M14 6l-4 12",
    python: "M12 3c-5 0-5 2-5 4v2h5v1H5c-3 0-3 7 0 7h2v-3c0-3 3-3 5-3s5 0 5-3V7c0-3-2-4-5-4ZM9 6h1M12 21c5 0 5-2 5-4v-2h-5v-1h7c3 0 3-7 0-7h-2v3c0 3-3 3-5 3s-5 0-5 3v2c0 3 2 3 5 3ZM15 18h-1",
    terminal: "M4 5h16v14H4zM7 9l3 3-3 3M12 15h5",
    rocket: "M14 4c3-2 6-1 6-1s1 3-1 6l-7 7-5-5 7-7ZM7 11H3l3-3h5M13 17v4l3-3v-5M4 20c2-5 5-5 5-5",
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] || paths.code} />
    </svg>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello — I’m StheshBot. Ask about my skills, certifications, projects, or contact details." },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setChatOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const sendMessage = (event) => {
    event?.prevent
  };

  const handleSend = () => {
    const value = chatInput.trim();
    if (!value) return;

    const lower = value.toLowerCase();
    let reply = "I can help with skills, projects, certifications, or contact information. Try asking about Python, cybersecurity, or my portfolio.";
    if (lower.includes("skill") || lower.includes("stack") || lower.includes("python") || lower.includes("react")) {
      reply = "Athabile works with React, JavaScript, Python, FastAPI, Django, Kali Linux, OWASP, penetration testing, Bash, and networking security tools.";
    } else if (lower.includes("project") || lower.includes("work")) {
      reply = "Featured projects include StheshHackers, StheshBot AI, Sthesh Weather, and Sthesh Countdown. See the Projects section for links.";
    } else if (lower.includes("certificate") || lower.includes("certif")) {
      reply = "Athabile holds Cisco certifications in Ethical Hacking, Cybersecurity, C++ and Python, plus the freeCodeCamp Python Developer certification.";
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("hire")) {
      reply = "Contact Athabile at dinilangaathabile@gmail.com or call/WhatsApp +27 66 085 1108.";
    }

    setMessages((current) => [...current, { from: "user", text: value }, { from: "bot", text: reply }]);
    setChatInput("");
  };

  const filters = ["All", "Security", "Development"];

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="Athabile Dinilanga home">
            <span className="brand-mark">AD</span>
            <span>Athabile <strong>Dinilanga</strong></span>
          </a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#certifications" onClick={() => setMenuOpen(false)}>Credentials</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>

          <div className="nav-actions">
            <button className="theme-button" type="button" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle colour theme">
              {darkMode ? "☀" : "☾"}
            </button>
            <a className="nav-cta" href="mailto:dinilangaathabile@gmail.com">Let’s talk</a>
            <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation">
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero container" id="home">
          <div className="hero-copy">
            <div className="status-pill"><span /> Available for freelance work</div>
            <p className="eyebrow">Cybersecurity · Full-stack development</p>
            <h1>I build secure digital experiences that <em>perform.</em></h1>
            <p className="hero-lede">Junior penetration tester and developer creating resilient web applications, practical security tools, and reliable API-driven platforms.</p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">Explore my work <span>↗</span></a>
              <a className="button secondary" href="mailto:dinilangaathabile@gmail.com">Get in touch</a>
            </div>
            <div className="hero-metrics">
              <div><strong>6</strong><span>Verified credentials</span></div>
              <div><strong>4</strong><span>Live deployments</span></div>
              <div><strong>100%</strong><span>Security mindset</span></div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Security analyst profile illustration">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="profile-card">
              <div className="profile-grid">
                <span>SYS</span><span>2026</span>
              </div>
              <div className="profile-icon"><Icon name="shield" size={72} /></div>
              <div>
                <span className="profile-label">PROFILE</span>
                <h2>Athabile<br />Dinilanga</h2>
              </div>
              <div className="profile-status"><span /> System secure</div>
            </div>
          </div>
        </section>

        <section className="marquee" aria-label="Professional disciplines">
          <div>
            {["CYBERSECURITY", "FULL-STACK DEVELOPMENT", "PENETRATION TESTING", "API ENGINEERING", "DATABASES", "SECURE CODE"].map((item) => (
              <span key={item}>{item}<b>✦</b></span>
            ))}
          </div>
        </section>

        <section className="section container" id="about">
          <div className="section-heading">
            <p className="eyebrow">01 / About</p>
            <h2>The mind behind the code.</h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p className="lead">I bridge the gap between creative front-end experiences and resilient back-end security.</p>
              <p>I’m fascinated by how systems work—and how they fail. As a junior pentester, I think like an attacker to build like a defender. Whether I’m debugging a React component or analysing a network, my standard is always the same: clear, useful, and dependable work.</p>
              <a className="text-link" href="mailto:dinilangaathabile@gmail.com">Start a conversation <span>→</span></a>
            </div>
            <div className="skills-panel">
              <div className="panel-header"><span>Technical arsenal</span><b>12 tools</b></div>
              <div className="skills-grid">
                {skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="container">
            <div className="section-heading row-heading">
              <div>
                <p className="eyebrow">02 / Selected work</p>
                <h2>Production deployments.</h2>
              </div>
              <div className="filters" aria-label="Project filters">
                {filters.map((filter) => (
                  <button className={activeFilter === filter ? "active" : ""} type="button" key={filter} onClick={() => setActiveFilter(filter)}>{filter}</button>
                ))}
              </div>
            </div>

            <div className="project-grid">
              {projects.map((project, index) => {
                const category = index === 0 || index === 2 ? "Security" : "Development";
                if (activeFilter !== "All" && activeFilter !== category) return null;
                return (
                  <article className="project-card" key={project.title}>
                    <div className="project-top"><span>0{index + 1}</span><span>{project.type}</span></div>
                    <div className="project-icon"><Icon name={project.icon} size={38} /></div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}><span>View project</span><b>↗</b></a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section container" id="certifications">
          <div className="section-heading">
            <p className="eyebrow">03 / Credentials</p>
            <h2>Built on verified knowledge.</h2>
          </div>
          <div className="certificate-grid">
            {certificates.map((certificate) => (
              <article className="certificate-card" key={certificate.title}>
                <div className={`certificate-icon ${certificate.accent}`}><Icon name={certificate.icon} size={28} /></div>
                <div>
                  <p>{certificate.issuer}</p>
                  <h3>{certificate.title}</h3>
                </div>
                <span className="verified">✓ Verified</span>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-inner">
            <p className="eyebrow">04 / Contact</p>
            <h2>Have a project in mind?<br /><em>Let’s make it secure.</em></h2>
            <div className="contact-actions">
              <a className="button primary" href="mailto:dinilangaathabile@gmail.com">dinilangaathabile@gmail.com</a>
              <a className="button secondary" href="https://za.linkedin.com/in/athabile-dinilanga-744309377" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <a className="brand footer-brand" href="#home"><span className="brand-mark">AD</span><span>Athabile <strong>Dinilanga</strong></span></a>
          <p>© 2026 Athabile Dinilanga. Built with intention.</p>
          <div className="footer-links">
            <a href="https://github.com/stheshana07" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://za.linkedin.com/in/athabile-dinilanga-744309377" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:dinilangaathabile@gmail.com">Email</a>
          </div>
        </div>
      </footer>

      <button className={`chat-toggle ${chatOpen ? "active" : ""}`} type="button" onClick={() => setChatOpen((value) => !value)} aria-expanded={chatOpen}>
        {chatOpen ? "×" : <><Icon name="cpu" size={18} /> <span>Ask StheshBot</span></>}
      </button>

      {chatOpen && (
        <aside className="chat-widget" aria-label="StheshBot chat">
          <header><div><span className="chat-avatar"><Icon name="shield" size={16} /></span><div><strong>StheshBot</strong><small><i /> Online</small></div></div></header>
          <div className="chat-messages">
            {messages.map((message, index) => <p className={message.from} key={`${message.text}-${index}`}>{message.text}</p>)}
          </div>
          <div className="chat-compose">
            <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleSend()} placeholder="Ask me something…" aria-label="Chat message" />
            <button type="button" onClick={handleSend} aria-label="Send message">↑</button>
          </div>
        </aside>
      )}
    </div>
  );
}
