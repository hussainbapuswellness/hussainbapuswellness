// ======================================================
// HUSSAIN BAPU'S WELLNESS
// ADMIN DASHBOARD
// APPOINTMENT + PREMIUM WHATSAPP WORKFLOW
// ======================================================


// ======================================================
// CENTRAL BUSINESS CONFIGURATION
// ======================================================

// FINAL PUBLIC WHATSAPP BUSINESS NUMBER
// Format: country code + number, without + or spaces
const WHATSAPP_BUSINESS_NUMBER =
    "919998556782";


// WEBSITE
// IMPORTANT:
// Yaha apna final live website URL paste karna hai.
const WEBSITE_URL =
    "YOUR_LIVE_WEBSITE_URL";


// GOOGLE MAPS
// IMPORTANT:
// Yaha apna final Google Maps location link paste karna hai.
const GOOGLE_MAPS_URL =
    "YOUR_GOOGLE_MAPS_LOCATION_URL";


// FULL BRAND NAME
const BRAND_NAME =
    "HUSSAIN BAPU'S WELLNESS & BABA FARID JI (R.A) HERITAGE";



// ======================================================
// GLOBAL DATA
// ======================================================

let allMureeds = [];

let selectedMureed = null;



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
            "Mureeds table body not found."
        );
        return;
    }


    tbody.innerHTML =
        "<tr>" +
        "<td colspan='5'>" +
        "Loading appointments..." +
        "</td>" +
        "</tr>";


    const { data, error } =
        await supabaseClient

            .from("clients")

            .select("*");


    if (error) {

        console.error(
            "MUREED LOAD ERROR:",
            error
        );


        tbody.innerHTML =
            "<tr>" +
            "<td colspan='5'>" +
            "Unable to load appointments." +
            "</td>" +
            "</tr>";

        return;
    }


    allMureeds = data || [];


    // ==================================================
    // TOTAL MUREEDS
    // ==================================================

    const totalElement =
        document.getElementById(
            "totalMureeds"
        );


    if (totalElement) {

        totalElement.textContent =
            allMureeds.length;

    }



    // ==================================================
    // PENDING APPOINTMENTS
    // ==================================================

    const pending =
        allMureeds.filter(
            function (mureed) {

                return String(
                    mureed.Appointment_Status || ""
                )
                .toLowerCase() === "pending";

            }
        );


    const pendingElement =
        document.getElementById(
            "pendingAppointments"
        );


    if (pendingElement) {

        pendingElement.textContent =
            pending.length;

    }



    // ==================================================
    // DISPLAY
    // ==================================================

    renderMureeds(
        allMureeds
    );

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
        return;
    }


    tbody.innerHTML = "";


    if (
        !mureeds ||
        mureeds.length === 0
    ) {

        tbody.innerHTML =
            "<tr>" +
            "<td colspan='5'>" +
            "No appointments found." +
            "</td>" +
            "</tr>";

        return;
    }



    // ==================================================
    // PENDING FIRST
    // ==================================================

    const sortedMureeds =
        [...mureeds].sort(
            function (a, b) {

                const aPending =
                    String(
                        a.Appointment_Status || ""
                    )
                    .toLowerCase() === "pending";


                const bPending =
                    String(
                        b.Appointment_Status || ""
                    )
                    .toLowerCase() === "pending";


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



    sortedMureeds.forEach(
        function (mureed) {

            const row =
                document.createElement(
                    "tr"
                );


            // APPOINTMENT ID
            const appointmentCell =
                document.createElement(
                    "td"
                );

            appointmentCell.textContent =
                mureed.Appointment_Id || "-";



            // NAME
            const nameCell =
                document.createElement(
                    "td"
                );

            nameCell.textContent =
                mureed.Full_Name || "-";



            // MOBILE
            const mobileCell =
                document.createElement(
                    "td"
                );

            mobileCell.textContent =
                mureed.Mobile || "-";



            // STATUS
            const statusCell =
                document.createElement(
                    "td"
                );

            statusCell.textContent =
                mureed.Appointment_Status || "-";



            // ACTION
            const actionCell =
                document.createElement(
                    "td"
                );


            const selectButton =
                document.createElement(
                    "button"
                );


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

const searchBox =
    document.getElementById(
        "searchBox"
    );


if (searchBox) {

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
                                mureed.Full_Name || ""
                            )
                            .toLowerCase()
                            .includes(search)

                            ||

                            String(
                                mureed.Mobile || ""
                            )
                            .toLowerCase()
                            .includes(search)

                            ||

                            String(
                                mureed.Appointment_Id || ""
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
        document.getElementById(
            "selectedMureedBox"
        );


    if (box) {

        box.innerHTML = "";


        const name =
            document.createElement(
                "p"
            );

        name.innerHTML =
            "<strong>Name:</strong> " +
            escapeHtml(
                mureed.Full_Name || "-"
            );


        const appointment =
            document.createElement(
                "p"
            );

        appointment.innerHTML =
            "<strong>Appointment ID:</strong> " +
            escapeHtml(
                mureed.Appointment_Id || "-"
            );


        const mobile =
            document.createElement(
                "p"
            );

        mobile.innerHTML =
            "<strong>Mobile:</strong> " +
            escapeHtml(
                mureed.Mobile || "-"
            );


        const status =
            document.createElement(
                "p"
            );

        status.innerHTML =
            "<strong>Status:</strong> " +
            escapeHtml(
                mureed.Appointment_Status || "-"
            );


        box.appendChild(name);
        box.appendChild(appointment);
        box.appendChild(mobile);
        box.appendChild(status);

    }



    // ==================================================
    // OPEN MUREED
    // ==================================================

    const openButton =
        document.getElementById(
            "openMureedBtn"
        );


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



    // ==================================================
    // SHOW CONFIRMATION
    // ==================================================

    const confirmationCard =
        document.getElementById(
            "confirmationCard"
        );


    if (confirmationCard) {

        confirmationCard.style.display =
            "block";

    }


    const confirmationName =
        document.getElementById(
            "confirmationMureedName"
        );


    if (confirmationName) {

        confirmationName.textContent =
            "👤 Mureed: " +
            (
                mureed.Full_Name ||
                "-"
            );

    }


    const confirmationMobile =
        document.getElementById(
            "confirmationMobile"
        );


    if (confirmationMobile) {

        confirmationMobile.textContent =
            "📱 WhatsApp: " +
            (
                mureed.Whatsapp ||
                mureed.Mobile ||
                "-"
            );

    }



    // ==================================================
    // EXISTING DATE
    // ==================================================

    const dateInput =
        document.getElementById(
            "appointmentDate"
        );


    if (dateInput) {

        dateInput.value =
            mureed.Appointment_Date ||
            "";

    }



    // ==================================================
    // EXISTING TIME
    // ==================================================

    const timeInput =
        document.getElementById(
            "appointmentTime"
        );


    if (timeInput) {

        timeInput.value =
            mureed.Appointment_Time ||
            "";

    }

}



// ======================================================
// CONFIRM BUTTON
// ======================================================

const confirmButton =
    document.getElementById(
        "confirmAppointmentBtn"
    );


if (confirmButton) {

    confirmButton.addEventListener(
        "click",
        function () {

            confirmAppointment();

        }
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
        document.getElementById(
            "appointmentDate"
        ).value;


    const time =
        document.getElementById(
            "appointmentTime"
        ).value;



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


    // INDIA NUMBER
    if (
        whatsappNumber.length === 10
    ) {

        whatsappNumber =
            "91" +
            whatsappNumber;

    }



    if (
        !whatsappNumber ||
        whatsappNumber.length < 12
    ) {

        alert(
            "Mureed WhatsApp number is missing or invalid."
        );

        return;
    }



    // ==================================================
    // DATE + TIME
    // ==================================================

    const formattedDate =
        formatDate(
            date
        );


    const formattedTime =
        formatTime(
            time
        );



    // ==================================================
    // SAVE APPOINTMENT FIRST
    // ==================================================

    const { error: updateError } =
        await supabaseClient

            .from("clients")

            .update({

                Appointment_Date:
                    date,

                Appointment_Time:
                    time,

                Appointment_Status:
                    "Confirmed"

            })

            .eq(
                "Appointment_Id",
                selectedMureed.Appointment_Id
            );


    if (updateError) {

        console.error(
            "APPOINTMENT UPDATE ERROR:",
            updateError
        );


        alert(
            "Appointment save nahi hua.\n\n" +
            "Code: " +
            (updateError.code || "") +
            "\n\nMessage: " +
            (updateError.message || "")
        );

        return;
    }



    // ==================================================
    // UPDATE LOCAL OBJECT
    // ==================================================

    selectedMureed.Appointment_Date =
        date;

    selectedMureed.Appointment_Time =
        time;

    selectedMureed.Appointment_Status =
        "Confirmed";



    // ==================================================
    // MESSAGE DATA
    // ==================================================

    const mureedName =
        selectedMureed.Full_Name ||
        "Dear Mureed";


    const appointmentId =
        selectedMureed.Appointment_Id ||
        "-";


    const consultationType =
        selectedMureed.Consultation_Type ||
        "Consultation";



    // ==================================================
    // PREMIUM WHATSAPP MESSAGE
    // ==================================================

    const message =

        "✨ *" +
        BRAND_NAME +
        "* ✨\n\n" +

        "━━━━━━━━━━━━━━━━━━\n" +

        "🌿 *APPOINTMENT CONFIRMED*\n" +

        "━━━━━━━━━━━━━━━━━━\n\n" +

        "Dear *" +
        mureedName +
        "*,\n\n" +

        "Thank you for choosing our wellness and heritage services.\n\n" +

        "Your consultation appointment has been successfully confirmed.\n\n" +

        "📋 *APPOINTMENT DETAILS*\n\n" +

        "🆔 Appointment ID: *" +
        appointmentId +
        "*\n" +

        "📅 Date: *" +
        formattedDate +
        "*\n" +

        "⏰ Time: *" +
        formattedTime +
        "*\n" +

        "💬 Consultation: *" +
        consultationType +
        "*\n\n" +

        "━━━━━━━━━━━━━━━━━━\n\n" +

        "📍 *VISIT / CONSULTATION*\n\n" +

        "For an *Online Consultation*, please be available at your scheduled time.\n\n" +

        "For a *Physical Darbar Visit*, kindly visit us at the scheduled time.\n\n" +

        "📍 Location:\n" +
        GOOGLE_MAPS_URL +
        "\n\n" +

        "━━━━━━━━━━━━━━━━━━\n\n" +

        "⚠️ *IMPORTANT*\n\n" +

        "For urgent or emergency situations, please contact us by phone only when necessary.\n\n" +

        "For regular consultations, kindly book an appointment through our website and follow the scheduled appointment time.\n\n" +

        "🌐 Website:\n" +
        WEBSITE_URL +
        "\n\n" +

        "━━━━━━━━━━━━━━━━━━\n\n" +

        "🤝 Thank you for choosing\n\n" +

        "*" +
        BRAND_NAME +
        "*\n\n" +

        "🌿 *Traditional Wisdom • Trusted Care • Modern Wellness*\n\n" +

        "━━━━━━━━━━━━━━━━━━";



    // ==================================================
    // WHATSAPP URL
    // ==================================================

    const whatsappUrl =

        "https://wa.me/" +

        whatsappNumber +

        "?text=" +

        encodeURIComponent(
            message
        );



    // ==================================================
    // SUCCESS MESSAGE
    // ==================================================

    console.log(
        "Appointment confirmed:",
        selectedMureed.Appointment_Id
    );


    // OPEN WHATSAPP
    window.location.href =
        whatsappUrl;

}



// ======================================================
// FORMAT DATE
// ======================================================

function formatDate(
    dateString
) {

    const date =
        new Date(
            dateString +
            "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}



// ======================================================
// FORMAT TIME
// ======================================================

function formatTime(
    timeString
) {

    const parts =
        timeString.split(":");


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



// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHtml(
    value
) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
 
