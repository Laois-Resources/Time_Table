/* =========================================
   WEEKLY PLANNER
   Table + LocalStorage (Daily Schedule)
========================================= */


/* =========================================
   STORAGE
========================================= */

const STORAGE_KEY =
    "weeklyPlannerTasks";

const SETTINGS_KEY =
    "weeklyPlannerSettings";


/* =========================================
   STATE
========================================= */

let tasks = [];

let currentLanguage = "en";

let darkMode = false;


/* =========================================
   TRANSLATIONS
========================================= */

const translations = {

    en: {

        title: "Weekly Planner",

        subtitle:
            "Organise what you need to do each week.",

        add: "Add",

        day: "Day",

        task: "What to do",

        time: "Time",

        location: "Location",

        notes: "Notes",

        actions: "Actions",

        noTasks:
            "No tasks added yet.",

        addTask:
            "Add Task",

        editTask:
            "Edit Task",

        taskQuestion:
            "What do you need to do?",

        startTime:
            "Start time",

        endTime:
            "End time",

        optional:
            "Optional notes...",

        save:
            "Save",

        cancel:
            "Cancel",

        delete:
            "Delete",

        edit:
            "Edit",

        confirmDelete:
            "Are you sure you want to delete this task?",

        saved:
            "Task saved.",

        deleted:
            "Task deleted.",

        invalidTime:
            "End time must be after start time.",

        conflict:
            "This task overlaps another task.",

        locationPlaceholder:
            "e.g. Room 204",

        taskPlaceholder:
            "e.g. Test, Meeting, Assignment..."

    },


    ar: {

        title:
            "المخطط الأسبوعي",

        subtitle:
            "نظّم الأشياء التي تحتاج إلى القيام بها كل أسبوع.",

        add:
            "إضافة",

        day:
            "اليوم",

        task:
            "ماذا تريد أن تفعل؟",

        time:
            "الوقت",

        location:
            "الموقع",

        notes:
            "ملاحظات",

        actions:
            "الإجراءات",

        noTasks:
            "لم تتم إضافة أي مهام بعد.",

        addTask:
            "إضافة مهمة",

        editTask:
            "تعديل المهمة",

        taskQuestion:
            "ماذا تريد أن تفعل؟",

        startTime:
            "وقت البداية",

        endTime:
            "وقت النهاية",

        optional:
            "ملاحظات اختيارية...",

        save:
            "حفظ",

        cancel:
            "إلغاء",

        delete:
            "حذف",

        edit:
            "تعديل",

        confirmDelete:
            "هل أنت متأكد أنك تريد حذف هذه المهمة؟",

        saved:
            "تم حفظ المهمة.",

        deleted:
            "تم حذف المهمة.",

        invalidTime:
            "يجب أن يكون وقت النهاية بعد وقت البداية.",

        conflict:
            "هذه المهمة تتداخل مع مهمة أخرى.",

        locationPlaceholder:
            "مثال: الغرفة 204",

        taskPlaceholder:
            "مثال: اختبار، اجتماع، واجب..."
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
   DOM
========================================= */

const tableBody =
    document.getElementById(
        "taskTableBody"
    );

const emptyMessage =
    document.getElementById(
        "emptyMessage"
    );

const modal =
    document.getElementById(
        "modal"
    );

const form =
    document.getElementById(
        "taskForm"
    );

const taskId =
    document.getElementById(
        "taskId"
    );

const taskDay =
    document.getElementById(
        "taskDay"
    );

const taskTitle =
    document.getElementById(
        "taskTitle"
    );

const taskStart =
    document.getElementById(
        "taskStart"
    );

const taskEnd =
    document.getElementById(
        "taskEnd"
    );

const taskLocation =
    document.getElementById(
        "taskLocation"
    );

const taskNotes =
    document.getElementById(
        "taskNotes"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const deleteBtn =
    document.getElementById(
        "deleteBtn"
    );

const toast =
    document.getElementById(
        "toast"
    );


/* =========================================
   GENERATE 15-MIN TIME OPTIONS
========================================= */

function populateTimeOptions() {

    taskStart.innerHTML = "";

    taskEnd.innerHTML = "";


    for (let hour = 0; hour < 24; hour++) {

        for (let min = 0; min < 60; min += 15) {

            const hh =
                String(hour).padStart(2, "0");

            const mm =
                String(min).padStart(2, "0");

            const timeValue =
                `${hh}:${mm}`;


            const startOption =
                document.createElement("option");

            startOption.value =
                timeValue;

            startOption.textContent =
                timeValue;


            const endOption =
                document.createElement("option");

            endOption.value =
                timeValue;

            endOption.textContent =
                timeValue;


            taskStart.appendChild(startOption);

            taskEnd.appendChild(endOption);
        }
    }
}


/* =========================================
   LOAD
========================================= */

function loadData() {

    populateTimeOptions();


    try {

        const savedTasks =
            localStorage.getItem(
                STORAGE_KEY
            );

        tasks =
            savedTasks
                ? JSON.parse(savedTasks)
                : [];

    } catch (error) {

        console.error(error);

        tasks = [];
    }


    try {

        const savedSettings =
            localStorage.getItem(
                SETTINGS_KEY
            );

        if (savedSettings) {

            const settings =
                JSON.parse(
                    savedSettings
                );

            currentLanguage =
                settings.language || "en";

            darkMode =
                settings.darkMode || false;
        }

    } catch (error) {

        console.error(error);
    }


    applySettings();
}


/* =========================================
   SAVE
========================================= */

function saveTasks() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
}


function saveSettings() {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({

            language:
                currentLanguage,

            darkMode:
                darkMode

        })
    );
}


/* =========================================
   SETTINGS
========================================= */

function applySettings() {

    const t =
        translations[
            currentLanguage
        ];


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


    document.getElementById(
        "appTitle"
    ).textContent =
        t.title;


    document.getElementById(
        "appSubtitle"
    ).textContent =
        t.subtitle;


    document.getElementById(
        "addBtn"
    ).textContent =
        "+ " + t.add;


    document.getElementById(
        "languageBtn"
    ).textContent =
        currentLanguage === "en"
            ? "العربية"
            : "English";


    document.getElementById(
        "themeBtn"
    ).textContent =
        darkMode
            ? "☀️"
            : "🌙";


    updateTableHeaders();

    updateFormText();

    renderTable();
}


/* =========================================
   TABLE HEADERS
========================================= */

function updateTableHeaders() {

    const headers =
        document.querySelectorAll(
            "thead th"
        );

    const t =
        translations[
            currentLanguage
        ];


    headers[0].textContent =
        t.day;

    headers[1].textContent =
        t.task;

    headers[2].textContent =
        t.time;

    headers[3].textContent =
        t.location;

    headers[4].textContent =
        t.notes;

    headers[5].textContent =
        t.actions;
}


/* =========================================
   FORM TEXT
========================================= */

function updateFormText() {

    const t =
        translations[
            currentLanguage
        ];


    document.querySelector(
        'label[for="taskDay"]'
    ).textContent =
        t.day;


    document.querySelector(
        'label[for="taskTitle"]'
    ).textContent =
        t.taskQuestion;


    document.querySelector(
        'label[for="taskStart"]'
    ).textContent =
        t.startTime;


    document.querySelector(
        'label[for="taskEnd"]'
    ).textContent =
        t.endTime;


    document.querySelector(
        'label[for="taskLocation"]'
    ).textContent =
        t.location;


    document.querySelector(
        'label[for="taskNotes"]'
    ).textContent =
        t.notes;


    taskTitle.placeholder =
        t.taskPlaceholder;


    taskLocation.placeholder =
        t.locationPlaceholder;


    taskNotes.placeholder =
        t.optional;


    document.getElementById(
        "cancelBtn"
    ).textContent =
        t.cancel;


    document.getElementById(
        "deleteBtn"
    ).textContent =
        t.delete;


    updateDayOptions();
}


/* =========================================
   FORM OPTIONS
========================================= */

function updateDayOptions() {

    const current =
        taskDay.value;

    taskDay.innerHTML = "";


    days[currentLanguage]
        .forEach(
            (day, index) => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    index;

                option.textContent =
                    day;

                taskDay.appendChild(
                    option
                );
            }
        );


    if (current !== "") {

        taskDay.value =
            current;
    }
}


