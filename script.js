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
document.querySelector("#about .section-title").textContent = translations[lang].aboutTitle;
document.querySelector("#services .section-title").textContent = translations[lang].servicesTitle;
document.querySelector("#why .section-title").textContent = translations[lang].whyTitle;
document.querySelector("#story .section-title").textContent = translations[lang].storyTitle;
document.querySelector("#products .section-title").textContent = translations[lang].productsTitle;
document.querySelector("#global .section-title").textContent = translations[lang].globalTitle;
document.querySelector("#presence .section-title").textContent = translations[lang].presenceTitle;
document.querySelector("#contact .section-title").textContent = translations[lang].contactTitle;
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
