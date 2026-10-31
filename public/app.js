:root {
  --bg: #07111d;
  --sidebar: #101a2a;
  --panel: #13233a;
  --panel-strong: #1a2d49;
  --primary: #75a9ff;
  --accent: #2ae0c6;
  --text: #edf5ff;
  --muted: #afbedc;
  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  min-height: 100%;
  font-family: Inter, Arial, sans-serif;
  background: linear-gradient(180deg, #07111d 0%, #0a1630 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button, input, textarea, select {
  font: inherit;
}

.app-shell {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: var(--sidebar);
  border-right: 1px solid var(--border);
  padding: 24px 18px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #09131f;
  font-weight: 900;
  font-size: 22px;
}

.eyebrow {
  margin: 0 0 6px;
  color: var(--accent);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
}

.sidebar h2, .topbar h1, .card h3, .auth-box h4 {
  margin: 0;
}

nav {
  display: grid;
  gap: 8px;
}

.nav-item {
  display: block;
  padding: 12px 14px;
  border-radius: 12px;
  color: var(--text);
  text-decoration: none;
  background: rgba(255,255,255,0.01);
  border: 1px solid transparent;
}

.nav-item.active {
  background: rgba(117, 169, 255, 0.12);
  border-color: rgba(117, 169, 255, 0.35);
}

.auth-box {
  margin-top: 28px;
  display: grid;
  gap: 10px;
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
}

.status-text {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
}

.main-panel {
  padding: 28px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.topbar h1 {
  font-size: clamp(2rem, 3vw, 3rem);
}

button {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #07111d;
  border: none;
  border-radius: 12px;
  padding: 11px 18px;
  font-weight: 800;
  cursor: pointer;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 16px;
  margin-bottom: 26px;
}

.summary-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 18px;
  box-shadow: var(--shadow);
}

.summary-label {
  color: var(--muted);
  font-size: 12px;
  margin-bottom: 8px;
}

.summary-value {
  font-size: 2rem;
  font-weight: 800;
}

.forms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 20px;
}

.card {
  background: rgba(19, 35, 58, 0.9);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 18px;
  box-shadow: var(--shadow);
}

.card h3 {
  margin-bottom: 14px;
}

.wide-card {
  min-height: 220px;
}

form {
  display: grid;
  gap: 12px;
  margin-bottom: 12px;
}

input, textarea, select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: rgba(255,255,255,0.02);
  color: var(--text);
  padding: 12px 14px;
}

pre {
  white-space: pre-wrap;
  word-break: break-word;
  background: rgba(0, 0, 0, 0.18);
  border-radius: 12px;
  min-height: 120px;
  padding: 12px;
  color: var(--muted);
  overflow: auto;
}

@media (max-width: 840px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .main-panel {
    padding: 18px;
  }
}
