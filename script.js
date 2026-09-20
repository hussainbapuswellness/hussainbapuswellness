document.addEventListener("DOMContentLoaded", () => {

  let currentLanguage = localStorage.getItem("hbw-language") || "en";

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value !== undefined) el.innerHTML = value;
  };

  const setAttr = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el && value !== undefined) el.setAttribute(attr, value);
  };

  function applyLanguage(lang) {

    if (!translations[lang]) lang = "en";

    const t = translations[lang];

    // HERO
    setText("hero-title", t["hero-title"]);
    setText("hero-subtitle", t["hero-subtitle"]);
    setText("hero-highlight", t["hero-highlight"]);
    setText("hero-line1", t["hero-line1"]);
    setText("hero-line2", t["hero-line2"]);
    setText("hero-line3", t["hero-line3"]);

    const heroButtons = document.querySelectorAll(
      'a[href="appointment.html"], a[href="appointment.html?type=online"]'
    );

    heroButtons.forEach(btn => {
      if (btn.getAttribute("href") === "appointment.html") {
        btn.innerHTML = t["hero-book"];
      } else {
        btn.innerHTML = t["hero-online"];
      }
    });

    // HERO STATS
    setText("stat1-title", t["stat1-title"]);
    setText("stat1-text", t["stat1-text"]);
    setText("stat2-title", t["stat2-title"]);
    setText("stat2-text", t["stat2-text"]);
    setText("stat3-title", t["stat3-title"]);
    setText("stat3-text", t["stat3-text"]);

    // QUICK NAVIGATION
    setText("quick-navigation-title", t["quick-navigation-title"]);
    setText("nav-about", t["nav-about"]);
    setText("nav-heritage", t["nav-heritage"]);
    setText("nav-services", t["nav-services"]);
    setText("nav-why", t["nav-why"]);
    setText("nav-products", t["nav-products"]);
    setText("nav-contact", t["nav-contact"]);

    // ABOUT
    setText("about-title", t["about-title"]);

    for (let i = 1; i <= 6; i++) {
      setText(`about-card${i}-title`, t[`about-card${i}-title`]);
      setText(`about-card${i}-text`, t[`about-card${i}-text`]);
    }
// HERITAGE
    const heritageSection = document.querySelector("#heritage");

    if (heritageSection) {

      const heritageTitle = heritageSection.querySelector(".section-title");
      if (heritageTitle) {
        heritageTitle.innerHTML = t["heritage-title"];
      }

      const respect = heritageSection.querySelector(".respect-line");
      if (respect) {
        respect.innerHTML = t["heritage-respect"];
      }

      const founderName = heritageSection.querySelector(
        ".heritage-row:nth-child(1) .heritage-content h3"
      );
      if (founderName) {
        founderName.innerHTML = t["heritage-founder"];
      }

      const founderTitle = heritageSection.querySelector(
        ".heritage-row:nth-child(1) .heritage-content h4"
      );
      if (founderTitle) {
        founderTitle.innerHTML = t["heritage-founder-title"];
      }

      const founderParagraphs = heritageSection.querySelectorAll(
        ".heritage-row:nth-child(1) .heritage-content p"
      );

      if (founderParagraphs[0]) {
        founderParagraphs[0].innerHTML = t["heritage-founder-text"];
      }

      if (founderParagraphs[1]) {
        founderParagraphs[1].innerHTML = t["heritage-founder-quote"];
      }

      // INDIA CUSTODIANS
      const indiaCustodianRow = heritageSection.querySelector(
        ".heritage-row:nth-child(2)"
      );

      if (indiaCustodianRow) {

        const indiaHeading = indiaCustodianRow.querySelector(
          ".heritage-content h3"
        );

        if (indiaHeading) {
          indiaHeading.innerHTML = t["heritage-india-custodians"];
        }

        const indiaParagraphs = indiaCustodianRow.querySelectorAll(
          ".heritage-content p"
        );

        if (indiaParagraphs[0]) {
          indiaParagraphs[0].innerHTML = t["heritage-india-text"];
        }

        if (indiaParagraphs[1]) {
          indiaParagraphs[1].innerHTML = t["heritage-india-quote"];
        }
      }

      // INDIA CENTRE
      const indiaCentreRow = heritageSection.querySelector(
        ".heritage-row:nth-child(3)"
      );

      if (indiaCentreRow) {

        const imageTitle = indiaCentreRow.querySelector(".heritage-image h5");
        const imageLocation = indiaCentreRow.querySelector(".heritage-image span");

        const indiaHeading = indiaCentreRow.querySelector(
          ".heritage-content h3"
        );

        const indiaParagraphs = indiaCentreRow.querySelectorAll(
          ".heritage-content p"
        );

        if (imageTitle) {
          imageTitle.innerHTML = t["heritage-india-centre"];
        }

        if (imageLocation) {
          imageLocation.innerHTML = t["heritage-india-location"];
        }

        if (indiaHeading) {
          indiaHeading.innerHTML = t["heritage-india-heading"];
        }

        if (indiaParagraphs[0]) {
          indiaParagraphs[0].innerHTML = t["heritage-india-centre-text"];
        }

        if (indiaParagraphs[1]) {
          indiaParagraphs[1].innerHTML = t["heritage-india-centre-quote"];
        }
      }

      // USA CENTRE
      const usaRow = heritageSection.querySelector(
        ".heritage-row:nth-child(4)"
      );

      if (usaRow) {

        const people = usaRow.querySelectorAll(".person");

        if (people[0]) {
          const name = people[0].querySelector("h5");
          const location = people[0].querySelector("span");

          if (name) name.innerHTML = t["heritage-usa-centre"];
          if (location) location.innerHTML = t["heritage-usa-location"];
        }

        if (people[1]) {
          const name = people[1].querySelector("h5");
          const role = people[1].querySelector("span");

          if (name) name.innerHTML = t["heritage-usa-custodian"];
          if (role) role.innerHTML = t["heritage-usa-custodian-title"];
        }

        const usaHeading = usaRow.querySelector(
          ".heritage-content h3"
        );

        const usaParagraphs = usaRow.querySelectorAll(
          ".heritage-content p"
        );

        if (usaHeading) {
          usaHeading.innerHTML = t["heritage-usa-heading"];
        }

        if (usaParagraphs[0]) {
          usaParagraphs[0].innerHTML = t["heritage-usa-text"];
        }

        if (usaParagraphs[1]) {
          usaParagraphs[1].innerHTML = t["heritage-usa-quote"];
        }
      }

      const heritageButton = heritageSection.querySelector(
        ".heritage-btn .btn"
      );

      if (heritageButton) {
        heritageButton.innerHTML = t["heritage-explore"];
      }
    }
// SERVICES
    setText("services-title", t["services-title"]);

    for (let i = 1; i <= 6; i++) {
      setText(`service${i}-title`, t[`service${i}-title`]);
      setText(`service${i}-text`, t[`service${i}-text`]);
    }

    // WHY CHOOSE US
    setText("why-title", t["why-title"]);

    for (let i = 1; i <= 6; i++) {
      setText(`why${i}-title`, t[`why${i}-title`]);
      setText(`why${i}-text`, t[`why${i}-text`]);
    }

    // PRODUCTS
    setText("products-title", t["products-title"]);
    setText("product-title", t["product-title"]);
    setText("product-text", t["product-text"]);
    setText("product-btn", t["product-btn"]);

    // CONTACT
    setText("contact-title", t["contact-title"]);
    setText("contact1-title", t["contact1-title"]);
    setText("contact1-text", t["contact1-text"]);
    setText("contact2-title", t["contact2-title"]);
    setText("contact2-text", t["contact2-text"]);
    setText("contact3-title", t["contact3-title"]);

    // SOCIAL TITLES
    const email = document.querySelector(
      'a[href^="mailto:"]'
    );
    const instagram = document.querySelector(
      'a[href*="instagram.com"]'
    );
    const facebook = document.querySelector(
      'a[href*="facebook.com"]'
    );
    const youtube = document.querySelector(
      'a[href*="youtube.com"]'
    );
    const google = document.querySelector(
      'a[href*="share.google"]'
    );

    if (email) email.setAttribute("title", t["social-email"]);
    if (instagram) instagram.setAttribute("title", t["social-instagram"]);
    if (facebook) facebook.setAttribute("title", t["social-facebook"]);
    if (youtube) youtube.setAttribute("title", t["social-youtube"]);
    if (google) google.setAttribute("title", t["social-google"]);
// FOOTER
    setText("footer-title", t["footer-title"]);
    setText("footer-tagline", t["footer-tagline"]);
    setText("footer-trust", t["footer-trust"]);
    setText("footer-description", t["footer-description"]);
    setText("footer-copy", t["footer-copy"]);

    const footerLinks = document.querySelectorAll(".footer-links a");

    footerLinks.forEach(link => {

      const href = link.getAttribute("href");

      if (href === "privacy.html") {
        link.innerHTML = t["footer-privacy"];
      }

      if (href === "terms.html") {
        link.innerHTML = t["footer-terms"];
      }

      if (href === "disclaimer.html") {
        link.innerHTML = t["footer-disclaimer"];
      }

      if (href === "contact.html") {
        link.innerHTML = t["footer-contact"];
      }
    });

    // FLOATING BUTTONS
    const callButton = document.querySelector(".call-float");
    const whatsappButton = document.querySelector(".whatsapp-float");

    if (callButton) {
      callButton.setAttribute("title", t["float-call"]);
    }

    if (whatsappButton) {
      whatsappButton.setAttribute("title", t["float-whatsapp"]);
    }

    // IMAGE ALT TEXT
    setAttr(
      'img.hero-banner',
      "alt",
      t["hero-title"]
    );

    setAttr(
      'img[src="hussain-bapu.jpg"]',
      "alt",
      t["heritage-founder"]
    );

    setAttr(
      'img[src="mustafa.jpg"]',
      "alt",
      "Mr. Mustafa H. Shaikh"
    );

    setAttr(
      'img[src="kasim.jpg"]',
      "alt",
      "Mr. Kasim M. Shaikh"
    );

    setAttr(
      'img[src="india-darbar.png"]',
      "alt",
      t["heritage-india-centre"]
    );

    setAttr(
      'img[src="usa-darbar.jpg"]',
      "alt",
      t["heritage-usa-centre"]
    );

    setAttr(
      'img[src="sushilkumar.jpg"]',
      "alt",
      t["heritage-usa-custodian"]
    );

    // HTML LANGUAGE ATTRIBUTE
    document.documentElement.lang = lang;

    // SAVE LANGUAGE
    localStorage.setItem("hbw-language", lang);

    // ACTIVE BUTTON
    document.querySelectorAll(".language button").forEach(button => {
      button.classList.remove("active");
    });

    const activeButton = document.getElementById(`btn-${lang}`);

    if (activeButton) {
      activeButton.classList.add("active");
    }
  }
  // LANGUAGE BUTTONS
  const btnEn = document.getElementById("btn-en");
  const btnHi = document.getElementById("btn-hi");
  const btnGu = document.getElementById("btn-gu");

  if (btnEn) {
    btnEn.addEventListener("click", () => {
      applyLanguage("en");
    });
  }

  if (btnHi) {
    btnHi.addEventListener("click", () => {
      applyLanguage("hi");
    });
  }

  if (btnGu) {
    btnGu.addEventListener("click", () => {
      applyLanguage("gu");
    });
  }


  // APPLY SAVED / DEFAULT LANGUAGE
  applyLanguage(currentLanguage);

});
