// value entered by user
const taskInput = document.querySelector("#toDoText");
const addUpdateClick = document.getElementById("AddUpdateClick");

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addUpdateClick.click();
  }
});

// Function to create and add a new to-do item
function CreateToDoData() {
  if (taskInput.value.trim() === "") {
    alert("Please enter a task!");
    taskInput.focus();
    return;
  }

  // Create a new list item and checkbox
  let taskList = document.querySelector("#task-list");
  let li = document.createElement("li");
  let listContent = document.createTextNode(taskInput.value);
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    listItem.classList.toggle("done");
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  deleteButton.className = "delete-button";
  deleteButton.addEventListener("click", function () {
    taskList.removeChild(li);
  });

  // Append the new item to the task list
  li.appendChild(checkbox);
  li.appendChild(listContent);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
  // Clear the input field
  taskInput.value = "";
}

// Add an event listener to the "+" button
addUpdateClick.addEventListener("click", CreateToDoData);
