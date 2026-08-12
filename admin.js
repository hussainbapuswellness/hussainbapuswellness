// ======================================================
// HUSSAIN BAPU'S WELLNESS
// ADMIN DASHBOARD
// APPOINTMENT + WHATSAPP WORKFLOW
// ======================================================


// ======================================================
// WHATSAPP CONFIGURATION
// ======================================================
//
// IMPORTANT:
// Final public WhatsApp Business number launch se pehle
// yaha centrally replace kiya jayega.
//
// Current personal number yaha permanently nahi rakhenge.
// ======================================================

const WHATSAPP_BUSINESS_NUMBER =
    "REPLACE_WITH_NEW_BUSINESS_NUMBER";



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

    document.getElementById(
        "totalMureeds"
    ).textContent =
        allMureeds.length;



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


    document.getElementById(
        "pendingAppointments"
    ).textContent =
        pending.length;



    // ==================================================
    // DISPLAY
    // ==================================================

    renderMureeds(
        allMureeds
    );

}



// ======================================================
// RENDER MUREDS
// ======================================================

function renderMureeds(mureeds) {

    const tbody =
        document.querySelector(
            "#mureedsTable tbody"
        );


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


            const appointmentCell =
                document.createElement(
                    "td"
                );

            appointmentCell.textContent =
                mureed.Appointment_Id || "-";



            const nameCell =
                document.createElement(
                    "td"
                );

            nameCell.textContent =
                mureed.Full_Name || "-";



            const mobileCell =
                document.createElement(
                    "td"
                );

            mobileCell.textContent =
                mureed.Mobile || "-";



            const statusCell =
                document.createElement(
                    "td"
                );

            statusCell.textContent =
                mureed.Appointment_Status || "-";



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

document
    .getElementById("searchBox")
    .addEventListener(
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



    // ==================================================
    // OPEN MUREED
    // ==================================================

    const openButton =
        document.getElementById(
            "openMureedBtn"
        );


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



    // ==================================================
    // SHOW CONFIRMATION
    // ==================================================

    const confirmationCard =
        document.getElementById(
            "confirmationCard"
        );


    confirmationCard.style.display =
        "block";


    document.getElementById(
        "confirmationMureedName"
    ).textContent =
        "👤 Mureed: " +
        (
            mureed.Full_Name ||
            "-"
        );


    document.getElementById(
        "confirmationMobile"
    ).textContent =
        "📱 WhatsApp: " +
        (
            mureed.Whatsapp ||
            mureed.Mobile ||
            "-"
        );



    // ==================================================
    // EXISTING DATE
    // ==================================================

    document.getElementById(
        "appointmentDate"
    ).value =
        mureed.Appointment_Date ||
        "";



    // ==================================================
    // EXISTING TIME
    // ==================================================

    document.getElementById(
        "appointmentTime"
    ).value =
        mureed.Appointment_Time ||
        "";

}



// ======================================================
// CONFIRM BUTTON
// ======================================================

document
    .getElementById(
        "confirmAppointmentBtn"
    )
    .addEventListener(
        "click",
        function () {

            confirmAppointment();

        }
    );



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


    // India number
    if (
        whatsappNumber.length === 10
    ) {

        whatsappNumber =
            "91" +
            whatsappNumber;

    }



    if (
        !whatsappNumber ||
        whatsappNumber.length < 10
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
    // MESSAGE
    // ==================================================

    const mureedName =
        selectedMureed.Full_Name ||
        "there";


    const message =

        "Hello! Welcome to " +
        "Hussain Bapu's Wellness.\n\n" +

        "Dear " +
        mureedName +
        ",\n\n" +

        "Your appointment has been confirmed.\n\n" +

        "📅 Date: " +
        formattedDate +
        "\n" +

        "🕐 Time: " +
        formattedTime +
        "\n\n" +

        "For regular consultation, " +
        "please use your scheduled appointment " +
        "for an online consultation or visit " +
        "our physical Darbar.\n\n" +

        "For emergencies, please contact us " +
        "by phone only when absolutely necessary.\n\n" +

        "Thank you,\n" +

        "Hussain Bapu's Wellness";



    // ==================================================
    // WHATSAPP
    // ==================================================

    const whatsappUrl =

        "https://wa.me/" +

        whatsappNumber +

        "?text=" +

        encodeURIComponent(
            message
        );



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
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}



// ======================================================
// START
// ======================================================

loadMureeds();
