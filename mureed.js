// ======================================================
// HUSSAIN BAPU'S WELLNESS
// MUREED.JS - PART 1
// ======================================================

const params = new URLSearchParams(window.location.search);
const appointmentId = params.get("id");

let currentMureed = null;
let selectedTaweezImageUrl = null;


// ======================================================
// SAFE TEXT
// ======================================================

function safeText(value) {
    return value ?? "-";
}


// ======================================================
// LOAD MUREED
// ======================================================

async function loadMureed() {

    if (!appointmentId) {
        alert("Appointment ID missing.");
        return;
    }

    const result = await supabaseClient
        .from("clients")
        .select("*")
        .eq("Appointment_Id", appointmentId)
        .single();

    if (result.error) {

        console.error(
            "Mureed Load Error:",
            result.error
        );

        alert(
            "Mureed Not Found\n\n" +
            result.error.message
        );

        return;
    }

    currentMureed = result.data;

    const fields = {
        Appointment_Id: currentMureed.Appointment_Id,
        Full_Name: currentMureed.Full_Name,
        Mobile: currentMureed.Mobile,
        Whatsapp: currentMureed.Whatsapp,
        Email: currentMureed.Email,
        Age: currentMureed.Age,
        Gender: currentMureed.Gender,
        Country: currentMureed.Country,
        State: currentMureed.State,
        City: currentMureed.City,
        Consultation_Type:
            currentMureed.Consultation_Type,
        Problem_Category:
            currentMureed.Problem_Category,
        Problem_Short_Description:
            currentMureed.Problem_Short_Description,
        Appointment_Status:
            currentMureed.Appointment_Status
    };

    Object.keys(fields).forEach(function(id) {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                safeText(fields[id]);
        }

    });

    await loadTreatmentHistory();
}


// ======================================================
// OPEN / CLOSE TREATMENT FORM
// ======================================================

function openTreatmentForm() {

    const form =
        document.getElementById(
            "treatmentForm"
        );

    if (form) {
        form.style.display = "block";
    }
}


function closeTreatmentForm() {

    const form =
        document.getElementById(
            "treatmentForm"
        );

    if (form) {
        form.style.display = "none";
    }
}


// ======================================================
// START BUTTONS
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const addButton =
            document.getElementById(
                "addTreatmentBtn"
            );

        const cancelButton =
            document.getElementById(
                "cancelTreatmentBtn"
            );

        const saveButton =
            document.getElementById(
                "saveTreatmentBtn"
            );

        if (addButton) {
            addButton.addEventListener(
                "click",
                openTreatmentForm
            );
        }

        if (cancelButton) {
            cancelButton.addEventListener(
                "click",
                closeTreatmentForm
            );
        }

        if (saveButton) {
            saveButton.addEventListener(
                "click",
                saveTreatment
            );
        }

        loadMureed();

    }
);
// ======================================================
// TREATMENT HISTORY
// PART 2
// ======================================================

