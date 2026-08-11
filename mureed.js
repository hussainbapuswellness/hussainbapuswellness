// ======================================================
// HUSSAIN BAPU'S WELLNESS
// MUREED DETAILS + TREATMENT HISTORY
// FINAL VERSION
// ======================================================

const params = new URLSearchParams(window.location.search);

const appointmentId = params.get("id");

let currentMureed = null;


// ======================================================
// LOAD MUREED
// ======================================================

async function loadMureed() {

    if (!appointmentId) {

        alert("Appointment ID missing.");

        return;
    }


    const { data, error } = await supabaseClient

        .from("clients")

        .select("*")

        .eq("Appointment_Id", appointmentId)

        .single();


    if (error) {

        console.error(
            "MUREED LOAD ERROR:",
            error
        );


        alert(
            "Mureed Not Found\n\n" +
            "Code: " +
            (error.code || "") +
            "\n\nMessage: " +
            (error.message || "")
        );


        return;
    }


    currentMureed = data;


    // ==================================================
    // DISPLAY MUREED DETAILS
    // ==================================================

    const fields = {

        Appointment_Id:
            data.Appointment_Id,

        Full_Name:
            data.Full_Name,

        Mobile:
            data.Mobile,

        Whatsapp:
            data.Whatsapp,

        Email:
            data.Email,

        Age:
            data.Age,

        Gender:
            data.Gender,

        Country:
            data.Country,

        State:
            data.State,

        City:
            data.City,

        Consultation_Type:
            data.Consultation_Type,

        Problem_Category:
            data.Problem_Category,

        Problem_Short_Description:
            data.Problem_Short_Description,

        Appointment_Status:
            data.Appointment_Status

    };


    Object.keys(fields).forEach(function (id) {

        const element =
            document.getElementById(id);


        if (element) {

            element.textContent =
                fields[id] ?? "-";

        }

    });


    // ==================================================
    // LOAD TREATMENT HISTORY
    // ==================================================

    await loadTreatmentHistory();

}



// ======================================================
// LOAD TREATMENT HISTORY
// ======================================================

async function loadTreatmentHistory() {

    const historyBox =
        document.getElementById(
            "treatmentHistory"
        );


    if (!historyBox) {

        console.error(
            "treatmentHistory element not found."
        );

        return;
    }


    historyBox.innerHTML =
        "<p>Loading Treatment History...</p>";


    // ==================================================
    // IMPORTANT
    // USE APPOINTMENT ID DIRECTLY
    // ==================================================

    const { data, error } =

        await supabaseClient

            .from(
                "Mureed_Treatment_History"
            )

            .select("*")

            .eq(
                "Appointment_Id",
                appointmentId
            )

            .order(
                "Created_At",
                {
                    ascending: false
                }
            );


    // ==================================================
    // QUERY ERROR
    // ==================================================

    if (error) {

        console.error(
            "TREATMENT HISTORY ERROR:",
            error
        );


        historyBox.innerHTML = `

            <p>
                Unable to load Treatment History.
            </p>

            <small>
                ${error.message || ""}
            </small>

        `;


        return;
    }


    console.log(
        "TREATMENT HISTORY DATA:",
        data
    );


    // ==================================================
    // NO RECORD
    // ==================================================

    if (!data || data.length === 0) {

        historyBox.innerHTML =
            "<p>No Treatment Added Yet.</p>";

        return;
    }


    // ==================================================
    // CLEAR OLD CONTENT
    // ==================================================

    historyBox.innerHTML = "";


    // ==================================================
    // DISPLAY EACH TREATMENT
    // ==================================================

    data.forEach(function (treatment) {


        const card =
            document.createElement("div");


        card.className =
            "card treatment-record";


        card.style.marginBottom =
            "15px";


        // ------------------------------------------------
        // TITLE
        // ------------------------------------------------

        const title =
            document.createElement("h3");


        title.textContent =
            treatment.Treatment_Type || "-";


        // ------------------------------------------------
        // CATEGORY
        // ------------------------------------------------

        const category =
            document.createElement("p");


        category.innerHTML =
            "<b>Category:</b> " +
            (treatment.Category || "-");


        // ------------------------------------------------
        // ITEM NAME
        // ------------------------------------------------

        const item =
            document.createElement("p");


        item.innerHTML =
            "<b>Item:</b> " +
            (treatment.Item_Name || "-");


        // ------------------------------------------------
        // NOTES
        // ------------------------------------------------

        const notes =
            document.createElement("p");


        notes.innerHTML =
            "<b>Notes:</b> " +
            (treatment.Notes || "-");


        // ------------------------------------------------
        // CREATED DATE
        // ------------------------------------------------

        const added =
            document.createElement("small");


        const date =
            treatment.Created_At
                ? new Date(
                    treatment.Created_At
                ).toLocaleString()
                : "-";


        added.textContent =
            "Added: " + date;


        // ------------------------------------------------
        // ADD CONTENT
        // ------------------------------------------------

        card.appendChild(title);

        card.appendChild(category);

        card.appendChild(item);

        card.appendChild(notes);


        // ------------------------------------------------
        // IMAGE
        // ------------------------------------------------

        if (treatment.Image_Url) {

            const imageTitle =
                document.createElement("p");


            imageTitle.innerHTML =
                "<b>Taweez Image:</b>";


            const image =
                document.createElement("img");


            image.src =
                treatment.Image_Url;


            image.style.maxWidth =
                "180px";


            image.style.marginTop =
                "8px";


            image.style.borderRadius =
                "8px";


            card.appendChild(
                imageTitle
            );


            card.appendChild(
                image
            );

        }


        card.appendChild(
            added
        );


        historyBox.appendChild(
            card
        );

    });

}



