/*
  Portfolio interactions
  --------------------------------------------------------------------------
  Set FORM_ENDPOINT to your Formspree endpoint (for example,
  https://formspree.io/f/yourFormId) to enable real submissions. Leave it
  blank while developing: valid form entries are saved in localStorage only.
*/
const FORM_ENDPOINT = "";

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".site-loader");
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-links");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("load", () => {
    window.setTimeout(() => loader.classList.add("loaded"), 250);
  });

  // Mobile navigation
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  // Header and back-to-top visibility
  const updateScrollUI = () => {
    const hasScrolled = window.scrollY > 35;
    header.classList.toggle("scrolled", hasScrolled);
    backToTop.classList.toggle("show", window.scrollY > 620);
  };
  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });

  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Active navigation state observes the visible section.
  const sections = [...document.querySelectorAll("main section[id]")];
  const navObserver = new IntersectionObserver((entries) => {
    const visibleSection = entries.find((entry) => entry.isIntersecting);
    if (!visibleSection) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visibleSection.target.id}`);
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
  sections.forEach((section) => navObserver.observe(section));

  // Scroll-reveal animation
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.11, rootMargin: "0px 0px -45px" });
  document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

  // Typed hero subtitle, respecting reduced motion preferences.
  const typedText = document.querySelector(".typed-text");
  const phrase = typedText.dataset.text || "";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typedText.textContent = phrase;
  } else {
    let letter = 0;
    const typeNextCharacter = () => {
      typedText.textContent = phrase.slice(0, letter);
      letter += 1;
      if (letter <= phrase.length) window.setTimeout(typeNextCharacter, 30);
    };
    window.setTimeout(typeNextCharacter, 850);
  }

  // Subtle click feedback for primary interactive elements.
  document.querySelectorAll(".ripple").forEach((element) => {
    element.addEventListener("click", (event) => {
      const bounds = element.getBoundingClientRect();
      element.style.setProperty("--ripple-x", `${event.clientX - bounds.left}px`);
      element.style.setProperty("--ripple-y", `${event.clientY - bounds.top}px`);
      element.classList.remove("rippling");
      // Force a new animation cycle on rapid clicks.
      void element.offsetWidth;
      element.classList.add("rippling");
    });
    element.addEventListener("animationend", () => element.classList.remove("rippling"));
  });

  // Project filters
  const filterButtons = [...document.querySelectorAll(".filter-btn")];
  const projectCards = [...document.querySelectorAll(".project-card")];
  const filterEmpty = document.querySelector(".filter-empty");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((filterButton) => filterButton.classList.toggle("active", filterButton === button));
      let visibleCount = 0;
      projectCards.forEach((card) => {
        const isVisible = filter === "all" || card.dataset.category.split(" ").includes(filter);
        card.classList.toggle("is-hidden", !isVisible);
        if (isVisible) visibleCount += 1;
      });
      filterEmpty.hidden = visibleCount !== 0;
    });
  });

  // Project modal content. Edit this data when a project grows or gets a demo.
  const projectDetails = {
    govsync: {
      title: "GovSync",
      category: "Smart India Hackathon 2026",
      description: "GovSync explores a unified way for fragmented government digital services to communicate. Its concept includes API integration, consent-based data sharing, service orchestration, data validation, eligibility processing, and application tracking.",
      technologies: ["APIs", "Backend", "Database", "System Integration"],
      note: "Achievement: selected to represent Atharva College of Engineering at the National Level of Smart India Hackathon 2026."
    },
    portfolio: {
      title: "Personal Portfolio Website",
      category: "Web Development",
      description: "A responsive personal portfolio created to bring together skills, projects, achievements, and an ongoing development journey in a clear, personal format.",
      technologies: ["HTML", "Tailwind CSS", "JavaScript"],
      note: ""
    },
    flipkart: {
      title: "Flipkart UI Clone",
      category: "Web Development",
      description: "A frontend e-commerce practice project inspired by modern online shopping platforms. It focuses on responsive layouts, navigation, product sections, and reusable interface patterns.",
      technologies: ["HTML", "CSS", "Bootstrap"],
      note: "A live demo is not published yet. Add it here only after deployment."
    },
    pets: {
      title: "Pet Store Website",
      category: "Web Development",
      description: "A responsive pet-store project created to practice semantic webpage structure, styling, flexible layouts, and device-friendly design.",
      technologies: ["HTML", "CSS"],
      note: "A live demo is not published yet. Add it here only after deployment."
    }
  };
  const modalTitle = document.querySelector("#projectModalTitle");
  const modalCategory = document.querySelector("#modalCategory");
  const modalDescription = document.querySelector("#modalDescription");
  const modalTech = document.querySelector("#modalTech");
  const modalNote = document.querySelector("#modalNote");
  document.querySelectorAll(".project-detail").forEach((button) => {
    button.addEventListener("click", () => {
      const details = projectDetails[button.dataset.project];
      if (!details) return;
      modalTitle.textContent = details.title;
      modalCategory.textContent = details.category;
      modalDescription.textContent = details.description;
      modalNote.textContent = details.note;
      modalTech.replaceChildren(...details.technologies.map((technology) => {
        const tag = document.createElement("span");
        tag.textContent = technology;
        return tag;
      }));
    });
  });

  // Contact form: validates locally and avoids implying that email was sent.
  const contactForm = document.querySelector("#contactForm");
  const submitButton = contactForm.querySelector(".submit-btn");
  const submitLabel = submitButton.querySelector(".submit-label");
  const submitLoading = submitButton.querySelector(".submit-loading");
  const formStatus = contactForm.querySelector(".form-status");
  const inputs = [...contactForm.querySelectorAll("input, textarea")];

  const setFieldError = (input, message = "") => {
    const field = input.closest(".field");
    field.classList.toggle("invalid", Boolean(message));
    field.querySelector("small").textContent = message;
  };

  const validateInput = (input) => {
    const value = input.value.trim();
    let message = "";
    if (!value) message = "This field is required.";
    else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Enter a valid email address.";
    else if (input.minLength > 0 && value.length < input.minLength) message = `Please enter at least ${input.minLength} characters.`;
    setFieldError(input, message);
    return !message;
  };

  inputs.forEach((input) => input.addEventListener("input", () => {
    if (input.closest(".field").classList.contains("invalid")) validateInput(input);
  }));

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const valid = inputs.map(validateInput).every(Boolean);
    formStatus.textContent = "";
    formStatus.className = "form-status";
    if (!valid) {
      formStatus.textContent = "Please correct the highlighted fields and try again.";
      formStatus.classList.add("error");
      contactForm.querySelector(".invalid input, .invalid textarea")?.focus();
      return;
    }

    submitButton.disabled = true;
    submitLabel.hidden = true;
    submitLoading.hidden = false;
    submitLoading.style.display = "inline-flex";
    const payload = Object.fromEntries(new FormData(contactForm).entries());

    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error("Submission service did not accept the message.");
        formStatus.textContent = "Thanks! Your message was submitted successfully.";
      } else {
        const storedMessages = JSON.parse(localStorage.getItem("aayushPortfolioMessages") || "[]");
        storedMessages.push({ ...payload, savedAt: new Date().toISOString() });
        localStorage.setItem("aayushPortfolioMessages", JSON.stringify(storedMessages));
        formStatus.textContent = "Your message passed validation and was saved locally for development. Configure FORM_ENDPOINT to receive real submissions.";
      }
      formStatus.classList.add("success");
      contactForm.reset();
    } catch (error) {
      formStatus.textContent = FORM_ENDPOINT
        ? "The form service could not receive your message. Please try again later."
        : "Unable to save this message locally. Please try again.";
      formStatus.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitLabel.hidden = false;
      submitLoading.hidden = true;
      submitLoading.style.display = "";
    }
  });
});
