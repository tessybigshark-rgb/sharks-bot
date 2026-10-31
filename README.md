async function loadSummary() {
  const summary = document.getElementById('summary');
  try {
    const response = await fetch('/api/dashboard/summary');
    const data = await response.json();
    const stats = data.stats;
    summary.innerHTML = `
      <div class="stat">
        <div class="stat-label">Music campaigns</div>
        <div class="stat-value">${stats.musicCampaigns}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Active playlists</div>
        <div class="stat-value">${stats.activePlaylists}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Social posts</div>
        <div class="stat-value">${stats.socialPosts}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Revenue streams</div>
        <div class="stat-value">${stats.revenueStreams}</div>
      </div>
    `;
  } catch (error) {
    summary.innerHTML = '<div class="stat"><div class="stat-label">Error</div><div class="stat-value">Unavailable</div></div>';
  }
}

async function postJson(url, body, targetId) {
  const target = document.getElementById(targetId);
  target.textContent = 'Sending...';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    target.textContent = JSON.stringify(json, null, 2);
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
