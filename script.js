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
document.querySelector("#about .cards .card:nth-child(1) h3").textContent = translations[lang].aboutCard1Title;
document.querySelector("#about .cards .card:nth-child(1) p").textContent = translations[lang].aboutCard1Text;

document.querySelector("#about .cards .card:nth-child(2) h3").textContent = translations[lang].aboutCard2Title;
document.querySelector("#about .cards .card:nth-child(2) p").textContent = translations[lang].aboutCard2Text;

document.querySelector("#about .cards .card:nth-child(3) h3").textContent = translations[lang].aboutCard3Title;
document.querySelector("#about .cards .card:nth-child(3) p").textContent = translations[lang].aboutCard3Text;

document.querySelector("#about .cards .card:nth-child(4) h3").textContent = translations[lang].aboutCard4Title;
document.querySelector("#about .cards .card:nth-child(4) p").textContent = translations[lang].aboutCard4Text;

document.querySelector("#about .cards .card:nth-child(5) h3").textContent = translations[lang].aboutCard5Title;
document.querySelector("#about .cards .card:nth-child(5) p").textContent = translations[lang].aboutCard5Text;

document.querySelector("#about .cards .card:nth-child(6) h3").textContent = translations[lang].aboutCard6Title;
document.querySelector("#about .cards .card:nth-child(6) p").textContent = translations[lang].aboutCard6Text;
  document.getElementById("hero-highlight").textContent = translations[lang].heroHighlight;

document.getElementById("hero-line1").textContent = translations[lang].heroLine1;

document.getElementById("hero-line2").textContent = translations[lang].heroLine2;

document.getElementById("hero-line3").textContent = translations[lang].heroLine3;

document.getElementById("stat1-title").textContent = translations[lang].stat1Title;
document.getElementById("stat1-text").textContent = translations[lang].stat1Text;

document.getElementById("stat2-title").textContent = translations[lang].stat2Title;
document.getElementById("stat2-text").textContent = translations[lang].stat2Text;

document.getElementById("stat3-title").textContent = translations[lang].stat3Title;
document.getElementById("stat3-text").textContent = translations[lang].stat3Text;
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
  
const savedLanguage = localStorage.getItem("language") || "en";
applyLanguage(savedLanguage);
});  
