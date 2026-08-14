// ======================================================
// HUSSAIN BAPU'S WELLNESS
// MUREED DETAILS + TREATMENT HISTORY
// FINAL SIMPLE VERSION
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
                ${error.message || ""}
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
    // DISPLAY TREATMENTS
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


            // ------------------------------------------
            // DATE + TIME
            // ------------------------------------------

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



            // ------------------------------------------
            // TAWEEZ
            // ------------------------------------------

            if (
                treatment.Taweez_Name
            ) {

                const taweezTitle =
                    document.createElement(
                        "h4"
                    );


                taweezTitle.textContent =
                    "🧿 Taweez";


                const taweezName =
                    document.createElement(
                        "p"
                    );


                taweezName.innerHTML =
                    "<b>Name:</b> " +
                    escapeHtml(
                        treatment.Taweez_Name
                    );


                card.appendChild(
                    taweezTitle
                );


                card.appendChild(
                    taweezName
                );


                if (
                    treatment.Taweez_Notes
                ) {

                    const taweezNotes =
                        document.createElement(
                            "p"
                        );


                    taweezNotes.innerHTML =
                        "<b>Notes:</b> " +
                        escapeHtml(
                            treatment.Taweez_Notes
                        );


                    card.appendChild(
                        taweezNotes
                    );

                }


                // --------------------------------------
                // TAWEEZ IMAGE
                // --------------------------------------

                if (
                    treatment.Taweez_Image_Url
                ) {

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
                        "10px";


                    image.style.borderRadius =
                        "8px";


                    card.appendChild(
                        image
                    );

                }

            }



            // ------------------------------------------
            // HERBAL REMEDY
            // ------------------------------------------

            if (
                treatment.Herbal_Remedy
            ) {

                const herbalTitle =
                    document.createElement(
                        "h4"
                    );


                herbalTitle.textContent =
                    "🌿 Herbal Remedy";


                const herbalName =
                    document.createElement(
                        "p"
                    );


                herbalName.innerHTML =
                    "<b>Remedy:</b> " +
                    escapeHtml(
                        treatment.Herbal_Remedy
                    );


                card.appendChild(
                    herbalTitle
                );


                card.appendChild(
                    herbalName
                );


                if (
                    treatment.Herbal_Notes
                ) {

                    const herbalNotes =
                        document.createElement(
                            "p"
                        );


                    herbalNotes.innerHTML =
                        "<b>Notes:</b> " +
                        escapeHtml(
                            treatment.Herbal_Notes
                        );


                    card.appendChild(
                        herbalNotes
                    );

                }

            }



            // ------------------------------------------
            // WAZIFA
            // ------------------------------------------

            if (
                treatment.Wazifa
            ) {

                const wazifaTitle =
                    document.createElement(
                        "h4"
                    );


                wazifaTitle.textContent =
                    "📿 Wazifa";


                const wazifaName =
                    document.createElement(
                        "p"
                    );


                wazifaName.innerHTML =
                    "<b>Wazifa:</b> " +
                    escapeHtml(
                        treatment.Wazifa
                    );


                card.appendChild(
                    wazifaTitle
                );


                card.appendChild(
                    wazifaName
                );


                if (
                    treatment.Wazifa_Notes
                ) {

                    const wazifaNotes =
                        document.createElement(
                            "p"
                        );


                    wazifaNotes.innerHTML =
                        "<b>Notes:</b> " +
                        escapeHtml(
                            treatment.Wazifa_Notes
                        );


                    card.appendChild(
                        wazifaNotes
                    );

                }

            }



            // ------------------------------------------
            // ADDITIONAL NOTES
            // ------------------------------------------

            if (
                treatment.Additional_Notes
            ) {

                const additionalTitle =
                    document.createElement(
                        "h4"
                    );


                additionalTitle.textContent =
                    "📝 Additional Notes";


                const additionalNotes =
                    document.createElement(
                        "p"
                    );


                additionalNotes.innerHTML =
                    escapeHtml(
                        treatment.Additional_Notes
                    )
                    .replace(
                        /\n/g,
                        "<br>"
                    );


                card.appendChild(
                    additionalTitle
                );


                card.appendChild(
                    additionalNotes
                );

            }


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
    // GET FORM VALUES
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
    // AT LEAST ONE TREATMENT REQUIRED
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
        "Taweez_Name"
    ).value = "";


    document.getElementById(
        "Taweez_Notes"
    ).value = "";


    document.getElementById(
        "Herbal_Remedy"
    ).value = "";


    document.getElementById(
        "Herbal_Notes"
    ).value = "";


    document.getElementById(
        "Wazifa"
    ).value = "";


    document.getElementById(
        "Wazifa_Notes"
    ).value = "";


    document.getElementById(
        "Additional_Notes"
    ).value = "";


    const selectedTaweez =
        document.getElementById(
            "selectedTaweez"
        );


    if (selectedTaweez) {

        selectedTaweez.innerHTML =
            "";

    }



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
