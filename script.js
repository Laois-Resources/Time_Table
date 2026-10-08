/* =========================================
   WEEKLY TIMETABLE
   LocalStorage + Repeat System
========================================= */


/* =========================================
   STORAGE
========================================= */

const STORAGE_KEY = "weeklyTimetableEvents";
const SETTINGS_KEY = "weeklyTimetableSettings";


/* =========================================
   TRANSLATIONS
========================================= */

const translations = {

    en: {

        title: "Weekly Timetable",
        subtitle: "Your simple weekly schedule",

        addEvent: "Add Event",

        previous: "Previous",
        today: "Today",
        next: "Next",

        time: "Time",

        addEventTitle: "Add Event",
        editEventTitle: "Edit Event",

        eventClass: "Event / Class",
        day: "Day",

        start: "Start",
        end: "End",

        location: "Location",

        repeat: "Repeat",

        everyWeek: "Every week",
        onceOnly: "Once only",

        colour: "Colour",
        notes: "Notes",

        notesPlaceholder: "Optional notes...",

        save: "Save",
        cancel: "Cancel",
        delete: "Delete",

        tableHint:
            "Click an empty time slot to add an event.",

        weekly:
            "Weekly",

        conflict:
            "This time overlaps with another event.",

        invalidTime:
            "End time must be after start time.",

        deleted:
            "Event deleted.",

        saved:
            "Event saved.",

        confirmDelete:
            "Are you sure you want to delete this event?",

        noEvents:
            "No events",

        repeatBadge:
            "Every week"

    },


    ar: {

        title: "الجدول الأسبوعي",

        subtitle:
            "جدولك الأسبوعي البسيط",

        addEvent:
            "إضافة حدث",

        previous:
            "السابق",

        today:
            "اليوم",

        next:
            "التالي",

        time:
            "الوقت",

        addEventTitle:
            "إضافة حدث",

        editEventTitle:
            "تعديل الحدث",

        eventClass:
            "الحدث / المادة",

        day:
            "اليوم",

        start:
            "البداية",

        end:
            "النهاية",

        location:
            "الموقع",

        repeat:
            "التكرار",

        everyWeek:
            "كل أسبوع",

        onceOnly:
            "مرة واحدة",

        colour:
            "اللون",

        notes:
            "ملاحظات",

        notesPlaceholder:
            "ملاحظات اختيارية...",

        save:
            "حفظ",

        cancel:
            "إلغاء",

        delete:
            "حذف",

        tableHint:
            "اضغط على خانة زمنية فارغة لإضافة حدث.",

        weekly:
            "أسبوعي",

        conflict:
            "هذا الوقت يتداخل مع حدث آخر.",

        invalidTime:
            "يجب أن يكون وقت النهاية بعد وقت البداية.",

        deleted:
            "تم حذف الحدث.",

        saved:
            "تم حفظ الحدث.",

        confirmDelete:
            "هل أنت متأكد أنك تريد حذف هذا الحدث؟",

        noEvents:
            "لا توجد أحداث",

        repeatBadge:
            "كل أسبوع"

    }

};


/* =========================================
   DAYS
========================================= */

const days = {

    en: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ],

    ar: [
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
        "الأحد"
    ]

};


/* =========================================
   APP STATE
========================================= */

let events = [];

let currentLanguage = "en";

let darkMode = false;

let weekOffset = 0;


/* =========================================
   DOM
========================================= */

const scheduleBody =
    document.getElementById("scheduleBody");

const eventModal =
    document.getElementById("eventModal");

const eventForm =
    document.getElementById("eventForm");

const eventId =
    document.getElementById("eventId");

const eventTitle =
    document.getElementById("eventTitle");

const eventDay =
    document.getElementById("eventDay");

const eventStart =
    document.getElementById("eventStart");

const eventEnd =
    document.getElementById("eventEnd");

const eventLocation =
    document.getElementById("eventLocation");

const eventRepeat =
    document.getElementById("eventRepeat");

const eventColor =
    document.getElementById("eventColor");

const eventNotes =
    document.getElementById("eventNotes");

const deleteEventBtn =
    document.getElementById("deleteEventBtn");

const modalTitle =
    document.getElementById("modalTitle");

const weekLabel =
    document.getElementById("weekLabel");

const toast =
    document.getElementById("toast");


/* =========================================
   LOAD DATA
========================================= */

