// ======================================================
// HUSSAIN BAPU'S WELLNESS
// ADMIN DASHBOARD
// COMPLETE STABLE VERSION
// ======================================================


// ======================================================
// WHATSAPP BUSINESS NUMBER
// ======================================================
//
// FINAL BUSINESS NUMBER
// +91 99985 56782
//
// Number format:
// country code ke saath, + ke bina
// ======================================================

const WHATSAPP_BUSINESS_NUMBER =
    "919998556782";



// ======================================================
// GLOBAL DATA
// ======================================================

let allMureeds = [];

let selectedMureed = null;



// ======================================================
// DOM READY
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "ADMIN DASHBOARD STARTED"
        );


        const searchBox =
            document.getElementById(
                "searchBox"
            );


        if (searchBox) {

            searchBox.addEventListener(
                "input",
                handleSearch
            );

        }


        const confirmButton =
            document.getElementById(
                "confirmAppointmentBtn"
            );


        if (confirmButton) {

            confirmButton.addEventListener(
                "click",
                confirmAppointment
            );

        }


        const openButton =
            document.getElementById(
                "openMureedBtn"
            );


        if (openButton) {

            openButton.disabled =
                true;

        }


        loadMureeds();

    }
);



// ======================================================
// LOAD MUREEDS
// ======================================================

async function loadMureeds() {

    const tbody =
        document.querySelector(
            "#mureedsTable tbody"
        );


    const statusBox =
        document.getElementById(
            "adminLoadStatus"
        );


    if (!tbody) {

        console.error(
            "mureedsTable tbody not found."
        );

        return;

    }


    tbody.innerHTML =
        `
        <tr>
            <td colspan="5">
                Loading appointments...
            </td>
        </tr>
        `;


    if (statusBox) {

        statusBox.textContent =
            "Loading appointments...";

    }



    // ==================================================
    // SUPABASE CHECK
    // ==================================================

    if (
        typeof supabaseClient ===
        "undefined"
    ) {

        console.error(
            "supabaseClient is undefined."
        );


        tbody.innerHTML =
            `
            <tr>
                <td colspan="5">
                    ❌ Supabase connection is not loaded.
                </td>
            </tr>
            `;


        if (statusBox) {

            statusBox.textContent =
                "❌ Supabase connection error.";

        }


        return;

    }



    // ==================================================
    // FETCH CLIENTS
    // ==================================================

    try {

        const result =
            await supabaseClient

                .from("clients")

                .select("*");


        const data =
            result.data;


        const error =
            result.error;



        if (error) {

            console.error(
                "MUREED LOAD ERROR:",
                error
            );


            tbody.innerHTML =
                `
                <tr>
                    <td colspan="5">
                        ❌ Unable to load appointments.
                        <br><br>
                        ${escapeHtml(
                            error.message || ""
                        )}
                    </td>
                </tr>
                `;


            if (statusBox) {

                statusBox.textContent =
                    "❌ Database error: " +
                    (
                        error.message ||
                        "Unknown error"
                    );

            }


            return;

        }



        // ==================================================
        // SAVE DATA
        // ==================================================

        allMureeds =
            Array.isArray(data)
                ? data
                : [];



        // ==================================================
        // DASHBOARD COUNTS
        // ==================================================

        const totalElement =
            document.getElementById(
                "totalMureeds"
            );


        if (totalElement) {

            totalElement.textContent =
                allMureeds.length;

        }



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
        // STATUS
        // ==================================================

        if (statusBox) {

            statusBox.textContent =
                "✅ Appointments loaded successfully.";

        }



        // ==================================================
        // RENDER
        // ==================================================

        renderMureeds(
            allMureeds
        );



        console.log(
            "MUREEDS LOADED:",
            allMureeds
        );

    }

    catch (error) {

        console.error(
            "ADMIN LOAD EXCEPTION:",
            error
        );


        tbody.innerHTML =
            `
            <tr>
                <td colspan="5">
                    ❌ Something went wrong while loading appointments.
                    <br><br>
                    ${escapeHtml(
                        error.message || ""
                    )}
                </td>
            </tr>
            `;


        if (statusBox) {

            statusBox.textContent =
                "❌ Loading failed.";

        }

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
            "Table body not found."
        );

        return;

    }


    tbody.innerHTML = "";



    if (
        !mureeds ||
        mureeds.length === 0
    ) {

        tbody.innerHTML =
            `
            <tr>
                <td colspan="5">
                    No appointments found.
                </td>
            </tr>
            `;

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
                        a.Appointment_Status ||
                        ""
                    )
                    .trim()
                    .toLowerCase() ===
                    "pending";


                const bPending =
                    String(
                        b.Appointment_Status ||
                        ""
                    )
                    .trim()
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



    // ==================================================
    // ROWS
    // ==================================================

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