async function loadTreatmentHistory() {

    const box =
        document.getElementById(
            "treatmentHistory"
        );

    if (!box) {
        return;
    }

    box.innerHTML =
        "<p>Loading Treatment History...</p>";


    const result =
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


    if (result.error) {

        console.error(
            "Treatment History Error:",
            result.error
        );

        box.innerHTML =
            "<p>Unable to load Treatment History.</p>";

        return;
    }


    const records =
        result.data || [];


    if (records.length === 0) {

        box.innerHTML =
            "<p>No Treatment Added Yet.</p>";

        return;
    }


    box.innerHTML = "";


    records.forEach(function(record) {

        const card =
            document.createElement("div");

        card.className =
            "card treatment-record";

        card.style.marginBottom =
            "15px";


        // DATE
        const date =
            document.createElement("h3");

        date.textContent =
            "📅 " +
            new Date(
                record.Created_At
            ).toLocaleString("en-IN");

        card.appendChild(date);


        // OLD RECORD
        if (
            record.Treatment_Type ||
            record.Item_Name ||
            record.Category ||
            record.Notes
        ) {

            const old =
                document.createElement("p");

            old.innerHTML =
                "<b>🩺 Treatment:</b> " +
                safeText(
                    record.Item_Name ||
                    record.Treatment_Type
                );

            card.appendChild(old);


            if (record.Category) {

                const p =
                    document.createElement("p");

                p.innerHTML =
                    "<b>Category:</b> " +
                    record.Category;

                card.appendChild(p);
            }


            if (record.Notes) {

                const p =
                    document.createElement("p");

                p.innerHTML =
                    "<b>Notes:</b><br>" +
                    record.Notes
                        .replace(/\n/g, "<br>");

                card.appendChild(p);
            }
        }


        // TAWEEZ
        if (record.Taweez_Name) {

            const title =
                document.createElement("h4");

            title.textContent =
                "🧿 Taweez";

            card.appendChild(title);


            const name =
                document.createElement("p");

            name.innerHTML =
                "<b>Name:</b> " +
                record.Taweez_Name;

            card.appendChild(name);


            if (record.Taweez_Notes) {

                const notes =
                    document.createElement("p");

                notes.innerHTML =
                    "<b>Notes:</b><br>" +
                    record.Taweez_Notes
                        .replace(/\n/g, "<br>");

                card.appendChild(notes);
            }


            if (record.Taweez_Image_Url) {

                const image =
                    document.createElement("img");

                image.src =
                    record.Taweez_Image_Url;

                image.style.width =
                    "180px";

                image.style.maxWidth =
                    "100%";

                image.style.display =
                    "block";

                image.style.marginTop =
                    "8px";

                card.appendChild(image);
            }
        }


        // HERBAL
        if (record.Herbal_Remedy) {

            const title =
                document.createElement("h4");

            title.textContent =
                "🌿 Herbal Remedy";

            card.appendChild(title);


            const name =
                document.createElement("p");

            name.innerHTML =
                "<b>Remedy:</b> " +
                record.Herbal_Remedy;

            card.appendChild(name);


            if (record.Herbal_Notes) {

                const notes =
                    document.createElement("p");

                notes.innerHTML =
                    "<b>Notes:</b><br>" +
                    record.Herbal_Notes
                        .replace(/\n/g, "<br>");

                card.appendChild(notes);
            }
        }


        // WAZIFA
        if (record.Wazifa) {

            const title =
                document.createElement("h4");

            title.textContent =
                "📿 Wazifa";

            card.appendChild(title);


            const name =
                document.createElement("p");

            name.innerHTML =
                "<b>Wazifa:</b> " +
                record.Wazifa;

            card.appendChild(name);


            if (record.Wazifa_Notes) {

                const notes =
                    document.createElement("p");

                notes.innerHTML =
                    "<b>
                    // ======================================================
// SAVE TREATMENT
// PART 3
// ======================================================

async function saveTreatment() {

    if (!currentMureed) {
        alert("Mureed information not loaded.");
        return;
    }


    const taweezName =
        document.getElementById("Taweez_Name")
            ?.value.trim() || "";


    const taweezNotes =
        document.getElementById("Taweez_Notes")
            ?.value.trim() || "";


    const herbalRemedy =
        document.getElementById("Herbal_Remedy")
            ?.value.trim() || "";


    const herbalNotes =
        document.getElementById("Herbal_Notes")
            ?.value.trim() || "";


    const wazifa =
        document.getElementById("Wazifa")
            ?.value.trim() || "";


    const wazifaNotes =
        document.getElementById("Wazifa_Notes")
            ?.value.trim() || "";


    const additionalNotes =
        document.getElementById("Additional_Notes")
            ?.value.trim() || "";


    if (
        !taweezName &&
        !herbalRemedy &&
        !wazifa &&
        !additionalNotes
    ) {

        alert(
            "Please add at least one treatment or note."
        );

        return;
    }


    const result =
        await supabaseClient

            .from(
                "Mureed_Treatment_History"
            )

            .insert([{

                Mureed_Id:
                    currentMureed.id,

                Appointment_Id:
                    appointmentId,

                Taweez_Name:
                    taweezName || null,

                Taweez_Notes:
                    taweezNotes || null,

                Taweez_Image_Url:
                    selectedTaweezImageUrl,

                Herbal_Remedy:
                    herbalRemedy || null,

                Herbal_Notes:
                    herbalNotes || null,

                Wazifa:
                    wazifa || null,

                Wazifa_Notes:
                    wazifaNotes || null,

                Additional_Notes:
                    additionalNotes || null

            }])

            .select()
            .single();


    if (result.error) {

        console.error(
            "SAVE TREATMENT ERROR:",
            result.error
        );

        alert(
            "SAVE ERROR\n\n" +
            result.error.message
        );

        return;
    }


    alert(
        "✅ Treatment Saved Successfully"
    );


    // CLEAR FORM

    [
        "Taweez_Name",
        "Taweez_Notes",
        "Herbal_Remedy",
        "Herbal_Notes",
        "Wazifa",
        "Wazifa_Notes",
        "Additional_Notes"
    ].forEach(function(id) {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = "";
        }

    });


    selectedTaweezImageUrl =
        null;


    const selected =
        document.getElementById(
            "selectedTaweez"
        );

    if (selected) {
        selected.innerHTML = "";
    }


    closeTreatmentForm();


    await loadTreatmentHistory();
        }
// ======================================================
// TAWEEZ SELECT + FINAL START
// PART 4
// ======================================================

async function selectTaweez() {

    const category =
        prompt(
            "Taweez Category likho:\n\n" +
            "Bimari\n" +
            "Barkat\n" +
            "Sehat\n" +
            "Hifazat"
        );

    if (!category) {
        return;
    }


    const result =
        await supabaseClient

            .from("Taweez_Library")

            .select("*")

            .eq("Category", category)
            .eq("Is_Active", true)
            .order("Taweez_Name");


    if (result.error) {

        console.error(
            "TAWEEZ LIBRARY ERROR:",
            result.error
        );

        alert(
            "Taweez Library Error\n\n" +
            result.error.message
        );

        return;
    }


    const list =
        result.data || [];


    if (list.length === 0) {

        alert(
            "Is category me koi Taweez nahi mila."
        );

        return;
    }


    let message =
        "Available Taweez:\n\n";


    list.forEach(
        function(item, index) {

            message +=
                (index + 1) +
                ". " +
                item.Taweez_Name +
                "\n";

        }
    );


    const choice =
        prompt(message + "\nNumber enter karo:");


    const number =
        parseInt(choice);


    if (
        !number ||
        number < 1 ||
        number > list.length
    ) {

        return;
    }


    const selected =
        list[number - 1];


    const nameInput =
        document.getElementById(
            "Taweez_Name"
        );


    if (nameInput) {

        nameInput.value =
            selected.Taweez_Name;

    }


    selectedTaweezImageUrl =
        selected.File_Url || null;


    const selectedBox =
        document.getElementById(
            "selectedTaweez"
        );


    if (selectedBox) {

        selectedBox.innerHTML =
            "<p><b>Selected:</b> " +
            selected.Taweez_Name +
            "</p>";

    }

}



// ======================================================
// SELECT TAWEEZ BUTTON
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const button =
            document.getElementById(
                "selectTaweezBtn"
            );

        if (button) {

            button.addEventListener(
                "click",
                selectTaweez
            );

        }

    }
);
