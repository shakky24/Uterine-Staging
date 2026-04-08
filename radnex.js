// Mobile menu
const menuBtn = document.querySelector("[data-mobile-menu-btn]");
const menuPanel = document.querySelector("[data-mobile-menu]");
const iconOpen = document.querySelector("[data-menu-icon-open]");
const iconClose = document.querySelector("[data-menu-icon-close]");

if (menuBtn && menuPanel) {
  const setOpen = (open) => {
    menuPanel.classList.toggle("hidden", !open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (iconOpen && iconClose) {
      iconOpen.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
    }
  };
  menuBtn.addEventListener("click", () => setOpen(menuPanel.classList.contains("hidden")));
  document.querySelectorAll("[data-mobile-nav-link]").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

// data-open-consultation buttons
document.querySelectorAll("[data-open-consultation]").forEach((btn) => {
  btn.addEventListener("click", openConsultationModal);
});

// FAQ toggles
document.querySelectorAll(".faq-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const answer = button.nextElementSibling;
    const icon = button.querySelector(".faq-icon");
    button.setAttribute("aria-expanded", String(!expanded));
    answer.hidden = expanded;
    if (icon) {
      icon.textContent = expanded ? "+" : "-";
      icon.classList.toggle("text-primary", !expanded);
    }
  });
});

// Consultation Modal
function openConsultationModal() {
  const modal = document.getElementById('consultationModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeConsultationModal() {
  const modal = document.getElementById('consultationModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    document.getElementById('consultationForm').reset();
    document.getElementById('consultationSuccess').classList.add('hidden');
    document.getElementById('consultationError').classList.add('hidden');
  }
}

document.getElementById('consultationPhone')?.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
});

async function handleConsultationSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('consultationName').value.trim();
  const phone = document.getElementById('consultationPhone').value.trim();
  const successDiv = document.getElementById('consultationSuccess');
  const errorDiv = document.getElementById('consultationError');
  const errorMsg = document.getElementById('consultationErrorMessage');
  const submitBtn = document.getElementById('consultationSubmitBtn');
  const submitText = document.getElementById('submitText');
  const submitSpinner = document.getElementById('submitSpinner');

  successDiv.classList.add('hidden');
  errorDiv.classList.add('hidden');

  if (!name || !phone) {
    errorMsg.textContent = 'Please enter your name and phone number.';
    errorDiv.classList.remove('hidden');
    return;
  }
  if (phone.length !== 10) {
    errorMsg.textContent = 'Please enter a valid 10-digit phone number.';
    errorDiv.classList.remove('hidden');
    return;
  }

  submitBtn.disabled = true;
  submitText.classList.add('hidden');
  submitSpinner.classList.remove('hidden');

  try {
    successDiv.classList.remove('hidden');
    document.getElementById('consultationForm').reset();
    setTimeout(() => closeConsultationModal(), 2000);
  } catch (error) {
    errorMsg.textContent = 'Something went wrong. Please try again or contact us directly.';
    errorDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitText.classList.remove('hidden');
    submitSpinner.classList.add('hidden');
  }
}