function loadData() {

    try {

        const storedEvents =
            localStorage.getItem(STORAGE_KEY);

        if (storedEvents) {

            events = JSON.parse(storedEvents);

        } else {

            events = [];

        }

    } catch (error) {

        console.error(
            "Could not load events:",
            error
        );

        events = [];
    }


    try {

        const storedSettings =
            localStorage.getItem(SETTINGS_KEY);

        if (storedSettings) {

            const settings =
                JSON.parse(storedSettings);

            currentLanguage =
                settings.language || "en";

            darkMode =
                settings.darkMode || false;
        }

    } catch (error) {

        console.error(
            "Could not load settings:",
            error
        );
    }


    applySettings();
}


/* =========================================
   SAVE EVENTS
========================================= */

function saveEvents() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(events)
    );
}


/* =========================================
   SAVE SETTINGS
========================================= */

function saveSettings() {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({

            language: currentLanguage,

            darkMode: darkMode

        })
    );
}


/* =========================================
   SETTINGS
========================================= */

function applySettings() {

    const t =
        translations[currentLanguage];


    document.documentElement.lang =
        currentLanguage;


    document.body.classList.toggle(
        "rtl",
        currentLanguage === "ar"
    );


    document.body.classList.toggle(
        "dark",
        darkMode
    );


    document.getElementById("appTitle").textContent =
        t.title;

    document.getElementById("appSubtitle").textContent =
        t.subtitle;

    document.getElementById("addEventText").textContent =
        t.addEvent;

    document.getElementById("previousText").textContent =
        t.previous;

    document.getElementById("todayText").textContent =
        t.today;

    document.getElementById("nextText").textContent =
        t.next;

    document.getElementById("timeHeader").textContent =
        t.time;

    document.getElementById("tableHint").textContent =
        t.tableHint;

    document.getElementById("titleLabel").textContent =
        t.eventClass;

    document.getElementById("dayLabel").textContent =
        t.day;

    document.getElementById("startLabel").textContent =
        t.start;

    document.getElementById("endLabel").textContent =
        t.end;

    document.getElementById("locationLabel").textContent =
        t.location;

    document.getElementById("repeatLabel").textContent =
        t.repeat;

    document.getElementById("colorLabel").textContent =
        t.colour;

    document.getElementById("notesLabel").textContent =
        t.notes;

    document.getElementById("saveText").textContent =
        t.save;

    document.getElementById("cancelBtn").textContent =
        t.cancel;

    document.getElementById("deleteEventBtn").textContent =
        t.delete;


    document.getElementById("languageBtn").textContent =
        currentLanguage === "en"
            ? "العربية"
            : "English";


    document.getElementById("themeBtn").textContent =
        darkMode
            ? "☀️"
            : "🌙";


    eventTitle.placeholder =
        currentLanguage === "en"
            ? "e.g. Web Development"
            : "مثال: تطوير الويب";


    eventLocation.placeholder =
        currentLanguage === "en"
            ? "e.g. Room 204"
            : "مثال: الغرفة 204";


    eventNotes.placeholder =
        t.notesPlaceholder;


    updateDayOptions();

    updateRepeatOptions();

    updateWeekLabel();

    renderSchedule();
}


/* =========================================
   DAY OPTIONS
========================================= */

function updateDayOptions() {

    const currentValue =
        eventDay.value;

    eventDay.innerHTML = "";


    days[currentLanguage].forEach(
        (day, index) => {

            const option =
                document.createElement("option");

            option.value = index;

            option.textContent = day;

            eventDay.appendChild(option);
        }
    );


    if (currentValue !== "") {

        eventDay.value =
            currentValue;
    }
}


/* =========================================
   REPEAT OPTIONS
========================================= */

function updateRepeatOptions() {

    const currentValue =
        eventRepeat.value || "weekly";

    eventRepeat.innerHTML = "";


    const weeklyOption =
        document.createElement("option");

    weeklyOption.value =
        "weekly";

    weeklyOption.textContent =
        translations[currentLanguage].everyWeek;


    const onceOption =
        document.createElement("option");

    onceOption.value =
        "once";

    onceOption.textContent =
        translations[currentLanguage].onceOnly;


    eventRepeat.appendChild(
        weeklyOption
    );

    eventRepeat.appendChild(
        onceOption
    );


    eventRepeat.value =
        currentValue;
}


/* =========================================
   WEEK FUNCTIONS
========================================= */

function getMonday(date) {

    const d =
        new Date(date);

    const day =
        d.getDay();

    const difference =
        day === 0
            ? -6
            : 1 - day;

    d.setDate(
        d.getDate() + difference
    );

    d.setHours(0, 0, 0, 0);

    return d;
}


