// ======================================================
// HUSSAIN BAPU'S WELLNESS
// MUREED.JS - FINAL CLEAN VERSION
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

    const { data, error } = await supabaseClient
        .from("clients")
        .select("*")
        .eq("Appointment_Id", appointmentId)
        .single();

    if (error) {
        console.error("Mureed Load Error:", error);
        alert("Mureed Not Found\n\n" + error.message);
        return;
    }

    currentMureed = data;

    const fields = {
        Appointment_Id: data.Appointment_Id,
        Full_Name: data.Full_Name,
        Mobile: data.Mobile,
        Whatsapp: data.Whatsapp,
        Email: data.Email,
        Age: data.Age,
        Gender: data.Gender,
        Country: data.Country,
        State: data.State,
        City: data.City,
        Consultation_Type: data.Consultation_Type,
        Problem_Category: data.Problem_Category,
        Problem_Short_Description: data.Problem_Short_Description,
        Appointment_Status: data.Appointment_Status
    };

    Object.keys(fields).forEach(function(id) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = safeText(fields[id]);
        }

    });

    await loadTreatmentHistory();
}


// ======================================================
// LOAD TREATMENT HISTORY
// ======================================================

async function loadTreatmentHistory() {

    const box = document.getElementById("treatmentHistory");

    if (!box) {
        return;
    }

    box.innerHTML = "<p>Loading Treatment History...</p>";

    const { data, error } = await supabaseClient
        .from("Mureed_Treatment_History")
        .select("*")
        .eq("Appointment_Id", appointmentId)
        .order("Created_At", {
            ascending: false
        });

    if (error) {

        console.error(
            "Treatment History Error:",
            error
        );

        box.innerHTML =
            "<p>Unable to load Treatment History.</p>" +
            "<small>" +
            safeText(error.message) +
            "</small>";

        return;
    }

    const records = data || [];

    if (records.length === 0) {

        box.innerHTML =
            "<p>No Treatment Added Yet.</p>";

        return;
    }

    box.innerHTML = "";

    records.forEach(function(record) {

        const card = document.createElement("div");

        card.className = "card treatment-record";

        card.style.marginBottom = "15px";


        // DATE
        const date = document.createElement("h3");

        date.textContent =
            "📅 " +
            (
                record.Created_At
                    ? new Date(
                        record.Created_At
                    ).toLocaleString("en-IN")
                    : "-"
            );

        card.appendChild(date);


        // OLD TREATMENT RECORD
        if (
            record.Treatment_Type ||
            record.Category ||
            record.Item_Name ||
            record.Notes
        ) {

            const title = document.createElement("h4");

            title.textContent =
                "🩺 " +
                (
                    record.Treatment_Type ||
                    "Treatment"
                );

            card.appendChild(title);


            if (record.Category) {

                const p = document.createElement("p");

                p.innerHTML =
                    "<b>Category:</b> " +
                    safeText(record.Category);

                card.appendChild(p);
            }


            if (record.Item_Name) {

                const p = document.createElement("p");

                p.innerHTML =
                    "<b>Name:</b> " +
                    safeText(record.Item_Name);

                card.appendChild(p);
            }


            if (record.Notes) {

                const p = document.createElement("p");

                p.innerHTML =
                    "<b>Notes:</b><br>" +
                    safeText(record.Notes)
                        .replace(/\n/g, "<br>");

                card.appendChild(p);
            }


            if (record.Image_Url) {

                const image = document.createElement("img");

                image.src = record.Image_Url;

                image.style.width = "180px";
                image.style.maxWidth = "100%";
                image.style.display = "block";
                image.style.marginTop = "8px";
                image.style.borderRadius = "8px";

                card.appendChild(image);
            }
        }


        // TAWEEZ
        if (record.Taweez_Name) {

            const title = document.createElement("h4");

            title.textContent = "🧿 Taweez";

            card.appendChild(title);


            const name = document.createElement("p");

            name.innerHTML =
                "<b>Name:</b> " +
                safeText(record.Taweez_Name);

            card.appendChild(name);


            if (record.Taweez_Notes) {

                const notes = document.createElement("p");

                notes.innerHTML =
                    "<b>Notes:</b><br>" +
                    safeText(record.Taweez_Notes)
                        .replace(/\n/g, "<br>");

                card.appendChild(notes);
            }


            if (record.Taweez_Image_Url) {

                const image = document.createElement("img");

                image.src =
                    record.Taweez_Image_Url;

                image.style.width = "180px";
                image.style.maxWidth = "100%";
                image.style.display = "block";
                image.style.marginTop = "8px";
                image.style.borderRadius = "8px";

                card.appendChild(image);
            }
        }


        // HERBAL REMEDY
        if (record.Herbal_Remedy) {

            const title = document.createElement("h4");

            title.textContent =
                "🌿 Herbal Remedy";

            card.appendChild(title);


            const name = document.createElement("p");

            name.innerHTML =
                "<b>Remedy:</b> " +
                safeText(record.Herbal_Remedy);

            card.appendChild(name);


            if (record.Herbal_Notes) {

                const notes = document.createElement("p");

                notes.innerHTML =
                    "<b>Notes:</b><br>" +
                    safeText(record.Herbal_Notes)
                        .replace(/\n/g, "<br>");

                card.appendChild(notes);
            }
        }


        // WAZIFA
        if (record.Wazifa) {

            const title = document.createElement("h4");

            title.textContent =
                "📿 Wazifa";

            card.appendChild(title);


            const name = document.createElement("p");

            name.innerHTML =
                "<b>Wazifa:</b> " +
                safeText(record.Wazifa);

            card.appendChild(name);


            if (record.Wazifa_Notes) {

                const notes = document.createElement("p");

                notes.innerHTML =
                    "<b>Notes:</b><br>" +
                    safeText(record.Wazifa_Notes)
                        .replace(/\n/g, "<br>");

                card.appendChild(notes);
            }
        }


        // ADDITIONAL NOTES
        if (record.Additional_Notes) {

            const title = document.createElement("h4");

            title.textContent =
                "📝 Additional Notes";

            card.appendChild(title);


            const notes = document.createElement("p");

            notes.innerHTML =
                safeText(record.Additional_Notes)
                    .replace(/\n/g, "<br>");

            card.appendChild(notes);
        }


        box.appendChild(card);

    });
}