/* =========================================
   SORT
========================================= */

function sortTasks(list) {

    return [...list].sort(
        (a, b) => {

            if (
                a.dayIndex !==
                b.dayIndex
            ) {

                return (
                    a.dayIndex -
                    b.dayIndex
                );
            }


            return (
                timeToMinutes(a.start) -
                timeToMinutes(b.start)
            );
        }
    );
}


/* =========================================
   RENDER TABLE
========================================= */

function renderTable() {

    tableBody.innerHTML = "";


    const sortedTasks =
        sortTasks(tasks);


    emptyMessage.classList.toggle(
        "hidden",
        sortedTasks.length > 0
    );


    sortedTasks.forEach(
        task => {

            const row =
                document.createElement(
                    "tr"
                );


            /* DAY */

            const dayCell =
                document.createElement(
                    "td"
                );

            dayCell.className =
                "day-cell";

            dayCell.textContent =
                days[
                    currentLanguage
                ][
                    task.dayIndex
                ];


            /* TASK */

            const taskCell =
                document.createElement(
                    "td"
                );

            taskCell.className =
                "task-name";

            taskCell.textContent =
                task.title;


            /* TIME */

            const timeCell =
                document.createElement(
                    "td"
                );

            timeCell.className =
                "time-cell";

            timeCell.textContent =
                `${formatTime(task.start)}
                 -
                 ${formatTime(task.end)}`;


            /* LOCATION */

            const locationCell =
                document.createElement(
                    "td"
                );

            locationCell.className =
                "location-cell";

            locationCell.textContent =
                task.location ||
                "—";


            /* NOTES */

            const notesCell =
                document.createElement(
                    "td"
                );

            notesCell.className =
                "notes-cell";

            notesCell.textContent =
                task.notes ||
                "—";


            /* ACTIONS */

            const actionsCell =
                document.createElement(
                    "td"
                );

            const actions =
                document.createElement(
                    "div"
                );

            actions.className =
                "actions";


            const editButton =
                document.createElement(
                    "button"
                );

            editButton.className =
                "action-btn";

            editButton.textContent =
                translations[
                    currentLanguage
                ].edit;


            editButton.addEventListener(
                "click",
                () => {

                    openEditModal(
                        task.id
                    );
                }
            );


            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.className =
                "action-btn action-delete";

            deleteButton.textContent =
                translations[
                    currentLanguage
                ].delete;


            deleteButton.addEventListener(
                "click",
                () => {

                    deleteTask(
                        task.id
                    );
                }
            );


            actions.appendChild(
                editButton
            );

            actions.appendChild(
                deleteButton
            );

            actionsCell.appendChild(
                actions
            );


            /* ADD CELLS */

            row.appendChild(
                dayCell
            );

            row.appendChild(
                taskCell
            );

            row.appendChild(
                timeCell
            );

            row.appendChild(
                locationCell
            );

            row.appendChild(
                notesCell
            );

            row.appendChild(
                actionsCell
            );


            tableBody.appendChild(
                row
            );
        }
    );
}