function getDisplayedWeekStart() {

    const today =
        new Date();

    const monday =
        getMonday(today);

    monday.setDate(
        monday.getDate() +
        (weekOffset * 7)
    );

    return monday;
}


function formatDate(date) {

    return date.toLocaleDateString(
        currentLanguage === "ar"
            ? "ar-IQ"
            : "en-IE",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


function updateWeekLabel() {

    const start =
        getDisplayedWeekStart();

    const end =
        new Date(start);

    end.setDate(
        end.getDate() + 6
    );


    if (weekOffset === 0) {

        weekLabel.textContent =
            currentLanguage === "en"
                ? "This Week"
                : "هذا الأسبوع";

        return;
    }


    weekLabel.textContent =
        `${formatDate(start)} - ${formatDate(end)}`;
}


/* =========================================
   TIME
========================================= */

function timeToMinutes(time) {

    const [hours, minutes] =
        time.split(":").map(Number);

    return (
        hours * 60 +
        minutes
    );
}


function formatTime(time) {

    const [hours, minutes] =
        time.split(":").map(Number);


    const date =
        new Date();

    date.setHours(
        hours,
        minutes,
        0,
        0
    );


    return date.toLocaleTimeString(
        currentLanguage === "ar"
            ? "ar-IQ"
            : "en-IE",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }
    );
}


/* =========================================
   TIME SLOTS
========================================= */

function createTimeSlots() {

    const slots = [];


    /*
       06:00 -> 22:00
       One row per hour.
    */

    for (
        let hour = 6;
        hour <= 22;
        hour++
    ) {

        const time =
            `${String(hour).padStart(2, "0")}:00`;

        slots.push(time);
    }


    return slots;
}


/* =========================================
   EVENT VISIBILITY
========================================= */

function eventBelongsToCurrentWeek(
    event
) {

    /*
       WEEKLY EVENT:
       Appears every week on its dayIndex.

       ONCE EVENT:
       Appears only during the week
       where it was originally created.
    */


    if (event.repeat === "weekly") {

        return true;
    }


    if (!event.date) {

        return false;
    }


    const eventDate =
        new Date(
            event.date + "T00:00:00"
        );


    const weekStart =
        getDisplayedWeekStart();


    const weekEnd =
        new Date(weekStart);

    weekEnd.setDate(
        weekEnd.getDate() + 6
    );


    return (
        eventDate >= weekStart &&
        eventDate <= weekEnd
    );
}


/* =========================================
   EVENT DATE
========================================= */

function getDateString(date) {

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


/* =========================================
   GET VISIBLE EVENTS
========================================= */

function getVisibleEvents() {

    return events.filter(
        event =>
            eventBelongsToCurrentWeek(
                event
            )
    );
}


/* =========================================
   RENDER TABLE
========================================= */

function renderSchedule() {

    scheduleBody.innerHTML = "";


    const timeSlots =
        createTimeSlots();


    const visibleEvents =
        getVisibleEvents();


    timeSlots.forEach(
        time => {

            const row =
                document.createElement("tr");


            /* TIME CELL */

            const timeCell =
                document.createElement("td");

            timeCell.className =
                "time-cell";

            timeCell.textContent =
                formatTime(time);

            row.appendChild(
                timeCell
            );


            /* DAY CELLS */

            for (
                let dayIndex = 0;
                dayIndex < 7;
                dayIndex++
            ) {

                const cell =
                    document.createElement("td");

                cell.className =
                    "schedule-cell";

                cell.dataset.day =
                    dayIndex;

                cell.dataset.time =
                    time;


                cell.addEventListener(
                    "click",
                    () => {

                        openAddModal(
                            dayIndex,
                            time
                        );
                    }
                );


                /*
                   Find event beginning at
                   this exact hour.
                */

                const cellEvents =
                    visibleEvents.filter(
                        event =>

                            Number(
                                event.dayIndex
                            ) === dayIndex &&

                            event.start === time
                    );


                cellEvents.forEach(
                    event => {

                        const eventElement =
                            createEventElement(
                                event
                            );

                        cell.appendChild(
                            eventElement
                        );
                    }
                );


                row.appendChild(
                    cell
                );
            }


            scheduleBody.appendChild(
                row
            );
        }
    );


    updateDayHeaderDates();
}


/* =========================================
   EVENT ELEMENT
========================================= */

function createEventElement(
    event
) {

    const element =
        document.createElement("div");

    element.className =
        "event";


    element.style.background =
        event.color || "#4f46e5";


    const title =
        document.createElement("div");

    title.className =
        "event-title";

    title.textContent =
        event.title;


    const time =
        document.createElement("div");

    time.className =
        "event-time";

    time.textContent =
        `${formatTime(event.start)} - ${formatTime(event.end)}`;


    element.appendChild(
        title
    );

    element.appendChild(
        time
    );


    if (event.location) {

        const location =
            document.createElement("div");

        location.className =
            "event-location";

        location.textContent =
            `📍 ${event.location}`;

        element.appendChild(
            location
        );
    }


    if (event.repeat === "weekly") {

        const repeat =
            document.createElement("div");

        repeat.className =
            "event-repeat";

        repeat.textContent =
            `↻ ${
                translations[
                    currentLanguage
                ].repeatBadge
            }`;

        element.appendChild(
            repeat
        );
    }


    element.addEventListener(
        "click",
        eventObject => {

            eventObject.stopPropagation();

            openEditModal(
                event.id
            );
        }
    );


    return element;
}


/* =========================================
   DAY HEADER DATES
========================================= */

function updateDayHeaderDates() {

    const start =
        getDisplayedWeekStart();


    document
        .querySelectorAll(".day-name")
        .forEach(
            (element, index) => {

                const date =
                    new Date(start);

                date.setDate(
                    date.getDate() + index
                );


                const dayName =
                    days[
                        currentLanguage
                    ][index];


                element.textContent =
                    `${dayName} ${date.getDate()}/${date.getMonth() + 1}`;
            }
        );
}


/* =========================================
   OPEN ADD MODAL
========================================= */

function openAddModal(
    dayIndex = 0,
    startTime = "09:00"
) {

    eventForm.reset();


    eventId.value = "";

    eventDay.value =
        dayIndex;

    eventStart.value =
        startTime;


    const hour =
        Number(
            startTime.split(":")[0]
        );


    const endHour =
        Math.min(
            hour + 1,
            23
        );


    eventEnd.value =
        `${String(endHour).padStart(2, "0")}:00`;


    eventRepeat.value =
        "weekly";


    eventColor.value =
        "#4f46e5";


    modalTitle.textContent =
        translations[
            currentLanguage
        ].addEventTitle;


    deleteEventBtn.classList.add(
        "hidden"
    );


    eventModal.classList.remove(
        "hidden"
    );


    setTimeout(
        () => eventTitle.focus(),
        100
    );
}


/* =========================================
   OPEN EDIT MODAL
========================================= */

function openEditModal(
    id
) {

    const event =
        events.find(
            item =>
                item.id === id
        );


    if (!event) {

        return;
    }


    eventId.value =
        event.id;

    eventTitle.value =
        event.title;

    eventDay.value =
        event.dayIndex;

    eventStart.value =
        event.start;

    eventEnd.value =
        event.end;

    eventLocation.value =
        event.location || "";

    eventRepeat.value =
        event.repeat || "weekly";

    eventColor.value =
        event.color || "#4f46e5";

    eventNotes.value =
        event.notes || "";


    modalTitle.textContent =
        translations[
            currentLanguage
        ].editEventTitle;


    deleteEventBtn.classList.remove(
        "hidden"
    );


    eventModal.classList.remove(
        "hidden"
    );
}


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    eventModal.classList.add(
        "hidden"
    );
}


/* =========================================
   CONFLICT CHECK
========================================= */

function hasConflict(
    newEvent,
    ignoreId = null
) {

    const newStart =
        timeToMinutes(
            newEvent.start
        );

    const newEnd =
        timeToMinutes(
            newEvent.end
        );


    return events.some(
        event => {

            if (
                event.id === ignoreId
            ) {

                return false;
            }


            if (
                Number(
                    event.dayIndex
                ) !==
                Number(
                    newEvent.dayIndex
                )
            ) {

                return false;
            }


            /*
               For weekly schedules,
               compare with weekly events.

               Once-only events are also
               compared when on the same
               week/day.
            */

            if (
                newEvent.repeat === "once" &&
                event.repeat === "once"
            ) {

                if (
                    event.date !==
                    newEvent.date
                ) {

                    return false;
                }
            }


            const existingStart =
                timeToMinutes(
                    event.start
                );

            const existingEnd =
                timeToMinutes(
                    event.end
                );


            return (
                newStart < existingEnd &&
                newEnd > existingStart
            );
        }
    );
}


/* =========================================
   SAVE FORM
========================================= */

eventForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();


        const start =
            eventStart.value;

        const end =
            eventEnd.value;


        if (
            timeToMinutes(end) <=
            timeToMinutes(start)
        ) {

            showToast(
                translations[
                    currentLanguage
                ].invalidTime
            );

            return;
        }


        const id =
            eventId.value ||
            generateId();


        /*
           For weekly events:

           dayIndex is the permanent
           weekday.

           There is NO specific date.

           Therefore the event repeats
           forever until deleted.
        */


        let date = null;


        /*
           Once-only events are attached
           to the currently displayed week.
        */

        if (
            eventRepeat.value ===
            "once"
        ) {

            const weekStart =
                getDisplayedWeekStart();


            const selectedDate =
                new Date(weekStart);

            selectedDate.setDate(
                selectedDate.getDate() +
                Number(eventDay.value)
            );


            date =
                getDateString(
                    selectedDate
                );
        }


        const newEvent = {

            id,

            title:
                eventTitle.value.trim(),

            dayIndex:
                Number(
                    eventDay.value
                ),

            start,

            end,

            location:
                eventLocation.value.trim(),

            repeat:
                eventRepeat.value,

            color:
                eventColor.value,

            notes:
                eventNotes.value.trim(),

            date

        };


        if (
            hasConflict(
                newEvent,
                eventId.value || null
            )
        ) {

            showToast(
                translations[
                    currentLanguage
                ].conflict
            );

            return;
        }


        const existingIndex =
            events.findIndex(
                event =>
                    event.id === id
            );


        if (
            existingIndex !== -1
        ) {

            events[
                existingIndex
            ] = newEvent;

        } else {

            events.push(
                newEvent
            );
        }


        saveEvents();

        renderSchedule();

        closeModal();


        showToast(
            translations[
                currentLanguage
            ].saved
        );
    }
);


