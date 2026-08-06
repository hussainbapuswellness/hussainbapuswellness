// ======================================
// Hussain Bapu's Wellness
// Appointment System (Phase-1)
// ======================================

// Elements
const form = document.getElementById("appointmentForm");
const successBox = document.getElementById("successBox");
const appointmentID = document.getElementById("appointmentID");

// Appointment ID Generator
function generateAppointmentID() {

    const year = new Date().getFullYear();

    const random = Math.floor(
        100000 + Math.random() * 900000
    );

    return `HBW-${year}-${random}`;

}

// Form Submit
form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const appointmentId = generateAppointmentID();

    const appointmentData = {

        Appointment_Id: appointmentId,

        Full_Name: form.name.value.trim(),

        Mobile: form.mobile.value.trim(),

        Whatsapp: form.whatsapp.value.trim(),

        Email: form.email.value.trim(),

        Age: Number(form.age.value),

        Gender: form.gender.value,

        Country: form.country.value.trim(),

        State: form.state.value.trim(),

        City: form.city.value.trim(),

        Consultation_Type: form.consultationType.value,

        Problem_Category: form.problemCategory.value,

        Problem_Short_Description: form.problem.value.trim(),

        Appointment_Status: "Pending"

    };
    // Save Appointment in Supabase

    const { data, error } = await supabaseClient

        .from("clients")

        .insert([appointmentData]);

    if (error) {

        console.error("Supabase Error :", error);

        alert("❌ Appointment Save Failed");

        return;

    }

    // Success Screen

    appointmentID.innerHTML = appointmentId;

    form.reset();

    form.style.display = "none";

    successBox.style.display = "block";

    successBox.scrollIntoView({

        behavior: "smooth"

    });

});
// ======================================
// Simple Console Messages
// ======================================

console.log("=================================");
console.log("Hussain Bapu's Wellness");
console.log("Appointment System Loaded");
console.log("Supabase Connected");
console.log("=================================");
