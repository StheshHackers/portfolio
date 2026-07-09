import React, { useState, useEffect, useRef } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "<b>System:</b> Connection Secure. <br><br> Greetings. I am the StheshBot Security Interface. Please enter a command or type <b>'help'</b> for directory access." }
  ]);
  const [typewriterText, setTypewriterText] = useState("");

  // Cryptographic Utility State vars
  const [cryptoInput, setCryptoInput] = useState("");
  const [cryptoOutput, setCryptoOutput] = useState("");
  const [cryptoMode, setCryptoMode] = useState("base64-encode");

  // CTF Lab State
  const [ctfInput, setCtfInput] = useState("");
  const [ctfFeedback, setCtfFeedback] = useState({ text: "Status: System idling. Vulnerable query parameter found at ?admin=false. Attempt manipulation to access root account.", success: null });

  // Incident Log Feed Ticker State
  const [logs, setLogs] = useState([
    " [INFO] IDS Initialization sequence activated...",
    " [SUCCESS] Firewall rules synchronized natively on interface eth0."
  ]);
  const logContainerRef = useRef(null);

  const fullText = `Specializing in Resilient Web Applications and Advanced Security Analysis.\n\n"Every Developer's single line of code advances technology... as long as it does not contain bugs."\nBy Athabile Dinilanga`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  // Simulated live event logger feed generator
  useEffect(() => {
    const mockEvents = [
      " [WARN] Connection tracking buffer threshold reached at 84%.",
      " [BLOCKED] Recurrent brute-force threshold hit from source 192.168.1.104 on port 22.",
      " [AUDIT] Inbound parameters parsed successfully. Threat classification: 0.",
      " [BLOCKED] Host header manipulation payload dropped via rule engine 403.",
      " [INFO] Passive network assessment scanner discovered 0 active anomalies.",
      " [BLOCKED] Cross-Site Scripting (XSS) structural signature sanitized on /api/v2/chat."
    ];

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const selectedLog = mockEvents[Math.floor(Math.random() * mockEvents.length)];
      setLogs((prev) => [...prev.slice(-20), `[${timestamp}]${selectedLog}`]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Keep log feed scrolled to the bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const runCryptoProcess = () => {
    if (!cryptoInput) {
      setCryptoOutput("No target data provided.");
      return;
    }
    try {
      if (cryptoMode === "base64-encode") {
        setCryptoOutput(btoa(cryptoInput));
      } else if (cryptoMode === "base64-decode") {
        setCryptoOutput(atob(cryptoInput));
      } else if (cryptoMode === "hex-encode") {
        let hex = "";
        for (let i = 0; i < cryptoInput.length; i++) {
          hex += cryptoInput.charCodeAt(i).toString(16).toUpperCase() + " ";
        }
        setCryptoOutput(hex.trim());
      }
    } catch (err) {
      setCryptoOutput("Error processing string asset: Invalid matrix compilation.");
    }
  };

  const checkCtfSolution = () => {
    const cleanInput = ctfInput.trim().toLowerCase();
    if (cleanInput.includes("admin=true") || cleanInput === "?admin=true") {
      setCtfFeedback({
        text: "💥 FLAG REVEALED: STHESH{PARAM_POLLUTION_SUCCESS_2026} - Access granted. Privileges upgraded to Root Admin.",
        success: true
      });
    } else if (cleanInput.includes("union select") || cleanInput.includes("'")) {
      setCtfFeedback({
        text: "⚠️ Input flagged by local SQL schema constraints. Keep hunting for the parameter override payload instead!",
        success: false
      });
    } else {
      setCtfFeedback({
        text: "❌ Payload dropped. Environment state unaffected. Parameter evaluated to false.",
        success: false
      });
    }
  };

  const botResponses = {
    "help": "<b>Authorized Commands:</b><br>'status' - System check<br>'skills' - Technical armory<br>'skills' - Technical armory<br>'services' - Professional offerings<br>'education' - Academic background<br>'security' - Pentesting tools<br>'contact' - Communication channels",
    "status": "All systems operational. Firewall active. Current lead: Athabile Dinilanga.",
    "skills": "Primary stack: JavaScript, Python, Rust. Security: Kali Linux, OWASP auditing.",
    "services": "1. Full-stack Web Development<br>2. Penetration Testing<br>3. API Infrastructure Security.",
    "education": "Focused on Information Technology and Cybersecurity frameworks.",
    "security": "Please refer to the <b>StheshHackers</b> utility for auditing capabilities.",
    "contact": "For official inquiries: <b>dinilangaathabile@gmail.com</b>"
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim().toLowerCase();
    const newMessages = [...chatMessages, { sender: "user", text: chatInput }];
    setChatMessages(newMessages);
    setChatInput("");

    setTimeout(() => {
      let reply = "Invalid request. Please type <b>'help'</b> for the directory.";
      for (let key in botResponses) {
        if (userMsg.includes(key)) {
          reply = botResponses[key];
          break;
        }
      }
      setChatMessages((prev) => [...prev, { sender: "bot", text: `<b>StheshBot:</b> ${reply}` }]);
    }, 400);
  };

  return (
    <div>
      {/* Sidebar View */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <a href="#home" onClick={() => setSidebarOpen(false)}>Home</a>
        <a href="#about" onClick={() => setSidebarOpen(false)}>About</a>
        <a href="#certifications" onClick={() => setSidebarOpen(false)}>Certifications</a>
        <a href="#projects" onClick={() => setSidebarOpen(false)}>Projects</a>
        <a href="#toolkit" onClick={() => setSidebarOpen(false)}>Security Suite</a>
        <a href="#contact" onClick={() => setSidebarOpen(false)}>Contact</a>
      </div>

      {/* Navigation */}
      <nav>
        <div className="logo">ATHABILE <span>DINILANGA</span></div>
        
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#toolkit">Security Suite</a>
          <a href="#contact">Contact</a>
          <a href="mailto:dinilangaathabile@gmail.com" id="hireme" className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.8rem" }}>Hire Me</a>
        </div>

        {/* Action Container for Layout Consistency */}
        <div className="nav-controls">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="theme-toggle-btn"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          
          <div className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="badge">Cybersecurity Analyst & Developer</div>
        <h1>Securing the Future,<br />One Line at a Time.</h1>
        <p id="typewriter" style={{ whiteSpace: "pre-wrap" }}>{typewriterText}</p>
        <div style={{ display: "flex", gap: "15px" }}>
          <a href="#projects" className="btn-primary">View Portfolio</a>
          <a href="#contact" className="btn-secondary">Get in Touch</a>
        </div>
      </section>

      {/* Live Threat Incident Feed Ticker */}
      <div style={{ background: "#020617", color: "#10b981", fontFamily: "monospace", padding: "10px 5%", fontSize: "0.8rem", borderBottom: "2px solid #1e293b", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "20px", whiteSpace: "nowrap" }}>
          <span style={{ color: "#ef4444", fontWeight: "bold" }}>⚡ LIVE SEC-LOGS:</span>
          <div style={{ overflow: "hidden", display: "inline-block", width: "100%" }}>
            <span style={{ display: "inline-block" }}>{logs[logs.length - 1]}</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about">
        <div className="about-content">
          <div className="about-text">
            <h2>The Mind Behind the Code</h2>
            <p>My journey started with a fascination for how things work—and how they break. As a <b>Junior Pentester</b>, I think like an attacker to build like a defender. I bridge the gap between creative frontend design and rigorous backend security.</p>
            <p style={{ marginTop: "15px" }}>Whether I'm debugging a React component or running an Nmap scan, my goal is always the same: <b>Excellence</b>. I don't just write code; I craft digital fortresses.</p>
            
            <div style={{ marginTop: "30px" }}>
              <h4>Technical Armory:</h4>
              {["HTML5 / CSS3", "JavaScript (ES6+)", "Python", "Kali Linux", "Metasploit", "Penetration Testing", "Network Security", "Bash"].map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="about-visual">
            <i className="fas fa-shield-alt"></i>
            <h3 style={{ color: "var(--electric-blue)" }}>Certified Mindset</h3>
            <p style={{ fontSize: "0.9rem" }} className="about-subtitle">Focused on OWASP Top 10, Ethical Hacking, and building responsive, accessible web architecture.</p>
          </div>
        </div>
      </section>

      {/* Professional Certifications Section */}
      <section id="certifications" style={{ padding: "100px 10%", background: "var(--ghost-white)" }}>
        <h2 className="section-title">Verified Qualifications</h2>
        <p className="about-subtitle" style={{ textAlign: "center", marginTop: "-40px", marginBottom: "50px", fontSize: "0.95rem" }}>
          Official academic and industry credentials issued through the Cisco Networking Academy (NetAcad).
        </p>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
          {[
            { title: "Ethical Hacker", desc: "Advanced foundational concepts in penetration testing frameworks, footprinting, reconnaissance, and vulnerability assessment vectors.", icon: "fa-user-shield" },
            { title: "Introduction to Cybersecurity", desc: "Comprehensive overview of the global threat landscape, data privacy governance, cryptography paradigms, and infrastructure shielding.", icon: "fa-user-shield" },
            { title: "Introduction to Networking", desc: "In-depth architecture of routing and switching matrices, OSI/TCP-IP layers, IP addressing subnet logic, and network media operations.", icon: "fa-network-wired" },
            { title: "Python Essentials 2", desc: "Advanced object-oriented programming (OOP), packages, modules, string/list processing algorithms, exception handling hierarchies, and file I/O operations.", icon: "fa-code" },
            { title: "Python Essentials 1", desc: "Fundamental algorithmic design structures, variables, execution control flows, logical operators, data collections, and structural function matrices.", icon: "fa-terminal" }
          ].map((cert, index) => (
            <div 
              key={index} 
              style={{ 
                background: "var(--card-bg)", 
                padding: "30px", 
                borderRadius: "20px", 
                border: "1px solid var(--border)", 
                display: "flex", 
                flexDirection: "column", 
                gap: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.02)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div style={{ 
                  background: "rgba(0, 102, 255, 0.1)", 
                  width: "50px", 
                  height: "50px", 
                  borderRadius: "12px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center" 
                }}>
                  <i className={`fas ${cert.icon}`} style={{ color: "var(--electric-blue)", fontSize: "1.3rem" }}></i>
                </div>
                <div>
                  <h4 style={{ color: "var(--deep-navy)", fontSize: "1.1rem", fontWeight: "700" }}>{cert.title}</h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--electric-blue)", fontWeight: "600", letterSpacing: "0.5px" }}>CISCO NETACAD</span>
                </div>
              </div>
              <p className="about-subtitle" style={{ fontSize: "0.85rem", margin: "0", lineHeight: "1.5" }}>{cert.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deployments Section */}
      <section id="projects">
        <h2 className="section-title">Production Deployments</h2>
        <div className="grid">
          <div className="card">
            <i className="fas fa-shield-halved"></i>
            <h3>StheshHackers</h3>
            <p>A high-performance penetration testing utility designed for auditing web infrastructure vulnerabilities and automated security scanning.</p>
            <a href="https://stheshana07.github.io/stheshHackers-hackingtool/" target="_blank" rel="noreferrer">Analyze Tool <i className="fas fa-arrow-right"></i></a>
          </div>
          <div className="card">
            <i className="fas fa-brain"></i>
            <h3>StheshBot AI</h3>
            <p>An advanced AI conversational interface integrated with serverless architecture to provide real-time logic processing and assistance.</p>
            <a href="https://stheshbot.vercel.app" target="_blank" rel="noreferrer">Launch AI <i className="fas fa-arrow-right"></i></a>
          </div>
          <div className="card">
            <i className="fas fa-temperature-high"></i>
            <h3>Sthesh Weather</h3>
            <p>Dynamic data visualization platform utilizing OpenWeather APIs to deliver hyper-local meteorological insights with zero latency.</p>
            <a href="https://stheshweather.netlify.app" target="_blank" rel="noreferrer">Check Status <i className="fas fa-arrow-right"></i></a>
          </div>
          <div className="card">
            <i className="fas fa-stopwatch-20"></i>
            <h3>Sthesh Countdown</h3>
            <p>A security-focused utility for tracking mission-critical deadlines and upcoming cybersecurity event synchronizations.</p>
            <a href="https://stheshcountdown.netlify.app" target="_blank" rel="noreferrer">Open Utility <i className="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </section>

      {/* Advanced Security Suite */}
      <section id="toolkit" style={{ padding: "100px 10%" }}>
        <h2 className="section-title">Interactive Security Suite</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
          
          {/* Crypto Panel */}
          <div style={{ background: "var(--card-bg)", padding: "35px", borderRadius: "24px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3>SecOps Cryptographic Toolkit</h3>
            <p className="about-subtitle" style={{ fontSize: "0.9rem" }}>Process hashing transformations and cryptographic payload mappings completely client-side.</p>
            
            <select 
              value={cryptoMode} 
              onChange={(e) => setCryptoMode(e.target.value)}
              style={{ padding: "12px", borderRadius: "10px", background: "var(--ghost-white)", color: "var(--text-main)", border: "1px solid var(--border)", fontWeight: "600" }}
            >
              <option value="base64-encode">Base64 Encode</option>
              <option value="base64-decode">Base64 Decode</option>
              <option value="hex-encode">Text to Hexadecimal</option>
            </select>
            
            <input 
              type="text" 
              placeholder="Plaintext string data..." 
              value={cryptoInput}
              onChange={(e) => setCryptoInput(e.target.value)}
              style={{ padding: "12px", borderRadius: "10px", background: "var(--ghost-white)", color: "var(--text-main)", border: "1px solid var(--border)" }}
            />
            
            <button className="btn-primary" onClick={runCryptoProcess}>Execute Cipher Engine</button>

            {cryptoOutput && (
              <div style={{ background: "var(--ghost-white)", padding: "15px", borderRadius: "12px", borderLeft: "4px solid var(--electric-blue)", wordBreak: "break-all" }}>
                <code style={{ fontSize: "0.9rem", color: "var(--text-main)" }}>{cryptoOutput}</code>
              </div>
            )}
          </div>

          {/* Vulnerability Lab Sandbox */}
          <div style={{ background: "var(--card-bg)", padding: "35px", borderRadius: "24px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3>Vulnerability Lab Sandbox</h3>
            <p className="about-subtitle" style={{ fontSize: "0.9rem" }}>Test your auditing accuracy. Discover the parameter injection configuration required to escalate authentication privileges.</p>
            
            <div style={{ background: "#020617", padding: "15px", borderRadius: "12px", fontFamily: "monospace", fontSize: "0.85rem", height: "110px", overflowY: "auto", border: "1px solid #1e293b" }}>
              {logs.map((log, i) => (
                <div key={i} style={{ color: log.includes("BLOCKED") ? "#ef4444" : log.includes("WARN") ? "#f59e0b" : "#10b981" }}>{log}</div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <input 
                type="text" 
                placeholder="Ex: ?admin=true" 
                value={ctfInput}
                onChange={(e) => setCtfInput(e.target.value)}
                style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "var(--ghost-white)", color: "var(--text-main)", border: "1px solid var(--border)" }}
              />
              <button className="btn-primary" onClick={checkCtfSolution}>Inject</button>
            </div>

            <div style={{ 
              background: ctfFeedback.success === true ? "rgba(16, 185, 129, 0.15)" : ctfFeedback.success === false ? "rgba(239, 68, 68, 0.1)" : "var(--ghost-white)", 
              padding: "15px", 
              borderRadius: "12px", 
              borderLeft: `4px solid ${ctfFeedback.success === true ? "#10b981" : ctfFeedback.success === false ? "#ef4444" : "var(--electric-blue)"}`,
              fontSize: "0.85rem",
              color: "var(--text-main)"
            }}>
              {ctfFeedback.text}
            </div>
          </div>
        </div>

        {/* Automated Security Audit Simulator Module */}
        <div style={{ background: "var(--card-bg)", padding: "35px", borderRadius: "24px", border: "1px solid var(--border)", marginTop: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <h3>Automated Security Network Auditor</h3>
          <p className="about-subtitle" style={{ fontSize: "0.9rem" }}>Simulate passive perimeter asset scanning across network vectors to detect infrastructure exposure profiles.</p>
          
          <div style={{ display: "flex", gap: "15px" }}>
            <input 
              type="text" 
              id="scan-target"
              placeholder="Enter target IP domain (e.g., 127.0.0.1 or target-domain.local)..."
              style={{ flex: 1, padding: "12px", borderRadius: "10px", background: "var(--ghost-white)", color: "var(--text-main)", border: "1px solid var(--border)", fontFamily: "monospace" }}
            />
            <button className="btn-primary" onClick={() => {
              const target = document.getElementById("scan-target").value || "127.0.0.1";
              let lines = [
                `[+] Launching audit framework initialization targets on ${target}...`,
                `[+] Gathering records... Status 200 OK`,
                `[*] Scanning port matrices: 21, 22, 80, 443, 8080...`,
                `[-] Port 80 (HTTP) -> OPEN (Service: Nginx/1.24.0 React App Instance)`,
                `[-] Port 443 (HTTPS) -> OPEN (TLS v1.3 handshake verification succeeded)`,
                `[-] Port 22 (SSH) -> FILTERED (Stealth rule active)`,
                `[*] Inspecting web server headers for OWASP compliance metrics...`,
                `[WARN] X-Frame-Options missing: Host vulnerable to clickjacking parameters.`,
                `[SUCCESS] X-Content-Type-Options: nosniff rule present.`,
                `[+] Structural intelligence sequence finalized. Vulnerability Threat Index: 2.4 (Low Risk)`
              ];
              
              setLogs(["[SYSTEM SCAN INITIALIZATION]"]);
              lines.forEach((line, index) => {
                setTimeout(() => {
                  setLogs(prev => [...prev, line]);
                }, (index + 1) * 600);
              });
            }}>Initiate Audit Profile</button>
          </div>

          {/* Cryptographic Passphrase Entropy Analyzer */}
          <div style={{ background: "var(--card-bg)", padding: "35px", borderRadius: "24px", border: "1px solid var(--border)", marginTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3>Credential Entropy Analyzer</h3>
            <p className="about-subtitle" style={{ fontSize: "0.9rem" }}>Evaluate authentication string resilience against algorithmic complexity checks and brute-force guessing entropy calculations.</p>
            
            <input 
              type="password" 
              placeholder="Enter a string to analyze..." 
              id="password-input"
              onChange={(e) => {
                const val = e.target.value;
                const feedbackEl = document.getElementById("entropy-feedback");
                const metricEl = document.getElementById("entropy-metric");
                
                if (!val) {
                  feedbackEl.innerText = "Awaiting input sequence...";
                  metricEl.innerText = "Bits: 0";
                  return;
                }

                let poolSize = 0;
                if (/[a-z]/.test(val)) poolSize += 26;
                if (/[A-Z]/.test(val)) poolSize += 26;
                if (/[0-9]/.test(val)) poolSize += 10;
                if (/[^a-zA-Z0-9]/.test(val)) poolSize += 32;

                const entropyBits = Math.floor(val.length * (Math.log(poolSize) / Math.log(2)));
                metricEl.innerText = `Entropy: ${entropyBits} Bits`;

                if (entropyBits < 40) {
                  feedbackEl.innerHTML = "<span style='color: #ef4444;'>⚡ CRITICAL EXPOSURE: Vulnerable to dictionary generation patterns.</span>";
                } else if (entropyBits < 65) {
                  feedbackEl.innerHTML = "<span style='color: #f59e0b;'>⚠️ MODERATE RESILIENCE: Standard compute cluster could crack within hours.</span>";
                } else {
                  feedbackEl.innerHTML = "<span style='color: #10b981;'>🔒 SECURE ARCHITECTURE: Complex matrix resistant to algorithmic prediction.</span>";
                }
              }}
              style={{ padding: "12px", borderRadius: "10px", background: "var(--ghost-white)", color: "var(--text-main)", border: "1px solid var(--border)" }}
            />

            <div style={{ display: "flex", justifycontent: "space-between", fontSize: "0.85rem", fontWeight: "bold" }}>
              <span id="entropy-metric" style={{ color: "var(--electric-blue)" }}>Bits: 0</span>
            </div>

            <div id="entropy-feedback" style={{ background: "var(--ghost-white)", padding: "15px", borderRadius: "12px", border: "1px solid var(--border)", fontSize: "0.85rem", color: "var(--text-main)" }}>
              Awaiting input sequence...
            </div>
          </div>
        </div>
      </section>

      {/* Floating Security Assistant Widget */}
      <div className="chat-toggle" onClick={() => setChatOpen(!chatOpen)}>
        <i className="fas fa-shield-halved"></i> Security Assistant
      </div>

      {chatOpen && (
        <div id="chat-widget" style={{ display: "flex" }}>
          <div id="chat-header">
            <span>STHESHBOT CORE v2.5</span>
            <span style={{ cursor: "pointer" }} onClick={() => setChatOpen(false)}>×</span>
          </div>
          <div id="chat-display">
            {chatMessages.map((msg, index) => (
              <div 
                key={index} 
                className={msg.sender === "bot" ? "bot-msg" : "user-msg"}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ))}
          </div>
          <div className="chat-input-area">
            <input 
              type="text" 
              id="chat-input" 
              placeholder="Enter formal request..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} style={{ background: "var(--electric-blue)", color: "white", border: "none", padding: "10px 15px", borderRadius: "8px", cursor: "pointer" }}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" style={{ padding: "120px 10%", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Ready to collaborate?</h2>
        <p className="contact-subtitle" style={{ marginBottom: "40px" }}>Currently accepting freelance projects and security consultations.</p>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: "10px", fontWeight: 600 }} className="contact-info">
          <span><i className="fas fa-envelope" style={{ color: "var(--electric-blue)" }}></i> dinilangaathabile@gmail.com</span>
          <span><i className="fab fa-whatsapp" style={{ color: "var(--electric-blue)" }}></i> +27 66 085 1108</span>
        </div>
      </section>

      {/* Footer Layout */}
      <footer>
        <div className="social-links">
          <a href="https://github.com/stheshana07" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://tiktok.com/@stheshana07" target="_blank" rel="noreferrer"><i className="fab fa-tiktok"></i></a>
          <a href="https://za.linkedin.com/in/athabile-dinilanga-744309377" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
        </div>
        <p style={{ opacity: 0.5, fontSize: "0.85rem" }}>© 2026 Athabile Dinilanga. Engineered for Security & Speed.</p>
      </footer>
    </div>
  );
}

export default App;
