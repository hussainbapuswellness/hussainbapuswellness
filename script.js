document.addEventListener("DOMContentLoaded", () => {

console.log("Language system loaded");
  
const btnEn = document.getElementById("btn-en");
const btnHi = document.getElementById("btn-hi");
const btnGu = document.getElementById("btn-gu");

btnEn.addEventListener("click", () => {
    alert("English Selected");
});

btnHi.addEventListener("click", () => {
    alert("हिन्दी चुनी गई");
});

btnGu.addEventListener("click", () => {
    alert("ગુજરાતી પસંદ કરવામાં આવી");
});
});
