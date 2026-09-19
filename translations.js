document.addEventListener("DOMContentLoaded", () => {

    console.log("Language system loaded");

    const btnEn = document.getElementById("btn-en");
    const btnHi = document.getElementById("btn-hi");
    const btnGu = document.getElementById("btn-gu");

    // Safely update an element only if it exists
    function setText(id, value, useInnerText = false) {
        const element = document.getElementById(id);

        if (!element || value === undefined || value === null) {
            return;
        }

        if (useInnerText) {
            element.innerText = value;
        } else {
            element.textContent = value;
        }
    }

    function applyLanguage(lang) {

        // Safety fallback
        if (!translations[lang]) {
            lang = "en";
        }

        const t = translations[lang];

        // =========================
        // HERO
        // =========================

        setText("hero-title", t.heroTitle);
        setText("hero-subtitle", t.heroSubtitle);
        setText("hero-highlight", t.heroHighlight);
        setText("hero-line1", t.heroLine1);
        setText("hero-line2", t.heroLine2);
        setText("hero-line3", t.heroLine3);

        // =========================
        // QUICK NAVIGATION
        // =========================

        setText("quick-navigation-title", t.quickNavigation);

        // =========================
        // ABOUT
        // =========================

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

        // =========================
        // STATS
        // =========================

        setText("stat1-title", t.stat1Title);
        setText("stat1-text", t.stat1Text);

        setText("stat2-title", t.stat2Title);
        setText("stat2-text", t.stat2Text);

        setText("stat3-title", t.stat3Title);
        setText("stat3-text", t.stat3Text);

        // =========================
        // SERVICES
        // =========================

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

        // =========================
        // WHY CHOOSE US
        // =========================

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

        // =========================
        // PRODUCTS
        // =========================

        setText("products-title", t.productsTitle);
        setText("product-title", t.productTitle);
        setText("product-text", t.productText);
        setText("product-btn", t.productBtn);

        // =========================
        // CONTACT
        // =========================

        setText("contact-title", t.contactTitle);

        setText("contact1-title", t.contact1Title);
        setText("contact1-text", t.contact1Text, true);

        setText("contact2-title", t.contact2Title);
        setText("contact2-text", t.contact2Text, true);

        setText("contact3-title", t.contact3Title);

        // =========================
        // FOOTER
        // =========================

        setText("footer-title", t.footerTitle);
        setText("footer-tagline", t.footerTagline);
        setText("footer-trust", t.footerTrust);
        setText("footer-description", t.footerDescription);
        setText("footer-copy", t.footerCopy);

        // =========================
        // NAVIGATION
        // =========================

        setText("nav-about", t.navAbout);
        setText("nav-services", t.navServices);
        setText("nav-why", t.navWhy);
        setText("nav-products", t.navProducts);
        setText("nav-contact", t.navContact);

        // Existing heritage navigation
        setText("nav-heritage", t.navStory);

        // Save selected language
        localStorage.setItem("language", lang);

        console.log("Language applied:", lang);
    }


    // =========================
    // LANGUAGE BUTTONS
    // =========================

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


    // =========================
    // LOAD SAVED LANGUAGE
    // =========================

    const savedLanguage = localStorage.getItem("language") || "en";

    applyLanguage(savedLanguage);

});


// =====================================================
// APPOINTMENT FORM
// =====================================================

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {

    appointmentForm.addEventListener("submit", function () {

        const randomID =
            "HBW-2026-" +
            Math.floor(100000 + Math.random() * 900000);

        const appointmentID = document.getElementById("appointmentID");
        const successBox = document.getElementById("successBox");

        if (appointmentID) {
            appointmentID.innerHTML = randomID;
        }

        appointmentForm.style.display = "none";

        if (successBox) {
            successBox.style.display = "block";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
