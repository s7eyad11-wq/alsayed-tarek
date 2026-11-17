// Greeting by time of day & current year
(function () {
  var h = new Date().getHours();
  var text = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  var greetingEl = document.getElementById("greeting");
  if (greetingEl) {
    greetingEl.textContent = text + " \u2022 Welcome to my profile";
  }
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// Theme toggle with localStorage persistence
(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeBtn");
  var themeIcon = document.getElementById("themeIcon");
  var themeText = document.getElementById("themeText");

  function applyTheme(isDark) {
    if (isDark) {
      root.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.textContent = "\u2600\uFE0F";
      if (themeText) themeText.textContent = "Light mode";
    } else {
      root.removeAttribute("data-theme");
      if (themeIcon) themeIcon.textContent = "\uD83C\uDF19";
      if (themeText) themeText.textContent = "Dark mode";
    }
  }

  // Load saved preference or system preference
  var savedTheme = localStorage.getItem("theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var initialDark = savedTheme ? savedTheme === "dark" : prefersDark;
  applyTheme(initialDark);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      var newDark = !isDark;
      applyTheme(newDark);
      localStorage.setItem("theme", newDark ? "dark" : "light");
    });
  }
})();

// Photo Lightbox Modal
(function () {
  var trigger = document.getElementById("photoTrigger");
  var modal = document.getElementById("photoModal");
  var closeBtn = document.getElementById("modalClose");
  var backdrop = modal ? modal.querySelector(".photo-modal-backdrop") : null;

  function openModal() {
    if (!modal) return;
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  if (trigger) trigger.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hasAttribute("hidden")) {
      closeModal();
    }
  });
})();

// Skills Progress Bars
(function () {
  var skills = [
    { name: "HTML5 & Semantic Markup", level: 90 },
    { name: "CSS3 & Responsive Design", level: 85 },
    { name: "JavaScript (ES6+)", level: 75 },
    { name: "Problem Solving & Algorithms", level: 80 }
  ];

  var list = document.getElementById("skillList");
  if (list) {
    skills.forEach(function (s) {
      var d = document.createElement("div");
      d.className = "skill";
      d.innerHTML =
        '<div class="skill-head"><span>' +
        s.name +
        "</span><span>" +
        s.level +
        "%</span></div>" +
        '<div class="bar" role="progressbar" aria-label="' +
        s.name +
        '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' +
        s.level +
        '"><span data-w="' +
        s.level +
        '"></span></div>';
      list.appendChild(d);
    });
  }

  var animated = false;
  function fillBars() {
    if (animated) return;
    var skillsSection = document.getElementById("skills");
    if (!skillsSection) return;
    var rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      animated = true;
      document.querySelectorAll(".bar span").forEach(function (b) {
        b.style.width = b.dataset.w + "%";
      });
    }
  }

  window.addEventListener("scroll", fillBars, { passive: true });
  window.addEventListener("load", fillBars);
  setTimeout(fillBars, 300);
})();

// Project Filter
(function () {
  var filterBtns = document.querySelectorAll(".filters button");
  var projects = document.querySelectorAll(".project");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.dataset.filter;
      filterBtns.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      projects.forEach(function (p) {
        var match = f === "all" || p.dataset.type === f;
        p.classList.toggle("hidden", !match);
      });
    });
  });
})();

// Contact Form Validation & Feedback
(function () {
  var form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var msg = document.getElementById("message").value.trim();
    var ok = true;

    function check(cond, id, text) {
      var errEl = document.getElementById(id);
      if (errEl) errEl.textContent = cond ? "" : text;
      if (!cond) ok = false;
    }

    check(name.length >= 2, "nameErr", "Please enter your name (at least 2 characters).");
    check(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      "emailErr",
      "Please enter a valid email address (e.g. name@example.com)."
    );
    check(msg.length >= 10, "msgErr", "Please write a message with at least 10 characters.");

    var out = document.getElementById("formMsg");
    if (ok) {
      out.textContent = "\u2714 Thank you, " + name + "! Your message has been sent successfully.";
      out.classList.add("show");
      this.reset();
      setTimeout(function () {
        out.classList.remove("show");
      }, 6000);
    } else if (out) {
      out.classList.remove("show");
    }
  });
})();
