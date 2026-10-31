async function loadSummary() {
  const summaryContainer = document.getElementById('summary');
  if (!summaryContainer) return;

  try {
    const response = await fetch('/api/dashboard/summary');
    const payload = await response.json();
    const metrics = payload.data.metrics;

    summaryContainer.innerHTML = `
      <div class="summary-card">
        <div class="summary-label">Music campaigns</div>
        <div class="summary-value">${metrics.musicCampaigns}</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">Active playlists</div>
        <div class="summary-value">${metrics.activePlaylists}</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">Social posts</div>
        <div class="summary-value">${metrics.socialPosts}</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">Revenue streams</div>
        <div class="summary-value">${metrics.revenueStreams}</div>
      </div>
      <div class="summary-card">
        <div class="summary-label">Growth</div>
        <div class="summary-value">${payload.data.growth}</div>
      </div>
    `;
  } catch (error) {
    summaryContainer.innerHTML = '<div class="summary-card"><div class="summary-label">Status</div><div class="summary-value">Unavailable</div></div>';
  }
}

async function postJson(url, body, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.textContent = 'Sending...';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const payload = await response.json();
    target.textContent = JSON.stringify(payload, null, 2);
  } catch (error) {
    target.textContent = `Request failed: ${error.message}`;
  }
}

document.getElementById('refreshSummary').addEventListener('click', loadSummary);

document.getElementById('musicForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  const payload = Object.fromEntries(form.entries());
  payload.bpm = Number(payload.bpm);
  await postJson('/api/music/generate', payload, 'musicResult');
});

document.getElementById('socialForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  const payload = Object.fromEntries(form.entries());
  await postJson('/api/social/generate', payload, 'socialResult');
});

document.getElementById('whatsappForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  const payload = Object.fromEntries(form.entries());
  await postJson('/api/whatsapp/webhook', payload, 'whatsappResult');
});

document.getElementById('spotifyForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(event.target);
  const payload = Object.fromEntries(form.entries());
  payload.limit = Number(payload.limit);
  payload.seedGenres = payload.seedGenres
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  await postJson('/api/spotify/search', payload, 'spotifyResult');
});

loadSummary();
