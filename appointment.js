// =============================
// EmailJS Initialization
// =============================
emailjs.init({
    publicKey: "Dyu-RHERtn1dLFfzS"
});

// =============================
// Supabase Initialization
// =============================
const SUPABASE_URL = "https://rvejfommdzfdkwfgsqad.supabase.co";
const SUPABASE_KEY = "sb_publishable_hleB_4JlNlCjiVqnd2uQuQ_HjioxhiD";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

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

        Appointment_Id: appointmentId,
        Full_Name: form.name.value,
        Mobile: form.mobile.value,
        Whatsapp: form.whatsapp.value,
        Email: form.email.value,
        Age: parseInt(form.age.value),
        Gender: form.gender.value,
        Country: form.country.value,
        State: form.state.value,
        City: form.city.value,
        Consultation_Type: form.consultationType.value,
        Problem_Category: form.problemCategory.value,
        Problem_Short_Description: form.problem.value,
        Appointment_Status: "Pending"

    };

    const { error } = await supabaseClient
        .from("clients")
        .insert([appointmentData]);

    if (error) {
        console.error(error);
        alert("Database Error");
        return;
    }

    const templateParams = {

        appointment_id: appointmentId,

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

    .catch(function (err) {

        console.error(err);

        alert("Email Sending Failed");

    });

});
