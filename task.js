
const openFormBtn = document.getElementById("open-form");
const backBtn = document.getElementById("back-btn");
const saveBtn = document.querySelector(".save-btn");
const addTaskBtn = document.getElementById("add-task-btn");

const emptyState = document.getElementById("empty-state");
const taskForm = document.getElementById("task-model");
const taskGrid = document.getElementById("task-grid");

// dashboard
const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");


// start hidden
taskForm.style.display = "none";
taskGrid.style.display = "none";
addTaskBtn.style.display = "none";


// =====================
// OPEN FORM
// =====================
openFormBtn.onclick = function () {
    emptyState.style.display = "none";
    taskForm.style.display = "flex";
};


// =====================
// BACK BUTTON
// =====================
backBtn.onclick = function () {
    taskForm.style.display = "none";
    emptyState.style.display = "flex";
};


// =====================
// CATEGORY SELECT
// =====================
const categories = document.querySelectorAll(".cate-btn");

categories.forEach(function (btn) {
    btn.onclick = function () {

        categories.forEach(function (b) {
            b.classList.remove("active");
        });

        btn.classList.add("active");
    };
});


// =====================
// PRIORITY SELECT
// =====================
const priorities = document.querySelectorAll(".priority-btn");

priorities.forEach(function (btn) {
    btn.onclick = function () {

        priorities.forEach(function (b) {
            b.classList.remove("active");
        });

        btn.classList.add("active");
    };
});


// =====================
// DASHBOARD UPDATE
// =====================
function updateDashboard() {

    const cards = document.querySelectorAll(".task-card");

    let total = cards.length;
    let completed = 0;

    cards.forEach(function (card) {
        if (card.classList.contains("completed")) {
            completed = completed + 1;
        }
    });

    totalCount.innerText = total;
    completedCount.innerText = completed;
    pendingCount.innerText = total - completed;
}


// =====================
// SAVE TASK
// =====================
saveBtn.onclick = function () {

    let title = document.getElementById("task-title").value;
    let desc = document.getElementById("task-desc").value;
    let date = document.getElementById("task-duedate").value;
    let time = document.getElementById("task-duetime").value;

    let category = document.querySelector(".cate-btn.active");
    let priority = document.querySelector(".priority-btn.active");

    if (!category) category = "Other";
    else category = category.textContent;

    if (!priority) priority = "Low";
    else priority = priority.textContent;

    // check empty fields
    if (title === "" || desc === "" || date === "" || time === "") {
        alert("Please fill all fields");
        return;
    }

    // CREATE TASK CARD
    let card = document.createElement("div");
    card.classList.add("task-card");

    card.innerHTML = `
        <div class="card-header">
            <h3>${title}</h3>

            <div class="card-icons">
                <span class="complete-btn">✔</span>
                <span class="delete-btn">🗑</span>
            </div>
        </div>

        <div class="card-body">
            <p>${desc}</p>
        </div>

        <div class="card-footer">
            <span>${category}</span>
            <span>${priority}</span>
        </div>

        <div class="card-deadline">
            <span>${date}</span>
            <span>${time}</span>
        </div>
    `;

    // show task list
    taskGrid.appendChild(card);
    taskGrid.style.display = "grid";
    emptyState.style.display = "none";
    addTaskBtn.style.display = "flex";

    // CLEAR FORM
    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("task-duedate").value = "";
    document.getElementById("task-duetime").value = "";

    // =====================
    // COMPLETE TASK
    // =====================
    let completeBtn = card.querySelector(".complete-btn");

    completeBtn.onclick = function () {
        card.classList.toggle("completed");
        updateDashboard();
    };


    // =====================
    // DELETE TASK
    // =====================
    let deleteBtn = card.querySelector(".delete-btn");

    deleteBtn.onclick = function () {
        card.remove();

        if (taskGrid.children.length === 0) {
            taskGrid.style.display = "none";
            emptyState.style.display = "flex";
            addTaskBtn.style.display = "none";
        }

        updateDashboard();
    };

    updateDashboard();

    taskForm.style.display = "none";
};