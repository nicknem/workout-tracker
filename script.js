
window.onload = function() {
    populateTable();   
}

document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault();
    const workout = getWorkout();
    saveWorkoutToDb(workout);
    addWorkoutToTable(workout);

});

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

function addWorkoutToTable(workout){
    if (document.getElementById("workout-table")) {
        const table = document.getElementById("workout-table");
        const newRow = document.createElement("tr");
        for (const [key, value] of Object.entries(workout)) {
            if (key !== "id") {
                const newCell = document.createElement("td");
                newCell.textContent = value;
                newRow.appendChild(newCell);   
            }
        }
        const removeButton = document.createElement("button");
        removeButton.textContent = "🗑️";
        removeButton.addEventListener("click", function(){
            const row = this.closest("tr");
            row.remove();
            removeWorkoutFromDB(workout);
        });
        const buttonCell = document.createElement("td");
        newRow.appendChild(buttonCell).appendChild(removeButton);
        table.querySelector("tbody").appendChild(newRow);
    }
};

function saveWorkoutToDb(workout){
    const allWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    allWorkouts.unshift(workout);
    localStorage.setItem("workouts", JSON.stringify(allWorkouts));
};

function removeWorkoutFromDB(workout) {
    const workoutId = workout.id;
    const allWorkouts = JSON.parse(localStorage.getItem("workouts"));
    const idToRemove = allWorkouts.findIndex((w) => w.id === workoutId);
    if (idToRemove > -1) {
        allWorkouts.splice(idToRemove, 1);
    }
    localStorage.setItem("workouts", JSON.stringify(allWorkouts));
};