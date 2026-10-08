/*
    SIMPLE WEEKLY TIMETABLE

    Features:

    ✓ Monday → Sunday
    ✓ Time × Day table
    ✓ English / Arabic
    ✓ RTL Arabic
    ✓ LocalStorage
    ✓ Add event
    ✓ Edit event
    ✓ Delete event
    ✓ Location
    ✓ Notes
    ✓ Event colors
    ✓ Week navigation
    ✓ Dark mode
    ✓ Mobile responsive

    No backend.
    No database.
    No import/export.
*/


/* =========================
   STORAGE
========================= */

const STORAGE_KEY =
    "simple_weekly_schedule";


const SETTINGS_KEY =
    "simple_weekly_schedule_settings";


/* =========================
   TRANSLATIONS
========================= */

const translations = {

    en: {

        title:
            "Weekly Schedule",

        subtitle:
            "Your weekly timetable",

        addEvent:
            "Add Event",

        previous:
            "Previous",

        next:
            "Next",

        today:
            "Today",

        eventHint:
            "Add your schedule details.",

        eventName:
            "Event / Subject",

        day:
            "Day",

        start:
            "Start",

        end:
            "End",

        location:
            "Location",

        notes:
            "Notes",

        color:
            "Color",

        delete:
            "Delete",

        cancel:
            "Cancel",

        save:
            "Save",

        newEvent:
            "New Event",

        editEvent:
            "Edit Event",

        emptyTitle:
            "Your schedule is empty",

        emptyText:
            "Click a time slot or Add Event to begin.",

        saved:
            "Event saved",

        deleted:
            "Event deleted",

        invalidTime:
            "End time must be after start time.",

        conflict:
            "This time overlaps another event.",

        days: [

            "Monday",

            "Tuesday",

            "Wednesday",

            "Thursday",

            "Friday",

            "Saturday",

            "Sunday"

        ],

        shortDays: [

            "Mon",

            "Tue",

            "Wed",

            "Thu",

            "Fri",

            "Sat",

            "Sun"

        ]

    },


    ar: {

        title:
            "الجدول الأسبوعي",

        subtitle:
            "جدولك الأسبوعي",

        addEvent:
            "إضافة موعد",

        previous:
            "السابق",

        next:
            "التالي",

        today:
            "اليوم",

        eventHint:
            "أضف تفاصيل جدولك.",

        eventName:
            "المادة / الموعد",

        day:
            "اليوم",

        start:
            "البداية",

        end:
            "النهاية",

        location:
            "المكان",

        notes:
            "ملاحظات",

        color:
            "اللون",

        delete:
            "حذف",

        cancel:
            "إلغاء",

        save:
            "حفظ",

        newEvent:
            "موعد جديد",

        editEvent:
            "تعديل الموعد",

        emptyTitle:
            "جدولك فارغ",

        emptyText:
            "اضغط على أي وقت لإضافة موعد.",

        saved:
            "تم حفظ الموعد",

        deleted:
            "تم حذف الموعد",

        invalidTime:
            "يجب أن يكون وقت النهاية بعد وقت البداية.",

        conflict:
            "هذا الوقت يتداخل مع موعد آخر.",

        days: [

            "الاثنين",

            "الثلاثاء",

            "الأربعاء",

            "الخميس",

            "الجمعة",

            "السبت",

            "الأحد"

        ],

        shortDays: [

            "الإثنين",

            "الثلاثاء",

            "الأربعاء",

            "الخميس",

            "الجمعة",

            "السبت",

            "الأحد"

        ]

    }

};


/* =========================
   COLORS
========================= */

const COLORS = [

    "#2563eb",

    "#7c3aed",

    "#db2777",

    "#ea580c",

    "#16a34a",

    "#0891b2",

    "#475569"

];


/* =========================
   STATE
========================= */

let events =
    JSON.parse(
        localStorage.getItem(
            STORAGE_KEY
        ) || "[]"
    );


let settings =
    JSON.parse(
        localStorage.getItem(
            SETTINGS_KEY
        )
        ||
        '{"language":"en","theme":"light"}'
    );


let weekOffset = 0;


let selectedColor =
    COLORS[0];


/* =========================
   SHORTCUT
========================= */

function $(id) {

    return document.getElementById(id);

}


function t(key) {

    return translations[
        settings.language
    ][key];

}


/* =========================
   SAVE DATA
========================= */

function saveEvents() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(events)

    );

}


function saveSettings() {

    localStorage.setItem(

        SETTINGS_KEY,

        JSON.stringify(settings)

    );

}


/* =========================
   DATE HELPERS
========================= */

function getMonday(date) {

    const result =
        new Date(date);


    result.setHours(
        0,
        0,
        0,
        0
    );


    let day =
        result.getDay();


    if (day === 0) {

        day = 7;

    }


    result.setDate(
        result.getDate()
        -
        day
        +
        1
    );


    return result;

}


function getWeekStart() {

    const monday =
        getMonday(
            new Date()
        );


    monday.setDate(

        monday.getDate()
        +
        weekOffset * 7

    );


    return monday;

}


function dateKey(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


function formatDate(date) {

    return new Intl.DateTimeFormat(

        settings.language === "ar"
            ? "ar-IQ"
            : "en-GB",

        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }

    ).format(date);

}


/* =========================
   TIME HELPERS
========================= */

function timeToMinutes(time) {

    const parts =
        time.split(":");


    return (

        Number(parts[0]) * 60

        +

        Number(parts[1])

    );

}


/* =========================
   GET WEEK
========================= */

function getWeekDays() {

    const start =
        getWeekStart();


    const days = [];


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const day =
            new Date(start);


        day.setDate(
            day.getDate() + i
        );


        days.push(day);

    }


    return days;

}


