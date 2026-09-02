// ======================================================
// HUSSAIN BAPU'S WELLNESS
// MUREED.JS - FINAL CLEAN VERSION
// PART 1 / 4
// ======================================================

const params =
    new URLSearchParams(window.location.search);

const appointmentId =
    params.get("id");

let currentMureed = null;
let selectedTaweezImageUrl = null;
let editingTreatmentId = null;


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

        alert("Appointment ID missing.");

        return;
    }


    const {
        data,
        error
    } =
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


    currentMureed = data;


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
// OPEN / CLOSE TREATMENT FORM
// ======================================================

function openTreatmentForm() {

    const form =
        document.getElementById(
            "treatmentForm"
        );


    if (form) {

        form.style.display =
            "block";

        form.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

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
// MUREED.JS - PART 2 / 4
// TREATMENT HISTORY
// ======================================================


// ======================================================
// OLD TREATMENT RECORD
// ======================================================

function addOldTreatmentRecord(card, record) {

    if (
        !record.Treatment_Type &&
        !record.Category &&
        !record.Item_Name &&
        !record.Notes
    ) {
        return;
    }


    const title =
        document.createElement("h4");

    title.textContent =
        "🩺 " +
        (
            record.Treatment_Type ||
            "Treatment"
        );

    card.appendChild(title);


    if (record.Category) {

        const p =
            document.createElement("p");

        p.innerHTML =
            "<b>Category:</b> " +
            escapeHtml(record.Category);

        card.appendChild(p);
    }


    if (record.Item_Name) {

        const p =
            document.createElement("p");

        p.innerHTML =
            "<b>Name:</b> " +
            escapeHtml(record.Item_Name);

        card.appendChild(p);
    }


    if (record.Notes) {

        const p =
            document.createElement("p");

        p.innerHTML =
            "<b>Notes:</b><br>" +
            escapeHtml(record.Notes)
                .replace(/\n/g, "<br>");

        card.appendChild(p);
    }


    if (record.Image_Url) {

        const image =
            document.createElement("img");

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

        card.appendChild(image);
    }
}


// ======================================================
// TAWEEZ RECORD
// ======================================================

function addTaweezRecord(card, record) {

    if (
    !record.Taweez_Name &&
    !record.Taweez_Notes &&
    !record.Taweez_Image_Url
) {
    return;
    }


    const title =
        document.createElement("h4");

    title.textContent =
        "🧿 Taweez";

    card.appendChild(title);


    const name =
        document.createElement("p");

    name.innerHTML =
        "<b>Name:</b> " +
        escapeHtml(
            record.Taweez_Name
        );

    card.appendChild(name);


    if (record.Taweez_Notes) {

        const notes =
            document.createElement("p");

        notes.innerHTML =
            "<b>Notes:</b><br>" +
            escapeHtml(
                record.Taweez_Notes
            ).replace(
                /\n/g,
                "<br>"
            );

        card.appendChild(notes);
    }


    if (record.Taweez_Image_Url) {

        const image =
            document.createElement("img");

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

        card.appendChild(image);
    }
}


// ======================================================
// HERBAL REMEDY
// ======================================================

function addHerbalRecord(card, record) {

    if (
    !record.Herbal_Remedy &&
    !record.Herbal_Notes
) {
    return;
    }


    const title =
        document.createElement("h4");

    title.textContent =
        "🌿 Herbal Remedy";

    card.appendChild(title);


    const name =
        document.createElement("p");

    name.innerHTML =
        "<b>Remedy:</b> " +
        escapeHtml(
            record.Herbal_Remedy
        );

    card.appendChild(name);


    if (record.Herbal_Notes) {

        const notes =
            document.createElement("p");

        notes.innerHTML =
            "<b>Notes:</b><br>" +
            escapeHtml(
                record.Herbal_Notes
            ).replace(
                /\n/g,
                "<br>"
            );

        card.appendChild(notes);
    }
}


// ======================================================
// WAZIFA
// ======================================================

function addWazifaRecord(card, record) {

    if (
    !record.Wazifa &&
    !record.Wazifa_Notes
) {
    return;
    }


    const title =
        document.createElement("h4");

    title.textContent =
        "📿 Wazifa";

    card.appendChild(title);


    const name =
        document.createElement("p");

    name.innerHTML =
        "<b>Wazifa:</b> " +
        escapeHtml(
            record.Wazifa
        );

    card.appendChild(name);


    if (record.Wazifa_Notes) {

        const notes =
            document.createElement("p");

        notes.innerHTML =
            "<b>Notes:</b><br>" +
            escapeHtml(
                record.Wazifa_Notes
            ).replace(
                /\n/g,
                "<br>"
            );

        card.appendChild(notes);
    }
}


// ======================================================
// ADDITIONAL NOTES
// ======================================================

function addAdditionalNotes(card, record) {

    if (!record.Additional_Notes) {
        return;
    }


    const title =
        document.createElement("h4");

    title.textContent =
        "📝 Additional Notes";

    card.appendChild(title);


    const notes =
        document.createElement("p");

    notes.innerHTML =
        escapeHtml(
            record.Additional_Notes
        ).replace(
            /\n/g,
            "<br>"
        );

    card.appendChild(notes);
}
function editTreatment(record) {

    editingTreatmentId = record.id;

    openTreatmentForm();

    const fields = [
        "Taweez_Name",
        "Taweez_Notes",
        "Herbal_Remedy",
        "Herbal_Notes",
        "Wazifa",
        "Wazifa_Notes",
        "Additional_Notes"
    ];

    fields.forEach(function(id) {

        const element =
            document.getElementById(id);

        if (element) {

            element.value =
                record[id] || "";

        }

    });

    selectedTaweezImageUrl =
        record.Taweez_Image_Url || null;
}
// ======================================================
// MUREED.JS - PART 3 / 4
// TREATMENT HISTORY + IMAGE PREVIEW + TAWEEZ GALLERY
// ======================================================


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


    const {
        data,
        error
    } =
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


    if (
        records.length ===
        0
    ) {

        box.innerHTML =
            "<p>No Treatment Added Yet.</p>";

        return;
    }


    box.innerHTML =
        "";


    records.forEach(
        function(record) {
console.log(
    "DATABASE RECORD:",
    record
);
            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card treatment-record";


            card.style.marginBottom =
                "15px";


            // DATE
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


            // OLD TREATMENT
            addOldTreatmentRecord(
                card,
                record
            );


            // TAWEEZ
            addTaweezRecord(
                card,
                record
            );


            // HERBAL
            addHerbalRecord(
                card,
                record
            );


            // WAZIFA
            addWazifaRecord(
                card,
                record
            );


            // ADDITIONAL NOTES
            addAdditionalNotes(
                card,
                record
            );
const editButton =
    document.createElement("button");

editButton.type = "button";

editButton.textContent = "✏️ Edit";

editButton.style.marginTop = "12px";

editButton.style.padding = "10px 16px";

editButton.style.cursor = "pointer";

editButton.onclick = function() {

    editTreatment(record);

};

card.appendChild(editButton);

            box.appendChild(
                card
            );

        }
    );

}


// ======================================================
// FULL IMAGE PREVIEW
// ======================================================

function openFullImage(imageUrl) {

    if (!imageUrl) {
        return;
    }


    const oldOverlay =
        document.getElementById(
            "taweezImagePreview"
        );


    if (oldOverlay) {
        oldOverlay.remove();
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
        "999999";


    overlay.style.background =
        "rgba(0,0,0,0.95)";


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


    // CLOSE BUTTON
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


    close.onclick =
        function() {

            overlay.remove();

        };


    // IMAGE
    const image =
        document.createElement(
            "img"
        );


    image.src =
        imageUrl;


    image.style.maxWidth =
        "96vw";


    image.style.maxHeight =
        "82vh";


    image.style.width =
        "auto";


    image.style.height =
        "auto";


    image.style.objectFit =
        "contain";


    image.style.background =
        "#ffffff";


    image.style.padding =
        "5px";


    image.style.borderRadius =
        "8px";


    image.onerror =
        function() {

            image.style.display =
                "none";


            const errorText =
                document.createElement(
                    "p"
                );


            errorText.textContent =
                "⚠️ Image Load Nahi Hui";


            errorText.style.color =
                "#ff6b6b";


            errorText.style.fontWeight =
                "bold";


            overlay.appendChild(
                errorText
            );

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


    document.body.appendChild(
        overlay
    );

}

// ======================================================
// TAWEEZ IMAGE URL HELPER
// ======================================================

function getTaweezImageUrl(fileUrl) {

    if (!fileUrl) {
        return "";
    }

    let value =
        String(fileUrl).trim();

    if (!value) {
        return "";
    }


    // ==================================================
    // ALREADY COMPLETE PUBLIC URL
    // ==================================================

    if (
        value.startsWith("http://") ||
        value.startsWith("https://")
    ) {

        return value;
    }


    // ==================================================
    // REMOVE LEADING SLASH
    // ==================================================

    value =
        value.replace(/^\/+/, "");


    // ==================================================
    // IF DATABASE STORES FULL STORAGE PATH
    // ==================================================

    if (
        value.includes(
            "/storage/v1/object/public/taweez-library/"
        )
    ) {

        value =
            value.split(
                "/storage/v1/object/public/taweez-library/"
            )[1] || "";
    }


    // ==================================================
    // SUPABASE PUBLIC URL
    // ==================================================

    const {
        data
    } =
        supabaseClient
            .storage
            .from("taweez-library")
            .getPublicUrl(
                value
            );


    if (
        data &&
        data.publicUrl
    ) {

        return data.publicUrl;
    }


    return "";
}
// ======================================================
// TAWEEZ CROP & PRINT EDITOR
// ======================================================

function openTaweezCropEditor(
    imageUrl,
    taweezName
) {

    if (!imageUrl) {

        alert(
            "Taweez image available nahi hai."
        );

        return;
    }


    // REMOVE OLD EDITOR
    const oldEditor =
        document.getElementById(
            "taweezCropEditor"
        );


    if (oldEditor) {

        oldEditor.remove();

    }


    // MAIN OVERLAY
    const overlay =
        document.createElement(
            "div"
        );


    overlay.id =
        "taweezCropEditor";


    overlay.style.position =
        "fixed";

    overlay.style.inset =
        "0";

    overlay.style.zIndex =
        "999999";

    overlay.style.background =
        "rgba(0,0,0,0.96)";

    overlay.style.overflowY =
        "auto";

    overlay.style.padding =
        "15px";

    overlay.style.boxSizing =
        "border-box";


    // PANEL
    const panel =
        document.createElement(
            "div"
        );


    panel.style.maxWidth =
        "900px";

    panel.style.margin =
        "0 auto";

    panel.style.background =
        "#ffffff";

    panel.style.borderRadius =
        "12px";

    panel.style.padding =
        "15px";

    panel.style.boxSizing =
        "border-box";


    // TITLE
    const title =
        document.createElement(
            "h2"
        );


    title.textContent =
        "✂️ Crop Taweez";


    title.style.marginTop =
        "0";


    panel.appendChild(
        title
    );


    const instruction =
        document.createElement(
            "p"
        );


    instruction.textContent =
        "Image me sirf Arabic Taweez wala hissa select karein, phir Print dabayein.";


    instruction.style.fontWeight =
        "bold";


    panel.appendChild(
        instruction
    );


    // IMAGE WRAPPER
    const imageWrapper =
        document.createElement(
            "div"
        );


    imageWrapper.style.position =
        "relative";

    imageWrapper.style.display =
        "inline-block";

    imageWrapper.style.maxWidth =
        "100%";

    imageWrapper.style.lineHeight =
        "0";

    imageWrapper.style.background =
        "#eeeeee";

    imageWrapper.style.overflow =
        "hidden";


    // SOURCE IMAGE
    const sourceImage =
        document.createElement(
            "img"
        );


    sourceImage.crossOrigin =
        "anonymous";

    sourceImage.src =
        imageUrl;

    sourceImage.style.display =
        "block";

    sourceImage.style.maxWidth =
        "100%";

    sourceImage.style.maxHeight =
        "70vh";

    sourceImage.style.width =
        "auto";

    sourceImage.style.height =
        "auto";

    sourceImage.style.userSelect =
        "none";


    imageWrapper.appendChild(
        sourceImage
    );


    panel.appendChild(
        imageWrapper
    );


    // CROP BOX
    const cropBox =
        document.createElement(
            "div"
        );


    cropBox.style.position =
        "absolute";

    cropBox.style.left =
        "20%";

    cropBox.style.top =
        "20%";

    cropBox.style.width =
        "60%";

    cropBox.style.height =
        "60%";

    cropBox.style.border =
        "3px solid red";

    cropBox.style.background =
        "rgba(255,255,255,0.08)";

    cropBox.style.cursor =
        "move";

    cropBox.style.boxSizing =
        "border-box";

    cropBox.style.touchAction =
        "none";


    imageWrapper.appendChild(
        cropBox
    );


    // HELP TEXT
    const help =
        document.createElement(
            "p"
        );


    help.textContent =
        "🔴 Red box ko finger/mouse se move karke Arabic Taweez ke exact area par set karein.";


    panel.appendChild(
        help
    );


    // BUTTON AREA
    const buttons =
        document.createElement(
            "div"
        );


    buttons.style.display =
        "flex";

    buttons.style.flexWrap =
        "wrap";

    buttons.style.gap =
        "10px";

    buttons.style.marginTop =
        "10px";


    // RESET
    const resetButton =
        document.createElement(
            "button"
        );


    resetButton.type =
        "button";

    resetButton.textContent =
        "↩️ Reset Crop";

    resetButton.className =
        "btn";


    // PRINT
    const printButton =
        document.createElement(
            "button"
        );


    printButton.type =
        "button";

    printButton.textContent =
        "🖨️ Print Taweez";

    printButton.className =
        "btn gold";


    // CLOSE
    const closeButton =
        document.createElement(
            "button"
        );


    closeButton.type =
        "button";

    closeButton.textContent =
        "✕ Close";

    closeButton.className =
        "btn";


    buttons.appendChild(
        resetButton
    );

    buttons.appendChild(
        printButton
    );

    buttons.appendChild(
        closeButton
    );


    panel.appendChild(
        buttons
    );


    overlay.appendChild(
        panel
    );


    document.body.appendChild(
        overlay
    );


    // ==================================================
    // RESET CROP
    // ==================================================

    function resetCrop() {

        cropBox.style.left =
            "20%";

        cropBox.style.top =
            "20%";

        cropBox.style.width =
            "60%";

        cropBox.style.height =
            "60%";

    }


    resetButton.onclick =
        resetCrop;


    closeButton.onclick =
        function() {

            overlay.remove();

        };


 // ==================================================
// RESIZE HANDLES
// ==================================================

const handles = [
    "nw",
    "n",
    "ne",
    "e",
    "se",
    "s",
    "sw",
    "w"
];

handles.forEach(
    function(position) {

        const handle =
            document.createElement(
                "div"
            );

        handle.dataset.handle =
            position;

        handle.style.position =
            "absolute";

        handle.style.width =
            "18px";

        handle.style.height =
            "18px";

        handle.style.background =
            "#ffffff";

        handle.style.border =
            "3px solid red";

        handle.style.borderRadius =
            "50%";

        handle.style.boxSizing =
            "border-box";

        handle.style.zIndex =
            "20";

        handle.style.touchAction =
            "none";


        if (
            position.includes("n")
        ) {
            handle.style.top =
                "-9px";
        }

        if (
            position.includes("s")
        ) {
            handle.style.bottom =
                "-9px";
        }

        if (
            position.includes("e")
        ) {
            handle.style.right =
                "-9px";
        }

        if (
            position.includes("w")
        ) {
            handle.style.left =
                "-9px";
        }


        if (
            position === "n" ||
            position === "s"
        ) {

            handle.style.left =
                "50%";

            handle.style.transform =
                "translateX(-50%)";

        }


        if (
            position === "e" ||
            position === "w"
        ) {

            handle.style.top =
                "50%";

            handle.style.transform =
                "translateY(-50%)";

        }


        if (
            position === "nw" ||
            position === "ne" ||
            position === "sw" ||
            position === "se"
        ) {

            handle.style.cursor =
                position +
                "-resize";

        }


        if (
            position === "n" ||
            position === "s"
        ) {

            handle.style.cursor =
                "ns-resize";

        }


        if (
            position === "e" ||
            position === "w"
        ) {

            handle.style.cursor =
                "ew-resize";

        }


        cropBox.appendChild(
            handle
        );

    }
);

    // ==================================================
// MOVE + RESIZE CROP BOX
// ==================================================

let cropAction = null;

let startX = 0;
let startY = 0;

let startLeft = 0;
let startTop = 0;

let startWidth = 0;
let startHeight = 0;


cropBox.addEventListener(
    "pointerdown",
    function(event) {

        event.preventDefault();
        event.stopPropagation();


        const handle =
            event.target.closest(
                "[data-handle]"
            );


        cropAction =
            handle
                ? handle.dataset.handle
                : "move";


        startX =
            event.clientX;

        startY =
            event.clientY;


        startLeft =
            cropBox.offsetLeft;

        startTop =
            cropBox.offsetTop;


        startWidth =
            cropBox.offsetWidth;

        startHeight =
            cropBox.offsetHeight;


        cropBox.setPointerCapture(
            event.pointerId
        );

    }
);


cropBox.addEventListener(
    "pointermove",
    function(event) {

        if (!cropAction) {
            return;
        }


        event.preventDefault();


        const dx =
            event.clientX -
            startX;

        const dy =
            event.clientY -
            startY;


        const maxWidth =
            imageWrapper.clientWidth;

        const maxHeight =
            imageWrapper.clientHeight;


        // ==========================================
        // MOVE
        // ==========================================

        if (
            cropAction ===
            "move"
        ) {

            let newLeft =
                startLeft + dx;

            let newTop =
                startTop + dy;


            newLeft =
                Math.max(
                    0,
                    Math.min(
                        newLeft,
                        maxWidth -
                        startWidth
                    )
                );


            newTop =
                Math.max(
                    0,
                    Math.min(
                        newTop,
                        maxHeight -
                        startHeight
                    )
                );


            cropBox.style.left =
                newLeft + "px";

            cropBox.style.top =
                newTop + "px";


            return;
        }


        // ==========================================
        // RESIZE
        // ==========================================

        let left =
            startLeft;

        let top =
            startTop;

        let width =
            startWidth;

        let height =
            startHeight;


        const minSize =
            40;


        if (
            cropAction.includes("e")
        ) {

            width =
                startWidth + dx;

        }


        if (
            cropAction.includes("w")
        ) {

            left =
                startLeft + dx;

            width =
                startWidth - dx;

        }


        if (
            cropAction.includes("s")
        ) {

            height =
                startHeight + dy;

        }


        if (
            cropAction.includes("n")
        ) {

            top =
                startTop + dy;

            height =
                startHeight - dy;

        }


        // Minimum size
        if (
            width <
            minSize
        ) {

            width =
                minSize;

        }


        if (
            height <
            minSize
        ) {

            height =
                minSize;

        }


        // Keep inside image
        if (
            left < 0
        ) {

            left =
                0;

        }


        if (
            top < 0
        ) {

            top =
                0;

        }


        if (
            left + width >
            maxWidth
        ) {

            width =
                maxWidth -
                left;

        }


        if (
            top + height >
            maxHeight
        ) {

            height =
                maxHeight -
                top;

        }


        cropBox.style.left =
            left + "px";

        cropBox.style.top =
            top + "px";

        cropBox.style.width =
            width + "px";

        cropBox.style.height =
            height + "px";

    }
);


cropBox.addEventListener(
    "pointerup",
    function(event) {

        cropAction =
            null;


        try {

            cropBox.releasePointerCapture(
                event.pointerId
            );

        } catch (e) {}

    }
);


cropBox.addEventListener(
    "pointercancel",
    function() {

        cropAction =
            null;

    }
);

    
    // ==================================================
    // PRINT CROPPED AREA
    // ==================================================

    printButton.onclick =
        function() {

            if (!sourceImage.naturalWidth) {

                alert(
                    "Image abhi load ho rahi hai. Thodi der baad try karein."
                );

                return;
            }


            const displayWidth =
                sourceImage.clientWidth;


            const displayHeight =
                sourceImage.clientHeight;


            if (
                !displayWidth ||
                !displayHeight
            ) {

                alert(
                    "Image size detect nahi ho paya."
                );

                return;
            }


            // SCALE FROM SCREEN TO ORIGINAL IMAGE
            const scaleX =
                sourceImage.naturalWidth /
                displayWidth;


            const scaleY =
                sourceImage.naturalHeight /
                displayHeight;


            const cropX =
                cropBox.offsetLeft *
                scaleX;


            const cropY =
                cropBox.offsetTop *
                scaleY;


            const cropWidth =
                cropBox.offsetWidth *
                scaleX;


            const cropHeight =
                cropBox.offsetHeight *
                scaleY;


            const canvas =
                document.createElement(
                    "canvas"
                );


            canvas.width =
                Math.round(
                    cropWidth
                );


            canvas.height =
                Math.round(
                    cropHeight
                );


            const ctx =
                canvas.getContext(
                    "2d"
                );


            ctx.drawImage(
                sourceImage,
                cropX,
                cropY,
                cropWidth,
                cropHeight,
                0,
                0,
                canvas.width,
                canvas.height
            );


            let croppedImage;


            try {

                croppedImage =
                    canvas.toDataURL(
                        "image/png"
                    );

            } catch (error) {

                console.error(
                    "Crop Export Error:",
                    error
                );


                alert(
                    "Image crop nahi ho pa raha. Supabase Storage CORS setting check karni padegi."
                );

                return;

            }


            // PRINT WINDOW
            const printWindow =
                window.open(
                    "",
                    "_blank"
                );


            if (!printWindow) {

                alert(
                    "Print window blocked hai. Browser me pop-up allow karein."
                );

                return;

            }


            printWindow.document.open();


            printWindow.document.write(
                `
                <!DOCTYPE html>

                <html>

                <head>

                <title>
                ${escapeHtml(taweezName || "Taweez")}
                </title>

                <style>

                @page {
                    margin: 0;
                }

                html,
                body {
                    margin: 0;
                    padding: 0;
                    background: #ffffff;
                }

                body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                }

                img {
                    max-width: 100%;
                    max-height: 100vh;
                    object-fit: contain;
                }

                </style>

                </head>

                <body>

                <img
                    src="${croppedImage}"
                    alt="Taweez"
                >

                <script>

                window.onload =
                    function() {

                        setTimeout(
                            function() {

                                window.print();

                            },
                            300
                        );

                    };

                <\/script>

                </body>

                </html>
                `
            );


            printWindow.document.close();

        };


    // IMAGE LOAD ERROR
    sourceImage.onerror =
        function() {

            alert(
                "Taweez image load nahi hui."
            );

        };

}

// ======================================================
// TAWEEZ GALLERY FROM SUPABASE STORAGE
// ======================================================

async function selectTaweez() {

    const bucketName = "taweez-library";


    // GET FOLDERS
    const {
        data: folders,
        error: folderError
    } =
    await supabaseClient
        .storage
        .from(bucketName)
        .list(
            "",
            {
                limit: 1000,
                offset: 0
            }
        );


    if (folderError) {

        console.error(
            "Folder Load Error:",
            folderError
        );

        alert(
            folderError.message
        );

        return;
    }


    const allTaweez = [];


    for (
        const folder of folders
    ) {


        if (
            folder.name.includes(".")
        ) {
            continue;
        }


        const {
            data: images,
            error: imageError
        }
        =
        await supabaseClient
            .storage
            .from(bucketName)
            .list(
                folder.name,
                {
                    limit: 1000,
                    offset: 0
                }
            );


        if (imageError) {

            console.error(
                imageError
            );

            continue;

        }


        images.forEach(
            function(image){

                if(
                    image.name
                ) {

                    const {
                        data
                    }
                    =
                    supabaseClient
                    .storage
                    .from(bucketName)
                    .getPublicUrl(
                        folder.name +
                        "/" +
                        image.name
                    );


                    allTaweez.push({

                        Category:
                            folder.name,


                        Taweez_Name:
                            image.name
                            .replace(
                                /\.[^/.]+$/,
                                ""
                            ),


                        File_Url:
                            data
                            .publicUrl

                    });

                }

            }
        );

    }


    if(
        allTaweez.length === 0
    ){

        alert(
            "Storage me koi Taweez nahi mila"
        );

        return;

    }
        // REMOVE OLD OVERLAY
    const oldOverlay =
        document.getElementById(
            "taweezGalleryOverlay"
        );


    if(oldOverlay){

        oldOverlay.remove();

    }


    const overlay =
        document.createElement(
            "div"
        );


    overlay.id =
        "taweezGalleryOverlay";


    overlay.style.position =
        "fixed";


    overlay.style.inset =
        "0";


    overlay.style.zIndex =
        "99999";


    overlay.style.background =
        "rgba(0,0,0,0.96)";


    overlay.style.overflowY =
        "auto";


    overlay.style.padding =
        "15px";


    const heading =
        document.createElement(
            "h2"
        );


    heading.textContent =
        "🧿 Taweez Library";


    heading.style.color =
        "#fff";


    overlay.appendChild(
        heading
    );


    const categoryArea =
        document.createElement(
            "div"
        );


    categoryArea.style.display =
        "grid";


    categoryArea.style.gridTemplateColumns =
        "repeat(auto-fit,minmax(150px,1fr))";


    categoryArea.style.gap =
        "10px";


    overlay.appendChild(
        categoryArea
    );


    const galleryArea =
        document.createElement(
            "div"
        );


    galleryArea.style.marginTop =
        "20px";


    overlay.appendChild(
        galleryArea
    );


    document.body.appendChild(
        overlay
    );



    const categories =
    [
        ...new Set(
            allTaweez.map(
                function(item){

                    return item.Category;

                }
            )
        )
    ];



    categories.forEach(
        function(category){


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                "📁 " + category;


            button.style.padding =
                "12px";


            button.style.cursor =
                "pointer";


            button.onclick =
            function(){


                galleryArea.innerHTML =
                    "";


                const images =
                allTaweez.filter(
                    function(item){

                        return (
                            item.Category === category
                        );

                    }
                );



                images.forEach(
                    function(item){


                        const card =
                            document.createElement(
                                "div"
                            );


                        card.style.background =
                            "#fff";


                        card.style.padding =
                            "10px";


                        card.style.marginBottom =
                            "15px";


                        card.style.borderRadius =
                            "10px";



                        const img =
                            document.createElement(
                                "img"
                            );


                        img.src =
                            item.File_Url;


                        img.style.width =
                            "100%";


                        img.style.height =
                            "200px";


                        img.style.objectFit =
                            "contain";


                        card.appendChild(
                            img
                        );



                        const name =
                            document.createElement(
                                "p"
                            );


                        name.textContent =
                            item.Taweez_Name;


                        card.appendChild(
                            name
                        );



                        const selectBtn =
                            document.createElement(
                                "button"
                            );


                        selectBtn.textContent =
                            "✅ Select This Taweez";


                        selectBtn.style.width =
                            "100%";


                        selectBtn.style.padding =
                            "10px";



                        selectBtn.onclick =
                        function(){


                            const nameInput =
                            document.getElementById(
                                "Taweez_Name"
                            );


                            if(nameInput){

                                nameInput.value =
                                    item.Taweez_Name;

                            }


                            selectedTaweezImageUrl =
                                item.File_Url;



                            const selectedBox =
                            document.getElementById(
                                "selectedTaweez"
                            );


                            if(selectedBox){

                                selectedBox.innerHTML =
                                `
                                <p>
                                ✅ Selected:
                                ${item.Taweez_Name}
                                </p>

                                <img src="${item.File_Url}"
                                style="width:100%;max-width:500px;">
                                `;

                            }


                            overlay.remove();


                        };


                        card.appendChild(
                            selectBtn
                        );


                        galleryArea.appendChild(
                            card
                        );


                    }
                );


            };


            categoryArea.appendChild(
                button
            );


        }
    );

                        }



    // ==================================================
    // CATEGORY SEARCH LIVE
    // ==================================================

    categorySearch.addEventListener(
        "input",
        function() {

            renderCategories(
                categorySearch.value
            );

        }
    );


    // ==================================================
    // SHOW ALL CATEGORIES FIRST
    // ==================================================

    renderCategories("");

}


// ======================================================
// HUSSAIN BAPU'S WELLNESS
// MUREED.JS - PART 4 / 4 FINAL (1/2)
// SAVE + UPDATE TREATMENT
// ======================================================


// ======================================================
// SAVE TREATMENT
// ======================================================

async function saveTreatment() {


    console.log(
        "SAVE CLICKED"
    );


    if (!currentMureed) {

        alert(
            "Mureed information not loaded."
        );

        return;

    }



    const taweezName =
        document.getElementById(
            "Taweez_Name"
        )?.value.trim() || null;



    const taweezNotes =
        document.getElementById(
            "Taweez_Notes"
        )?.value.trim() || null;



    const herbalRemedy =
        document.getElementById(
            "Herbal_Remedy"
        )?.value.trim() || null;



    const herbalNotes =
        document.getElementById(
            "Herbal_Notes"
        )?.value.trim() || null;



    const wazifa =
        document.getElementById(
            "Wazifa"
        )?.value.trim() || null;



    const wazifaNotes =
        document.getElementById(
            "Wazifa_Notes"
        )?.value.trim() || null;



    const additionalNotes =
        document.getElementById(
            "Additional_Notes"
        )?.value.trim() || null;



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



    const treatmentData = {


        Taweez_Name:
            taweezName,


        Taweez_Notes:
            taweezNotes,


        Taweez_Image_Url:
            selectedTaweezImageUrl || null,


        Herbal_Remedy:
            herbalRemedy,


        Herbal_Notes:
            herbalNotes,


        Wazifa:
            wazifa,


        Wazifa_Notes:
            wazifaNotes,


        Additional_Notes:
            additionalNotes

    };

// ==================================================
    // UPDATE EXISTING TREATMENT
    // ==================================================

    if (editingTreatmentId) {


        console.log(
            "Updating Treatment ID:",
            editingTreatmentId
        );


        const {
            error
        } =
        await supabaseClient
            .from(
                "Mureed_Treatment_History"
            )
            .update(
                treatmentData
            )
            .eq(
                "id",
                editingTreatmentId
            );



        if (error) {


            console.error(
                "UPDATE ERROR:",
                error
            );


            alert(
                "UPDATE ERROR\n\n" +
                error.message
            );


            return;

        }



        alert(
            "✅ Treatment Updated Successfully"
        );


        editingTreatmentId =
            null;



        clearTreatmentForm();



        await refreshTreatmentHistory();



        return;

    }



    // ==================================================
    // INSERT NEW TREATMENT
    // ==================================================


    console.log(
        "Adding New Treatment"
    );



    const {
        data,
        error
    } =
    await supabaseClient
        .from(
            "Mureed_Treatment_History"
        )
        .insert([{

            Mureed_Id:
                currentMureed.id,


            Appointment_Id:
                appointmentId,


            ...treatmentData


        }])
        .select()
        .single();



    if (error) {


        console.error(
            "SAVE ERROR:",
            error
        );


        alert(
            "SAVE ERROR\n\n" +
            error.message
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



    clearTreatmentForm();



    await refreshTreatmentHistory();


    }

    // ======================================================
// CLEAR TREATMENT FORM
// ======================================================

function clearTreatmentForm() {


    const fields = [

        "Taweez_Name",
        "Taweez_Notes",
        "Herbal_Remedy",
        "Herbal_Notes",
        "Wazifa",
        "Wazifa_Notes",
        "Additional_Notes"

    ];



    fields.forEach(
        function(id) {


            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.value =
                    "";

            }


        }
    );



    selectedTaweezImageUrl =
        null;



    const selectedBox =
        document.getElementById(
            "selectedTaweez"
        );



    if (selectedBox) {

        selectedBox.innerHTML =
            "";

    }



    closeTreatmentForm();

}




// ======================================================
// REFRESH TREATMENT HISTORY
// ======================================================

async function refreshTreatmentHistory() {


    const box =
        document.getElementById(
            "treatmentHistory"
        );



    if (box) {

        box.innerHTML =
            "<p>Refreshing Treatment History...</p>";

    }



    // small delay for Supabase sync

    await new Promise(
        function(resolve){

            setTimeout(
                resolve,
                500
            );

        }
    );



    await loadTreatmentHistory();


}




// ======================================================
// FINAL BUTTON INITIALIZATION
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {



        const addButton =
            document.getElementById(
                "addTreatmentBtn"
            );



        const cancelButton =
            document.getElementById(
                "cancelTreatmentBtn"
            );



        const saveButton =
            document.getElementById(
                "saveTreatmentBtn"
            );



        const selectButton =
            document.getElementById(
                "selectTaweezBtn"
            );





        if (addButton) {


            addButton.addEventListener(
                "click",
                function(){

                    editingTreatmentId =
                        null;


                    openTreatmentForm();

                }
            );


        }





        if (cancelButton) {


            cancelButton.addEventListener(
                "click",
                closeTreatmentForm
            );


        }





        if (saveButton) {


            saveButton.addEventListener(
                "click",
                saveTreatment
            );


        }





        if (selectButton) {


            selectButton.addEventListener(
                "click",
                selectTaweez
            );


        }




        loadMureed();


    }
);
        
                
