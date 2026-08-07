const params = new URLSearchParams(window.location.search);

const appointmentId = params.get("id");

async function loadMureed() {

    const { data, error } = await supabaseClient

        .from("clients")

        .select("*")

        .eq("Appointment_Id", appointmentId)

        .single();

    if (error) {

        console.log(error);

        alert("Mureed Not Found");

        return;

    }

    document.getElementById("Appointment_Id").innerHTML = data.Appointment_Id;
    document.getElementById("Full_Name").innerHTML = data.Full_Name;
    document.getElementById("Mobile").innerHTML = data.Mobile;
    document.getElementById("Whatsapp").innerHTML = data.Whatsapp;
    document.getElementById("Email").innerHTML = data.Email;
    document.getElementById("Age").innerHTML = data.Age;
    document.getElementById("Gender").innerHTML = data.Gender;
    document.getElementById("Country").innerHTML = data.Country;
    document.getElementById("State").innerHTML = data.State;
    document.getElementById("City").innerHTML = data.City;
    document.getElementById("Consultation_Type").innerHTML = data.Consultation_Type;
    document.getElementById("Problem_Category").innerHTML = data.Problem_Category;
    document.getElementById("Problem_Short_Description").innerHTML = data.Problem_Short_Description;
    document.getElementById("Appointment_Status").innerHTML = data.Appointment_Status;

}

loadMureed();
document
.getElementById("addTreatmentBtn")
.addEventListener("click", function () {

alert("Treatment Manager Coming...");

});