/* =========================
   LANGUAGE
========================= */

function applyLanguage() {

    document.documentElement.lang =
        settings.language;


    document.documentElement.dir =
        settings.language === "ar"
            ? "rtl"
            : "ltr";


    $("appTitle").textContent =
        t("title");


    $("appSubtitle").textContent =
        t("subtitle");


    $("languageBtn").textContent =
        settings.language === "en"
            ? "العربية"
            : "English";


    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(element => {

            const key =
                element.dataset.i18n;


            if (
                t(key)
            ) {

                element.textContent =
                    t(key);

            }

        });


    renderDaySelect();

    render();

}


/* =========================
   DAY SELECT
========================= */

function renderDaySelect() {

    const select =
        $("dayInput");


    select.innerHTML =
        "";


    t("days").forEach(
        (day, index) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                index;


            option.textContent =
                day;


            select.appendChild(
                option
            );

        }
    );

}


/* =========================
   COLORS
========================= */

function renderColors() {

    const container =
        $("colorRow");


    container.innerHTML =
        "";


    COLORS.forEach(
        color => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "color-choice";


            button.style.background =
                color;


            if (
                color === selectedColor
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    selectedColor =
                        color;


                    renderColors();

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


/* =========================
   EVENTS FOR DAY
========================= */

function eventsForDate(date) {

    const key =
        dateKey(date);


    return events
        .filter(
            event =>
                event.date === key
        )
        .sort(
            (a, b) =>
                a.start.localeCompare(
                    b.start
                )
        );

}


/* =========================
   RENDER
========================= */

function render() {

    const days =
        getWeekDays();


    $("weekLabel").textContent =
        `${formatDate(days[0])} – ${formatDate(days[6])}`;


    renderTable(days);


    $("emptyState").style.display =
        events.length
            ? "none"
            : "block";


    $("scheduleContainer").style.display =
        events.length
            ? "block"
            : "none";

}


/* =========================
   TABLE
========================= */

function renderTable(days) {

    const table =
        document.createElement(
            "table"
        );


    table.className =
        "schedule-table";


    /* =====================
       HEADER
    ===================== */

    const thead =
        document.createElement(
            "thead"
        );


    const headerRow =
        document.createElement(
            "tr"
        );


    const emptyHeader =
        document.createElement(
            "th"
        );


    emptyHeader.textContent =
        "Time";


    headerRow.appendChild(
        emptyHeader
    );


    days.forEach(
        (date, index) => {

            const th =
                document.createElement(
                    "th"
                );


            const isToday =
                dateKey(date)
                ===
                dateKey(
                    new Date()
                );


            if (isToday) {

                th.classList.add(
                    "today"
                );

            }


            th.innerHTML = `

                ${t("shortDays")[index]}

                <span class="day-number">

                    ${date.getDate()}

                </span>

            `;


            headerRow.appendChild(
                th
            );

        }
    );


    thead.appendChild(
        headerRow
    );


    table.appendChild(
        thead
    );


    /* =====================
       BODY
    ===================== */

    const tbody =
        document.createElement(
            "tbody"
        );


    /*
        Schedule starts at 06:00
        and ends at 23:00.
    */

    for (
        let hour = 6;
        hour < 23;
        hour++
    ) {

        const row =
            document.createElement(
                "tr"
            );


        /* TIME */

        const timeCell =
            document.createElement(
                "td"
            );


        timeCell.className =
            "time-cell";


        timeCell.textContent =
            `${String(hour).padStart(2, "0")}:00`;


        row.appendChild(
            timeCell
        );


        /* DAYS */

        days.forEach(
            (date, dayIndex) => {

                const cell =
                    document.createElement(
                        "td"
                    );


                cell.className =
                    "schedule-cell";


                /*
                    Find an event that
                    starts at this hour.
                */

                const dayEvents =
                    eventsForDate(date);


                const event =
                    dayEvents.find(
                        item =>
                            timeToMinutes(
                                item.start
                            ) ===
                            hour * 60
                    );


                if (event) {

                    const card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "event-card";


                    card.style.background =
                        event.color;


                    card.innerHTML = `

                        <span class="event-title">

                            ${escapeHTML(
                                event.title
                            )}

                        </span>


                        <span class="event-location">

                            ${
                                event.location
                                    ? "📍 "
                                      +
                                      escapeHTML(
                                          event.location
                                      )
                                    : ""
                            }

                        </span>


                        <span class="event-time">

                            ${event.start}
                            –
                            ${event.end}

                        </span>

                    `;


                    card.addEventListener(
                        "click",
                        e => {

                            e.stopPropagation();

                            openEditEvent(
                                event.id
                            );

                        }
                    );


                    cell.appendChild(
                        card
                    );

                } else {

                    /*
                        Clicking an empty cell
                        creates a new event.
                    */

                    cell.addEventListener(
                        "click",
                        () => {

                            openNewEvent(

                                dayIndex,

                                `${String(hour).padStart(2, "0")}:00`

                            );

                        }
                    );

                }


                row.appendChild(
                    cell
                );

            }
        );


        tbody.appendChild(
            row
        );

    }


    table.appendChild(
        tbody
    );


    $("scheduleContainer").innerHTML =
        "";


    $("scheduleContainer")
        .appendChild(table);

}


/* =========================
   NEW EVENT
========================= */

function openNewEvent(
    dayIndex = 0,
    start = "09:00"
) {

    $("eventForm").reset();


    $("eventId").value =
        "";


    $("modalTitle").textContent =
        t("newEvent");


    $("dayInput").value =
        dayIndex;


    $("startInput").value =
        start;


    const startMinutes =
        timeToMinutes(start);


    const endMinutes =
        Math.min(
            startMinutes + 60,
            23 * 60
        );


    $("endInput").value =