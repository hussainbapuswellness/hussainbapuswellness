// ======================================================
// HUSSAIN BAPU'S WELLNESS
// ADMIN DASHBOARD
// COMPLETE FINAL VERSION
// ======================================================


// ======================================================
// WHATSAPP BUSINESS NUMBER
// ======================================================

const WHATSAPP_BUSINESS_NUMBER =
    "919998556782";


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
// LOAD MUREEDS
// ======================================================

async function loadMureeds() {

    const tbody =
        document.querySelector(
            "#mureedsTable tbody"
        );


    const dashboardMessage =
        getElement(
            "dashboardMessage"
        );


    if (!tbody) {

        console.error(
            "mureedsTable tbody not found."
        );

        return;

    }


    tbody.innerHTML = `
        <tr>
            <td colspan="5"
                style="text-align:center;">
                Loading appointments...
            </td>
        </tr>
    `;


    if (!window.supabaseClient) {

        console.error(
            "supabaseClient is not available."
        );


        tbody.innerHTML = `
            <tr>
                <td colspan="5"
                    style="text-align:center;">
                    Supabase connection is not available.
                </td>
            </tr>
        `;


        if (dashboardMessage) {

            dashboardMessage.textContent =
                "⚠️ Supabase connection unavailable.";

        }

        return;

    }



    try {


        // ==================================================
        // FETCH CLIENTS
        // ==================================================

        const result =
            await supabaseClient
                .from("clients")
                .select("*");


        const data =
            result.data;


        const error =
            result.error;



        // ==================================================
        // ERROR
        // ==================================================

        if (error) {

            console.error(
                "SUPABASE LOAD ERROR:",
                error
            );


            tbody.innerHTML = `
                <tr>
                    <td colspan="5"
                        style="text-align:center;">
                        Unable to load appointments.
                    </td>
                </tr>
            `;


            if (dashboardMessage) {

                dashboardMessage.textContent =
                    "⚠️ Unable to load dashboard data.";

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
        // TOTAL
        // ==================================================

        const totalElement =
            getElement(
                "totalMureeds"
            );


        if (totalElement) {

            totalElement.textContent =
                allMureeds.length;

        }



        // ==================================================
        // PENDING
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
        // DASHBOARD MESSAGE
        // ==================================================

        if (dashboardMessage) {

            if (allMureeds.length > 0) {

                dashboardMessage.textContent =
                    "✅ Dashboard loaded successfully.";

            } else {

                dashboardMessage.textContent =
                    "No Mureed appointments found.";

            }

        }



        // ==================================================
        // RENDER
        // ==================================================

        renderMureeds(
            allMureeds
        );


    }

    catch (error) {

        console.error(
            "ADMIN DASHBOARD ERROR:",
            error
        );


        tbody.innerHTML = `
            <tr>
                <td colspan="5"
                    style="text-align:center;">
                    Something went wrong while loading appointments.
                </td>
            </tr>
        `;


        if (dashboardMessage) {

            dashboardMessage.textContent =
                "⚠️ Dashboard loading failed.";

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

        return;

    }


    tbody.innerHTML = "";



    // ==================================================
    // EMPTY
    // ==================================================

    if (
        !mureeds ||
        mureeds.length === 0
    ) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5"
                    style="text-align:center;">
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
                        a.Appointment_Status || ""
                    )
                    .trim()
                    .toLowerCase()
                    === "pending";


                const bPending =
                    String(
                        b.Appointment_Status || ""
                    )
                    .trim()
                    .toLowerCase()
                    === "pending";


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



            // Appointment ID
            const appointmentCell =
                document.createElement(
                    "td"
                );


            appointmentCell.textContent =
                mureed.Appointment_Id || "-";



            // Name
            const nameCell =
                document.createElement(
                    "td"
                );


            nameCell.textContent =
                mureed.Full_Name || "-";



            // Mobile
            const mobileCell =
                document.createElement(
                    "td"
                );


            mobileCell.textContent =
                mureed.Mobile || "-";



            // Status
            const statusCell =
                document.createElement(
                    "td"
                );


            statusCell.textContent =
                mureed.Appointment_Status || "-";



            // Action
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

const searchBox =
    getElement(
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


    selectedMureed =
        mureed;



    // ==================================================
    // SELECTED MUREED BOX
    // ==================================================

    const box =
        getElement(
            "selectedMureedBox"
        );


    if (box) {

        box.innerHTML = `

            <p>
                👤 <strong>Name:</strong>
                ${escapeHtml(
                    mureed.Full_Name || "-"
                )}
            </p>

            <p>
                📅 <strong>Appointment ID:</strong>
                ${escapeHtml(
                    mureed.Appointment_Id || "-"
                )}
            </p>

            <p>
                📱 <strong>Mobile:</strong>
                ${escapeHtml(
                    mureed.Mobile || "-"
                )}
            </p>

            <p>
                📌 <strong>Status:</strong>
                ${escapeHtml(
                    mureed.Appointment_Status || "-"
                )}
            </p>

        `;

    }



    // ==================================================
    // OPEN MUREED BUTTON
    // ==================================================

    const openButton =
        getElement(
            "openMureedBtn"
        );


    if (openButton) {

        openButton.disabled =
            false;


        openButton.onclick =
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



    // ==================================================
    // CONFIRMATION CARD
    // ==================================================

    const confirmationCard =
        getElement(
            "confirmationCard"
        );


    if (confirmationCard) {

        confirmationCard.style.display =
            "block";

    }



    // ==================================================
    // MUREED NAME
    // ==================================================

    const confirmationName =
        getElement(
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



    // ==================================================
    // WHATSAPP
    // ==================================================

    const confirmationMobile =
        getElement(
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
        getElement(
            "appointmentDate"
        );


    if (dateInput) {

        dateInput.value =
            normalizeDateValue(
                mureed.Appointment_Date
            );

    }



    // ==================================================
    // EXISTING TIME
    // ==================================================

    const timeInput =
        getElement(
            "appointmentTime"
        );


    if (timeInput) {

        timeInput.value =
            normalizeTimeValue(
                mureed.Appointment_Time
            );

    }

}



// ======================================================
// CONFIRM BUTTON
// ======================================================

const confirmButton =
    getElement(
        "confirmAppointmentBtn"
    );


if (confirmButton) {

    confirmButton.addEventListener(
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



    const dateInput =
        getElement(
            "appointmentDate"
        );


    const timeInput =
        getElement(
            "appointmentTime"
        );


    const date =
        dateInput
            ? dateInput.value
            : "";


    const time =
        timeInput
            ? timeInput.value
            : "";



    // ==================================================
    // VALIDATION
    // ==================================================

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
    // MUREED NUMBER
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



    // India 10 digit number
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
    // SAVE APPOINTMENT
    // ==================================================

    let updateData = {

        Appointment_Status:
            "Confirmed",

        Appointment_Date:
            date,

        Appointment_Time:
            time

    };



    try {


        if (
            selectedMureed.Appointment_Id
        ) {


            const updateResult =
                await supabaseClient

                    .from("clients")

                    .update(
                        updateData
                    )

                    .eq(
                        "Appointment_Id",
                        selectedMureed.Appointment_Id
                    );



            if (
                updateResult.error
            ) {

                console.error(
                    "APPOINTMENT UPDATE ERROR:",
                    updateResult.error
                );

            }

        }

    }

    catch (error) {

        console.error(
            "UPDATE ERROR:",
            error
        );

    }



    // ==================================================
    // BEAUTIFUL WHATSAPP MESSAGE
    // ==================================================

    const message =

`✨ *HUSSAIN BAPU'S WELLNESS & BABA FARID JI (R.A) HERITAGE* ✨

━━━━━━━━━━━━━━━━━━━━

🕌 *Appointment Confirmation*

Dear *${mureedName}*,

Your appointment with us has been *CONFIRM
