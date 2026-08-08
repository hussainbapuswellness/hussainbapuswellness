const params = new URLSearchParams(window.location.search);

const appointmentId = params.get("id");

let currentMureed = null;


// ===============================
// LOAD MUREED
// ===============================

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


    currentMureed = data;


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


    loadTreatmentHistory();

}


// ===============================
// LOAD TREATMENT HISTORY
// ===============================

async function loadTreatmentHistory() {

    const historyBox = document.getElementById("treatmentHistory");


    historyBox.innerHTML = "<p>Loading Treatment History...</p>";


    const { data, error } = await supabaseClient

        .from("Mureed_Treatment_History")

        .select("*")

        .eq("Mureed_Id", currentMureed.id)

        .order("Created_At", { ascending: false });


    if (error) {

        console.log(error);

        historyBox.innerHTML = "<p>Unable to load Treatment History.</p>";

        return;

    }


    if (!data || data.length === 0) {

        historyBox.innerHTML = "<p>No Treatment Added Yet.</p>";

        return;

    }


    historyBox.innerHTML = "";


    data.forEach(treatment => {

        const date = treatment.Created_At
            ? new Date(treatment.Created_At).toLocaleString()
            : "";


        historyBox.innerHTML += `

        <div class="card treatment-record">

            <h3>${treatment.Treatment_Type || ""}</h3>

            <p>
                <b>Category:</b>
                ${treatment.Category || "-"}
            </p>

            <p>
                <b>Item:</b>
                ${treatment.Item_Name || "-"}
            </p>

            <p>
                <b>Notes:</b>
                ${treatment.Notes || "-"}
            </p>

            ${
                treatment.Image_Url
                ?
                `<p>
                    <b>Taweez Image:</b><br>
                    <img
                    src="${treatment.Image_Url}"
                    style="max-width:180px;margin-top:8px;border-radius:8px;">
                </p>`
                :
                ""
            }

            <small>
                Added: ${date}
            </small>

        </div>

        <br>

        `;

    });

}


// ===============================
// ADD TREATMENT BUTTON
// ===============================

document
.getElementById("addTreatmentBtn")
.addEventListener("click", function () {

    document.getElementById("treatmentForm").style.display = "block";

});


document
.getElementById("cancelTreatmentBtn")
.addEventListener("click", function () {

    document.getElementById("treatmentForm").style.display = "none";

});


document
.getElementById("saveTreatmentBtn")
.addEventListener("click", async function () {

    const treatmentType =
        document.getElementById("Treatment_Type").value;

    const category =
        document.getElementById("Category").value;

    const itemName =
        document.getElementById("Item_Name").value;

    const notes =
        document.getElementById("Notes").value;


    if (!treatmentType || !itemName) {

        alert("Please select Treatment Type and enter Item Name.");

        return;

    }


    const { data, error } = await supabaseClient

        .from("Mureed_Treatment_History")

        .insert([{

            Appointment_Id: appointmentId,

            Treatment_Type: treatmentType,

            Category: category,

            Item_Name: itemName,

            Notes: notes

        }])

        .select();


    if (error) {

        console.log(error);

        alert(
            "TREATMENT SAVE ERROR\n\n" +
            "Code: " + error.code +
            "\n\nMessage: " + error.message
        );

        return;

    }


    alert("✅ Treatment Saved Successfully");


    document.getElementById("Treatment_Type").value = "";
    document.getElementById("Category").value = "";
    document.getElementById("Item_Name").value = "";
    document.getElementById("Notes").value = "";


    document.getElementById("treatmentForm").style.display = "none";


    loadTreatmentHistory();

});
async function loadTreatmentHistory() {

    const { data, error } = await supabaseClient

        .from("Mureed_Treatment_History")

        .select("*")

        .eq("Appointment_Id", appointmentId)

        .order("Created_At", { ascending: false });


    if (error) {

        console.log(error);

        return;

    }


    const treatmentHistory =
        document.getElementById("treatmentHistory");


    if (!data || data.length === 0) {

        treatmentHistory.innerHTML =
            "<p>No Treatment Added Yet</p>";

        return;

    }


    treatmentHistory.innerHTML = "";


    data.forEach(function (treatment) {

        const card = document.createElement("div");

        card.className = "card";

        card.style.marginBottom = "15px";


        card.innerHTML = `

            <h3>${treatment.Treatment_Type || ""}</h3>

            <p>
                <b>Category:</b>
                ${treatment.Category || ""}
            </p>

            <p>
                <b>Item:</b>
                ${treatment.Item_Name || ""}
            </p>

            <p>
                <b>Notes:</b>
                ${treatment.Notes || ""}
            </p>

        `;


        treatmentHistory.appendChild(card);

    });

}

loadTreatmentHistory();


// ===============================
// TREATMENT FORM
// ===============================

function openTreatmentForm() {

    const treatmentType = prompt(
        "Treatment Type likho:\n\nTaweez\nHerbal\nWazifa"
    );


    if (!treatmentType) {

        return;

    }


    const category = prompt(
        "Category likho:"
    );


    const itemName = prompt(
        "Item / Taweez / Herbal / Wazifa ka naam likho:"
    );


    const notes = prompt(
        "Treatment Notes likho:"
    );


    saveTreatment(
        treatmentType,
        category,
        itemName,
        notes
    );

}


// ===============================
// SAVE TREATMENT
// ===============================

async function saveTreatment(
    treatmentType,
    category,
    itemName,
    notes
) {


    if (!currentMureed) {

        alert("Mureed information not loaded.");

        return;

    }


    const { data, error } = await supabaseClient

        .from("Mureed_Treatment_History")

        .insert([{

            Mureed_Id: currentMureed.id,

            Appointment_Id: currentMureed.Appointment_Id,

            Treatment_Type: treatmentType,

            Category: category,

            Item_Name: itemName,

            Notes: notes,

            Image_Url: null,

            Print_Crop: null

        }])

        .select();


    if (error) {

    console.log("TREATMENT SAVE ERROR:", error);

    alert(
        "TREATMENT SAVE ERROR\n\n" +
        "Code: " + (error.code || "") + "\n\n" +
        "Message: " + (error.message || "") + "\n\n" +
        "Details: " + (error.details || "") + "\n\n" +
        "Hint: " + (error.hint || "")
    );

    return;

    }

    alert("Treatment Saved Successfully ✅");


    loadTreatmentHistory();

}


// ===============================
// START
// ===============================

loadMureed();
