// ======================================================
// HUSSAIN BAPU'S WELLNESS
// ADMIN DASHBOARD
// FINAL COMPLETE VERSION
// PART 1 / 5
// ======================================================


// ======================================================
// WHATSAPP BUSINESS NUMBER
// ======================================================

const WHATSAPP_BUSINESS_NUMBER =
    "919998556782";


// ======================================================
// BRAND INFORMATION
// ======================================================

const BRAND_NAME =
    "HUSSAIN BAPU'S WELLNESS & BABA FARID JI (R.A) HERITAGE";


// ======================================================
// WEBSITE / LOCATION INFORMATION
// ======================================================

const WEBSITE_LINK =
    window.location.origin;

const GOOGLE_MAP_LINK =
    "https://maps.google.com/";


// ======================================================
// GLOBAL DATA
// ======================================================

let allMureeds = [];

let selectedMureed = null;


// ======================================================
// SAFE ELEMENT GETTER
// ======================================================

function getElement(id) {

    return document.getElementById(id);

}


// ======================================================
// SAFE TEXT
// ======================================================

function safeText(value) {

    if (
        value === null ||
        value === undefined ||
        String(value).trim() === ""
    ) {

        return "-";

    }

    return String(value);

}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHtml(value) {

    return String(value ?? "")

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


// ======================================================
// SHOW DASHBOARD MESSAGE
// ======================================================

function setDashboardMessage(message) {

    const element =
        getElement("dashboardMessage");


    if (element) {

        element.textContent =
            message;

    }

}


// ======================================================
// SHOW TABLE MESSAGE
// ======================================================

function setTableMessage(message) {

    const tbody =
        document.querySelector(
            "#mureedsTable tbody"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = `

        <tr>

            <td
                colspan="5"
                style="
                    text-align:center;
                    padding:20px;
                "
            >

                ${escapeHtml(message)}

            </td>

        </tr>

    `;

}


// ======================================================
// LOAD MUREEDS
// ======================================================

async function loadMureeds() {

    const tbody =
        document.querySelector(
            "#mureedsTable tbody"
        );


    if (!tbody) {

        console.error(
            "ERROR: #mureedsTable tbody not found."
        );

        return;

    }


    // --------------------------------------------------
    // INITIAL LOADING MESSAGE
    // --------------------------------------------------

    setTableMessage(
        "Loading appointments..."
    );


    setDashboardMessage(
        "Loading dashboard..."
    );


    // --------------------------------------------------
    // CHECK SUPABASE
    // --------------------------------------------------

    if (
        typeof supabaseClient === "undefined" ||
        !supabaseClient
    ) {

        console.error(
            "ERROR: supabaseClient is not available."
        );


        setTableMessage(
            "Supabase connection is not available."
        );


        setDashboardMessage(
            "⚠️ Supabase connection unavailable."
        );


        return;

    }


    // --------------------------------------------------
    // FETCH CLIENTS
    // --------------------------------------------------

    try {

        const {
            data,
            error
        } = await supabaseClient

            .from("clients")

            .select("*");


        // ------------------------------------------------
        // SUPABASE ERROR
        // ------------------------------------------------

        if (error) {

            console.error(
                "SUPABASE CLIENT LOAD ERROR:",
                error
            );


            setTableMessage(
                "Unable to load appointments."
            );


            setDashboardMessage(
                "⚠️ Unable to load dashboard data."
            );


            return;

        }


        // ------------------------------------------------
        // SAVE DATA
        // ------------------------------------------------

        allMureeds =
            Array.isArray(data)
                ? data
                : [];


        // ------------------------------------------------
        // TOTAL MUREEDS
        // ------------------------------------------------

        const totalElement =
            getElement(
                "totalMureeds"
            );


        if (totalElement) {

            totalElement.textContent =
                allMureeds.length;

        }


        // ------------------------------------------------
        // PENDING APPOINTMENTS
        // ------------------------------------------------

        const pendingMureeds =
            allMureeds.filter(
                function (mureed) {

                    return String(
                        mureed.Appointment_Status || ""
                    )
                    .trim()
                    .toLowerCase()
                    === "pending";

                }
            );


        const pendingElement =
            getElement(
                "pendingAppointments"
            );


        if (pendingElement) {

            pendingElement.textContent =
                pendingMureeds.length;

        }


        // ------------------------------------------------
        // DASHBOARD STATUS
        // ------------------------------------------------

        if (
            allMureeds.length > 0
        ) {

            setDashboardMessage(
                "✅ Dashboard loaded successfully."
            );

        } else {

            setDashboardMessage(
                "No Mureed appointments found."
            );

        }


        // ------------------------------------------------
        // RENDER APPOINTMENTS
        // ------------------------------------------------

        renderMureeds(
            allMureeds
        );


    }

    catch (error) {

        console.error(
            "ADMIN DASHBOARD LOAD ERROR:",
            error
        );


        setTableMessage(
            "Something went wrong while loading appointments."
        );


        setDashboardMessage(
            "⚠️ Dashboard loading failed."
        );

    }

}


// ======================================================
// RENDER MUREEDS
// ======================================================

function renderMureeds(
    mureeds
) {

    const tbody =
        document.querySelector(
            "#mureedsTable tbody"
        );


    if (!tbody) {

        console.error(
            "ERROR: Appointment table body not found."
        );

        return;

    }


    tbody.innerHTML = "";


    // --------------------------------------------------
    // EMPTY RESULT
    // --------------------------------------------------

    if (
        !Array.isArray(mureeds) ||
        mureeds.length === 0
    ) {

        setTableMessage(
            "No appointments found."
        );

        return;

    }


    // --------------------------------------------------
    // SORT
    // Pending appointments first
    // --------------------------------------------------

    const sortedMureeds =
        [...mureeds].sort(
            function (a, b) {

                const aStatus =
                    String(
                        a.Appointment_Status || ""
                    )
                    .trim()
                    .toLowerCase();


                const bStatus =
                    String(
                        b.Appointment_Status || ""
                    )
                    .trim()
                    .toLowerCase();


                const aPending =
                    aStatus === "pending";


                const bPending =
                    bStatus === "pending";


                if (
                    aPending &&
                    !bPending
                ) {

                    return -1;

                }


                if (
                    !aPending &&
                    bPending
                ) {

                    return 1;

                }


                return 0;

            }
        );


    // --------------------------------------------------
    // CREATE ROWS
    // --------------------------------------------------

    sortedMureeds.forEach(
        function (mureed) {


            const row =
                document.createElement(
                    "tr"
                );


            // --------------------------------------------
            // APPOINTMENT ID
            // --------------------------------------------

            const appointmentCell =
                document.createElement(
                    "td"
                );


            appointmentCell.textContent =
                safeText(
                    mureed.Appointment_Id
                );


            // --------------------------------------------
            // FULL NAME
            // --------------------------------------------

            const nameCell =
                document.createElement(
                    "td"
                );


            nameCell.textContent =
                safeText(
                    mureed.Full_Name
                );


            // --------------------------------------------
            // MOBILE
            // --------------------------------------------

            const mobileCell =
                document.createElement(
                    "td"
                );


            mobileCell.textContent =
                safeText(
                    mureed.Mobile
                );


            // --------------------------------------------
            // STATUS
            // --------------------------------------------

            const statusCell =
                document.createElement(
                    "td"
                );


            statusCell.textContent =
                safeText(
                    mureed.Appointment_Status
                );


            // --------------------------------------------
            // ACTION
            // --------------------------------------------

            const actionCell =
                document.createElement(
                    "td"
                );


            const selectButton =
                document.createElement(
                    "button"
                );


            selectButton.type =
                "button";


            selectButton.textContent =
                "Select";


            selectButton.className =
                "gold-btn";


            selectButton.addEventListener(
                "click",
                function () {

                    selectMureed(
                        mureed
                    );

                }
            );


            actionCell.appendChild(
                selectButton
            );


            // --------------------------------------------
            // APPEND CELLS
            // --------------------------------------------

            row.appendChild(
                appointmentCell
            );


            row.appendChild(
                nameCell
            );


            row.appendChild(
                mobileCell
            );


            row.appendChild(
                statusCell
            );


            row.appendChild(
                actionCell
            );


            tbody.appendChild(
                row
            );

        }
    );

                  }
// ======================================================
// PART 2 / 5
// SEARCH + MUREED SELECTION
// ======================================================


// ======================================================
// SEARCH MUREEDS
// ======================================================

const searchBox =
    getElement("searchBox");


if (searchBox) {

    searchBox.addEventListener(
        "input",
        function () {

            const search =
                String(
                    this.value || ""
                )
                .trim()
                .toLowerCase();


            // --------------------------------------------
            // EMPTY SEARCH
            // --------------------------------------------

            if (!search) {

                renderMureeds(
                    allMureeds
                );

                return;

            }


            // --------------------------------------------
            // FILTER
            // --------------------------------------------

            const filtered =
                allMureeds.filter(
                    function (mureed) {

                        const name =
                            String(
                                mureed.Full_Name || ""
                            )
                            .toLowerCase();


                        const mobile =
                            String(
                                mureed.Mobile || ""
                            )
                            .toLowerCase();


                        const whatsapp =
                            String(
                                mureed.Whatsapp || ""
                            )
                            .toLowerCase();


                        const appointmentId =
                            String(
                                mureed.Appointment_Id || ""
                            )
                            .toLowerCase();


                        return (

                            name.includes(
                                search
                            )

                            ||

                            mobile.includes(
                                search
                            )

                            ||

                            whatsapp.includes(
                                search
                            )

                            ||

                            appointmentId.includes(
                                search
                            )

                        );

                    }
                );


            // --------------------------------------------
            // DISPLAY FILTERED
            // --------------------------------------------

            renderMureeds(
                filtered
            );

        }
    );

}



// ======================================================
// SELECT MUREED
// ======================================================

function selectMureed(
    mureed
) {

    // --------------------------------------------------
    // SAVE SELECTED MUREED
    // --------------------------------------------------

    selectedMureed =
        mureed;


    // --------------------------------------------------
    // SELECTED MUREED BOX
    // --------------------------------------------------

    const selectedBox =
        getElement(
            "selectedMureedBox"
        );


    if (selectedBox) {

        selectedBox.innerHTML = `

            <div
                style="
                    padding:15px;
                    border-radius:10px;
                "
            >

                <p>
                    👤
                    <strong>Name:</strong>
                    ${escapeHtml(
                        safeText(
                            mureed.Full_Name
                        )
                    )}
                </p>

                <p>
                    📅
                    <strong>Appointment ID:</strong>
                    ${escapeHtml(
                        safeText(
                            mureed.Appointment_Id
                        )
                    )}
                </p>

                <p>
                    📱
                    <strong>Mobile:</strong>
                    ${escapeHtml(
                        safeText(
                            mureed.Mobile
                        )
                    )}
                </p>

                <p>
                    💬
                    <strong>WhatsApp:</strong>
                    ${escapeHtml(
                        safeText(
                            mureed.Whatsapp ||
                            mureed.Mobile
                        )
                    )}
                </p>

                <p>
                    📌
                    <strong>Status:</strong>
                    ${escapeHtml(
                        safeText(
                            mureed.Appointment_Status
                        )
                    )}
                </p>

                <p>
                    🩺
                    <strong>Consultation:</strong>
                    ${escapeHtml(
                        safeText(
                            mureed.Consultation_Type
                        )
                    )}
                </p>

                <p>
                    📂
                    <strong>Problem Category:</strong>
                    ${escapeHtml(
                        safeText(
                            mureed.Problem_Category
                        )
                    )}
                </p>

            </div>

        `;

    }


    // --------------------------------------------------
    // OPEN MUREED BUTTON
    // --------------------------------------------------

    const openMureedButton =
        getElement(
            "openMureedBtn"
        );


    if (openMureedButton) {

        openMureedButton.disabled =
            false;


        openMureedButton.onclick =
            function () {

                const appointmentId =
                    mureed.Appointment_Id;


                if (!appointmentId) {

                    alert(
                        "Appointment ID not found."
                    );

                    return;

                }


                window.location.href =
                    "mureed.html?id=" +
                    encodeURIComponent(
                        appointmentId
                    );

            };

    }


    // --------------------------------------------------
    // SHOW CONFIRMATION CARD
    // --------------------------------------------------

    const confirmationCard =
        getElement(
            "confirmationCard"
        );


    if (confirmationCard) {

        confirmationCard.style.display =
            "block";

    }


    // --------------------------------------------------
    // CONFIRMATION NAME
    // --------------------------------------------------

    const confirmationName =
        getElement(
            "confirmationMureedName"
        );


    if (confirmationName) {

        confirmationName.textContent =
            "👤 Mureed: " +
            safeText(
                mureed.Full_Name
            );

    }


    // --------------------------------------------------
    // CONFIRMATION WHATSAPP
    // --------------------------------------------------

    const confirmationMobile =
        getElement(
            "confirmationMobile"
        );


    if (confirmationMobile) {

        confirmationMobile.textContent =
            "📱 WhatsApp: " +
            safeText(
                mureed.Whatsapp ||
                mureed.Mobile
            );

    }


    // --------------------------------------------------
    // EXISTING APPOINTMENT DATE
    // --------------------------------------------------

    const appointmentDate =
        getElement(
            "appointmentDate"
        );


    if (appointmentDate) {

        appointmentDate.value =
            normalizeDateValue(
                mureed.Appointment_Date
            );

    }


    // --------------------------------------------------
    // EXISTING APPOINTMENT TIME
    // --------------------------------------------------

    const appointmentTime =
        getElement(
            "appointmentTime"
        );


    if (appointmentTime) {

        appointmentTime.value =
            normalizeTimeValue(
                mureed.Appointment_Time
            );

    }


    // --------------------------------------------------
    // SCROLL TO CONFIRMATION
    // --------------------------------------------------

    if (confirmationCard) {

        setTimeout(
            function () {

                confirmationCard.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            },
            100
        );

    }

}

// ======================================================
// PART 3 / 5
// APPOINTMENT CONFIRMATION + SUPABASE UPDATE
// ======================================================


// ======================================================
// CONFIRM APPOINTMENT BUTTON
// ======================================================

const confirmAppointmentButton =
    getElement(
        "confirmAppointmentBtn"
    );


if (confirmAppointmentButton) {

    confirmAppointmentButton.addEventListener(
        "click",
        confirmAppointment
    );

}


// ======================================================
// CONFIRM APPOINTMENT
// ======================================================

async function confirmAppointment() {

    // --------------------------------------------------
    // CHECK SELECTED MUREED
    // --------------------------------------------------

    if (!selectedMureed) {

        alert(
            "Please select a Mureed first."
        );

        return;

    }


    // --------------------------------------------------
    // GET DATE
    // --------------------------------------------------

    const dateElement =
        getElement(
            "appointmentDate"
        );


    const date =
        dateElement
            ? dateElement.value.trim()
            : "";


    // --------------------------------------------------
    // GET TIME
    // --------------------------------------------------

    const timeElement =
        getElement(
            "appointmentTime"
        );


    const time =
        timeElement
            ? timeElement.value.trim()
            : "";


    // --------------------------------------------------
    // VALIDATE DATE
    // --------------------------------------------------

    if (!date) {

        alert(
            "Please select appointment date."
        );

        return;

    }


    // --------------------------------------------------
    // VALIDATE TIME
    // --------------------------------------------------

    if (!time) {

        alert(
            "Please select appointment time."
        );

        return;

    }


    // --------------------------------------------------
    // GET WHATSAPP NUMBER
    // --------------------------------------------------

    let whatsappNumber =
        selectedMureed.Whatsapp ||
        selectedMureed.Mobile ||
        "";


    whatsappNumber =
        String(
            whatsappNumber
        )
        .replace(
            /\D/g,
            ""
        );


    // --------------------------------------------------
    // INDIA NUMBER
    // --------------------------------------------------

    if (
        whatsappNumber.length === 10
    ) {

        whatsappNumber =
            "91" +
            whatsappNumber;

    }


    // --------------------------------------------------
    // VALIDATE NUMBER
    // --------------------------------------------------

    if (
        whatsappNumber.length < 10
    ) {

        alert(
            "Mureed WhatsApp number is missing or invalid."
        );

        return;

    }


    // --------------------------------------------------
    // FORMAT DATE
    // --------------------------------------------------

    const formattedDate =
        formatDate(
            date
        );


    // --------------------------------------------------
    // FORMAT TIME
    // --------------------------------------------------

    const formattedTime =
        formatTime(
            time
        );


    // --------------------------------------------------
    // MUREED NAME
    // --------------------------------------------------

    const mureedName =
        safeText(
            selectedMureed.Full_Name
        );


    // ==================================================
    // SAVE APPOINTMENT IN SUPABASE
    // ==================================================

    const updateData = {

        Appointment_Status:
            "Confirmed",

        Appointment_Date:
            date,

        Appointment_Time:
            time,

        Updated_At:
            new Date().toISOString()

    };


    try {

        // ------------------------------------------------
        // UPDATE CLIENT
        // ------------------------------------------------
        //
        // IMPORTANT:
        // .single() intentionally NOT used here.
        //
        // Supabase returns an array from .select().
        // We safely handle that array below.
        // ------------------------------------------------

        const {
            data: updatedMureeds,
            error: updateError
        } = await supabaseClient

            .from("clients")

            .update(
                updateData
            )

            .eq(
                "Appointment_Id",
                selectedMureed.Appointment_Id
            )

            .select();


        // ------------------------------------------------
        // UPDATE ERROR
        // ------------------------------------------------

        if (updateError) {

            console.error(
                "APPOINTMENT UPDATE ERROR:",
                updateError
            );


            alert(
                "Appointment could not be saved.\n\n" +
                "Error Code: " +
                (
                    updateError.code ||
                    ""
                ) +
                "\n\n" +
                "Error: " +
                (
                    updateError.message ||
                    "Unknown error"
                ) +
                "\n\n" +
                "Details: " +
                (
                    updateError.details ||
                    ""
                ) +
                "\n\n" +
                "Hint: " +
                (
                    updateError.hint ||
                    ""
                )
            );


            return;

        }


        // ------------------------------------------------
        // CHECK UPDATED ROW
        // ------------------------------------------------

        if (
            !Array.isArray(
                updatedMureeds
            ) ||
            updatedMureeds.length === 0
        ) {

            console.error(
                "NO CLIENT ROW RETURNED AFTER UPDATE:",
                updatedMureeds
            );


            alert(
                "Appointment could not be saved.\n\n" +
                "No matching client record was returned by Supabase.\n\n" +
                "Please check the Appointment ID and Supabase update policy."
            );


            return;

        }


        // ------------------------------------------------
        // GET UPDATED MUREED
        // ------------------------------------------------

        const updatedMureed =
            updatedMureeds[0];


        // ------------------------------------------------
        // UPDATE LOCAL SELECTED MUREED
        // ------------------------------------------------

        selectedMureed =
            updatedMureed;


        // ------------------------------------------------
        // UPDATE LOCAL ARRAY
        // ------------------------------------------------

        const index =
            allMureeds.findIndex(
                function (item) {

                    return (
                        item.Appointment_Id ===
                        updatedMureed.Appointment_Id
                    );

                }
            );


        if (index !== -1) {

            allMureeds[index] =
                updatedMureed;

        }


    }

    catch (error) {

        console.error(
            "APPOINTMENT SAVE ERROR:",
            error
        );


        alert(
            "Something went wrong while saving appointment.\n\n" +
            "Error: " +
            (
                error.message ||
                "Unknown error"
            )
        );


        return;

    }


    // ==================================================
    // UPDATE DASHBOARD COUNTERS
    // ==================================================

    const pendingMureeds =
        allMureeds.filter(
            function (mureed) {

                return String(
                    mureed.Appointment_Status || ""
                )
                .trim()
                .toLowerCase()
                === "pending";

            }
        );


    const pendingElement =
        getElement(
            "pendingAppointments"
        );


    if (pendingElement) {

        pendingElement.textContent =
            pendingMureeds.length;

    }


    // ==================================================
    // REFRESH SELECTED MUREED DETAILS
    // ==================================================

    const selectedBox =
        getElement(
            "selectedMureedBox"
        );


    if (selectedBox) {

        selectedBox.innerHTML = `

            <div
                style="
                    padding:15px;
                    border-radius:10px;
                "
            >

                <p>
                    👤
                    <strong>Name:</strong>
                    ${escapeHtml(
                        mureedName
                    )}
                </p>

                <p>
                    📅
                    <strong>Appointment ID:</strong>
                    ${escapeHtml(
                        safeText(
                            selectedMureed.Appointment_Id
                        )
                    )}
                </p>

                <p>
                    📱
                    <strong>Mobile:</strong>
                    ${escapeHtml(
                        safeText(
                            selectedMureed.Mobile
                        )
                    )}
                </p>

                <p>
                    💬
                    <strong>WhatsApp:</strong>
                    ${escapeHtml(
                        safeText(
                            selectedMureed.Whatsapp ||
                            selectedMureed.Mobile
                        )
                    )}
                </p>

                <p>
                    📌
                    <strong>Status:</strong>
                    <strong>Confirmed</strong>
                </p>

                <p>
                    📅
                    <strong>Date:</strong>
                    ${escapeHtml(
                        formattedDate
                    )}
                </p>

                <p>
                    🕐
                    <strong>Time:</strong>
                    ${escapeHtml(
                        formattedTime
                    )}
                </p>

            </div>

        `;

    }


    // ==================================================
    // UPDATE CONFIRMATION CARD
    // ==================================================

    const confirmationName =
        getElement(
            "confirmationMureedName"
        );


    if (confirmationName) {

        confirmationName.textContent =
            "👤 Mureed: " +
            mureedName;

    }


    const confirmationMobile =
        getElement(
            "confirmationMobile"
        );


    if (confirmationMobile) {

        confirmationMobile.textContent =
            "📱 WhatsApp: " +
            safeText(
                selectedMureed.Whatsapp ||
                selectedMureed.Mobile
            );

    }


    // ==================================================
    // DISABLE BUTTON TEMPORARILY
    // ==================================================

    if (confirmAppointmentButton) {

        confirmAppointmentButton.disabled =
            true;

        confirmAppointmentButton.textContent =
            "Preparing WhatsApp...";

    }


    // ==================================================
    // STORE CONFIRMATION DATA
    // ==================================================

    window.__lastAppointmentConfirmation = {

        name:
            mureedName,

        appointmentId:
            safeText(
                selectedMureed.Appointment_Id
            ),

        date:
            formattedDate,

        time:
            formattedTime,

        whatsapp:
            whatsappNumber

    };


    // ==================================================
    // CONTINUE TO WHATSAPP
    // ==================================================

    openAppointmentWhatsApp(
        whatsappNumber,
        mureedName,
        formattedDate,
        formattedTime
    );

        }
        
// ======================================================
// PART 4 / 5
// ATTRACTIVE WHATSAPP CONFIRMATION MESSAGE
// ======================================================


// ======================================================
// OPEN APPOINTMENT WHATSAPP
// ======================================================

function openAppointmentWhatsApp(
    whatsappNumber,
    mureedName,
    formattedDate,
    formattedTime
) {


    // --------------------------------------------------
    // SAFETY CHECK
    // --------------------------------------------------

    if (!whatsappNumber) {

        alert(
            "WhatsApp number is missing."
        );

        restoreConfirmButton();

        return;

    }


    // ==================================================
    // COMPLETE BRANDED MESSAGE
    // ==================================================

    const message =

`✨ *${BRAND_NAME}* ✨

━━━━━━━━━━━━━━━━━━━━

🌿 *APPOINTMENT CONFIRMATION* 🌿

Dear *${mureedName}*,

We are pleased to confirm your appointment with us.

📋 *Appointment Details*

🆔 Appointment ID:
*${safeText(
    selectedMureed
        ? selectedMureed.Appointment_Id
        : "-"
)}*

📅 Date:
*${formattedDate}*

🕐 Time:
*${formattedTime}*

━━━━━━━━━━━━━━━━━━━━

🤝 *Consultation Guidance*

For regular consultation, please use your scheduled appointment for:

💻 *Online Consultation*
or
🏛️ *Physical Darbar Visit*

This helps us provide proper time and attention to every Mureed.

━━━━━━━━━━━━━━━━━━━━

🚨 *IMPORTANT — EMERGENCY*

For a genuine emergency only, please contact us by phone when absolutely necessary.

For regular matters, kindly book an appointment rather than calling directly.

━━━━━━━━━━━━━━━━━━━━

📍 *Visit / Location*
Please use our official website or Google Maps location for directions and latest information.

🌐 *Website:*
${WEBSITE_LINK}

📍 *Google Maps:*
${GOOGLE_MAP_LINK}

━━━━━━━━━━━━━━━━━━━━

Thank you for choosing

*${BRAND_NAME}*

🌿 *Traditional Wisdom • Trusted Care • Modern Wellness*

━━━━━━━━━━━━━━━━━━━━

*Please save our official WhatsApp number for future appointment communication.*`;



    // ==================================================
    // CREATE WHATSAPP URL
    // ==================================================

    const whatsappUrl =

        "https://wa.me/" +

        whatsappNumber +

        "?text=" +

        encodeURIComponent(
            message
        );



    // ==================================================
    // OPEN WHATSAPP
    // ==================================================

    try {

        window.location.href =
            whatsappUrl;

    }

    catch (error) {

        console.error(
            "WHATSAPP OPEN ERROR:",
            error
        );


        // Fallback
        window.open(
            whatsappUrl,
            "_blank"
        );

    }


    // ==================================================
    // RESTORE BUTTON
    // ==================================================

    setTimeout(
        function () {

            restoreConfirmButton();

        },
        1500
    );

}



// ======================================================
// RESTORE CONFIRM BUTTON
// ======================================================

function restoreConfirmButton() {

    const button =
        getElement(
            "confirmAppointmentBtn"
        );


    if (!button) {

        return;

    }


    button.disabled =
        false;


    button.textContent =
        "📲 Confirm & Open WhatsApp";

}



// ======================================================
// OPTIONAL: OPEN WHATSAPP MANUALLY
// ======================================================

function openWhatsAppForSelectedMureed() {

    if (!selectedMureed) {

        alert(
            "Please select a Mureed first."
        );

        return;

    }


    let whatsappNumber =
        selectedMureed.Whatsapp ||
        selectedMureed.Mobile ||
        "";


    whatsappNumber =
        String(
            whatsappNumber
        )
        .replace(
            /\D/g,
            ""
        );


    if (
        whatsappNumber.length === 10
    ) {

        whatsappNumber =
            "91" +
            whatsappNumber;

    }


    if (
        whatsappNumber.length < 10
    ) {

        alert(
            "Mureed WhatsApp number is missing or invalid."
        );

        return;

    }


    const message =

`Hello! Welcome to *${BRAND_NAME}*.

Dear *${safeText(
    selectedMureed.Full_Name
)}*,

For appointment booking, online consultation, or physical Darbar visit, please use our official website.

🌐 ${WEBSITE_LINK}

📍 Location:
${GOOGLE_MAP_LINK}

🚨 For genuine emergencies only, please contact us by phone.

Thank you,
*${BRAND_NAME}*`;



    const url =

        "https://wa.me/" +

        whatsappNumber +

        "?text=" +

        encodeURIComponent(
            message
        );


    window.location.href =
        url;

}
// ======================================================
// PART 5 / 5
// DATE + TIME HELPERS
// NORMALIZATION
// START APPLICATION
// ======================================================


// ======================================================
// FORMAT DATE
// ======================================================

function formatDate(
    dateString
) {

    if (!dateString) {

        return "-";

    }


    try {

        const date =
            new Date(
                dateString +
                "T00:00:00"
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return dateString;

        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    }

    catch (error) {

        console.error(
            "DATE FORMAT ERROR:",
            error
        );


        return dateString;

    }

}



// ======================================================
// FORMAT TIME
// ======================================================

function formatTime(
    timeString
) {

    if (!timeString) {

        return "-";

    }


    try {

        const parts =
            String(
                timeString
            ).split(":");


        const hours =
            parseInt(
                parts[0],
                10
            );


        const minutes =
            parseInt(
                parts[1] || "0",
                10
            );


        if (
            Number.isNaN(
                hours
            )
        ) {

            return timeString;

        }


        const date =
            new Date();


        date.setHours(
            hours,
            minutes,
            0,
            0
        );


        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            }
        );

    }

    catch (error) {

        console.error(
            "TIME FORMAT ERROR:",
            error
        );


        return timeString;

    }

}



// ======================================================
// NORMALIZE DATE VALUE
// ======================================================
//
// Supabase se date aa sakti hai:
// YYYY-MM-DD
// ya timestamp format.
//
// HTML date input ko sirf YYYY-MM-DD chahiye.
// ======================================================

function normalizeDateValue(
    value
) {

    if (!value) {

        return "";

    }


    const text =
        String(
            value
        ).trim();


    // Already correct
    if (
        /^\d{4}-\d{2}-\d{2}$/.test(
            text
        )
    ) {

        return text;

    }


    // Timestamp / ISO
    if (
        text.includes("T")
    ) {

        return text
            .split("T")[0];

    }


    // Try Date object
    try {

        const date =
            new Date(
                text
            );


        if (
            !Number.isNaN(
                date.getTime()
            )
        ) {

            const year =
                date.getFullYear();


            const month =
                String(
                    date.getMonth() + 1
                )
                .padStart(
                    2,
                    "0"
                );


            const day =
                String(
                    date.getDate()
                )
                .padStart(
                    2,
                    "0"
                );


            return (
                year +
                "-" +
                month +
                "-" +
                day
            );

        }

    }

    catch (error) {

        console.error(
            "DATE NORMALIZATION ERROR:",
            error
        );

    }


    return "";

}



// ======================================================
// NORMALIZE TIME VALUE
// ======================================================
//
// Supabase mein Appointment_Time text ho sakta hai:
// 10:30
// 10:30:00
// 10:30 AM
//
// HTML time input ko HH:MM chahiye.
// ======================================================

function normalizeTimeValue(
    value
) {

    if (!value) {

        return "";

    }


    const text =
        String(
            value
        )
        .trim();


    // HH:MM
    if (
        /^\d{2}:\d{2}$/.test(
            text
        )
    ) {

        return text;

    }


    // HH:MM:SS
    if (
        /^\d{2}:\d{2}:\d{2}$/.test(
            text
        )
    ) {

        return text.substring(
            0,
            5
        );

    }


    // AM / PM format
    const match =
        text.match(
            /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
        );


    if (match) {

        let hours =
            parseInt(
                match[1],
                10
            );


        const minutes =
            match[2];


        const period =
            match[3]
                .toUpperCase();


        if (
            period === "AM" &&
            hours === 12
        ) {

            hours = 0;

        }


        if (
            period === "PM" &&
            hours !== 12
        ) {

            hours += 12;

        }


        return (
            String(
                hours
            )
            .padStart(
                2,
                "0"
            ) +

            ":" +

            minutes
        );

    }


    return "";

}



// ======================================================
// RESET CONFIRMATION CARD
// ======================================================

function resetConfirmationCard() {

    const card =
        getElement(
            "confirmationCard"
        );


    if (card) {

        card.style.display =
            "none";

    }


    const dateInput =
        getElement(
            "appointmentDate"
        );


    if (dateInput) {

        dateInput.value =
            "";

    }


    const timeInput =
        getElement(
            "appointmentTime"
        );


    if (timeInput) {

        timeInput.value =
            "";

    }

}



// ======================================================
// START ADMIN DASHBOARD
// ======================================================

function startAdminDashboard() {

    console.log(
        "=========================================="
    );


    console.log(
        "HUSSAIN BAPU'S WELLNESS"
    );


    console.log(
        "ADMIN DASHBOARD STARTED"
    );


    console.log(
        "WhatsApp Business:",
        WHATSAPP_BUSINESS_NUMBER
    );


    console.log(
        "=========================================="
    );


    // --------------------------------------------------
    // LOAD DATA
    // --------------------------------------------------

    loadMureeds();

}



// ======================================================
// DOM READY
// ======================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startAdminDashboard
    );

}

else {

    startAdminDashboard();

                }
