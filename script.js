
document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault();
    const workout = getWorkout();
    console.log(workout.date);
    addWorkoutToTable(workout);

});


function getWorkout(){
    const workout = {
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
        const buttonCell = document.createElement("td");
        newRow.appendChild(buttonCell).appendChild(removeButton);
        table.querySelector("tbody").appendChild(newRow);
    }
    // TODO: handle the case where no table exists and create it?
};

function saveToDb(data){};