// ======================================================
// OPEN TREATMENT FORM
// ======================================================

function openTreatmentForm() {

    const form =
        document.getElementById(
            "treatmentForm"
        );


    if (form) {

        form.style.display =
            "block";

    }

}



// ======================================================
// CLOSE TREATMENT FORM
// ======================================================

function closeTreatmentForm() {

    const form =
        document.getElementById(
            "treatmentForm"
        );


    if (form) {

        form.style.display =
            "none";

    }

}



// ======================================================
// SAVE TREATMENT
// ======================================================

async function saveTreatment() {

    if (!currentMureed) {

        alert(
            "Mureed information not loaded."
        );

        return;
    }


    // ==================================================
    // FORM VALUES
    // ==================================================

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



    // ==================================================
    // VALIDATION
    // ==================================================

    if (!treatmentType) {

        alert(
            "Please select Treatment Type."
        );

        return;
    }


    if (!itemName) {

        alert(
            "Please enter Item Name."
        );

        return;
    }



    // ==================================================
    // SAVE
    // ==================================================

    const { data, error } =

        await supabaseClient

            .from(
                "Mureed_Treatment_History"
            )

            .insert([{

                // Appointment ID is the main link
                Appointment_Id:
                    appointmentId,

                // Keep Mureed ID also
                // for future use
                Mureed_Id:
                    currentMureed["I'd"],

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

            }])

            .select()
            .single();



    // ==================================================
    // SAVE ERROR
    // ==================================================

    if (error) {

        console.error(
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



    // ==================================================
    // SUCCESS
    // ==================================================

    console.log(
        "Treatment Saved:",
        data
    );


    alert(
        "✅ Treatment Saved Successfully"
    );



    // ==================================================
    // CLEAR FORM
    // ==================================================

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



    // ==================================================
    // CLOSE FORM
    // ==================================================

    closeTreatmentForm();



    // ==================================================
    // RELOAD HISTORY
    // ==================================================

    await loadTreatmentHistory();

}



// ======================================================
// BUTTON EVENTS
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ADD TREATMENT
        const addButton =
            document.getElementById(
                "addTreatmentBtn"
            );


        if (addButton) {

            addButton.addEventListener(
                "click",
                openTreatmentForm
            );

        }



        // CANCEL
        const cancelButton =
            document.getElementById(
                "cancelTreatmentBtn"
            );


        if (cancelButton) {

            cancelButton.addEventListener(
                "click",
                closeTreatmentForm
            );

        }



        // SAVE
        const saveButton =
            document.getElementById(
                "saveTreatmentBtn"
            );


        if (saveButton) {

            saveButton.addEventListener(
                "click",
                saveTreatment
            );

        }

    }
);



// ======================================================
// START
// ======================================================

loadMureed();