function handleSearch() {

    const searchBox =
        document.getElementById(
            "searchBox"
        );


    if (!searchBox) {

        return;

    }


    const search =
        searchBox.value
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



// ======================================================
// SELECT MUREED
// ======================================================

function selectMureed(
    mureed
) {

    selectedMureed =
        mureed;


    console.log(
        "SELECTED MUREED:",
        selectedMureed
    );



    // ==================================================
    // SELECTED BOX
    // ==================================================

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
                mureed.Full_Name ||
                "-"
            );


        const appointment =
            document.createElement(
                "p"
            );


        appointment.innerHTML =
            "<strong>Appointment ID:</strong> " +
            escapeHtml(
                mureed.Appointment_Id ||
                "-"
            );


        const mobile =
            document.createElement(
                "p"
            );


        mobile.innerHTML =
            "<strong>Mobile:</strong> " +
            escapeHtml(
                mureed.Mobile ||
                "-"
            );


        const whatsapp =
            document.createElement(
                "p"
            );


        whatsapp.innerHTML =
            "<strong>WhatsApp:</strong> " +
            escapeHtml(
                mureed.Whatsapp ||
                mureed.Mobile ||
                "-"
            );


        const status =
            document.createElement(
                "p"
            );


        status.innerHTML =
            "<strong>Status:</strong> " +
            escapeHtml(
                mureed.Appointment_Status ||
                "-"
            );


        box.appendChild(name);

        box.appendChild(appointment);

        box.appendChild(mobile);

        box.appendChild(whatsapp);

        box.appendChild(status);

    }



    // ==================================================
    // OPEN MUREED BUTTON
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
    // CONFIRMATION CARD
    // ==================================================

    const confirmationCard =
        document.getElementById(
            "confirmationCard"
        );


    if (confirmationCard) {

        confirmationCard.style.display =
            "block";

    }



    const nameElement =
        document.getElementById(
            "confirmationMureedName"
        );


    if (nameElement) {

        nameElement.textContent =
            "👤 Mureed: " +
            (
                mureed.Full_Name ||
                "-"
            );

    }



    const mobileElement =
        document.getElementById(
            "confirmationMobile"
        );


    if (mobileElement) {

        mobileElement.textContent =
            "📱 WhatsApp: " +
            (
                mureed.Whatsapp ||
                mureed.Mobile ||
                "-"
            );

    }



    // ==================================================
    // EXISTING APPOINTMENT DATE
    // ==================================================

    const dateElement =
        document.getElementById(
            "appointmentDate"
        );


    if (dateElement) {

        dateElement.value =
            mureed.Appointment_Date ||
            "";

    }



    // ==================================================
    // EXISTING APPOINTMENT TIME
    // ==================================================

    const timeElement =
        document.getElementById(
            "appointmentTime"
        );


    if (timeElement) {

        timeElement.value =
            mureed.Appointment_Time ||
            "";

    }

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



    const dateElement =
        document.getElementById(
            "appointmentDate"
        );


    const timeElement =
        document.getElementById(
            "appointmentTime"
        );


    const date =
        dateElement
            ? dateElement.value
            : "";


    const time =
        timeElement
            ? timeElement.value
            : "";



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



    // ==================================================
    // INDIA NUMBER
    // ==================================================

    if (
        whatsappNumber.length ===
        10
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
    // FORMAT DATE + TIME
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
    // MUREED NAME
    // ==================================================

    const mureedName =
        selectedMureed.Full_Name ||
        "Mureed";



    // ==================================================
    // PREMIUM WHATSAPP MESSAGE
    // ==================================================

    const message =

`✨ HUSSAIN BAPU'S WELLNESS ✨
━━━━━━━━━━━━━━━━━━━━

🌿 HUSSAIN BAPU'S WELLNESS & BABA FARID JI (R.A) HERITAGE

Dear ${mureedName},

🌟 Your appointment has been CONFIRMED.

📅 Date: ${formattedDate}
🕐 Time: ${formattedTime}

━━━━━━━━━━━━━━━━━━━━
🩺 CONSULTATION GUIDANCE
━━━━━━━━━━━━━━━━━━━━

For regular consultation, please use your scheduled appointment for:

💻 Online Consultation

or

🏛️ Physical Darbar Visit

We request you to please take an appointment before visiting whenever possible.

🚨 EMERGENCY CONTACT

Phone calls are requested ONLY in case of a genuine emergency.

For regular queries, appointment requests and consultation, please use the website / Wha