/* =========================================
   TIME
========================================= */

function timeToMinutes(time) {

    const parts =
        time.split(":");


    return (
        Number(parts[0]) * 60 +
        Number(parts[1])
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
   OPEN ADD
========================================= */

function openAddModal() {

    form.reset();


    taskId.value = "";

    taskDay.value = "0";

    taskStart.value = "09:00";

    taskEnd.value = "09:15";


    modalTitle.textContent =
        translations[
            currentLanguage
        ].addTask;


    deleteBtn.classList.add(
        "hidden"
    );


    modal.classList.remove(
        "hidden"
    );


    setTimeout(
        () => taskTitle.focus(),
        100
    );
}


/* =========================================
   OPEN EDIT
========================================= */

function openEditModal(id) {

    const task =
        tasks.find(
            item =>
                item.id === id
        );


    if (!task) {

        return;
    }


    taskId.value =
        task.id;

    taskDay.value =
        task.dayIndex;

    taskTitle.value =
        task.title;

    taskStart.value =
        task.start;

    taskEnd.value =
        task.end;

    taskLocation.value =
        task.location || "";

    taskNotes.value =
        task.notes || "";


    modalTitle.textContent =
        translations[
            currentLanguage
        ].editTask;


    deleteBtn.classList.remove(
        "hidden"
    );


    modal.classList.remove(
        "hidden"
    );
}


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    modal.classList.add(
        "hidden"
    );
}


/* =========================================
   CONFLICT
========================================= */

function hasConflict(
    newTask,
    ignoreId = null
) {

    const newStart =
        timeToMinutes(
            newTask.start
        );

    const newEnd =
        timeToMinutes(
            newTask.end
        );


    return tasks.some(
        task => {

            if (
                task.id === ignoreId
            ) {

                return false;
            }


            if (
                Number(
                    task.dayIndex
                ) !==
                Number(
                    newTask.dayIndex
                )
            ) {

                return false;
            }


            const existingStart =
                timeToMinutes(
                    task.start
                );

            const existingEnd =
                timeToMinutes(
                    task.end
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

form.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const start =
            taskStart.value;

        const end =
            taskEnd.value;


        const startMinutes =
            timeToMinutes(start);

        const endMinutes =
            timeToMinutes(end);


        if (
            endMinutes <= startMinutes
        ) {

            showToast(
                translations[
                    currentLanguage
                ].invalidTime
            );

            return;
        }


        const id =
            taskId.value ||
            generateId();


        const newTask = {

            id: id,

            dayIndex:
                Number(
                    taskDay.value
                ),

            title:
                taskTitle.value.trim(),

            start:
                start,

            end:
                end,

            location:
                taskLocation.value.trim(),

            notes:
                taskNotes.value.trim()
        };


        if (
            hasConflict(
                newTask,
                taskId.value || null
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
            tasks.findIndex(
                task =>
                    task.id === id
            );


        if (
            existingIndex >= 0
        ) {

            tasks[
                existingIndex
            ] = newTask;

        } else {

            tasks.push(
                newTask
            );
        }


        saveTasks();

        renderTable();

        closeModal();


        showToast(
            translations[
                currentLanguage
            ].saved
        );
    }
);


/* =========================================
   DELETE
========================================= */

function deleteTask(id) {

    const confirmed =
        confirm(
            translations[
                currentLanguage
            ].confirmDelete
        );


    if (!confirmed) {

        return;
    }


    tasks =
        tasks.filter(
            task =>
                task.id !== id
        );


    saveTasks();

    renderTable();


    showToast(
        translations[
            currentLanguage
        ].deleted
    );
}


/* =========================================
   DELETE FROM MODAL
========================================= */

deleteBtn.addEventListener(
    "click",
    () => {

        const id =
            taskId.value;


        if (id) {

            deleteTask(id);

            closeModal();
        }
    }
);


/* =========================================
   BUTTONS
========================================= */

document
    .getElementById("addBtn")
    .addEventListener(
        "click",
        openAddModal
    );


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
   MODAL OUTSIDE CLICK
========================================= */

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
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
   DARK MODE
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
   ESCAPE
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
   ID
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

let toastTimer;


function showToast(message) {

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
   START
========================================= */

loadData();
