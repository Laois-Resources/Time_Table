/* =========================================
   WEEKLY PLANNER
   Table + LocalStorage + Repeat
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

let weekOffset = 0;


/* =========================================
   TRANSLATIONS
========================================= */

const translations = {

    en: {

        title: "Weekly Planner",

        subtitle:
            "Organise what you need to do each week.",

        add: "Add",

        previous: "← Previous",

        today: "Today",

        next: "Next →",

        thisWeek: "This Week",

        day: "Day",

        task: "What to do",

        time: "Time",

        location: "Location",

        repeat: "Repeat",

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

        everyWeek:
            "Every week",

        once:
            "Once only",

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

        previous:
            "← السابق",

        today:
            "اليوم",

        next:
            "التالي →",

        thisWeek:
            "هذا الأسبوع",

        day:
            "اليوم",

        task:
            "ماذا تريد أن تفعل؟",

        time:
            "الوقت",

        location:
            "الموقع",

        repeat:
            "التكرار",

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

        everyWeek:
            "كل أسبوع",

        once:
            "مرة واحدة",

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

const taskRepeat =
    document.getElementById(
        "taskRepeat"
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

const weekLabel =
    document.getElementById(
        "weekLabel"
    );

const toast =
    document.getElementById(
        "toast"
    );


/* =========================================
   LOAD
========================================= */

function loadData() {

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
        "previousWeekBtn"
    ).textContent =
        t.previous;


    document.getElementById(
        "todayBtn"
    ).textContent =
        t.today;


    document.getElementById(
        "nextWeekBtn"
    ).textContent =
        t.next;


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

    updateWeekLabel();

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
        t.repeat;

    headers[5].textContent =
        t.notes;

    headers[6].textContent =
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
        'label[for="taskRepeat"]'
    ).textContent =
        t.repeat;


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

    updateRepeatOptions();
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


function updateRepeatOptions() {

    const current =
        taskRepeat.value || "weekly";

    const t =
        translations[
            currentLanguage
        ];


    taskRepeat.innerHTML = "";


    const weekly =
        document.createElement(
            "option"
        );

    weekly.value =
        "weekly";

    weekly.textContent =
        t.everyWeek;


    const once =
        document.createElement(
            "option"
        );

    once.value =
        "once";

    once.textContent =
        t.once;


    taskRepeat.appendChild(
        weekly
    );

    taskRepeat.appendChild(
        once
    );


    taskRepeat.value =
        current;
}


/* =========================================
   DATE HELPERS
========================================= */

function getMonday(date) {

    const result =
        new Date(date);

    const day =
        result.getDay();


    const difference =
        day === 0
            ? -6
            : 1 - day;


    result.setDate(
        result.getDate() +
        difference
    );


    result.setHours(
        0,
        0,
        0,
        0
    );


    return result;
}


function getCurrentWeekStart() {

    const monday =
        getMonday(
            new Date()
        );


    monday.setDate(
        monday.getDate() +
        weekOffset * 7
    );


    return monday;
}


function dateToString(date) {

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
   WEEK LABEL
========================================= */

function updateWeekLabel() {

    const t =
        translations[
            currentLanguage
        ];


    if (weekOffset === 0) {

        weekLabel.textContent =
            t.thisWeek;

        return;
    }


    const start =
        getCurrentWeekStart();


    const end =
        new Date(start);


    end.setDate(
        end.getDate() + 6
    );


    const options = {

        day: "numeric",

        month: "short",

        year: "numeric"

    };


    const startText =
        start.toLocaleDateString(
            currentLanguage === "ar"
                ? "ar-IQ"
                : "en-IE",
            options
        );


    const endText =
        end.toLocaleDateString(
            currentLanguage === "ar"
                ? "ar-IQ"
                : "en-IE",
            options
        );


    weekLabel.textContent =
        `${startText} - ${endText}`;
}


/* =========================================
   VISIBLE TASKS
========================================= */

function getVisibleTasks() {

    const weekStart =
        getCurrentWeekStart();


    const weekStartString =
        dateToString(
            weekStart
        );


    const weekEnd =
        new Date(weekStart);


    weekEnd.setDate(
        weekEnd.getDate() + 6
    );


    const weekEndString =
        dateToString(
            weekEnd
        );


    return tasks.filter(
        task => {

            /*
               WEEKLY:
               Always appears on its
               selected weekday.
            */

            if (
                task.repeat === "weekly"
            ) {

                return true;
            }


            /*
               ONCE:
               Only appears during the
               week it was created.
            */

            if (
                task.repeat === "once"
            ) {

                return (
                    task.date >=
                    weekStartString &&

                    task.date <=
                    weekEndString
                );
            }


            return false;
        }
    );
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


    const visibleTasks =
        sortTasks(
            getVisibleTasks()
        );


    emptyMessage.classList.toggle(
        "hidden",
        visibleTasks.length > 0
    );


    visibleTasks.forEach(
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


            /* REPEAT */

            const repeatCell =
                document.createElement(
                    "td"
                );


            const repeatBadge =
                document.createElement(
                    "span"
                );


            repeatBadge.className =
                task.repeat === "weekly"
                    ? "repeat-badge repeat-weekly"
                    : "repeat-badge repeat-once";


            repeatBadge.textContent =
                task.repeat === "weekly"
                    ? translations[
                        currentLanguage
                      ].everyWeek
                    : translations[
                        currentLanguage
                      ].once;


            repeatCell.appendChild(
                repeatBadge
            );


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
                repeatCell
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

    taskRepeat.value =
        "weekly";


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

    taskRepeat.value =
        task.repeat;

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


            /*
               Two weekly tasks conflict
               with each other.

               Once-only tasks only conflict
               if they are on the same date.
            */

            if (
                newTask.repeat === "once" &&
                task.repeat === "once"
            ) {

                if (
                    task.date !==
                    newTask.date
                ) {

                    return false;
                }
            }


            /*
               A weekly task and a once-only
               task on the same day/time
               also conflict.
            */

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
            taskId.value ||
            generateId();


        /*
           WEEKLY TASK
           ----------------
           We store the weekday.

           Example:

           Monday = 0

           This means it will appear
           every Monday automatically.
        */


        /*
           ONCE TASK
           ----------------
           We store an actual date.
        */

        let date = null;


        if (
            taskRepeat.value ===
            "once"
        ) {

            const weekStart =
                getCurrentWeekStart();


            const selectedDate =
                new Date(
                    weekStart
                );


            selectedDate.setDate(
                selectedDate.getDate() +
                Number(
                    taskDay.value
                )
            );


            date =
                dateToString(
                    selectedDate
                );
        }


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

            repeat:
                taskRepeat.value,

            notes:
                taskNotes.value.trim(),

            date:
                date
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
   WEEK NAVIGATION
========================================= */

document
    .getElementById(
        "previousWeekBtn"
    )
    .addEventListener(
        "click",
        () => {

            weekOffset--;

            updateWeekLabel();

            renderTable();
        }
    );


document
    .getElementById(
        "nextWeekBtn"
    )
    .addEventListener(
        "click",
        () => {

            weekOffset++;

            updateWeekLabel();

            renderTable();
        }
    );


document
    .getElementById(
        "todayBtn"
    )
    .addEventListener(
        "click",
        () => {

            weekOffset = 0;

            updateWeekLabel();

            renderTable();
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