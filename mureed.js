// ======================================================
// HUSSAIN BAPU'S WELLNESS
// MUREED DETAILS + TREATMENT HISTORY
// FULL SIMPLE VERSION
// ======================================================


// ======================================================
// URL / APPOINTMENT
// ======================================================

const params =
    new URLSearchParams(
        window.location.search
    );

const appointmentId =
    params.get("id");

let currentMureed =
    null;


// ======================================================
// SAFE TEXT
// ======================================================

function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;
}


// ======================================================
// LOAD MUREED
// ======================================================

async function loadMureed() {

    if (!appointmentId) {

        alert(
            "Appointment ID missing."
        );

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


    currentMureed =
        data;


    // ==================================================
    // MUREED DETAILS
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
    // LOAD TREATMENTS
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
            "treatmentHistory not found."
        );

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


    historyBox.innerHTML =
        "";


    // ==================================================
    // DISPLAY EVERY RECORD
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
                "15px";


            // ==================================================
            // DATE + TIME
            // ==================================================

            const dateTitle =
                document.createElement(
                    "h3"
                );


            const createdDate =
                treatment.Created_At
                    ? new Date(
                        treatment.Created_At
                    ).toLocaleString()
                    : "-";


            dateTitle.textContent =
                "📅 " +
                createdDate;


            card.appendChild(
                dateTitle
            );


            // ==================================================
            // OLD RECORD SUPPORT
            // ==================================================
            // Old records contain:
            // Treatment_Type
            // Category
            // Item_Name
            // Notes
            // Image_Url
            // ==================================================

            if (
                treatment.Treatment_Type ||
                treatment.Category ||
                treatment.Item_Name ||
                treatment.Notes ||
                treatment.Image_Url
            ) {

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


                // CATEGORY

                if (
                    treatment.Category
                ) {

                    const category =
                        document.createElement(
                            "p"
                        );


                    category.innerHTML =
                        "<b>Category:</b> " +
                        escapeHtml(
                            treatment.Category
                        );


                    card.appendChild(
                        category
                    );

                }


                // ITEM NAME

                if (
                    treatment.Item_Name
                ) {

                    const item =
                        document.createElement(
                            "p"
                        );


                    item.innerHTML =
                        "<b>Name:</b> " +
                        escapeHtml(
                            treatment.Item_Name
                        );


                    card.appendChild(
                        item
                    );

                }


                // NOTES

                if (
                    treatment.Notes
                ) {

                    const notes =
                        document.createElement(
                            "p"
                        );


                    notes.innerHTML =
                        "<b>Notes:</b> " +
                        escapeHtml(
                            treatment.Notes
                        ).replace(
                            /\n/g,
                            "<br>"
                        );


                    card.appendChild(
                        notes
                    );

                }


                // OLD IMAGE

                if (
                    treatment.Image_Url
                ) {

                    const imageTitle =
                        document.createElement(
                            "p"
                        );


                    imageTitle.innerHTML =
                        "<b>Image:</b>";


                    const image =
                        document.createElement(
                            "img"
                        );


                    image.src =
                        treatment.Image_Url;


                    image.style.maxWidth =
                        "180px";


                    image.style.display =
                        "block";


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

            }


            // ==================================================
            // NEW TAWEEZ
            // ==================================================

            if (
                treatment.Taweez_Name
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


                const name =
                    document.createElement(
                        "p"
                    );


                name.innerHTML =
                    "<b>Name:</b> " +
                    escapeHtml(
                        treatment.Taweez_Name
                    );


                card.appendChild(
                    name
                );


                if (
                    treatment.Taweez_Notes
                ) {

                    const notes =
                        document.createElement(
                            "p"
                        );


                    notes.innerHTML =
                        "<b>Notes:</b> " +
                        escapeHtml(
                            treatment.Taweez_Notes
                        ).replace(
                            /\n/g,
                            "<br>"
                        );


                    card.appendChild(
                        notes
                    );

                }


                // TAWEEZ IMAGE

                if (
                    treatment.Taweez_Image_Url
                ) {

                    const imageTitle =
                        document.createElement(
                            "p"
                        );


                    imageTitle.innerHTML =
                        "<b>Taweez Image:</b>";


                    const image =
                        document.createElement(
                            "img"
                        );


                    image.src =
                        treatment.Taweez_Image_Url;


                    image.style.maxWidth =
                        "180px";


                    image.style.display =
                        "block";


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

            }


            // ==================================================
            // HERBAL REMEDY
            // ==================================================

            if (
                treatment.Herbal_Remedy
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


                const name =
                    document.createElement(
                        "p"
                    );


                name.innerHTML =
                    "<b>Remedy:</b> " +
                    escapeHtml(
                        treatment.Herbal_Remedy
                    );


                card.appendChild(
                    name
                );


                if (
                    treatment.Herbal_Notes
                ) {

                    const notes =
                        document.createElement(
                            "p"
                        );


                    notes.innerHTML =
                        "<b>Notes:</b> " +
                        escapeHtml(
                            treatment.Herbal_Notes
                        ).replace(
                            /\n/g,
                            "<br>"
                        );


                    card.appendChild(
                        notes
                    );

                }

            }


            // ==================================================
            // WAZIFA
            // ==================================================

            if (
                treatment.Wazifa
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


                const name =
                    document.createElement(
                        "p"
                    );


                name.innerHTML =
                    "<b>Wazifa:</b> " +
                    escapeHtml(
                        treatment.Wazifa
                    );


                card.appendChild(
                    name
                );


                if (
                    treatment.Wazifa_Notes
                ) {

                    const notes =
                        document.createElement(
                            "p"
                        );


                    notes.innerHTML =
                        "<b>Notes:</b> " +
                        escapeHtml(
                            treatment.Wazifa_Notes
                        ).replace(
                            /\n/g,
                            "<br>"
                        );


                    card.appendChild(
                        notes
                    );

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


                const notes =
                    document.createElement(
                        "p"
                    );


                notes.innerHTML =
                    escapeHtml(
                        treatment.Additional_Notes
                    ).replace(
                        /\n/g,
                        "<br>"
                    );


                card.appendChild(
                    notes
                );

            }


            // ==================================================
            // ADD CARD
            // ==================================================

            historyBox.appendChild(
                card
            );

        }
    );

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
    // GET VALUES
    // ==================================================

    const taweezName =
        document.getElementById(
            "Taweez_Name"
        ).value.trim();


    const taweezNotes =
        document.getElementById(
            "Taweez_Notes"
        ).value.trim();


    const herbalRemedy =
        document.getElementById(
            "Herbal_Remedy"
        ).value.trim();


    const herbalNotes =
        document.getElementById(
            "Herbal_Notes"
        ).value.trim();


    const wazifa =
        document.getElementById(
            "Wazifa"
        ).value.trim();


    const wazifaNotes =
        document.getElementById(
            "Wazifa_Notes"
        ).value.trim();


    const additionalNotes =
        document.getElementById(
            "Additional_Notes"
        ).value.trim();



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
    // SAVE
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
                taweezName || null,

            Taweez_Notes:
                taweezNotes || null,

            Taweez_Image_Url:
                null,

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

        
