// Initial counts
let coins = 100;
let hearts = 0;
let copies = 0;

// Elements
const heartCountEl = document.getElementById('heartCount');
const coinCountEl = document.getElementById('coinCount');
const copyCountEl = document.getElementById('copyCount');
const historyListEl = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const cardsWrap = document.getElementById('cardsWrap');

// Helpers
function updateCounters() {
  heartCountEl.textContent = hearts;
  coinCountEl.textContent = coins;
  copyCountEl.textContent = copies;
}

function formatTime(date = new Date()) {
  // Example: 10:36:58 AM
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

function addHistory(name, number) {
  const li = document.createElement('li');
  li.className = 'history-item';
  const title = document.createElement('div');
  title.innerHTML = `<strong>${name}</strong><br> ${number}`;
  const time = document.createElement('div');
  time.className = 'time-pill';
  time.textContent = formatTime();

  li.appendChild(title);
  li.appendChild(time);
  // Add to top
  historyListEl.prepend(li);
}

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

// Event Delegation for all cards
cardsWrap.addEventListener('click', async (e) => {
  const card = e.target.closest('.card');
  if (!card) return;

  const name = card.getAttribute('data-service-name');
  const number = card.getAttribute('data-service-number');

  // Heart
  if (e.target.closest('.heart-btn')) {
    hearts += 1;
    updateCounters();
    return;
  }

  // Copy
  if (e.target.closest('.btn-copy')) {
    const ok = await copyToClipboard(number);
    copies += 1;
    updateCounters();
    alert(ok
      ? `Copied: ${name} — ${number}`
      : `Could not copy. Please copy manually: ${number}`);
    return;
  }

  // Call
  if (e.target.closest('.btn-call')) {
    if (coins < 20) {
      alert('Not enough coins to make a call. You need at least 20 coins.');
      return;
    }
    coins -= 20;
    updateCounters();
    addHistory(name, number);
    alert(`Calling ${name}\nNumber: ${number}`);
    return;
  }
});

// Clear History
clearHistoryBtn.addEventListener('click', () => {
  historyListEl.innerHTML = '';
});