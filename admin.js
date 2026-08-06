async function loadPatients() {

const { data, error } = await supabaseClient

.from("clients")

.select("*")

if (error) {
    console.log(error);
    alert(JSON.stringify(error));
    return;
}
alert(JSON.stringify(data));
document.getElementById("totalPatients").innerHTML = data.length;

let pending = data.filter(x => x.Appointment_Status == "Pending");

document.getElementById("pendingAppointments").innerHTML = pending.length;

const tbody = document.querySelector("#patientsTable tbody");

tbody.innerHTML = "";

data.forEach(patient => {

tbody.innerHTML += `

<tr>

<td>${patient.Appointment_Id}</td>

<td>${patient.Full_Name}</td>

<td>${patient.Mobile}</td>

<td>${patient.Appointment_Status}</td>

<td>

<button>

Open

</button>

</td>

</tr>

`;

});

}

loadPatients();
