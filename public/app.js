:root {
  --bg: #0b1020;
  --panel: #141d33;
  --panel-2: #1d2944;
  --primary: #7c9cff;
  --accent: #26d0ce;
  --text: #edf3ff;
  --muted: #b8c0d9;
  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Inter, Arial, sans-serif;
  background: radial-gradient(circle at top, #15213d, var(--bg));
  color: var(--text);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 60px;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 8px;
  letter-spacing: 0.12em;
  color: var(--accent);
  font-size: 12px;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(2.2rem, 4vw, 4rem);
}

button {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: #08101c;
  border: 0;
  border-radius: 12px;
  padding: 12px 18px;
  font-weight: 800;
  cursor: pointer;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 18px;
  box-shadow: var(--shadow);
}

.stat-label {
  color: var(--muted);
  font-size: 12px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
}

.card {
  background: rgba(18, 27, 45, 0.9);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px;
  box-shadow: var(--shadow);
}

.card h2 {
  margin-top: 0;
}

form {
  display: grid;
  gap: 12px;
  margin-bottom: 14px;
}

input,
textarea {
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
}

pre {
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--muted);
  background: rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  padding: 12px;
  min-height: 120px;
  overflow: auto;
}
