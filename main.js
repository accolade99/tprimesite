// Newsletter subscription and EmailJS integration
// This script handles the newsletter subscription form and integrates with EmailJS for contact form submissions.
// It includes basic validation, error handling, and user feedback.
// Ensure to replace placeholders with your actual SheetDB and EmailJS credentials.



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

// Contact form submission using EmailJS (Fix Appointment)
// EmailJS initialization with Public Key

// EmailJS initialization with Public Key here instead of HTML
(function() {
  emailjs.init("Your_public_key"); // Replace with your EmailJS Public Key
})();

document.getElementById("inquiryForm").addEventListener("submit", function(e) {
  e.preventDefault();

 

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const submitButton = inquiryForm.querySelector("button[type='submit']");
  const formMessage = document.getElementById("formMessage");
  
  submitButton.textContent = "Sending...";
  submitButton.disabled = true; // Optional: prevent double click


  // Reset message display
  formMessage.textContent = "";
  formMessage.className = "";

  // Validation
  if (!name || !email || !phone || !message) {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.className = "error";
    return;
  }

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.className = "error";
    return;
  }

  // Prepare email data
  const templateParams = {
    name: name,
    email: email,
    phone: phone,
    message: message
  };

  // Send email via EmailJS
    
  emailjs.send("Your_service_id", "Your_template_ID", templateParams)
    .then(() => {
      formMessage.textContent = "✅ Your message has been sent successfully!";
      formMessage.className = "success";
      submitButton.textContent = "Submit";
      submitButton.disabled = false; // Re-enable button after sending
      document.getElementById("inquiryForm").reset();
    })
    .catch(() => {
      formMessage.textContent = "❌ Failed to send message. Please try again.";
      formMessage.className = "error";
    });

    // Clear error message after 3 seconds
    setTimeout(() => {
      formMessage.textContent = "";
      formMessage.className = "";
    }, 3000);
});