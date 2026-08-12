// ======================================================
// HUSSAIN BAPU'S WELLNESS
// ADMIN DASHBOARD — FINAL VERSION
// ======================================================

const BUSINESS_NAME =
    "HUSSAIN BAPU'S WELLNESS & BABA FARID JI (R.A) HERITAGE";

const BUSINESS_PHONE =
    "91998556782";

const WEBSITE_URL =
    "https://hussainbapuswellness-1o2i.vercel.app";

const BUSINESS_LOCATION =
    "Valsad, Gujarat, India";

let allMureeds = [];
let selectedMureed = null;


// ======================================================
// SAFE DOM
// ======================================================

function $(id) {
    return document.getElementById(id);
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
// SUPABASE CHECK
// ======================================================

function checkSupabase() {

    if (
        typeof supabaseClient === "undefined" ||
        !supabaseClient
    ) {

        showDashboardError(
            "Supabase connection is not available. Please check supabase.js."
        );

        return false;
    }

    return true;
}


// ======================================================
// ERROR DISPLAY
// ======================================================

function showDashboardError(message) {

    const tbody =
        document.querySelector(
            "#mureedsTable tbody"
        );

    if (tbody) {

        tbody.innerHTML =
            "<tr>" +
            "<td colspan='5' style='padding:20px;color:#ffb3b3;'>" +
            escapeHtml(message) +
            "</td>" +
            "</tr>";
    }

    const dashboardMessage =
        $("dashboardLoadingMessage");

    if (dashboardMessage) {

        dashboardMessage.textContent =
            message;
    }

    console.error(
        "ADMIN DASHBOARD ERROR:",
        message
    );
}


// ======================================================
// DASHBOARD LOADING MESSAGE
// ======================================================

function setDashboardMessage(message) {

    const element =
        $("dashboardLoadingMessage");

    if (element) {

        element.textContent =
            message;
    }
}


// ======================================================
// LOAD MUREEDS
// ======================================================

async function loadMureeds() {

    if (!checkSupabase()) {
        return;
    }

    const tbody =
        document.querySelector(
            "#mureedsTable tbody"
        );

    if (tbody) {

        tbody.innerHTML =
            "<tr>" +
            "<td colspan='5'>" +
            "Loading appointments..." +
            "</td>" +
            "</tr>";
    }

    setDashboardMessage(
        "Loading dashboard..."
    );


    try {

        const query =
            supabaseClient
                .from("clients")
                .select("*");


        const timeout =
            new Promise(
                function (_, reject) {

                    setTimeout(
                        function () {

                            reject(
                                new Error(
                                    "Supabase request timed out. Check internet connection, Supabase URL/key, or table access."
                                )
                            );

                        },
                        15000
                    );

                }
            );


        const result =
            await Promise.race([
                query,
                timeout
            ]);


        const data =
            result.data;

        const error =
            result.error;


        if (error) {

            throw error;
        }


        allMureeds =
            Array.isArray(data)
                ? data
                : [];


        updateDashboardCounts();


        renderMureeds(
            allMureeds
        );


        setDashboardMessage(
            allMureeds.length +
            " Mureed(s) loaded."
        );


    } catch (error) {

        console.error(
            "LOAD MUREEDS ERROR:",
            error
        );


        const message =
            error?.message ||
            "Unable to load appointments.";


        showDashboardError(
            message
        );


        setDashboardMessage(
            "Dashboard could not load."
        );
    }
}


// ======================================================
// DASHBOARD COUNTS
// ======================================================

function updateDashboardCounts() {

    const total =
        allMureeds.length;


    const pending =
        allMureeds.filter(
            function (mureed) {

                return String(
                    mureed.Appointment_Status ||
                    ""
                )
                    .trim()
                    .toLowerCase() ===
                    "pending";
            }
        ).length;


    const totalElement =
        $("totalMureeds");

    const pendingElement =
        $("pendingAppointments");


    if (totalElement) {

        totalElement.textContent =
            total;
    }


    if (pendingElement) {

        pendingElement.textContent =
            pending;
    }
}


// ======================================================
// RENDER MUREEDS
// ======================================================

function renderMureeds(mureeds) {

    const tbody =
        document.querySelector(
            "#mureedsTable tbody"
        );


    if (!tbody) {

        console.error(
            "mureedsTable tbody not found."
        );

        return;
    }


    tbody.innerHTML = "";


    if (
        !mureeds ||
        mureeds.length === 0
    ) {

        tbody.innerHTML =
            "<tr>" +
            "<td colspan='5' style='padding:20px;'>" +
            "No appointments found." +
            "</td>" +
            "</tr>";

        return;
    }


    const sorted =
        [...mureeds].sort(
            function (a, b) {

                const aPending =
                    String(
                        a.Appointment_Status ||
                        ""
                    )
                        .toLowerCase() ===
                    "pending";


                const bPending =
                    String(
                        b.Appointment_Status ||
                        ""
                    )
                        .toLowerCase() ===
                    "pending";


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


    sorted.forEach(
        function (mureed) {

            const row =
                document.createElement(
                    "tr"
                );


            const appointmentCell =
                document.createElement(
                    "td"
                );

            appointmentCell.textContent =
                mureed.Appointment_Id ||
                "-";


            const nameCell =
                document.createElement(
                    "td"
                );

            nameCell.textContent =
                mureed.Full_Name ||
                "-";


            const mobileCell =
                document.createElement(
                    "td"
                );

            mobileCell.textContent =
                mureed.Mobile ||
                mureed.Whatsapp ||
                "-";


            const statusCell =
                document.createElement(
                    "td"
                );

            statusCell.textContent =
                mureed.Appointment_Status ||
                "-";


            const actionCell =
                document.createElement(
                    "td"
                );


            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                "Select";


            button.className =
                "gold-btn";


            button.type =
                "button";


            button.addEventListener(
                "click",
                function () {

                    selectMureed(
                        mureed
                    );
                }
            );


            actionCell.appendChild(
                button
            );


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
// SEARCH
// ======================================================

function setupSearch() {

    const searchBox =
        $("searchBox");


    if (!searchBox) {
        return;
    }


    searchBox.addEventListener(
        "input",
        function () {

            const search =
                this.value
                    .trim()
                    .toLowerCase();


            if (!search) {

                renderMureeds(
                    allMureeds
                );

                return;
            }


            const filtered =
                allMureeds.filter(
                    function (mureed) {

                        return (

                            String(
                                mureed.Full_Name ||
                                ""
                            )
                                .toLowerCase()
                                .includes(search)

                            ||

                            String(
                                mureed.Mobile ||
                                ""
                            )
                                .toLowerCase()
                                .includes(search)

                            ||

                            String(
                                mureed.Whatsapp ||
                                ""
                            )
                                .toLowerCase()
                                .includes(search)

                            ||

                            String(
                                mureed.Appointment_Id ||
                                ""
                            )
                                .toLowerCase()
                                .includes(search)

                        );
                    }
                );


            renderMureeds(
                filtered
            );
        }
    );
}


// ======================================================
// SELECT MUREED
// ======================================================

function selectMureed(mureed) {

    selectedMureed =
        mureed;


    const box =
        $("selectedMureedBox");


    if (box) {

        box.innerHTML =

            "<p><strong>Name:</strong> " +
            escapeHtml(
                mureed.Full_Name || "-"
            ) +
            "</p>" +

            "<p><strong>Appointment ID:</strong> " +
            escapeHtml(
                mureed.Appointment_Id || "-"
            ) +
            "</p>" +

            "<p><strong>Mobile:</strong> " +
            escapeHtml(
                mureed.Mobile ||
                mureed.Whatsapp ||
                "-"
            ) +
            "</p>" +

            "<p><strong>Status:</strong> " +
            escapeHtml(
                mureed.Appointment_Status ||
                "-"
            ) +
            "</p>";
    }


    const openButton =
        $("openMureedBtn");


    if (openButton) {

        openButton.disabled =
            false;


        openButton.onclick =
            function () {

                window.location.href =
                    "mureed.html?id=" +
                    encodeURIComponent(
                        mureed.Appointment_Id
                    );
            };
    }


    setupConfirmationCard();


    const confirmationCard =
        $("confirmationCard");


    if (confirmationCard) {

        confirmationCard.style.display =
            "block";
    }


    const nameElement =
        $("confirmationMureedName");


    if (nameElement) {

        nameElement.textContent =
            "👤 Mureed: " +
            (
                mureed.Full_Name ||
                "-"
            );
    }


    const mobileElement =
        $("confirmationMobile");


    if (mobileElement) {

        mobileElement.textContent =
            "📱 WhatsApp: " +
            (
                mureed.Whatsapp ||
                mureed.Mobile ||
                "-"
            );
    }


    const dateElement =
        $("appointmentDate");


    const timeElement =
        $("appointmentTime");


    if (dateElement) {

        dateElement.value =
            mureed.Appointment_Date ||
            "";
    }


    if (timeElement) {

        timeElement.value =
            mureed.Appointment_Time ||
            "";
    }


    // Scroll confirmation into view
    if (confirmationCard) {

        setTimeout(
            function () {

                confirmationCard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            },
            100
        );
    }
}


// ======================================================
// CREATE CONFIRMATION CARD IF MISSING
// ======================================================

function setupConfirmationCard() {

    if ($("confirmationCard")) {
        setupConfirmButton();
        return;
    }


    const selectedBox =
        $("selectedMureedBox");


    if (!selectedBox) {
        return;
    }


    const card =
        document.createElement(
            "div"
        );


    card.id =
        "confirmationCard";


    card.className =
        "card";


    card.style.marginTop =
        "20px";


    card.innerHTML =

        "<h2>✅ Confirm Appointment</h2>" +

        "<p id='confirmationMureedName'></p>" +

        "<p id='confirmationMobile'></p>" +

        "<label>" +
        "📅 Appointment Date" +
        "</label>" +

        "<br><br>" +

        "<input " +
        "type='date' " +
        "id='appointmentDate'>" +

        "<br><br>" +

        "<label>" +
        "🕐 Appointment Time" +
        "</label>" +

        "<br><br>" +

        "<input " +
        "type='time' " +
        "id='appointmentTime'>" +

        "<br><br>" +

        "<button " +
        "id='confirmAppointmentBtn' " +
        "class='gold-btn' " +
        "type='button'>" +

        "📱 Confirm & Open WhatsApp" +

        "</button>";


    selectedBox.parentNode.insertBefore(
        card,
        selectedBox.nextSibling
    );


    setupConfirmButton();
}


// ======================================================
// CONFIRM BUTTON
// ======================================================

function setupConfirmButton() {

    const button =
        $("confirmAppointmentBtn");


    if (!button) {
        return;
    }


    if (
        button.dataset.bound ===
        "true"
    ) {
        return;
    }


    button.dataset.bound =
        "true";


    button.addEventListener(
        "click",
        confirmAppointment
    );
}


// ======================================================
// CONFIRM APPOINTMENT
// ======================================================

async function confirmAppointment() {

    if (!selectedMureed) {

        alert(
            "Please select a Mureed first."
        );

        return;
    }


    const date =
        $("appointmentDate")?.value ||
        "";


    const time =
        $("appointmentTime")?.value ||
        "";


    if (!date) {

        alert(
            "Please select appointment date."
        );

        return;
    }


    if (!time) {

        alert(
            "Please select appointment time."
        );

        return;
    }


    const appointmentId =
        selectedMureed.Appointment_Id;


    if (!appointmentId) {

        alert(
            "Appointment ID is missing."
        );

        return;
    }


    // ==================================================
    // SAVE APPOINTMENT IN SUPABASE
    // ==================================================

    try {

        const updateData = {

            Appointment_Date:
                date,

            Appointment_Time:
                time,

            Appointment_Status:
                "Confirmed"
        };


        const {
            error
        } =
            await supabaseClient
                .from("clients")
                .update(updateData)
                .eq(
                    "Appointment_Id",
                    appointmentId
                );


        if (error) {

            console.error(
                "APPOINTMENT UPDATE ERROR:",
                error
            );


            alert(
                "Appointment could not be saved.\n\n" +
                error.message
            );

            return;
        }


        // Update local object
        selectedMureed.Appointment_Date =
            date;

        selectedMureed.Appointment_Time =
            time;

        selectedMureed.Appointment_Status =
            "Confirmed";


        updateDashboardCounts();


        renderMureeds(
            allMureeds
        );


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Unable to save appointment."
        );

        return;
    }


    // ==================================================
    // MUREED WHATSAPP NUMBER
    // ==================================================

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
        whatsappNumber.length ===
        10
    ) {

        whatsappNumber =
            "91" +
            whatsappNumber;
    }


    if (
        whatsappNumber.length <
        12
    ) {

        alert(
            "Mureed WhatsApp number is missing or invalid."
        );

        return;
    }


    // ==================================================
    // FORMAT
    // ==================================================

    const formattedDate =
        formatDate(
            date
        );


    const formattedTime =
        formatTime(
            time
        );


    const mureedName =
        selectedMureed.Full_Name ||
        "Mureed";


    // ==================================================
    // FINAL BRANDED WHATSAPP MESSAGE
    // ==================================================

    const message =

        "✨ *" +
        BUSINESS_NAME +
        "* ✨\n" +

        "━━━━━━━━━━━━━━━━━━━━\n\n" +

        "🌿 *Appointment Confirmation*\n\n" +

        "Dear *" +
        mureedName +
        "*,\n\n" +

        "We are pleased to confirm your appointment with us. 🤝\n\n" +

        "🆔 *Appointment ID:* " +
        appointmentId +
        "\n" +

        "📅 *Date:* " +
        formattedDate +
        "\n" +

        "🕐 *Time:* " +
        for
