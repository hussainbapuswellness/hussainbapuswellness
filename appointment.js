// =============================
// EmailJS Initialization
// =============================
emailjs.init({
    publicKey: "Dyu-RHERtn1dLFfzS"
});

// =============================
// Appointment System
// =============================

const form = document.getElementById("appointmentForm");
const successBox = document.getElementById("successBox");
const appointmentID = document.getElementById("appointmentID");

function generateAppointmentID() {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `HBW-${year}-${random}`;
}

form.addEventListener("submit", async function (e) {

    e.preventDefault();
    const appointmentId = generateAppointmentID();

const appointmentData = {
const { data, error } = await supabaseClient
    .from("clients")
    .insert([appointmentData]);

if (error) {
    console.error(error);
    alert("❌ Appointment save nahi hui. Please try again.");
    return;
}

appointment_id: appointmentId,

full_name: form.name.value,

mobile: form.mobile.value,

whatsapp: form.whatsapp.value,

email: form.email.value,

age: parseInt(form.age.value),

gender: form.gender.value,

country: form.country.value,

state: form.state.value,

city: form.city.value,

consultation_type: form.consultationType.value,

problem_category: form.problemCategory.value,

problem: form.problem.value

};

    const id = generateAppointmentID();

    const templateParams = {
        appointment_id: id,

        name: form.name.value,
        mobile: form.mobile.value,
        whatsapp: form.whatsapp.value,
        email: form.email.value,

        age: form.age.value,
        gender: form.gender.value,

        country: form.country.value,
        state: form.state.value,
        city: form.city.value,

        consultation_type: form.consultationType.value,
        problem_category: form.problemCategory.value,
        problem: form.problem.value
    };

    emailjs.send(
        "service_ogjealg",
        "template_5qi5r1b",
        templateParams
    )

    .then(function () {

        appointmentID.innerHTML = appointmentId;

        form.style.display = "none";
        successBox.style.display = "block";

        successBox.scrollIntoView({
            behavior: "smooth"
        });

    })

    .catch(function (error) {

        console.error(error);

        alert("❌ Email sending failed. Please try again.");

    });

});