/* =========================================
   DELETE EVENT
========================================= */

deleteEventBtn.addEventListener(
    "click",
    () => {

        const id =
            eventId.value;


        if (!id) {

            return;
        }


        const confirmed =
            confirm(
                translations[
                    currentLanguage
                ].confirmDelete
            );


        if (!confirmed) {

            return;
        }


        events =
            events.filter(
                event =>
                    event.id !== id
            );


        saveEvents();

        renderSchedule();

        closeModal();


        showToast(
            translations[
                currentLanguage
            ].deleted
        );
    }
);


/* =========================================
   ADD EVENT BUTTON
========================================= */

document
    .getElementById("addEventBtn")
    .addEventListener(
        "click",
        () => {

            openAddModal();
        }
    );


/* =========================================
   CLOSE BUTTON
========================================= */

document
    .getElementById("closeModalBtn")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("cancelBtn")
    .addEventListener(
        "click",
        closeModal
    );


/* =========================================
   CLICK OUTSIDE MODAL
========================================= */

eventModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            eventModal
        ) {

            closeModal();
        }
    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();
        }
    }
);


/* =========================================
   LANGUAGE
========================================= */

document
    .getElementById("languageBtn")
    .addEventListener(
        "click",
        () => {

            currentLanguage =
                currentLanguage === "en"
                    ? "ar"
                    : "en";


            saveSettings();

            applySettings();
        }
    );


/* =========================================
   THEME
========================================= */

document
    .getElementById("themeBtn")
    .addEventListener(
        "click",
        () => {

            darkMode =
                !darkMode;


            saveSettings();

            applySettings();
        }
    );


/* =========================================
   WEEK NAVIGATION
========================================= */

document
    .getElementById("previousWeekBtn")
    .addEventListener(
        "click",
        () => {

            weekOffset--;

            updateWeekLabel();

            renderSchedule();
        }
    );


document
    .getElementById("nextWeekBtn")
    .addEventListener(
        "click",
        () => {

            weekOffset++;

            updateWeekLabel();

            renderSchedule();
        }
    );


document
    .getElementById("todayBtn")
    .addEventListener(
        "click",
        () => {

            weekOffset = 0;

            updateWeekLabel();

            renderSchedule();
        }
    );


/* =========================================
   ID GENERATOR
========================================= */

function generateId() {

    if (
        window.crypto &&
        crypto.randomUUID
    ) {

        return crypto.randomUUID();
    }


    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2)
    );
}


/* =========================================
   TOAST
========================================= */

let toastTimer = null;


function showToast(
    message
) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );
}


/* =========================================
   START APP
========================================= */

loadData();