// ======================================================
// OPEN / CLOSE FORM
// ======================================================

function openTreatmentForm() {

    const form =
        document.getElementById("treatmentForm");

    if (form) {
        form.style.display = "block";
    }
}


function closeTreatmentForm() {

    const form =
        document.getElementById("treatmentForm");

    if (form) {
        form.style.display = "none";
    }
}


// ======================================================
// SELECT TAWEEZ
// ======================================================

async function selectTaweez() {

    const category = prompt(
        "Taweez Category:\n\n" +
        "Bimari\n" +
        "Barkat\n" +
        "Sehat\n" +
        "Hifazat"
    );

    if (!category) {
        return;
    }

    const cleanCategory =
        category.trim();

    const { data, error } =
        await supabaseClient
            .from("Taweez_Library")
            .select("*")
            .eq("Category", cleanCategory)
            .eq("Is_Active", true)
            .order("Taweez_Name");

    if (error) {

        console.error(
            "Taweez Library Error:",
            error
        );

        alert(
            "Taweez Library Error\n\n" +
            error.message
        );

        return;
    }

    const list = data || [];

    if (list.length === 0) {

        alert(
            "Is category me koi Taweez nahi mila."
        );

        return;
    }

    let message =
        "Available Taweez:\n\n";

    list.forEach(function(item, index) {

        message +=
            (index + 1) +
            ". " +
            safeText(item.Taweez_Name) +
            "\n";

    });

    const choice =
        prompt(
            message +
            "\nNumber enter karo:"
        );

    const number =
        parseInt(choice, 10);

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
            safeText(
                selected.Taweez_Name
            );
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
            safeText(
                selected.Taweez_Name
            ) +
            "</p>";
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


    const taweezName =
        document.getElementById(
            "Taweez_Name"
        )?.value.trim() || "";


    const taweezNotes =
        document.getElementById(
            "Taweez_Notes"
        )?.value.trim() || "";


    const herbalRemedy =
        document.getElementById(
            "Herbal_Remedy"
        )?.value.trim() || "";


    const herbalNotes =
        document.getElementById(
            "Herbal_Notes"
        )?.value.trim() || "";


    const wazifa =
        document.getElementById(
            "Wazifa"
        )?.value.trim() || "";


    const wazifaNotes =
        document.getElementById(
            "Wazifa_Notes"
        )?.value.trim() || "";


    const additionalNotes =
        document.getElementById(
            "Additional_Notes"
        )?.value.trim() || "";


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


    const { data, error } =
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


    if (error) {

        console.error(
            "Save Treatment Error:",
            error
        );

        alert(
            "SAVE ERROR\n\n" +
            error.message
        );

        return;
    }


    console.log(
        "Treatment Saved:",
        data
    );


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


    selectedTaweezImageUrl = null;


    const selectedBox =
        document.getElementById(
            "selectedTaweez"
        );

    if (selectedBox) {
        selectedBox.innerHTML = "";
    }


    closeTreatmentForm();

    await loadTreatmentHistory();
}


// ======================================================
// BUTTONS
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

        const selectTaweezButton =
            document.getElementById(
                "selectTaweezBtn"
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


        if (selectTaweezButton) {

            selectTaweezButton.addEventListener(
                "click",
                selectTaweez
            );
        }


        loadMureed();

    }
);
