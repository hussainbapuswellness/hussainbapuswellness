// =============================
// EmailJS Initialization
// =============================

emailjs.init({
    publicKey: "Dyu-RHERtn1dLFfzS"
});
// =============================
// Hussain Bapu's Wellness
// Appointment System
// =============================

const form = document.getElementById("appointmentForm");
const successBox = document.getElementById("successBox");
const appointmentID = document.getElementById("appointmentID");

function generateAppointmentID() {

    const now = new Date();

    const year = now.getFullYear();

    const random = Math.floor(100000 + Math.random() * 900000);

    return `HBW-${year}-${random}`;

}

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const id = generateAppointmentID();

    appointmentID.innerHTML = id;

    form.style.display = "none";

    successBox.style.display = "block";

    successBox.scrollIntoView({
        behavior: "smooth"
    });

});
