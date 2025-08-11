
(function () {
  const form = document.getElementById('subscription-form');
  const emailInput = document.getElementById('newsletter');
  const msg = document.getElementById('formMessage');
  let hideTimer = null;

  function showMessage(text, isSuccess = true, persist = false) {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    msg.textContent = text;
    msg.style.background = isSuccess ? '#4caf50' : '#b44756'; // green or muted red
    msg.style.display = 'block';
    // force reflow then animate
    msg.style.opacity = '0';
    msg.style.transform = 'translateY(-6px)';
    requestAnimationFrame(() => {
      msg.style.opacity = '1';
      msg.style.transform = 'translateY(0)';
    });

    if (!persist) {
      hideTimer = setTimeout(() => {
        msg.style.opacity = '0';
        msg.style.transform = 'translateY(-6px)';
        setTimeout(() => { msg.style.display = 'none'; }, 300);
      }, 3000);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const raw = emailInput.value || '';
    const email = raw.trim();

    // Basic, reliable email pattern (no spaces, requires @ and a dot)
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      showMessage('Please enter a valid email address.', false);
      emailInput.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      // <-- Replace with your real SheetDB endpoint -->
       const SHEETDB_URL = 'https://sheetdb.io/api/v1/kn191oinbuxp4';

      const res = await fetch(SHEETDB_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: [{ "Email Subscribers": email }] })
      });

      if (res.ok) {
        showMessage('Email subscribed successfully!', true);
        form.reset();
      } else {
        // try to extract server message for debugging
        let serverMsg = '';
        try { const j = await res.json(); serverMsg = j && j.message ? ` — ${j.message}` : ''; } catch (err) {}
        showMessage('Failed to subscribe. Please try again.' + serverMsg, false);
      }
    } catch (err) {
      console.error('Subscribe error:', err);
      showMessage('Network error. Please try again later.', false);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
})();
