
window.onload = function() {
    populateTable();
    const today = getTodayDate();   
    setTodayDate(today);
}

document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault();
    const workout = getWorkout();
    saveWorkoutToDb(workout);
    addWorkoutToTable(workout);

});

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    function formatDate(date){
        if (date<10) {return "0" + date};
        return date;
    }
    month = formatDate(month);
    day = formatDate(day);
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate;
    
}

function setTodayDate(today) {
    document.getElementById("date").value = today;

}


function populateTable(){
    const workouts = JSON.parse(localStorage.getItem("workouts"));
    for (let i=0; i<workouts.length; i++) {
        addWorkoutToTable(workouts[i]);
    }

}; 

function getWorkout(){
    const workout = {
        id: crypto.randomUUID(),
        date: document.getElementById("date").value,
        exercise: document.getElementById("exercise").value,
        weight: document.getElementById("weight").value,
        series: series = document.getElementById("series").value,
        reps: document.getElementById("reps").value,
        success: document.getElementById("success").value
    }
    return workout;
};


// Seems a bit too long
function addWorkoutToTable(workout){
    if (document.getElementById("workout-table")) {
        const table = document.getElementById("workout-table");
        const newRow = document.createElement("tr");
        for (const [key, value] of Object.entries(workout)) {
            if (key !== "id") {
                const newCell = document.createElement("td");
                newCell.contentEditable="true";
                newCell.textContent = value;
                newRow.appendChild(newCell);   
            }
        }
        // Add a remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "🗑️";
        removeButton.addEventListener("click", function(){
            const row = this.closest("tr");
            row.remove();
            removeWorkoutFromDB(workout);
        });
        const removeButtonCell = document.createElement("td");
        newRow.appendChild(removeButtonCell).appendChild(removeButton);
        table.querySelector("tbody").appendChild(newRow);
    }
};

function saveWorkoutToDb(workout){
    const allWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    allWorkouts.unshift(workout);
    localStorage.setItem("workouts", JSON.stringify(allWorkouts));
};

function removeWorkoutFromDB(workout) {
    const allWorkouts = JSON.parse(localStorage.getItem("workouts"));
    const idToRemove = allWorkouts.findIndex((w) => w.id === workout.id);
    if (idToRemove > -1) {
        allWorkouts.splice(idToRemove, 1);
    }
    localStorage.setItem("workouts", JSON.stringify(allWorkouts));
};

function editWorkout(workoutId, currentRow) {
    const allWorkouts = JSON.parse(localStorage.getItem("workouts"));
    const idToEdit = allWorkouts.findIndex((w) => w.id === workoutId);
    console.log(currentRow);
    if (idToEdit > -1) {
        console.log(allWorkouts[idToEdit]);
        // allWorkouts.splice(idToRemove, 1);
    }
    // const workout = all of the row
    // saveWorkoutToDb()

};

function turnRowIntoForm(tableRow) {
    tableRow
};