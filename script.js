/* ===== ATELIER — Premium Portfolio Animations ===== */
(function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Render projects from store ---------- */
  const projects = PROJECTS;
  const projectData = {};
  const grid = document.getElementById("projects-grid");

  projects.forEach(p => {
    projectData[p.id] = p;
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.project = p.id;
    const imgBg = p.image
      ? `background: url('${p.image}') center/cover no-repeat, ${p.gradient}`
      : `background: ${p.gradient}`;
    card.innerHTML = `
      <div class="project-image-wrap">
        <div class="project-image" style="${imgBg}"></div>
        <div class="project-overlay">
          <span class="project-view">View Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
          </span>
        </div>
      </div>
      <div class="project-info">
        <div class="project-meta">
          <span class="project-category">${p.category}</span>
          <span class="project-year">${p.year}</span>
        </div>
        <h3 class="project-title">${p.title}</h3>
      </div>`;
    grid.appendChild(card);
  });

  // Update hero counter
  const counterEl = document.querySelector(".counter-number");
  if (counterEl) counterEl.textContent = String(projects.length).padStart(2, "0");

  /* ---------- Custom cursor ---------- */
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursor-follower");
  let mx = 0, my = 0, fx = 0, fy = 0;

  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });

    (function moveCursor() {
      fx += (mx - fx) * 0.15;
      fy += (my - fy) * 0.15;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
      follower.style.left = fx + "px";
      follower.style.top = fy + "px";
      requestAnimationFrame(moveCursor);
    })();

    document.querySelectorAll("a, button, .project-card, .service-item").forEach((el) => {
      el.addEventListener("mouseenter", () => { cursor.classList.add("active"); follower.classList.add("active"); });
      el.addEventListener("mouseleave", () => { cursor.classList.remove("active"); follower.classList.remove("active"); });
    });
  }

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById("preloader");
  const preloaderTL = gsap.timeline();

  preloaderTL
    .to(".preloader-line", { scaleX: 1, duration: 1.2, ease: "power2.inOut" })
    .to(".preloader-text", { opacity: 1, duration: 0.6 }, "-=0.6")
    .to(preloader, { yPercent: -100, duration: 1, ease: "power4.inOut", delay: 0.4 })
    .set(preloader, { display: "none" })
    .add(heroAnimation, "-=0.5");

  /* ---------- Hero animation ---------- */
  function heroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".title-line-inner", {
      y: 0, duration: 1.2, stagger: 0.15
    })
      .to(".hero-eyebrow", { opacity: 1, x: 0, duration: 0.8 }, "-=0.8")
      .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .to(".hero-cta-group", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
      .to(".hero-scroll-indicator", { opacity: 1, duration: 0.6 }, "-=0.3")
      .to(".hero-counter", { opacity: 1, duration: 0.6 }, "-=0.4");
  }

  /* ---------- Set initial states ---------- */
  gsap.set(".hero-eyebrow", { opacity: 0, x: -20 });
  gsap.set(".hero-subtitle", { opacity: 0, y: 20 });
  gsap.set(".hero-cta-group", { opacity: 0, y: 20 });
  gsap.set(".preloader-text", { opacity: 0 });

  /* ---------- Nav scroll ---------- */
  window.addEventListener("scroll", () => {
    document.getElementById("nav").classList.toggle("scrolled", window.scrollY > 80);
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById("nav-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
  });

  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  /* ---------- Scroll reveal: .reveal-up ---------- */
  gsap.utils.toArray(".reveal-up").forEach((el) => {
    gsap.from(el, {
      y: 60, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" }
    });
  });

  /* ---------- Scroll reveal: .reveal-text ---------- */
  gsap.utils.toArray(".reveal-text").forEach((el) => {
    gsap.from(el, {
      y: 80, opacity: 0, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" }
    });
  });

  /* ---------- Section labels ---------- */
  gsap.utils.toArray(".section-label").forEach((el) => {
    gsap.from(el, {
      x: -40, opacity: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" }
    });
  });

  /* ---------- Project cards ---------- */
  gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.from(card, {
      y: 100, opacity: 0, duration: 1, ease: "power3.out", delay: (i % 2) * 0.15,
      scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" }
    });
  });

  /* ---------- Service items ---------- */
  gsap.utils.toArray(".service-item").forEach((item, i) => {
    gsap.from(item, {
      x: -60, opacity: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" }
    });
  });

  /* ---------- Stat counter animation ---------- */
  gsap.utils.toArray(".stat-number").forEach((num) => {
    const target = parseInt(num.dataset.count);
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target, duration: 2, ease: "power2.out",
      scrollTrigger: { trigger: num, start: "top 90%" },
      onUpdate: () => { num.textContent = Math.round(obj.val); }
    });
  });

  /* ---------- Parallax on hero grid ---------- */
  gsap.to(".hero-bg-grid", {
    yPercent: 30,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
  });

  /* ---------- Marquee speed boost on scroll ---------- */
  ScrollTrigger.create({
    trigger: ".marquee-section",
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      const speed = 20 - self.progress * 12;
      document.querySelector(".marquee-content").style.animationDuration = speed + "s";
    }
  });

  /* ---------- Project Modal ---------- */
  const modal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.project;
      const data = projectData[id];
      if (!data) return;
      const modalImg = document.getElementById("modal-image");
      modalImg.style.background = data.image
        ? `url('${data.image}') center/cover no-repeat, ${data.gradient}`
        : data.gradient;
      document.getElementById("modal-category").textContent = data.category;
      document.getElementById("modal-title").textContent = data.title;
      document.getElementById("modal-desc").textContent = data.desc;
      document.getElementById("modal-client").textContent = data.client;
      document.getElementById("modal-year").textContent = data.year;
      document.getElementById("modal-services").textContent = data.services;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
  modalClose.addEventListener("click", closeModal);
  document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  /* ---------- Contact form ---------- */
  document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("submit-btn");
    const btnText = btn.querySelector(".btn-text");
    const originalText = btnText.textContent;

    // Loading state
    btnText.textContent = "Sending...";
    btn.style.pointerEvents = "none";

    try {
      const formData = new FormData(e.target);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        btnText.textContent = "Message Sent ✓";
        gsap.fromTo(btn, { scale: 0.96 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });
        e.target.reset();
      } else {
        btnText.textContent = "Failed — Try Again";
      }
    } catch (error) {
      btnText.textContent = "Error — Try Again";
    }

    setTimeout(() => {
      btnText.textContent = originalText;
      btn.style.pointerEvents = "";
    }, 3000);
  });

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        // Scroll to the section-label inside the section so content sits right below the nav
        const label = target.querySelector(".section-label");
        const scrollTarget = label || target;
        const navHeight = 70;
        const offset = scrollTarget.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });
})();
