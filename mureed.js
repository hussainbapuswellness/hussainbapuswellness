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


    const { data, error } =
        await supabaseClient

            .from("clients")

            .select("*")

            .eq(
                "Appointment_Id",
                appointmentId
            )

            .single();


    if (error) {

        console.error(
            "Mureed Load Error:",
            error
        );

        alert(
            "Mureed Not Found\n\n" +
            error.message
        );

        return;
    }


    currentMureed =
        data;


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
        function(id) {

            const element =
                document.getElementById(id);

            if (element) {

                element.textContent =
                    safeText(fields[id]);

            }

        }
    );


    await loadTreatmentHistory();
}


// ======================================================
// LOAD TREATMENT HISTORY
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


    if (error) {

        console.error(
            "Treatment History Error:",
            error
        );


        box.innerHTML =
            "<p>Unable to load Treatment History.</p>" +
            "<small>" +
            escapeHtml(
                error.message
            ) +
            "</small>";

        return;
    }


    const records =
        data || [];


    if (records.length === 0) {

        box.innerHTML =
            "<p>No Treatment Added Yet.</p>";

        return;
    }


    box.innerHTML =
        "";


    records.forEach(
        function(record) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card treatment-record";


            card.style.marginBottom =
                "15px";


            // ==================================================
            // DATE
            // ==================================================

            const date =
                document.createElement(
                    "h3"
                );


            date.textContent =
                "📅 " +
                (
                    record.Created_At
                        ? new Date(
                            record.Created_At
                        ).toLocaleString(
                            "en-IN"
                        )
                        : "-"
                );


            card.appendChild(
                date
            );


            // ==================================================
            // OLD TREATMENT RECORD
            // ==================================================

            if (
                record.Treatment_Type ||
                record.Category ||
                record.Item_Name ||
                record.Notes
            ) {

                const title =
                    document.createElement(
                        "h4"
                    );


                title.textContent =
                    "🩺 " +
                    (
                        record.Treatment_Type ||
                        "Treatment"
                    );


                card.appendChild(
                    title
                );


                if (record.Category) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Category:</b> " +
                        escapeHtml(
                            record.Category
                        );


                    card.appendChild(
                        p
                    );
                }


                if (record.Item_Name) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Name:</b> " +
                        escapeHtml(
                            record.Item_Name
                        );


                    card.appendChild(
                        p
                    );
                }


                if (record.Notes) {

                    const p =
                        document.createElement(
                            "p"
                        );


                    p.innerHTML =
                        "<b>Notes:</b><br>" +
                        escapeHtml(
                            record.Notes
                        ).replace(
                            /\n/g,
                            "<br>"
                        );


                    card.appendChild(
                        p
                    );
                }


                if (record.Image_Url) {

                    const image =
                        document.createElement(
                            "img"
                        );


                    image.src =
                        record.Image_Url;


                    image.style.width =
                        "180px";


                    image.style.maxWidth =
                        "100%";


                    image.style.display =
                        "block";


                    image.style.marginTop =
                        "8px";


                    image.style.borderRadius =
                        "8px";


                    image.style.cursor =
                        "pointer";


                    image.onclick =
                        function() {

                            openFullImage(
                                record.Image_Url
                            );

                        };


                    card.appendChild(
                        image
                    );
                }
            }


            // ==================================================
            // TAWEEZ
            // ==================================================

            if (
                record.Taweez_Name
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
                        record.Taweez_Name
                    );


                card.appendChild(
                    name
                );


                if (
                    record.Taweez_Notes
                ) {

                    const notes =
                        document.createElement(
                            "p"
                        );


                    notes.innerHTML =
                        "<b>Notes:</b><br>" +
                        escapeHtml(
                            record.Taweez_Notes
                        ).replace(
                            /\n/g,
                            "<br>"
                        );


                    card.appendChild(
                        notes
                    );
                }


                if (
                    record.Taweez_Image_Url
                ) {

                    const image =
                        document.createElement(
                            "img"
                        );


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


                    image.style.borderRadius =
                        "8px";


                    image.style.cursor =
                        "pointer";


                    image.onclick =
                        function() {

                            openFullImage(
                                record.Taweez_Image_Url
                            );

                        };


                    card.appendChild(
                        image
                    );
                }
            }


            // ==================================================
            // HERBAL REMEDY
            // ==================================================

            if (
                record.Herbal_Remedy
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
                        record.Herbal_Remedy
                    );


                card.appendChild(
                    name
                );


                if (
                    record.Herbal_Notes
                ) {

                    const notes =
                        document.createElement(
                            "p"
                        );


                    notes.innerHTML =
                        "<b>Notes:</b><br>" +
                        escapeHtml(
                            record.Herbal_Notes
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
                record.Wazifa
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
                        record.Wazifa
                    );


                card.appendChild(
                    name
                );


                if (
                    record.Wazifa_Notes
                ) {

                    const notes =
                        document.createElement(
                            "p"
                        );


                    notes.innerHTML =
                        "<b>Notes:</b><br>" +
                        escapeHtml(
                            record.Wazifa_Notes
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
                record.Additional_Notes
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
                        record.Additional_Notes
                    ).replace(
                        /\n/g,
                        "<br>"
                    );


                card.appendChild(
                    notes
                );
            }


            box.appendChild(
                card
            );

        }
    );
}


