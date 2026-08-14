// ======================================================
// HUSSAIN BAPU'S WELLNESS
// MUREED DETAILS + SIMPLE TAWEEZ LIBRARY
// ======================================================


const params =
    new URLSearchParams(
        window.location.search
    );


const appointmentId =
    params.get("id");


let currentMureed = null;

let selectedTaweez = null;


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
            (error.message || "")
        );

        return;
    }


    currentMureed =
        data;


    // ==================================================
    // DISPLAY MUREED
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


        historyBox.innerHTML =
            "<p>Unable to load Treatment History.</p>";

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


            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                treatment.Treatment_Type ||
                "-";


            const category =
                document.createElement(
                    "p"
                );


            category.textContent =
                "Category: " +
                (
                    treatment.Category ||
                    "-"
                );


            const item =
                document.createElement(
                    "p"
                );


            item.textContent =
                "Item: " +
                (
                    treatment.Item_Name ||
                    "-"
                );


            const notes =
                document.createElement(
                    "p"
                );


            notes.textContent =
                "Notes: " +
                (
                    treatment.Notes ||
                    "-"
                );


            card.appendChild(title);

            card.appendChild(category);

            card.appendChild(item);

            card.appendChild(notes);


            if (
                treatment.Image_Url
            ) {

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
                    "10px";


                card.appendChild(
                    image
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
// LOAD TAWEEZ BY CATEGORY
// ======================================================

async function loadTaweezByCategory(
    category
) {

    const list =
        document.getElementById(
            "taweezList"
        );


    if (!list) {

        return;
    }


    list.innerHTML =
        "<p>Loading...</p>";


    if (!category) {

        list.innerHTML =
            "";

        return;
    }


    const {
        data,
        error
    } = await supabaseClient

        .from(
            "Taweez_Library"
        )

        .select(
            "id, Taweez_Name, Category, File_Url, Print_Crop"
        )

        .eq(
            "Category",
            category
        );


    if (error) {

        console.error(
            "TAWEEZ LIBRARY ERROR:",
            error
        );


        list.innerHTML =
            "<p>Unable to load Taweez.</p>";

        return;
    }


    if (
        !data ||
        data.length === 0
    ) {

        list.innerHTML =
            "<p>No Taweez found.</p>";

        return;
    }


    list.innerHTML =
        "";


    data.forEach(
        function (taweez) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "taweez-item";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                taweez.File_Url;


            image.alt =
                taweez.Taweez_Name;


            const name =
                document.createElement(
                    "strong"
                );


            name.textContent =
                taweez.Taweez_Name;


            item.appendChild(
                image
            );


            item.appendChild(
                name
            );


            item.addEventListener(
                "click",
                function () {

                    selectTaweez(
                        taweez
                    );

                }
            );


            list.appendChild(
                item
            );

        }
    );

}



// ======================================================
// SELECT TAWEEZ
// ======================================================

function selectTaweez(
    taweez
) {

    selectedTaweez =
        taweez;


    const preview =
        document.getElementById(
            "taweezPreview"
        );


    const name =
        document.getElementById(
            "selectedTaweezName"
        );


    const image =
        document.getElementById(
            "selectedTaweezImage"
        );


    if (name) {

        name.textContent =
            taweez.Taweez_Name;

    }


    if (image) {

        image.src =
            taweez.File_Url;

    }


    if (preview) {

        preview.style.display =
            "block";

    }


    // Automatically fill item name

    const itemName =
        document.getElementById(
            "Item_Name"
        );


    if (
        itemName &&
        !itemName.value.trim()
    ) {

        itemName.value =
            taweez.Taweez_Name;

    }

}



// ======================================================
// PRINT TAWEEZ
// ======================================================

function printTaweez() {

    if (!selectedTaweez) {

        alert(
            "Please select a Taweez first."
        );

        return;
    }


    const printTitle =
        document.getElementById(
            "printTaweezTitle"
        );


    const printImage =
        document.getElementById(
            "printTaweezImage"
        );


    if (printTitle) {

        printTitle.textContent =
            selectedTaweez.Taweez_Name;

    }


    if (printImage) {

        printImage.src =
            selectedTaweez.File_Url;

    }


    setTimeout(
        function () {

            window.print();

        },
        300
    );

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


    const treatmentType =
        document.getElementById(
            "Treatment_Type"
        ).value.trim();


    const category =
        document.getElementById(
            "Category"
        ).value.trim();


    const itemName =
        document.getElementById(
            "Item_Name"
        ).value.trim();


    const notes =
        document.getElementById(
            "Notes"
        ).value.trim();


    if (!treatmentType) {

        alert(
            "Please select Treatment Type."
        );

        return;
    }


    if (!itemName) {

        alert(
            "Please enter Item Name."
        );

        return;
    }


    let imageUrl =
        null;


    let printCrop =
        null;


    if (
        treatmentType === "Taweez" &&
        selectedTaweez
    ) {

        imageUrl =
            selectedTaweez.File_Url;

        printCrop =
            selectedTaweez.Print_Crop;

    }


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

            Treatment_Type:
                treatmentType,

            Category:
                category,

            Item_Name:
                itemName,

            Notes:
                notes,

            Image_Url:
                imageUrl,

            Print_Crop:
                printCrop

        }])

        .select()
        .single();


    if (error) {

        console.error(
            "TREATMENT SAVE ERROR:",
            error
        );


        alert(
            "TREATMENT SAVE ERROR\n\n" +
            "Code: " +
            (
                error.code ||
                ""
            ) +
            "\n\nMessage: " +
            (
                error.message ||
                ""
            )
        );

        return;
    }


    console.log(
        "Treatment Saved:",
        data
    );


    alert(
        "✅ Treatment Saved Successfully"
    );


    document.getElementById(
        "Treatment_Type"
    ).value = "";


    document.getElementById(
        "Category"
    ).value = "";


    document.getElementById(
        "Item_Name"
    ).value = "";


    document.getElementById(
        "Notes"
    ).value = "";


    const library =
        document.getElementById(
            "taweezLibrary"
        );


    if (library) {

        library.style.display =
            "none";

    }


    const preview =
        document.getElementById(
            "taweezPreview"
        );


    if (preview) {

        preview.style.display =
            "none";

    }


    selectedTaweez =
        null;


    closeTreatmentForm();


    await loadTreatmentHistory();

}



// ======================================================
// TREATMENT TYPE CHANGE
// ======================================================

function treatmentTypeChanged() {

    const type =
        document.getElementById(
            "Treatment_Type"
        ).value;


    const library =
        document.getElementById(
            "taweezLibrary"
        );


    if (!library) {

        return;
    }


    if (
        type === "Taweez"
    ) {

        library.style.display =
            "block";

    }

    else {

        library.style.display =
            "none";

    }

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


        const typeSelect =
            document.getElementById(
                "Treatment_Type"
            );


        if (typeSelect) {

            typeSelect.addEventListener(
                "change",
                treatmentTypeChanged
            );

        }


        const categorySelect =
            document.getElementById(
                "taweezCategory"
            );


        if (categorySelect) {

            categorySelect.addEventListener(
                "change",
                function () {

                    loadTaweezByCategory(
                        this.value
                    );

                }
            );

        }


        const printButton =
            document.getElementById(
                "printTaweezBtn"
            );


        if (printButton) {

            printButton.addEventListener(
                "click",
                printTaweez
            );

        }

    }
);



// ======================================================
// START
// ======================================================

loadMureed();
