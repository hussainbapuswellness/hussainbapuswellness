const params = new URLSearchParams(window.location.search);

const appointmentId = params.get("id");

let currentMureed = null;


// ========================================
// LOAD MUREED
// ========================================

async function loadMureed() {

    const { data, error } = await supabaseClient
        .from("clients")
        .select("*")
        .eq("Appointment_Id", appointmentId)
        .single();

    if (error) {

        console.log("MUREED LOAD ERROR:", error);

        alert(
            "Mureed Not Found\n\n" +
            "Code: " + (error.code || "") +
            "\n\nMessage: " + (error.message || "")
        );

        return;
    }

    currentMureed = data;


    document.getElementById("Appointment_Id").innerHTML =
        data.Appointment_Id || "";

    document.getElementById("Full_Name").innerHTML =
        data.Full_Name || "";

    document.getElementById("Mobile").innerHTML =
        data.Mobile || "";

    document.getElementById("Whatsapp").innerHTML =
        data.Whatsapp || "";

    document.getElementById("Email").innerHTML =
        data.Email || "";

    document.getElementById("Age").innerHTML =
        data.Age || "";

    document.getElementById("Gender").innerHTML =
        data.Gender || "";

    document.getElementById("Country").innerHTML =
        data.Country || "";

    document.getElementById("State").innerHTML =
        data.State || "";

    document.getElementById("City").innerHTML =
        data.City || "";

    document.getElementById("Consultation_Type").innerHTML =
        data.Consultation_Type || "";

    document.getElementById("Problem_Category").innerHTML =
        data.Problem_Category || "";

    document.getElementById("Problem_Short_Description").innerHTML =
        data.Problem_Short_Description || "";

    document.getElementById("Appointment_Status").innerHTML =
        data.Appointment_Status || "";


    // Treatment History load
    loadTreatmentHistory();
}



// ========================================
// LOAD TREATMENT HISTORY
// ========================================

async function loadTreatmentHistory() {

    const historyBox =
        document.getElementById("treatmentHistory");

    if (!historyBox) {
        return;
    }


    historyBox.innerHTML =
        "<p>Loading Treatment History...</p>";


    const { data, error } = await supabaseClient

        .from("Mureed_Treatment_History")

        .select("*")

        .eq("Appointment_Id", appointmentId)

        .order("Created_At", {
            ascending: false
        });


    if (error) {

        console.log(
            "TREATMENT HISTORY LOAD ERROR:",
            error
        );

        historyBox.innerHTML =
            "<p>Unable to load Treatment History.</p>";

        return;
    }


    if (!data || data.length === 0) {

        historyBox.innerHTML =
            "<p>No Treatment Added Yet.</p>";

        return;
    }


    historyBox.innerHTML = "";


    data.forEach(function (treatment) {

        const card =
            document.createElement("div");

        card.className =
            "card treatment-record";


        const date =
            treatment.Created_At
                ? new Date(
                    treatment.Created_At
                  ).toLocaleString()
                : "";


        card.innerHTML = `

            <h3>
                ${treatment.Treatment_Type || ""}
            </h3>

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
                `
                <p>
                    <b>Taweez Image:</b><br>

                    <img
                        src="${treatment.Image_Url}"
                        style="
                            max-width:180px;
                            margin-top:8px;
                            border-radius:8px;
                        "
                    >
                </p>
                `
                :
                ""
            }

            <small>
                Added: ${date}
            </small>

        `;


        historyBox.appendChild(card);

    });

}



// ========================================
// OPEN TREATMENT FORM
// ========================================

const addTreatmentBtn =
    document.getElementById("addTreatmentBtn");


if (addTreatmentBtn) {

    addTreatmentBtn.addEventListener(
        "click",
        function () {

            const form =
                document.getElementById("treatmentForm");

            if (form) {

                form.style.display = "block";

            }

        }
    );

}



// ========================================
// CANCEL TREATMENT
// ========================================

const cancelTreatmentBtn =
    document.getElementById("cancelTreatmentBtn");


if (cancelTreatmentBtn) {

    cancelTreatmentBtn.addEventListener(
        "click",
        function () {

            const form =
                document.getElementById("treatmentForm");

            if (form) {

                form.style.display = "none";

            }

        }
    );

}



// ========================================
// SAVE TREATMENT
// ========================================

const saveTreatmentBtn =
    document.getElementById("saveTreatmentBtn");


if (saveTreatmentBtn) {

    saveTreatmentBtn.addEventListener(
        "click",
        saveTreatment
    );

}



// ========================================
// SAVE TREATMENT FUNCTION
// ========================================

async function saveTreatment() {

    if (!currentMureed) {

        alert(
            "Mureed information is not loaded yet."
        );

        return;
    }


    const treatmentType =
        document.getElementById(
            "Treatment_Type"
        ).value.trim();


    const category =
        document.getElementById(
            "Category"
        ).value.trim();


    const itemName =
        document.getElementById(
            "Item_Name"
        ).value.trim();


    const notes =
        document.getElementById(
            "Notes"
        ).value.trim();


    if (!treatmentType || !itemName) {

        alert(
            "Please select Treatment Type and enter Item Name."
        );

        return;
    }



    // ====================================
    // INSERT TREATMENT
    // ====================================

    const treatmentRecord = {

        Mureed_Id:
            currentMureed.id,

        Appointment_Id:
            currentMureed.Appointment_Id,

        Treatment_Type:
            treatmentType,

        Category:
            category,

        Item_Name:
            itemName,

        Notes:
            notes,

        Image_Url:
            null,

        Print_Crop:
            null

    };


    console.log(
        "TREATMENT RECORD:",
        treatmentRecord
    );


    const { error } = await supabaseClient

        .from("Mureed_Treatment_History")

        .insert([treatmentRecord]);


    // ====================================
    // ERROR
    // ====================================

    if (error) {

        console.log(
            "TREATMENT SAVE ERROR:",
            error
        );


        alert(
            "TREATMENT SAVE ERROR\n\n" +

            "Code: " +
            (error.code || "") +

            "\n\nMessage: " +
            (error.message || "") +

            "\n\nDetails: " +
            (error.details || "") +

            "\n\nHint: " +
            (error.hint || "")
        );


        return;
    }



    // ====================================
    // SUCCESS
    // ====================================

    alert(
        "✅ Treatment Saved Successfully"
    );


    document.getElementById(
        "Treatment_Type"
    ).value = "";


    document.getElementById(
        "Category"
    ).value = "";


    document.getElementById(
        "Item_Name"
    ).value = "";


    document.getElementById(
        "Notes"
    ).value = "";


    const form =
        document.getElementById(
            "treatmentForm"
        );


    if (form) {

        form.style.display = "none";

    }


    // Reload treatment history
    loadTreatmentHistory();

}



// ========================================
// START
// ========================================

loadMureed();
