document.addEventListener("DOMContentLoaded", () => {

console.log("Language system loaded");
  
const btnEn = document.getElementById("btn-en");
const btnHi = document.getElementById("btn-hi");
const btnGu = document.getElementById("btn-gu");

function applyLanguage(lang){

document.getElementById("hero-title").textContent =
translations[lang].heroTitle;

document.getElementById("hero-subtitle").textContent =
translations[lang].heroSubtitle;

document.getElementById("quick-navigation-title").textContent =
translations[lang].quickNavigation;
document.getElementById("about-title").textContent = translations[lang].aboutTitle;
document.getElementById("services-title").textContent = translations[lang].servicesTitle;
document.getElementById("why-title").textContent = translations[lang].whyTitle;
document.getElementById("story-title").textContent = translations[lang].storyTitle;
document.getElementById("products-title").textContent = translations[lang].productsTitle;
document.getElementById("global-title").textContent = translations[lang].globalTitle;
document.getElementById("presence-title").textContent = translations[lang].presenceTitle;
document.getElementById("contact-title").textContent = translations[lang].contactTitle;
}

btnEn.addEventListener("click",()=>{

applyLanguage("en");

});

btnHi.addEventListener("click",()=>{

applyLanguage("hi");

});

btnGu.addEventListener("click",()=>{

applyLanguage("gu");

});
});
const savedLanguage = localStorage.getItem("language") || "en";
applyLanguage(savedLanguage);
