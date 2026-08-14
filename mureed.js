// ======================================================
// HUSSAIN BAPU'S WELLNESS
// MUREED DETAILS + TREATMENT HISTORY
// FINAL FRESH VERSION
// ======================================================


// ======================================================
// URL / APPOINTMENT
// ======================================================

const params = new URLSearchParams(
    window.location.search
);

const appointmentId = params.get("id");

let currentMureed = null;

let selectedTaweezImageUrl = null;


// ======================================================
// SAFE HTML
// ======================================================

function escapeHtml(value) {

    const div = document.createElement("div");

    div.textContent = value ?? "";

    return div.innerHTML;
}


// ======================================================
// FORMAT DATE
// ======================================================

function formatDate(value) {

    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });
}


// ======================================================
// LOAD MUREED
// ======================================================

async function loadMureed() {

    if (!appointmentId) {

        alert("Appointment ID missing.");

        return;
    }


    const {
        data,
        error
    } = await supabaseClient

        .from("clients")

        .select("*")

        .eq(
            "Appointment_Id",
            appointmentId
        )

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
    // DISPLAY MUREED
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


    Object.keys(fields).forEach(
        function (id) {

            const element =
                document.getElementById(id);

            if (element) {

                element.textContent =
                    fields[id] ?? "-";
            }
        }
    );


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
        return;
    }


    historyBox.innerHTML =
        "<p>Loading Treatment History...</p>";


    const {
        data,
        error
    } = await supabaseClient

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
                ${escapeHtml(
                    error.message || ""
                )}
            </small>

        `;

        return;
    }


    if (
        !data ||
        data.length === 0
    ) {

        historyBox.innerHTML =
            "<p>No Treatment Added Yet.</p>";

        return;
    }


    historyBox.innerHTML = "";


    // ==================================================
    // DISPLAY ALL RECORDS
    // ==================================================

    data.forEach(
        function (treatment) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card treatment-record";


            card.style.marginBottom =
                "20px";


            card.style.padding =
                "18px";


            // ==================================================
            // DATE / TIME
            // ==================================================

            const dateTitle =
                document.createElement(
                    "h3"
                );


            dateTitle.textContent =
                "📅 " +
                formatDate(
                    treatment.Created_At
                );


            card.appendChild(
                dateTitle
            );


            // ==================================================
            // OLD RECORD FORMAT
            // ==================================================

            const hasOldRecord =
                treatment.Treatment_Type ||
                treatment.Category ||
                treatment.Item_Name ||
                treatment.Notes ||
                treatment.Image_Url;


            if (hasOldRecord) {

                const oldTitle =
                    document.createElement(
                        "h4"
                    );


                oldTitle.textContent =
                    treatment.Treatment_Type
                        ? "🩺 " +
                          treatment.Treatment_Type
                        : "🩺 Treatment";


                card.appendChild(
                    oldTitle
                );


                if (
                    treatment.Category
                ) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Category:</b> " +
                        escapeHtml(
                            treatment.Category
                        );


                    card.appendChild(p);
                }


                if (
                    treatment.Item_Name
                ) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Name:</b> " +
                        escapeHtml(
                            treatment.Item_Name
                        );


                    card.appendChild(p);
                }


                if (
                    treatment.Notes
                ) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Notes:</b> " +
                        escapeHtml(
                            treatment.Notes
                        ).replace(
                            /\n/g,
                            "<br>"
                        );


                    card.appendChild(p);
                }


                if (
                    treatment.Image_Url
                ) {

                    const image =
                        document.createElement(
                            "img"
                        );


                    image.src =
                        treatment.Image_Url;


                    image.alt =
                        "Treatment Image";


                    image.style.width =
                        "180px";


                    image.style.maxWidth =
                        "100%";


                    image.style.display =
                        "block";


                    image.style.marginTop =
                        "10px";


                    image.style.borderRadius =
                        "10px";


                    image.style.cursor =
                        "pointer";


                    card.appendChild(
                        image
                    );
                }

            }



            // ==================================================
            // NEW TAWEEZ
            // ==================================================

            if (
                treatment.Taweez_Name ||
                treatment.Taweez_Notes ||
                treatment.Taweez_Image_Url
            ) {

                const title =
                    document.createElement(
                        "h4"
                    );


                title.textContent =
                    "🧿 Taweez";


                card.appendChild(
                    title
                );


                if (
                    treatment.Taweez_Name
                ) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Taweez Name:</b> " +
                        escapeHtml(
                            treatment.Taweez_Name
                        );


                    card.appendChild(p);
                }


                if (
                    treatment.Taweez_Notes
                ) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Notes / Instructions:</b><br>" +
                        escapeHtml(
                            treatment.Taweez_Notes
                        ).replace(
                            /\n/g,
                            "<br>"
                        );


                    card.appendChild(p);
                }


                if (
                    treatment.Taweez_Image_Url
                ) {

                    const image =
                        document.createElement(
                            "img"
                        );


                    image.src =
                        treatment.Taweez_Image_Url;


                    image.alt =
                        "Taweez";


                    image.style.width =
                        "180px";


                    image.style.maxWidth =
                        "100%";


                    image.style.display =
                        "block";


                    image.style.marginTop =
                        "10px";


                    image.style.borderRadius =
                        "10px";


                    image.style.cursor =
                        "pointer";


                    card.appendChild(
                        image
                    );
                }
            }



            // ==================================================
            // HERBAL REMEDY
            // ==================================================

            if (
                treatment.Herbal_Remedy ||
                treatment.Herbal_Notes
            ) {

                const title =
                    document.createElement(
                        "h4"
                    );


                title.textContent =
                    "🌿 Herbal Remedy";


                card.appendChild(
                    title
                );


                if (
                    treatment.Herbal_Remedy
                ) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Remedy:</b> " +
                        escapeHtml(
                            treatment.Herbal_Remedy
                        );


                    card.appendChild(p);
                }


                if (
                    treatment.Herbal_Notes
                ) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Notes / Instructions:</b><br>" +
                        escapeHtml(
                            treatment.Herbal_Notes
                        ).replace(
                            /\n/g,
                            "<br>"
                        );


                    card.appendChild(p);
                }
            }



            // ==================================================
            // WAZIFA
            // ==================================================

            if (
                treatment.Wazifa ||
                treatment.Wazifa_Notes
            ) {

                const title =
                    document.createElement(
                        "h4"
                    );


                title.textContent =
                    "📿 Wazifa";


                card.appendChild(
                    title
                );


                if (
                    treatment.Wazifa
                ) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Wazifa:</b> " +
                        escapeHtml(
                            treatment.Wazifa
                        );


                    card.appendChild(p);
                }


                if (
                    treatment.Wazifa_Notes
                ) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Notes / Instructions:</b><br>" +
                        escapeHtml(
                            treatment.Wazifa_Notes
                        ).replace(
                            /\n/g,
                            "<br>"
                        );


                    card.appendChild(p);
                }
            }



            // ==================================================
            // ADDITIONAL NOTES
            // ==================================================

            if (
                treatment.Additional_Notes
            ) {

                const title =
                    document.createElement(
                        "h4"
                    );


                title.textContent =
                    "📝 Additional Notes";


                card.appendChild(
                    title
                );


                const p =
                    document.createElement(
                        "p"
                    );


                p.innerHTML =
                    escapeHtml(
                        treatment.Additional_Notes
                    ).replace(
                        /\n/g,
                        "<br>"
                    );


                card.appendChild(
                    p
                );
            }



            // ==================================================
            // ADD RECORD TO PAGE
            // ==================================================

            historyBox.appendChild(
                card
            );

        }
    );
}



// ======================================================
// OPEN FORM
// ======================================================

function openTreatmentForm() {

    const form =
        document.getElementById(
            "treatmentForm"
        );


    if (!form) {
        return;
    }


    form.style.display =
        "block";


    form.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}



// ======================================================
// CLOSE FORM
// ======================================================

function closeTreatmentForm() {

    const form =
        document.getElementById(
            "treatmentForm"
        );


    if (!form) {
        return;
    }


    form.style.display =
        "none";
}



// ======================================================
// CLEAR FORM
// ======================================================

function clearTreatmentForm() {

    const ids = [

        "Taweez_Name",
        "Taweez_Notes",
        "Herbal_Remedy",
        "Herbal_Notes",
        "Wazifa",
        "Wazifa_Notes",
        "Additional_Notes"

    ];


    ids.forEach(
        function (id) {

            const element =
                document.getElementById(id);

            if (element) {
                element.value = "";
            }
        }
    );


    selectedTaweezImageUrl =
        null;


    const selected =
        document.getElementById(
            "selectedTaweez"
        );


    if (selected) {

        selected.innerHTML =
            "";
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
    // GET VALUES
    // ==================================================

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



    // ==================================================
    // VALIDATION
    // ==================================================

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



    // ==================================================
    // SAVE TO SUPABASE
    // ==================================================

    const {
        data,
        error
    } = await supabaseClient

        .from(
            "Mureed_Treatment_History"
        )

        .insert([{

            Mureed_Id:
                currentMureed.id,

            Appointment_Id:
                appointmentId,

            Taweez_Name:
            
