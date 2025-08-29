
window.onload = function() {
    populateTable();
}

document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault();
    const workout = getWorkout();
    saveWorkoutToDb(workout);
    addWorkoutToTable(workout);

});


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

// call when opening page.
function populateTable(){
    console.log("populating the tables");
    const workouts = JSON.parse(localStorage.getItem("workouts"));
    for (let i=0; i<workouts.length; i++) {
        console.log(workouts[i]);
        console.log("wtf");
        addWorkoutToTable(workouts[i]);
    }

}; 


function addWorkoutToTable(workout){
    if (document.getElementById("workout-table")) {
        const table = document.getElementById("workout-table");
        const newRow = document.createElement("tr");

        for (const [key, value] of Object.entries(workout)) {
            const newCell = document.createElement("td");
            newCell.textContent = value;
            newRow.appendChild(newCell);
        }
        // Add a remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "🗑️";
        removeButton.addEventListener("click", function(){
            const row = this.closest("tr");
            row.remove();
        });
        removeButton.addEventListener("click", function(){
            const row = this.closest("tr");
            row.remove();
            removeWorkoutFromDB(workout);
        });

        const buttonCell = document.createElement("td");
        newRow.appendChild(buttonCell).appendChild(removeButton);
        table.querySelector("tbody").appendChild(newRow);
    }
    // TODO: handle the case where no table exists and create it?
};

function addWorkoutToTable(workout){
    if (document.getElementById("workout-table")) {
        const table = document.getElementById("workout-table");
        const newRow = document.createElement("tr");
        for (const [key, value] of Object.entries(workout)) {
            const newCell = document.createElement("td");
            newCell.textContent = value;
            newRow.appendChild(newCell);
        }
        // Add a remove button
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
    // TODO: handle the case where no table exists and create it?
};

function saveWorkoutToDb(workout){
    const allWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
    allWorkouts.unshift(workout);
    localStorage.setItem("workouts", JSON.stringify(allWorkouts));
};

function removeWorkoutFromDB(workout) {
    const workoutId = workout.id;
    // remove the workout with this ID from the DB
    const allWorkouts = JSON.parse(localStorage.getItem("workouts"));
    for (let index = 0; index < allWorkouts.length; index++) {
        if (allWorkouts[index].id === workoutId) {
            allWorkouts.splice(index, 1);
            
        }
    }
    localStorage.setItem("workouts", JSON.stringify(allWorkouts));
    
    // ET on re SAVE le local storage avec le nouvel array 
};