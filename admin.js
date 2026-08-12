// ======================================================
// HUSSAIN BAPU'S WELLNESS
// ADMIN DASHBOARD
// APPOINTMENT + WHATSAPP WORKFLOW
// FINAL STABLE VERSION
// ======================================================



// ======================================================
// BUSINESS WHATSAPP NUMBER
// ======================================================
//
// FINAL PUBLIC BUSINESS NUMBER
//
// Personal number 9974007108 removed.
// ======================================================

const WHATSAPP_BUSINESS_NUMBER =
    "919998556782";



// ======================================================
// BRAND
// ======================================================

const BRAND_NAME =
    "HUSSAIN BAPU'S WELLNESS & BABA FARID JI (R.A.) HERITAGE";



// ======================================================
// WEBSITE
// ======================================================
//
// IMPORTANT:
// Launch ke baad yaha apna actual domain daal dena.
// Filhaal blank rakha gaya hai taaki galat link na jaye.
// ======================================================

const WEBSITE_URL =
    "";



// ======================================================
// GOOGLE MAP
// ======================================================
//
// Yaha apna final Google Maps link daalna.
// Abhi blank rakha gaya hai.
// ======================================================

const GOOGLE_MAP_URL =
    "";



// ======================================================
// GLOBAL DATA
// ======================================================

let allMureeds = [];

let selectedMureed = null;



// ======================================================
// SAFE ELEMENT HELPER
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


    if (!tbody) {

        console.error(
            "ERROR: #mureedsTable tbody not found."
        );

        return;
    }



    tbody.innerHTML =
        "<tr>" +
        "<td colspan='5' style='text-align:center;'>" +
        "Loading appointments..." +
        "</td>" +
        "</tr>";



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
                "<tr>" +
                "<td colspan='5' style='text-align:center;'>" +
                "Unable to load appointments." +
                "</td>" +
                "</tr>";


            alert(
                "Unable to load Mureeds.\n\n" +
                "Code: " +
                (error.code || "") +
                "\n\nMessage: " +
                (error.message || "")
            );


            return;
        }



        allMureeds =
            data || [];



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

        const pending =
            allMureeds.filter(
                function (mureed) {

                    return String(
                        mureed.Appointment_Status || ""
                    )
                    .trim()
                    .toLowerCase() ===
                    "pending";

                }
            );



        const pendingElement =
            getElement(
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



    } catch (err) {

        console.error(
            "UNEXPECTED LOAD ERROR:",
            err
        );


        tbody.innerHTML =
            "<tr>" +
            "<td colspan='5' style='text-align:center;'>" +
            "Unexpected error while loading appointments." +
            "</td>" +
            "</tr>";

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
            "#mureedsTable tbody not found."
        );

        return;
    }



    tbody.innerHTML =
        "";



    if (
        !mureeds ||
        mureeds.length === 0
    ) {

        tbody.innerHTML =
            "<tr>" +
            "<td colspan='5' style='text-align:center;'>" +
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
                    .trim()
                    .toLowerCase() ===
                    "pending";


                const bPending =
                    String(
                        b.Appointment_Status || ""
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



    sortedMureeds.forEach(
        function (mureed) {


            const row =
                document.createElement(
                    "tr"
                );



            // ==================================================
            // APPOINTMENT ID
            // ==================================================

            const appointmentCell =
                document.createElement(
                    "td"
                );


            appointmentCell.textContent =
                mureed.Appointment_Id ||
                "-";



            // ==================================================
            // NAME
            // ==================================================

            const nameCell =
                document.createElement(
                    "td"
                );


            nameCell.textContent =
                mureed.Full_Name ||
                "-";



            // ==================================================
            // MOBILE
            // ==================================================

            const mobileCell =
                document.createElement(
                    "td"
                );


            mobileCell.textContent =
                mureed.Mobile ||
                "-";



            // ==================================================
            // STATUS
            // ==================================================

            const statusCell =
                document.createElement(
                    "td"
                );


            statusCell.textContent =
                mureed.Appointment_Status ||
                "-";



            // ==================================================
            // ACTION
            // ==================================================

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



            // ==================================================
            // ROW
            // ==================================================

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
        getElement(
            "searchBox"
        );


    if (!searchBox) {

        console.warn(
            "#searchBox not found."
        );

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

                        const name =
                            String(
                                mureed.Full_Name ||
                                ""
                            )
                            .toLowerCase();


                        const mobile =
                            String(
                                mureed.Mobile ||
                                ""
                            )
                            .toLowerCase();


                        const whatsapp =
                            String(
                                mureed.Whatsapp ||
                                ""
                            )
                            .toLowerCase();


                        const appointmentId =
                            String(
                                mureed.Appointment_Id ||
                                ""
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



    const box =
        getElement(
            "selectedMureedBox"
        );


    if (box) {

        box.innerHTML =
            "";


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



        box.appendChild(
            name
        );


        box.appendChild(
            appointment
        );


        box.appendChild(
            mobile
        );


        box.appendChild(
            status
        );

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
        getElement(
            "confirmationCard"
        );


    if (confirmationCard) {

        confirmationCard.style.display =
            "block";

    }



    // ==================================================
    // NAME
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

    const appointmentDate =
        getElement(
            "appointmentDate"
        );


    if (appointmentDate) {

        appointmentDate.value =
            mureed.Appointment_Date ||
            "";

    }



    // ==================================================
    // EXISTING TIME
    // ==================================================

    const appointmentTime =
        getElement(
            "appointmentTime"
        );


    if (appointmentTime) {

        appointmentTime.value =
            mureed.Appointment_Time ||
            "";

    }

}



// ======================================================
// CONFIRM BUTTON SETUP
// ======================================================

function setupConfirmButton() {

    const button =
        getElement(
            "confirmAppointmentBtn"
        );


    if (!button) {

        console.warn(
            "#confirmAppointmentBtn not found."
        );

        return;
    }



    button.addEventListener(
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



    const dateElement =
        getElement(
            "appointmentDate"
        );


    const timeElement =
        getElement(
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
    // FORMAT DATE
    // ==================================================

    const formattedDate =
        formatDate(
            date
        );



    // ==================================================
    // FORMAT TIME
    // ==================================================

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
    // UPDATE SUPABASE
    // ==================================================

    try {

        const updateResult =
            await supabaseClient

                .from("clients")

                .update({

                    Appointment_Date:
                        date,

                    Appointment_Time:
                        time,

                    Appointment_Status:
       
