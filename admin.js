async function loadMureeds() {

const { data, error } = await supabaseClient

.from("clients")

.select("*")

if (error) {
    console.log(error);
    alert(JSON.stringify(error));
    return;
}
alert(JSON.stringify(data));
document.getElementById("totalMureeds").innerHTML = data.length;

let pending = data.filter(x => x.Appointment_Status == "Pending");

document.getElementById("pendingAppointments").innerHTML = pending.length;

const tbody = document.querySelector("#mureedsTable tbody");

tbody.innerHTML = "";

data.forEach(mureed => {

tbody.innerHTML += `

<tr>

<td>${mureed.Appointment_Id}</td>

<td>${mureed.Full_Name}</td>

<td>${mureed.Mobile}</td>

<td>${mureed.Appointment_Status}</td>

<td>

<button onclick="window.location.href='mureed.html?id=${mureed.Appointment_Id}'">

Open

</button>

</td>

</tr>

`;

});

}

loadMureeds();
