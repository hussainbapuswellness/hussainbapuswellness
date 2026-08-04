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
    const templateParams = {
    appointment_id: id,
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    country: form.country.value,
    consultation: form.consultation.value,
    message: form.message.value
};

emailjs.send(
    "service_ogjealg",
    "template_5qi5r1b",
    templateParams
)
.then(function(response) {

    console.log("SUCCESS!", response.status, response.text);

    appointmentID.innerHTML = id;
    form.style.display = "none";
    successBox.style.display = "block";
    successBox.scrollIntoView({
        behavior: "smooth"
    });

})
.catch(function(error) {

    alert("Email sending failed.");
    console.log(error);

});

    appointmentID.innerHTML = id;

    form.style.display = "none";

    successBox.style.display = "block";

    successBox.scrollIntoView({
        behavior: "smooth"
    });

});