// ======================================================
// OPEN / CLOSE FORM
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
// FULL IMAGE PREVIEW
// ======================================================

function openFullImage(imageUrl) {

    if (!imageUrl) {
        return;
    }


    const overlay =
        document.createElement(
            "div"
        );


    overlay.id =
        "taweezImagePreview";


    overlay.style.position =
        "fixed";


    overlay.style.inset =
        "0";


    overlay.style.zIndex =
        "99999";


    overlay.style.background =
        "rgba(0,0,0,0.92)";


    overlay.style.display =
        "flex";


    overlay.style.flexDirection =
        "column";


    overlay.style.alignItems =
        "center";


    overlay.style.justifyContent =
        "center";


    overlay.style.padding =
        "15px";


    overlay.style.boxSizing =
        "border-box";


    const close =
        document.createElement(
            "button"
        );


    close.type =
        "button";


    close.textContent =
        "✕ Close";


    close.style.position =
        "absolute";


    close.style.top =
        "20px";


    close.style.right =
        "20px";


    close.style.padding =
        "10px 18px";


    close.style.border =
        "none";


    close.style.borderRadius =
        "8px";


    close.style.background =
        "#ffffff";


    close.style.color =
        "#111111";


    close.style.fontSize =
        "16px";


    close.style.fontWeight =
        "bold";


    close.style.cursor =
        "pointer";


    const image =
        document.createElement(
            "img"
        );


    image.src =
        imageUrl;


    image.style.maxWidth =
        "95vw";


    image.style.maxHeight =
        "75vh";


    image.style.objectFit =
        "contain";


    image.style.borderRadius =
        "8px";


    image.style.background =
        "#ffffff";


    image.style.padding =
        "5px";


    const selectButton =
        document.createElement(
            "button"
        );


    selectButton.type =
        "button";


    selectButton.textContent =
        "✅ Select This Taweez";


    selectButton.style.marginTop =
        "18px";


    selectButton.style.padding =
        "13px 24px";


    selectButton.style.border =
        "none";


    selectButton.style.borderRadius =
        "10px";


    selectButton.style.background =
        "#e5b935";


    selectButton.style.color =
        "#111111";


    selectButton.style.fontSize =
        "16px";


    selectButton.style.fontWeight =
        "bold";


    selectButton.style.cursor =
        "pointer";


    selectButton.onclick =
        function() {

            selectedTaweezImageUrl =
                imageUrl;


            const selectedBox =
                document.getElementById(
                    "selectedTaweez"
                );


            if (selectedBox) {

                selectedBox.innerHTML =
                    "<p>" +
                    "✅ <b>Taweez Image Selected</b>" +
                    "</p>";

            }


            overlay.remove();

        };


    close.onclick =
        function() {

            overlay.remove();

        };


    overlay.onclick =
        function(event) {

            if (
                event.target ===
                overlay
            ) {

                overlay.remove();

            }

        };


    overlay.appendChild(
        close
    );


    overlay.appendChild(
        image
    );


    overlay.appendChild(
        selectButton
    );


    document.body.appendChild(
        overlay
    );
}


// ======================================================
// TAWEEZ GALLERY
// ======================================================

async function selectTaweez() {

    const category =
        prompt(
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


    const {
        data,
        error
    } =
        await supabaseClient

            .from(
                "Taweez_Library"
            )

            .select("*")

            .eq(
                "Category",
                cleanCategory
            )

            .order(
                "Taweez_Name"
            );


    if (error) {

        console.error(
            "Taweez Library Error:",
            error
        );


        alert(
         
