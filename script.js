document.addEventListener("DOMContentLoaded", function () {

  console.log("Language system loaded");

  const btnEn = document.getElementById("btn-en");
  const btnHi = document.getElementById("btn-hi");
  const btnGu = document.getElementById("btn-gu");

  function setText(id, text) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  }

  function setHTML(id, html) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    }
  }

  function applyLanguage(lang) {

    if (!translations[lang]) {
      lang = "en";
    }

    const t = translations[lang];

    setText("hero-title", t.heroTitle);
    setText("hero-subtitle", t.heroSubtitle);
    setText("hero-highlight", t.heroHighlight);
    setText("hero-line1", t.heroLine1);
    setText("hero-line2", t.heroLine2);
    setText("hero-line3", t.heroLine3);

    setText("quick-navigation-title", t.quickNavigation);

    setText("nav-about", t.navAbout);
    setText("nav-heritage", t.navHeritage);
    setText("nav-services", t.navServices);
    setText("nav-why", t.navWhy);
    setText("nav-products", t.navProducts);
    setText("nav-contact", t.navContact);

    setText("about-title", t.aboutTitle);

    setText("about-card1-title", t.aboutCard1Title);
    setText("about-card1-text", t.aboutCard1Text);

    setText("about-card2-title", t.aboutCard2Title);
    setText("about-card2-text", t.aboutCard2Text);

    setText("about-card3-title", t.aboutCard3Title);
    setText("about-card3-text", t.aboutCard3Text);

    setText("about-card4-title", t.aboutCard4Title);
    setText("about-card4-text", t.aboutCard4Text);

    setText("about-card5-title", t.aboutCard5Title);
    setText("about-card5-text", t.aboutCard5Text);

    setText("about-card6-title", t.aboutCard6Title);
    setText("about-card6-text", t.aboutCard6Text);

    setText("stat1-title", t.stat1Title);
    setText("stat1-text", t.stat1Text);

    setText("stat2-title", t.stat2Title);
    setText("stat2-text", t.stat2Text);

    setText("stat3-title", t.stat3Title);
    setText("stat3-text", t.stat3Text);

    setText("services-title", t.servicesTitle);

    setText("service1-title", t.service1Title);
    setText("service1-text", t.service1Text);

    setText("service2-title", t.service2Title);
    setText("service2-text", t.service2Text);

    setText("service3-title", t.service3Title);
    setText("service3-text", t.service3Text);

    setText("service4-title", t.service4Title);
    setText("service4-text", t.service4Text);

    setText("service5-title", t.service5Title);
    setText("service5-text", t.service5Text);

    setText("service6-title", t.service6Title);
    setText("service6-text", t.service6Text);

    setText("why-title", t.whyTitle);

    setText("why1-title", t.why1Title);
    setText("why1-text", t.why1Text);

    setText("why2-title", t.why2Title);
    setText("why2-text", t.why2Text);

    setText("why3-title", t.why3Title);
    setText("why3-text", t.why3Text);

    setText("why4-title", t.why4Title);
    setText("why4-text", t.why4Text);

    setText("why5-title", t.why5Title);
    setText("why5-text", t.why5Text);

    setText("why6-title", t.why6Title);
    setText("why6-text", t.why6Text);

    setText("products-title", t.productsTitle);
    setText("product-title", t.productTitle);
    setText("product-text", t.productText);
    setText("product-btn", t.productBtn);

    setText("contact-title", t.contactTitle);

    setText("contact1-title", t.contact1Title);
    setHTML("contact1-text", t.contact1Text);

    setText("contact2-title", t.contact2Title);
    setHTML("contact2-text", t.contact2Text);

    setText("contact3-title", t.contact3Title);

    setText("footer-title", t.footerTitle);
    setText("footer-tagline", t.footerTagline);
    setText("footer-trust", t.footerTrust);
    setText("footer-description", t.footerDescription);
    setText("footer-copy", t.footerCopy);

    localStorage.setItem("hbw-language", lang);

    document.documentElement.lang = lang;

    updateLanguageButtons(lang);

    console.log("Language applied:", lang);
  }

  function updateLanguageButtons(lang) {

    [btnEn, btnHi, btnGu].forEach(function (button) {
      if (button) {
        button.classList.remove("active");
      }
    });

    if (lang === "en" && btnEn) {
      btnEn.classList.add("active");
    }

    if (lang === "hi" && btnHi) {
      btnHi.classList.add("active");
    }

    if (lang === "gu" && btnGu) {
      btnGu.classList.add("active");
    }
  }

  if (btnEn) {
    btnEn.addEventListener("click", function () {
      applyLanguage("en");
    });
  }

  if (btnHi) {
    btnHi.addEventListener("click", function () {
      applyLanguage("hi");
    });
  }

  if (btnGu) {
    btnGu.addEventListener("click", function () {
      applyLanguage("gu");
    });
  }

  const savedLanguage = localStorage.getItem("hbw-language");

  if (savedLanguage && translations[savedLanguage]) {
    applyLanguage(savedLanguage);
  } else {
    applyLanguage("en");
  }

});￼Enternt.addEventListener("DOMContentLoaded", function () {

  console.log("Language system loaded");

  const btnEn = document.getElementById("btn-en");
  const btnHi = document.getElementById("btn-hi");
  const btnGu = document.getElementById("btn-gu");

  function setText(id, text) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  }

  function setHTML(id, html) {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    }
  }

  function applyLanguage(lang) {

    if (!translations[lang]) {
      lang = "en";
    }

    const t = translations[lang];

    setText("hero-title", t.heroTitle);
    setText("hero-subtitle", t.heroSubtitle);
    setText("hero-highlight", t.heroHighlight);
    setText("hero-line1", t.heroLine1);
    setText("hero-line2", t.heroLine2);
    setText("hero-line3", t.heroLine3);

    setText("quick-navigation-title", t.quickNavigation);

    setText("nav-about", t.navAbout);
    setText("nav-heritage", t.navHeritage);
    setText("nav-services", t.navServices);
    setText("nav-why", t.navWhy);
    setText("nav-products", t.navProducts);
    setText("nav-contact", t.navContact);

    setText("about-title", t.aboutTitle);

    setText("about-card1-title", t.aboutCard1Title);
    setText("about-card1-text", t.aboutCard1Text);

    setText("about-card2-title", t.aboutCard2Title);
    setText("about-card2-text", t.aboutCard2Text);

    setText("about-card3-title", t.aboutCard3Title);
    setText("about-card3-text", t.aboutCard3Text);

    setText("about-card4-title", t.aboutCard4Title);
    setText("about-card4-text", t.aboutCard4Text);

    setText("about-card5-title", t.aboutCard5Title);
    setText("about-card5-text", t.aboutCard5Text);

    setText("about-card6-title", t.aboutCard6Title);
    setText("about-card6-text", t.aboutCard6Text);

    setText("stat1-title", t.stat1Title);
    setText("stat1-text", t.stat1Text);

    setText("stat2-title", t.stat2Title);
    setText("stat2-text", t.stat2Text);

    setText("stat3-title", t.stat3Title);
    setText("stat3-text", t.stat3Text);

    setText("services-title", t.servicesTitle);

    setText("service1-title", t.service1Title);
    setText("service1-text", t.service1Text);

    setText("service2-title", t.service2Title);
    setText("service2-text", t.service2Text);

    setText("service3-title", t.service3Title);
    setText("service3-text", t.service3Text);
      
    setText("service4-title", t.service4Title);
    setText("service4-text", t.service4Text);

    setText("service5-title", t.service5Title);
    setText("service5-text", t.service5Text);

    setText("service6-title", t.service6Title);
    setText("service6-text", t.service6Text);

    setText("why-title", t.whyTitle);

    setText("why1-title", t.why1Title);
    setText("why1-text", t.why1Text);

    setText("why2-title", t.why2Title);
    setText("why2-text", t.why2Text);

    setText("why3-title", t.why3Title);
    setText("why3-text", t.why3Text);

    setText("why4-title", t.why4Title);
    setText("why4-text", t.why4Text);

    setText("why5-title", t.why5Title);
    setText("why5-text", t.why5Text);

    setText("why6-title", t.why6Title);
    setText("why6-text", t.why6Text);

    setText("products-title", t.productsTitle);
    setText("product-title", t.productTitle);
    setText("product-text", t.productText);
    setText("product-btn", t.productBtn);

    setText("contact-title", t.contactTitle);

    setText("contact1-title", t.contact1Title);
    setHTML("contact1-text", t.contact1Text);

    setText("contact2-title", t.contact2Title);
    setHTML("contact2-text", t.contact2Text);

    setText("contact3-title", t.contact3Title);

    setText("footer-title", t.footerTitle);
    setText("footer-tagline", t.footerTagline);
    setText("footer-trust", t.footerTrust);
    setText("footer-description", t.footerDescription);
    setText("footer-copy", t.footerCopy);

    localStorage.setItem("hbw-language", lang);

    document.documentElement.lang = lang;

    updateLanguageButtons(lang);

    console.log("Language applied:", lang);
  }

  function updateLanguageButtons(lang) {

    [btnEn, btnHi, btnGu].forEach(function (button) {
      if (button) {
        button.classList.remove("active");
      }
    });

    if (lang === "en" && btnEn) {
      btnEn.classList.add("active");
    }

    if (lang === "hi" && btnHi) {
      btnHi.classList.add("active");
    }

    if (lang === "gu" && btnGu) {
      btnGu.classList.add("active");
    }
  }

  if (btnEn) {
    btnEn.addEventListener("click", function () {
      applyLanguage("en");
    });
  }

  if (btnHi) {
    btnHi.addEventListener("click", function () {
      applyLanguage("hi");
    });
  }

  if (btnGu) {
    btnGu.addEventListener("click", function () {
      applyLanguage("gu");
    });
  }

  const savedLanguage = localStorage.getItem("hbw-language");

  if (savedLanguage && translations[savedLanguage]) {
    applyLanguage(savedLanguage);
  } else {
    applyLanguage("en");
  }

});
