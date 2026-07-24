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
