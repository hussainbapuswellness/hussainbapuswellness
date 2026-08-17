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

    if (!record.Taweez_Name) {
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

    if (!record.Herbal_Remedy) {
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

    if (!record.Wazifa) {
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
// TAWEEZ GALLERY
// ======================================================

async function selectTaweez() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "Taweez_Library"
            )
            .select("*")
            .order(
                "Category"
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
            "Taweez Library Error\n\n" +
            error.message
        );


        return;
    }


    const allTaweez =
        data || [];


    if (
        allTaweez.length ===
        0
    ) {

        alert(
            "Taweez_Library me abhi koi Taweez nahi hai."
        );


        return;
    }


    // REMOVE OLD OVERLAY
    const oldOverlay =
        document.getElementById(
            "taweezGalleryOverlay"
        );


    if (oldOverlay) {

        oldOverlay.remove();

    }


    // MAIN OVERLAY
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


    overlay.style.boxSizing =
        "border-box";


    // HEADER
    const header =
        document.createElement(
            "div"
        );


    header.style.display =
        "flex";


    header.style.justifyContent =
        "space-between";


    header.style.alignItems =
        "center";


    header.style.gap =
        "10px";


    header.style.marginBottom =
        "15px";


    const heading =
        document.createElement(
            "h2"
        );


    heading.textContent =
        "🧿 Taweez Library";


    heading.style.color =
        "#ffffff";


    heading.style.margin =
        "0";


    heading.style.fontSize =
        "20px";


    const closeButton =
        document.createElement(
            "button"
        );


    closeButton.type =
        "button";


    closeButton.textContent =
        "✕ Close";


    closeButton.style.padding =
        "9px 14px";


    closeButton.style.border =
        "none";


    closeButton.style.borderRadius =
        "8px";


    closeButton.style.background =
        "#ffffff";


    closeButton.style.color =
        "#111111";


    closeButton.style.fontWeight =
        "bold";


    closeButton.style.cursor =
        "pointer";


    closeButton.onclick =
        function() {

            overlay.remove();

        };


    header.appendChild(
        heading
    );


    header.appendChild(
        closeButton
    );


    overlay.appendChild(
        header
    );


    // CATEGORY SEARCH
    const categorySearch =
        document.createElement(
            "input"
        );


    categorySearch.type =
        "search";


    categorySearch.placeholder =
        "🔎 Search Category / Folder...";


    categorySearch.style.width =
        "100%";


    categorySearch.style.padding =
        "13px";


    categorySearch.style.borderRadius =
        "10px";


    categorySearch.style.border =
        "none";


    categorySearch.style.boxSizing =
        "border-box";


    categorySearch.style.marginBottom =
        "15px";


    categorySearch.style.fontSize =
        "16px";


    overlay.appendChild(
        categorySearch
    );


    // CATEGORY AREA
    const categoryArea =
        document.createElement(
            "div"
        );


    categoryArea.id =
        "taweezCategoryArea";


    categoryArea.style.display =
        "grid";


    categoryArea.style.gridTemplateColumns =
        "repeat(auto-fit, minmax(150px, 1fr))";


    categoryArea.style.gap =
        "10px";


    overlay.appendChild(
        categoryArea
    );


    // GALLERY AREA
    const galleryArea =
        document.createElement(
            "div"
        );


    galleryArea.id =
        "taweezGalleryArea";


    galleryArea.style.marginTop =
        "15px";


    overlay.appendChild(
        galleryArea
    );


    document.body.appendChild(
        overlay
    );


    // UNIQUE CATEGORIES
    const categories =
        [
            ...new Set(
                allTaweez
                    .map(
                        function(item) {

                            return (
                                item.Category ||
                                ""
                            )
                            .trim();

                        }
                    )
                    .filter(
                        function(category) {

                            return (
                                category !==
                                ""
                            );

                        }
                    )
            )
        ]
        .sort(
            function(a, b) {

                return a.localeCompare(
                    b,
                    undefined,
                    {
                        sensitivity:
                            "base"
                    }
                );

            }
        );

    // ==================================================
    // RENDER CATEGORIES
    // ==================================================

    function renderCategories(
        searchText
    ) {

        categoryArea.innerHTML =
            "";

        galleryArea.innerHTML =
            "";


        const search =
            (
                searchText ||
                ""
            )
            .trim()
            .toLowerCase();


        const filteredCategories =
            categories.filter(
                function(category) {

                    return (
                        !search ||
                        category
                            .toLowerCase()
                            .includes(
                                search
                            )
                    );

                }
            );


        if (
            filteredCategories.length ===
            0
        ) {

            const empty =
                document.createElement(
                    "p"
                );


            empty.textContent =
                "🔎 Koi Category nahi mili.";


            empty.style.color =
                "#ffffff";


            categoryArea.appendChild(
                empty
            );


            return;
        }


        filteredCategories.forEach(
            function(category) {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.textContent =
                    "📁 " +
                    category;


                button.style.padding =
                    "14px 10px";


                button.style.border =
                    "none";


                button.style.borderRadius =
                    "10px";


                button.style.background =
                    "#e5b935";


                button.style.color =
                    "#111111";


                button.style.fontWeight =
                    "bold";


                button.style.fontSize =
                    "15px";


                button.style.cursor =
                    "pointer";


                button.onclick =
                    function() {

                        showCategory(
                            category
                        );

                    };


                categoryArea.appendChild(
                    button
                );

            }
        );

    }


    // ==================================================
    // SHOW CATEGORY
    // ==================================================

    function showCategory(
        category
    ) {

        categoryArea.innerHTML =
            "";


        galleryArea.innerHTML =
            "";


        const backButton =
            document.createElement(
                "button"
            );


        backButton.type =
            "button";


        backButton.textContent =
            "← Back to Categories";


        backButton.style.padding =
            "9px 14px";


        backButton.style.border =
            "none";


        backButton.style.borderRadius =
            "8px";


        backButton.style.background =
            "#ffffff";


        backButton.style.color =
            "#111111";


        backButton.style.fontWeight =
            "bold";


        backButton.style.cursor =
            "pointer";


        backButton.style.marginBottom =
            "12px";


        backButton.onclick =
            function() {

                renderCategories(
                    categorySearch.value
                );

            };


        galleryArea.appendChild(
            backButton
        );


        const title =
            document.createElement(
                "h3"
            );


        title.textContent =
            "📁 " +
            category;


        title.style.color =
            "#ffffff";


        galleryArea.appendChild(
            title
        );


        const taweezSearch =
            document.createElement(
                "input"
            );


        taweezSearch.type =
            "search";


        taweezSearch.placeholder =
            "🔎 Search Taweez in " +
            category +
            "...";


        taweezSearch.style.width =
            "100%";


        taweezSearch.style.padding =
            "12px";


        taweezSearch.style.borderRadius =
            "10px";


        taweezSearch.style.border =
            "none";


        taweezSearch.style.boxSizing =
            "border-box";


        taweezSearch.style.marginBottom =
            "15px";


        galleryArea.appendChild(
            taweezSearch
        );


        const gallery =
            document.createElement(
                "div"
            );


        gallery.style.display =
            "grid";


        gallery.style.gridTemplateColumns =
            "repeat(auto-fit, minmax(160px, 1fr))";


        gallery.style.gap =
            "12px";


        galleryArea.appendChild(
            gallery
        );


        function renderTaweez(
            searchText
        ) {

            gallery.innerHTML =
                "";


            const search =
                (
                    searchText ||
                    ""
                )
                .trim()
                .toLowerCase();


            const filtered =
                allTaweez.filter(
                    function(item) {

                        const itemCategory =
                            (
                                item.Category ||
                                ""
                            )
                            .trim()
                            .toLowerCase();


                        const itemName =
                            (
                                item.Taweez_Name ||
                                ""
                            )
                            .trim()
                            .toLowerCase();


                        return (
                            itemCategory ===
                            category
                                .trim()
                                .toLowerCase()
                        )
                        &&
                        (
                            !search ||
                            itemName.includes(
                                search
                            )
                        );

                    }
                );


            if (
                filtered.length ===
                0
            ) {

                const empty =
                    document.createElement(
                        "p"
                    );


                empty.textContent =
                    "Is category me koi Taweez nahi mila.";


                empty.style.color =
                    "#ffffff";


                gallery.appendChild(
                    empty
                );


                return;
            }


            filtered.forEach(
                function(item) {

                    const card =
                        document.createElement(
                            "div"
                        );


                    card.style.background =
                        "#ffffff";


                    card.style.borderRadius =
                        "12px";


                    card.style.padding =
                        "10px";


                    card.style.boxSizing =
                        "border-box";


                    card.style.textAlign =
                        "center";


                    const name =
                        document.createElement(
                            "div"
                        );


                    name.textContent =
                        safeText(
                            item.Taweez_Name
                        );


                    name.style.fontWeight =
                        "bold";


                    name.style.color =
                        "#111111";


                    name.style.marginBottom =
                        "8px";


                    card.appendChild(
                        name
                    );


                    const imageUrl =
    getTaweezImageUrl(
        (
            item.Category
                ? item.Category + "/"
                : ""
        ) +
        (item.File_Url || "")
    );


                    if (imageUrl) {

                        const image =
                            document.createElement(
                                "img"
                            );


                        image.src =
                            imageUrl;


                        image.alt =
                            safeText(
                                item.Taweez_Name
                            );


                        image.style.width =
                            "100%";


                        image.style.height =
                            "180px";


                        image.style.objectFit =
                            "contain";


                        image.style.background =
                            "#f5f5f5";


                        image.style.borderRadius =
                            "8px";


                        image.style.cursor =
                            "pointer";


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
                                    "#c0392b";


                                card.appendChild(
                                    errorText
                                );

                            };


                        image.onclick =
                            function() {

                                openFullImage(
                                    imageUrl
                                );

                            };


                        card.appendChild(
                            image
                        );

                    } else {

                        const noImage =
                            document.createElement(
                                "p"
                            );


                        noImage.textContent =
                            "Image Available Nahi Hai";


                        noImage.style.color =
                            "#777777";


                        card.appendChild(
                            noImage
                        );

                    }


                    const selectButton =
                        document.createElement(
                            "button"
                        );


                    selectButton.type =
                        "button";


                    selectButton.textContent =
                        "✅ Select This Taweez";


                    selectButton.style.marginTop =
                        "10px";


                    selectButton.style.width =
                        "100%";


                    selectButton.style.padding =
                        "11px";


                    selectButton.style.border =
                        "none";


                    selectButton.style.borderRadius =
                        "8px";


                    selectButton.style.background =
                        "#e5b935";


                    selectButton.style.color =
                        "#111111";


                    selectButton.style.fontWeight =
                        "bold";


                    selectButton.style.cursor =
                        "pointer";


                    selectButton.onclick =
                        function() {

                            const nameInput =
                                document.getElementById(
                                    "Taweez_Name"
                                );


                            if (nameInput) {

                                nameInput.value =
                                    safeText(
                                        item.Taweez_Name
                                    );

                            }


                            selectedTaweezImageUrl =
                                imageUrl ||
                                null;


                            const selectedBox =
                                document.getElementById(
                                    "selectedTaweez"
                                );


                            if (selectedBox) {

                                selectedBox.innerHTML =
                                    "<p>" +
                                    "✅ <b>Selected:</b> " +
                                    escapeHtml(
                                        item.Taweez_Name
                                    ) +
                                    "<br>" +
                                    "📁 <b>Category:</b> " +
                                    escapeHtml(
                                        item.Category
                                    ) +
                                    "</p>";

                            }


                            overlay.remove();

                        };


                    card.appendChild(
                        selectButton
                    );


                    gallery.appendChild(
                        card
                    );

                }
            );

        }


        renderTaweez("");


        taweezSearch.addEventListener(
            "input",
            function() {

                renderTaweez(
                    taweezSearch.value
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
// MUREED.JS - PART 4 / 4
// SAVE TREATMENT + BUTTON INITIALIZATION
// ======================================================

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


    const taweezName =
        document.getElementById(
            "Taweez_Name"
        )?.value.trim() || "";


    const taweezNotes =
        document.getElementById(
            "Taweez_Notes"
        )?.value.trim() || "";


    const herbalRemedy =
        document.getElementById(
            "Herbal_Remedy"
        )?.value.trim() || "";


    const herbalNotes =
        document.getElementById(
            "Herbal_Notes"
        )?.value.trim() || "";


    const wazifa =
        document.getElementById(
            "Wazifa"
        )?.value.trim() || "";


    const wazifaNotes =
        document.getElementById(
            "Wazifa_Notes"
        )?.value.trim() || "";


    const additionalNotes =
        document.getElementById(
            "Additional_Notes"
        )?.value.trim() || "";


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

                Taweez_Name:
                    taweezName || null,

                Taweez_Notes:
                    taweezNotes || null,

                Taweez_Image_Url:
                    selectedTaweezImageUrl,

                Herbal_Remedy:
                    herbalRemedy || null,

                Herbal_Notes:
                    herbalNotes || null,

                Wazifa:
                    wazifa || null,

                Wazifa_Notes:
                    wazifaNotes || null,

                Additional_Notes:
                    additionalNotes || null

            }])

            .select()

            .single();


    if (error) {

        console.error(
            "Save Treatment Error:",
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


    // CLEAR FORM
    [
        "Taweez_Name",
        "Taweez_Notes",
        "Herbal_Remedy",
        "Herbal_Notes",
        "Wazifa",
        "Wazifa_Notes",
        "Additional_Notes"
    ].forEach(
        function(id) {

            const element =
                document.getElementById(id);

            if (element) {

                element.value = "";

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

        selectedBox.innerHTML = "";

    }


    closeTreatmentForm();


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
                openTreatmentForm
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
