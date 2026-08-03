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
  document.getElementById("service1-title").textContent = translations[lang].service1Title;
document.getElementById("service1-text").textContent = translations[lang].service1Text;

document.getElementById("service2-title").textContent = translations[lang].service2Title;
document.getElementById("service2-text").textContent = translations[lang].service2Text;

document.getElementById("service3-title").textContent = translations[lang].service3Title;
document.getElementById("service3-text").textContent = translations[lang].service3Text;

document.getElementById("service4-title").textContent = translations[lang].service4Title;
document.getElementById("service4-text").textContent = translations[lang].service4Text;

document.getElementById("service5-title").textContent = translations[lang].service5Title;
document.getElementById("service5-text").textContent = translations[lang].service5Text;

document.getElementById("service6-title").textContent = translations[lang].service6Title;
document.getElementById("service6-text").textContent = translations[lang].service6Text;
document.getElementById("why1-title").textContent = translations[lang].why1Title;
document.getElementById("why1-text").textContent = translations[lang].why1Text;

document.getElementById("why2-title").textContent = translations[lang].why2Title;
document.getElementById("why2-text").textContent = translations[lang].why2Text;

document.getElementById("why3-title").textContent = translations[lang].why3Title;
document.getElementById("why3-text").textContent = translations[lang].why3Text;

document.getElementById("why4-title").textContent = translations[lang].why4Title;
document.getElementById("why4-text").textContent = translations[lang].why4Text;

document.getElementById("why5-title").textContent = translations[lang].why5Title;
document.getElementById("why5-text").textContent = translations[lang].why5Text;

document.getElementById("why6-title").textContent = translations[lang].why6Title;
document.getElementById("why6-text").textContent = translations[lang].why6Text;
document.getElementById("nav-about").textContent = translations[lang].navAbout;
document.getElementById("nav-services").textContent = translations[lang].navServices;
document.getElementById("nav-why").textContent = translations[lang].navWhy;
document.getElementById("nav-story").textContent = translations[lang].navStory;
document.getElementById("nav-products").textContent = translations[lang].navProducts;
document.getElementById("nav-global").textContent = translations[lang].navGlobal;
document.getElementById("nav-presence").textContent = translations[lang].navPresence;
document.getElementById("nav-contact").textContent = translations[lang].navContact;
document.getElementById("story1-title").textContent = translations[lang].story1Title;
document.getElementById("story1-text").textContent = translations[lang].story1Text;

document.getElementById("story2-title").textContent = translations[lang].story2Title;
document.getElementById("story2-text").textContent = translations[lang].story2Text;

document.getElementById("story3-title").textContent = translations[lang].story3Title;
document.getElementById("story3-text").textContent = translations[lang].story3Text;

document.getElementById("story4-title").textContent = translations[lang].story4Title;
document.getElementById("story4-text").textContent = translations[lang].story4Text;

document.getElementById("story5-title").textContent = translations[lang].story5Title;
document.getElementById("story5-text").textContent = translations[lang].story5Text;

document.getElementById("story6-title").textContent = translations[lang].story6Title;
document.getElementById("story6-text").textContent = translations[lang].story6Text;

document.getElementById("story7-title").textContent = translations[lang].story7Title;
document.getElementById("story7-text").textContent = translations[lang].story7Text;
document.getElementById("product-title").textContent = translations[lang].productTitle;
document.getElementById("product-text").textContent = translations[lang].productText;
document.getElementById("product-btn").textContent = translations[lang].productBtn;
document.getElementById("global1-title").textContent = translations[lang].global1Title;
document.getElementById("global1-text").textContent = translations[lang].global1Text;

document.getElementById("global2-title").textContent = translations[lang].global2Title;
document.getElementById("global2-text").textContent = translations[lang].global2Text;

document.getElementById("global3-title").textContent = translations[lang].global3Title;
document.getElementById("global3-text").textContent = translations[lang].global3Text;

document.getElementById("global4-title").textContent = translations[lang].global4Title;
document.getElementById("global4-text").textContent = translations[lang].global4Text;
document.getElementById("presence1-title").textContent = translations[lang].presence1Title;
document.getElementById("presence1-text").textContent = translations[lang].presence1Text;

document.getElementById("presence2-title").textContent = translations[lang].presence2Title;
document.getElementById("presence2-text").textContent = translations[lang].presence2Text;

document.getElementById("presence3-title").textContent = translations[lang].presence3Title;
document.getElementById("presence3-text").textContent = translations[lang].presence3Text;
document.getElementById("contact1-title").textContent = translations[lang].contact1Title;
document.getElementById("contact1-text").innerText = translations[lang].contact1Text;

document.getElementById("contact2-title").textContent = translations[lang].contact2Title;
document.getElementById("contact2-text").innerText = translations[lang].contact2Text;

document.getElementById("contact3-title").textContent = translations[lang].contact3Title;
document.getElementById("footer-title").textContent = translations[lang].footerTitle;
document.getElementById("footer-tagline").textContent = translations[lang].footerTagline;
document.getElementById("footer-trust").textContent = translations[lang].footerTrust;
document.getElementById("footer-description").textContent = translations[lang].footerDescription;
document.getElementById("footer-copy").textContent = translations[lang].footerCopy;
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
const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm){

appointmentForm.addEventListener("submit",function(){

appointmentForm.style.display="none";

document.getElementById("successBox").style.display="block";

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}
